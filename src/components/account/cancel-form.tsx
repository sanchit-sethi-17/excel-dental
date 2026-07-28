"use client";

import { useActionState } from "react";
import { Alert } from "@/components/account/form-ui";
import { cancelAppointmentAction } from "@/app/account/actions";
import { emptyState } from "@/lib/form-state";

export function CancelForm({ id }: { id: string }) {
  const [state, action] = useActionState(cancelAppointmentAction, emptyState);
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Cancel this appointment? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {state.error && (
        <div className="mb-4">
          <Alert kind="error">{state.error}</Alert>
        </div>
      )}
      <button
        type="submit"
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-red-300 bg-surface px-5 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/30"
      >
        Cancel appointment
      </button>
    </form>
  );
}
