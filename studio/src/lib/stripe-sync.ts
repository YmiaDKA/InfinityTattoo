import type { Env } from "../env";
import { businessDate } from "./time";

/**
 * Pulls Stripe's fee, net amount and payout date for each online payment (read-only), so the
 * accountant's file matches the Stripe payouts that land in the bank.
 */

type BalanceTxn = {
  id: string;
  type: string;
  amount: number;
  fee: number;
  net: number;
  source: string | { id: string; payment_intent?: string | null } | null;
};

async function stripeGet<T>(env: Env, path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}?${new URLSearchParams(params)}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  const data = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Stripe: ${data.error?.message ?? res.status}`);
  return data;
}

async function listAll<T extends { id: string }>(env: Env, path: string, params: Record<string, string>, max = 1000): Promise<T[]> {
  const out: T[] = [];
  let after: string | undefined;
  while (out.length < max) {
    const page = await stripeGet<{ data: T[]; has_more: boolean }>(env, path, { ...params, limit: "100", ...(after ? { starting_after: after } : {}) });
    out.push(...page.data);
    if (!page.has_more || !page.data.length) break;
    after = page.data[page.data.length - 1].id;
  }
  return out;
}

const intentOf = (t: BalanceTxn) => (t.source && typeof t.source === "object" ? t.source.payment_intent ?? null : null);

/** Syncs charges created in [from, to) and payouts arriving in [from, to + 14 days). Dates are YYYY-MM-DD. */
export async function syncStripeMoney(env: Env, from: string, to: string): Promise<{ charges: number; payouts: number }> {
  if (!env.STRIPE_SECRET_KEY) return { charges: 0, payouts: 0 };
  const ts = (d: string) => String(Math.floor(Date.parse(`${d}T00:00:00Z`) / 1000));
  const txns = await listAll<BalanceTxn>(env, "balance_transactions", {
    "created[gte]": ts(from),
    "created[lt]": ts(to),
    type: "charge",
    "expand[]": "data.source",
  });
  const charges = txns.filter((t) => intentOf(t));
  if (charges.length)
    await env.DB.batch(
      charges.map((t) =>
        env.DB.prepare(
          `INSERT INTO stripe_transactions (provider_ref, balance_txn, gross_ore, fee_ore, net_ore) VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(provider_ref) DO UPDATE SET balance_txn = excluded.balance_txn, gross_ore = excluded.gross_ore, fee_ore = excluded.fee_ore,
             net_ore = excluded.net_ore, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
        ).bind(intentOf(t), t.id, t.amount, t.fee, t.net),
      ),
    );

  const until = new Date(Date.parse(`${to}T00:00:00Z`) + 14 * 86400000).toISOString().slice(0, 10);
  const payouts = await listAll<{ id: string; amount: number; arrival_date: number; status: string }>(env, "payouts", {
    "arrival_date[gte]": ts(from),
    "arrival_date[lt]": ts(until),
  });
  for (const po of payouts) {
    const arrival = businessDate(new Date(po.arrival_date * 1000));
    const inPayout = await listAll<BalanceTxn>(env, "balance_transactions", { payout: po.id });
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO stripe_payouts (id, amount_ore, arrival_date, status) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET amount_ore = excluded.amount_ore, arrival_date = excluded.arrival_date, status = excluded.status",
      ).bind(po.id, po.amount, arrival, po.status),
      ...inPayout.map((t) => env.DB.prepare("UPDATE stripe_transactions SET payout_id = ?, payout_date = ? WHERE balance_txn = ?").bind(po.id, arrival, t.id)),
    ]);
  }
  return { charges: charges.length, payouts: payouts.length };
}
