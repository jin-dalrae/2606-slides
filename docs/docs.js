const siteData = window.RJ_SITE || {};
const projectMeta = siteData.projects || [];
const docs = (siteData.docs || []).map((item) => ({
  ...item,
  section: item.section || item.project || "Other",
  tagline: item.tagline || projectMeta.find((project) => project.name === (item.section || item.project))?.tagline || ""
}));

const docSections = projectMeta.map((project) => project.name).filter((name) => docs.some((item) => item.section === name));
const storageKey = "rae-slides-theme";
const appShell = document.querySelector(".app-shell");
const docList = document.querySelector("#docList");
const docMeta = document.querySelector("#docMeta");
const docTitle = document.querySelector("#docTitle");
const docViewer = document.querySelector("#docViewer");
const docsHome = document.querySelector("#docsHome");
if (docsHome) {
  const label = docsHome.querySelector(".sidebar-home-link__label");
  if (label) {
    label.textContent = siteData.docsTitle || "Web Docs";
  }
}
const profileLinks = document.querySelector("#profileLinks");
const themeToggle = document.querySelector("#themeToggle");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");
const mobileMedia = window.matchMedia("(max-width: 760px)");
const accountPanel = document.querySelector("#accountPanel");
const accountMenu = document.querySelector("#accountMenu");
const accountTrigger = document.querySelector("#accountTrigger");

let currentDoc = 0;
let currentView = "home";
let currentTheme = window.localStorage.getItem(storageKey) || "dark";

let currentUser = null;
let authMode = "signin";
let authStatus = "";
let authBusy = false;
let apiAvailable = true;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderProfileLinks() {
  if (!profileLinks) {
    return;
  }

  profileLinks.innerHTML = (siteData.profileLinks || [])
    .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = escapeHtml(href);
    const target = /^https?:\/\//.test(href) ? ' target="_blank" rel="noreferrer"' : "";
    return `<a href="${safeHref}"${target}>${label}</a>`;
  });
  return html;
}

function flushParagraph(lines, html) {
  if (!lines.length) {
    return;
  }
  html.push(`<p>${inlineMarkdown(lines.join(" "))}</p>`);
  lines.length = 0;
}

