"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Alert, Field, SubmitButton, inputClass } from "@/components/account/form-ui";
import { requestOtpAction, verifyOtpAction } from "@/app/account/actions";
import { emptyState } from "@/lib/form-state";

export function OtpLogin() {
  const [reqState, reqAction] = useActionState(requestOtpAction, emptyState);
  const [verState, verAction] = useActionState(verifyOtpAction, emptyState);
  const [identifier, setIdentifier] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const phase: "request" | "verify" = reqState.sent ? "verify" : "request";
  const currentId = reqState.identifier || identifier;

  // Keep the last surfaced dev code visible even if a resend is throttled.
  const codeRef = useRef<string | undefined>(undefined);
  if (reqState.devCode) codeRef.current = reqState.devCode;

  // Count down the resend cooldown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  if (phase === "request") {
    return (
      <form action={reqAction} onSubmit={() => setCooldown(30)} className="space-y-5">
        {reqState.error && <Alert kind="error">{reqState.error}</Alert>}
        <Field
          label="Email or mobile number"
          htmlFor="identifier"
          hint="We'll send a one-time code to log you in — no password needed."
        >
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={inputClass}
            placeholder="you@example.com or 98xxxxxxxx"
          />
        </Field>
        <SubmitButton>Send code</SubmitButton>
      </form>
    );
  }

  return (
    <div className="space-y-5">
      {reqState.notice && <Alert kind="notice">{reqState.notice}</Alert>}
      {codeRef.current && (
        <Alert kind="notice">
          <span className="font-medium">Dev mode:</span> email/SMS isn&rsquo;t connected yet, so your
          code is <span className="font-mono text-base font-semibold text-foreground">{codeRef.current}</span>
        </Alert>
      )}

      <form action={verAction} className="space-y-5">
        <input type="hidden" name="identifier" value={currentId} />
        {verState.error && <Alert kind="error">{verState.error}</Alert>}
        <Field label="Enter the 6-digit code" htmlFor="code">
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className={`${inputClass} tracking-[0.4em] text-center text-lg`}
            placeholder="••••••"
          />
        </Field>
        <SubmitButton>Verify &amp; log in</SubmitButton>
      </form>

      <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-sm text-muted">Didn&rsquo;t get it?</span>
        <form action={reqAction} onSubmit={() => setCooldown(30)}>
          <input type="hidden" name="identifier" value={currentId} />
          <button
            type="submit"
            disabled={cooldown > 0}
            className="cursor-pointer text-sm font-medium text-accent hover:underline disabled:cursor-not-allowed disabled:text-subtle disabled:no-underline"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
        </form>
      </div>
      {reqState.error && <Alert kind="error">{reqState.error}</Alert>}
    </div>
  );
}
