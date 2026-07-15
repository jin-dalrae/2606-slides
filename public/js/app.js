import { fontOptions, ensureFontLoaded } from "./fonts.js";
import { animatedBackgroundModes, initShaderBackground } from "./shader.js";
import { loadSiteCatalog } from "./site.js";

const { siteData, home, projectMeta, presentations, presentationSections } = loadSiteCatalog();

// GitHub edit links point at the repo path under public/.
const githubEditBase = "https://github.com/jin-dalrae/2606-slides/edit/master/public/";
const storageKeys = {
  theme: "rae-slides-theme",
  presentationSettings: "rae-slides-presentation-settings"
};

const defaultTheme = "light";

const defaultPresentationSettings = {
  transition: "slide",
  font: "lora",
  notesPosition: "right"
};

function defaultBackgroundForTheme(theme = currentTheme) {
  return theme === "dark" ? "shader" : "ivory";
}

function isThemeDefaultBackground(value) {
  return value === "ivory" || value === "shader";
}

const notesPositionOptions = new Set(["right", "below", "hidden"]);

const appShell = document.querySelector(".app-shell");
const stage = document.querySelector(".stage");
const presentationList = document.querySelector("#presentationList");
const presentationTitle = document.querySelector("#presentationTitle");
const presentationDate = document.querySelector("#presentationDate");
const slideList = document.querySelector("#slideList");
const slide = document.querySelector("#slide");
const presentationStage = document.querySelector(".presentation-stage");
const slideCounter = document.querySelector("#slideCounter");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const fullscreen = document.querySelector("#fullscreen");
const openSlideWindow = document.querySelector("#openSlideWindow");
const editDeck = document.querySelector("#editDeck");
const downloadMarkdown = document.querySelector("#downloadMarkdown");
const downloadPdf = document.querySelector("#downloadPdf");
const accountPanel = document.querySelector("#accountPanel");
const accountMenu = document.querySelector("#accountMenu");
const accountTrigger = document.querySelector("#accountTrigger");
const markdownEditor = document.querySelector("#markdownEditor");
const speakerNotes = document.querySelector("#speakerNotes");
const transitionSelect = document.querySelector("#transitionSelect");
const backgroundSelect = document.querySelector("#backgroundSelect");
const fontSelect = document.querySelector("#fontSelect");
const versionSelect = document.querySelector("#versionSelect");
const themeToggle = document.querySelector("#themeToggle");
const homeLink = document.querySelector("#homeLink");
if (homeLink) {
  const label = homeLink.querySelector(".sidebar-home-link__label");
  if (label) {
    label.textContent = siteData.slidesTitle || "Web Slides";
  }
}
const profileLinks = document.querySelector("#profileLinks");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");
const mobileMedia = window.matchMedia("(max-width: 760px)");
const urlSearchParams = new URLSearchParams(window.location.search);
const displayMode = urlSearchParams.get("display") === "slide";
const printPdfMode = urlSearchParams.has("print-pdf");
const presentationChannel = "BroadcastChannel" in window ? new BroadcastChannel("rae-slides-presentation") : null;

let currentView = "home";
let currentPresentation = 0;
let currentSlide = 0;
let currentSlideTitles = [];
let currentSlideNotes = [];
let deck = null;
let cleanupShader = null;
let pendingSlideIndex = null;
let slideWindow = null;
let suppressBroadcast = false;
let currentTheme = printPdfMode ? defaultTheme : window.localStorage.getItem(storageKeys.theme) || defaultTheme;
let currentTransition = defaultPresentationSettings.transition;
let currentBackground = defaultBackgroundForTheme(currentTheme);
let currentFont = defaultPresentationSettings.font;
let currentNotesPosition = defaultPresentationSettings.notesPosition;
let currentUser = null;
let authMode = "signin";
let authStatus = "";
let authBusy = false;
let apiAvailable = true;
let editorOpen = false;
let editorStatus = "";
let editorBusy = false;
let baseMarkdown = "";
let activeMarkdown = "";
let hasUserMarkdown = false;
let printPdfRequested = false;

function selectedPresentation() {
  return presentations[currentPresentation];
}

function isPublicItem(item) {
  return !!(item && item.public);
}

function selectedPresentationSlug() {
  return selectedPresentation().slug || String(currentPresentation + 1);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function safeFilename(value, fallback = "presentation") {
  const cleaned = String(value || fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || fallback;
}

function presentationSettingsKey(index = currentPresentation) {
  const item = presentations[index];
  const slug = item.slug || String(index + 1);
  return `${storageKeys.presentationSettings}:${slug}`;
}

function readPresentationSettings(index = currentPresentation) {
  const item = presentations[index];
  let saved = {};

  try {
    saved = JSON.parse(window.localStorage.getItem(presentationSettingsKey(index))) || {};
  } catch {
    saved = {};
  }

  const savedBackground = saved.background || "";
  const itemBackground = item.background || "";

  return {
    transition: saved.transition || item.transition || defaultPresentationSettings.transition,
    background: savedBackground && !isThemeDefaultBackground(savedBackground)
      ? savedBackground
      : itemBackground && !isThemeDefaultBackground(itemBackground)
        ? itemBackground
        : defaultBackgroundForTheme(),
    font: fontOptions[saved.font] ? saved.font : fontOptions[item.font] ? item.font : defaultPresentationSettings.font,
    notesPosition: notesPositionOptions.has(saved.notesPosition)
      ? saved.notesPosition
      : notesPositionOptions.has(item.notesPosition)
        ? item.notesPosition
        : defaultPresentationSettings.notesPosition
  };
}

function saveCurrentPresentationSettings() {
  window.localStorage.setItem(
    presentationSettingsKey(),
    JSON.stringify({
      transition: currentTransition,
      background: currentBackground,
      font: currentFont,
      notesPosition: currentNotesPosition
    })
  );
}

function applyNotesPosition() {
  currentNotesPosition = notesPositionOptions.has(currentNotesPosition)
    ? currentNotesPosition
    : defaultPresentationSettings.notesPosition;
  const notesPositionSelect = document.querySelector("#notesPositionSelect");
  if (notesPositionSelect && notesPositionSelect.value !== currentNotesPosition) {
    notesPositionSelect.value = currentNotesPosition;
  }
  if (presentationStage) {
    presentationStage.dataset.notesMode = currentNotesPosition;
  }
  renderSpeakerNotes();
  if (deck) {
    window.requestAnimationFrame(() => deck.layout());
  }
}

function loadRevealPdfStylesheet() {
  if (!printPdfMode || document.querySelector("link[data-reveal-pdf]")) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/reveal.js@5/dist/print/pdf.css";
  link.dataset.revealPdf = "true";
  document.head.append(link);
}

function applyCurrentDeckFont() {
  const deckRoot = slide.querySelector(".deck-root");
  fontSelect.value = currentFont;
  void ensureFontLoaded(currentFont);

  if (deckRoot) {
    deckRoot.style.setProperty("--font-family", fontOptions[currentFont] || fontOptions.lora);
  }
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

function userCanEdit() {
  return Boolean(currentUser && apiAvailable);
}

function currentDeckSlug() {
  return selectedPresentationSlug();
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
      <p style="font-size: 0.85rem; line-height: 1.3; color: var(--dim);">
        Backend needed for sign in. Use npx wrangler dev and the printed URL.
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
  if (form) form.addEventListener("submit", submitAuth);
  const modeToggle = accountPanel.querySelector("#authModeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      authMode = authMode === "signup" ? "signin" : "signup";
      authStatus = "";
      renderAccountPanel();
    });
  }
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
    editorStatus = "";
    renderProfileLinks();
    renderAccountPanel();
    setAccountMenuOpen(false);
    // Now that we're authenticated, show the lists and load content
    renderPresentationList();
    if (currentView === "presentation") {
      await reloadCurrentPresentationMarkdown();
    } else {
      renderHome();
    }
    preloadPresentationTitles();
  } catch (error) {
    authStatus = error.message;
  } finally {
    authBusy = false;
    renderAccountPanel();
    updateEditButtonState();
  }
}

