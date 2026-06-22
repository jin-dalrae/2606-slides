export const gtrPages = [
  ["intro", "01", "Overview", "/gtr/"],
  ["docs", "02", "Docs", "/gtr/docs/fieldwork-report/"],
  ["slides", "03", "Slides", "/gtr/slides/"],
];

export const docsReports = [
  ["fieldwork-report", "2.0", "Fieldwork report", "/gtr/docs/fieldwork-report/"],
  ["research-report", "2.1", "Research report", "/gtr/docs/research-report/"],
  ["stage-1", "2.2", "Stage 1 PRD", "/gtr/docs/stage-1/"],
  ["stage-2", "2.3", "Stage 2 PRD", "/gtr/docs/stage-2/"],
];

export const slidesReports = [
  ["overview", "3.0", "Overview", "/gtr/slides/"],
  ["fieldwork-week", "3.1", "Fieldwork week", "/gtr/slides/fieldwork-week/"],
  ["gtr-partners", "3.2", "GTR Partners", "/gtr/slides/gtr-partners/"],
  ["climate-goal-platform", "3.3", "Climate Goal Platform", "/gtr/slides/climate-goal-platform/"],
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
            {(id === "docs" ? docsReports : reportChildren[id]?.slice(1))?.map(([subId, subNumber, subLabel, subPath]) => (
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
        <span>Docs for the climate goal platform work</span>
      </div>
      <nav>
        <p>Index</p>
        <a className={active === "intro" ? "active" : ""} href="/gtr/">
          <span>01</span><b>Overview</b><i>→</i>
        </a>
        {docsReports.map(([id, number, label, path]) => (
          <a className={subActive === id ? "active" : ""} key={id} href={path}>
            <span>{number}</span><b>{label}</b><i>→</i>
          </a>
        ))}
      </nav>
      <div className="rail-status"><i /> GTR archive <span>2026</span></div>
    </aside>
  );
}
