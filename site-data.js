(function () {
  const profileLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dalraejin1/" },
    { label: "GitHub", url: "https://github.com/jin-dalrae/" },
    { label: "Portfolio", url: "https://raejin.web.app/" }
  ];

  const projects = [
    {
      name: "Cosmos",
      tagline: "Spatializing asynchronous community"
    },
    {
      name: "Cadinalpay",
      tagline: "Controlled payments for AI agents"
    },
    {
      name: "Social Lab",
      tagline: "Startup sustainability research"
    },
    {
      name: "Reference",
      tagline: "Project documentation"
    }
  ];

  const slides = [
    {
      slug: "cosmos-spatializing-community",
      title: "COSMOS",
      docTitle: "Research direction",
      sidebarTitle: "Research direction",
      project: "Cosmos",
      date: "June 11, 2026",
      file: "presentations/cosmos-spatializing-asynchronous-community-jun11.md",
      transition: "slide",
      background: "shader",
      font: "lora",
      theme: "dark"
    },
    {
      slug: "experience",
      title: "Experience",
      docTitle: "Research proposal",
      sidebarTitle: "Research proposal",
      project: "Cosmos",
      date: "June 4, 2026",
      file: "presentations/experience-cosmos-research-plan.md",
      transition: "slide"
    },
    {
      slug: "cardinal-agentic-spending",
      title: "Cardinal",
      docTitle: "Agentic workplace spending",
      project: "Cadinalpay",
      date: "June 11, 2026",
      file: "presentations/cardinal-agentic-workplace-spending.md",
      transition: "slide"
    },
    {
      slug: "social-lab-climate-goal-platform",
      title: "Team GTR",
      docTitle: "Team GTR +/- impact dashboard",
      sidebarTitle: "Team GTR climate platform",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "presentations/social-lab-climate-goal-platform.md",
      transition: "slide"
    },
    {
      slug: "gtr-partners",
      title: "GTR Partners",
      docTitle: "Team GTR climate awareness",
      project: "Social Lab",
      date: "May 2026",
      file: "presentations/gtr-startups-climate-awareness.md",
      transition: "slide"
    }
  ];

  const docs = [
    {
      slug: "cosmos-research-report",
      title: "COSMOS Research Report",
      docTitle: "Research report",
      project: "Cosmos",
      date: "June 11, 2026",
      file: "cosmos-research-report-jun11.md"
    },
    {
      slug: "cosmos-research-deck",
      title: "COSMOS Research Deck",
      docTitle: "Research direction deck",
      project: "Cosmos",
      date: "June 11, 2026",
      file: "../presentations/cosmos-spatializing-asynchronous-community-jun11.md"
    },
    {
      slug: "social-lab-climate-goal-report",
      title: "Climate Goal Platform Report",
      docTitle: "Team GTR climate goal platform report",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "social-lab-climate-goal-platform-report-jun15.md"
    },
    {
      slug: "social-lab-prd-stage1",
      title: "Climate Goal Platform PRD — Stage 1",
      docTitle: "Team GTR PRD Stage 1: climate startup +/- impact dashboard",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "prd-stage1-climate-impact-dashboard.md"
    },
    {
      slug: "social-lab-prd-stage2",
      title: "Climate Goal Platform PRD — Stage 2",
      docTitle: "Team GTR PRD Stage 2: generalization, customization, follow-up",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "prd-stage2-generalization-customization.md"
    },
    {
      slug: "slide-guide",
      title: "Slide Guide",
      docTitle: "Slide guide",
      project: "Reference",
      date: "Reference",
      file: "../SLIDE_GUIDE.md"
    },
    {
      slug: "implementation-plan",
      title: "Implementation Plan",
      docTitle: "Implementation plan",
      project: "Reference",
      date: "Reference",
      file: "../IMPLEMENTATION_PLAN.md"
    },
    {
      slug: "readme",
      title: "README",
      docTitle: "README",
      project: "Reference",
      date: "Reference",
      file: "../README.md"
    }
  ];

  window.RJ_SITE = {
    slidesTitle: "RJ Web Slides",
    docsTitle: "RJ Web Docs",
    profileLinks,
    projects,
    slides,
    docs
  };
})();