async function logout() {
  authBusy = true;
  renderAccountPanel();

  try {
    await apiRequest("logout", { method: "POST" });
  } catch {
    // Continue client-side logout even if the session was already gone.
  }

  currentUser = null;
  authBusy = false;
  editorOpen = false;
  editorStatus = "";
  hideMarkdownEditor();
  renderAccountPanel();
  updateEditButtonState();
  renderProfileLinks();
  renderPresentationList(); // keep the decks list visible
  renderHome(); // show the home grid with your decks

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
  // The decks list in the sidebar is always visible.
  // The login form is now in the large main area.

  currentView = "home";
  stage.dataset.view = "home";
  destroyDeck();
  homeLink.removeAttribute("aria-current");

  presentationTitle.textContent = "Sign in to edit";
  presentationDate.textContent = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  openSlideWindow.disabled = true;
  editDeck.disabled = true;
  updateExportButtonState();
  transitionSelect.disabled = true;
  backgroundSelect.disabled = true;
  fontSelect.disabled = true;

  slide.classList.add("slide--home");
  slide.innerHTML = `
    <div style="max-width: 420px; margin: 40px auto; padding: 20px; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius);">
      <h2 style="margin: 0 0 12px; font-size: 1.4rem;">Sign in or create account</h2>
      <form class="account-form" id="mainLoginForm">
        <label>
          <span>ID</span>
          <input id="mainUsername" name="username" autocomplete="username" minlength="3" maxlength="32">
        </label>
        <label>
          <span>PW</span>
          <input id="mainPassword" name="password" type="password" autocomplete="current-password" minlength="8">
        </label>
        <div class="account-form__actions">
          <button class="text-button" type="submit">Sign in</button>
          <button class="text-button" id="mainCreateToggle" type="button">Create</button>
        </div>
        <p class="account-panel__message" id="mainLoginMessage" aria-live="polite"></p>
      </form>
    </div>
  `;

  const form = slide.querySelector("#mainLoginForm");
  const toggle = slide.querySelector("#mainCreateToggle");
  const message = slide.querySelector("#mainLoginMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const username = String(fd.get("username") || "").trim();
      const password = String(fd.get("password") || "");
      authBusy = true;
      if (message) message.textContent = "";
      try {
        const data = await apiRequest("login", {
          method: "POST",
          body: JSON.stringify({ username, password })
        });
        currentUser = data.user;
        renderProfileLinks();
        renderAccountPanel();
        renderHome();
      } catch (err) {
        if (message) message.textContent = err.message;
      } finally {
        authBusy = false;
      }
    });
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      // For create, we can reuse the sidebar logic or simple switch
      // Simple: change the submit to signup
      form.removeEventListener("submit", form.onsubmit); // rough
      form.onsubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const username = String(fd.get("username") || "").trim();
        const password = String(fd.get("password") || "");
        authBusy = true;
        if (message) message.textContent = "";
        try {
          const data = await apiRequest("signup", {
            method: "POST",
            body: JSON.stringify({ username, password })
          });
          currentUser = data.user;
          renderProfileLinks();
          renderAccountPanel();
          renderHome();
        } catch (err) {
          if (message) message.textContent = err.message;
        } finally {
          authBusy = false;
        }
      };
      if (message) message.textContent = "Switched to create. Fill and submit.";
    });
  }
}

function isPresentationRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const firstPart = hash.split("/").filter(Boolean)[0]?.toLowerCase();

  return Boolean(firstPart) && firstPart !== "home";
}

function presentationIndexFromSlug(slug) {
  if (!slug) {
    return 0;
  }

  const numericIndex = Number(slug);
  if (Number.isInteger(numericIndex) && numericIndex > 0) {
    return Math.min(numericIndex - 1, presentations.length - 1);
  }

  const index = presentations.findIndex((item) => item.slug === slug.toLowerCase());
  return index; // -1 when not found, so callers can show a "deck not found" state
}

function presentationTargetFromLocation() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const hashParts = hash.split("/").filter(Boolean);
  let slug = "";
  let slide = "";

  if (hashParts[0]?.toLowerCase() === "presentation") {
    slug = hashParts[1] || "";
    slide = hashParts[2] || "";
  } else {
    slug = hashParts[0] || "";
    slide = hashParts[1] || "";
  }

  if (/^\d+$/.test(slug) && !slide) {
    slide = slug;
    slug = "";
  }

  return {
    presentationIndex: presentationIndexFromSlug(slug),
    slideIndex: /^\d+$/.test(slide) ? Math.max(0, Number(slide) - 1) : 0
  };
}

function appRootPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const routeIndex = parts.lastIndexOf("presentation");

  if (routeIndex >= 0) {
    return `/${parts.slice(0, routeIndex).join("/")}`;
  }

  if (parts[parts.length - 1] === "index.html") {
    parts.pop();
  }
  return `/${parts.join("/")}`;
}

