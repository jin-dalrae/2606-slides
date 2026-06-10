const siteData = window.RJ_SITE || {};
const home = {
  title: siteData.slidesTitle || "Web Slides",
  date: "Home",
  links: siteData.profileLinks || []
};

const projectMeta = siteData.projects || [];
const presentations = (siteData.slides || []).map((item) => ({
  ...item,
  section: item.section || item.project || "Other",
  tagline: item.tagline || projectMeta.find((project) => project.name === (item.section || item.project))?.tagline || ""
}));

presentations.sort((a, b) => new Date(b.date) - new Date(a.date));

const presentationSections = projectMeta.map((project) => project.name).filter((name) => name !== "Reference");

const githubEditBase = "https://github.com/jin-dalrae/2606-slides/edit/master/";
const storageKeys = {
  theme: "rae-slides-theme",
  presentationSettings: "rae-slides-presentation-settings"
};

const defaultPresentationSettings = {
  transition: "slide",
  background: "shader",
  font: "lora",
  theme: "light"
};

const fontOptions = {
  lora: '"Lora", ui-serif, Georgia, serif',
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  playfair: '"Playfair Display", ui-serif, Georgia, serif',
  merriweather: '"Merriweather", ui-serif, Georgia, serif',
  montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  poppins: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  "noto-sans": '"Noto Sans", ui-sans-serif, system-ui, sans-serif',
  "source-serif": '"Source Serif 4", ui-serif, Georgia, serif'
};

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
const accountPanel = document.querySelector("#accountPanel");
const markdownEditor = document.querySelector("#markdownEditor");
const speakerNotes = document.querySelector("#speakerNotes");
const transitionSelect = document.querySelector("#transitionSelect");
const backgroundSelect = document.querySelector("#backgroundSelect");
const fontSelect = document.querySelector("#fontSelect");
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
const displayMode = new URLSearchParams(window.location.search).get("display") === "slide";
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
let currentTheme = window.localStorage.getItem(storageKeys.theme) || "light";
let currentTransition = defaultPresentationSettings.transition;
let currentBackground = defaultPresentationSettings.background;
let currentFont = defaultPresentationSettings.font;
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

function selectedPresentation() {
  return presentations[currentPresentation];
}

function isPublicItem(item) {
  return !!(item && item.public);
}

function selectedPresentationSlug() {
  return selectedPresentation().slug || String(currentPresentation + 1);
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

  return {
    transition: saved.transition || item.transition || defaultPresentationSettings.transition,
    background: saved.background || item.background || defaultPresentationSettings.background,
    font: fontOptions[saved.font] ? saved.font : fontOptions[item.font] ? item.font : defaultPresentationSettings.font,
    theme: saved.theme || globalDefaultTheme() || defaultPresentationSettings.theme
  };
}

function saveCurrentPresentationSettings() {
  window.localStorage.setItem(
    presentationSettingsKey(),
    JSON.stringify({
      transition: currentTransition,
      background: currentBackground,
      font: currentFont,
      theme: currentTheme
    })
  );
}

function applyCurrentDeckFont() {
  const deckRoot = slide.querySelector(".deck-root");
  fontSelect.value = currentFont;

  if (deckRoot) {
    deckRoot.style.setProperty("--font-family", fontOptions[currentFont]);
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

function renderAccountPanel() {
  if (!accountPanel) {
    return;
  }

  accountPanel.hidden = false;

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

  // When not logged in, the main login form is in the large area.
  // Sidebar shows a small note.
  accountPanel.innerHTML = `
    <p class="account-panel__label">Account</p>
    <p style="font-size: 0.85rem; line-height: 1.3; color: var(--dim);">
      Use the login form in the main area.
    </p>
  `;
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
  return index >= 0 ? index : 0;
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

async function loadMarkdown(file) {
  const response = await fetch(file, { cache: "no-store" });

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
    return;
  }

  editDeck.disabled = !userCanEdit();
  editDeck.textContent = editorOpen ? "Close edit" : "Edit";
  editDeck.title = userCanEdit() ? "Edit this deck on site" : "Sign in to edit this deck";
  editDeck.setAttribute("aria-label", editDeck.title);
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
    hash: false,
    controls: false,
    progress: true,
    center: true,
    transition: currentTransition,
    keyboard: false,
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

    activeItem.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    });
  });
}

