-- Version history for decks/docs. A NULL user_id marks a canonical/base version
-- (e.g. imported from git history or a base update); a set user_id marks a
-- specific user's saved edit.
CREATE TABLE IF NOT EXISTS deck_versions (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  user_id TEXT,
  markdown TEXT NOT NULL,
  created_at TEXT NOT NULL,
  version_name TEXT,
  FOREIGN KEY (slug) REFERENCES decks(slug) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS deck_versions_slug_index ON deck_versions(slug);
CREATE INDEX IF NOT EXISTS deck_versions_created_at_index ON deck_versions(created_at);
