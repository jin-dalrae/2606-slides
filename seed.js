#!/usr/bin/env node
/*
 * Seed D1 with the canonical content for every deck and doc, keyed by the SAME
 * slug the app uses (the `slug` field in site-data.js) — not the markdown
 * filename. This is the single source of truth for "storage online":
 *
 *   - decks:         base/source markdown for each public item (UPSERT)
 *   - deck_versions: base version history imported from git (user_id NULL)
 *   - orphan cleanup: removes base rows whose slug is no longer in site-data
 *   - regenerates src/public-content.js (the Worker's public allowlist)
 *
 * Usage:
 *   node seed.js --local      # seed the local (wrangler dev) D1
 *   node seed.js --remote     # seed the deployed D1
 *   node seed.js --local --remote
 *
 * Defaults to --local if no target is given, to avoid accidental remote writes.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execSync } = require("child_process");

const ROOT = __dirname;
const PUBLIC_ROOT = path.join(ROOT, "public");
const DB_NAME = "rae-slides";

function loadSiteData() {
  const code = fs.readFileSync(path.join(PUBLIC_ROOT, "site-data.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  if (!sandbox.window.RJ_SITE) throw new Error("site-data.js did not set window.RJ_SITE");
  return sandbox.window.RJ_SITE;
}

function generateId() {
  const bytes = new Uint8Array(32);
  require("crypto").webcrypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const sqlStr = (value) => "'" + String(value).replace(/'/g, "''") + "'";

// Resolve an item's source file on disk.
// Slide `file`s are relative to public/; doc `file`s are relative to public/docs/.
// Repo-root fallbacks (e.g. README.md) are allowed for docs that point outside public/.
function resolveSourceAbs(item, kind) {
  if (kind === "doc") {
    const fromDocs = path.resolve(PUBLIC_ROOT, "docs", item.file);
    if (fs.existsSync(fromDocs)) return fromDocs;
    const fromPublic = path.resolve(PUBLIC_ROOT, item.file.replace(/^\.\.\//, ""));
    if (fs.existsSync(fromPublic)) return fromPublic;
    const fromRoot = path.resolve(ROOT, item.file.replace(/^\.\.\//, ""));
    if (fs.existsSync(fromRoot)) return fromRoot;
    return fromDocs;
  }
  return path.join(PUBLIC_ROOT, item.file);
}

// Path as served by the Worker assets binding (no `public/` prefix).
function assetRelativeFile(absPath) {
  const relPublic = path.relative(PUBLIC_ROOT, absPath).split(path.sep).join("/");
  if (relPublic && !relPublic.startsWith("..") && !path.isAbsolute(relPublic)) {
    return relPublic;
  }
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

// Path inside the git tree (includes `public/` when the file lives there).
function gitRelativeFile(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

function gitVersionsFor(relPath) {
  // Returns [{hash, dateIso, message, markdown}] oldest-first is not required.
  // Follow renames so history survives the public/ move (and earlier path moves).
  let log;
  try {
    log = execSync(`git log --follow --pretty=format:"%h|%aI|%s" -- "${relPath}"`, {
      cwd: ROOT
    })
      .toString()
      .trim();
  } catch {
    return [];
  }
  if (!log) return [];

  const out = [];
  for (const line of log.split("\n")) {
    const [hash, dateIso, ...rest] = line.split("|");
    const message = rest.join("|");
    let markdown;
    try {
      markdown = execSync(`git show ${hash}:"${relPath}"`, { cwd: ROOT }).toString();
    } catch {
      continue; // file may not have existed under this path at that commit
    }
    out.push({ hash, dateIso, message, markdown });
  }
  return out;
}

function buildSql(site, nowIso) {
  const items = [];
  for (const s of site.slides || []) items.push({ ...s, kind: "deck" });
  for (const d of site.docs || []) items.push({ ...d, kind: "doc" });

  const publicSlugs = [];
  const publicFiles = [];
  const knownSlugs = [];

  let sql = "PRAGMA foreign_keys = ON;\n";

  for (const item of items) {
    const slug = item.slug;
    if (!slug) continue;
    knownSlugs.push(slug);

    const absPath = resolveSourceAbs(item, item.kind);
    const assetPath = assetRelativeFile(absPath);
    const gitPath = gitRelativeFile(absPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`  ! missing source file for ${slug}: ${gitPath}`);
      continue;
    }
    const markdown = fs.readFileSync(absPath, "utf8");

    if (item.public) {
      publicSlugs.push(slug);
      if (!publicFiles.includes(assetPath)) publicFiles.push(assetPath);
    }

    // Base content (source of truth) — refresh to match the repo file.
    sql += `INSERT INTO decks (slug, markdown, updated_at) VALUES (${sqlStr(slug)}, ${sqlStr(markdown)}, ${sqlStr(nowIso)}) ON CONFLICT(slug) DO UPDATE SET markdown = excluded.markdown, updated_at = excluded.updated_at;\n`;

    // Re-import base version history from git (clear prior base versions first).
    const versions = gitVersionsFor(gitPath);
    sql += `DELETE FROM deck_versions WHERE slug = ${sqlStr(slug)} AND user_id IS NULL;\n`;
    for (const v of versions) {
      sql += `INSERT INTO deck_versions (id, slug, user_id, markdown, created_at, version_name) VALUES (${sqlStr(generateId())}, ${sqlStr(slug)}, NULL, ${sqlStr(v.markdown)}, ${sqlStr(v.dateIso)}, ${sqlStr(v.message || "Version")});\n`;
    }
    console.log(`  • ${slug} (${item.kind}) — base + ${versions.length} version(s)`);
  }

  // Remove orphaned base rows/versions (old filename-keyed slugs etc.).
  // Only touches canonical rows (user_id IS NULL) and never user overrides.
  const inList = knownSlugs.map(sqlStr).join(", ");
  if (inList) {
    sql += `DELETE FROM deck_versions WHERE user_id IS NULL AND slug NOT IN (${inList});\n`;
    sql += `DELETE FROM decks WHERE slug NOT IN (${inList});\n`;
  }

  return { sql, publicSlugs, publicFiles };
}

function writePublicContent(publicSlugs, publicFiles) {
  const body =
    `// AUTO-GENERATED by seed.js from site-data.js — do not edit by hand.\n` +
    `// Lists the slugs and source file paths of items marked \`public: true\`.\n` +
    `// The Worker uses this to (a) allow the public read API only for public slugs\n` +
    `// and (b) allow direct .md fetches only for public source files.\n` +
    `export const PUBLIC_SLUGS = [\n` +
    publicSlugs.map((s) => `  ${JSON.stringify(s)}`).join(",\n") +
    `\n];\n\n` +
    `// Repo-root-relative paths of public .md sources.\n` +
    `export const PUBLIC_FILES = [\n` +
    publicFiles.map((f) => `  ${JSON.stringify(f)}`).join(",\n") +
    `\n];\n`;
  fs.writeFileSync(path.join(ROOT, "src", "public-content.js"), body);
  console.log(`\nWrote src/public-content.js (${publicSlugs.length} public slugs).`);
}

function runWranglerSql(sqlFile, target) {
  const flag = target === "remote" ? "--remote" : "--local";
  console.log(`\nApplying SQL to ${target} D1...`);
  execSync(`npx wrangler d1 execute ${DB_NAME} ${flag} --file "${sqlFile}" --yes`, {
    cwd: ROOT,
    stdio: "inherit"
  });
}

function main() {
  const args = process.argv.slice(2);
  const targets = [];
  if (args.includes("--local")) targets.push("local");
  if (args.includes("--remote")) targets.push("remote");
  if (targets.length === 0) targets.push("local");

  // new Date() is fine in a plain Node CLI (this is not a Workflow script).
  const nowIso = new Date().toISOString();

  console.log("Seeding from site-data.js...");
  const site = loadSiteData();
  const { sql, publicSlugs, publicFiles } = buildSql(site, nowIso);

  const tmp = path.join(ROOT, ".seed.tmp.sql");
  fs.writeFileSync(tmp, sql);
  try {
    for (const target of targets) runWranglerSql(tmp, target);
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }

  writePublicContent(publicSlugs, publicFiles);
  console.log(`\nSeeding complete for: ${targets.join(", ")}.`);
}

main();
