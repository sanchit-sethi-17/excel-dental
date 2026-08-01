"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import {
  createAppointment,
  createOtp,
  createPasswordReset,
  createUser,
  deleteOtpsForIdentifier,
  findUserByEmail,
  findUserById,
  findUserByPhone,
  getAppointment,
  getLatestOtp,
  getPasswordReset,
  incrementOtpAttempts,
  markPasswordResetUsed,
  setAppointmentStatus,
  slotTaken,
  updateAppointmentDetails,
  updateUserPassword,
} from "@/lib/db";
import {
  createSession,
  destroySession,
  getCurrentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { parseIdentifier, passwordProblem } from "@/lib/validate";
import { appointmentTypes, canModify, isPast, timeSlots } from "@/lib/booking";
import type { ActionState } from "@/lib/form-state";

// ---------------- Auth ----------------

export async function registerAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const identifierRaw = String(formData.get("identifier") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!name) return { error: "Please enter your name." };

  const id = parseIdentifier(identifierRaw);
  if (!id) return { error: "Enter a valid email address or 10-digit mobile number." };

  const pwProblem = passwordProblem(password);
  if (pwProblem) return { error: pwProblem };
  if (password !== confirm) return { error: "Passwords do not match." };

  const existing =
    id.kind === "email" ? findUserByEmail(id.value) : findUserByPhone(id.value);
  if (existing) {
    return { error: "An account with this email or number already exists. Try logging in." };
  }

  const userId = crypto.randomUUID();
  createUser({
    id: userId,
    name,
    email: id.kind === "email" ? id.value : null,
    phone: id.kind === "phone" ? id.value : null,
    passwordHash: hashPassword(password),
  });
  await createSession(userId);
  redirect("/account");
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const identifierRaw = String(formData.get("identifier") ?? "");
  const password = String(formData.get("password") ?? "");

  const id = parseIdentifier(identifierRaw);
  if (!id || !password) {
    return { error: "Enter your email/mobile and password." };
  }

  const user =
    id.kind === "email" ? findUserByEmail(id.value) : findUserByPhone(id.value);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return { error: "Incorrect email/mobile or password." };
  }

  await createSession(user.id);
  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

export async function requestResetAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const identifierRaw = String(formData.get("identifier") ?? "");
  const id = parseIdentifier(identifierRaw);
  if (!id) return { error: "Enter the email or mobile number on your account." };

  const user =
    id.kind === "email" ? findUserByEmail(id.value) : findUserByPhone(id.value);

  // Don't reveal whether the account exists.
  const generic: ActionState = {
    notice:
      "If an account exists for that email or number, a password reset link has been created.",
  };
  if (!user) return generic;

  const token = crypto.randomBytes(32).toString("hex");
  createPasswordReset(token, user.id, Date.now() + 60 * 60 * 1000); // 1 hour

  // Email isn't wired up yet, so in development we surface the link directly
  // so it can be tested. In production this link would be emailed/SMSed.
  return { ...generic, resetUrl: `/account/reset?token=${token}` };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const pwProblem = passwordProblem(password);
  if (pwProblem) return { error: pwProblem };
  if (password !== confirm) return { error: "Passwords do not match." };

  const reset = getPasswordReset(token);
  if (!reset || reset.used || reset.expires_at < Date.now()) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }
  const user = findUserById(reset.user_id);
  if (!user) return { error: "This reset link is invalid." };

  updateUserPassword(user.id, hashPassword(password));
  markPasswordResetUsed(token);
  redirect("/account/login?reset=1");
}

// ---------------- OTP login (passwordless) ----------------

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_RESEND_COOLDOWN_MS = 30 * 1000;
const OTP_MAX_ATTEMPTS = 5;