function updateSlideControls() {
  const totalSlides = currentSlideTitles.length;
  slideCounter.textContent = totalSlides ? `${currentSlide + 1} / ${totalSlides}` : "";
  prevSlide.disabled = currentSlide === 0;
  nextSlide.disabled = currentSlide >= totalSlides - 1;
  fullscreen.disabled = false;
  openSlideWindow.disabled = false;
  renderSlideList();
  syncActiveSlideListItem();
  renderSpeakerNotes();
  broadcastPresentationState();
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
      <p>Speaker notes</p>
      <span>Slide ${currentSlide + 1}</span>
    </div>
    <div class="speaker-notes__body">${speakerNoteHtml(currentSlideNotes[currentSlide])}</div>
  `;
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

function shaderFragmentMain(variant) {
  if (variant === "waves") {
    return `
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
        float t = uTime*0.18;
        vec2 m = (uMouse - 0.5*uRes)/uRes.y;
        float md = exp(-2.2*length(uv-m));
        vec3 col = ink;
        for(int i=0;i<4;i++){
          float fi = float(i);
          float y = uv.y
            + 0.18*sin(uv.x*2.2 + t + fi*1.7)
            + 0.10*sin(uv.x*4.5 - t*1.3 + fi)
            + 0.05*md;
          float band = exp(-26.0*y*y);
          vec3 c = mix(cyan, lime, fract(fi*0.37 + t*0.12));
          col += c * band * 0.6;
        }
        col += lime * md * 0.22;
        float vig = smoothstep(1.3, 0.15, length(uv));
        col *= mix(VIGLOW, 1.0, vig);
        col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
  }

  if (variant === "plasma") {
    return `
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
        float t = uTime*0.25;
        vec2 m = (uMouse - 0.5*uRes)/uRes.y;
        float md = exp(-2.5*length(uv-m));
        float v = 0.0;
        v += sin(uv.x*3.0 + t);
        v += sin((uv.y*3.0 + t)*1.2);
        v += sin((uv.x+uv.y)*2.5 + t*0.8);
        v += sin(length(uv*4.0 - m*2.0) - t*1.4 + md*3.0);
        v *= 0.25;
        vec3 col = ink;
        col = mix(col, cyan, 0.5 + 0.5*sin(v*3.14159));
        col = mix(col, lime, 0.5 + 0.5*cos(v*3.14159 + 1.5));
        col = mix(ink, col, 0.62 + 0.2*md);
        float vig = smoothstep(1.3, 0.2, length(uv));
        col *= mix(VIGLOW, 1.0, vig);
        col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
  }

  return `
    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
      float t = uTime*0.07;
      vec2 q = uv*1.3;
      q += 0.32*vec2(fbm(q+t), fbm(q-t+5.2));
      float n = fbm(q*1.6 + t);
      vec2 m = (uMouse - 0.5*uRes)/uRes.y;
      float md = exp(-2.5*length(uv-m));
      n += 0.22*md;
      vec3 col = ink;
      col = mix(col, cyan*0.55, smoothstep(0.35, 0.75, n));
      col = mix(col, lime*0.85, smoothstep(0.62, 0.92, n+0.08*md));
      float vig = smoothstep(1.25, 0.2, length(uv));
      col *= mix(VIGLOW, 1.0, vig);
      col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
      gl_FragColor = vec4(col, 1.0);
    }
  `;
}

function initShaderBackground(canvas, theme = "dark", variant = "shader") {
  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });

  if (!gl) {
    return () => {};
  }

  const cloudflare = variant === "cloudflare";

  const palette = cloudflare
    ? theme === "light"
      ? {
          ink: "vec3(0.995, 0.975, 0.955)",
          cyan: "vec3(0.96, 0.51, 0.12)",
          lime: "vec3(0.99, 0.78, 0.36)",
          vignetteLow: "0.97",
          grain: "0.01"
        }
      : {
          ink: "vec3(0.10, 0.055, 0.025)",
          cyan: "vec3(0.97, 0.51, 0.12)",
          lime: "vec3(0.99, 0.74, 0.28)",
          vignetteLow: "0.42",
          grain: "0.04"
        }
    : theme === "light"
      ? {
          ink: "vec3(0.985, 0.955, 0.965)",
          cyan: "vec3(0.58, 0.28, 0.38)",
          lime: "vec3(1.0, 0.82, 0.88)",
          vignetteLow: "0.98",
          grain: "0.008"
        }
      : {
          ink: "vec3(0.045, 0.055, 0.10)",
          cyan: "vec3(0.20, 0.75, 0.95)",
          lime: "vec3(0.70, 0.98, 0.35)",
          vignetteLow: "0.5",
          grain: "0.04"
        };

  const vert = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }";
  const frag = `
    precision highp float;
    uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
    #define INK ${palette.ink}
    #define CYAN ${palette.cyan}
    #define LIME ${palette.lime}
    #define VIGLOW ${palette.vignetteLow}
    #define GRAIN ${palette.grain}
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
      vec2 u=f*f*(3.-2.*f);
      return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
    }
    float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
    vec3 ink = INK; vec3 cyan = CYAN; vec3 lime = LIME;
    ${shaderFragmentMain(variant)}
  `;

  function compile(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uMouse = gl.getUniformLocation(prog, "uMouse");
  const mouse = { x: 0, y: 0 };

  function onMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) * window.devicePixelRatio;
    mouse.y = (rect.height - (event.clientY - rect.top)) * window.devicePixelRatio;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("resize", resize);
  resize();

  let raf = 0;
  const start = performance.now();

  function loop() {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    raf = window.requestAnimationFrame(loop);
  }

  loop();

  return () => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("resize", resize);
  };
}

function restartShaderBackground() {
  const canvas = slide.querySelector(".slide-shader");

  if (!canvas) {
    return;
  }

  if (cleanupShader) {
    cleanupShader();
  }

  cleanupShader = initShaderBackground(canvas, currentTheme, currentBackground);
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
  setActiveTheme(globalDefaultTheme());
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

function renderDeckShell(markdown) {
  slide.classList.remove("slide--home");
  slide.innerHTML = `
    <div class="reveal deck-root" data-background-mode="${currentBackground}">
      <canvas class="slide-shader" aria-hidden="true"></canvas>
      <div class="slides">
        <section
          data-markdown
          data-separator="^---$"
          data-separator-vertical="^--$"
          data-separator-notes="^Note:"
        >
          <textarea data-template>${escapeHtml(markdown)}</textarea>
        </section>
      </div>
    </div>
  `;

  applyCurrentDeckFont();
  restartShaderBackground();
}

async function renderPresentation() {
  currentView = "presentation";
  stage.dataset.view = "presentation";
  destroyDeck();
  hideMarkdownEditor();
  homeLink.removeAttribute("aria-current");

  const deckMeta = selectedPresentation();
  const deckSettings = readPresentationSettings();
  currentTransition = deckSettings.transition;
  currentBackground = deckSettings.background;
  currentFont = deckSettings.font;
  setActiveTheme(deckSettings.theme);
  transitionSelect.value = currentTransition;
  backgroundSelect.value = currentBackground;
  fontSelect.value = currentFont;
  presentationTitle.textContent = deckMeta.title;
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
  renderPresentationList();

  try {
    const markdown = await loadDeckMarkdown(deckMeta);
    currentSlideTitles = markdownSlideTitles(markdown);
    currentSlideNotes = markdownSlideNotes(markdown);
    deckMeta.resolvedTitle = firstSlideHeaderTitle(markdown) || deckMeta.title;
    presentationTitle.textContent = deckMeta.resolvedTitle;
    renderPresentationList();
    currentSlide = 0;
    renderDeckShell(markdown);

    if (!window.Reveal || !window.RevealMarkdown) {
      throw new Error("Reveal.js did not load. Check your internet connection.");
    }

    deck = new Reveal(slide.querySelector(".deck-root"), {
      embedded: true,
      width: 1600,
      height: 900,
      margin: 0.02,
      hash: false,
      controls: false,
      progress: true,
      center: true,
      transition: currentTransition,
      keyboard: false,
      plugins: [RevealMarkdown, RevealNotes]
    });

    await deck.initialize();
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

function updateFont(value) {
  currentFont = fontOptions[value] ? value : "lora";
  saveCurrentPresentationSettings();
  applyCurrentDeckFont();

  if (deck) {
    window.requestAnimationFrame(() => deck.layout());
  }
  broadcastPresentationState();
}

// Set the visible theme (document attr + toggle label) WITHOUT persisting it as
// the global default. Used when opening a deck (so a deck's own theme doesn't
// overwrite the site default) and when returning home (restore the default).
function setActiveTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  themeToggle.querySelector(".theme-toggle__label").textContent = currentTheme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute(
    "aria-label",
    currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

function globalDefaultTheme() {
  return window.localStorage.getItem(storageKeys.theme) || defaultPresentationSettings.theme;
}

function applyTheme(theme) {
  setActiveTheme(theme);
  window.localStorage.setItem(storageKeys.theme, currentTheme);
  if (currentView === "presentation") {
    saveCurrentPresentationSettings();
  }
  restartShaderBackground();
  broadcastPresentationState();
}

function showHome() {
  window.history.pushState(null, "", appRootPath() || "/");
  if (mobileMedia.matches) {
    toggleSidebar(false);
  }
  renderHome();
}

function goToPresentation(index, slideIndex = 0) {
  currentPresentation = Math.max(0, Math.min(index, presentations.length - 1));
  pendingSlideIndex = Math.max(0, slideIndex);
  renderPresentation();
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
transitionSelect.addEventListener("change", (event) => updateTransition(event.target.value));
backgroundSelect.addEventListener("change", (event) => updateBackground(event.target.value));
fontSelect.addEventListener("change", (event) => updateFont(event.target.value));
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
homeLink.addEventListener("click", showHome);
themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

document.addEventListener("keydown", (event) => {
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
