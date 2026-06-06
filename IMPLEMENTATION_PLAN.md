# Reliable Mobile Web Slides App Implementation Plan

## Goal

Turn the current static slide viewer into a reliable mobile web slides application with real user accounts, server-backed Markdown editing, and per-user saved decks.

## Current Prototype Gaps

- `Edit` opens GitHub instead of editing inside the app.
- Presentation settings were previously global; transition, background, and font are now scoped per deck in the browser, but still not account-backed.
- Theme is still global for the whole site.
- Settings are stored in browser `localStorage`, so they do not follow the user across devices.
- Speaker notes are documented, but there is no user-facing speaker-view workflow.
- Print / PDF export is documented as future work, not implemented.
- Sidebar slide thumbnails are future work, not implemented.
- Mobile layout exists, but slide content patterns still need responsive hardening.
- Deep links silently fall back to the first deck on invalid slugs.
- Fullscreen failure has no visible user feedback.
- Reveal.js, plugins, and fonts load from CDNs, so offline and blocked-CDN behavior is weak.
- Accessibility needs a full pass: focus states, contrast, sidebar behavior, screen-reader semantics.

## User Requests To Implement

- Make this a reliable mobile web slides application.
- Add real auth with ID/password.
- Let users have individual accounts.
- Let users edit slides on-site.
- When users click `Edit`, show the Markdown editing window directly below the slide.
- Saved Markdown must be server-backed, not browser-local.
- Current presentation settings should affect only the active presentation.
- Plain background should be black in dark mode and white in light mode.

## Backend Direction

Use Cloudflare:

- Cloudflare Pages for the static frontend.
- Cloudflare Pages Functions or Workers for `/api/*` routes.
- D1 for users, sessions, and user deck Markdown.
- HttpOnly secure cookies for sessions.
- Web Crypto PBKDF2 password hashing inside the Worker runtime.

## API Surface

- `POST /api/signup`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`
- `GET /api/decks/:slug`
- `PUT /api/decks/:slug/markdown`
- `DELETE /api/decks/:slug/markdown`

## Data Model

```sql
users(
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at TEXT NOT NULL
)

sessions(
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

user_decks(
  user_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  markdown TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, slug),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

## Frontend Behavior

- Anonymous users can view public static decks.
- Signed-in users can save their own Markdown copy of a deck.
- On deck load, the app fetches the static Markdown first, then overlays a user-saved version if one exists.
- `Edit` toggles a Markdown editor below the slide.
- `Save` sends Markdown to `/api/decks/:slug/markdown`.
- `Reset` removes the user's saved override and returns to the public Markdown.
- After save/reset, the Reveal deck re-renders and keeps the user near the same slide.

## Implementation Order

1. Keep the current scoped setting/mobile/plain-background fixes.
2. Add Cloudflare config, D1 migration, and API function.
3. Add account panel to the sidebar.
4. Replace GitHub-only edit behavior with an in-page Markdown editor.
5. Load signed-in user Markdown from the API.
6. Save/reset Markdown through authenticated API routes.
7. Add mobile editor styling.
8. Verify JS syntax and Cloudflare function syntax.
9. Document deployment steps.

## Completion Tracking

- Done: presentation-scoped transition/background/font settings.
- Done: plain background dark/light fix.
- Done: first-pass mobile sidebar behavior.
- Done: Cloudflare D1 schema.
- Done: Cloudflare auth API scaffold.
- Done: frontend auth UI backed by `/api/*`.
- Done: in-page Markdown editor below the slide.
- Done: server-backed saved Markdown API wiring.
- Done: deployment documentation draft.
- Pending: create real Cloudflare D1 database and replace `database_id`.
- Pending: run D1 migration in Cloudflare.
- Pending: deployed end-to-end browser test.
- Pending: production hardening for rate limits, password reset, account recovery, and email verification.

## Deployment Steps

1. Create the D1 database:

```sh
npx wrangler d1 create rae-slides
```

2. Copy the returned database ID into `wrangler.toml`.

3. Apply the migration:

```sh
npx wrangler d1 migrations apply rae-slides
```

4. Deploy to Cloudflare Pages with the D1 binding named `DB`.

5. Test:

- Create account.
- Log out.
- Log in.
- Open a deck.
- Click `Edit`.
- Save Markdown.
- Reload on the same account.
- Confirm saved Markdown appears.
- Log out and confirm the public static deck appears.
