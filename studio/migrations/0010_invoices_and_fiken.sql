-- Invoice mode: a numbered cash invoice (kontantfaktura) for every sale, with the buyer's name and
-- address (bokføringsforskriften § 5-1-1). Off by default; see Innstillinger → Kassesystem.

-- Who paid, for sales without a booking (walk-ins, gift cards sold in the studio).
ALTER TABLE payments ADD COLUMN client_id INTEGER REFERENCES clients(id);

-- Issued invoices and credit notes. Never edited or deleted once written; a refund gets a credit note.
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,  -- one unbroken series for invoices and credit notes
  kind TEXT NOT NULL CHECK (kind IN ('invoice', 'credit_note')),
  payment_id INTEGER NOT NULL UNIQUE REFERENCES payments(id),
  credits_invoice_id INTEGER REFERENCES invoices(id),
  issue_date TEXT NOT NULL,        -- YYYY-MM-DD Europe/Oslo
  delivery_date TEXT NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  buyer_name TEXT NOT NULL,
  buyer_address TEXT NOT NULL,
  buyer_postcode TEXT NOT NULL,
  buyer_city TEXT NOT NULL,
  buyer_email TEXT,
  seller_json TEXT NOT NULL,       -- company details as they were when issued
  lines_json TEXT NOT NULL,        -- [{ text, amount_ore, vat_pct, vat_ore }]
  total_ore INTEGER NOT NULL,      -- incl. VAT, negative on credit notes
  vat_ore INTEGER NOT NULL,
  method TEXT NOT NULL,
  issued_by TEXT NOT NULL,
  email_status TEXT,               -- sent / failed / skipped
  emailed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX invoices_issue_date ON invoices(issue_date);

-- Fiken push: one journal entry per day (and one per month for chair rent), posted through
-- Fiken's API module. A payment is marked when it has been posted, so late arrivals go in the next entry.
CREATE TABLE fiken_pushes (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('day', 'rent')),
  ref TEXT NOT NULL,               -- YYYY-MM-DD for a day, YYYY-MM for rent
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  total_ore INTEGER NOT NULL,
  lines_json TEXT NOT NULL,
  location TEXT,                   -- URL of the journal entry in Fiken
  error TEXT,
  pushed_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX fiken_pushes_ref ON fiken_pushes(kind, ref);

ALTER TABLE payments ADD COLUMN fiken_push_id INTEGER REFERENCES fiken_pushes(id);
ALTER TABLE stripe_payouts ADD COLUMN fiken_push_id INTEGER REFERENCES fiken_pushes(id);