function renderTable(lines) {
  const rows = lines
    .filter((line, index) => index !== 1)
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (!rows.length) {
    return "";
  }

  const [head, ...body] = rows;
  return `
    <div class="doc-table-wrap">
      <table>
        <thead>
          <tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const paragraph = [];
  let list = null;
  let table = [];
  let code = null;

  function flushList() {
    if (!list) {
      return;
    }
    html.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${list.type}>`);
    list = null;
  }

  function flushTable() {
    if (!table.length) {
      return;
    }
    html.push(renderTable(table));
    table = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (code) {
      if (trimmed.startsWith("```")) {
        html.push(`<pre><code>${escapeHtml(code.lines.join("\n"))}</code></pre>`);
        code = null;
      } else {
        code.lines.push(line);
      }
      continue;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph(paragraph, html);
      flushList();
      flushTable();
      code = { lines: [] };
      continue;
    }

    if (/^\|.+\|$/.test(trimmed)) {
      flushParagraph(paragraph, html);
      flushList();
      table.push(trimmed);
      continue;
    }

    flushTable();

    if (!trimmed) {
      flushParagraph(paragraph, html);
      flushList();
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph(paragraph, html);
      flushList();
      html.push("<hr>");
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph(paragraph, html);
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph(paragraph, html);
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph(paragraph, html);
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(unordered[1]);
      continue;
    }

    const quote = trimmed.match(/^>\s?(.+)$/);
    if (quote) {
      flushParagraph(paragraph, html);
      flushList();
      html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph(paragraph, html);
  flushList();
  flushTable();

  return html.join("\n");
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`/api/${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.error || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return data;
}

function setAccountTriggerLabel() {
  if (!accountTrigger) {
    return;
  }
  accountTrigger.textContent = currentUser ? currentUser.username : "Account";
}

function setAccountMenuOpen(open) {
  if (!accountPanel) {
    return;
  }
  accountPanel.hidden = !open;
  accountTrigger?.setAttribute("aria-expanded", String(Boolean(open)));
}

function renderAccountPanel() {
  if (!accountPanel) {
    return;
  }

  setAccountTriggerLabel();

  if (!apiAvailable) {
    accountPanel.innerHTML = `
      <p class="account-panel__label">Account</p>
      <p style="font-size: 0.85rem; line-height: 1.3; color: var(--dim); margin-bottom: 8px;">
        Sign in / create account requires the backend.
      </p>
      <p style="font-size: 0.85rem; line-height: 1.3; color: var(--dim);">
        <strong>You are probably still on the old static server URL.</strong><br><br>
        1. Look in the <strong>wrangler dev terminal</strong> — it prints the real URL (e.g. <code>http://localhost:8787</code>).<br>
        2. Copy and open <strong>that URL</strong> in your browser.<br>
        3. Make sure no old <code>python -m http.server</code> is still running on another port.<br>
        4. Hard-refresh the page (Cmd/Ctrl + Shift + R).
      </p>
    `;
    return;
  }

  if (currentUser) {
    accountPanel.innerHTML = `
      <p class="account-panel__label">Signed in</p>
      <p class="account-panel__user">${escapeHtml(currentUser.username)}</p>
      <button class="text-button account-panel__button" id="logoutButton" type="button">Sign out</button>
    `;
    const btn = accountPanel.querySelector("#logoutButton");
    if (btn) btn.addEventListener("click", logout);
    return;
  }

  const isSignup = authMode === "signup";
  accountPanel.innerHTML = `
    <form class="account-form" id="accountForm">
      <p class="account-panel__label">${isSignup ? "Create account" : "Sign in"}</p>
      <label>
        <span>ID</span>
        <input id="accountUsername" name="username" autocomplete="username" minlength="3" maxlength="32" ${authBusy ? "disabled" : ""}>
      </label>
      <label>
        <span>PW</span>
        <input id="accountPassword" name="password" type="password" autocomplete="${isSignup ? "new-password" : "current-password"}" minlength="8" ${authBusy ? "disabled" : ""}>
      </label>
      <div class="account-form__actions">
        <button class="text-button account-panel__button" type="submit" ${authBusy ? "disabled" : ""}>${isSignup ? "Create" : "Sign in"}</button>
        <button class="text-button account-panel__button" id="authModeToggle" type="button" ${authBusy ? "disabled" : ""}>${isSignup ? "Use login" : "Create"}</button>
      </div>
      <p class="account-panel__message" aria-live="polite">${escapeHtml(authStatus)}</p>
    </form>
  `;

  const form = accountPanel.querySelector("#accountForm");
  const toggle = accountPanel.querySelector("#authModeToggle");
  if (form) form.addEventListener("submit", submitAuth);
  if (toggle) toggle.addEventListener("click", () => {
    authMode = isSignup ? "signin" : "signup";
    authStatus = "";
    renderAccountPanel();
  });
}

async function submitAuth(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");

  authBusy = true;
  authStatus = "";
  renderAccountPanel();

  try {
    const data = await apiRequest(authMode === "signup" ? "signup" : "login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    currentUser = data.user;
    authStatus = "";
    setAccountMenuOpen(false);
    // Refresh lists + current view now that we are authenticated
    renderDocList();
    const idx = currentView === "doc" ? currentDoc : -1;
    if (idx >= 0) {
      await loadDoc(idx);
    } else {
      renderDocsHome();
    }
  } catch (error) {
    authStatus = error.message;
  } finally {
    authBusy = false;
    renderAccountPanel();
  }
}

async function logout() {
  authBusy = true;
  renderAccountPanel();

  try {
    await apiRequest("logout", { method: "POST" });
  } catch {
    // ignore
  }

  currentUser = null;
  authBusy = false;
  renderUnauthenticatedState();
  renderAccountPanel();
}

async function loadCurrentUser() {
  try {
    const data = await apiRequest("me");
    currentUser = data.user;
    apiAvailable = true;
  } catch {
    currentUser = null;
    apiAvailable = false;
  }
  renderAccountPanel();
}

function renderUnauthenticatedState() {
  if (docList) docList.innerHTML = "";
  docMeta.textContent = "Private";
  docTitle.textContent = siteData.docsTitle || "Web Docs";
  docViewer.classList.add("doc-viewer--home");
  syncHomeUrl();

  docViewer.innerHTML = `
    <div class="home-deck-grid docs-home-grid" style="max-width: 520px; margin: 0 auto; text-align: center; padding-top: 40px;">
      <div class="slide__error" style="background: transparent; border: 0; box-shadow: none; padding: 0;">
        <p class="slide__eyebrow">Private</p>
        <h2 class="slide__title" style="font-size: clamp(1.6rem, 4vw, 2.2rem);">Sign in to continue</h2>
        <p class="slide__body" style="max-width: 36ch; margin: 0.75rem auto 0;">
          Look at the very bottom of the <strong>left sidebar</strong> — there should be an "Account" box.<br>
          <strong>Important:</strong> Open the exact URL printed by <code>npx wrangler dev</code> (usually <code>localhost:8787</code>), not the old python server port. Then refresh.
        </p>
      </div>
    </div>
  `;
}

function docIndexFromSlug(slug) {
  if (!slug || slug === "home") {
    return -1;
  }

  const index = docs.findIndex((item) => item.slug === slug);
  return index >= 0 ? index : 0;
}

function getDocBySlug(slug) {
  return docs.find((d) => d.slug === slug);
}

function isPublicItem(item) {
  return !!(item && item.public);
}

function canViewDoc(item) {
  return !!currentUser || isPublicItem(item);
}

async function loadStaticMarkdown(file) {
  if (!file) {
    return "";
  }

  try {
    const response = await fetch(file, { cache: "no-store" });
    return response.ok ? response.text() : "";
  } catch {
    return "";
  }
}

function currentSlug() {
  return window.location.hash.replace(/^#\/?/, "");
}

function syncDocUrl(doc = docs[currentDoc]) {
  window.history.replaceState(null, "", `${window.location.pathname}#${doc.slug}`);
}

function syncHomeUrl() {
  window.history.replaceState(null, "", window.location.pathname);
}

function renderDocList() {
  docList.innerHTML = docSections
    .map((section) => {
      const items = docs
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.section === section && canViewDoc(item));

      if (!items.length) {
        return "";
      }

      return `
        <li class="presentation-list__section">${escapeHtml(section)}</li>
        ${items
          .map(
            ({ item, index }) => `
              <li>
                <button class="presentation-list__item" type="button" data-doc-index="${index}" aria-current="${currentView === "doc" && index === currentDoc}">
                  <span class="presentation-list__date">${escapeHtml(item.date)}</span>
                  <span class="presentation-list__title">${escapeHtml(item.docTitle || item.title)}</span>
                </button>
              </li>
            `
          )
          .join("")}
      `;
    })
    .join("");

  docList.querySelectorAll("[data-doc-index]").forEach((button) => {
    button.addEventListener("click", () => {
      loadDoc(Number(button.dataset.docIndex));
      if (mobileMedia.matches) {
        toggleSidebar(false);
      }
    });
  });
}

function renderDocsHome() {
  currentView = "home";
  docMeta.textContent = "Markdown viewer";
  docTitle.textContent = siteData.docsTitle || "Web Docs";
  docViewer.classList.add("doc-viewer--home");
  syncHomeUrl();
  renderDocList();

  const groups = docSections
    .map((section) => ({
      section,
      items: docs
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.section === section && canViewDoc(item))
    }))
    .filter((group) => group.items.length);

  docViewer.innerHTML = `
    <div class="home-deck-grid docs-home-grid">
      ${groups
        .map(({ section, items }) => {
          const tagline = items.find(({ item }) => item.tagline)?.item.tagline || "";

          return `
            <section class="home-project-section">
              <div class="home-project-section__header">
                <h3>${escapeHtml(section)}</h3>
                ${tagline ? `<p>${escapeHtml(tagline)}</p>` : ""}
              </div>
              <div class="home-project-section__cards">
                ${items
                  .map(
                    ({ item, index }) => `
                      <button class="home-deck-card" type="button" data-doc-index="${index}">
                        <span class="home-deck-card__body">
                          <strong>${escapeHtml(item.docTitle || item.title)}</strong>
                          <span class="home-deck-card__meta">${escapeHtml(item.date)}</span>
                        </span>
                      </button>
                    `
                  )
                  .join("")}
              </div>
            </section>
          `;
        })
        .join("")}
    </div>
  `;

  docViewer.querySelectorAll("[data-doc-index]").forEach((card) => {
    card.addEventListener("click", () => loadDoc(Number(card.dataset.docIndex)));
  });
}

