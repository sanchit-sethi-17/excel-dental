/**
 * Username is email OR phone. These helpers normalise and validate input,
 * and decide which one a typed value is.
 */

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Accepts Indian numbers with optional +91 / spaces / dashes. */
export function normalisePhone(value: string): string | null {
  const digits = value.replace(/[\s\-()]/g, "").replace(/^\+?91/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export type Identifier =
  | { kind: "email"; value: string }
  | { kind: "phone"; value: string }
  | null;

/** Figure out whether a login/registration value is an email or a phone. */
export function parseIdentifier(raw: string): Identifier {
  const value = raw.trim();
  if (!value) return null;
  if (value.includes("@")) {
    return isEmail(value) ? { kind: "email", value: value.toLowerCase() } : null;
  }
  const phone = normalisePhone(value);
  return phone ? { kind: "phone", value: phone } : null;
}

export function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  return null;
}
