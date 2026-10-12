-- Semi-automatic Fiken flow (Rapporter → Regnskap → Fiken-bilag): import a till's report file
-- (SumUp, or Zettle when its API isn't connected), check the month against the bank payouts, approve,
-- and get the few lines to type into Fiken plus a PDF. With a Fiken API token the approval posts them.

-- Provider fee per payment from an imported report (Stripe fees stay in stripe_transactions).
ALTER TABLE payments ADD COLUMN fee_ore INTEGER;

-- Each approved month entry. A month can get a second one if payments arrive after the first.
CREATE TABLE fiken_bilag (
  id INTEGER PRIMARY KEY,
  month TEXT NOT NULL,             -- YYYY-MM
  status TEXT NOT NULL CHECK (status IN ('approved', 'posted', 'failed')),
  lines_json TEXT NOT NULL,        -- [{ description, debitAccount, creditAccount, debitVatCode?, creditVatCode?, amount }]
  overview_json TEXT NOT NULL,     -- totals per source and the bank check, as approved
  rent INTEGER NOT NULL DEFAULT 0, -- 1 when the month's chair rent is in it
  location TEXT,                   -- the journal entry in Fiken, when posted through the API
  error TEXT,
  approved_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX fiken_bilag_month ON fiken_bilag(month);

ALTER TABLE payments ADD COLUMN fiken_bilag_id INTEGER REFERENCES fiken_bilag(id);
ALTER TABLE stripe_payouts ADD COLUMN fiken_bilag_id INTEGER REFERENCES fiken_bilag(id);

-- Report files imported from a till.
CREATE TABLE report_imports (
  id INTEGER PRIMARY KEY,
  provider TEXT NOT NULL CHECK (provider IN ('sumup', 'zettle')),
  filename TEXT NOT NULL,
  rows_read INTEGER NOT NULL,
  imported INTEGER NOT NULL,
  skipped INTEGER NOT NULL,
  from_date TEXT,
  to_date TEXT,
  imported_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