async function loadDoc(index = currentDoc) {
  currentView = "doc";
  currentDoc = index;
  const doc = docs[currentDoc];
  docMeta.textContent = doc.date;
  docTitle.textContent = doc.title;
  docViewer.classList.remove("doc-viewer--home");
  syncDocUrl(doc);

  const publicItem = isPublicItem(doc);

  // Logged in → use authenticated path (future-proof for any doc-specific features)
  if (currentUser && apiAvailable) {
    renderDocList();
    docViewer.innerHTML = `<p class="doc-viewer__status">Loading ${escapeHtml(doc.title)}...</p>`;

    try {
      const data = await apiRequest(`decks/${encodeURIComponent(doc.slug)}`);
      let markdown = data.baseMarkdown || data.markdown || "";

      if (!markdown && doc.file) {
        markdown = await loadStaticMarkdown(doc.file);
        if (markdown) {
          try {
            await apiRequest(`decks/${encodeURIComponent(doc.slug)}/base`, {
              method: "PUT",
              body: JSON.stringify({ markdown })
            });
          } catch {}
        }
      }

      if (!markdown) throw new Error("Content not available in storage.");
      docViewer.innerHTML = markdownToHtml(markdown);
      document.querySelector(".docs-workspace")?.scrollTo({ top: 0 });
      return;
    } catch (error) {
      docViewer.innerHTML = `<p class="doc-viewer__status">${escapeHtml(error.message)}</p>`;
      return;
    }
  }

  // Unauthenticated but this doc is public → load via public endpoint (read-only)
  if (publicItem) {
    docViewer.innerHTML = `<p class="doc-viewer__status">Loading ${escapeHtml(doc.title)}...</p>`;

    try {
      const res = await fetch(`/api/public/decks/${encodeURIComponent(doc.slug)}`);
      if (res.ok) {
        const data = await res.json();
        const markdown = data.markdown || "";
        if (markdown) {
          docViewer.innerHTML = markdownToHtml(markdown);
          document.querySelector(".docs-workspace")?.scrollTo({ top: 0 });
          return;
        }
      }
    } catch {}

    const fallback = await loadStaticMarkdown(doc.file);
    if (fallback) {
      docViewer.innerHTML = markdownToHtml(fallback);
      document.querySelector(".docs-workspace")?.scrollTo({ top: 0 });
      return;
    }

    docViewer.innerHTML = `<p class="doc-viewer__status">Public document content is not available.</p>`;
    return;
  }

  // Private document + not logged in
  docViewer.innerHTML = `
    <div class="doc-viewer__status" style="padding: 2rem 1rem;">
      <p><strong>Sign in to view this document.</strong></p>
      <p>Use the account panel in the sidebar on the left.</p>
    </div>
  `;
}

