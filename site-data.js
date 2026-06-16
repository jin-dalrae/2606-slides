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
      name: "LbD",
      tagline: "Leadership by Design case studies"
    },
    {
      name: "Reference",
      tagline: "Project documentation"
    }
  ];

  // Each item can have `public: true`.
  // When true, the content can be read by anyone who has the direct URL (e.g. #the-slug),
  // without requiring login. Editing is still only possible for authenticated users.
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
      font: "poppins",
      public: true
    },
    {
      slug: "experience",
      title: "Experience",
      docTitle: "Research proposal",
      sidebarTitle: "Research proposal",
      project: "Cosmos",
      date: "June 4, 2026",
      file: "presentations/experience-cosmos-research-plan.md",
      transition: "slide",
      public: true
    },
    {
      slug: "cardinal-agentic-spending",
      title: "Cardinal",
      docTitle: "Agentic workplace spending",
      project: "Cadinalpay",
      date: "June 11, 2026",
      file: "presentations/cardinal-agentic-workplace-spending.md",
      transition: "slide",
      public: true
    },
    {
      slug: "social-lab-climate-goal-platform",
      title: "Team GTR",
      docTitle: "Team GTR +/- impact dashboard",
      sidebarTitle: "Team GTR climate platform",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "presentations/social-lab-climate-goal-platform.md",
      transition: "slide",
      public: true
    },
    {
      slug: "gtr-partners",
      title: "GTR Partners",
      docTitle: "Team GTR climate awareness",
      project: "Social Lab",
      date: "May 2026",
      file: "presentations/gtr-startups-climate-awareness.md",
      transition: "slide",
      public: true
    },
    {
      slug: "cloudflare-case-study",
      title: "Case Study for Cloudflare",
      docTitle: "Case study for Cloudflare",
      sidebarTitle: "Cloudflare case study",
      project: "LbD",
      date: "June 9, 2026",
      file: "presentations/cloudflare-case-study.md",
      transition: "slide",
      background: "cloudflare",
      public: true
    }
  ];

  // (see comment above on `public: true` for making specific documents readable by URL without login)
  const docs = [
    {
      slug: "cosmos-research-report",
      title: "COSMOS Research Report",
      docTitle: "Research report",
      project: "Cosmos",
      date: "June 11, 2026",
      file: "cosmos-research-report-jun11.md",
      public: true,
    },
    {
      slug: "cosmos-research-deck",
      title: "COSMOS Research Deck",
      docTitle: "Research direction deck",
      project: "Cosmos",
      date: "June 11, 2026",
      file: "../presentations/cosmos-spatializing-asynchronous-community-jun11.md",
      public: true,
    },
    {
      slug: "social-lab-climate-goal-report",
      title: "Climate Goal Platform Report",
      docTitle: "Team GTR climate goal platform report",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "social-lab-climate-goal-platform-report-jun15.md",
      public: true,
    },
    {
      slug: "social-lab-prd-stage1",
      title: "Climate Goal Platform PRD — Stage 1",
      docTitle: "Team GTR PRD Stage 1: climate startup +/- impact dashboard",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "prd-stage1-climate-impact-dashboard.md",
      public: true,
    },
    {
      slug: "social-lab-prd-stage2",
      title: "Climate Goal Platform PRD — Stage 2",
      docTitle: "Team GTR PRD Stage 2: generalization, customization, follow-up",
      project: "Social Lab",
      date: "June 15, 2026",
      file: "prd-stage2-generalization-customization.md",
      public: true,
    },
    {
      slug: "slide-guide",
      title: "Slide Guide",
      docTitle: "Slide guide",
      project: "Reference",
      date: "Reference",
      file: "../SLIDE_GUIDE.md",
      public: true,
    },
    {
      slug: "implementation-plan",
      title: "Implementation Plan",
      docTitle: "Implementation plan",
      project: "Reference",
      date: "Reference",
      file: "../IMPLEMENTATION_PLAN.md",
      public: true,
    },
    {
      slug: "readme",
      title: "README",
      docTitle: "README",
      project: "Reference",
      date: "Reference",
      file: "../README.md",
      public: true,
    }
  ];

  window.RJ_SITE = {
    slidesTitle: "Web Slides",
    docsTitle: "Web Docs",
    profileLinks,
    projects,
    slides,
    docs
  };
})();
