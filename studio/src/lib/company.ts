import type { Env } from "../env";

/**
 * The studio's company details (Innstillinger → Firmaopplysninger). Used on the personalliste, the
 * accountant's PDF and invoices. Falls back to the ORG_NAME / ORG_NUMBER vars until saved.
 */
export type Company = {
  name: string;
  orgNumber: string;
  address: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  bankAccount: string;
};

const KEYS: (keyof Company)[] = ["name", "orgNumber", "address", "postcode", "city", "email", "phone", "bankAccount"];

export async function loadCompany(env: Env): Promise<Company> {
  const rows = await env.DB.prepare("SELECT key, value FROM settings WHERE key LIKE 'company.%'").all<{ key: string; value: string }>();
  const get = (k: string) => rows.results.find((r) => r.key === `company.${k}`)?.value ?? "";
  const c = Object.fromEntries(KEYS.map((k) => [k, get(k)])) as Company;
  return { ...c, name: c.name || env.ORG_NAME || "Infinity Tattoo", orgNumber: c.orgNumber || env.ORG_NUMBER || "" };
}

export async function saveCompany(env: Env, c: Company) {
  await env.DB.batch(
    KEYS.map((k) =>
      env.DB.prepare(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
      ).bind(`company.${k}`, c[k].trim()),
    ),
  );
}

/** "123 456 789" from any spacing; empty when it isn't nine digits. */
export function formatOrgNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length === 9 ? `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}` : "";
}
