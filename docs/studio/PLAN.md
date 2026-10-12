# Infinity Studio: replacing Linework

Plan and status for replacing Linework (linework.no) at Infinity Tattoo with a free, self-hosted booking and studio system.
Updated 2026-10-12. Sources are linked inline. Anything marked *inferred* was not confirmed from a primary source.

## 1. The short answer

- **Everything Linework does except the till is built** in `studio/` and runs free on Cloudflare: booking, calendar, clients, consent forms, client emails, deposits, gift cards, staff log, daily and monthly reports.
- **The till (kassasystem) must be a declared product from another company.** Norwegian law requires card, Vipps and cash taken in the studio to go through a *produkterklært kassasystem* whose supplier is independent of the business ([Skatteetaten](https://www.skatteetaten.no/rettskilder/type/uttalelser/prinsipputtalelser/egenutviklede-kassasystemer/)). The legal Z-report comes from that till. Fine for not using one: 10 rettsgebyr ≈ 13 450 kr, doubled on repeat ([Altinn](https://info.altinn.no/starte-og-drive/regnskap-og-revisjon/regnskap/kontantsalg-og-kassasystem/)).
- **Recommended till: Zettle (PayPal POS).** The app is free with no fixed fees, card is 1.75 %, Vipps through Zettle is listed at 0 kr, and Zettle markets it as an approved kassasystem with Z-reports ([prices](https://www.zettle.com/no/priser), [kassasystem](https://www.zettle.com/no/kassasystem/godkjent-kassasystem)). **No hardware needed:** Tap to Pay on iPhone works in Norway (iPhone XS or newer) for cards and Apple Pay ([Zettle](https://www.paypal.com/no/zettle), [Apple regions](https://developer.apple.com/tap-to-pay/regions/)). A reader is 249 kr if he wants one. Our system imports every Zettle payment automatically, so the daily settlement and artist split match the till without typing.
- **Alternatives checked:**
  - SumUp is 1.49 % on cards with Tap to Pay in Norway ([SumUp](https://www.sumup.com/nb-no/priser/)). That saves about 0.26 points (~500 kr/month on 200 000 kr in card sales), but we found no sign of a declared Norwegian kassasystem from SumUp, so it can't replace the till on its own.
  - Vippskassa has no monthly fee and 1.75 %, and is declared when its bookkeeping features, cash drawer and printer are switched on ([Vipps](https://help.vippsmobilepay.com/nb-NO/articles/bookkeeping-obligations)), but there's no import into our system.
  - Stripe, Viva, Nexi and Adyen also do Tap to Pay in Norway, but none of them is a ready kassasystem for a small studio.
- **Today:** the owner takes payments in Linework and uses its "Z-report". Linework never calls itself a kassasystem or mentions produkterklæring/Z-rapport on its site; its "Utsalgssted" takes payment by QR code or link through Dintero (*inferred:* its report is a sales report, not a statutory Z-report). Skatteetaten's [list](https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/kassasystem/liste/) only loads in a browser; worth a look for "Zettle" and "Linework".
- **Zettle pays out to any Norwegian business account in the company's name**, so Folio stays as the bank. Payouts are daily by default, 1–2 business days after the sale ([Zettle](https://www.zettle.com/no/help/articles/1084784-utbetalinger), [bank account](https://www.zettle.com/no/help/articles/1084795-koble-til-bankkontoen-din)). Zettle connects to Fiken if the accountant uses it ([integrations](https://www.zettle.com/no/integrasjoner)).
- **Folio** is his business bank (89–359 kr/month): account, card, receipts and accounting automation. Its Standard/Avansert plans can take BankAxept card payments through a terminal (18 øre per sale), but that is a terminal, not a kassasystem: no Z-report, no Vipps, no Tap to Pay ([folio.no/priser](https://folio.no/priser)). Our CSV export works for his accountant alongside it.

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
| SMS/email reminders | ✅ Email: request received, confirmation, reminder ~24 h before, cancellation, aftercare. ✅ SMS reminder the day before through 46elks (0.70 SEK ≈ 0.70 kr each) | Automatic |
| Aftercare after the session | ✅ Per-service text (NO/EN), sent when the booking is set to completed | Innstillinger → Behandlinger |
| Payment in the studio (Utsalgssted) | ↪ Zettle till with Tap to Pay on iPhone (no hardware). Payments imported automatically; manual entry for anything else | Betalinger |
| Daily/weekly/monthly reports | ✅ Numbered, locked daily settlement with cash count; monthly artist settlement | Rapporter, Oppgjør |
| File for the accountant / accounting integration | ✅ Monthly voucher CSV (account numbers, VAT, Stripe fee and payout date), artist CSV and a PDF summary; downloaded or emailed to the accountant with one button | Rapporter → Regnskap |
| Studio rent / commission split | ✅ Studio share % per artist on every report | Innstillinger → Ansatte |
| Multiple artists, managers | ✅ Unlimited staff and logins for free (Cloudflare Access, up to 50) | |
| Piercer | ✅ Nora is a staff member with her own services, hours and calendar | |
| Gift cards (2.99 % fee) | ✅ Sold online (Stripe) or in the studio, unique code, balance, redeem as payment method, 3-year validity, outstanding liability shown | Gavekort, website |
| Personalliste (needed for piercing as skjønnhetspleie) | ✅ Start/stop per person, append-only corrections with reason, printable. Linework doesn't have this | Personalliste |
| Ink registration, inventory, suppliers | ✅ Ink register with brand, batch, expiry, supplier and stock; inks logged on each tattoo; find every client who got a batch if it's recalled | Blekk, booking page |
| Multi-session projects | ✅ "Book neste økt" from a booking; sessions listed together | Booking page |
| Booth rent / commission | ✅ Studio share % and/or fixed monthly rent per artist; month and year settlements | Artistoppgjør |
| Cleanup time between appointments | ✅ Per service, used when the website offers times | Innstillinger → Behandlinger |
| No-show history | ✅ Shown on the booking ("Møtte ikke 2 ganger før") | Booking page |
| Retail products | ↪ Sold in the Zettle till (it has a product list and stock) and imported as payments | |
| Flash booking | ❌ Backlog (can be a service with a fixed price today) | |
| Mobile app | Admin is built for phones and installs on the home screen with the studio icon (opens full screen like an app). No App Store app needed | |

## 3. What it costs

| | Linework today | Infinity Studio |
|---|---|---|
| Monthly | What he pays: about 600 kr studio + 200 kr per user, so about 1 000 kr with Nora (list price on linework.no: 790 + 490 per artist), +190 kr for daily payouts | 0 kr (Cloudflare free plan, Resend free email up to 100/day) |
| Card in studio | 1.65 % | 1.75 % (Zettle) |
| Vipps in studio | 1.75 % | Through Zettle: no Zettle fee; Vipps' own pricing applies (*inferred*). Vippskassa: 1.75 % |
| Online deposits | Card 1.65 %, Vipps 1.75 %, Klarna 3.99 % | Stripe card fee (about 1.5 % + 1.80 kr for European cards; *check current Stripe pricing*) |
| Gift cards | 2.99 % | Stripe card fee online; till fee in studio |
| SMS | 0.99 kr each | ~0.70 kr each (46elks, prepaid, no monthly fee) |

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
- Each integration (email, SMS, Stripe, Zettle, R2 photos, Turnstile, studio notifications) switches on by adding its key; nothing breaks without it. *Innstillinger → Tilkoblinger* shows what's on.
- Optional modules (gift cards, ink register, linked sessions, chair rent, artist settlements, reference photos, SMS) can be switched off by the owner under *Innstillinger → Funksjoner*. Off means hidden from menus, forms and the website; no data is deleted. Booking, calendar, consent forms, daily settlement and personalliste are always on.
- Money is integers in øre, times UTC, business dates Europe/Oslo. Daily settlements are sequentially numbered and frozen; payments on a closed day are locked.

## 6. Remaining backlog

1. Products and ink inventory with stock counts.
2. Flash sheet booking (fixed design + price on the website).
3. Vipps ePayment for online deposits (2.99 % + 1 kr) if he wants Vipps online; Stripe covers card now.
4. Move the website from Vercel to Cloudflare and serve the API on the same domain.

## 7. Decisions and defaults

Decided by the owner (2026-10-12): in-studio payments move from Linework to Zettle; no tattoos under 18 (the booking form asks for 18+ and the consent form blocks it).

Taken from the website FAQ: tattoo deposit 500–1000 kr (default 500 kr, raised per booking), deducted from the price, non-refundable, moved to a new date if rescheduled at least 48 hours ahead. The booking form and emails say this.

Defaults that can be changed any time in *Innstillinger*, so they don't block launch:
- Studio share per artist: 0 % until set (Filip owns the studio; set Nora's share when known).
- Org.nr. on the personalliste print: blank until set.
- Nora's tooth gems/piercings go through the same till and reports as the studio.
- Signed consent forms are kept until deleted.

Not live yet (Ibrahim's call). It will run on Ibrahim's Cloudflare account; going live needs a Cloudflare API token and the staff emails that should get a login.

**Look and feel:** the admin follows Linework's dashboard layout so the switch feels familiar: top bar (Tattoo-forespørsler, Nytt depositum, Nytt salg), sidebar with the studio card and the same menu order (Kalender, Kunder; Økonomi: Salg, Gavekort, Oppgjør, Rapporter; Artister, Ledere, Personalliste, Produkter, Innstillinger), a time-grid calendar with Day/Week, mini month and week numbers, and a "Kom i gang" checklist. Our own name and colours, not Linework's brand. Page-by-page details follow the capture in `docs/studio/linework-reference/`.

**Accounting export** (owner's must-have; spec in the project files):
- Defaults: VAT-registered, 25 % on services (per service: 25/15/12/0 %), program Fiken, NS 4102 accounts (3000 tattoo, 3010 piercing, 2900 gift card liability, 1940 Stripe clearing, 7770 fees, 1920 bank, 1900 cash, 3600 rent). All set in *Innstillinger → Regnskap*.
- Files per month: `bilag.csv` (semicolon, comma decimals, UTF-8 with BOM: date, source, gross, VAT, Stripe fee, net, debit/credit, payout date, reference), `artister.csv`, `oppsummering.pdf`.
- Zettle sales are listed but marked "not posted here": Zettle's own connector posts them to Fiken/Tripletex/PowerOffice. Gift cards go to 2900 without VAT when sold and get VAT when used.
- Stripe fees and payout dates are read from Stripe nightly (read-only) and before each download.
- Fiken has no voucher-file import, so the files go to the accountant (button sends them by email via Resend). Pushing straight into Fiken would need Fiken's API add-on (99 kr/month); not built.

## 8. Moving data from Linework

Linework has no public API, webhooks or export button that we could find, and no outgoing calendar feed. Plan:
1. Ask Linework by email (linework.no/kontakt-oss) for a full export of clients, bookings and consent forms under GDPR (right of access/portability). They must answer within a month.
2. If they don't, or the export is incomplete: with a Linework login, a session uses the browser to read clients and upcoming bookings and imports them.
3. Upcoming bookings are what matters on switch-over day; old payments stay in Linework's reports for the accounts.

## 9. What Linework has that we don't (and why that's OK)

Full sweep of linework.no, linework.com, the App Store version history and terms (2026-10-12). What makes Linework "for tattoo artists" is mostly money handling: one artist account across several studios, automatic payout split of every card payment between studio and artist, rent invoices to artists, and ink registration. Everything else is a normal booking app.

Not copied:
- **Payout split at payment time (Dintero) and payment links/QR with tips.** In-studio payments must go through the declared till (Zettle has tips); we calculate the split in the settlement instead of splitting payouts.
- **Artist linked to several studios / marketplace for guest artists.** Guest artists can be added as staff with their own share or rent.
- **Klarna and invoices with 10/15/30 days.** Not used in a tattoo studio day to day; Folio/Fiken can invoice if needed.
- **Native app with push.** The home-screen web app covers it; new requests can be emailed to the studio.
- **Google Calendar import, 3-day/month views, flash gallery, editable email templates, donations at checkout.** Small; can be added when someone asks.

## 10. Open-source projects compared

No mature open-source tattoo system exists. Closest general ones: Cal.com (scheduling), Easy!Appointments, LibreBooking, OpenSalon (Hono + SQLite, very close to our stack), pretix (gift cards/vouchers). Ideas borrowed from them: cleanup buffer, no-show history, multi-session series, minimum notice (12 h). Ideas left for later: client self-reschedule/cancel link with the 48 h rule, waitlist for freed slots, review request after the visit.

## Notes

- `morluto/rea` (reverse-engineering MCP) couldn't be run against Linework from the cloud environment because linework.com is blocked there; the feature map is from public pages. It can be run locally against a trial account to double-check details.
- The "minlønn" repo (`YmiaDKA/Loenna`) is empty on GitHub, so conventions follow this repo's `AGENTS.md`.
