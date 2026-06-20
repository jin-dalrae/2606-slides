export const cosmosPages = [
  ["intro", "01", "Introduction", "/cosmos/"],
  ["secondary", "02", "Secondary research", "/cosmos/secondary/"],
  ["primary", "03", "Primary research", "/cosmos/primary/"],
  ["making", "04", "Making Cosmos", "/cosmos/making/"],
  ["design", "05", "Design system", "/cosmos/design-system/"],
];

export const secondaryReports = [
  ["overview", "2.0", "Overview", "/cosmos/secondary/"],
  ["spatial-audio", "2.1", "Spatial communications", "/cosmos/secondary/spatial-communications/"],
];

export const primaryReports = [
  ["overview", "3.0", "Overview", "/cosmos/primary/"],
  ["interview-kris", "3.1", "Interview 01 · Kris", "/cosmos/primary/interview-kris/"],
  ["interview-yeoul", "3.2", "Interview 02 · Yeoul", "/cosmos/primary/interview-yeoul/"],
  ["interview-johnny", "3.3", "Interview 03 · Johnny", "/cosmos/primary/interview-johnny/"],
  ["expert-questionnaire", "3.4", "Remote expert questionnaire", "/cosmos/primary/expert-questionnaire/"],
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
  return (
    <aside className="chapter-rail" aria-label="Cosmos reports">
      <div className="rail-intro">
        <p>Research library</p>
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
  );
}
