(() => {
  // gtr/shell.jsx
  var gtrPages = [
    ["intro", "01", "Overview", "/gtr/"],
    ["docs", "02", "Docs", "/gtr/docs/"],
    ["slides", "03", "Slides", "/gtr/slides/"]
  ];
  var docsReports = [
    ["overview", "2.0", "Overview", "/gtr/docs/"],
    ["research-report", "2.1", "Research report", "/gtr/docs/research-report/"],
    ["stage-1", "2.2", "Stage 1 PRD", "/gtr/docs/stage-1/"],
    ["stage-2", "2.3", "Stage 2 PRD", "/gtr/docs/stage-2/"]
  ];
  var slidesReports = [
    ["overview", "3.0", "Overview", "/gtr/slides/"],
    ["gtr-partners", "3.1", "GTR Partners", "/gtr/slides/gtr-partners/"],
    ["climate-goal-platform", "3.2", "Climate Goal Platform", "/gtr/slides/climate-goal-platform/"]
  ];
  var reportChildren = {
    docs: docsReports,
    slides: slidesReports
  };
  function GTRMark() {
    return /* @__PURE__ */ React.createElement("span", { className: "wordmark-mark" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null));
  }
  function GTRHeader({ meta = "Docs and slides archive \xB7 2026" }) {
    const [open, setOpen] = React.useState(false);
    return /* @__PURE__ */ React.createElement("header", { className: "site-header" }, /* @__PURE__ */ React.createElement("a", { className: "wordmark", href: "/gtr/", "aria-label": "GTR home" }, /* @__PURE__ */ React.createElement(GTRMark, null), " GTR"), /* @__PURE__ */ React.createElement("button", { className: "menu-button", onClick: () => setOpen(!open), "aria-expanded": open }, "Menu"), /* @__PURE__ */ React.createElement("nav", { className: open ? "top-nav is-open" : "top-nav", "aria-label": "GTR navigation" }, gtrPages.map(([id, number, label, path]) => {
      var _a;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: id }, /* @__PURE__ */ React.createElement("a", { href: path, onClick: () => setOpen(false) }, label), (_a = reportChildren[id]) == null ? void 0 : _a.slice(1).map(([subId, subNumber, subLabel, subPath]) => /* @__PURE__ */ React.createElement("a", { className: "top-nav-child", key: subId, href: subPath, onClick: () => setOpen(false) }, "\u21B3 ", subLabel)));
    })), /* @__PURE__ */ React.createElement("p", { className: "header-meta" }, meta));
  }
  function GTRSidebar({ active, subActive }) {
    return /* @__PURE__ */ React.createElement("aside", { className: "chapter-rail", "aria-label": "GTR archive" }, /* @__PURE__ */ React.createElement("div", { className: "rail-intro" }, /* @__PURE__ */ React.createElement("p", null, "Archive"), /* @__PURE__ */ React.createElement("h2", null, "GTR"), /* @__PURE__ */ React.createElement("span", null, "Docs and slides for the climate goal platform work")), /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("p", null, "Index"), gtrPages.map(([id, number, label, path]) => /* @__PURE__ */ React.createElement(React.Fragment, { key: id }, /* @__PURE__ */ React.createElement("a", { className: active === id ? "active" : "", href: path }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("b", null, label), /* @__PURE__ */ React.createElement("i", null, "\u2192")), reportChildren[id] && active === id && /* @__PURE__ */ React.createElement("div", { className: "rail-subnav" }, reportChildren[id].map(([subId, subNumber, subLabel, subPath]) => /* @__PURE__ */ React.createElement("a", { className: subActive === subId ? "active" : "", key: subId, href: subPath }, /* @__PURE__ */ React.createElement("span", null, subNumber), /* @__PURE__ */ React.createElement("b", null, subLabel), /* @__PURE__ */ React.createElement("i", null, "\u2197"))))))), /* @__PURE__ */ React.createElement("div", { className: "rail-status" }, /* @__PURE__ */ React.createElement("i", null), " GTR archive ", /* @__PURE__ */ React.createElement("span", null, "2026")));
  }

  // gtr/app.jsx
  var { useEffect, useState } = React;
  var archiveMap = [
    {
      id: "report",
      label: "Climate Goal Platform Research Report",
      purpose: "Explains the rescoped product direction and the measurement logic behind it.",
      question: "What is GTR now trying to prove?"
    },
    {
      id: "stage1",
      label: "PRD Stage 1",
      purpose: "Defines the climate-startup MVP, its users, constraints, and success metrics.",
      question: "What ships first?"
    },
    {
      id: "stage2",
      label: "PRD Stage 2",
      purpose: "Extends the product toward generalization, customization, and follow-up.",
      question: "What expands after the wedge works?"
    },
    {
      id: "gtr-partners",
      label: "GTR Partners deck",
      purpose: "Shows the earlier advisory and transition-service framing.",
      question: "Where did the project start?"
    },
    {
      id: "product-deck",
      label: "Climate Goal Platform deck",
      purpose: "Converts the service story into a product story with a net-impact model.",
      question: "How does the direction change on slides?"
    }
  ];
  var reportTakeaways = [
    {
      title: "The wedge is climate startups first",
      body: "The project now treats climate startups as the initial buyer because their valuation already depends on an impact claim and they need both footprint and handprint tracked in one place."
    },
    {
      title: "Positive and negative impact stay separate",
      body: "The dashboard does not merge avoided emissions with the footprint. It keeps the accounting bases visible and exposes the net as a derived figure."
    },
    {
      title: "The system is operational, not cosmetic",
      body: "The product is meant to run weekly with goals, evidence, and integrity gates. The slides and docs are all pointing at that workflow."
    }
  ];
  var stage1Goals = [
    "Let a climate founder produce a defensible net view in under 15 minutes of intake.",
    "Gate every positive claim behind baseline, displacement, and additionality checks.",
    "Label every metric by cadence and freshness.",
    "Turn the number into a weekly habit through cooperative gamification.",
    "Preserve uncertainty in the share page for VC and LP review."
  ];
  var stage2Axes = [
    ["Profile-based rubrics", "Different activity patterns weight different metrics."],
    ["Audience-specific share pages", "VC, LP, customer, and internal views show different detail levels."],
    ["Follow-up rules", "Metrics can emit owned tasks and cadences."],
    ["Portfolio view", "Investors can inspect multiple companies without collapsing the data model."]
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
  function ChapterLabel({ number, children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "chapter-label" }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("p", null, children));
  }
  function PageIntro({ eyebrow, title, summary, links = [] }) {
    return /* @__PURE__ */ React.createElement("header", { className: "report-page-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, eyebrow), /* @__PURE__ */ React.createElement("h1", null, title), /* @__PURE__ */ React.createElement("p", null, summary), links.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, links.map(([href, label]) => /* @__PURE__ */ React.createElement("a", { key: href, href }, label, " ", /* @__PURE__ */ React.createElement("span", null, "\u2192")))));
  }
  function IntroPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "intro" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "01" }, "Overview"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "GTR archive",
        title: "A reading room for the GTR docs and slide decks",
        summary: "This site keeps the project in report form: left rail for navigation, right side for reading. It covers the transition from the original GTR advisory framing to the climate goal platform product, plus the docs and slide decks that explain the move.",
        links: [
          ["/gtr/docs/", "Read the docs"],
          ["/gtr/slides/", "Review the slides"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "GTR contents" }, /* @__PURE__ */ React.createElement("p", null, "In this archive"), /* @__PURE__ */ React.createElement("a", { href: "#summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Executive summary"), /* @__PURE__ */ React.createElement("a", { href: "#map" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Archive map"), /* @__PURE__ */ React.createElement("a", { href: "#reading-order" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Recommended reading order"), /* @__PURE__ */ React.createElement("a", { href: "#direction" }, /* @__PURE__ */ React.createElement("span", null, "3"), "What changed"), /* @__PURE__ */ React.createElement("a", { href: "#decision" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Decision rule")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Executive summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "GTR now reads as a product archive, not just a slide archive."), /* @__PURE__ */ React.createElement("p", null, "The documents show a clear sequence: an early advisory service for climate-aware startup work, then a tighter product direction focused on a climate startup +/- impact dashboard, then a Stage 2 plan for generalization and customization. The slide decks mirror that shift."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "What this site does"), /* @__PURE__ */ React.createElement("p", null, "It groups the docs and slides into a single reading interface so the project can be reviewed as a set of decisions, not as disconnected files."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "map" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Archive map"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Artifact"), /* @__PURE__ */ React.createElement("th", null, "What it contains"), /* @__PURE__ */ React.createElement("th", null, "What it answers"))), /* @__PURE__ */ React.createElement("tbody", null, archiveMap.map((item) => /* @__PURE__ */ React.createElement("tr", { key: item.id }, /* @__PURE__ */ React.createElement("td", null, item.label), /* @__PURE__ */ React.createElement("td", null, item.purpose), /* @__PURE__ */ React.createElement("td", null, item.question))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "reading-order" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Recommended reading order"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, "Start with the research report to understand the rescoped direction."), /* @__PURE__ */ React.createElement("li", null, "Read Stage 1 to see the MVP boundary, user groups, and success metrics."), /* @__PURE__ */ React.createElement("li", null, "Read Stage 2 to see how the product expands without losing the climate wedge."), /* @__PURE__ */ React.createElement("li", null, "Finish with the slide decks to see how the story was presented over time."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "direction" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "What changed"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Earlier framing"), /* @__PURE__ */ React.createElement("th", null, "Current framing"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Advisory service for climate awareness and founder support"), /* @__PURE__ */ React.createElement("td", null, "Productized +/- impact dashboard for climate startups")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Bespoke services and transition work"), /* @__PURE__ */ React.createElement("td", null, "Reusable workflow with goals, evidence, and integrity gates")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Climate Brick as an embedded reference"), /* @__PURE__ */ React.createElement("td", null, "Own measurement method, with Climate Brick only as a reference shelf")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Broad startup relevance"), /* @__PURE__ */ React.createElement("td", null, "Climate startups first, generalization later"))))), reportTakeaways.map((item) => /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow", key: item.title }, /* @__PURE__ */ React.createElement("b", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.body)))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "decision" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Decision rule"), /* @__PURE__ */ React.createElement("p", null, "If a reader can understand the archive from the docs and slides alone, the site is working. If the site makes the project feel more coherent than the raw folder of files, it is doing its job."), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/gtr/docs/" }, "Open the docs ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/gtr/slides/" }, "Open the slides ", /* @__PURE__ */ React.createElement("span", null, "\u2192"))))));
  }
  function DocsOverviewPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "docs" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02" }, "Docs"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "Documentation index",
        title: "The docs are where the product logic lives",
        summary: "These pages explain the project direction in report form: the research report, the Stage 1 PRD, and the Stage 2 PRD. The point is not to compress them into a pitch, but to preserve the reasoning.",
        links: [
          ["/gtr/docs/research-report/", "Research report"],
          ["/gtr/docs/stage-1/", "Stage 1 PRD"],
          ["/gtr/docs/stage-2/", "Stage 2 PRD"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "docs-scope" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2.0"), /* @__PURE__ */ React.createElement("h2", null, "Scope and method"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "The docs turn a messy project trail into a clear sequence of decisions."), /* @__PURE__ */ React.createElement("p", null, "The research report establishes the rationale for the climate startup wedge. Stage 1 defines the product boundary. Stage 2 defines the extension path. Together they show where the project starts, what it must prove, and what remains deliberately out of scope.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "docs-map" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2.1"), /* @__PURE__ */ React.createElement("h2", null, "Documentation map"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Document"), /* @__PURE__ */ React.createElement("th", null, "Main use"), /* @__PURE__ */ React.createElement("th", null, "Reading cue"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Research report"), /* @__PURE__ */ React.createElement("td", null, "Explains the rescoped direction and the + / - model."), /* @__PURE__ */ React.createElement("td", null, "Why this product exists.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "PRD Stage 1"), /* @__PURE__ */ React.createElement("td", null, "Defines the MVP and the first shippable boundary."), /* @__PURE__ */ React.createElement("td", null, "What gets built first.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "PRD Stage 2"), /* @__PURE__ */ React.createElement("td", null, "Generalization, customization, and follow-up."), /* @__PURE__ */ React.createElement("td", null, "What comes after the wedge works.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2.2"), /* @__PURE__ */ React.createElement("h2", null, "What the docs need to prove"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "The project should stay focused on climate startups before expanding outward."), /* @__PURE__ */ React.createElement("li", null, "The dashboard should keep positive and negative impact separate."), /* @__PURE__ */ React.createElement("li", null, "The workflow should be operational enough to use weekly, not just read once."), /* @__PURE__ */ React.createElement("li", null, "Future flexibility should come from data and rules, not from a vague redesign."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2.3"), /* @__PURE__ */ React.createElement("h2", null, "Go deeper"), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/gtr/docs/research-report/" }, "Read the report ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/gtr/docs/stage-1/" }, "Stage 1 PRD ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/gtr/docs/stage-2/" }, "Stage 2 PRD ", /* @__PURE__ */ React.createElement("span", null, "\u2192"))))));
  }
  function ResearchReportPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "research-report" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.1" }, "Docs / Research report"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "Climate Goal Platform research report",
        title: "The rescoped direction is a product, not a service",
        summary: "The report argues that GTR should move from a hands-on advisory model to a reusable product: a climate startup +/- impact dashboard where footprint and handprint remain separate and auditable.",
        links: [
          ["/gtr/docs/stage-1/", "Stage 1 PRD"],
          ["/gtr/slides/climate-goal-platform/", "Product deck"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Executive summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "The report narrows the project to climate startups because that is where impact, diligence, and value are already linked."), /* @__PURE__ */ React.createElement("p", null, "The product is framed as a live operating surface for a startup's environmental story. Footprint measures the negative side. Handprint measures the positive side. Net appears as a derived view, not as a merged accounting trick.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Before and after"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Before"), /* @__PURE__ */ React.createElement("th", null, "After"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Broad advisory service for startup climate awareness"), /* @__PURE__ */ React.createElement("td", null, "Climate startup +/- impact dashboard")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Services were bespoke and hard to scale"), /* @__PURE__ */ React.createElement("td", null, "Workflow is reusable and productized")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Climate Brick was part of the concept stack"), /* @__PURE__ */ React.createElement("td", null, "Climate Brick becomes reference material only")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Impact was adjacent to the business"), /* @__PURE__ */ React.createElement("td", null, "Impact becomes the operating surface")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "The model"), /* @__PURE__ */ React.createElement("p", null, "The report keeps the accounting bases separate because footprint and handprint are not the same kind of measurement. The dashboard can show a net number, but only after the positive side passes baseline, displacement, and additionality checks."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Core rule"), /* @__PURE__ */ React.createElement("p", null, "Show the inventory, show the modeled positive impact, and make the net a clearly labeled derivative."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "What the report sets up for Stage 1"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Climate startups become the first buyer and the first product wedge."), /* @__PURE__ */ React.createElement("li", null, "The dashboard must be useful in a short intake, not only in a long audit."), /* @__PURE__ */ React.createElement("li", null, "Gamification is allowed only if it supports evidence and weekly use."), /* @__PURE__ */ React.createElement("li", null, "The share page has to preserve uncertainty for VCs, LPs, and operators.")))));
  }
  function Stage1Page() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "stage-1" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.2" }, "Docs / Stage 1 PRD"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "PRD stage 1",
        title: "The MVP is a climate startup impact dashboard",
        summary: "Stage 1 defines the first shippable product: a two-sided dashboard for climate startups that tracks positive and negative impact separately, applies integrity gates, and turns the result into weekly action.",
        links: [
          ["/gtr/docs/research-report/", "Back to the report"],
          ["/gtr/docs/stage-2/", "Read Stage 2"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Goals"), /* @__PURE__ */ React.createElement("ol", null, stage1Goals.map((goal) => /* @__PURE__ */ React.createElement("li", { key: goal }, goal)))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Users"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Persona"), /* @__PURE__ */ React.createElement("th", null, "Need"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Climate founder"), /* @__PURE__ */ React.createElement("td", null, "Defend impact to investors without overclaiming.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Climate VC / analyst"), /* @__PURE__ */ React.createElement("td", null, "Verify the claim in diligence.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Startup operator"), /* @__PURE__ */ React.createElement("td", null, "Know what to do this week.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "LP or advisor"), /* @__PURE__ */ React.createElement("td", null, "Read the share page with uncertainty intact.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Core modules"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Module"), /* @__PURE__ */ React.createElement("th", null, "Purpose"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Impact ledger"), /* @__PURE__ */ React.createElement("td", null, "Shows + handprint and - footprint side by side.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Integrity gates"), /* @__PURE__ */ React.createElement("td", null, "Checks baseline, displacement, and additionality.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Freshness layer"), /* @__PURE__ */ React.createElement("td", null, "Labels metered versus modeled values and their cadence.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Goal board"), /* @__PURE__ */ React.createElement("td", null, "Assigns owners, deadlines, and evidence.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Progress game"), /* @__PURE__ */ React.createElement("td", null, "Uses levels and evidence points to create weekly momentum.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Share page"), /* @__PURE__ */ React.createElement("td", null, "Communicates the result to investors and internal reviewers.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Non-goals"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Not a certified carbon-accounting product."), /* @__PURE__ */ React.createElement("li", null, "Not a broad tech-startup product yet."), /* @__PURE__ */ React.createElement("li", null, "Not a compliance filing tool."), /* @__PURE__ */ React.createElement("li", null, "Not a handprint-only calculator.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Stage 1 verdict"), /* @__PURE__ */ React.createElement("p", null, "If the climate-startup wedge does not work, the rest of the system should not expand.")))));
  }
  function Stage2Page() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "stage-2" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.3" }, "Docs / Stage 2 PRD"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "PRD stage 2",
        title: "Generalization, customization, and follow-up",
        summary: "Stage 2 expands the product only after the wedge works. It adds footprint-only mode, profile-based rubrics, audience-specific share pages, and a follow-up loop that turns readings into owned tasks.",
        links: [
          ["/gtr/docs/stage-1/", "Review Stage 1"],
          ["/gtr/slides/climate-goal-platform/", "See the slide version"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "What expands"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Axis"), /* @__PURE__ */ React.createElement("th", null, "Stage 2 addition"))), /* @__PURE__ */ React.createElement("tbody", null, stage2Axes.map(([axis, detail]) => /* @__PURE__ */ React.createElement("tr", { key: axis }, /* @__PURE__ */ React.createElement("td", null, axis), /* @__PURE__ */ React.createElement("td", null, detail))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Business model change"), /* @__PURE__ */ React.createElement("p", null, "Stage 2 introduces a footprint-only tier for general tech startups, while the climate-startup product remains the flagship. The upsell is not more charts. It is a better operating loop: data-driven rubrics, routing, and follow-up.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Risks to keep visible"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Customization sprawl can turn the product into a configuration maze."), /* @__PURE__ */ React.createElement("li", null, "Follow-up can become noisy if cadence is ignored."), /* @__PURE__ */ React.createElement("li", null, "Generalization can weaken the climate-first credibility if it arrives too early."), /* @__PURE__ */ React.createElement("li", null, "Portfolio and investor tooling should not flatten the underlying company logic.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Stage 2 rule"), /* @__PURE__ */ React.createElement("p", null, "Generalize only after the climate wedge proves that the workflow has real pull.")))));
  }
  function SlidesOverviewPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "slides" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03" }, "Slides"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "Slides index",
        title: "The slide decks track the same story as the docs",
        summary: "The earlier GTR Partners deck frames the service idea. The later Climate Goal Platform deck reframes the project as a product. That shift is the point of the archive.",
        links: [
          ["/gtr/slides/gtr-partners/", "GTR Partners"],
          ["/gtr/slides/climate-goal-platform/", "Climate Goal Platform"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3.0"), /* @__PURE__ */ React.createElement("h2", null, "Deck map"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Deck"), /* @__PURE__ */ React.createElement("th", null, "Focus"), /* @__PURE__ */ React.createElement("th", null, "Relationship to the docs"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "GTR Partners"), /* @__PURE__ */ React.createElement("td", null, "Startup climate awareness and advisory services"), /* @__PURE__ */ React.createElement("td", null, "Earlier framing")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Climate Goal Platform"), /* @__PURE__ */ React.createElement("td", null, "Two-sided impact dashboard for climate startups"), /* @__PURE__ */ React.createElement("td", null, "Later product framing")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3.1"), /* @__PURE__ */ React.createElement("h2", null, "Reading note"), /* @__PURE__ */ React.createElement("p", null, "The slides are not separate from the docs. They are the presentation layer for the same trajectory: advisory service first, product second, climate startups as the wedge, and a measurement system that keeps the positive and negative sides legible."))));
  }
  function GTRPartnersPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "gtr-partners" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.1" }, "Slides / GTR Partners"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "GTR Partners",
        title: "The original deck framed a transition service",
        summary: "This deck focused on San Francisco startup culture, climate awareness, founder habits, and a service model that could bridge tech work with planetary impact.",
        links: [
          ["/gtr/slides/climate-goal-platform/", "Later product deck"],
          ["/gtr/docs/research-report/", "Research report"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "What the deck argues"), /* @__PURE__ */ React.createElement("p", null, "The deck treats climate awareness as something startups should build into daily operations. It proposes advisory services, founder support, and nature-based immersive work as a bridge between ambition and responsibility.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Key themes"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Startup culture in San Francisco is the setting."), /* @__PURE__ */ React.createElement("li", null, "Climate impact is underpriced and often disconnected from the company story."), /* @__PURE__ */ React.createElement("li", null, "Founders need a way to connect strategy, operations, and nature."), /* @__PURE__ */ React.createElement("li", null, "Climate Brick appears as a reference for scaling and capital logic."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "How it differs from the product deck"), /* @__PURE__ */ React.createElement("p", null, "This deck is advisory-led and service-led. The later deck is measurement-led and product-led. That is the archive's most important pivot."))));
  }
  function ClimateGoalPlatformPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section", id: "climate-goal-platform" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.2" }, "Slides / Climate Goal Platform"), /* @__PURE__ */ React.createElement("div", { className: "report-document" }, /* @__PURE__ */ React.createElement(
      PageIntro,
      {
        eyebrow: "Climate Goal Platform",
        title: "The updated deck makes the product shift explicit",
        summary: "This deck reframes GTR as a climate startup +/- impact dashboard with a two-sided ledger, integrity gates, and a weekly operating loop.",
        links: [
          ["/gtr/docs/research-report/", "Back to the report"],
          ["/gtr/docs/stage-1/", "Stage 1 PRD"]
        ]
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "What the deck emphasizes"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Climate startups first, because the value proposition is already impact-shaped."), /* @__PURE__ */ React.createElement("li", null, "Positive and negative impact must stay separate."), /* @__PURE__ */ React.createElement("li", null, "The product needs to be credible enough for diligence, not just catchy on a slide."), /* @__PURE__ */ React.createElement("li", null, "The workflow should turn impact into a weekly habit."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Slide logic"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Section"), /* @__PURE__ */ React.createElement("th", null, "Purpose"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Why climate startups first"), /* @__PURE__ */ React.createElement("td", null, "Defines the wedge and buyer.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "The +/- model"), /* @__PURE__ */ React.createElement("td", null, "Explains the accounting separation.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Integrity gate"), /* @__PURE__ */ React.createElement("td", null, "Shows why additionality matters.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Roadmap"), /* @__PURE__ */ React.createElement("td", null, "Connects MVP, Stage 2, and the longer product path.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "One-line conclusion"), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Slide conclusion"), /* @__PURE__ */ React.createElement("p", null, "The deck turns GTR into a product story with a measurable wedge and a visible growth path.")))));
  }
  function App() {
    const path = window.location.pathname;
    const activeChapter = path.includes("/docs/") ? "docs" : path.includes("/slides/") ? "slides" : "intro";
    const docsPage = path.includes("/docs/research-report") ? "research-report" : path.includes("/docs/stage-1") ? "stage-1" : path.includes("/docs/stage-2") ? "stage-2" : "overview";
    const slidesPage = path.includes("/slides/gtr-partners") ? "gtr-partners" : path.includes("/slides/climate-goal-platform") ? "climate-goal-platform" : "overview";
    return /* @__PURE__ */ React.createElement("div", { id: "top" }, /* @__PURE__ */ React.createElement(Progress, null), /* @__PURE__ */ React.createElement(GTRHeader, null), /* @__PURE__ */ React.createElement(
      GTRSidebar,
      {
        active: activeChapter,
        subActive: activeChapter === "docs" ? docsPage : activeChapter === "slides" ? slidesPage : void 0
      }
    ), /* @__PURE__ */ React.createElement("main", null, activeChapter === "intro" && /* @__PURE__ */ React.createElement(IntroPage, null), activeChapter === "docs" && docsPage === "overview" && /* @__PURE__ */ React.createElement(DocsOverviewPage, null), activeChapter === "docs" && docsPage === "research-report" && /* @__PURE__ */ React.createElement(ResearchReportPage, null), activeChapter === "docs" && docsPage === "stage-1" && /* @__PURE__ */ React.createElement(Stage1Page, null), activeChapter === "docs" && docsPage === "stage-2" && /* @__PURE__ */ React.createElement(Stage2Page, null), activeChapter === "slides" && slidesPage === "overview" && /* @__PURE__ */ React.createElement(SlidesOverviewPage, null), activeChapter === "slides" && slidesPage === "gtr-partners" && /* @__PURE__ */ React.createElement(GTRPartnersPage, null), activeChapter === "slides" && slidesPage === "climate-goal-platform" && /* @__PURE__ */ React.createElement(ClimateGoalPlatformPage, null)));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
