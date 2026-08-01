"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Alert, Field, SubmitButton, inputClass } from "@/components/account/form-ui";
import {
  loginAction,
  registerAction,
  requestResetAction,
  resetPasswordAction,
} from "@/app/account/actions";
import { emptyState } from "@/lib/form-state";

export function LoginForm({ justReset }: { justReset?: boolean }) {
  const [state, action] = useActionState(loginAction, emptyState);
  return (
    <form action={action} className="space-y-5">
      {justReset && <Alert kind="notice">Password updated — please log in.</Alert>}
      {state.error && <Alert kind="error">{state.error}</Alert>}
      <Field label="Email or mobile number" htmlFor="identifier">
        <input id="identifier" name="identifier" type="text" autoComplete="username" className={inputClass} placeholder="you@example.com or 98xxxxxxxx" />
      </Field>
      <Field label="Password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" className={inputClass} />
      </Field>
      <div className="flex justify-end">
        <Link href="/account/forgot" className="text-sm font-medium text-accent hover:underline">
          Forgot password?
        </Link>
      </div>
      <SubmitButton>Log in</SubmitButton>
      <p className="text-center text-sm text-muted">
        or{" "}
        <Link href="/account/otp" className="font-medium text-accent hover:underline">
          log in with a one-time code
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, emptyState);
  return (
    <form action={action} className="space-y-5">
      {state.error && <Alert kind="error">{state.error}</Alert>}
      <Field label="Full name" htmlFor="name">
        <input id="name" name="name" type="text" autoComplete="name" className={inputClass} placeholder="e.g. Anita Sharma" />
      </Field>
      <Field
        label="Email or mobile number"
        htmlFor="identifier"
        hint="You'll use this to log in. A 10-digit Indian mobile or an email."
      >
        <input id="identifier" name="identifier" type="text" autoComplete="username" className={inputClass} placeholder="you@example.com or 98xxxxxxxx" />
      </Field>
      <Field label="Password" htmlFor="password" hint="At least 8 characters.">
        <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <Field label="Confirm password" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <SubmitButton>Create account</SubmitButton>
    </form>
  );
}

export function ForgotForm() {
  const [state, action] = useActionState(requestResetAction, emptyState);
  return (
    <form action={action} className="space-y-5">
      {state.error && <Alert kind="error">{state.error}</Alert>}
      {state.notice && <Alert kind="notice">{state.notice}</Alert>}
      {state.resetUrl && (
        <Alert kind="notice">
          <span className="font-medium">Dev mode:</span> email isn&rsquo;t connected yet, so use this
          reset link directly:{" "}
          <Link href={state.resetUrl} className="font-medium text-accent underline break-all">
            {state.resetUrl}
          </Link>
        </Alert>
      )}
      <Field label="Email or mobile number" htmlFor="identifier">
        <input id="identifier" name="identifier" type="text" autoComplete="username" className={inputClass} placeholder="you@example.com or 98xxxxxxxx" />
      </Field>
      <SubmitButton>Send reset link</SubmitButton>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [state, action] = useActionState(resetPasswordAction, emptyState);
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="token" value={token} />
      {state.error && <Alert kind="error">{state.error}</Alert>}
      <Field label="New password" htmlFor="password" hint="At least 8 characters.">
        <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <Field label="Confirm new password" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <SubmitButton>Update password</SubmitButton>
    </form>
  );
}
