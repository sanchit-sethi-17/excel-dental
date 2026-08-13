import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { BookingFields } from "@/lib/booking-requests";
import { formatDate, formatSlot } from "@/lib/slots";
import { site } from "@/lib/site";

/**
 * Where a booking request goes once the server has it.
 *
 * Three layers, deliberately: email is the one the clinic actually reads, the
 * server log is a safety net that always runs, and the local file makes the
 * whole thing testable in development. A failure in any layer never stops the
 * patient — the form still hands off to WhatsApp.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Where requests are emailed. Falls back to the clinic address in site.ts. */
function clinicInbox(): string | null {
  return process.env.CLINIC_EMAIL?.trim() || site.email || null;
}

/**
 * Resend will only send from a verified domain. Until the clinic has one,
 * their shared testing sender works for checking the wiring end to end.
 */
function fromAddress(): string {
  return process.env.BOOKING_FROM_EMAIL?.trim() || "onboarding@resend.dev";
}

function summarise(f: BookingFields, reference: string): string {
  const rows =
    f.kind === "callback"
      ? [
          ["Type", "Callback request"],
          ["Name", f.name],
          ["Phone", f.phone],
        ]
      : [
          ["Type", "Appointment request"],
          ["Name", f.name],
          ["Phone", f.phone],
          ["Treatment", f.treatment],
          ["Date", formatDate(f.date)],
          ["Time", formatSlot(f.slot)],
        ];
  if (f.email) rows.push(["Email", f.email]);
  if (f.note) rows.push(["Note", f.note]);
  rows.push(["Reference", reference]);
  return rows.map(([k, v]) => `${k}: ${v}`).join("\n");
}

function toHtml(f: BookingFields, reference: string): string {
  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
    );
  const body = summarise(f, reference)
    .split("\n")
    .map((line) => {
      const [k, ...rest] = line.split(": ");
      return `<tr><td style="padding:6px 16px 6px 0;color:#57534e;font-size:14px">${esc(k)}</td><td style="padding:6px 0;font-weight:600;font-size:14px">${esc(rest.join(": "))}</td></tr>`;
    })
    .join("");
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1c1917">
<h2 style="font-size:18px;margin:0 0 4px">${f.kind === "callback" ? "Callback request" : "New appointment request"}</h2>
<p style="margin:0 0 16px;color:#57534e;font-size:14px">From the ${esc(site.name)} website</p>
<table style="border-collapse:collapse">${body}</table>
<p style="margin:20px 0 0"><a href="tel:${esc(f.phone)}" style="background:#c1502e;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-size:14px">Call ${esc(f.name)}</a></p>
</div>`;
}

async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html: string,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: fromAddress(), to: [to], subject, text, html }),
    });
    if (!res.ok) {
      console.error("[booking] Resend rejected the email", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[booking] Could not reach Resend", err);
    return false;
  }
}

/** Development only — a local record so requests can be inspected while testing. */
async function appendLocal(f: BookingFields, reference: string) {
  if (process.env.NODE_ENV === "production") return;
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "booking-requests.jsonl"),
      JSON.stringify({ reference, at: new Date().toISOString(), ...f }) + "\n",
      "utf8",
    );
  } catch {
    // Never let bookkeeping break a booking.
  }
}

/**
 * Record a request. Returns whether it reached the clinic's inbox — the caller
 * uses this only for logging, never to block the patient.
 */
export async function recordBookingRequest(
  f: BookingFields,
  reference: string,
): Promise<{ emailed: boolean }> {
  const text = summarise(f, reference);

  // Always runs, even with nothing configured: visible in the Vercel logs.
  console.info(`[booking] ${reference}\n${text}`);
  await appendLocal(f, reference);

  const inbox = clinicInbox();
  if (!inbox) {
    console.warn(
      "[booking] No CLINIC_EMAIL set — request was logged but not emailed.",
    );
    return { emailed: false };
  }

  const subject =
    f.kind === "callback"
      ? `Callback request — ${f.name} (${reference})`
      : `Appointment request — ${f.name}, ${formatDate(f.date)} (${reference})`;

  const emailed = await sendEmail(inbox, subject, text, toHtml(f, reference));

  // Courtesy confirmation to the patient, when they gave us an address.
  if (emailed && f.email && f.kind === "appointment") {
    await sendEmail(
      f.email,
      `We've received your request — ${site.legalName}`,
      [
        `Hello ${f.name},`,
        ``,
        `Thank you — we've received your appointment request. The clinic will`,
        `contact you shortly to confirm the time.`,
        ``,
        `Treatment: ${f.treatment}`,
        `Preferred date: ${formatDate(f.date)}`,
        `Preferred time: ${formatSlot(f.slot)}`,
        `Reference: ${reference}`,
        ``,
        `This is a request, not a confirmed booking, until the clinic replies.`,
        ``,
        `${site.legalName}`,
        `${site.address.full}`,
        `${site.phone}`,
      ].join("\n"),
      `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1c1917">
<p>Hello ${f.name},</p>
<p>Thank you — we've received your appointment request. The clinic will contact you shortly to confirm the time.</p>
<table style="border-collapse:collapse;margin:16px 0">
<tr><td style="padding:6px 16px 6px 0;color:#57534e">Treatment</td><td style="padding:6px 0;font-weight:600">${f.treatment}</td></tr>
<tr><td style="padding:6px 16px 6px 0;color:#57534e">Preferred date</td><td style="padding:6px 0;font-weight:600">${formatDate(f.date)}</td></tr>
<tr><td style="padding:6px 16px 6px 0;color:#57534e">Preferred time</td><td style="padding:6px 0;font-weight:600">${formatSlot(f.slot)}</td></tr>
<tr><td style="padding:6px 16px 6px 0;color:#57534e">Reference</td><td style="padding:6px 0;font-weight:600">${reference}</td></tr>
</table>
<p style="color:#57534e;font-size:14px">This is a request, not a confirmed booking, until the clinic replies.</p>
<p style="font-size:14px">${site.legalName}<br>${site.address.full}<br>${site.phone}</p>
</div>`,
    );
  }

  return { emailed };
}
