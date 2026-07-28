import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import {
  createSessionRow,
  deleteSessionRow,
  findUserById,
  getSessionRow,
  type User,
} from "@/lib/db";

const SESSION_COOKIE = "ed_session";
const SESSION_DAYS = 30;

// ---------- Password hashing (scrypt, built-in crypto) ----------
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const hashBuf = Buffer.from(hash, "hex");
  return (
    hashBuf.length === derived.length &&
    crypto.timingSafeEqual(hashBuf, derived)
  );
}

// ---------- Sessions ----------
export async function createSession(userId: string): Promise<void> {
  const id = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  createSessionRow(id, userId, expiresAt);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_COOKIE)?.value;
  if (id) deleteSessionRow(id);
  cookieStore.delete(SESSION_COOKIE);
}

/** Returns the logged-in user, or null. Safe to call in Server Components. */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_COOKIE)?.value;
  if (!id) return null;
  const session = getSessionRow(id);
  if (!session) return null;
  if (session.expires_at < Date.now()) {
    deleteSessionRow(id);
    return null;
  }
  return findUserById(session.user_id) ?? null;
}

/** Public shape of a user (never expose the password hash). */
export function publicUser(u: User) {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone };
}
