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
const profileLinks = document.querySelector("#profileLinks");
const themeToggle = document.querySelector("#themeToggle");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");
const mobileMedia = window.matchMedia("(max-width: 760px)");

let currentDoc = 0;
let currentView = "home";
let currentTheme = window.localStorage.getItem(storageKey) || "dark";

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

function docIndexFromSlug(slug) {
  if (!slug || slug === "home") {
    return -1;
  }

  const index = docs.findIndex((item) => item.slug === slug);
  return index >= 0 ? index : 0;
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
      const items = docs.map((item, index) => ({ item, index })).filter(({ item }) => item.section === section);

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
  docTitle.textContent = siteData.docsTitle || "RJ Web Docs";
  docViewer.classList.add("doc-viewer--home");
  syncHomeUrl();
  renderDocList();

  const groups = docSections
    .map((section) => ({
      section,
      items: docs.map((item, index) => ({ item, index })).filter(({ item }) => item.section === section)
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
  docViewer.innerHTML = `<p class="doc-viewer__status">Loading ${escapeHtml(doc.title)}...</p>`;
  renderDocList();
  syncDocUrl(doc);

  try {
    const response = await fetch(doc.file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load ${doc.file}`);
    }
    const markdown = await response.text();
    docViewer.innerHTML = markdownToHtml(markdown);
    document.querySelector(".docs-workspace")?.scrollTo({ top: 0 });
  } catch (error) {
    docViewer.innerHTML = `<p class="doc-viewer__status">${escapeHtml(error.message)}</p>`;
  }
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

themeToggle.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
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
const initialDocIndex = docIndexFromSlug(currentSlug());
if (initialDocIndex < 0) {
  renderDocsHome();
} else {
  loadDoc(initialDocIndex);
}
