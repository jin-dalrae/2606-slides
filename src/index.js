const SESSION_COOKIE = "rae_slides_session";
const SESSION_DAYS = 14;
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_BITS = 256;
const MAX_MARKDOWN_LENGTH = 250000;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}

function badRequest(message) {
  return json({ error: message }, 400);
}

function unauthorized() {
  return json({ error: "Not signed in." }, 401);
}

function notFound() {
  return json({ error: "Not found." }, 404);
}

function nowIso() {
  return new Date().toISOString();
}

function sessionExpiry() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

function randomId() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function validUsername(username) {
  return /^[a-z0-9._-]{3,32}$/.test(username);
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.get("Cookie") || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const eq = part.indexOf("=");
        return eq >= 0 ? [part.slice(0, eq), decodeURIComponent(part.slice(eq + 1))] : [part, ""];
      })
  );
}

function sessionCookie(value, expiresAt) {
  const expires = expiresAt ? `; Expires=${new Date(expiresAt).toUTCString()}` : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax${expires}`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

async function hashPassword(password, saltHex) {
  const salt = hexToBytes(saltHex);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: PASSWORD_ITERATIONS
    },
    key,
    PASSWORD_KEY_BITS
  );
  return bytesToHex(new Uint8Array(bits));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return mismatch === 0;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function currentUser(request, env) {
  const sessionId = parseCookies(request)[SESSION_COOKIE];
  if (!sessionId) {
    return null;
  }

  const session = await env.DB.prepare(
    `SELECT sessions.id, sessions.expires_at, users.id AS user_id, users.username
     FROM sessions
     JOIN users ON users.id = sessions.user_id
     WHERE sessions.id = ?`
  ).bind(sessionId).first();

  if (!session) {
    return null;
  }

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
    return null;
  }

  return {
    id: session.user_id,
    username: session.username,
    sessionId: session.id
  };
}

async function signup(request, env) {
  const body = await readJson(request);
  const username = normalizeUsername(body?.username);
  const password = String(body?.password || "");

  if (!validUsername(username)) {
    return badRequest("Use 3-32 characters: letters, numbers, dot, underscore, or dash.");
  }

  if (password.length < 8) {
    return badRequest("Password must be at least 8 characters.");
  }

  const existing = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(username).first();
  if (existing) {
    return badRequest("That ID already exists.");
  }

  const userId = randomId();
  const salt = randomId();
  const passwordHash = await hashPassword(password, salt);
  await env.DB.prepare(
    "INSERT INTO users (id, username, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?)"
  ).bind(userId, username, passwordHash, salt, nowIso()).run();

  const expiresAt = sessionExpiry();
  const sessionId = randomId();
  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(sessionId, userId, expiresAt, nowIso()).run();

  return json(
    { user: { id: userId, username } },
    201,
    { "Set-Cookie": sessionCookie(sessionId, expiresAt) }
  );
}

async function login(request, env) {
  const body = await readJson(request);
  const username = normalizeUsername(body?.username);
  const password = String(body?.password || "");

  if (!username || !password) {
    return badRequest("Enter ID and password.");
  }

  const user = await env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
  if (!user) {
    return unauthorized();
  }

  const passwordHash = await hashPassword(password, user.password_salt);
  if (!timingSafeEqual(passwordHash, user.password_hash)) {
    return unauthorized();
  }

  const expiresAt = sessionExpiry();
  const sessionId = randomId();
  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(sessionId, user.id, expiresAt, nowIso()).run();

  return json(
    { user: { id: user.id, username: user.username } },
    200,
    { "Set-Cookie": sessionCookie(sessionId, expiresAt) }
  );
}

async function logout(request, env) {
  const user = await currentUser(request, env);
  if (user) {
    await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(user.sessionId).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}

async function me(request, env) {
  const user = await currentUser(request, env);
  return json({ user: user ? { id: user.id, username: user.username } : null });
}

async function getBaseDeck(env, slug) {
  const row = await env.DB.prepare(
    "SELECT markdown, updated_at FROM decks WHERE slug = ?"
  ).bind(slug).first();
  return row ? { markdown: row.markdown, updatedAt: row.updated_at } : null;
}

async function saveBaseDeck(env, slug, markdown) {
  const updatedAt = nowIso();
  await env.DB.prepare(
    `INSERT INTO decks (slug, markdown, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET markdown = excluded.markdown, updated_at = excluded.updated_at`
  ).bind(slug, markdown, updatedAt).run();

  const versionId = randomId();
  await env.DB.prepare(
    `INSERT INTO deck_versions (id, slug, user_id, markdown, created_at, version_name)
     VALUES (?, ?, NULL, ?, ?, ?)`
  ).bind(versionId, slug, markdown, updatedAt, "Base Update").run();

  return { ok: true, updatedAt };
}

async function deck(request, env, slug) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  const base = await getBaseDeck(env, slug);
  const row = await env.DB.prepare(
    "SELECT markdown, updated_at FROM user_decks WHERE user_id = ? AND slug = ?"
  ).bind(user.id, slug).first();

  return json({
    baseMarkdown: base?.markdown || null,
    markdown: row?.markdown || base?.markdown || null,
    hasOverride: Boolean(row),
    updatedAt: row?.updated_at || null
  });
}

async function saveDeck(request, env, slug) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  const body = await readJson(request);
  const markdown = String(body?.markdown || "");
  if (!markdown.trim()) {
    return badRequest("Markdown cannot be empty.");
  }

  if (markdown.length > MAX_MARKDOWN_LENGTH) {
    return badRequest("Markdown is too large.");
  }

  const updatedAt = nowIso();
  await env.DB.prepare(
    `INSERT INTO user_decks (user_id, slug, markdown, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, slug)
     DO UPDATE SET markdown = excluded.markdown, updated_at = excluded.updated_at`
  ).bind(user.id, slug, markdown, updatedAt).run();

  const versionId = randomId();
  await env.DB.prepare(
    `INSERT INTO deck_versions (id, slug, user_id, markdown, created_at, version_name)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(versionId, slug, user.id, markdown, updatedAt, "User Edit").run();

  return json({ ok: true, updatedAt });
}

async function getDeckVersions(request, env, slug) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  const { results } = await env.DB.prepare(
    "SELECT id, created_at, version_name, user_id FROM deck_versions WHERE slug = ? AND (user_id IS NULL OR user_id = ?) ORDER BY created_at DESC"
  ).bind(slug, user.id).all();

  return json({ versions: results || [] });
}

