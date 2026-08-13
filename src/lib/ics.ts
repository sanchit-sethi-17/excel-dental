import { site } from "@/lib/site";

/**
 * Builds a calendar file for a requested appointment, so the patient has the
 * time saved before the clinic confirms. Generated in the browser and offered
 * as a download — no server involved.
 */

const APPOINTMENT_MINUTES = 45;

function stamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

/** Long values must be folded and special characters escaped, per RFC 5545. */
function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildAppointmentIcs({
  dateISO,
  slot,
  treatment,
  reference,
}: {
  dateISO: string;
  slot: string;
  treatment: string;
  reference: string;
}): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = slot.split(":").map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(start.getTime() + APPOINTMENT_MINUTES * 60 * 1000);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Excel Dental//Booking//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${reference}@exceldental`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeText(`Dental appointment — ${treatment}`)}`,
    `LOCATION:${escapeText(site.address.full)}`,
    `DESCRIPTION:${escapeText(
      `Requested appointment at ${site.legalName}. Reference ${reference}. ` +
        `The clinic will confirm this time — call ${site.phone} if you need to change it.`,
    )}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(`Dental appointment tomorrow at ${site.name}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** A data URI the browser can download without a round trip. */
export function icsDataUri(ics: string): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