/** Request (or resend) a one-time login code. Also used by the Resend button. */
export async function requestOtpAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseIdentifier(String(formData.get("identifier") ?? ""));
  if (!id) return { error: "Enter a valid email or 10-digit mobile number." };

  const base: ActionState = {
    sent: true,
    identifier: id.value,
    notice: `We sent a 6-digit code to your ${id.kind === "email" ? "email" : "mobile"}. It expires in 10 minutes.`,
  };

  const user =
    id.kind === "email" ? findUserByEmail(id.value) : findUserByPhone(id.value);
  // Don't reveal whether the account exists — advance either way.
  if (!user) return base;

  const latest = getLatestOtp(id.value);
  if (latest && Date.now() - latest.created_at < OTP_RESEND_COOLDOWN_MS) {
    return {
      sent: true,
      identifier: id.value,
      error: "Please wait about 30 seconds before requesting a new code.",
    };
  }

  const code = String(crypto.randomInt(100000, 1000000));
  deleteOtpsForIdentifier(id.value);
  createOtp({
    id: crypto.randomUUID(),
    identifier: id.value,
    userId: user.id,
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
  });

  // Email/SMS isn't wired yet, so in development we surface the code directly.
  // In production this would be sent to the patient and NOT returned here.
  const devCode = process.env.NODE_ENV !== "production" ? code : undefined;
  return { ...base, devCode };
}

export async function verifyOtpAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseIdentifier(String(formData.get("identifier") ?? ""));
  const code = String(formData.get("code") ?? "").trim();
  if (!id) return { error: "Something went wrong — please start again." };

  const back: ActionState = { sent: true, identifier: id.value };
  const otp = getLatestOtp(id.value);
  if (!otp || otp.expires_at < Date.now()) {
    return { ...back, error: "This code has expired. Please request a new one." };
  }
  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    return { ...back, error: "Too many incorrect attempts. Please request a new code." };
  }
  if (code !== otp.code) {
    incrementOtpAttempts(otp.id);
    return { ...back, error: "Incorrect code. Please try again." };
  }

  await createSession(otp.user_id);
  deleteOtpsForIdentifier(id.value);
  redirect("/account");
}

// ---------------- Appointments ----------------

function validBooking(type: string, date: string, slot: string): string | null {
  if (!appointmentTypes.includes(type)) return "Please choose a valid treatment.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Please choose a valid date.";
  if (!timeSlots.includes(slot)) return "Please choose a valid time slot.";
  if (isPast(date, slot)) return "Please choose a date and time in the future.";
  return null;
}

export async function bookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const type = String(formData.get("type") ?? "");
  const date = String(formData.get("date") ?? "");
  const slot = String(formData.get("slot") ?? "");

  const problem = validBooking(type, date, slot);
  if (problem) return { error: problem };
  if (slotTaken(date, slot)) {
    return { error: "That time slot is already booked. Please pick another." };
  }

  createAppointment({ id: crypto.randomUUID(), userId: user.id, type, date, timeSlot: slot });
  redirect("/account?booked=1");
}

export async function updateAppointmentAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const apptId = String(formData.get("id") ?? "");
  const type = String(formData.get("type") ?? "");
  const date = String(formData.get("date") ?? "");
  const slot = String(formData.get("slot") ?? "");

  const appt = getAppointment(apptId);
  if (!appt || appt.user_id !== user.id) return { error: "Appointment not found." };
  if (appt.status === "cancelled") return { error: "This appointment was cancelled." };
  if (!canModify(appt.date, appt.time_slot)) {
    return { error: "Changes are only allowed up to 24 hours before an appointment. Please call the clinic." };
  }

  const problem = validBooking(type, date, slot);
  if (problem) return { error: problem };
  if (slotTaken(date, slot, apptId)) {
    return { error: "That time slot is already booked. Please pick another." };
  }

  updateAppointmentDetails(apptId, type, date, slot);
  redirect("/account?updated=1");
}

export async function cancelAppointmentAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const apptId = String(formData.get("id") ?? "");
  const appt = getAppointment(apptId);
  if (!appt || appt.user_id !== user.id) return { error: "Appointment not found." };
  if (!canModify(appt.date, appt.time_slot)) {
    return { error: "Cancellations are only allowed up to 24 hours before. Please call the clinic." };
  }

  setAppointmentStatus(apptId, "cancelled");
  redirect("/account?cancelled=1");
}
