-- Canonical deck/document markdown content (base/source of truth).
-- Previously these lived as static .md files served to the frontend.
-- Now stored in D1 and only readable by authenticated users via the API.

CREATE TABLE IF NOT EXISTS decks (
  slug TEXT PRIMARY KEY,
  markdown TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS decks_updated_at ON decks(updated_at);
