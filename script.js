const slides = [
  {
    eyebrow: "Start",
    title: "Presentation Title",
    body: "Use this space for your opening message.",
    points: ["Edit the slide data in script.js", "Use the list to jump between slides", "Use arrow keys or the controls to present"]
  },
  {
    eyebrow: "Section",
    title: "A Clear Slide",
    body: "Keep each slide focused on one idea.",
    points: ["Short headlines", "Readable supporting text", "Simple navigation"]
  },
  {
    eyebrow: "Close",
    title: "Final Thought",
    body: "End with the decision, question, or next step you want people to remember.",
    points: []
  }
];

const appShell = document.querySelector(".app-shell");
const slideList = document.querySelector("#slideList");
const slide = document.querySelector("#slide");
const slideCounter = document.querySelector("#slideCounter");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const fullscreen = document.querySelector("#fullscreen");
const openSidebar = document.querySelector("#openSidebar");
const closeSidebar = document.querySelector("#closeSidebar");

let currentSlide = 0;

function renderSlideList() {
  slideList.innerHTML = "";

  slides.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.className = "slide-list__item";
    button.type = "button";
    button.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    button.innerHTML = `
      <span class="slide-list__number">Slide ${index + 1}</span>
      <span class="slide-list__title">${item.title}</span>
    `;
    button.addEventListener("click", () => goToSlide(index));

    li.append(button);
    slideList.append(li);
  });
}

function renderSlide() {
  const item = slides[currentSlide];
  const points = item.points.length
    ? `<ul class="slide__points">${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>`
    : "";

  slide.innerHTML = `
    <p class="slide__eyebrow">${item.eyebrow}</p>
    <h2 class="slide__title">${item.title}</h2>
    <p class="slide__body">${item.body}</p>
    ${points}
  `;

  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
  prevSlide.disabled = currentSlide === 0;
  nextSlide.disabled = currentSlide === slides.length - 1;
  renderSlideList();
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  renderSlide();
}

function toggleSidebar(open) {
  appShell.dataset.sidebarOpen = String(open);
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.body.requestFullscreen();
    return;
  }

  await document.exitFullscreen();
}

prevSlide.addEventListener("click", () => goToSlide(currentSlide - 1));
nextSlide.addEventListener("click", () => goToSlide(currentSlide + 1));
fullscreen.addEventListener("click", toggleFullscreen);
openSidebar.addEventListener("click", () => toggleSidebar(true));
closeSidebar.addEventListener("click", () => toggleSidebar(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToSlide(currentSlide - 1);
  }

  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    goToSlide(currentSlide + 1);
  }

  if (event.key.toLowerCase() === "f") {
    toggleFullscreen();
  }
});

renderSlide();
