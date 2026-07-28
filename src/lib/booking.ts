import { focusTreatments, otherServices } from "@/lib/treatments";

/** Appointment types the patient can pick — kept in sync with our services. */
export const appointmentTypes: string[] = [
  "Consultation / Check-up",
  ...focusTreatments.map((t) => t.name),
  ...otherServices.map((s) => s.name),
];

/** Bookable time slots (24h "HH:MM"), from the clinic's opening hours. */
export const timeSlots: string[] = (() => {
  const slots: string[] = [];
  const windows: [number, number][] = [
    [10 * 60, 13 * 60 + 30], // 10:00 – 13:30
    [17 * 60, 20 * 60], // 17:00 – 20:00
  ];
  for (const [start, end] of windows) {
    for (let m = start; m <= end; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
    }
  }
  return slots;
})();

/** How long before an appointment a patient can still change or cancel it. */
export const MODIFY_CUTOFF_HOURS = 24;

/** Local Date for the start of an appointment. */
export function appointmentStart(date: string, slot: string): Date {
  return new Date(`${date}T${slot}:00`);
}

/** True if the appointment is far enough away to still be edited/cancelled. */
export function canModify(date: string, slot: string): boolean {
  const start = appointmentStart(date, slot);
  const cutoff = Date.now() + MODIFY_CUTOFF_HOURS * 60 * 60 * 1000;
  return start.getTime() > cutoff;
}

export function isPast(date: string, slot: string): boolean {
  return appointmentStart(date, slot).getTime() < Date.now();
}

/** "10:30" -> "10:30 AM". */
export function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

/** "2026-07-30" -> "Thu, 30 Jul 2026". */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
