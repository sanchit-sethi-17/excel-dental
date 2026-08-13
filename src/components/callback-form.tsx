"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { submitBookingRequest } from "@/app/book/actions";
import {
  emptyFields,
  validateBooking,
  type BookingFields,
  type FieldErrors,
  type SubmitResult,
} from "@/lib/booking-requests";

const inputClasses =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-foreground placeholder:text-stone-400 transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/15";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
    >
      <PhoneCall className="h-4 w-4" />
      {pending ? "Sending…" : "Request a callback"}
    </button>
  );
}

const initialState: SubmitResult = { ok: false };

/**
 * The shortest possible path to a lead: a name and a number. For people who
 * don't want to pick a slot, or aren't sure what they need.
 */
export function CallbackForm() {
  const [fields, setFields] = useState<BookingFields>(() => emptyFields("callback"));
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [state, formAction] = useActionState(submitBookingRequest, initialState);

  // Only overlay client errors that actually carry a message, so cleared
  // entries can't mask what the server returned.
  const errors: FieldErrors = { ...state.errors };
  for (const [key, message] of Object.entries(clientErrors)) {
    if (message) errors[key as keyof FieldErrors] = message;
  }

  if (state.ok && state.reference) {
    return (
      <div className="rounded-2xl border border-line bg-background p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-accent">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <p className="mt-4 font-medium text-foreground">We&rsquo;ll call you back</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The clinic has your number and will ring during opening hours. Your
          reference is <span className="font-medium text-accent">{state.reference}</span>.
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
      className="rounded-2xl border border-line bg-background p-6"
    >
      <input type="hidden" name="kind" value="callback" />
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="cb-company">Company</label>
        <input id="cb-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="font-medium text-foreground">Rather we called you?</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Leave your number and the clinic will ring you back — no forms, no
        picking a time.
      </p>

      <div className="mt-5 grid gap-3">
        <div>
          <label htmlFor="cb-name" className="sr-only">
            Your name
          </label>
          <input
            id="cb-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => {
              setFields((p) => ({ ...p, name: e.target.value }));
              setClientErrors((p) => ({ ...p, name: undefined }));
            }}
            aria-invalid={errors.name ? "true" : undefined}
            placeholder="Your name"
            className={inputClasses}
          />
          {errors.name && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cb-phone" className="sr-only">
            Mobile number
          </label>
          <input
            id="cb-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => {
              setFields((p) => ({ ...p, phone: e.target.value }));
              setClientErrors((p) => ({ ...p, phone: undefined }));
            }}
            aria-invalid={errors.phone ? "true" : undefined}
            placeholder="10-digit mobile number"
            className={inputClasses}
          />
          {errors.phone && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
        <SubmitButton />
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="mt-4 text-sm text-muted">
          {state.message}
        </p>
      )}
    </form>
  );
}