function syncPresentationUrl(slideIndex = currentSlide, replace = true) {
  if (currentView !== "presentation") {
    return;
  }

  const url = new URL(window.location.href);
  const slug = selectedPresentationSlug();

  url.pathname = appRootPath();
  url.hash = `${slug}/${slideIndex + 1}`;

  window.history[replace ? "replaceState" : "pushState"](null, "", `${url.pathname}${url.search}${url.hash}`);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderProfileLinks() {
  if (!profileLinks) {
    return;
  }

  if (currentUser) {
    profileLinks.innerHTML = `
      <span class="header-user">${escapeHtml(currentUser.username)}</span>
      <button id="headerLogout" class="text-button">Sign out</button>
    `;
    const btn = profileLinks.querySelector("#headerLogout");
    if (btn) btn.addEventListener("click", logout);
  } else {
    profileLinks.innerHTML = home.links
      .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
      .join("");
  }
}

function markdownSlideTitles(markdown) {
  return markdown
    .split(/\n---+\n/g)
    .map((part, index) => {
      const headings = [...part.matchAll(/^(#{1,3})\s+(.+)$/gm)].map((match) => ({
        level: match[1].length,
        text: match[2].trim()
      }));

      if (!headings.length) {
        return `Slide ${index + 1}`;
      }

      const first = headings[0];
      const second = headings[1];

      if (first.level === 1 && second) {
        return `${first.text}: ${second.text}`;
      }

      return first.text;
    });
}

function markdownSlideNotes(markdown) {
  return markdown.split(/\n---+\n/g).map((part) => {
    const lines = part.split("\n");
    const noteIndex = lines.findIndex((line) => /^Note:\s*/i.test(line));

    if (noteIndex < 0) {
      return "";
    }

    const firstLine = lines[noteIndex].replace(/^Note:\s*/i, "");
    return [firstLine, ...lines.slice(noteIndex + 1)].join("\n").trim();
  });
}

function speakerNoteHtml(note) {
  if (!note) {
    return "<p>No speaker note for this slide.</p>";
  }

  return note
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

function firstSlideHeaderTitle(markdown) {
  const firstSlide = markdown.split(/\n---+\n/g)[0];
  const headings = [...firstSlide.matchAll(/^(#{1,3})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim()
  }));

  if (!headings.length) {
    return null;
  }

  if (headings[0].level === 1 && headings[1]) {
    return headings[1].text;
  }

  return headings[0].text;
}

async function preloadPresentationTitles() {
  // Only resolve live titles from storage for authenticated users.
  // Unauthenticated users see the titles already provided in site-data.js.
  if (!currentUser || !apiAvailable) {
    renderPresentationList();
    return;
  }

  await Promise.all(
    presentations.map(async (item) => {
      if (item.resolvedTitle) {
        return;
      }
      try {
        const slug = item.slug || item.file;
        const data = await apiRequest(`decks/${encodeURIComponent(slug)}`);
        const md = data.baseMarkdown || data.markdown || "";
        item.resolvedTitle = firstSlideHeaderTitle(md) || item.title;
      } catch {
        item.resolvedTitle = item.title;
      }
    })
  );
  renderPresentationList();
}

async function loadMarkdown(file, { bustCache = false } = {}) {
  // Prefer normal HTTP caching for static public markdown. Only force a bypass
  // after an in-app edit (or when the caller opts in).
  const url = bustCache
    ? `${file}${file.includes("?") ? "&" : "?"}cb=${Date.now()}`
    : file;
  const response = await fetch(url, {
    cache: bustCache ? "no-store" : "default"
  });

  if (!response.ok) {
    throw new Error(`Could not load ${file}`);
  }

  return response.text();
}

async function loadDeckMarkdown(deckMeta) {
  const slug = deckMeta.slug || deckMeta.file;
  const publicItem = isPublicItem(deckMeta);

  // If logged in, always use the authenticated path (gets base + any personal overrides)
  if (currentUser && apiAvailable) {
    try {
      const data = await apiRequest(`decks/${encodeURIComponent(slug)}`);
      baseMarkdown = data.baseMarkdown || "";
      activeMarkdown = data.markdown || baseMarkdown;
      hasUserMarkdown = Boolean(data.hasOverride);

      // Transition: auto-seed from static file if base is still empty
      if (!baseMarkdown) {
        try {
          const fallback = await loadMarkdown(deckMeta.file);
          baseMarkdown = fallback;
          activeMarkdown = fallback;
          await apiRequest(`decks/${encodeURIComponent(slug)}/base`, {
            method: "PUT",
            body: JSON.stringify({ markdown: fallback })
          });
        } catch (seedErr) {
          throw new Error("No content in storage and static source unavailable.");
        }
      }

      return activeMarkdown;
    } catch (error) {
      editorStatus = error.message;
      // fall through — will throw below if not public
    }
  }

  // Unauthenticated + this item is marked public → allow read-only via public endpoint
  if (publicItem) {
    try {
      const res = await fetch(`/api/public/decks/${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Failed to load public content");
      const data = await res.json();
      baseMarkdown = data.markdown || "";
      activeMarkdown = baseMarkdown;
      hasUserMarkdown = false;

      // Optional: if still empty and static file exists, seed it (will only work if the fetch to static succeeds server-side)
      if (!baseMarkdown) {
        try {
          const fallback = await loadMarkdown(deckMeta.file);
          baseMarkdown = fallback;
          activeMarkdown = fallback;
          // Note: unauthenticated users cannot seed via /base (that route requires login)
        } catch {}
      }

      return activeMarkdown;
    } catch (err) {
      // API unreachable (e.g. static hosting / backend down) → fall back to the
      // bundled markdown file so a public deck still renders.
      try {
        const fallback = await loadMarkdown(deckMeta.file);
        if (fallback) {
          baseMarkdown = fallback;
          activeMarkdown = fallback;
          hasUserMarkdown = false;
          return activeMarkdown;
        }
      } catch {}
      baseMarkdown = "";
      activeMarkdown = "";
      hasUserMarkdown = false;
      throw new Error("This public document could not be loaded.");
    }
  }

  // Private item and not logged in → require auth
  baseMarkdown = "";
  activeMarkdown = "";
  hasUserMarkdown = false;
  throw new Error("Sign in to view this presentation.");
}

function updateEditButtonState() {
  if (currentView !== "presentation") {
    editDeck.disabled = true;
    updateExportButtonState();
    return;
  }

  editDeck.disabled = !userCanEdit();
  editDeck.textContent = editorOpen ? "Close edit" : "Edit";
  editDeck.title = userCanEdit() ? "Edit this deck on site" : "Sign in to edit this deck";
  editDeck.setAttribute("aria-label", editDeck.title);
  updateExportButtonState();
}

function updateExportButtonState() {
  const disabled = currentView !== "presentation" || !activeMarkdown;
  if (downloadMarkdown) {
    downloadMarkdown.disabled = disabled;
  }
  if (downloadPdf) {
    downloadPdf.disabled = currentView !== "presentation" || !deck;
  }
}

function hideMarkdownEditor() {
  markdownEditor.hidden = true;
  markdownEditor.innerHTML = "";
}

function renderMarkdownEditor() {
  if (!editorOpen || currentView !== "presentation") {
    hideMarkdownEditor();
    updateEditButtonState();
    return;
  }

  markdownEditor.hidden = false;
  markdownEditor.innerHTML = `
    <div class="markdown-editor__header">
      <div>
        <p class="markdown-editor__eyebrow">Markdown editor</p>
        <h3>${escapeHtml(selectedPresentation().resolvedTitle || selectedPresentation().title)}</h3>
      </div>
      <p class="markdown-editor__state">${hasUserMarkdown ? "Using your saved version" : "Editing public source copy"}</p>
    </div>
    <textarea id="markdownEditorInput" spellcheck="false" ${editorBusy ? "disabled" : ""}>${escapeHtml(activeMarkdown)}</textarea>
    <div class="markdown-editor__actions">
      <button class="text-button" id="saveMarkdown" type="button" ${editorBusy ? "disabled" : ""}>Save</button>
      <button class="text-button" id="previewMarkdown" type="button" ${editorBusy ? "disabled" : ""}>Preview</button>
      <button class="text-button" id="resetMarkdown" type="button" ${editorBusy || !hasUserMarkdown ? "disabled" : ""}>Reset</button>
      <a class="text-button markdown-editor__github" href="${githubEditBase}${selectedPresentation().file}" target="_blank" rel="noreferrer">GitHub</a>
      <span class="markdown-editor__message" aria-live="polite">${escapeHtml(editorStatus)}</span>
    </div>
  `;

  markdownEditor.querySelector("#saveMarkdown").addEventListener("click", saveMarkdown);
  markdownEditor.querySelector("#previewMarkdown").addEventListener("click", previewMarkdown);
  markdownEditor.querySelector("#resetMarkdown").addEventListener("click", resetMarkdown);
  updateEditButtonState();
}

function editorValue() {
  return markdownEditor.querySelector("#markdownEditorInput")?.value || activeMarkdown;
}

async function rerenderActiveDeck(markdown, slideIndex = currentSlide) {
  const targetSlide = Math.max(0, slideIndex);
  destroyDeck();
  currentSlideTitles = markdownSlideTitles(markdown);
  currentSlideNotes = markdownSlideNotes(markdown);
  renderDeckShell(markdown);

  deck = new Reveal(slide.querySelector(".deck-root"), {
    embedded: true,
    width: 1600,
    height: 900,
    margin: 0.02,
    // Never auto-switch to Reveal's scroll view in narrow windows: it rewraps
    // sections in .scroll-page divs, which silently breaks deck.slide() — and
    // with it the slide list, hash routing, and presenter-window sync.
    scrollActivationWidth: null,
    hash: false,
    controls: false,
    progress: true,
    center: false,
    transition: currentTransition,
    keyboard: false,
    pdfMaxPagesPerSlide: 1,
    pdfSeparateFragments: false,
    plugins: [RevealMarkdown, RevealNotes]
  });

  await deck.initialize();
  deck.layout();
  deck.on("slidechanged", (event) => {
    currentSlide = event.indexh;
    updateSlideControls();
    syncPresentationUrl(currentSlide);
  });

  currentSlide = Math.min(targetSlide, Math.max(0, currentSlideTitles.length - 1));
  deck.slide(currentSlide);
  updateSlideControls();
  syncPresentationUrl(currentSlide);
}

async function previewMarkdown() {
  activeMarkdown = editorValue();
  editorStatus = "Preview updated.";
  await rerenderActiveDeck(activeMarkdown);
  renderMarkdownEditor();
}

async function saveMarkdown() {
  if (!userCanEdit()) {
    editorStatus = "Sign in to save.";
    renderMarkdownEditor();
    return;
  }

  editorBusy = true;
  editorStatus = "Saving...";
  renderMarkdownEditor();

  try {
    activeMarkdown = editorValue();
    await apiRequest(`decks/${encodeURIComponent(currentDeckSlug())}/markdown`, {
      method: "PUT",
      body: JSON.stringify({ markdown: activeMarkdown })
    });
    hasUserMarkdown = true;
    editorStatus = "Saved.";
    await rerenderActiveDeck(activeMarkdown);
  } catch (error) {
    editorStatus = error.message;
  } finally {
    editorBusy = false;
    renderMarkdownEditor();
  }
}

async function resetMarkdown() {
  if (!userCanEdit()) {
    return;
  }

  editorBusy = true;
  editorStatus = "Resetting...";
  renderMarkdownEditor();

  try {
    await apiRequest(`decks/${encodeURIComponent(currentDeckSlug())}/markdown`, { method: "DELETE" });
    activeMarkdown = baseMarkdown;
    hasUserMarkdown = false;
    editorStatus = "Reset to public source.";
    await rerenderActiveDeck(activeMarkdown, 0);
  } catch (error) {
    editorStatus = error.message;
  } finally {
    editorBusy = false;
    renderMarkdownEditor();
  }
}

function renderPresentationList() {
  presentationList.innerHTML = "";

  presentationSections.forEach((section) => {
    const sectionItems = presentations
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => (item.section || "Other") === section);

    if (!sectionItems.length) {
      return;
    }

    const sectionLi = document.createElement("li");
    sectionLi.className = "presentation-list__section";
    sectionLi.textContent = section;
    presentationList.append(sectionLi);

    sectionItems.forEach(({ item, index }) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.className = "presentation-list__item";
      button.type = "button";
      button.setAttribute("aria-current", currentView === "presentation" && index === currentPresentation ? "true" : "false");
      button.innerHTML = `
        <span class="presentation-list__date">${escapeHtml(item.date)}</span>
        <span class="presentation-list__title">${escapeHtml(item.sidebarTitle || item.resolvedTitle || item.title)}</span>
      `;
      button.addEventListener("click", () => {
        goToPresentation(index);
        if (mobileMedia.matches) {
          toggleSidebar(false);
        }
      });

      li.append(button);
      presentationList.append(li);
    });
  });
}

function renderSlideList() {
  slideList.innerHTML = "";

  currentSlideTitles.forEach((title, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.className = "slide-list__item";
    button.type = "button";
    button.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    button.innerHTML = `
      <span class="slide-list__number">Slide ${index + 1}</span>
      <span class="slide-list__title">${escapeHtml(title)}</span>
    `;
    button.addEventListener("click", () => goToSlide(index));

    li.append(button);
    slideList.append(li);
  });
}

function syncActiveSlideListItem() {
  window.requestAnimationFrame(() => {
    const activeItem = slideList.querySelector('.slide-list__item[aria-current="true"]');

    if (!activeItem) {
      return;
    }

    const container = slideList.closest(".slide-list");
    if (!container) {
      activeItem.scrollIntoView({ block: "nearest", inline: "nearest" });
      return;
    }

    // Center the active slide within the area below the sticky header, so the
    // slides ahead stay visible.
    const header = container.querySelector(".slide-list__header");
    const headerH = header ? header.offsetHeight : 0;
    const itemRect = activeItem.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    const itemCenter = itemRect.top - contRect.top + container.scrollTop + activeItem.offsetHeight / 2;
    const target = itemCenter - headerH - (container.clientHeight - headerH) / 2;

    container.scrollTop = Math.max(0, target);
  });
}

function updateSlideControls() {
  const totalSlides = currentSlideTitles.length;
  slideCounter.textContent = totalSlides ? `${currentSlide + 1} / ${totalSlides}` : "";
  prevSlide.disabled = currentSlide === 0;
  nextSlide.disabled = currentSlide >= totalSlides - 1;
  fullscreen.disabled = false;
  openSlideWindow.disabled = false;
  updateExportButtonState();
  renderSlideList();
  syncActiveSlideListItem();
  renderSpeakerNotes();
  updatePinnedSlideRef();
  broadcastPresentationState();
  requestPdfPrintWhenReady();
}

function currentExportBaseName() {
  const item = selectedPresentation();
  return safeFilename(item.slug || item.sidebarTitle || item.resolvedTitle || item.title, "presentation");
}

function downloadCurrentMarkdown() {
  if (currentView !== "presentation" || !activeMarkdown) {
    return;
  }

  downloadFile(`${currentExportBaseName()}.md`, activeMarkdown, "text/markdown;charset=utf-8");
}

function printCurrentDeckToPdf() {
  if (currentView !== "presentation" || !deck) {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("display", "slide");
  url.searchParams.set("print-pdf", "");
  url.hash = `${currentDeckSlug()}/1`;

  const printWindow = window.open(url.toString(), "rae-slides-pdf", "popup=yes,width=1280,height=900");
  if (!printWindow) {
    window.alert("Allow pop-ups for this site, then try PDF again.");
  }
}

function requestPdfPrintWhenReady() {
  if (!printPdfMode || printPdfRequested || currentView !== "presentation" || !deck) {
    return;
  }

  printPdfRequested = true;
  document.body.dataset.printPdfMode = "true";
  window.setTimeout(() => {
    window.focus();
    window.print();
  }, 900);
}

// Mirror the current slide's right-side reference label into a single element
// pinned to the slide frame, so it stays at the top regardless of Reveal's
// vertical centering of slide content.
function updatePinnedSlideRef() {
  const pinned = slide.querySelector(".slide-ref-pinned");
  if (!pinned) {
    return;
  }

  const activeSection = slide.querySelector(".slides section.present");
  const sourceRef = activeSection?.querySelector(".slide-ref");
  const label = sourceRef?.textContent?.trim() || "";

  pinned.textContent = label;
  pinned.hidden = !label;
}

function renderSpeakerNotes() {
  if (!speakerNotes || displayMode || currentView !== "presentation") {
    if (speakerNotes) {
      speakerNotes.hidden = true;
      speakerNotes.innerHTML = "";
    }
    return;
  }

  speakerNotes.hidden = false;
  speakerNotes.innerHTML = `
    <div class="speaker-notes__header">
      <div class="speaker-notes__title">
        <p>Speaker notes</p>
        <span>Slide ${currentSlide + 1}</span>
      </div>
      <label class="select-control select-control--notes" for="notesPositionSelect">
        <span>Notes</span>
        <select id="notesPositionSelect">
          <option value="right">Right</option>
          <option value="below">Below</option>
          <option value="hidden">Hidden</option>
        </select>
      </label>
    </div>
    ${currentNotesPosition === "hidden" ? "" : `<div class="speaker-notes__body">${speakerNoteHtml(currentSlideNotes[currentSlide])}</div>`}
  `;

  const notesPositionSelect = speakerNotes.querySelector("#notesPositionSelect");
  if (notesPositionSelect) {
    notesPositionSelect.value = currentNotesPosition;
    notesPositionSelect.addEventListener("change", (event) => updateNotesPosition(event.target.value));
  }
}

function broadcastPresentationState() {
  if (!presentationChannel || suppressBroadcast || currentView !== "presentation") {
    return;
  }

  presentationChannel.postMessage({
    type: "state",
    slug: currentDeckSlug(),
    slide: currentSlide,
    theme: currentTheme,
    transition: currentTransition,
    background: currentBackground,
    font: currentFont
  });
}

function openConnectedSlideWindow() {
  if (currentView !== "presentation") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("display", "slide");
  url.hash = `${currentDeckSlug()}/${currentSlide + 1}`;
  slideWindow = window.open(url.toString(), "rae-slides-display", "popup=yes,width=1280,height=720");
  broadcastPresentationState();
}

function applyRemotePresentationState(message) {
  if (!message || message.type !== "state") {
    return;
  }

  const targetIndex = presentationIndexFromSlug(message.slug);
  currentTransition = message.transition || currentTransition;
  currentBackground = message.background || currentBackground;
  currentFont = fontOptions[message.font] ? message.font : currentFont;

  suppressBroadcast = true;

  if (message.theme && message.theme !== currentTheme) {
    applyTheme(message.theme);
  }

  transitionSelect.value = currentTransition;
  backgroundSelect.value = currentBackground;
  fontSelect.value = currentFont;

  if (deck) {
    deck.configure({ transition: currentTransition });
  }

  const deckRoot = slide.querySelector(".deck-root");
  if (deckRoot) {
    deckRoot.dataset.backgroundMode = currentBackground;
  }
  applyCurrentDeckFont();

  if (currentView !== "presentation" || targetIndex !== currentPresentation) {
    goToPresentation(targetIndex, message.slide || 0);
    suppressBroadcast = false;
    return;
  }

  if (Number.isInteger(message.slide) && message.slide !== currentSlide) {
    goToSlide(message.slide);
  }

  suppressBroadcast = false;
}

function restartShaderBackground() {
  const canvas = slide.querySelector(".slide-shader");

  if (cleanupShader) {
    cleanupShader();
    cleanupShader = null;
  }

  if (!canvas || !animatedBackgroundModes.has(currentBackground) || printPdfMode) {
    return;
  }

  cleanupShader = initShaderBackground(canvas, currentTheme, currentBackground, { printPdfMode });
}

function sizeFullscreenSlide() {
  if (deck) {
    window.requestAnimationFrame(() => deck.layout());
  }
}

function destroyDeck() {
  if (cleanupShader) {
    cleanupShader();
    cleanupShader = null;
  }

  if (deck && typeof deck.destroy === "function") {
    deck.destroy();
  }

  deck = null;
}

async function renderHome() {
  currentView = "home";
  stage.dataset.view = "home";
  destroyDeck();
  homeLink.setAttribute("aria-current", "page");

  presentationTitle.textContent = home.title;
  presentationDate.textContent = "";
  slideCounter.textContent = "";
  slideList.innerHTML = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  openSlideWindow.disabled = true;
  editDeck.disabled = true;
  updateExportButtonState();
  transitionSelect.disabled = true;
  backgroundSelect.disabled = true;
  fontSelect.disabled = true;
  editorOpen = false;
  hideMarkdownEditor();
  renderSpeakerNotes();
  updateEditButtonState();

  slide.classList.add("slide--home");
  slide.innerHTML = `
    <div class="home-deck-grid" id="homeDeckGrid"></div>
  `;

  renderPresentationList();

  const deckGrid = document.querySelector("#homeDeckGrid");
  const groups = presentationSections
    .map((section) => ({
      section,
      items: presentations.map((item, index) => ({ item, index })).filter(({ item }) => item.section === section)
    }))
    .filter((group) => group.items.length);

  deckGrid.innerHTML = groups
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
                  <button class="home-deck-card" type="button" data-presentation-index="${index}">
                    <span class="home-deck-card__body">
                      <strong>${escapeHtml(item.docTitle || item.sidebarTitle || item.title)}</strong>
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
    .join("");

  deckGrid.querySelectorAll("[data-presentation-index]").forEach((card) => {
    card.addEventListener("click", () => goToPresentation(Number(card.dataset.presentationIndex)));
  });
}

// Reveal's markdown plugin only pulls a slide's "Note:" into speaker notes when
// the slide contains exactly one Note: block; with two or more it gives up and
// the note text leaks onto the slide. Collapse any extra Note: blocks per slide
// into the first one so notes always parse — regardless of where the markdown
// came from (bundled file or a stale stored copy).
function normalizeDeckNotes(markdown) {
  let noteSeen = false;
  return String(markdown)
    .split("\n")
    .map((line) => {
      if (/^---\s*$/.test(line)) {
        noteSeen = false;
        return line;
      }
      if (/^Note:/.test(line)) {
        if (noteSeen) {
          return line.replace(/^Note:\s?/, "");
        }
        noteSeen = true;
      }
      return line;
    })
    .join("\n");
}

function renderDeckShell(markdown) {
  slide.classList.remove("slide--home");
  slide.innerHTML = `
    <div class="reveal deck-root" data-background-mode="${currentBackground}">
      <canvas class="slide-shader" aria-hidden="true"></canvas>
      <div class="slides">
        <!-- Inside .slides so it shares Reveal's transform scale: sized in
             canvas rems, it stays proportional at every slide size. -->
        <p class="slide-ref-pinned" aria-hidden="true" hidden></p>
        <section
          data-markdown
          data-separator="^---$"
          data-separator-vertical="^--$"
          data-separator-notes="^Note:"
        >
          <textarea data-template>${escapeHtml(normalizeDeckNotes(markdown))}</textarea>
        </section>
      </div>
    </div>
  `;

  applyCurrentDeckFont();
  restartShaderBackground();
}

// Defer off-screen slide images so opening a long deck (e.g. case study) does
// not download every asset up front. First horizontal slide keeps eager load.
function optimizeDeckMedia() {
  const root = slide.querySelector(".deck-root");
  if (!root) {
    return;
  }

  const horizontal = root.querySelectorAll(".slides > section");
  horizontal.forEach((section, index) => {
    section.querySelectorAll("img").forEach((img) => {
      img.decoding = "async";
      if (index === 0) {
        img.loading = "eager";
        img.fetchPriority = "high";
      } else {
        img.loading = "lazy";
      }
    });
  });
}

async function renderPresentation() {
  currentView = "presentation";
  stage.dataset.view = "presentation";
  destroyDeck();
  hideMarkdownEditor();
  homeLink.removeAttribute("aria-current");
  activeMarkdown = "";
  updateExportButtonState();

  const deckMeta = selectedPresentation();
  const deckSettings = readPresentationSettings();
  currentTransition = deckSettings.transition;
  currentBackground = printPdfMode ? "plain" : deckSettings.background;
  currentFont = deckSettings.font;
  currentNotesPosition = deckSettings.notesPosition;
  transitionSelect.value = currentTransition;
  backgroundSelect.value = currentBackground;
  fontSelect.value = currentFont;
  applyNotesPosition();
  presentationTitle.textContent = deckMeta.docTitle || deckMeta.sidebarTitle || deckMeta.title;
  presentationDate.textContent = deckMeta.date;
  slideCounter.textContent = "Loading";
  slideList.innerHTML = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  editDeck.disabled = !userCanEdit();
  transitionSelect.disabled = false;
  backgroundSelect.disabled = false;
  fontSelect.disabled = false;
  versionSelect.disabled = true; // disable until versions load
  renderPresentationList();

  try {
    const markdown = await loadDeckMarkdown(deckMeta);

    // Fetch versions to populate the dropdown. Use the public endpoint when not
    // signed in so public decks still expose their version history.
    try {
      const versionSlug = encodeURIComponent(deckMeta.slug || deckMeta.file);
      const versionsPath = userCanEdit()
        ? `decks/${versionSlug}/versions`
        : `public/decks/${versionSlug}/versions`;
      const versionsData = await apiRequest(versionsPath);
      populateVersionSelect(versionsData.versions || []);
    } catch (e) {
      // Ignore version fetch errors for unauthenticated or unavailable API
      versionSelect.innerHTML = `<option value="latest">Latest</option>`;
      versionSelect.disabled = true;
    }

    currentSlideTitles = markdownSlideTitles(markdown);
    currentSlideNotes = markdownSlideNotes(markdown);
    deckMeta.resolvedTitle = firstSlideHeaderTitle(markdown) || deckMeta.title;
    // The header is the curated chrome label (e.g. "Research direction" vs
    // "Research proposal") so two decks that open with the same H1/H2 don't show
    // identical headers. The deck's own title slide still shows its real title.
    presentationTitle.textContent =
      deckMeta.docTitle || deckMeta.sidebarTitle || deckMeta.resolvedTitle || deckMeta.title;
    renderPresentationList();
    currentSlide = 0;
    // Ensure the deck's configured face is ready before first paint/layout.
    await ensureFontLoaded(currentFont);
    renderDeckShell(markdown);

    if (!window.Reveal || !window.RevealMarkdown) {
      throw new Error("Reveal.js did not load. Check your internet connection.");
    }

    deck = new Reveal(slide.querySelector(".deck-root"), {
      embedded: true,
      width: 1600,
      height: 900,
      margin: 0.02,
      // Never auto-switch to Reveal's scroll view in narrow windows: it rewraps
      // sections in .scroll-page divs, which silently breaks deck.slide() — and
      // with it the slide list, hash routing, and presenter-window sync.
      scrollActivationWidth: null,
      hash: false,
      controls: false,
      progress: true,
      center: false,
      transition: currentTransition,
      keyboard: false,
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: false,
      plugins: [RevealMarkdown, RevealNotes]
    });

    await deck.initialize();
    optimizeDeckMedia();
    deck.layout();
    deck.on("slidechanged", (event) => {
      currentSlide = event.indexh;
      updateSlideControls();
      syncPresentationUrl(currentSlide);
    });

    if (Number.isInteger(pendingSlideIndex)) {
      currentSlide = Math.max(0, Math.min(pendingSlideIndex, currentSlideTitles.length - 1));
      deck.slide(currentSlide);
      pendingSlideIndex = null;
    }

    updateSlideControls();
    syncPresentationUrl(currentSlide);
    renderMarkdownEditor();
  } catch (error) {
    currentSlideTitles = [];
    currentSlideNotes = [];
    activeMarkdown = "";
    slide.classList.remove("slide--home");

    const isAuthError = /sign in/i.test(error.message || "");
    slide.innerHTML = `
      <div class="slide__error">
        <p class="slide__eyebrow">Deck unavailable</p>
        <h2 class="slide__title">${isAuthError ? "Sign in required" : "Could not load this presentation."}</h2>
        <p class="slide__body">${escapeHtml(error.message)}</p>
        ${isAuthError ? `<p class="slide__body" style="margin-top: 0.5rem; font-size: 0.95em;">Use the account panel in the sidebar to sign in or create an account.</p>` : ""}
      </div>
    `;
    updateSlideControls();
    fullscreen.disabled = true;
    openSlideWindow.disabled = true;
    updateExportButtonState();
    updateEditButtonState();
  }
}

async function reloadCurrentPresentationMarkdown() {
  if (currentView !== "presentation") {
    return;
  }

  const keepEditorOpen = editorOpen && userCanEdit();
  editorOpen = keepEditorOpen;
  await renderPresentation();
}

function updateTransition(value) {
  currentTransition = value;
  saveCurrentPresentationSettings();

  if (!deck) {
    return;
  }

  deck.configure({
    transition: currentTransition
  });
  broadcastPresentationState();
}

function updateBackground(value) {
  currentBackground = value;
  saveCurrentPresentationSettings();

  const deckRoot = slide.querySelector(".deck-root");
  if (deckRoot) {
    deckRoot.dataset.backgroundMode = currentBackground;
  }
  restartShaderBackground();
  broadcastPresentationState();
}

async function updateFont(value) {
  currentFont = fontOptions[value] ? value : "lora";
  saveCurrentPresentationSettings();
  await ensureFontLoaded(currentFont);
  applyCurrentDeckFont();

  if (deck) {
    // Wait a frame after the stylesheet lands so metrics settle before re-layout.
    window.requestAnimationFrame(() => deck.layout());
  }
  broadcastPresentationState();
}

function updateNotesPosition(value) {
  currentNotesPosition = notesPositionOptions.has(value) ? value : defaultPresentationSettings.notesPosition;
  saveCurrentPresentationSettings();
  applyNotesPosition();
}

// The site theme belongs to the user (theme toggle), never to a deck: opening
// a deck must not restyle the chrome. Deck appearance is governed by its
// Background mode — theme-aware modes follow the site theme; identity modes
// (cloudflare, ivory, gray) are fixed regardless of it.
function setActiveTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  themeToggle.querySelector(".theme-toggle__label").textContent = currentTheme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute(
    "aria-label",
    currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

function applyTheme(theme) {
  const previousDefaultBackground = defaultBackgroundForTheme(currentTheme);
  setActiveTheme(theme);
  if (currentBackground === previousDefaultBackground) {
    currentBackground = defaultBackgroundForTheme(currentTheme);
    backgroundSelect.value = currentBackground;
    const deckRoot = slide.querySelector(".deck-root");
    if (deckRoot) {
      deckRoot.dataset.backgroundMode = currentBackground;
    }
  }
  if (!printPdfMode) {
    window.localStorage.setItem(storageKeys.theme, currentTheme);
  }
  restartShaderBackground();
  if (!printPdfMode) {
    broadcastPresentationState();
  }
}

function showHome() {
  window.history.pushState(null, "", appRootPath() || "/");
  if (mobileMedia.matches) {
    toggleSidebar(false);
  }
  renderHome();
}

function goToPresentation(index, slideIndex = 0) {
  // An unrecognized slug resolves to -1: show a clear "not found" state instead
  // of silently loading the newest deck and rewriting the URL to it.
  if (!Number.isInteger(index) || index < 0 || index >= presentations.length) {
    renderPresentationNotFound();
    return;
  }
  currentPresentation = index;
  pendingSlideIndex = Math.max(0, slideIndex);
  renderPresentation();
}

function renderPresentationNotFound() {
  currentView = "presentation";
  stage.dataset.view = "presentation";
  destroyDeck();
  hideMarkdownEditor();
  homeLink.removeAttribute("aria-current");
  currentSlideTitles = [];
  currentSlideNotes = [];
  activeMarkdown = "";
  slide.classList.remove("slide--home");

  const requested = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean)[0] || "";
  presentationTitle.textContent = "Not found";
  presentationDate.textContent = "";
  slideCounter.textContent = "";
  slideList.innerHTML = "";
  slide.innerHTML = `
    <div class="slide__error">
      <p class="slide__eyebrow">Deck not found</p>
      <h2 class="slide__title">No deck matches &ldquo;${escapeHtml(requested)}&rdquo;.</h2>
      <p class="slide__body">This link may be out of date. Pick a deck from the list on the left, or return home.</p>
      <p class="slide__body" style="margin-top: 0.75rem;"><button class="text-button" id="notFoundHome" type="button">Go to home</button></p>
    </div>
  `;
  slide.querySelector("#notFoundHome")?.addEventListener("click", showHome);

  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  openSlideWindow.disabled = true;
  editDeck.disabled = true;
  updateExportButtonState();
  transitionSelect.disabled = true;
  backgroundSelect.disabled = true;
  fontSelect.disabled = true;
  versionSelect.disabled = true;
  // Note: we deliberately do NOT call syncPresentationUrl here, so the bad hash
  // is left as-is rather than masqueraded as a valid deck.
  renderPresentationList();
}

function goToSlide(index) {
  if (currentView !== "presentation" || !deck) {
    return;
  }

  currentSlide = Math.max(0, Math.min(index, currentSlideTitles.length - 1));
  deck.slide(currentSlide);
  updateSlideControls();
}

function goToPreviousSlide() {
  if (currentView !== "presentation" || !deck) {
    return;
  }

  deck.prev();
}

function goToNextSlide() {
  if (currentView !== "presentation" || !deck) {
    return;
  }

  deck.next();
}

function toggleSidebar(open) {
  appShell.dataset.sidebarOpen = String(open);
}

function syncSidebarForViewport() {
  toggleSidebar(!mobileMedia.matches);
}

async function toggleFullscreen() {
  if (currentView !== "presentation") {
    return;
  }

  if (!document.fullscreenElement) {
    await presentationStage.requestFullscreen();
    sizeFullscreenSlide();
    return;
  }

  await document.exitFullscreen();
}

prevSlide.addEventListener("click", goToPreviousSlide);
nextSlide.addEventListener("click", goToNextSlide);
openSlideWindow.addEventListener("click", openConnectedSlideWindow);
fullscreen.addEventListener("click", toggleFullscreen);
downloadMarkdown.addEventListener("click", downloadCurrentMarkdown);
downloadPdf.addEventListener("click", printCurrentDeckToPdf);
transitionSelect.addEventListener("change", (event) => updateTransition(event.target.value));
backgroundSelect.addEventListener("change", (event) => updateBackground(event.target.value));
fontSelect.addEventListener("change", (event) => updateFont(event.target.value));
versionSelect.addEventListener("change", (event) => loadSpecificVersion(event.target.value));

function populateVersionSelect(versions) {
  versionSelect.innerHTML = `<option value="latest">Latest</option>`;
  for (const v of versions) {
    const dateStr = new Date(v.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    const label = v.user_id ? `Saved Edit - ${dateStr}` : `Base - ${dateStr}`;
    versionSelect.innerHTML += `<option value="${escapeHtml(v.id)}">${escapeHtml(label)}</option>`;
  }
  versionSelect.value = "latest";
  versionSelect.disabled = false;
}

async function loadSpecificVersion(versionId) {
  if (currentView !== "presentation") return;
  
  const deckMeta = selectedPresentation();
  const slug = deckMeta.slug || deckMeta.file;
  
  if (versionId === "latest") {
    // Reload the latest active markdown
    activeMarkdown = await loadDeckMarkdown(deckMeta);
  } else {
    try {
      const verSlug = encodeURIComponent(slug);
      const verPath = userCanEdit()
        ? `decks/${verSlug}/versions/${encodeURIComponent(versionId)}`
        : `public/decks/${verSlug}/versions/${encodeURIComponent(versionId)}`;
      const data = await apiRequest(verPath);
      activeMarkdown = data.markdown;
    } catch (e) {
      editorStatus = "Could not load version: " + e.message;
      renderMarkdownEditor();
      return;
    }
  }

  // Re-render
  rerenderActiveDeck(activeMarkdown, currentSlide);
  renderMarkdownEditor();
}

editDeck.addEventListener("click", () => {
  if (currentView !== "presentation") {
    return;
  }

  if (!userCanEdit()) {
    editorStatus = "Sign in to edit.";
    updateEditButtonState();
    return;
  }

  editorOpen = !editorOpen;
  editorStatus = "";
  renderMarkdownEditor();
});
openSidebar.addEventListener("click", () => toggleSidebar(true));
closeSidebar.addEventListener("click", () => toggleSidebar(false));

const presentationWorkspace = document.querySelector(".presentation-workspace");
const hideSlideList = document.querySelector("#hideSlideList");
const showSlideList = document.querySelector("#showSlideList");
hideSlideList?.addEventListener("click", () => {
  if (presentationWorkspace) presentationWorkspace.dataset.slidelistOpen = "false";
});
showSlideList?.addEventListener("click", () => {
  if (presentationWorkspace) presentationWorkspace.dataset.slidelistOpen = "true";
});
homeLink.addEventListener("click", showHome);
themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

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

  if (currentView !== "presentation") {
    return;
  }

  const editableTarget = event.target.closest?.("input, textarea, select, [contenteditable='true']");
  if (editableTarget) {
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    goToPreviousSlide();
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
    event.preventDefault();
    goToNextSlide();
  }

  if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  presentationStage.classList.toggle("presentation-stage--fullscreen", document.fullscreenElement === presentationStage);
  sizeFullscreenSlide();
  if (deck) {
    window.requestAnimationFrame(() => deck.layout());
  }
});

window.addEventListener("resize", () => {
  sizeFullscreenSlide();
  if (deck) {
    window.requestAnimationFrame(() => deck.layout());
  }
});

mobileMedia.addEventListener("change", syncSidebarForViewport);

if (presentationChannel) {
  presentationChannel.addEventListener("message", (event) => applyRemotePresentationState(event.data));
}

window.addEventListener("hashchange", () => {
  if (!isPresentationRoute()) {
    return;
  }

  const target = presentationTargetFromLocation();
  if (currentView !== "presentation") {
    goToPresentation(target.presentationIndex, target.slideIndex);
    return;
  }

  if (target.presentationIndex !== currentPresentation) {
    goToPresentation(target.presentationIndex, target.slideIndex);
    return;
  }

  goToSlide(target.slideIndex);
});

async function initApp() {
  if (displayMode) {
    document.body.dataset.displayMode = "slide";
  }
  if (printPdfMode) {
    document.body.dataset.printPdfMode = "true";
    loadRevealPdfStylesheet();
  }

  syncSidebarForViewport();
  renderProfileLinks();
  applyTheme(currentTheme);
  renderAccountPanel();
  await loadCurrentUser();

  // Always render the list of decks and the home grid so you can see your decks
  // without having to log in first. Private deck content will show a sign-in
  // prompt in the main area; public ones load fully.
  renderPresentationList();
  if (isPresentationRoute()) {
    const target = presentationTargetFromLocation();
    goToPresentation(target.presentationIndex, target.slideIndex);
  } else {
    renderHome();
  }
  if (currentUser && apiAvailable) {
    preloadPresentationTitles();
  }
}

initApp();
