import { createRemoteJWKSet, jwtVerify } from "jose";

import type { Env } from "../env";

export type StaffUser = {
  email: string;
  staffId: number | null;
  name: string;
  role: string;
  /** Which optional modules are switched on; filled in by the admin middleware. */
  features?: import("./features").Features;
  /** Open tattoo requests, shown as a badge in the top bar; filled in by the admin middleware. */
  openRequests?: number;
};

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

/**
 * Staff sign in through Cloudflare Access (free for up to 50 users), which puts a signed JWT
 * in front of every /admin request. We verify it here so the Worker never trusts a bare header.
 */
export async function staffFromRequest(request: Request, env: Env): Promise<StaffUser | null> {
  let email: string | null = null;

  if (env.DEV_STAFF_EMAIL && env.ENVIRONMENT === "development") {
    email = env.DEV_STAFF_EMAIL;
  } else {
    const token = request.headers.get("Cf-Access-Jwt-Assertion");
    if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return null;
    const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
    let jwks = jwksCache.get(issuer);
    if (!jwks) {
      jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
      jwksCache.set(issuer, jwks);
    }
    try {
      const { payload } = await jwtVerify(token, jwks, { issuer, audience: env.ACCESS_AUD });
      email = typeof payload.email === "string" ? payload.email : null;
    } catch {
      return null;
    }
  }

  if (!email) return null;
  const row = await env.DB.prepare(
    "SELECT id, name, role FROM staff WHERE lower(email) = lower(?) AND active = 1",
  )
    .bind(email)
    .first<{ id: number; name: string; role: string }>();

  if (row) return { email, staffId: row.id, name: row.name, role: row.role };

  // First-time setup: until any staff member has an email, whoever Access lets in is the owner,
  // so they can fill in the staff list. After that, only listed emails get in.
  const configured = await env.DB.prepare("SELECT 1 FROM staff WHERE email IS NOT NULL LIMIT 1").first();
  return configured ? null : { email, staffId: null, name: email, role: "owner" };
}
