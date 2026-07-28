"use client";

import { useActionState } from "react";
import { Alert, Field, SubmitButton, inputClass } from "@/components/account/form-ui";
import { emptyState, type ActionState } from "@/lib/form-state";
import { appointmentTypes, formatSlot, timeSlots, todayISO } from "@/lib/booking";

export function AppointmentForm({
  action,
  submitLabel,
  id,
  defaults,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  id?: string;
  defaults?: { type?: string; date?: string; slot?: string };
}) {
  const [state, formAction] = useActionState(action, emptyState);
  return (
    <form action={formAction} className="space-y-5">
      {id && <input type="hidden" name="id" value={id} />}
      {state.error && <Alert kind="error">{state.error}</Alert>}

      <Field label="Treatment" htmlFor="type">
        <select id="type" name="type" defaultValue={defaults?.type ?? ""} className={inputClass}>
          <option value="" disabled>
            Choose a treatment…
          </option>
          {appointmentTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Date" htmlFor="date">
        <input id="date" name="date" type="date" min={todayISO()} defaultValue={defaults?.date ?? ""} className={inputClass} />
      </Field>

      <Field label="Time slot" htmlFor="slot" hint="Clinic hours: 10:00 am – 2:00 pm and 5:00 pm – 8:30 pm.">
        <select id="slot" name="slot" defaultValue={defaults?.slot ?? ""} className={inputClass}>
          <option value="" disabled>
            Choose a time…
          </option>
          {timeSlots.map((s) => (
            <option key={s} value={s}>
              {formatSlot(s)}
            </option>
          ))}
        </select>
      </Field>

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
