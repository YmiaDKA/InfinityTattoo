-- Optional modules the owner can switch off in Innstillinger → Funksjoner. Turning one off hides it; no data is deleted.
CREATE TABLE features (
  key TEXT PRIMARY KEY,
  enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