function applyTheme(theme) {
  currentTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  window.localStorage.setItem(storageKey, currentTheme);
  themeToggle.querySelector(".theme-toggle__label").textContent = currentTheme === "light" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-label", `Switch to ${currentTheme === "light" ? "dark" : "light"} theme`);
}

function toggleSidebar(force) {
  const isOpen = force ?? appShell.dataset.sidebarOpen !== "true";
  appShell.dataset.sidebarOpen = String(isOpen);
}

function scrollDocByScreen(direction) {
  const workspace = document.querySelector(".docs-workspace");
  if (!workspace) {
    return;
  }
  const step = Math.max(workspace.clientHeight - 80, 120);
  workspace.scrollBy({ top: direction * step, behavior: "smooth" });
}

const docsPrev = document.querySelector("#docsPrev");
const docsNext = document.querySelector("#docsNext");
docsPrev?.addEventListener("click", () => scrollDocByScreen(-1));
docsNext?.addEventListener("click", () => scrollDocByScreen(1));

document.addEventListener("keydown", (event) => {
  const editableTarget = event.target.closest?.("input, textarea, select, [contenteditable='true']");
  if (editableTarget) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
    event.preventDefault();
    scrollDocByScreen(1);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    scrollDocByScreen(-1);
  }
});

themeToggle.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
accountTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  setAccountMenuOpen(accountPanel?.hidden);
});
document.addEventListener("click", (event) => {
  if (accountMenu && !accountMenu.contains(event.target)) {
    setAccountMenuOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setAccountMenuOpen(false);
  }
});
docsHome.addEventListener("click", renderDocsHome);
openSidebar.addEventListener("click", () => toggleSidebar(true));
closeSidebar.addEventListener("click", () => toggleSidebar(false));
window.addEventListener("hashchange", () => {
  const index = docIndexFromSlug(currentSlug());
  if (index < 0) {
    renderDocsHome();
    return;
  }
  loadDoc(index);
});

applyTheme(currentTheme);
renderProfileLinks();
renderAccountPanel();

(async () => {
  await loadCurrentUser();
  renderAccountPanel();

  const slug = currentSlug();
  const initialDocIndex = docIndexFromSlug(slug);
  const targetDoc = initialDocIndex >= 0 ? getDocBySlug(slug) : null;
  const isPublicDoc = isPublicItem(targetDoc);

  if (currentUser && apiAvailable) {
    if (initialDocIndex < 0) {
      renderDocsHome();
    } else {
      loadDoc(initialDocIndex);
    }
  } else if (isPublicDoc && initialDocIndex >= 0) {
    // Direct link to a public document — load it read-only without showing the full list or sign-in wall
    loadDoc(initialDocIndex);
  } else if (docs.some(isPublicItem)) {
    renderDocsHome();
  } else {
    renderUnauthenticatedState();
  }
})();
