-- When a staff member first logged in, so Artister/Ledere can show "Invitert" until they have.
ALTER TABLE staff ADD COLUMN last_login_at TEXT;

-- Client address, needed on an invoice (bokføringsforskriften § 5-1-1: buyer's name and address).
ALTER TABLE clients ADD COLUMN address TEXT;
ALTER TABLE clients ADD COLUMN postcode TEXT;
ALTER TABLE clients ADD COLUMN city TEXT;
