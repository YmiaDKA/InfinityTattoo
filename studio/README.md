# Infinity Studio

Booking API and internal admin for Infinity Tattoo. A Cloudflare Worker (Hono + D1) on the free plan.
Why it exists and what it covers: [docs/studio/PLAN.md](../docs/studio/PLAN.md).

## Local development

```bash
cd studio
npm install
npm run db:migrate:local -- --env dev
npx wrangler dev --env dev            # http://localhost:8787/admin (signed in as dev@localhost)
npm test && npm run typecheck
```

To try the website form against it, run the site with `NEXT_PUBLIC_STUDIO_API_URL=http://localhost:8787 npm run dev` from the repo root.

## First deploy (one time)

1. `npx wrangler login`
2. `npx wrangler d1 create studio` and paste the `database_id` into `wrangler.jsonc` (both places).
3. `npm run db:migrate:remote` (applies every file in `migrations/`, including later ones on each new deploy).
4. Set `PUBLIC_BASE_URL` (the worker's own URL) and `SITE_URL` in `wrangler.jsonc`, then `npm run deploy`. A custom domain such as `studio.infinitytattoo.no` can be added under the worker's *Settings → Domains*.
5. **Protect the admin with Cloudflare Access** (Zero Trust → Access → Applications → Self-hosted):
   - Domain: the worker's domain, path `admin`.
   - Policy: allow the staff emails (one-time PIN login works without Google accounts).
   - Copy the *Application Audience (AUD) tag*, then:
     `npx wrangler secret put ACCESS_AUD` and `npx wrangler secret put ACCESS_TEAM_DOMAIN` (e.g. `infinity.cloudflareaccess.com`).
6. Put staff emails in the database so only they get in:
   `npx wrangler d1 execute studio --remote --command "UPDATE staff SET email='filip@example.com' WHERE id=1"`
   (Until any staff email is set, whoever passes Access is treated as the owner.) After that, staff, hours, services and shares are edited under *Innstillinger*.
7. Switch the website over by setting `NEXT_PUBLIC_STUDIO_API_URL` to the worker URL in Vercel (Project → Settings → Environment Variables) and redeploying. Remove it to go back to the Linework embed.

### Integrations (each is optional and switches on when its keys are set)

*Innstillinger → Tilkoblinger* shows which are on.

| What | How |
|---|---|
| Client emails (confirmation, reminder, consent link, aftercare, gift cards) | Free [Resend](https://resend.com) account, verify `infinitytattoo.no`, then `wrangler secret put RESEND_API_KEY` and set vars `EMAIL_FROM` (e.g. `Infinity Tattoo <booking@infinitytattoo.no>`) and `EMAIL_REPLY_TO`. |
| Online deposits and gift cards | Stripe account. `wrangler secret put STRIPE_SECRET_KEY`. Add a webhook to `<PUBLIC_BASE_URL>/api/stripe/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.expired`, then `wrangler secret put STRIPE_WEBHOOK_SECRET`. |
| Till import from Zettle | In Zettle *Integrations → API keys*, create a key with read access to purchases. `wrangler secret put ZETTLE_CLIENT_ID` and `ZETTLE_API_KEY`. Imported hourly and before closing a day. Staff are matched by their Zettle user name. |
| Reference photos on the booking form | `npx wrangler r2 bucket create studio-photos` and add `"r2_buckets": [{ "binding": "PHOTOS", "bucket_name": "studio-photos" }]` to the top level of `wrangler.jsonc`. |
| SMS reminders the day before | [46elks](https://46elks.com) account (0.70 SEK per SMS to Norway, prepaid by card, no monthly fee). `wrangler secret put ELKS_API_USER` and `ELKS_API_PASSWORD` (from the 46elks dashboard). Optional var `SMS_FROM` (sender name, max 11 letters A–Z/0–9; default `Infinity`). |
| Spam protection | Create a Turnstile widget. `wrangler secret put TURNSTILE_SECRET` and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` on the website. |
| New-request notice to the studio inbox | Enable Email Routing on the domain, verify the inbox, add `"send_email": [{ "name": "NOTIFY", "destination_address": "infinitytattoo99@gmail.com" }]` and vars `NOTIFY_FROM` and `NOTIFY_TO`. |
| Personalliste header | Vars `ORG_NAME` and `ORG_NUMBER`. |

## Daily use

- **Forespørsler**: new tattoo requests from the website. Open one, set artist, time, price and deposit, set status to *Bekreftet*. The client gets a confirmation with the consent form and a deposit link.
- **Kalender**: day and week view. Each artist can subscribe to their own calendar from *Innstillinger*.
- **Betalinger**: in-studio payments come from the till (Zettle import, or typed in from Vippskassa with its transaction id). The till stays the legal record and makes the Z-report. Gift cards are redeemed here with their code.
- **Dagsoppgjør**: check the preview at closing time, enter counted cash, and close the day. Closed days are numbered and locked.
- **Artistoppgjør**: monthly totals and studio share per artist. Artists only see their own.
- **Personalliste**: start/stop when someone starts and leaves work. Required for piercing.
- **CSV for regnskap** on the payments page exports a period for the accountant.
