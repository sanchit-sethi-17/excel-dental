import { formatDate, formatSlot } from "@/lib/slots";
import { site } from "@/lib/site";

/**
 * Shapes and validation shared by the booking form (client) and the server
 * action that records it. Validation lives here so both sides agree — the
 * client check is for helpful errors, the server check is the real one.
 */

export type RequestKind = "appointment" | "callback";

export type BookingFields = {
  kind: RequestKind;
  name: string;
  phone: string;
  /** Optional — only used to email the patient a confirmation. */
  email: string;
  /** Appointment requests only. */
  treatment: string;
  date: string;
  slot: string;
  note: string;
};

export type FieldErrors = Partial<Record<keyof BookingFields, string>>;

export type SubmitResult = {
  ok: boolean;
  /** Short code the patient can quote, e.g. "ED-7K3QP". */
  reference?: string;
  errors?: FieldErrors;
  /** Set when something broke server-side; the UI still offers WhatsApp. */
  message?: string;
};

/**
 * Indian mobile numbers: 10 digits, optionally +91 or 0 prefixed.
 *
 * Length decides whether a leading "91" is a country code — stripping it by
 * pattern alone would break the many valid numbers that simply start 91
 * (e.g. 9123456780).
 */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  let local = digits;
  if (digits.length === 12 && digits.startsWith("91")) local = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) local = digits.slice(1);
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export function isEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

export function validateBooking(f: BookingFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!f.name.trim()) errors.name = "Please tell us your name.";
  else if (f.name.trim().length < 2) errors.name = "Please enter your full name.";

  if (!f.phone.trim()) errors.phone = "We need a number to confirm your appointment.";
  else if (!normalisePhone(f.phone)) errors.phone = "Enter a valid 10-digit mobile number.";

  if (f.email.trim() && !isEmail(f.email)) errors.email = "That email doesn't look right.";

  if (f.kind === "appointment") {
    if (!f.treatment) errors.treatment = "Please choose a treatment (or 'Not sure').";
    if (!f.date) errors.date = "Please pick a preferred date.";
    if (!f.slot) errors.slot = "Please pick a time.";
  }

  return errors;
}

export function emptyFields(kind: RequestKind): BookingFields {
  return {
    kind,
    name: "",
    phone: "",
    email: "",
    treatment: "",
    date: "",
    slot: "",
    note: "",
  };
}

/** Reads a submitted form into our shape. Used by the server action. */
export function fieldsFromFormData(data: FormData): BookingFields {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const kind: RequestKind = get("kind") === "callback" ? "callback" : "appointment";
  return {
    kind,
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    treatment: get("treatment"),
    date: get("date"),
    slot: get("slot"),
    note: get("note"),
  };
}

/** The WhatsApp message the patient sends. Kept identical on both sides. */
export function buildWhatsAppMessage(
  f: BookingFields,
  reference?: string,
): string {
  const lines =
    f.kind === "callback"
      ? [
          `Hi ${site.name}, please call me back.`,
          ``,
          `Name: ${f.name}`,
          `Phone: ${f.phone}`,
        ]
      : [
          `Hi ${site.name}, I'd like to book an appointment.`,
          ``,
          `Name: ${f.name}`,
          `Phone: ${f.phone}`,
          `Treatment: ${f.treatment}`,
          `Preferred date: ${formatDate(f.date)}`,
          `Preferred time: ${formatSlot(f.slot)}`,
        ];
  if (f.note) lines.push(`Note: ${f.note}`);
  if (reference) lines.push(``, `Ref: ${reference}`);
  return lines.join("\n");
}
