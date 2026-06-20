export const gtrPages = [
  ["intro", "01", "Overview", "/gtr/"],
  ["docs", "02", "Docs", "/gtr/docs/"],
  ["slides", "03", "Slides", "/gtr/slides/"],
];

export const docsReports = [
  ["overview", "2.0", "Overview", "/gtr/docs/"],
  ["research-report", "2.1", "Research report", "/gtr/docs/research-report/"],
  ["stage-1", "2.2", "Stage 1 PRD", "/gtr/docs/stage-1/"],
  ["stage-2", "2.3", "Stage 2 PRD", "/gtr/docs/stage-2/"],
];

export const slidesReports = [
  ["overview", "3.0", "Overview", "/gtr/slides/"],
  ["gtr-partners", "3.1", "GTR Partners", "/gtr/slides/gtr-partners/"],
  ["climate-goal-platform", "3.2", "Climate Goal Platform", "/gtr/slides/climate-goal-platform/"],
];

const reportChildren = {
  docs: docsReports,
  slides: slidesReports,
};

export function GTRMark() {
  return <span className="wordmark-mark"><i /><i /><i /></span>;
}

export function GTRHeader({ meta = "Docs and slides archive · 2026" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="/gtr/" aria-label="GTR home">
        <GTRMark /> GTR
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? "top-nav is-open" : "top-nav"} aria-label="GTR navigation">
        {gtrPages.map(([id, number, label, path]) => (
          <React.Fragment key={id}>
            <a href={path} onClick={() => setOpen(false)}>{label}</a>
            {reportChildren[id]?.slice(1).map(([subId, subNumber, subLabel, subPath]) => (
              <a className="top-nav-child" key={subId} href={subPath} onClick={() => setOpen(false)}>↳ {subLabel}</a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <p className="header-meta">{meta}</p>
    </header>
  );
}

export function GTRSidebar({ active, subActive }) {
  return (
    <aside className="chapter-rail" aria-label="GTR archive">
      <div className="rail-intro">
        <p>Archive</p>
        <h2>GTR</h2>
        <span>Docs and slides for the climate goal platform work</span>
      </div>
      <nav>
        <p>Index</p>
        {gtrPages.map(([id, number, label, path]) => (
          <React.Fragment key={id}>
            <a className={active === id ? "active" : ""} href={path}>
              <span>{number}</span><b>{label}</b><i>→</i>
            </a>
            {reportChildren[id] && active === id && (
              <div className="rail-subnav">
                {reportChildren[id].map(([subId, subNumber, subLabel, subPath]) => (
                  <a className={subActive === subId ? "active" : ""} key={subId} href={subPath}>
                    <span>{subNumber}</span><b>{subLabel}</b><i>↗</i>
                  </a>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
      <div className="rail-status"><i /> GTR archive <span>2026</span></div>
    </aside>
  );
}
