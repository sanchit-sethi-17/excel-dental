"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-foreground placeholder:text-stone-400 transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/15";

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-subtle">{hint}</p>}
    </div>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}

export function Alert({
  kind,
  children,
}: {
  kind: "error" | "notice";
  children: ReactNode;
}) {
  const styles =
    kind === "error"
      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
      : "border-line bg-surface-2 text-muted";
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`} role="alert">
      {children}
    </div>
  );
}
