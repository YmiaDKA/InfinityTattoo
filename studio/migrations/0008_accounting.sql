-- Monthly file for the accountant: account numbers and VAT settings, Stripe fees and payouts.

-- Studio-wide settings as key/value (account numbers, VAT registration, accountant's email).
-- Defaults live in src/lib/accounting.ts; a row here only exists once the owner changes it.
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- VAT rate per service (tattoo and piercing are normally 25 %).
ALTER TABLE services ADD COLUMN vat_pct INTEGER NOT NULL DEFAULT 25 CHECK (vat_pct IN (0, 12, 15, 25));

-- Fee, net amount and payout for each Stripe payment, so the file matches the bank lines.
CREATE TABLE stripe_transactions (
  provider_ref TEXT PRIMARY KEY,   -- payment intent id, same as payments.provider_ref
  balance_txn TEXT NOT NULL UNIQUE,
  gross_ore INTEGER NOT NULL,
  fee_ore INTEGER NOT NULL,
  net_ore INTEGER NOT NULL,
  payout_id TEXT,
  payout_date TEXT,                -- YYYY-MM-DD the money reached the bank
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE stripe_payouts (
  id TEXT PRIMARY KEY,
  amount_ore INTEGER NOT NULL,
  arrival_date TEXT NOT NULL,      -- YYYY-MM-DD
  status TEXT NOT NULL
);

-- Each time the month's files were emailed to the accountant.
CREATE TABLE accounting_sends (
  id INTEGER PRIMARY KEY,
  month TEXT NOT NULL,             -- YYYY-MM
  to_address TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT,
  sent_by TEXT NOT NULL,
  sent_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
