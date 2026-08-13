"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import {
  fieldsFromFormData,
  validateBooking,
  normalisePhone,
  type SubmitResult,
} from "@/lib/booking-requests";
import { isClosed, slotsForDate, todayISO } from "@/lib/slots";
import { recordBookingRequest } from "@/lib/notify";

/**
 * Records a booking or callback request from the public form.
 *
 * This is an unauthenticated endpoint reachable by anyone who can POST, so
 * everything is re-validated here regardless of what the client checked.
 */

// Crockford-ish alphabet: no vowels, no look-alikes, so codes are easy to read
// out over the phone.
const CODE_ALPHABET = "0123456789ACDEFGHJKLMNPQRTUVWXY";

function makeReference(): string {
  const bytes = randomBytes(5);
  let out = "";
  for (const b of bytes) out += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return `ED-${out}`;
}

// Light in-memory throttle. Per server instance rather than global, but enough
// to blunt casual abuse of a public form.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t > RATE_LIMIT.windowMs)) hits.delete(k);
  }
  return recent.length > RATE_LIMIT.max;
}

export async function submitBookingRequest(
  _prev: SubmitResult,
  formData: FormData,
): Promise<SubmitResult> {
  // Bots fill hidden fields; people don't.
  if (String(formData.get("company") ?? "").trim()) {
    return { ok: true, reference: makeReference() };
  }

  const fields = fieldsFromFormData(formData);

  const errors = validateBooking(fields);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  // Re-check the date and slot against real opening hours, not just presence.
  if (fields.kind === "appointment") {
    if (fields.date < todayISO()) {
      return { ok: false, errors: { date: "Please pick a date that hasn't passed." } };
    }
    if (isClosed(fields.date)) {
      return { ok: false, errors: { date: "The clinic is closed that day." } };
    }
    if (!slotsForDate(fields.date).includes(fields.slot)) {
      return { ok: false, errors: { slot: "That time isn't available — please pick another." } };
    }
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return {
      ok: false,
      message: "Too many requests just now. Please call the clinic instead.",
    };
  }

  // Store the number in a consistent shape for whoever calls it back.
  const normalised = { ...fields, phone: normalisePhone(fields.phone) ?? fields.phone };
  const reference = makeReference();

  try {
    await recordBookingRequest(normalised, reference);
  } catch (err) {
    // The patient still gets the WhatsApp hand-off, so don't fail the form.
    console.error("[booking] Failed to record request", err);
    return {
      ok: true,
      reference,
      message: "We saved your details but our email is having trouble — please send the WhatsApp message so we don't miss you.",
    };
  }

  return { ok: true, reference };
}
