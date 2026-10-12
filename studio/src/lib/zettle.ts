import type { Env } from "../env";
import type { PaymentMethod } from "./report";
import { businessDate } from "./time";

/**
 * Read-only import of till payments from Zettle (PayPal POS), a produkterklært kassasystem.
 * Zettle stays the legal record (journal, receipts, Z-report); we only mirror the payments so the
 * daily settlement and artist split match the till without typing.
 */

type ZettlePayment = { uuid: string; type: string; amount: number };
type ZettlePurchase = {
  purchaseUUID1: string;
  timestamp: string;
  amount: number;
  refund?: boolean;
  userDisplayName?: string;
  payments: ZettlePayment[];
};

export function zettleEnabled(env: Env) {
  return Boolean(env.ZETTLE_CLIENT_ID && env.ZETTLE_API_KEY);
}

export function mapZettleMethod(type: string): PaymentMethod {
  const t = type.toUpperCase();
  if (t.includes("CASH")) return "cash";
  if (t.includes("VIPPS") || t.includes("MOBILE_PAY")) return "vipps";
  if (t.includes("CARD")) return "card";
  if (t.includes("INVOICE")) return "bank";
  return "other";
}

async function token(env: Env): Promise<string> {
  const res = await fetch("https://oauth.zettle.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      client_id: env.ZETTLE_CLIENT_ID!,
      assertion: env.ZETTLE_API_KEY!,
    }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !data.access_token) throw new Error(`Zettle login failed: ${data.error_description ?? res.status}`);
  return data.access_token;
}

export type SyncResult = { imported: number; skipped: number; from: string; to: string };

export async function syncZettle(env: Env, now = new Date()): Promise<SyncResult> {
  if (!zettleEnabled(env)) throw new Error("Zettle is not configured");
  const state = await env.DB.prepare("SELECT value FROM sync_state WHERE key = 'zettle_last_sync'").first<{ value: string }>();
  // Overlap the window a little; duplicates are ignored by the unique (provider, provider_ref).
  const from = new Date(state ? Date.parse(state.value) - 3600 * 1000 : now.getTime() - 7 * 86400 * 1000).toISOString();
  const to = now.toISOString();

  const access = await token(env);
  const url = new URL("https://purchase.izettle.com/purchases/v2");
  url.searchParams.set("startDate", from);
  url.searchParams.set("endDate", to);
  url.searchParams.set("limit", "1000");
  url.searchParams.set("descending", "false");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${access}` } });
  if (!res.ok) throw new Error(`Zettle purchases: ${res.status}`);
  const data = (await res.json()) as { purchases?: ZettlePurchase[] };

  const staff = await env.DB.prepare("SELECT id, name FROM staff").all<{ id: number; name: string }>();
  const closedDates = new Set(
    (await env.DB.prepare("SELECT business_date FROM day_reports WHERE business_date >= ?").bind(from.slice(0, 10)).all<{ business_date: string }>()).results.map(
      (r) => r.business_date,
    ),
  );
  const today = businessDate(now);

  let imported = 0;
  let skipped = 0;
  for (const purchase of data.purchases ?? []) {
    const who = (purchase.userDisplayName ?? "").toLowerCase();
    const member = staff.results.find((s) => who && (who === s.name.toLowerCase() || who.startsWith(`${s.name.toLowerCase()} `)));
    const date = businessDate(purchase.timestamp);
    // A payment for a day that's already closed goes on today's settlement instead.
    const bookDate = closedDates.has(date) ? today : date;
    for (const p of purchase.payments ?? []) {
      if (!p.amount) continue;
      const result = await env.DB.prepare(
        `INSERT OR IGNORE INTO payments (staff_id, kind, method, amount_ore, provider, provider_ref, note, paid_at, business_date, recorded_by)
         VALUES (?, ?, ?, ?, 'zettle', ?, ?, ?, ?, 'zettle-sync')`,
      )
        .bind(
          member?.id ?? null,
          p.amount < 0 || purchase.refund ? "refund" : "payment",
          mapZettleMethod(p.type),
          p.amount,
          `${purchase.purchaseUUID1}:${p.uuid}`,
          [purchase.userDisplayName && `Zettle: ${purchase.userDisplayName}`, bookDate !== date && `etterregistrert fra ${date}`].filter(Boolean).join(" · ") || null,
          purchase.timestamp,
          bookDate,
        )
        .run();
      if (result.meta.changes) imported++;
      else skipped++;
    }
  }
  await env.DB.prepare(
    "INSERT INTO sync_state (key, value) VALUES ('zettle_last_sync', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
  )
    .bind(to)
    .run();
  return { imported, skipped, from, to };
}
