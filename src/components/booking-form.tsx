"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowUpRight, CalendarPlus, CheckCircle2, MessageCircle } from "lucide-react";
import { submitBookingRequest } from "@/app/book/actions";
import {
  buildWhatsAppMessage,
  emptyFields,
  validateBooking,
  type BookingFields,
  type FieldErrors,
  type SubmitResult,
} from "@/lib/booking-requests";
import { buildAppointmentIcs, icsDataUri } from "@/lib/ics";
import { formatDate, formatSlot, isClosed, slotsForDate, todayISO } from "@/lib/slots";
import { site, whatsappLink } from "@/lib/site";
import { focusTreatments, otherServices } from "@/lib/treatments";

const treatmentOptions = [
  "Regular check-up & cleaning",
  ...focusTreatments.map((t) => t.name),
  ...otherServices.map((s) => s.name),
  "Not sure — I'd like advice",
];

const inputClasses =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-foreground placeholder:text-stone-400 transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/15";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-stone-400">(optional)</span>
        ) : (
          <span className="text-accent">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Request appointment"}
      {!pending && <ArrowUpRight className="h-4 w-4" />}
    </button>
  );
}

const initialState: SubmitResult = { ok: false };

export function BookingForm() {
  const [fields, setFields] = useState<BookingFields>(() => emptyFields("appointment"));
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [state, formAction] = useActionState(submitBookingRequest, initialState);
  const [waLink, setWaLink] = useState("");

  const set = <K extends keyof BookingFields>(key: K, value: BookingFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setClientErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const slots = useMemo(
    () => (fields.date ? slotsForDate(fields.date) : []),
    [fields.date],
  );
  const closedThatDay = fields.date ? isClosed(fields.date) : false;

  // Drop a chosen time if it stops being valid for a newly picked date.
  useEffect(() => {
    if (fields.slot && !slots.includes(fields.slot)) {
      setFields((prev) => ({ ...prev, slot: "" }));
    }
  }, [slots, fields.slot]);

  // Once the server has the request, hand off to WhatsApp as before.
  useEffect(() => {
    if (!state.ok || !state.reference) return;
    const link = whatsappLink(buildWhatsAppMessage(fields, state.reference));
    setWaLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
    // Only when a new reference arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok, state.reference]);

  // Client errors layer over server ones, but only where they actually hold a
  // message — a plain spread would let cleared (undefined) entries mask what
  // the server just told us.
  const errors: FieldErrors = { ...state.errors };
  for (const [key, message] of Object.entries(clientErrors)) {
    if (message) errors[key as keyof FieldErrors] = message;
  }

  if (state.ok && state.reference) {
    const ics = buildAppointmentIcs({
      dateISO: fields.date,
      slot: fields.slot,
      treatment: fields.treatment,
      reference: state.reference,
    });
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-accent">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium text-foreground">
          We&rsquo;ve got your request
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          The clinic has your details and will call you on{" "}
          <span className="font-medium text-foreground">{fields.phone}</span> to
          confirm. Your reference is{" "}
          <span className="font-medium text-accent">{state.reference}</span>.
        </p>

        <dl className="mt-6 grid gap-2 rounded-2xl border border-line bg-background p-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Treatment</dt>
            <dd className="text-right font-medium text-foreground">{fields.treatment}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Date</dt>
            <dd className="text-right font-medium text-foreground">{formatDate(fields.date)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Time</dt>
            <dd className="text-right font-medium text-foreground">{formatSlot(fields.slot)}</dd>
          </div>
        </dl>

        {state.message && (
          <p className="mt-5 rounded-2xl border border-line bg-background p-4 text-sm text-muted">
            {state.message}
          </p>
        )}

        <p className="mt-6 text-sm text-muted">
          We&rsquo;ve also opened WhatsApp so you can message the clinic directly —
          useful if you want to add anything.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep"
          >
            <MessageCircle className="h-4 w-4" />
            Message on WhatsApp
          </a>
          <a
            href={icsDataUri(ics)}
            download={`excel-dental-${state.reference}.ics`}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-accent"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to calendar
          </a>
        </div>

        <p className="mt-6 border-t border-line pt-5 text-sm text-subtle">
          This is a request — the clinic confirms the final time. Need it sooner?
          Call{" "}
          <a href={site.phoneHref} className="font-medium text-accent">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const found = validateBooking(fields);
        if (Object.keys(found).length > 0) {
          e.preventDefault();
          setClientErrors(found);
        }
      }}
      noValidate
      className="rounded-3xl border border-line bg-surface p-8 sm:p-10"
    >
      <input type="hidden" name="kind" value="appointment" />
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="bf-company">Company</label>
        <input id="bf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id="bf-name" label="Your name" error={errors.name}>
            <input
              id="bf-name"
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "bf-name-error" : undefined}
              placeholder="e.g. Anita Sharma"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="bf-phone" label="Mobile number" error={errors.phone}>
            <input
              id="bf-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={fields.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={errors.phone ? "bf-phone-error" : undefined}
              placeholder="10-digit mobile number"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="bf-treatment" label="What do you need help with?" error={errors.treatment}>
            <select
              id="bf-treatment"
              name="treatment"
              value={fields.treatment}
              onChange={(e) => set("treatment", e.target.value)}
              aria-invalid={errors.treatment ? "true" : undefined}
              aria-describedby={errors.treatment ? "bf-treatment-error" : undefined}
              className={inputClasses}
            >
              <option value="" disabled>
                Choose a treatment
              </option>
              {treatmentOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="bf-date" label="Preferred date" error={errors.date}>
          <input
            id="bf-date"
            name="date"
            type="date"
            min={todayISO()}
            value={fields.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={errors.date ? "true" : undefined}
            aria-describedby={errors.date ? "bf-date-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field id="bf-slot" label="Preferred time" error={errors.slot}>
          <select
            id="bf-slot"
            name="slot"
            value={fields.slot}
            onChange={(e) => set("slot", e.target.value)}
            disabled={!fields.date || closedThatDay || slots.length === 0}
            aria-invalid={errors.slot ? "true" : undefined}
            aria-describedby={errors.slot ? "bf-slot-error" : undefined}
            className={`${inputClasses} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="" disabled>
              {!fields.date ? "Pick a date first" : "Choose a time"}
            </option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {formatSlot(s)}
              </option>
            ))}
          </select>
        </Field>

        {fields.date && closedThatDay && (
          <p className="sm:col-span-2 -mt-2 text-sm text-muted">{site.closedNote}</p>
        )}
        {fields.date && !closedThatDay && slots.length === 0 && (
          <p className="sm:col-span-2 -mt-2 text-sm text-muted">
            No times left today — please choose another date, or call the clinic.
          </p>
        )}

        <div className="sm:col-span-2">
          <Field id="bf-email" label="Email" error={errors.email} optional>
            <input
              id="bf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "bf-email-error" : undefined}
              placeholder="So we can email you a confirmation"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="bf-note" label="Anything we should know?" optional>
            <textarea
              id="bf-note"
              name="note"
              rows={3}
              value={fields.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="e.g. tooth pain since last week, sensitive to cold…"
              className={inputClasses}
            />
          </Field>
        </div>
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="mt-6 rounded-2xl border border-line bg-background p-4 text-sm text-muted">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="mt-4 text-sm text-subtle">
        We&rsquo;ll call to confirm. Your details are used only to arrange this
        appointment.
      </p>
    </form>
  );
}
