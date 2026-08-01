import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * LOCAL data layer — backed by Node's built-in SQLite (zero dependencies).
 *
 * This is the single place that talks to the database. To go to production,
 * swap the implementation here for Postgres (e.g. `pg` / Neon) — every other
 * file only calls the exported functions below, so nothing else changes.
 *
 * The SQLite file lives in `.data/app.db` (gitignored). On serverless hosts
 * the filesystem is ephemeral, which is exactly why production needs Postgres.
 */

type DB = InstanceType<typeof DatabaseSync>;

function createConnection(): DB {
  const dir = path.join(process.cwd(), ".data");
  mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, "app.db"));
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS password_resets (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      used INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS otp_codes (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      user_id TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
  `);
  return db;
}

// Reuse a single connection across HMR reloads in dev.
const globalForDb = globalThis as unknown as { __edDb?: DB };
const db: DB = globalForDb.__edDb ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__edDb = db;

// ---------- Types ----------
export type User = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  password_hash: string;
  created_at: number;
};

export type Appointment = {
  id: string;
  user_id: string;
  type: string;
  date: string; // YYYY-MM-DD
  time_slot: string; // e.g. "10:30"
  status: "booked" | "cancelled";
  created_at: number;
  updated_at: number;
};

// ---------- Users ----------
export function createUser(u: {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  passwordHash: string;
}): void {
  db.prepare(
    `INSERT INTO users (id, name, email, phone, password_hash, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(u.id, u.name, u.email, u.phone, u.passwordHash, Date.now());
}

export function findUserByEmail(email: string): User | undefined {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as
    | User
    | undefined;
}

export function findUserByPhone(phone: string): User | undefined {
  return db.prepare(`SELECT * FROM users WHERE phone = ?`).get(phone) as
    | User
    | undefined;
}

export function findUserById(id: string): User | undefined {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id) as
    | User
    | undefined;
}

export function updateUserPassword(userId: string, passwordHash: string): void {
  db.prepare(`UPDATE users SET password_hash = ? WHERE id = ?`).run(
    passwordHash,
    userId
  );
}

// ---------- Sessions ----------
export function createSessionRow(id: string, userId: string, expiresAt: number) {
  db.prepare(
    `INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`
  ).run(id, userId, expiresAt);
}

export function getSessionRow(
  id: string
): { id: string; user_id: string; expires_at: number } | undefined {
  return db.prepare(`SELECT * FROM sessions WHERE id = ?`).get(id) as
    | { id: string; user_id: string; expires_at: number }
    | undefined;
}

export function deleteSessionRow(id: string): void {
  db.prepare(`DELETE FROM sessions WHERE id = ?`).run(id);
}

// ---------- Appointments ----------
export function createAppointment(a: {
  id: string;
  userId: string;
  type: string;
  date: string;
  timeSlot: string;
}): void {
  const now = Date.now();
  db.prepare(
    `INSERT INTO appointments (id, user_id, type, date, time_slot, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 'booked', ?, ?)`
  ).run(a.id, a.userId, a.type, a.date, a.timeSlot, now, now);
}

export function listAppointmentsForUser(userId: string): Appointment[] {
  return db
    .prepare(
      `SELECT * FROM appointments WHERE user_id = ? ORDER BY date ASC, time_slot ASC`
    )
    .all(userId) as Appointment[];
}

export function getAppointment(id: string): Appointment | undefined {
  return db.prepare(`SELECT * FROM appointments WHERE id = ?`).get(id) as
    | Appointment
    | undefined;
}

export function updateAppointmentDetails(
  id: string,
  type: string,
  date: string,
  timeSlot: string
): void {
  db.prepare(
    `UPDATE appointments SET type = ?, date = ?, time_slot = ?, updated_at = ? WHERE id = ?`
  ).run(type, date, timeSlot, Date.now(), id);
}

export function setAppointmentStatus(
  id: string,
  status: "booked" | "cancelled"
): void {
  db.prepare(
    `UPDATE appointments SET status = ?, updated_at = ? WHERE id = ?`
  ).run(status, Date.now(), id);
}

// Prevent double-booking the same date+slot (across active appointments).
export function slotTaken(
  date: string,
  timeSlot: string,
  excludeId?: string
): boolean {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS n FROM appointments
       WHERE date = ? AND time_slot = ? AND status = 'booked' AND id != ?`
    )
    .get(date, timeSlot, excludeId ?? "") as { n: number };
  return row.n > 0;
}

// ---------- Password resets ----------
export function createPasswordReset(
  token: string,
  userId: string,
  expiresAt: number
): void {
  db.prepare(
    `INSERT INTO password_resets (token, user_id, expires_at, used) VALUES (?, ?, ?, 0)`
  ).run(token, userId, expiresAt);
}

export function getPasswordReset(token: string):
  | { token: string; user_id: string; expires_at: number; used: number }
  | undefined {
  return db.prepare(`SELECT * FROM password_resets WHERE token = ?`).get(
    token
  ) as
    | { token: string; user_id: string; expires_at: number; used: number }
    | undefined;
}

export function markPasswordResetUsed(token: string): void {
  db.prepare(`UPDATE password_resets SET used = 1 WHERE token = ?`).run(token);
}

// ---------- OTP (one-time codes) ----------
export type OtpRow = {
  id: string;
  identifier: string;
  user_id: string;
  code: string;
  expires_at: number;
  attempts: number;
  created_at: number;
};

export function deleteOtpsForIdentifier(identifier: string): void {
  db.prepare(`DELETE FROM otp_codes WHERE identifier = ?`).run(identifier);
}

export function createOtp(o: {
  id: string;
  identifier: string;
  userId: string;
  code: string;
  expiresAt: number;
}): void {
  db.prepare(
    `INSERT INTO otp_codes (id, identifier, user_id, code, expires_at, attempts, created_at)
     VALUES (?, ?, ?, ?, ?, 0, ?)`
  ).run(o.id, o.identifier, o.userId, o.code, o.expiresAt, Date.now());
}

export function getLatestOtp(identifier: string): OtpRow | undefined {
  return db
    .prepare(
      `SELECT * FROM otp_codes WHERE identifier = ? ORDER BY created_at DESC LIMIT 1`
    )
    .get(identifier) as OtpRow | undefined;
}

export function incrementOtpAttempts(id: string): void {
  db.prepare(`UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?`).run(id);
}
