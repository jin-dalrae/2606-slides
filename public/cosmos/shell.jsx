export const cosmosPages = [
  ["intro", "01", "Introduction", "/cosmos/"],
  ["secondary", "02", "Secondary research", "/cosmos/secondary/"],
  ["primary", "03", "Primary research", "/cosmos/primary/"],
  ["user-waveline", "04", "User waveline", "/cosmos/user-waveline/"],
  ["making", "05", "Making Cosmos", "/cosmos/making/"],
  ["design", "06", "Design system", "/cosmos/design-system/"],
];

export const secondaryReports = [
  ["overview", "2.0", "Overview", "/cosmos/secondary/"],
  ["spatial-audio", "2.1", "Spatial communications", "/cosmos/secondary/spatial-communications/"],
  ["memory-pods", "2.2", "MemoryPods (arXiv)", "/cosmos/secondary/memory-pods/"],
  ["socially-late", "2.3", "Asynchronous social VR", "/cosmos/secondary/socially-late/"],
  ["vr-reading", "2.4", "Customizing VR reading", "/cosmos/secondary/vr-reading/"],
];

export const primaryReports = [
  ["overview", "3.0", "Overview", "/cosmos/primary/"],
  ["interview-kris", "3.1", "Interview 01 · Kris", "/cosmos/primary/interview-kris/"],
  ["interview-yves", "3.2", "Interview 02 · Yves", "/cosmos/primary/interview-yves/"],
  ["interview-johnny", "3.3", "Interview 03 · Johnny", "/cosmos/primary/interview-johnny/"],
  ["interview-jd-suh", "3.4", "Interview 04 · JD Suh", "/cosmos/primary/interview-jd-suh/"],
  ["expert-questionnaire", "3.5", "Remote expert questionnaire", "/cosmos/primary/expert-questionnaire/"],
  ["version1-review", "3.6", "Version 1 & review", "/cosmos/primary/version1-review/"],
];

const reportChildren = {
  secondary: secondaryReports,
  primary: primaryReports,
};

export function CosmosMark() {
  return <span className="wordmark-mark"><i /><i /><i /></span>;
}

export function CosmosHeader({ meta = "Research report · 2026" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="/cosmos/" aria-label="Cosmos home">
        <CosmosMark /> COSMOS
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? "top-nav is-open" : "top-nav"} aria-label="Cosmos navigation">
        {cosmosPages.map(([id, number, label, path]) => (
          <React.Fragment key={id}>
            <a href={path} onClick={() => setOpen(false)}>{label}</a>
            {reportChildren[id]?.slice(1).map(([subId, subNumber, subLabel, subPath]) => <a className="top-nav-child" key={subId} href={subPath} onClick={() => setOpen(false)}>↳ {subLabel}</a>)}
          </React.Fragment>
        ))}
      </nav>
      <p className="header-meta">{meta}</p>
    </header>
  );
}

export function CosmosSidebar({ active, subActive }) {
  const [open, setOpen] = React.useState(() => {
    try {
      return window.localStorage.getItem("cosmos-rail") !== "closed";
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    document.documentElement.dataset.cosmosRail = open ? "open" : "closed";
    try {
      window.localStorage.setItem("cosmos-rail", open ? "open" : "closed");
    } catch {
      // ignore
    }
  }, [open]);

  return (
    <>
      <aside className="chapter-rail" aria-label="Cosmos reports" hidden={!open}>
        <div className="rail-intro">
          <div className="rail-intro__top">
            <p>Research library</p>
            <button
              type="button"
              className="rail-close"
              onClick={() => setOpen(false)}
              aria-label="Close chapter sidebar"
              title="Close sidebar"
            >
              ‹
            </button>
          </div>
          <h2>Cosmos</h2>
          <span>Spatializing asynchronous community</span>
        </div>
        <nav>
          <p>Index</p>
          {cosmosPages.map(([id, number, label, path]) => (
            <React.Fragment key={id}>
              <a className={active === id ? "active" : ""} href={path}>
                <span>{number}</span><b>{label}</b><i>→</i>
              </a>
              {reportChildren[id] && active === id && <div className="rail-subnav">
                {reportChildren[id].map(([subId, subNumber, subLabel, subPath]) => (
                  <a className={subActive === subId ? "active" : ""} key={subId} href={subPath}>
                    <span>{subNumber}</span><b>{subLabel}</b><i>↗</i>
                  </a>
                ))}
              </div>}
            </React.Fragment>
          ))}
        </nav>
        <div className="rail-status"><i /> Cosmos archive <span>2026</span></div>
      </aside>
      {!open && (
        <button
          type="button"
          className="rail-reopen"
          onClick={() => setOpen(true)}
          aria-label="Open chapter sidebar"
          title="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
}
