# Excel Dental — Project Status & Handover

Last updated: 2026-08-02

**Client:** Excel Dental Clinic & Implant Centre, Sector 21C, Faridabad
**Led by:** Dr. Walia (BDS, MDS) — ex-consultant at Clove Dental & Axiss Dental
**Phone:** +91 98103 09132
**Address:** Shop No. 195, Basement, Huda Market, Sector 21C, Faridabad — 121001
**Tagline:** "Smile with confidence"

**Live site:** <https://excel-dental-sepia.vercel.app>
(Vercel project `excel-dental`, personal team `sanchit1717-9130s-projects`)

---

## 1. What is LIVE right now

The marketing website is deployed and working:

- **Pages:** Home, About, Treatments (+ 4 detail pages), Consultants, Contact, Book
- **12 services, each with a photo** — Implants, Root Canal, Orthodontics, Oral
  Hygiene (these 4 have full detail pages), plus Full Mouth Rehabilitation,
  Implant-Supported Dentures, Crowns & Bridges, Laser Dentistry, Child Dentistry,
  Tooth Extraction, Gum Care, Dentures
- **Dark mode** — sun/moon toggle in the navbar, follows the visitor's system
  setting, remembers their choice, no flash on load
- **Booking (current live method):** a form that opens WhatsApp with the request
  pre-filled to +91 98103 09132
- Google Maps embed, reviews section, SEO metadata + business schema + sitemap
- Blog and Gallery pages were **removed** at client request (code kept dormant,
  easy to restore)

## 2. Patient Portal — BUILT, then PARKED (2026-08-02)

**Status: parked, not deleted.** At the client's request the login system was
set aside for now. Every file was moved intact to
**`_parked/patient-portal/`** — see `RESTORE.md` in that folder for the exact
commands to bring it back (a few file moves + one navbar edit).

The account icon was removed from the navbar, and `/account` no longer exists on
the site. The public "Book Appointment" form (WhatsApp) is unaffected.

It was fully working locally before parking. Features built:

- **Register / Login** using **email OR mobile number** as the username
- **Password login** (securely hashed — scrypt)
- **OTP login** (passwordless): 6-digit code, 10-minute expiry, **Resend** button
  with 30-second cooldown, max 5 wrong attempts
- **Forgot password** → reset link (1-hour expiry, single use)
- **Dashboard** showing the patient's appointments: date, time slot, type, status
  (split into Upcoming vs Past/Cancelled)
- **Book / Change / Cancel** — patients can change the time slot or treatment
  type, or cancel, **up to 24 hours before** the appointment. Inside 24h it locks
  and tells them to call the clinic.
- Prevents double-booking the same date + time slot

> **Note:** OTP codes and password-reset links were **shown on screen**, because
> no email/SMS provider is connected yet. See section 4, step 4.

### How to run the site locally

```bash
cd excel-dental
npm run dev
```

Then open <http://localhost:3000>. (The portal URLs under `/account` are gone
while it's parked — restore it first, per `_parked/patient-portal/RESTORE.md`.)

## 3. Tech overview

- **Next.js 16** (App Router) + **Tailwind v4** + **Motion** (animations), on Vercel
- Fonts: Fraunces (headings) + Inter (body). Brand colour `#C1502E` (burnt orange
  from the clinic logo) with warm neutral greys; light + dark themes via CSS tokens
- Service photos are licensed **Unsplash** images served from their CDN. Local
  backup copies are in `public/images/services/` (see `CREDITS.txt` there) — to
  self-host instead, switch the URLs back to `/images/services/<name>.jpg`
- The clinic logo is a **recreated SVG** (from the business card) — replace if the
  client supplies the original artwork

**Key files**

| File | Purpose |
| --- | --- |
| `src/lib/site.ts` | all clinic facts: phone, address, hours, Cal.com switch |
| `src/lib/treatments.ts` | every service: name, photo, copy, FAQs |
| `src/components/navbar.tsx` | site navigation |
| `_parked/patient-portal/` | the parked login system + `RESTORE.md` |
| `DEPLOY.md` | step-by-step deployment guide |

## 4. TO GO LIVE with the portal — only if it's un-parked (3 steps + 1 optional)

*(Not needed while the portal is parked. Kept here for when it comes back.)*

**Step 1 — GitHub.** Create an empty private repo called `excel-dental` (no
README/gitignore). The code is already committed locally, so just:

```bash
git remote add origin https://github.com/<your-username>/excel-dental.git
git push -u origin main
```

**Step 2 — Connect Vercel.** Vercel → `excel-dental` project → Settings → Git →
connect that repo. After this, **every push auto-deploys** (no more manual uploads).

**Step 3 — Free database.** Either Vercel → Storage → Create Postgres, or a free
DB at <https://neon.tech>. Then add in Vercel → Settings → Environment Variables:

- `DATABASE_URL` — the Postgres connection string
- `SESSION_SECRET` — a long random string (`openssl rand -hex 32`)

