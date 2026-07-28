# Deploying Excel Dental

The **marketing site** (home, treatments, about, contact, booking-by-WhatsApp) is
already live. This guide covers putting it — and the new **patient portal**
(register / login / OTP / appointments) — on a proper Git-based deploy so every
change ships automatically, and so the portal's database + secrets work.

Do these once, top to bottom.

---

## A. Put the code on GitHub

1. On <https://github.com> create a **new empty private repo** named `excel-dental`.
   Do **not** add a README, .gitignore, or licence (this repo already has them).
2. In the `excel-dental` folder, run:

   ```bash
   git remote add origin https://github.com/<your-username>/excel-dental.git
   git branch -M main
   git push -u origin main
   ```

   (The repo is already initialised and committed locally.)

## B. Connect the repo to Vercel

1. <https://vercel.com> → your existing **excel-dental** project → **Settings → Git**
   → connect the GitHub repo you just pushed.
   (If it won't attach, import the repo as a new project and point the domain at it.)
2. From now on, **every `git push` to `main` auto-builds and deploys.** No more
   manual uploads.

## C. Create a free Postgres database (for the portal)

The portal needs a real database in production (locally it uses a file, which
serverless hosting can't keep). Easiest options:

- **Vercel Postgres** — Vercel project → **Storage** → Create → Postgres.
  It sets `DATABASE_URL` for you automatically. **or**
- **Neon** — <https://neon.tech> → new project → copy the connection string.

## D. Add environment variables on Vercel

Vercel project → **Settings → Environment Variables** → add (for Production):

| Name | Value |
| --- | --- |
| `DATABASE_URL` | the Postgres connection string (skip if Vercel Postgres set it) |
| `SESSION_SECRET` | a long random string — generate with `openssl rand -hex 32` |
| `RESEND_API_KEY` | *(optional)* email provider key, for real OTP / reset emails |

## E. Switch the portal from local SQLite to Postgres

Every database call lives in **one file: `src/lib/db.ts`**. Ask your developer to
swap that file's implementation from `node:sqlite` to Postgres (`pg`) reading
`DATABASE_URL`. Nothing else changes — the rest of the app only calls the
functions that file exports.

## F. (Recommended) real OTP + password-reset delivery

Right now, OTP codes and password-reset links are **shown on screen** because no
email/SMS provider is connected. To send them for real:

- **Email:** create a <https://resend.com> account, add `RESEND_API_KEY`, and the
  developer wires the send call. Good for email accounts.
- **SMS (for mobile-number OTP):** use an Indian provider such as **MSG91** or
  **Twilio**. This costs a small amount per SMS.

## G. Deploy

Push to `main` (or click **Redeploy** in Vercel). Done — website + portal live.

---

### Cost summary
- GitHub: free. Vercel hosting: free tier is enough.
- Postgres (Neon / Vercel Postgres): free tier is enough for a clinic.
- Email (Resend): generous free tier. SMS: pay-per-message only if you use mobile OTP.
