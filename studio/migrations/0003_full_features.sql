-- Consent signing, client emails, online payments, gift cards, personalliste, calendar feeds, photos.

ALTER TABLE staff ADD COLUMN birth_date TEXT;          -- personalliste
ALTER TABLE staff ADD COLUMN national_id TEXT;         -- personalliste (fødselsnummer/D-nummer), owner-only
ALTER TABLE staff ADD COLUMN ical_token TEXT;          -- secret for the calendar feed

ALTER TABLE services ADD COLUMN aftercare_no TEXT;
ALTER TABLE services ADD COLUMN aftercare_en TEXT;
ALTER TABLE services ADD COLUMN needs_consent INTEGER NOT NULL DEFAULT 1;

-- Web bookings with a deposit hold their slot until this time; unpaid holds are released.
ALTER TABLE bookings ADD COLUMN hold_until TEXT;
ALTER TABLE bookings ADD COLUMN cancel_reason TEXT;

-- Answers to the health/consent form (one active form per booking; re-signing adds a row).
-- consents table exists from 0001; add the fields the form needs.
ALTER TABLE consents ADD COLUMN birth_date TEXT;
ALTER TABLE consents ADD COLUMN guardian_name TEXT;
ALTER TABLE consents ADD COLUMN photo_consent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE consents ADD COLUMN language TEXT NOT NULL DEFAULT 'no';

-- Every email we send to a client, so reminders are never sent twice.
CREATE TABLE emails (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  gift_card_id INTEGER,
  kind TEXT NOT NULL,          -- confirmation, request_received, reminder, consent, deposit_link, aftercare, gift_card, cancelled
  to_address TEXT NOT NULL,
  status TEXT NOT NULL,        -- sent, failed, skipped
  error TEXT,
  sent_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX emails_booking_kind ON emails(booking_id, kind);

-- Online payments (deposits, gift cards) created as checkout links. Paid ones also land in `payments`.
CREATE TABLE online_payments (
  id INTEGER PRIMARY KEY,
  purpose TEXT NOT NULL CHECK (purpose IN ('deposit', 'gift_card')),
  booking_id INTEGER REFERENCES bookings(id),
  gift_card_id INTEGER REFERENCES gift_cards(id),
  amount_ore INTEGER NOT NULL CHECK (amount_ore > 0),
  provider TEXT NOT NULL,
  session_id TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'paid', 'expired')),
  provider_ref TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  paid_at TEXT
);

CREATE TABLE gift_cards (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  initial_ore INTEGER NOT NULL CHECK (initial_ore > 0),
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'void')),
  buyer_name TEXT,
  buyer_email TEXT,
  recipient_name TEXT,
  message TEXT,
  source TEXT NOT NULL CHECK (source IN ('online', 'studio')),
  expires_on TEXT NOT NULL,    -- YYYY-MM-DD
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  created_by TEXT
);

-- Balance movements: + when issued, - when redeemed. Balance = SUM(amount_ore).
CREATE TABLE gift_card_movements (
  id INTEGER PRIMARY KEY,
  gift_card_id INTEGER NOT NULL REFERENCES gift_cards(id),
  amount_ore INTEGER NOT NULL,
  booking_id INTEGER REFERENCES bookings(id),
  note TEXT,
  at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  by TEXT
);

-- Personalliste (bokføringsforskriften kap. 8-3 for skjønnhetspleie incl. piercing).
-- Rows are never deleted; corrections are logged in shift_corrections.
CREATE TABLE shifts (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  business_date TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  registered_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX shifts_date ON shifts(business_date);

CREATE TABLE shift_corrections (
  id INTEGER PRIMARY KEY,
  shift_id INTEGER NOT NULL REFERENCES shifts(id),
  old_started_at TEXT,
  old_ended_at TEXT,
  new_started_at TEXT,
  new_ended_at TEXT,
  reason TEXT NOT NULL,
  corrected_by TEXT NOT NULL,
  at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Reference photos uploaded with a booking request (stored in R2).
CREATE TABLE booking_photos (
  id INTEGER PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id),
  r2_key TEXT NOT NULL UNIQUE,
  content_type TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

UPDATE services SET needs_consent = 0 WHERE kind = 'consultation';
UPDATE staff SET ical_token = lower(hex(randomblob(16)));

-- Default aftercare texts; the studio edits them under Innstillinger → Behandlinger.
UPDATE services SET
  aftercare_no = 'Takk for besøket! Slik tar du vare på den nye tatoveringen:
- La bandasjen sitte i noen timer (eller som avtalt med artisten).
- Vask forsiktig med lunkent vann og parfymefri såpe, og klapp tørt med rent papir.
- Smør et tynt lag med anbefalt krem 2–3 ganger om dagen i ca. to uker.
- Ikke klø eller pirk i skorper. Unngå bading, badstue, solarium og direkte sol i minst to uker.
- Ta kontakt hvis du får tegn på infeksjon (økende rødhet, varme, puss eller feber).',
  aftercare_en = 'Thanks for coming in! How to look after your new tattoo:
- Keep the wrap on for a few hours (or as your artist told you).
- Wash gently with lukewarm water and fragrance-free soap, and pat dry with clean paper.
- Apply a thin layer of the recommended cream 2–3 times a day for about two weeks.
- Don''t scratch or pick at scabs. Avoid swimming, saunas, tanning beds and direct sun for at least two weeks.
- Contact us if you see signs of infection (increasing redness, heat, pus or fever).'
WHERE kind = 'tattoo';

UPDATE services SET
  aftercare_no = 'Takk for besøket! Slik tar du vare på den nye piercingen:
- Rens 2 ganger om dagen med sterilt saltvann. Ikke bruk alkohol eller hydrogenperoksid.
- Ikke vri eller ta på smykket med uvaskede hender, og ikke bytt smykke før det er grodd.
- Unngå bading i basseng, sjø og badekar de første ukene.
- Litt hevelse og klar væske er normalt. Ta kontakt ved tegn på infeksjon (økende rødhet, varme, puss eller feber).',
  aftercare_en = 'Thanks for coming in! How to look after your new piercing:
- Clean twice a day with sterile saline. Don''t use alcohol or hydrogen peroxide.
- Don''t twist or touch the jewellery with unwashed hands, and don''t change it until it has healed.
- Avoid pools, the sea and baths for the first weeks.
- Some swelling and clear fluid is normal. Contact us if you see signs of infection (increasing redness, heat, pus or fever).'
WHERE kind = 'piercing';

UPDATE services SET
  aftercare_no = 'Takk for besøket! Unngå å spise og drikke den første timen, ikke pirk i steinen, og puss tennene forsiktig rundt den de første dagene.',
  aftercare_en = 'Thanks for coming in! Avoid eating and drinking for the first hour, don''t pick at the gem, and brush gently around it for the first few days.'
WHERE kind = 'tooth_gem';
