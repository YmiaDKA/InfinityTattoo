-- Infinity Studio: booking + internal system.
-- Money is stored in øre (integer). Timestamps are UTC ISO-8601 strings.
-- Business dates (YYYY-MM-DD) are in Europe/Oslo.

CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'artist', 'piercer', 'guest', 'reception')),
  -- Share of a sale the studio keeps (0-100). Used for the artist settlement.
  studio_share_pct INTEGER NOT NULL DEFAULT 0 CHECK (studio_share_pct BETWEEN 0 AND 100),
  color TEXT NOT NULL DEFAULT '#b91c1c',
  bookable INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE services (
  id INTEGER PRIMARY KEY,
  name_no TEXT NOT NULL,
  name_en TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('consultation', 'tattoo', 'piercing', 'tooth_gem', 'other')),
  duration_min INTEGER NOT NULL CHECK (duration_min > 0),
  price_ore INTEGER,            -- NULL = price set by artist after consultation
  deposit_ore INTEGER NOT NULL DEFAULT 0,
  -- Requests need manual approval (custom tattoos); otherwise the slot is confirmed instantly.
  requires_approval INTEGER NOT NULL DEFAULT 1,
  public INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

-- Which staff members perform which services.
CREATE TABLE staff_services (
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  service_id INTEGER NOT NULL REFERENCES services(id),
  PRIMARY KEY (staff_id, service_id)
);

-- Weekly working hours per staff member (weekday 1 = Monday ... 7 = Sunday).
CREATE TABLE working_hours (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 1 AND 7),
  start_time TEXT NOT NULL,     -- HH:MM local
  end_time TEXT NOT NULL
);

-- Holidays, sick days, guest spots elsewhere, breaks.
CREATE TABLE time_off (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id), -- NULL = whole studio closed
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  reason TEXT
);

CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birth_date TEXT,              -- needed for the 18+ check on consent
  notes TEXT,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX clients_email ON clients(email);
CREATE INDEX clients_phone ON clients(phone);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,  -- unguessable id used in client links
  client_id INTEGER NOT NULL REFERENCES clients(id),
  staff_id INTEGER REFERENCES staff(id),       -- NULL = "any artist"
  service_id INTEGER NOT NULL REFERENCES services(id),
  status TEXT NOT NULL CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled', 'no_show')),
  starts_at TEXT,                  -- NULL while a request has no time yet
  ends_at TEXT,
  idea TEXT,
  placement TEXT,
  size TEXT,
  style TEXT,
  first_tattoo INTEGER,
  budget TEXT,
  price_ore INTEGER,               -- agreed price
  deposit_ore INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  source TEXT NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'staff', 'phone', 'instagram', 'walk_in')),
  language TEXT NOT NULL DEFAULT 'no',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX bookings_staff_time ON bookings(staff_id, starts_at);
CREATE INDEX bookings_status ON bookings(status);

-- Money received. Recorded from the certified payment app/terminal (SumUp, Zettle, Vipps...)
-- or entered by staff. This table is NOT a cash register journal; see docs/studio/PLAN.md.
CREATE TABLE payments (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  staff_id INTEGER REFERENCES staff(id),      -- whose work the payment is for
  kind TEXT NOT NULL CHECK (kind IN ('deposit', 'payment', 'refund', 'gift_card_sale', 'product')),
  method TEXT NOT NULL CHECK (method IN ('card', 'vipps', 'cash', 'gift_card', 'bank', 'other')),
  amount_ore INTEGER NOT NULL,     -- negative for refunds
  provider TEXT,                   -- e.g. 'sumup', 'zettle', 'vipps', 'manual'
  provider_ref TEXT,               -- transaction id in the provider
  note TEXT,
  paid_at TEXT NOT NULL,
  business_date TEXT NOT NULL,     -- YYYY-MM-DD Europe/Oslo
  report_id INTEGER REFERENCES day_reports(id), -- set when the day is closed
  recorded_by TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (provider, provider_ref)
);
CREATE INDEX payments_business_date ON payments(business_date);

-- Daily settlement ("dagsoppgjør"). Sequentially numbered and immutable once written.
CREATE TABLE day_reports (
  id INTEGER PRIMARY KEY,
  seq INTEGER NOT NULL UNIQUE,
  business_date TEXT NOT NULL UNIQUE,
  totals_json TEXT NOT NULL,       -- full computed report, frozen at close
  counted_cash_ore INTEGER,        -- what was counted in the till
  note TEXT,
  closed_by TEXT NOT NULL,
  closed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Health/consent form per treatment (signed digitally before the appointment).
CREATE TABLE consents (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id),
  answers_json TEXT NOT NULL,
  signed_name TEXT NOT NULL,
  signed_at TEXT NOT NULL,
  ip TEXT
);

-- Who did what, for the owner's peace of mind.
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id INTEGER,
  detail TEXT,
  at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
