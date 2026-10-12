-- Multi-session projects: later sittings point at the first booking of the project.
ALTER TABLE bookings ADD COLUMN project_id INTEGER REFERENCES bookings(id);
CREATE INDEX bookings_project ON bookings(project_id);

-- Fixed monthly booth rent per artist, on top of (or instead of) the studio share %.
ALTER TABLE staff ADD COLUMN monthly_rent_ore INTEGER NOT NULL DEFAULT 0;

-- Cleanup time kept free after each appointment of this service.
ALTER TABLE services ADD COLUMN buffer_min INTEGER NOT NULL DEFAULT 0;

-- Ink register: which ink and batch was used on which client, so a recalled batch can be traced.
CREATE TABLE inks (
  id INTEGER PRIMARY KEY,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,            -- colour / product name
  batch TEXT,                    -- lot number from the bottle
  expires_on TEXT,               -- YYYY-MM-DD
  supplier TEXT,
  in_stock INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE booking_inks (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id),
  ink_id INTEGER NOT NULL REFERENCES inks(id),
  by TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (booking_id, ink_id)
);
CREATE INDEX booking_inks_ink ON booking_inks(ink_id);
