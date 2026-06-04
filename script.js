const home = {
  title: "Slides for 2026 Summer, MDes IxD CCA",
  date: "Home",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dalraejin1/" },
    { label: "GitHub", url: "https://github.com/jin-dalrae/" },
    { label: "Portfolio", url: "https://raejin.web.app/" }
  ]
};

const presentations = [
  {
    slug: "gtr-partners",
    title: "GTR Partners",
    date: "May 2026",
    file: "presentations/gtr-startups-climate-awareness.md",
    transition: "slide"
  },
  {
    slug: "experience",
    title: "Experience",
    date: "June 4, 2026",
    file: "presentations/experience-cosmos-research-plan.md",
    transition: "slide"
  }
];

presentations.sort((a, b) => new Date(b.date) - new Date(a.date));

const githubEditBase = "https://github.com/jin-dalrae/2606-slides/edit/master/";
const storageKeys = {
  transition: "rae-slides-transition",
  theme: "rae-slides-theme",
  background: "rae-slides-background"
};

const appShell = document.querySelector(".app-shell");
const stage = document.querySelector(".stage");
const presentationList = document.querySelector("#presentationList");
const presentationTitle = document.querySelector("#presentationTitle");
const presentationDate = document.querySelector("#presentationDate");
const slideList = document.querySelector("#slideList");
const slide = document.querySelector("#slide");
const slideCounter = document.querySelector("#slideCounter");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const fullscreen = document.querySelector("#fullscreen");
const editDeck = document.querySelector("#editDeck");
const transitionSelect = document.querySelector("#transitionSelect");
const backgroundSelect = document.querySelector("#backgroundSelect");
const themeToggle = document.querySelector("#themeToggle");
const homeLink = document.querySelector("#homeLink");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");

let currentView = "home";
let currentPresentation = 0;
let currentSlide = 0;
let currentSlideTitles = [];
let deck = null;
let cleanupShader = null;
let pendingSlideIndex = null;
let currentTransition = window.localStorage.getItem(storageKeys.transition) || "slide";
let currentTheme = window.localStorage.getItem(storageKeys.theme) || "dark";
let currentBackground = window.localStorage.getItem(storageKeys.background) || "shader";

function selectedPresentation() {
  return presentations[currentPresentation];
}

