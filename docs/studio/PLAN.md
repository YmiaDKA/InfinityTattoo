# Infinity Studio: replacing Linework

Plan and status for replacing Linework (linework.no) at Infinity Tattoo with a free, self-hosted booking and studio system.
Updated 2026-10-12. Sources are linked inline. Anything marked *inferred* was not confirmed from a primary source.

## 1. The short answer

- **Everything Linework does except the till is built** in `studio/` and runs free on Cloudflare: booking, calendar, clients, consent forms, client emails, deposits, gift cards, staff log, daily and monthly reports.
- **The till (kassasystem) must be a declared product from another company.** Norwegian law requires card, Vipps and cash taken in the studio to go through a *produkterklært kassasystem* whose supplier is independent of the business ([Skatteetaten](https://www.skatteetaten.no/rettskilder/type/uttalelser/prinsipputtalelser/egenutviklede-kassasystemer/)). The legal Z-report comes from that till. Fine for not using one: 10 rettsgebyr ≈ 13 450 kr, doubled on repeat ([Altinn](https://info.altinn.no/starte-og-drive/regnskap-og-revisjon/regnskap/kontantsalg-og-kassasystem/)).
- **Recommended till: Zettle (PayPal POS).** The app is free with no fixed fees, card is 1.75 %, Vipps through Zettle has no extra Zettle fee, and Zettle says it is on Skatteetaten's declared list with Z-reports and journal ([prices](https://www.zettle.com/no/priser), [kassasystem](https://www.zettle.com/no/kassasystem/godkjent-kassasystem)). It also has an API, so **our system imports every till payment automatically** and the daily settlement/artist split match the till without typing. Alternative: Vippskassa (no monthly fee, 1.75 %, declared when its bookkeeping features, cash drawer and printer are switched on; [Vipps](https://help.vippsmobilepay.com/nb-NO/articles/bookkeeping-obligations)) but no import.
- **Today:** the owner takes payments in Linework and uses its "Z-report". Linework never calls itself a kassasystem or mentions produkterklæring/Z-rapport on its site, and we couldn't read Skatteetaten's list from here (*inferred:* its report is a sales report, not a statutory Z-report). Worth checking the [list](https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/kassasystem/liste/) for "Linework" in a browser.
- **Folio** is his business bank (Sparebanken Norge partnership, 89–359 kr/month) with receipts, accountant access and Fiken/Tripletex integration. It has no till or Z-report, so it doesn't replace either ([folio.no/priser](https://www.folio.no/priser)). Our CSV export works for his accountant alongside it.

## 2. Feature coverage vs Linework

Linework features from [linework.no/priser](https://linework.no/priser), [/studioer](https://linework.no/studioer), [/artister](https://linework.no/artister) and the [App Store listing](https://apps.apple.com/app/id1611510851).

| Linework feature | Infinity Studio | Where |
|---|---|---|
| Online booking page | ✅ Native form on infinitytattoo.no (NO/EN), instant slots or tattoo request, reference photos, spam protection | Website + `/api` |
| Deposits online (card/Vipps/Klarna via Dintero) | ✅ Card (+ whatever is switched on in Stripe) via Stripe Checkout. Instant bookings hold the slot 30 min until paid; staff can send a deposit link from any booking | `/api`, booking page |
| Studio calendar, block time, availability | ✅ Day/week views, working hours per person, time off and studio closures, conflict check | Kalender, Innstillinger |
| Calendar sync to phone | ✅ Private subscription link per artist (iPhone/Google) | Innstillinger |
| Client records | ✅ Search, notes, birth date, history | Kunder |
| Consent / health form | ✅ Sent with confirmation and reminder, signed on phone, 18+ check with guardian, health flags shown on the booking | `/skjema/…` |
| SMS/email reminders | ✅ Email: request received, confirmation, reminder ~24 h before, cancellation, aftercare. ❌ SMS (costs per message anywhere) | Automatic |
| Aftercare after the session | ✅ Per-service text (NO/EN), sent when the booking is set to completed | Innstillinger → Behandlinger |
| Payment in the studio (Utsalgssted) | ↪ Zettle till (declared). Payments imported automatically; manual entry for anything else | Betalinger |
| Daily/weekly/monthly reports | ✅ Numbered, locked daily settlement with cash count; monthly artist settlement; CSV for the accountant | Dagsoppgjør, Artistoppgjør |
| Studio rent / commission split | ✅ Studio share % per artist on every report | Innstillinger → Ansatte |
| Multiple artists, managers | ✅ Unlimited staff and logins for free (Cloudflare Access, up to 50) | |
| Piercer | ✅ Nora is a staff member with her own services, hours and calendar | |
| Gift cards (2.99 % fee) | ✅ Sold online (Stripe) or in the studio, unique code, balance, redeem as payment method, 3-year validity, outstanding liability shown | Gavekort, website |
| Personalliste (needed for piercing as skjønnhetspleie) | ✅ Start/stop per person, append-only corrections with reason, printable. Linework doesn't have this | Personalliste |
| Products / ink inventory | ❌ Backlog. Product sales are already tracked as a payment type | |
| Flash booking | ❌ Backlog (can be a service with a fixed price today) | |
| Mobile app | Admin works in the phone browser and can be added to the home screen. No native app needed | |

## 3. What it costs

| | Linework today | Infinity Studio |
|---|---|---|
| Monthly | 790 kr studio + 490 kr per artist (excl. VAT), +190 kr for daily payouts | 0 kr (Cloudflare free plan, Resend free email up to 100/day) |
| Card in studio | 1.65 % | 1.75 % (Zettle) |
| Vipps in studio | 1.75 % | Through Zettle: no Zettle fee; Vipps' own pricing applies (*inferred*). Vippskassa: 1.75 % |
| Online deposits | Card 1.65 %, Vipps 1.75 %, Klarna 3.99 % | Stripe card fee (about 1.5 % + 1.80 kr for European cards; *check current Stripe pricing*) |
| Gift cards | 2.99 % | Stripe card fee online; till fee in studio |
| SMS | 0.99 kr each | Not used |

**Is Vipps free for businesses?** No, but there's no monthly or setup fee: in person 1.75 %, payment links 2.49 % + 1 kr, integrated online payments 2.99 % + 1 kr ([Vipps pricing](https://vippsmobilepay.com/nb-NO/pricing)).

## 4. Rules that shape the design

- Card and in-person Vipps count as *kontantsalg*; a bank terminal or Vipps alone is not a kassasystem ([Altinn](https://info.altinn.no/starte-og-drive/regnskap-og-revisjon/regnskap/kontantsalg-og-kassasystem/)).
- Booking systems are outside the kassasystem rules ([Skatteetaten FAQ](https://www.skatteetaten.no/nn/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/kassasystem/sporsmal-og-svar-om-nye-kassasystemer/)). Our system never issues receipts and never writes into the till.
- Online prepayments (deposits, gift cards online) are internet sales, not kontantsalg. Stripe's receipt email is the sales document ([Skatteetaten](https://www.skatteetaten.no/en/rettskilder/type/uttalelser/prinsipputtalelser/internet-sales-under-the-cash-register-systems-act-and-the-bookkeeping-regulation/)).
- Piercing is *skjønnhetspleie* (bokføringsforskriften kap. 8-3): personalliste plus booking documentation ([Skatteetaten](https://www.skatteetaten.no/en/rettskilder/type/skattedirektoratets-meldinger/krav-til-foring-av-personalliste/)). Bookings are never deleted and all changes are in `audit_log`.
- Health answers are sensitive personal data (GDPR art. 9): stored in Cloudflare D1, visible only to signed-in staff.

## 5. Architecture

```
infinitytattoo.no (Next.js; Vercel now, Cloudflare later)
  ├─ <StudioBooking/>, <StudioGiftCard/>  ──►  studio worker /api/*  (CORS-limited)
client email links ─────────────────────────►  /skjema/:id (consent), Stripe Checkout
staff phone/laptop ──Cloudflare Access──────►  /admin/*  (server-rendered)
artist phone calendar ──────────────────────►  /cal/:token.ics
Stripe ──webhook──► /api/stripe/webhook        Zettle ◄── hourly import (read-only)
cron (hourly): reminders, release unpaid holds, Zettle import
D1: staff, services, hours, time_off, clients, bookings, consents, payments, day_reports,
    gift_cards, online_payments, shifts, emails, audit_log      R2 (optional): reference photos
```

- `studio/` is a standalone Cloudflare Worker (Hono + D1). The website keeps working unchanged until `NEXT_PUBLIC_STUDIO_API_URL` is set, and falls back to Linework if the API is down.
- Each integration (email, Stripe, Zettle, R2 photos, Turnstile, studio notifications) switches on by adding its key; nothing breaks without it. *Innstillinger → Tilkoblinger* shows what's on.
- Money is integers in øre, times UTC, business dates Europe/Oslo. Daily settlements are sequentially numbered and frozen; payments on a closed day are locked.

## 6. Remaining backlog

1. Products and ink inventory with stock counts.
2. Flash sheet booking (fixed design + price on the website).
3. SMS reminders (needs a paid SMS provider).
4. Vipps ePayment for online deposits (2.99 % + 1 kr) if he wants Vipps online; Stripe covers card now.
5. Move the website from Vercel to Cloudflare and serve the API on the same domain.

## 7. Questions for the owner

1. **Till:** OK to switch in-studio payments from Linework to Zettle? (Needs a cash drawer + printer only if he takes cash.)
2. **Studio share:** what % does the studio keep from Filip and from Nora?
3. **Deposits:** amount per service, and is it refundable on cancellation?
4. **Logins:** which emails get access, and who is the owner (can change settings)?
5. **Org.nr.** for the personalliste header, and whether Nora's SUPREME.GEMZ is the same business or her own (affects whose till/report her sales belong to).
6. **Age policy:** tattoos under 18 at all? (The form currently requires a guardian's name under 18.)
7. **Health data retention:** how long to keep signed consent forms (we keep them until deleted).

## Notes

- `morluto/rea` (reverse-engineering MCP) couldn't be run against Linework from the cloud environment because linework.com is blocked there; the feature map is from public pages. It can be run locally against a trial account to double-check details.
- The "minlønn" repo (`YmiaDKA/Loenna`) is empty on GitHub, so conventions follow this repo's `AGENTS.md`.
