# Infinity Studio: replacing Linework

Plan for replacing Linework (linework.no) at Infinity Tattoo with a free, self-hosted booking and studio system.
Written 2026-10-12. Sources are linked inline. Anything marked *inferred* was not confirmed from a primary source.

## 1. The short answer

- **Booking, calendar, clients, consent forms, artist settlements and reports can be built ourselves and hosted free on Cloudflare.** This is what `studio/` does.
- **The in-studio till cannot be self-built.** Norwegian law requires card, Vipps and cash payments taken in the studio to go through a *produkterklært kassasystem*, and the declaration must come from a supplier that is independent of the business ([Skatteetaten: egenutviklede kassasystemer](https://www.skatteetaten.no/rettskilder/type/uttalelser/prinsipputtalelser/egenutviklede-kassasystemer/)). The legal **Z-report must come from that till.**
- So the recommended setup is: **our system for everything except the till + a cheap declared till app** (Vippskassa has no monthly fee; Zettle's kassasystem is 279 kr/month). Our system mirrors the till's payments and produces the studio's own *dagsoppgjør* (daily settlement per artist), which is what Linework's "reports" cover today.
- **Check this with the owner:** Linework never claims to be a declared kassasystem (it only says it "syncs" with one, [linework.no/om-oss](https://linework.no/om-oss)). *Inferred:* if the studio takes in-person payments only through Linework today, it may already be out of line with the rules. Worth asking the owner/accountant what till produces their Z-report today.

## 2. What Linework does (public info)

Source: [linework.no/priser](https://linework.no/priser), [/studioer](https://linework.no/studioer), [/artister](https://linework.no/artister), [App Store](https://apps.apple.com/app/id1611510851). We could not open the studio's own account, and the booking page (`booking.linework.com/infinity`) is a JS app our cloud environment cannot reach, so the exact fields and deposit rules are unverified.

| Area | Linework | Infinity Studio MVP |
|---|---|---|
| Online booking | Booking page per artist/studio, services and flash | ✅ Native form on infinitytattoo.no (instant slots for piercing/tooth gems/consults, requests for custom tattoos) |
| Calendar | Shared studio calendar, day/3-day/week, block time, Google/Apple import | ✅ Day + week views, working hours per person, time off table. Backlog: drag-and-drop, iCal feed |
| Clients | Client records | ✅ Client list, search, notes, history |
| Consent / health forms | Sent automatically 1 h before, stored | 🟡 Table ready; signing page is backlog item #1 |
| Deposits | Card/Vipps/Klarna via Dintero | 🟡 Recorded manually now; online deposit links (Stripe or Vipps) are backlog |
| In-studio payment / POS | "Utsalgssted": cash, card terminal, credit | ❌ by design. Use a declared till (see §1). Payments are mirrored into our system |
| Reports | Daily/weekly/monthly, "accounting-ready" | ✅ Numbered, locked daily settlement (X preview + close), per method/type/artist, cash count, CSV export for the accountant |
| Studio rent / commission split | Automatic split studio vs artist | ✅ Per-artist studio share % in the daily settlement. Backlog: monthly settlement/invoice per artist |
| Multiple artists, piercer | Each artist pays their own plan | ✅ Unlimited staff at no cost. Nora (piercing/tooth gems) is a staff member with her own services |
| Gift cards | Sold by link, 2.99 % fee | 🟡 Gift card sale/redemption is tracked in payments. Backlog: selling them online with codes |
| Reminders | SMS + email | Backlog (email first; SMS costs money with any provider) |
| Aftercare | Sent with receipt | Backlog (email template per service) |
| Products / ink inventory | Yes | Backlog |
| Apps | iOS/Android for artists | The admin is a mobile-friendly web app. No native iOS app needed for the MVP (see §6) |

### What Linework costs

From [linework.no/priser](https://linework.no/priser): studio plan 790 kr/month + **490 kr/month per artist**, card 1.65 %, Vipps 1.75 %, Klarna 3.99 %, gift cards 2.99 %, SMS 0.99 kr, daily payouts 190 kr/month (all excl. VAT). SUPREME.GEMZ (Nora) has her own Linework booking page, so she likely pays her own plan too (*inferred*).

### What the replacement costs

| Item | Cost |
|---|---|
| Cloudflare Workers + D1 + Access (≤ 50 staff) + Email Routing | 0 kr (free plan limits are far above a single studio's use) |
| Declared till | Vippskassa: no monthly fee ([Vipps](https://vippsmobilepay.com/nb-NO/mobilt-kassasystem)), per-transaction fees not confirmed. Zettle: 279 kr/month + 1.75 % ([Zettle](https://www.zettle.com/no/help/articles/undefined/no/help/articles/2645269-kassasystemfunksjon)). SumUp: 1.49 %, but its declared-kassasystem status is unverified |
| Online deposits (later) | Stripe ~1.5–2.5 % per payment, no monthly fee |

Confirm the chosen till on [Skatteetaten's list of declared systems](https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/kassasystem/liste/) before buying hardware.

## 3. Norwegian rules that shape the design

- **Card and in-person Vipps count as *kontantsalg*.** A bank terminal alone is not a kassasystem ([Altinn](https://info.altinn.no/starte-og-drive/regnskap-og-revisjon/regnskap/kontantsalg-og-kassasystem/), [Skatteetaten FAQ](https://www.skatteetaten.no/nn/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/kassasystem/sporsmal-og-svar-om-nye-kassasystemer/)).
- **Booking systems are outside the kassasystem rules** ("Ordre-/bookingsystemer mv. omfattes ikke", same FAQ). That's why our system never issues receipts and never acts as the till.
- **Online prepayments/deposits are not kontantsalg** (internet sale). They still need a sales document per payment ([Skatteetaten on internet sales](https://www.skatteetaten.no/en/rettskilder/type/uttalelser/prinsipputtalelser/internet-sales-under-the-cash-register-systems-act-and-the-bookkeeping-regulation/)). The remainder paid in the studio goes through the till, with the deposit set off.
- **Exemption:** under 50 000 kr/year in-person sales (excl. VAT). Not realistic for this studio.
- **Penalty for using an undeclared system:** 10 rettsgebyr (≈ 13 450 kr), doubled on repeat ([Altinn](https://info.altinn.no/starte-og-drive/regnskap-og-revisjon/regnskap/kontantsalg-og-kassasystem/)).
- **Piercing is "skjønnhetspleie"** under bokføringsforskriften kap. 8-3, which adds a *personalliste* (staff sign-in log) and appointment-booking documentation ([Skatteetaten](https://www.skatteetaten.no/en/rettskilder/type/skattedirektoratets-meldinger/krav-til-foring-av-personalliste/)). *Inferred:* the studio should assume this applies. Our system keeps booking history (nothing is deleted, every change is in `audit_log`), and a personalliste is on the backlog. Confirm the exact § 8-3-3 requirements with the accountant.

What we must **not** do: build a till, write into the till provider's journal, call our report a "Z-rapport", or rely on the *kontantfaktura* route.

## 4. Architecture

```
infinitytattoo.no (Next.js, Vercel today → Cloudflare later)
   └─ <StudioBooking/>  ──fetch──►  studio worker  /api/*   (public, CORS-limited)
                                     │
staff (phone/laptop) ──Cloudflare Access──► /admin/*  (server-rendered, no JS framework)
                                     │
                                     └─ D1 (SQLite): staff, services, hours, clients,
                                        bookings, payments, day_reports, consents, audit_log
```

- `studio/` is a standalone Cloudflare Worker (Hono + D1). It deploys separately, so the website can stay on Vercel until the planned move and nothing in the site's build changes.
- The site shows the native form only when `NEXT_PUBLIC_STUDIO_API_URL` is set; otherwise (or if the API is down) it falls back to the Linework embed. Switching over is one environment variable.
- **Staff login = Cloudflare Access** (free up to 50 users, email one-time code or Google). The worker verifies the Access JWT itself; no passwords to build or store.
- **Money is integers in øre; times are UTC; business dates are Europe/Oslo.** Daily settlements are sequentially numbered, frozen as JSON at close, and payments on a closed day are locked (corrections go in as refunds on a later day).
- New requests email the studio through Cloudflare Email Routing (free).
- Open source reuse: we use Hono, jose and zod. Full open-source booking systems (Cal.com, Easy!Appointments) were not a fit: they need a server/Postgres or PHP host, don't run on the free Cloudflare tier, and know nothing about artist settlements. *Inferred:* their scheduling ideas are simple enough to reimplement in the ~100 lines in `src/lib/slots.ts`.

## 5. MVP (in this PR) and backlog

**MVP, done in this PR**
1. Native booking form on the homepage (bilingual, instant slots or tattoo request, honeypot + optional Turnstile, Google Ads conversion still fires).
2. Booking API with availability, double-booking protection and client de-duplication.
3. Admin: today, requests, week calendar, booking detail/edit, new booking (phone/Instagram/walk-in), clients.
4. Payments mirror (from the till) with duplicate protection, and per-artist split.
5. Daily settlement: X preview, close with cash count, numbered and locked, printable, CSV export.

**Backlog, in suggested order**
1. Consent/health form: signing link sent before the appointment (stored in `consents`, 18+ check).
2. Email confirmations and reminders to clients (Resend free tier or similar), aftercare email per service.
3. Online deposits: Stripe Checkout or Vipps payment link, webhook writes the deposit into `payments`.
4. Import payments from the till's API/export (Zettle has an API; Vippskassa: check) instead of typing them.
5. Settings pages: services, prices, working hours, time off, staff share % (now edited in the database).
6. Monthly artist settlement / studio rent invoice per artist.
7. Personalliste (staff check-in/out) if the accountant confirms kap. 8-3 applies.
8. Reference photo upload on the booking form (R2).
9. Gift cards sold online with codes and balance.
10. iCal feed per artist (subscribe from the phone calendar), Google Calendar import.
11. SMS reminders (costs per SMS with any provider).
12. Product and ink inventory.
13. Flash sheet booking (fixed design + price).
14. Move the website from Vercel to Cloudflare (OpenNext), then serve the API on the same domain.

## 6. Do we need an iOS app?

Not for the MVP. The admin works in a phone browser and can be added to the home screen. A native app becomes worth it for push notifications on new requests and tap-to-pay, and tap-to-pay belongs to the till provider's app anyway. Revisit after backlog item 2.

## 7. Open questions for the owner

1. Which till/kassasystem produces the Z-report today, and does the accountant need anything specific from us (SAF-T, CSV layout, Fiken/Tripletex)?
2. The studio/artist split for Filip and Nora (and any guest artists).
3. Deposit rules: amount per service, and whether it's refundable.
4. Which emails should get admin access.
5. What Nora's SUPREME.GEMZ Linework account is used for, and whether she moves too.

## Notes on the referenced repos

- `morluto/rea` is a reverse-engineering MCP tool. We planned to use its browser/JS-bundle analysis on Linework's booking page, but this cloud environment blocks linework.com, so the feature map above comes from public pages. It can be run locally against `booking.linework.com/infinity` (or a trial account) to confirm fields and deposit rules.
- The "minlønn" repo (`YmiaDKA/Loenna`) is empty on GitHub, so no conventions could be borrowed from it. Conventions here follow the site's own `AGENTS.md`.
