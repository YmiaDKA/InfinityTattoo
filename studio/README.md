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

## First deploy (one time, about 15 minutes)

1. `npx wrangler login`
2. `npx wrangler d1 create studio` and paste the `database_id` into `wrangler.jsonc` (both places).
3. `npm run db:migrate:remote`
4. `npm run deploy`. Note the `*.workers.dev` URL, or add a custom domain such as `studio.infinitytattoo.no` under the worker's *Settings → Domains*.
5. **Protect the admin with Cloudflare Access** (Zero Trust → Access → Applications → Self-hosted):
   - Domain: the worker's domain, path `admin`.
   - Policy: allow the staff emails (one-time PIN login works without Google accounts).
   - Copy the *Application Audience (AUD) tag*, then:
     `npx wrangler secret put ACCESS_AUD` and `npx wrangler secret put ACCESS_TEAM_DOMAIN` (e.g. `infinity.cloudflareaccess.com`).
6. Put staff emails in the database so only they get in:
   `npx wrangler d1 execute studio --remote --command "UPDATE staff SET email='filip@example.com' WHERE id=1"`
   (Until any staff email is set, whoever passes Access is treated as the owner.)
7. Optional: new-request emails. Enable Email Routing on the domain, verify the studio inbox, then add to `wrangler.jsonc`:
   `"send_email": [{ "name": "NOTIFY", "destination_address": "infinitytattoo99@gmail.com" }]` and vars `NOTIFY_FROM` (an address on the domain) and `NOTIFY_TO`.
8. Optional: Turnstile against spam. Create a widget and `npx wrangler secret put TURNSTILE_SECRET` (the form needs the site key added before turning this on).
9. Switch the website over by setting `NEXT_PUBLIC_STUDIO_API_URL` to the worker URL in Vercel (Project → Settings → Environment Variables) and redeploying. Remove it to go back to the Linework embed.

## Daily use

- **Forespørsler**: new tattoo requests from the website. Open one, set artist, time, price and deposit, set status to *Bekreftet*.
- **Betalinger**: mirror each payment from the till app (Vippskassa/Zettle) with its transaction id. The till stays the legal record.
- **Dagsoppgjør**: check the preview at closing time, enter counted cash, and close the day. Closed days are numbered and locked.
- **CSV for regnskap** on the payments page exports a period for the accountant.
