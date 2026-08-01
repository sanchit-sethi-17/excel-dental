# Patient portal — PARKED (not part of the website right now)

Parked on 2026-08-02 at the client's request: "leave the whole login system for now,
just keep it on the side."

**Nothing was deleted.** Every file is here, unchanged and working. The folder
structure below mirrors where each file lived, so putting it back is a straight
reverse move.

## What's in here

A complete patient portal: register / login (email **or** mobile number),
password login, OTP (one-time code) login with resend, forgot-password reset,
a dashboard of the patient's appointments, and book / change / cancel with a
24-hour cutoff before the appointment.

It was fully tested and working locally before being parked.

```
src/app/account/          all the portal pages + server actions
src/components/account/   the portal's forms and UI
src/lib/auth.ts           password hashing + login sessions
src/lib/db.ts             the database (the ONLY file that touches it)
src/lib/booking.ts        time slots, appointment types, the 24-hour rule
src/lib/validate.ts       email / phone checks
src/lib/form-state.ts     shared form types
src/types/node-sqlite.d.ts  types for the local database
```

## Why the website still works without it

The portal was self-contained. The only other file that knew about it was the
navbar (an account icon), which was removed. The public site's own
"Book Appointment" form is separate and untouched — it still opens WhatsApp.

## To bring it back

From the `excel-dental` folder:

```bash
git mv _parked/patient-portal/src/app/account src/app/account
git mv _parked/patient-portal/src/components/account src/components/account
git mv _parked/patient-portal/src/lib/*.ts src/lib/
git mv _parked/patient-portal/src/types/node-sqlite.d.ts src/types/node-sqlite.d.ts
```

Then:

1. Put the account link back in `src/components/navbar.tsx` (desktop `User`
   icon + the mobile "My account" item). See commit `e1ae8ea`'s version of that
   file for the exact markup.
2. Remove `"_parked"` from `exclude` in `tsconfig.json` and `"_parked/**"` from
   `eslint.config.mjs` — these only exist to keep this folder out of the build.
3. `npm run dev`, then open <http://localhost:3000/account/register>.

To actually put it **live** (not just local), see section 4 of `STATUS.md` —
it needs GitHub + a free Postgres database + secrets.