function selectedPresentationSlug() {
  return selectedPresentation().slug || String(currentPresentation + 1);
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

function firstSlidePreview(markdown) {
  const firstSlide = markdown.split(/\n---+\n/g)[0];
  const headings = [...firstSlide.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) => match[1].trim());
  const body = firstSlide
    .replace(/^#{1,3}\s+.+$/gm, "")
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  return {
    title: headings[0] || "Untitled deck",
    subtitle: headings[1] || body || "Open this deck"
  };
}

async function preloadPresentationTitles() {
  await Promise.all(
    presentations.map(async (item) => {
      if (item.resolvedTitle) {
        return;
      }
      try {
        const markdown = await loadMarkdown(item.file);
        item.resolvedTitle = firstSlideHeaderTitle(markdown) || item.title;
      } catch {
        item.resolvedTitle = item.title;
      }
    })
  );
  renderPresentationList();
}

async function loadMarkdown(file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Could not load ${file}`);
  }

  return response.text();
}

function renderPresentationList() {
  presentationList.innerHTML = "";

  presentations.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.className = "presentation-list__item";
    button.type = "button";
    button.setAttribute("aria-current", currentView === "presentation" && index === currentPresentation ? "true" : "false");
    button.innerHTML = `
      <span class="presentation-list__date">${escapeHtml(item.date)}</span>
      <span class="presentation-list__title">${escapeHtml(item.resolvedTitle || item.title)}</span>
    `;
    button.addEventListener("click", () => goToPresentation(index));

    li.append(button);
    presentationList.append(li);
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

function updateSlideControls() {
  const totalSlides = currentSlideTitles.length;
  slideCounter.textContent = totalSlides ? `${currentSlide + 1} / ${totalSlides}` : "";
  prevSlide.disabled = currentSlide === 0;
  nextSlide.disabled = currentSlide >= totalSlides - 1;
  fullscreen.disabled = false;
  renderSlideList();
}

function initShaderBackground(canvas, theme = "dark") {
  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });

  if (!gl) {
    return () => {};
  }

  const palette =
    theme === "light"
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
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
      vec2 u=f*f*(3.-2.*f);
      return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
    }
    float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
      float t = uTime*0.07;
      vec2 q = uv*1.3;
      q += 0.32*vec2(fbm(q+t), fbm(q-t+5.2));
      float n = fbm(q*1.6 + t);
      vec2 m = (uMouse - 0.5*uRes)/uRes.y;
      float md = exp(-2.5*length(uv-m));
      n += 0.22*md;
      vec3 ink  = ${palette.ink};
      vec3 cyan = ${palette.cyan};
      vec3 lime = ${palette.lime};
      vec3 col = ink;
      col = mix(col, cyan*0.55, smoothstep(0.35, 0.75, n));
      col = mix(col, lime*0.85, smoothstep(0.62, 0.92, n+0.08*md));
      float vig = smoothstep(1.25, 0.2, length(uv));
      col *= mix(${palette.vignetteLow}, 1.0, vig);
      col += (hash(gl_FragCoord.xy + uTime)-0.5)*${palette.grain};
      gl_FragColor = vec4(col, 1.0);
    }
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

  cleanupShader = initShaderBackground(canvas, currentTheme);
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
  editDeck.disabled = true;
  transitionSelect.disabled = true;
  backgroundSelect.disabled = true;

  slide.classList.add("slide--home");
  slide.innerHTML = `
    <div class="home-deck-grid" id="homeDeckGrid"></div>
    <div class="home-links">
      ${home.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
    </div>
  `;

  renderPresentationList();

  const deckGrid = document.querySelector("#homeDeckGrid");
  const cards = await Promise.all(
    presentations.map(async (item, index) => {
      try {
        const markdown = await loadMarkdown(item.file);
        return { item, index, preview: firstSlidePreview(markdown) };
      } catch {
        return {
          item,
          index,
          preview: { title: item.title, subtitle: "Preview unavailable" }
        };
      }
    })
  );

  deckGrid.innerHTML = cards
    .map(
      ({ item, index, preview }) => `
        <button class="home-deck-card" type="button" data-presentation-index="${index}">
          <span class="home-deck-card__thumb">
            <em>${escapeHtml(preview.title)}</em>
            <span>${escapeHtml(preview.subtitle)}</span>
          </span>
          <span class="home-deck-card__body">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="home-deck-card__meta">${escapeHtml(item.date)}</span>
          </span>
        </button>
      `
    )
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

  restartShaderBackground();
}

async function renderPresentation() {
  currentView = "presentation";
  stage.dataset.view = "presentation";
  destroyDeck();
  homeLink.removeAttribute("aria-current");

  const deckMeta = selectedPresentation();
  currentTransition = window.localStorage.getItem(storageKeys.transition) || deckMeta.transition || currentTransition;
  transitionSelect.value = currentTransition;
  backgroundSelect.value = currentBackground;
  presentationTitle.textContent = deckMeta.title;
  presentationDate.textContent = deckMeta.date;
  slideCounter.textContent = "Loading";
  slideList.innerHTML = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  editDeck.disabled = false;
  transitionSelect.disabled = false;
  backgroundSelect.disabled = false;
  renderPresentationList();

  try {
    const markdown = await loadMarkdown(deckMeta.file);
    currentSlideTitles = markdownSlideTitles(markdown);
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
  } catch (error) {
    currentSlideTitles = [];
    slide.classList.remove("slide--home");
    slide.innerHTML = `
      <div class="slide__error">
        <p class="slide__eyebrow">Deck unavailable</p>
        <h2 class="slide__title">Could not load this presentation.</h2>
        <p class="slide__body">${escapeHtml(error.message)}</p>
      </div>
    `;
    updateSlideControls();
    fullscreen.disabled = true;
  }
}

function updateTransition(value) {
  currentTransition = value;
  window.localStorage.setItem(storageKeys.transition, currentTransition);

  if (!deck) {
    return;
  }

  deck.configure({
    transition: currentTransition
  });
}

function updateBackground(value) {
  currentBackground = value;
  window.localStorage.setItem(storageKeys.background, currentBackground);

  const deckRoot = slide.querySelector(".deck-root");
  if (deckRoot) {
    deckRoot.dataset.backgroundMode = currentBackground;
  }
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = currentTheme;
  window.localStorage.setItem(storageKeys.theme, currentTheme);
  themeToggle.querySelector(".theme-toggle__label").textContent = currentTheme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute(
    "aria-label",
    currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
  restartShaderBackground();
}

function showHome() {
  window.history.pushState(null, "", appRootPath() || "/");
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

async function toggleFullscreen() {
  if (currentView !== "presentation") {
    return;
  }

  if (!document.fullscreenElement) {
    const deckRoot = slide.querySelector(".deck-root");
    await deckRoot.requestFullscreen();
    sizeFullscreenSlide();
    return;
  }

  await document.exitFullscreen();
}

prevSlide.addEventListener("click", goToPreviousSlide);
nextSlide.addEventListener("click", goToNextSlide);
fullscreen.addEventListener("click", toggleFullscreen);
transitionSelect.addEventListener("change", (event) => updateTransition(event.target.value));
backgroundSelect.addEventListener("change", (event) => updateBackground(event.target.value));
editDeck.addEventListener("click", () => {
  if (currentView !== "presentation") {
    return;
  }

  window.open(`${githubEditBase}${selectedPresentation().file}`, "_blank", "noreferrer");
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

applyTheme(currentTheme);
if (isPresentationRoute()) {
  const target = presentationTargetFromLocation();
  goToPresentation(target.presentationIndex, target.slideIndex);
} else {
  renderHome();
}
preloadPresentationTitles();
