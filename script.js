const home = {
  title: "Rae Jin Slides for 2026 Summer, MDes IxD CCA",
  date: "Home",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dalraejin1/" },
    { label: "GitHub", url: "https://github.com/jin-dalrae/" },
    { label: "Portfolio", url: "https://raejin.web.app/" }
  ]
};

const presentations = [
  {
    title: "Experience",
    date: "June 4, 2026",
    file: "presentations/experience-cosmos-research-plan.md"
  },
  {
    title: "Presentation Title",
    date: "June 2026",
    file: "presentations/summer-intro.md"
  },
  {
    title: "Second Presentation",
    date: "July 2026",
    file: "presentations/second-presentation.md"
  }
];

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
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");

let currentView = "home";
let currentPresentation = 0;
let currentSlide = 0;
let currentSlideTitles = [];
let deck = null;
let cleanupShader = null;

function selectedPresentation() {
  return presentations[currentPresentation];
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
      const heading = part.match(/^#{1,3}\s+(.+)$/m);
      return heading ? heading[1].trim() : `Slide ${index + 1}`;
    });
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

  const homeItem = document.createElement("li");
  const homeButton = document.createElement("button");
  homeButton.className = "presentation-list__item";
  homeButton.type = "button";
  homeButton.setAttribute("aria-current", currentView === "home" ? "true" : "false");
  homeButton.innerHTML = `
    <span class="presentation-list__date">${home.date}</span>
    <span class="presentation-list__title">Home</span>
  `;
  homeButton.addEventListener("click", () => showHome());
  homeItem.append(homeButton);
  presentationList.append(homeItem);

  presentations.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.className = "presentation-list__item";
    button.type = "button";
    button.setAttribute("aria-current", currentView === "presentation" && index === currentPresentation ? "true" : "false");
    button.innerHTML = `
      <span class="presentation-list__date">${escapeHtml(item.date)}</span>
      <span class="presentation-list__title">${escapeHtml(item.title)}</span>
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

function initShaderBackground(canvas) {
  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });

  if (!gl) {
    return () => {};
  }

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
      vec3 ink  = vec3(0.045, 0.055, 0.10);
      vec3 cyan = vec3(0.20, 0.75, 0.95);
      vec3 lime = vec3(0.70, 0.98, 0.35);
      vec3 col = ink;
      col = mix(col, cyan*0.55, smoothstep(0.35, 0.75, n));
      col = mix(col, lime*0.85, smoothstep(0.62, 0.92, n+0.08*md));
      float vig = smoothstep(1.25, 0.2, length(uv));
      col *= mix(0.5, 1.0, vig);
      col += (hash(gl_FragCoord.xy + uTime)-0.5)*0.04;
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

function renderHome() {
  currentView = "home";
  stage.dataset.view = "home";
  destroyDeck();

  presentationTitle.textContent = home.title;
  presentationDate.textContent = "";
  slideCounter.textContent = "";
  slideList.innerHTML = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;

  slide.classList.add("slide--home");
  slide.innerHTML = `
    <div class="home-links">
      ${home.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
    </div>
  `;

  renderPresentationList();
}

function renderDeckShell(markdown) {
  slide.classList.remove("slide--home");
  slide.innerHTML = `
    <div class="reveal deck-root">
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

  cleanupShader = initShaderBackground(slide.querySelector(".slide-shader"));
}

async function renderPresentation() {
  currentView = "presentation";
  stage.dataset.view = "presentation";
  destroyDeck();

  const deckMeta = selectedPresentation();
  presentationTitle.textContent = deckMeta.title;
  presentationDate.textContent = deckMeta.date;
  slideCounter.textContent = "Loading";
  slideList.innerHTML = "";
  prevSlide.disabled = true;
  nextSlide.disabled = true;
  fullscreen.disabled = true;
  renderPresentationList();

  try {
    const markdown = await loadMarkdown(deckMeta.file);
    currentSlideTitles = markdownSlideTitles(markdown);
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
      transition: "slide",
      keyboardCondition: "focused",
      plugins: [RevealMarkdown, RevealNotes]
    });

    await deck.initialize();
    deck.layout();
    deck.on("slidechanged", (event) => {
      currentSlide = event.indexh;
      updateSlideControls();
    });
    updateSlideControls();
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

function showHome() {
  renderHome();
}

function goToPresentation(index) {
  currentPresentation = Math.max(0, Math.min(index, presentations.length - 1));
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
openSidebar.addEventListener("click", () => toggleSidebar(true));
closeSidebar.addEventListener("click", () => toggleSidebar(false));

document.addEventListener("keydown", (event) => {
  if (currentView !== "presentation") {
    return;
  }

  if (event.key.toLowerCase() === "f") {
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

renderHome();
