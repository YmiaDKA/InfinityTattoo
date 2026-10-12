-- The Linework parts the empty trial account couldn't show in use: flash, reviews, notifications,
-- retail products, invoices and payouts to artists, and instruction texts. Built as reasonable
-- guesses and marked PLACEHOLDER-RESCAN in the code; docs/studio/PLACEHOLDER-RESCAN.md lists them.

-- Flash designs the artists share. The studio picks which appear on the booking page.
CREATE TABLE flash (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id),
  title TEXT NOT NULL,
  description TEXT,
  price_ore INTEGER,
  size TEXT,                       -- e.g. "ca. 8 cm"
  duration_min INTEGER,
  r2_key TEXT,                     -- uploaded image (PHOTOS bucket, flash/…)
  content_type TEXT,
  image_url TEXT,                  -- or a link to an image elsewhere
  repeatable INTEGER NOT NULL DEFAULT 1,  -- 0: tattooed once, then marked as taken
  on_booking INTEGER NOT NULL DEFAULT 0,  -- shown on the booking page
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'taken', 'archived')),
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
ALTER TABLE bookings ADD COLUMN flash_id INTEGER REFERENCES flash(id);

-- One review request per finished appointment; the client answers on /anmeldelse/:token.
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER NOT NULL UNIQUE REFERENCES bookings(id),
  staff_id INTEGER REFERENCES staff(id),
  token TEXT NOT NULL UNIQUE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  may_publish INTEGER NOT NULL DEFAULT 0, -- the client allows showing it on the website
  hidden INTEGER NOT NULL DEFAULT 0,      -- hidden by the studio
  requested_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  submitted_at TEXT
);

-- When each staff member last opened the notifications bell.
CREATE TABLE notifications_seen (
  email TEXT PRIMARY KEY,
  seen_at TEXT NOT NULL
);

-- Retail products (aftercare cream, jewellery) with categories. The ink register stays separate.
CREATE TABLE product_categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  category_id INTEGER REFERENCES product_categories(id),
  name TEXT NOT NULL,
  price_ore INTEGER NOT NULL,
  vat_pct INTEGER NOT NULL DEFAULT 25,
  sku TEXT,
  stock INTEGER,                   -- NULL: not counted
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
ALTER TABLE payments ADD COLUMN product_id INTEGER REFERENCES products(id);
ALTER TABLE payments ADD COLUMN quantity INTEGER;

-- Invoices from the studio to an artist (chair rent and studio commission), own number series.
CREATE TABLE artist_invoices (
  id INTEGER PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  buyer_name TEXT NOT NULL,
  buyer_address TEXT,
  seller_json TEXT NOT NULL,       -- the studio's details as printed
  period_from TEXT NOT NULL,
  period_to TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  due_date TEXT NOT NULL,
  lines_json TEXT NOT NULL,        -- [{ text, kind: rent|commission|other, amount_ore, vat_pct, vat_ore }]
  total_ore INTEGER NOT NULL,
  vat_ore INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'paid', 'void')),
  emailed_at TEXT,
  paid_at TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- What the studio has paid out to each artist for a period.
CREATE TABLE artist_payouts (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  period_from TEXT NOT NULL,
  period_to TEXT NOT NULL,
  amount_ore INTEGER NOT NULL,
  paid_on TEXT NOT NULL,
  note TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Instructions sent before (with the confirmation and reminder) or after (when finished) an appointment.
CREATE TABLE instructions (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  timing TEXT NOT NULL CHECK (timing IN ('before', 'after')),
  kinds TEXT,                      -- comma-separated service kinds; NULL means all
  email_subject TEXT,
  body_no TEXT NOT NULL,
  body_en TEXT,
  sms_text TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
