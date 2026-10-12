# Existing Infinity Studio routes and feature map

Source snapshot: `47b1ea6bd96f531b135fba1c3d1a56a2c1cd9582` (12 October 2026). This is a **source inspection**, not a rendered comparison. Linework's captured screens in the main README are the visual authority. `different layout` below means an analogous capability exists in the source, but visual or workflow parity is not established; `missing` means no equivalent UI/route was found. No row is called `match` merely because its name is similar. Another agent is changing this branch, so recheck this snapshot before implementation.

The Worker mounts these handlers at `/admin` ([index.ts:49](../../../studio/src/index.ts#L49)); it renders server-side Hono JSX, rather than the website's Next.js pages. Admin access requires an active staff email authenticated by Cloudflare Access ([auth.ts:22](../../../studio/src/lib/auth.ts#L22)). All comparisons refer to `studio/` only.

## Navigation already declared

Source: [layout.tsx:114](../../../studio/src/views/layout.tsx#L114).

- Top: INFINITY → calendar; Tattoo-forespørsler → `/admin/requests` (open-request count badge); Nytt depositum → `/admin/deposits/new`; Nytt salg → `/admin/payments/new`.
- Studio identity: fixed `Infinity Tattoo`, `Skårersletta 48c`, IT avatar. This is a static block, not a studio selector.
- Main: Kalender; Kunder.
- Økonomi: Salg; Gavekort; Oppgjør; Rapporter.
- Team/studio: Artister; Ledere; Personalliste; Produkter; Innstillinger.
- Bottom: authenticated user's name.
- Mobile: menu button toggles an off-canvas sidebar and scrim ([layout.tsx:40](../../../studio/src/views/layout.tsx#L40)); screenshot parity remains unverified.

**Important:** Artister and Ledere are navigation links, but no `/artists` or `/managers` GET handler exists in the inspected route files. A declared nav link is not a working page.

## Linework-to-Studio comparison

| Linework page / state | Existing Studio destination | Status | Source evidence / practical difference |
| --- | --- | --- | --- |
| Calendar week/day | `/admin/calendar?view=week` / `?view=day`; optional `date`, `staff` | different layout | [admin-calendar.tsx:39](../../../studio/src/routes/admin-calendar.tsx#L39), [toolbar:143](../../../studio/src/routes/admin-calendar.tsx#L143). Mini-month and artist filters on left, time grid on right; I dag, previous/next, Ny avtale, Dag/Uke. |
| Calendar empty time slot | `/admin/bookings/new?date=…&time=…&staff=…` | different layout | [slot links:212](../../../studio/src/routes/admin-calendar.tsx#L212). Opens a whole page with date/time/artist prefilled. |
| Booking opened | `/admin/bookings/:id` | different layout | [admin.tsx:254](../../../studio/src/routes/admin.tsx#L254). Whole page, rather than an established matching Linework panel. Client/contact, consent, reference photos, editable appointment, sessions/inks, messages and payments. |
| New booking flow | `/admin/bookings/new` | different layout | [admin.tsx:136](../../../studio/src/routes/admin.tsx#L136). Single form ending in Lagre avtale; no multi-step review/last-step screen. |
| Clients list / detail | `/admin/clients?q=…`, `/admin/clients/:id` | different layout | [list:572](../../../studio/src/routes/admin.tsx#L572), [detail:613](../../../studio/src/routes/admin.tsx#L613). Search and compact table; detail is an editable form plus booking history. Empty list has no dedicated empty-state copy. |
| Add client | No independent route/form | missing | Clients are created as part of booking entry; [booking POST:213](../../../studio/src/routes/admin.tsx#L213). No `/clients/new` GET exists. |
| Sales | `/admin/payments?date=…` | different layout | [admin.tsx:838](../../../studio/src/routes/admin.tsx#L838). Daily payment register, CSV export, optional Zettle import and inline registration form, not a complete POS sale/cart system. |
| Gift Cards list / sell / detail | `/admin/gift-cards?q=…`, `/admin/gift-cards/:id` | different layout | [admin-extra.tsx:631](../../../studio/src/routes/admin-extra.tsx#L631), [detail:756](../../../studio/src/routes/admin-extra.tsx#L756). Search/filter table, inline sale form, code/balance/movement detail; module can be disabled. |
| Settlements | `/admin/settlements?month=YYYY-MM` or `?year=YYYY` | different layout | [admin-extra.tsx:1036](../../../studio/src/routes/admin-extra.tsx#L1036). Monthly/yearly artist revenue, studio share, rent and artist remainder. Owner sees all; artists see themselves. No transfer/payout execution. |
| Reports and tabs/filters | `/admin/report?date=…`, `/admin/report/:seq`; `/admin/export.csv?from=…&to=…` | different layout | [admin.tsx:1090](../../../studio/src/routes/admin.tsx#L1090), [closed report:1197](../../../studio/src/routes/admin.tsx#L1197), [CSV:931](../../../studio/src/routes/admin.tsx#L931). Daily settlement and previous reports, print/PDF; no general tabbed analytics/report catalog found. |
| Flash | None | missing | No Flash page, catalog or route found in `studio/src`. CSS `flash` means success/error message, not tattoo Flash. |
| Reviews | None | missing | No review-management admin route found. |
| Artists | Nav `/admin/artists`; nearest functioning page `/admin/settings` and `/admin/settings/staff/:id` | missing | [nav:132](../../../studio/src/views/layout.tsx#L132), [staff editor:280](../../../studio/src/routes/admin-extra.tsx#L280). The advertised artists page has no handler. Staff editor provides underlying artist setup. |
| Managers | Nav `/admin/managers`; nearest staff editor | missing | [nav:133](../../../studio/src/views/layout.tsx#L133), [roles:14](../../../studio/src/routes/admin-extra.tsx#L14). No managers handler. Staff roles: Eier, Tatovør, Piercer, Gjesteartist, Resepsjon; no dedicated manager role. |
| Products | Nav Produkter → `/admin/inks` | different layout | [admin-studio.tsx:206](../../../studio/src/routes/admin-studio.tsx#L206). This is an ink/batch traceability register, not a retail product catalog. |
| Settings landing / sub-pages | `/admin/settings` | different layout | [admin-extra.tsx:70](../../../studio/src/routes/admin-extra.tsx#L70). One long page with sections, rather than a known equivalent settings tree/tabs. |
| Settings > services | `/admin/settings` → `/admin/settings/services/new` or `/:id` | different layout | [services table:132](../../../studio/src/routes/admin-extra.tsx#L132), [editor:448](../../../studio/src/routes/admin-extra.tsx#L448). Separate whole-page editor for each treatment. |
| Settings > forms / consent | No admin form-template editor; `/skjema/:publicId` is client-facing | missing | [client.tsx:36](../../../studio/src/routes/client.tsx#L36), [fixed questions](../../../studio/src/lib/consent.ts#L1). Built-in bilingual health/consent form; service can require it. No configurable form builder/templates/settings page. |
| Settings > instructions | Service aftercare fields; fixed messaging templates | different layout | [admin-extra.tsx:518](../../../studio/src/routes/admin-extra.tsx#L518), [messages.ts:80](../../../studio/src/lib/messages.ts#L80). Per-service Norwegian/English aftercare text sent on completion; no independent pre/post instructions page or editor for email templates. |
| Settings > payments | Settings Tilkoblinger status; secrets/env configuration | different layout | [admin-extra.tsx:83](../../../studio/src/routes/admin-extra.tsx#L83), [README integrations](../../../studio/README.md#L34). Stripe/Zettle configuration is deployed secrets, not a connection wizard in admin. |
| Settings > booking page | Service visibility/bookability configuration; public APIs | different layout | [service public checkbox:506](../../../studio/src/routes/admin-extra.tsx#L506), [staff bookability:344](../../../studio/src/routes/admin-extra.tsx#L344), [public.ts:40](../../../studio/src/routes/public.ts#L40). No admin booking-page design/branding/URL editor found. |
| Artist commission / studio share | `/admin/settings/staff/:id` | different layout | [admin-extra.tsx:321](../../../studio/src/routes/admin-extra.tsx#L321). One `Studioandel av omsetning (%)` field; settlement computes artist gross minus studio share. No commission-plan/version/tier UI found. |
| Artist rent | `/admin/settings/staff/:id`; `/admin/settlements` | different layout | [admin-extra.tsx:325](../../../studio/src/routes/admin-extra.tsx#L325). `Fast stolleie per måned (kr)` multiplied by selected period; optional rent feature. |
| Artist payouts | Settlement totals only | missing | [calculation:1070](../../../studio/src/routes/admin-extra.tsx#L1070). No bank account, payout schedule, payout ledger or payout action/route found. |
| Tattoo requests | `/admin/requests` | different layout | [admin.tsx:123](../../../studio/src/routes/admin.tsx#L123). Table of requested bookings; opens whole booking page to set time/price/deposit and confirm. |
| Notifications bell | None | missing | [topbar:164](../../../studio/src/views/layout.tsx#L164) has no bell or notification inbox. New-request badge exists; external notification integration status is not an inbox. |
| New deposit | `/admin/deposits/new` | different layout | [admin.tsx:813](../../../studio/src/routes/admin.tsx#L813). Instructions and bookings waiting for deposits; new booking link. Not a standalone deposit checkout form. |
| New sale | `/admin/payments/new` → `/admin/payments#ny` | different layout | [admin.tsx:810](../../../studio/src/routes/admin.tsx#L810), [payment form:736](../../../studio/src/routes/admin.tsx#L736). Inline registration of payment received in till, not a sale modal/cart. |
| Studio switcher | Fixed studio identity only | missing | [layout.tsx:141](../../../studio/src/views/layout.tsx#L141), [identity block:187](../../../studio/src/views/layout.tsx#L187). No multi-studio selector, studio creation or switch route. |
| Complete your setup panel / items | No checklist UI | missing | Nearest analog is [Tilkoblinger:252](../../../studio/src/routes/admin-extra.tsx#L252), a read-only integration status table. First-login owner bootstrap in [auth.ts:53](../../../studio/src/lib/auth.ts#L53) is not onboarding/checklist UI. |
| Other Linework settings sub-pages/tabs found during capture | No uninspected equivalent implied | missing | Treat as missing unless mapped to a specific handler below. Source inspection must not infer UI just from database fields or API support. |

## Complete GET route inventory in `studio/`

Dynamic IDs are route parameters, not extra pages. Paths below include the `/admin` mount.

| Route | Source | Purpose / state |
| --- | --- | --- |
| `/admin/` | [admin.tsx:65](../../../studio/src/routes/admin.tsx#L65) | Redirects to calendar; legacy `date` redirects to day view. |
| `/admin/calendar` | [admin-calendar.tsx:39](../../../studio/src/routes/admin-calendar.tsx#L39) | Week/day calendar, artist/date filters, slot and booking links. |
| `/admin/requests` | [admin.tsx:123](../../../studio/src/routes/admin.tsx#L123) | New requested bookings. |
| `/admin/bookings/new` | [admin.tsx:136](../../../studio/src/routes/admin.tsx#L136) | Create appointment form. |
| `/admin/bookings/:id` | [admin.tsx:254](../../../studio/src/routes/admin.tsx#L254) | Appointment overview/edit, messages, consent, payments, sessions and inks. |
| `/admin/photos/:id` | [admin.tsx:562](../../../studio/src/routes/admin.tsx#L562) | Authorized reference image response, not HTML admin page. |
| `/admin/clients` | [admin.tsx:572](../../../studio/src/routes/admin.tsx#L572) | Searchable client list. |
| `/admin/clients/:id` | [admin.tsx:613](../../../studio/src/routes/admin.tsx#L613) | Client profile edit and appointments. |
| `/admin/payments/new` | [admin.tsx:810](../../../studio/src/routes/admin.tsx#L810) | Redirect to inline payment form. |
| `/admin/deposits/new` | [admin.tsx:813](../../../studio/src/routes/admin.tsx#L813) | Deposit guidance and waiting bookings. |
| `/admin/payments` | [admin.tsx:838](../../../studio/src/routes/admin.tsx#L838) | Daily payment register/form. |
| `/admin/export.csv` | [admin.tsx:931](../../../studio/src/routes/admin.tsx#L931) | Accounting CSV download. |
| `/admin/report` | [admin.tsx:1090](../../../studio/src/routes/admin.tsx#L1090) | Draft daily settlement and closing form/history. |
| `/admin/report/:seq` | [admin.tsx:1197](../../../studio/src/routes/admin.tsx#L1197) | Closed daily settlement; print/PDF. |
| `/admin/settings` | [admin-extra.tsx:70](../../../studio/src/routes/admin-extra.tsx#L70) | Staff, services/prices, time off, feature toggles, integration status. |
| `/admin/settings/staff/:id` (including `new`) | [admin-extra.tsx:280](../../../studio/src/routes/admin-extra.tsx#L280) | Staff role, share/rent, calendar, services and weekly hours; owner-only. |
| `/admin/settings/services/:id` (including `new`) | [admin-extra.tsx:448](../../../studio/src/routes/admin-extra.tsx#L448) | Treatment settings; owner-only. |
| `/admin/gift-cards` | [admin-extra.tsx:631](../../../studio/src/routes/admin-extra.tsx#L631) | Gift card search/filter and sale. |
| `/admin/gift-cards/:id` | [admin-extra.tsx:756](../../../studio/src/routes/admin-extra.tsx#L756) | Gift card balance/movements and void form. |
| `/admin/shifts` | [admin-extra.tsx:860](../../../studio/src/routes/admin-extra.tsx#L860) | Personalliste by date, clock-in/out, owner corrections, print/PDF. Additional local requirement, no requested Linework analog. |
| `/admin/settlements` | [admin-extra.tsx:1036](../../../studio/src/routes/admin-extra.tsx#L1036) | Month/year artist settlement. |
| `/admin/inks` | [admin-studio.tsx:206](../../../studio/src/routes/admin-studio.tsx#L206) | Ink catalog, archived toggle, batch usage/client trace, add ink. |

Infrastructure/client routes: `/` redirects to admin; `/health` JSON; `/admin/manifest.webmanifest`, `/admin/icon-180.png`, `/admin/icon-512.png` are PWA assets ([index.ts:24](../../../studio/src/index.ts#L24)); `/skjema/:publicId` is the bilingual public consent page and `/cal/:token` a calendar subscription ([client.tsx:180](../../../studio/src/routes/client.tsx#L180)). `/api/config`, `/api/services`, `/api/availability` support public booking; POST `/api/bookings`, booking photo upload, gift-card checkout and Stripe webhook are APIs, not admin screens ([public.ts](../../../studio/src/routes/public.ts#L40)).

## Existing editor fields and dependencies

- **Booking** ([admin.tsx:145](../../../studio/src/routes/admin.tsx#L145)): Kundenavn (required text), Telefon (tel), E-post (email), Behandling (select), Artist (select), Kilde (Telefon/Instagram/Walk-in/Annet), Dato (required date), Tid (required time), Varighet (number), Notat (textarea). Whole page; one save action.
- **Client** ([admin.tsx:629](../../../studio/src/routes/admin.tsx#L629)): Navn (required text), Telefon, E-post, Fødselsdato, Notater (allergier, hudtype, tidligere arbeid…); Lagre kunde. No standalone add-client form.
- **Payment registration** ([admin.tsx:736](../../../studio/src/routes/admin.tsx#L736)): Beløp (kr, required), Type, Metode, Artist, Dato (required), Betalingsløsning (Zettle/Vippskassa/SumUp/Stripe (nett)/Manuelt), Gavekortkode, Transaksjons-ID, Notat. Registrer betaling. Till remains legal sale record.
- **Staff** ([admin-extra.tsx:297](../../../studio/src/routes/admin-extra.tsx#L297)): Navn required, E-post (for innlogging), Rolle, Studioandel, Fast stolleie, Farge i kalenderen, Fødselsdato, Fødselsnummer / D-nummer, Kan bookes på nettsiden, Aktiv, treatment checkboxes, weekday start/end times; Lagre; existing staff also regenerate calendar link.
- **Services** ([admin-extra.tsx:456](../../../studio/src/routes/admin-extra.tsx#L456)): Norwegian/English names required, Type, required duration, cleanup buffer, price, deposit, order, approval/public/consent/active checkboxes, bilingual aftercare; Lagre.
- **Consent**: hardcoded health questions and confirmations, required full name/date of birth; optional details/photo consent; conditional guardian name. Signer og send. Requiring consent is a service setting; no template editor.
- **Optional features** ([features.ts:3](../../../studio/src/lib/features.ts#L3)): gift cards, inks, multiple sessions, fixed rent, artist settlements, reference photos, SMS. Disabled gift-card/ink/settlement routes redirect to settings. Booking/calendar, consent, daily settlement and personalliste are always on. Integrations depend on Worker env/secrets/R2 bindings, displayed as På or Ikke satt opp.

No application code was changed or run for this mapping. No Linework action was performed by this source-inspection subtask.