async function getDeckVersion(request, env, slug, versionId) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  const row = await env.DB.prepare(
    "SELECT markdown FROM deck_versions WHERE slug = ? AND id = ? AND (user_id IS NULL OR user_id = ?)"
  ).bind(slug, versionId, user.id).first();

  if (!row) return notFound();
  return json({ markdown: row.markdown });
}

async function resetDeck(request, env, slug) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  await env.DB.prepare("DELETE FROM user_decks WHERE user_id = ? AND slug = ?").bind(user.id, slug).run();
  return json({ ok: true });
}

async function saveBaseDeckHandler(request, env, slug) {
  const user = await currentUser(request, env);
  if (!user) {
    return unauthorized();
  }

  const body = await readJson(request);
  const markdown = String(body?.markdown || "");
  if (!markdown.trim()) {
    return badRequest("Markdown cannot be empty.");
  }

  if (markdown.length > MAX_MARKDOWN_LENGTH) {
    return badRequest("Markdown is too large.");
  }

  return json(await saveBaseDeck(env, slug, markdown));
}

async function handleApi(request, env) {
  const method = request.method.toUpperCase();
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const parts = path.split("/").filter(Boolean);

  if (!env.DB) {
    return json({ error: "D1 binding DB is not configured." }, 500);
  }

  // Ensure the decks table exists (for canonical markdown storage).
  // In production run the migration for a clean schema:
  //   npx wrangler d1 migrations apply rae-slides --remote
  if (path.startsWith("decks") || path.startsWith("public/decks") || path === "signup" || path === "login" || path === "me" || path === "logout") {
    // Ensure auth + content tables exist (run the official migrations for production cleanliness)
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, created_at TEXT NOT NULL)`).run();
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at TEXT NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS sessions_user_id_index ON sessions(user_id)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS sessions_expires_at_index ON sessions(expires_at)`).run();
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS user_decks (user_id TEXT NOT NULL, slug TEXT NOT NULL, markdown TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (user_id, slug), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`).run();
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS decks (
        slug TEXT PRIMARY KEY,
        markdown TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`
    ).run();
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS deck_versions (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL,
        user_id TEXT,
        markdown TEXT NOT NULL,
        created_at TEXT NOT NULL,
        version_name TEXT,
        FOREIGN KEY (slug) REFERENCES decks(slug) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ).run();
  }

  if (method === "POST" && path === "signup") {
    return signup(request, env);
  }

  if (method === "POST" && path === "login") {
    return login(request, env);
  }

  if (method === "POST" && path === "logout") {
    return logout(request, env);
  }

  if (method === "GET" && path === "me") {
    return me(request, env);
  }

  if (parts[0] === "decks" && parts[1]) {
    const slug = parts[1];

    if (method === "GET" && parts.length === 2) {
      return deck(request, env, slug);
    }

    if (method === "GET" && parts[2] === "versions" && parts.length === 3) {
      return getDeckVersions(request, env, slug);
    }

    if (method === "GET" && parts[2] === "versions" && parts[3]) {
      return getDeckVersion(request, env, slug, parts[3]);
    }

    if (method === "PUT" && parts[2] === "markdown") {
      return saveDeck(request, env, slug);
    }

    if (method === "DELETE" && parts[2] === "markdown") {
      return resetDeck(request, env, slug);
    }

    // Base / canonical markdown (the source of truth, previously static .md files).
    // Only accessible to authenticated users.
    if (method === "PUT" && parts[2] === "base") {
      return saveBaseDeckHandler(request, env, slug);
    }
  }

  // Public read-only access for specific documents (no auth required).
  // Used for items marked `public: true` in site-data.js.
  // Anyone with the direct URL can read, but cannot edit (edits still require login + go through user_decks).
  if (parts[0] === "public" && parts[1] === "decks" && parts[2]) {
    const slug = parts[2];
    if (method === "GET" && parts.length === 3) {
      const base = await getBaseDeck(env, slug);
      return json({
        markdown: base?.markdown || null,
        updatedAt: base?.updatedAt || null
      });
    }

    if (method === "GET" && parts[3] === "versions" && parts.length === 4) {
      const { results } = await env.DB.prepare(
        "SELECT id, created_at, version_name, user_id FROM deck_versions WHERE slug = ? AND user_id IS NULL ORDER BY created_at DESC"
      ).bind(slug).all();
      return json({ versions: results || [] });
    }

    if (method === "GET" && parts[3] === "versions" && parts[4]) {
      const row = await env.DB.prepare(
        "SELECT markdown FROM deck_versions WHERE slug = ? AND id = ? AND user_id IS NULL"
      ).bind(slug, parts[4]).first();
      return row ? json({ markdown: row.markdown }) : notFound();
    }
  }

  return notFound();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }

    // .md protection temporarily disabled to support client-side fallback
    // for public documents (during transition to DB-only storage).
    // Public docs can fall back to their original .md files if not yet seeded in D1.
    // Private content lists remain login-walled.
    // Re-enable later once all public content is seeded:
    // if (/\.md(\?|$)/.test(url.pathname)) {
    //   const user = await currentUser(request, env);
    //   if (!user) {
    //     return json({ error: "Authentication required to access source files." }, 401);
    //   }
    // }

    return env.ASSETS.fetch(request);
  }
};
