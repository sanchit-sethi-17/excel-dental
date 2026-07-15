"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, CalendarCheck, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { focusTreatments, otherServices } from "@/lib/treatments";

const treatmentOptions = [
  "Regular check-up & cleaning",
  ...focusTreatments.map((t) => t.name),
  ...otherServices.map((s) => s.name),
  "Not sure — I'd like advice",
];

const timeSlots = [
  "Morning (10:00 am – 2:00 pm)",
  "Evening (5:00 pm – 8:30 pm)",
  "Any time works",
];

type Errors = Partial<Record<"name" | "treatment" | "date", string>>;

const inputClasses =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-ink placeholder:text-stone-400 transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/15";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Booking without a backend: composes the request into a pre-filled WhatsApp
 * message to the clinic. The visitor reviews and sends it themselves in
 * WhatsApp. Swaps out for the Cal.com embed when site.booking.calcom.enabled.
 */
export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(timeSlots[0]);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [lastLink, setLastLink] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!treatment) next.treatment = "Please choose a treatment (or 'Not sure').";
    if (!date) next.date = "Please pick a preferred date.";
    return next;
  }

  function buildMessage() {
    const prettyDate = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const lines = [
      `Hi ${site.name}, I'd like to book an appointment.`,
      ``,
      `Name: ${name.trim()}`,
      `Treatment: ${treatment}`,
      `Preferred date: ${prettyDate}`,
      `Preferred time: ${slot}`,
    ];
    if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
    if (note.trim()) lines.push(`Note: ${note.trim()}`);
    return lines.join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // focus the first invalid field
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    const link = whatsappLink(buildMessage());
    setLastLink(link);
    setSent(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <MessageCircle className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium text-ink">
          WhatsApp should have opened
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">
          Your appointment request is pre-filled — just press{" "}
          <span className="font-medium text-ink">send</span> in WhatsApp and
          the clinic will confirm your slot.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href={lastLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep"
          >
            Didn&rsquo;t open? Tap here
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="cursor-pointer text-sm font-medium text-stone-600 underline-offset-4 hover:text-ink hover:underline"
          >
            Edit my request
          </button>
        </div>
        <p className="mt-6 border-t border-stone-100 pt-5 text-sm text-stone-500">
          Prefer to talk? Call us at{" "}
          <a href={site.phoneHref} className="font-medium text-brand">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="bf-name" className="mb-2 block text-sm font-medium text-ink">
            Your name <span className="text-brand">*</span>
          </label>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors((p) => ({ ...p, ...(!name.trim() ? { name: "Please tell us your name." } : { name: undefined }) }))}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "bf-name-error" : undefined}
            placeholder="e.g. Anita Sharma"
            className={inputClasses}
          />
          {errors.name && (
            <p id="bf-name-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bf-treatment" className="mb-2 block text-sm font-medium text-ink">
            What do you need help with? <span className="text-brand">*</span>
          </label>
          <select
            id="bf-treatment"
            value={treatment}
            onChange={(e) => {
              setTreatment(e.target.value);
              setErrors((p) => ({ ...p, treatment: undefined }));
            }}
            aria-invalid={errors.treatment ? "true" : undefined}
            aria-describedby={errors.treatment ? "bf-treatment-error" : undefined}
            className={`${inputClasses} ${treatment ? "" : "text-stone-400"}`}
          >
            <option value="" disabled>
              Choose a treatment…
            </option>
            {treatmentOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.treatment && (
            <p id="bf-treatment-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.treatment}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bf-date" className="mb-2 block text-sm font-medium text-ink">
            Preferred date <span className="text-brand">*</span>
          </label>
          <input
            id="bf-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((p) => ({ ...p, date: undefined }));
            }}
            aria-invalid={errors.date ? "true" : undefined}
            aria-describedby={errors.date ? "bf-date-error" : undefined}
            className={inputClasses}
          />
          {errors.date && (
            <p id="bf-date-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bf-slot" className="mb-2 block text-sm font-medium text-ink">
            Preferred time
          </label>
          <select
            id="bf-slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className={inputClasses}
          >
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bf-phone" className="mb-2 block text-sm font-medium text-ink">
            Phone number{" "}
            <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <input
            id="bf-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="In case the clinic needs to call you back"
            className={inputClasses}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bf-note" className="mb-2 block text-sm font-medium text-ink">
            Anything we should know?{" "}
            <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <textarea
            id="bf-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. tooth pain since last week, sensitive to cold…"
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-4 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
      >
        <CalendarCheck className="h-5 w-5" />
        Request appointment on WhatsApp
      </button>
      <p className="mt-4 text-sm leading-relaxed text-stone-500">
        This opens WhatsApp with your request pre-filled — you review it and
        press send. Nothing is sent until you do.
      </p>
    </form>
  );
}