**Then:** the developer un-parks the portal and swaps
`_parked/patient-portal/src/lib/db.ts` from local SQLite to Postgres, and
pushes. Portal goes live.

**Step 4 (optional) — real OTP / email delivery.** Connect **Resend** (email) for
reset links and email OTPs, and/or an SMS provider like **MSG91** or **Twilio**
for mobile OTPs. Until then codes appear on screen.

## 5. Cal.com

Cal.com **cannot** provide patient logins — that's why the portal above was built
custom. Cal.com is still useful for syncing the *clinic's own* calendar.

- The embed is **already coded** and dormant. To switch it on: in `src/lib/site.ts`
  set `booking.calcom.enabled = true` and paste the event link
  (e.g. `excel-dental/consultation`).
- **Cost: free.** The free Cal.com plan covers this clinic. Paid tiers
  (~$12–15/user/month, or $99+/month for the developer API) are **not needed**.

## 6. Costs (what the client actually pays)

| Item | One-time | Recurring | Needed? |
| --- | --- | --- | --- |
| Domain (e.g. exceldental.in) | — | ₹800–1,500 / year | ✅ for launch |
| Website hosting (Vercel) | — | ₹0 (free tier) | ✅ already on it |
| SSL / security | — | ₹0 (automatic) | ✅ done |
| **Google Business Profile** | ₹0 | ₹0 | ✅ **biggest win for Google search** |
| Cal.com booking | ₹0 | ₹0 (free plan) | optional |
| Database (Neon / Vercel Postgres) | ₹0 | ₹0 (free tier) | only if portal returns |
| Professional email (info@…) | — | ₹0–200 / month | optional |
| WhatsApp automation (bot) | new SIM ~₹0–500 | ₹1,000–3,000 / month + per-message | optional |
| Google Ads | — | client's ad budget | optional |

**Bottom line to launch properly: ~₹800–1,500/year (just the domain).**
Everything else sits on free tiers. Your own development/service fee is separate.

### Getting found on Google
1. **Google Business Profile is free and the #1 priority** for a local clinic —
   it's what shows the clinic in "dentist near me" and on Maps. **Not set up yet**
   — needs the clinic owner to create + verify it.
2. The website already has the SEO technical basics. Rankings then come from
   Google reviews + consistency (free, but takes time).
3. **Google Ads** is optional and instant but paid — typical small local clinic
   spends ₹10,000–50,000/month, entirely the client's choice.

## 7. WhatsApp automation bot — prerequisites (NOT built)

⚠️ Flag for the client: an automated WhatsApp bot **is** an AI chatbot, just in
WhatsApp instead of on the website — and they declined a website chatbot twice.
Confirm they knowingly want it before spending money.

**Recommendation: a menu/button bot, not a free-text AI bot.** Booking,
rescheduling and cancelling are structured tasks — a menu handles them perfectly
and will never invent wrong medical advice (a real liability risk for a clinic).

Before starting, gather:

- [ ] Client confirmation + agreed scope (book / reschedule / cancel / FAQs / handoff)
- [ ] **A dedicated phone number** — a number on the WhatsApp API can't also be
      used in the normal WhatsApp app. Either buy a new SIM (most clinics do this)
      or migrate the clinic's number and lose normal WhatsApp on it.
- [ ] **Meta Business verification** — clinic registration / GST / utility bill.
      ⏳ Slowest step (days to weeks) — start it first.
- [ ] Budget approval (see cost table)
- [ ] Opt-in method + a short privacy note (it's patient data)
- [ ] Choose a provider: an Indian BSP (**AiSensy, Wati, Interakt, Gupshup**) is
      easiest/no-code; a custom Meta Cloud API build is more flexible but needs a
      backend + ongoing maintenance

## 8. Still pending FROM THE CLIENT

- [ ] Real clinic & team **photos** (licensed stock in use now)
- [ ] Original **logo file** (a clean SVG recreation is in use)
- [ ] Clinic **email address**
- [ ] **Confirmed opening hours** — currently placeholders:
      Mon–Sat 10:00am–2:00pm & 5:00pm–8:30pm, Sun by appointment
- [ ] Real **Google reviews** — the 3 testimonials on the site are samples and
      **must be replaced before a public launch**
- [ ] Names/photos of any **other consultants**
- [ ] **Cal.com account** → booking link (if they want calendar sync)
- [ ] **Custom domain** purchase (site is on a free `.vercel.app` link)
- [ ] **Google Business Profile** setup

## 9. Client decisions on record

- ❌ **No AI chatbot on the website** — declined twice
- ❌ **Not a cosmetic practice** — teeth whitening deliberately excluded; no
  makeover-style messaging or imagery
- ✅ **"Dr. Walia"** only — no first name, and **no photo of the doctor**
- ✅ Copy must be **short, simple, professional** — not flowery or "corny"
- ✅ Monochrome/understated design with the burnt-orange accent from the logo
- ✅ Blog + Gallery removed for now
- ✅ Every service must show a photo (reference: ivorysmilesdentalclinic.com/services)
