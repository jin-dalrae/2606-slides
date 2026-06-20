const { useEffect, useState } = React;
const chapters = [
  ["intro", "01", "Introduction"],
  ["secondary", "02", "Secondary research"],
  ["primary", "03", "Primary research"],
  ["making", "04", "Making Cosmos"]
];
const evidence = [
  {
    index: "A",
    title: "Quiet reading is participation",
    body: "Community research treats lurking as a meaningful behavior\u2014not an absence of one. People learn norms, build context, and decide when it feels safe to contribute.",
    takeaway: "Design for readers before posters.",
    color: "yellow"
  },
  {
    index: "B",
    title: "The wall predates the feed",
    body: "Bulletin boards, poster walls, and public note surfaces already make asynchronous communities spatial, persistent, browsable, and low-pressure.",
    takeaway: "Rebuild the wall, not the feed.",
    color: "pink"
  },
  {
    index: "C",
    title: "Space supports orientation",
    body: "Spatial memory and information-foraging research suggest that position, distance, and density can become useful retrieval cues\u2014not merely decoration.",
    takeaway: "Let location carry meaning.",
    color: "navy"
  }
];
const methods = [
  { number: "06", label: "Comparative user tests", note: "Flat feed vs. VR wall" },
  { number: "30\u201350", label: "Survey responses", note: "Readers, lurkers, XR users" },
  { number: "3\u20135", label: "Expert interviews", note: "Community, XR, spatial audio" },
  { number: "02", label: "Wall observations", note: "Physical community surfaces" }
];
const phases = [
  {
    phase: "01",
    name: "The controlled wall",
    status: "Next",
    body: "Build one permission-cleared message wall and test whether spatial browsing improves comprehension, comfort, trust, and place memory.",
    outputs: ["Quest + desktop prototype", "Flat-feed control", "Reading comfort study"]
  },
  {
    phase: "02",
    name: "Personal paths",
    status: "Then",
    body: "Give people a reason to return: saved paths, annotations, collected regions, comparisons, and remembered places.",
    outputs: ["Save + revisit", "Private annotations", "Viewpoint collections"]
  },
  {
    phase: "03",
    name: "Light contribution",
    status: "Later",
    body: "Add low-pressure participation only after reading works: leave notes, ask questions, mark missing voices, and export summaries.",
    outputs: ["Place a note", "Ask the wall", "Source-linked summaries"]
  },
  {
    phase: "04",
    name: "Community layer",
    status: "Conditional",
    body: "Consider native community or engineered spatial voice only when Cosmos has a clear return loop and evidence that presence adds value.",
    outputs: ["Community spaces", "Optional co-presence", "Spatial voice trials"]
  }
];
function Progress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "reading-progress", style: { transform: `scaleX(${progress})` } });
}
function Header() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Progress, null), /* @__PURE__ */ React.createElement("header", { className: "site-header" }, /* @__PURE__ */ React.createElement("a", { className: "wordmark", href: "#top", "aria-label": "Cosmos home" }, /* @__PURE__ */ React.createElement("span", { className: "wordmark-mark" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), "COSMOS"), /* @__PURE__ */ React.createElement("button", { className: "menu-button", onClick: () => setOpen(!open), "aria-expanded": open }, "Menu"), /* @__PURE__ */ React.createElement("nav", { className: open ? "top-nav is-open" : "top-nav", "aria-label": "Main navigation" }, chapters.map(([id, n, label]) => /* @__PURE__ */ React.createElement("a", { key: id, href: `#${id}`, onClick: () => setOpen(false) }, label))), /* @__PURE__ */ React.createElement("p", { className: "header-meta" }, "Research report ", /* @__PURE__ */ React.createElement("span", null, "\u2022"), " 2026")));
}
function ChapterLabel({ number, children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "chapter-label" }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("p", null, children));
}
function App() {
  const [lens, setLens] = useState("reader");
  const [activeChapter, setActiveChapter] = useState("intro");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveChapter(entry.target.id)),
      { rootMargin: "-25% 0px -60%", threshold: 0 }
    );
    chapters.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { id: "top" }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement("aside", { className: "chapter-rail", "aria-label": "Report chapters" }, /* @__PURE__ */ React.createElement("div", { className: "rail-intro" }, /* @__PURE__ */ React.createElement("p", null, "Research report"), /* @__PURE__ */ React.createElement("h2", null, "Cosmos"), /* @__PURE__ */ React.createElement("span", null, "Spatializing asynchronous community")), /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("p", null, "Index"), chapters.map(([id, n, label]) => /* @__PURE__ */ React.createElement("a", { className: activeChapter === id ? "active" : "", key: id, href: `#${id}` }, /* @__PURE__ */ React.createElement("span", null, n), /* @__PURE__ */ React.createElement("b", null, label), /* @__PURE__ */ React.createElement("i", null, "\u2192")))), /* @__PURE__ */ React.createElement("div", { className: "rail-status" }, /* @__PURE__ */ React.createElement("i", null), " Reading mode ", /* @__PURE__ */ React.createElement("span", null, "2026"))), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", { className: "hero", id: "intro" }, /* @__PURE__ */ React.createElement("div", { className: "hero-kicker" }, /* @__PURE__ */ React.createElement("span", null, "Independent research"), /* @__PURE__ */ React.createElement("span", null, "June 2026")), /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Spatializing asynchronous community"), /* @__PURE__ */ React.createElement("h1", null, "A community wall", /* @__PURE__ */ React.createElement("br", null), "you can ", /* @__PURE__ */ React.createElement("em", null, "walk into.")), /* @__PURE__ */ React.createElement("p", { className: "hero-summary" }, "Cosmos investigates whether VR can make online discussions easier to understand by rebuilding a familiar offline behavior: reading a public wall."), /* @__PURE__ */ React.createElement("a", { className: "text-link", href: "#secondary" }, "Read the findings ", /* @__PURE__ */ React.createElement("span", null, "\u2193"))), /* @__PURE__ */ React.createElement("div", { className: "hero-orbit", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "orbit orbit-one" }), /* @__PURE__ */ React.createElement("div", { className: "orbit orbit-two" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }, /* @__PURE__ */ React.createElement("span", null, "READ"), /* @__PURE__ */ React.createElement("b", null, "MOVE"), /* @__PURE__ */ React.createElement("i", null, "RETURN")), /* @__PURE__ */ React.createElement("div", { className: "satellite sat-one" }, "context"), /* @__PURE__ */ React.createElement("div", { className: "satellite sat-two" }, "place"), /* @__PURE__ */ React.createElement("div", { className: "satellite sat-three" }, "memory"))), /* @__PURE__ */ React.createElement("div", { className: "thesis-strip" }, /* @__PURE__ */ React.createElement("span", { className: "thesis-number" }, "01"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Working thesis"), " Cosmos is not another social feed or a live voice room. It is a VR reconstruction of an offline asynchronous community wall."))), /* @__PURE__ */ React.createElement("section", { className: "report-section secondary", id: "secondary" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02" }, "Secondary research"), /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, "The feed is optimized for momentum.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "The wall is optimized for orientation.")), /* @__PURE__ */ React.createElement("p", null, "The first research pass changed the product metaphor. The strongest precedent for Cosmos was not social VR\u2014it was the physical message wall.")), /* @__PURE__ */ React.createElement("div", { className: "evidence-grid" }, evidence.map((item) => /* @__PURE__ */ React.createElement("article", { className: `evidence-card ${item.color}`, key: item.index }, /* @__PURE__ */ React.createElement("span", { className: "evidence-index" }, item.index), /* @__PURE__ */ React.createElement("h3", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.body), /* @__PURE__ */ React.createElement("strong", null, item.takeaway)))), /* @__PURE__ */ React.createElement("figure", { className: "prototype-figure" }, /* @__PURE__ */ React.createElement("div", { className: "figure-image" }, /* @__PURE__ */ React.createElement("img", { src: "../assets/images/cosmos-sphere-browse.png", alt: "Early Cosmos prototype showing messages arranged in a spatial field" })), /* @__PURE__ */ React.createElement("figcaption", null, /* @__PURE__ */ React.createElement("span", null, "Fig. 01"), /* @__PURE__ */ React.createElement("p", null, "An early spatial browsing prototype. Messages become places; distance, density, and adjacency become part of how people read."))), /* @__PURE__ */ React.createElement("div", { className: "comparison-block" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "The market gap"), /* @__PURE__ */ React.createElement("h3", null, "Existing products solve fragments of the experience.")), /* @__PURE__ */ React.createElement("div", { className: "comparison-list" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", null, "Reddit / Discord"), /* @__PURE__ */ React.createElement("b", null, "Content without spatial orientation")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", null, "VRChat"), /* @__PURE__ */ React.createElement("b", null, "Presence without quiet sensemaking")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", null, "AI summaries"), /* @__PURE__ */ React.createElement("b", null, "Speed without inspectable place")), /* @__PURE__ */ React.createElement("p", { className: "highlight" }, /* @__PURE__ */ React.createElement("span", null, "Cosmos"), /* @__PURE__ */ React.createElement("b", null, "Read-first, spatial, source-linked"))))), /* @__PURE__ */ React.createElement("section", { className: "report-section primary", id: "primary" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03" }, "Primary research"), /* @__PURE__ */ React.createElement("div", { className: "section-heading split-heading" }, /* @__PURE__ */ React.createElement("h2", null, "Turn the concept into", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "a falsifiable study.")), /* @__PURE__ */ React.createElement("p", null, "The next phase compares the wall against a conventional flat feed. The question is not whether VR feels novel\u2014it is whether spatial form improves understanding.")), /* @__PURE__ */ React.createElement("div", { className: "metrics-row" }, methods.map((method) => /* @__PURE__ */ React.createElement("article", { key: method.label }, /* @__PURE__ */ React.createElement("strong", null, method.number), /* @__PURE__ */ React.createElement("h3", null, method.label), /* @__PURE__ */ React.createElement("p", null, method.note)))), /* @__PURE__ */ React.createElement("div", { className: "research-question" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Study lens"), /* @__PURE__ */ React.createElement("div", { className: "lens-tabs", role: "tablist", "aria-label": "Research lenses" }, [["reader", "Reader"], ["community", "Community"], ["system", "System"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, className: lens === id ? "active" : "", onClick: () => setLens(id) }, label))), /* @__PURE__ */ React.createElement("div", { className: "lens-panel" }, lens === "reader" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "01 / Reader"), /* @__PURE__ */ React.createElement("h3", null, "Can people understand and remember a discussion more comfortably in space than in a feed?"), /* @__PURE__ */ React.createElement("p", null, "Measure comprehension, reading comfort, source recall, place memory, and the ability to find a missing viewpoint.")), lens === "community" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "02 / Community"), /* @__PURE__ */ React.createElement("h3", null, "Does a wall lower the pressure to participate while preserving a sense of shared public space?"), /* @__PURE__ */ React.createElement("p", null, "Interview quiet readers, observe contribution decisions, and compare perceived social pressure across formats.")), lens === "system" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "03 / System"), /* @__PURE__ */ React.createElement("h3", null, "Can AI-generated structure remain useful when every label is inspectable, reversible, and source-linked?"), /* @__PURE__ */ React.createElement("p", null, "Test trust through source-trace tasks, incorrect-label recovery, and user-controlled clustering.")))), /* @__PURE__ */ React.createElement("div", { className: "field-notes" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Interview prompts"), /* @__PURE__ */ React.createElement("h3", null, "Listen for the moment when reading becomes participation.")), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "01"), /* @__PURE__ */ React.createElement("p", null, "Tell me about the last online discussion you read but did not reply to.")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "02"), /* @__PURE__ */ React.createElement("p", null, "How do you know where the important parts of a long discussion are?")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "03"), /* @__PURE__ */ React.createElement("p", null, "What would make a spatial version feel useful rather than overwhelming?")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "04"), /* @__PURE__ */ React.createElement("p", null, "When should AI organize a conversation\u2014and when should it stay out?"))))), /* @__PURE__ */ React.createElement("section", { className: "report-section making", id: "making" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "04" }, "Making Cosmos"), /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, "Prove the wall first.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Earn the platform later.")), /* @__PURE__ */ React.createElement("p", null, "A phased plan keeps the research honest. Each layer is added only after the previous one creates measurable value.")), /* @__PURE__ */ React.createElement("div", { className: "roadmap" }, phases.map((phase) => /* @__PURE__ */ React.createElement("article", { key: phase.phase }, /* @__PURE__ */ React.createElement("div", { className: "phase-top" }, /* @__PURE__ */ React.createElement("span", null, phase.phase), /* @__PURE__ */ React.createElement("i", null, phase.status)), /* @__PURE__ */ React.createElement("h3", null, phase.name), /* @__PURE__ */ React.createElement("p", null, phase.body), /* @__PURE__ */ React.createElement("ul", null, phase.outputs.map((output) => /* @__PURE__ */ React.createElement("li", { key: output }, output)))))), /* @__PURE__ */ React.createElement("blockquote", null, /* @__PURE__ */ React.createElement("span", null, "Big conclusion"), /* @__PURE__ */ React.createElement("p", null, "Cosmos is not validated yet, but it is now researchable."), /* @__PURE__ */ React.createElement("footer", null, "The next study can test whether a VR community wall helps people understand and remember asynchronous messages without adding live-room pressure.")))), /* @__PURE__ */ React.createElement("footer", { className: "site-footer" }, /* @__PURE__ */ React.createElement("div", { className: "footer-mark" }, /* @__PURE__ */ React.createElement("span", { className: "wordmark-mark" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null))), /* @__PURE__ */ React.createElement("p", null, "Cosmos is an independent research project by Rae Jin."), /* @__PURE__ */ React.createElement("a", { href: "#top" }, "Back to top \u2191")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
