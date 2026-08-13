import { site } from "@/lib/site";

/**
 * Real appointment times, derived from the clinic's opening hours in site.ts.
 * Safe to use on the client — the booking form recalculates slots whenever the
 * patient changes the date.
 */

const STEP_MINUTES = 30;
/** Don't offer a slot that starts right on closing time. */
const LAST_SLOT_BEFORE_CLOSE = 30;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "13:30" -> "1:30 pm" */
export function formatSlot(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Parse "YYYY-MM-DD" as a local date, avoiding UTC shifts. */
export function parseISODate(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Today in "YYYY-MM-DD", local time — used as the date input's minimum. */
export function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** True when the clinic has no regular hours on that date (i.e. Sunday). */
export function isClosed(iso: string): boolean {
  const date = parseISODate(iso);
  if (!date) return false;
  const day = date.getDay();
  return !site.openingBlocks.some((b) => b.days.includes(day));
}

/**
 * Every bookable start time for a date, as "HH:MM". Times already past are
 * dropped when the date is today, so nobody picks a slot that has gone.
 */
export function slotsForDate(iso: string): string[] {
  const date = parseISODate(iso);
  if (!date) return [];
  const day = date.getDay();

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const out: string[] = [];
  for (const block of site.openingBlocks) {
    if (!block.days.includes(day)) continue;
    const start = toMinutes(block.start);
    const end = toMinutes(block.end) - LAST_SLOT_BEFORE_CLOSE;
    for (let t = start; t <= end; t += STEP_MINUTES) {
      if (isToday && t <= minutesNow) continue;
      out.push(
        `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`,
      );
    }
  }
  return out;
}

/** Long, human date: "Monday, 17 August 2026". */
export function formatDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
