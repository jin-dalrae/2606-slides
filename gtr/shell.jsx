export const gtrPages = [
  ["intro", "01", "Overview", "/gtr/"],
  ["docs", "02", "Docs", "/gtr/docs/fieldwork-report/"],
];

export const docsReports = [
  ["fieldwork-report", "2.0", "Fieldwork report", "/gtr/docs/fieldwork-report/"],
  ["stage-1", "2.1", "Stage 1 PRD", "/gtr/docs/stage-1/"],
  ["stage-2", "2.2", "Stage 2 PRD", "/gtr/docs/stage-2/"],
];

export const fieldworkSlide = {
  id: "fieldwork-slides",
  label: "Fieldwork slides",
  path: "/gtr/docs/fieldwork-report/slides/",
  slug: "gtr-fieldwork-week",
};

export const fieldworkFeedback = {
  id: "fieldwork-feedback",
  label: "Presentation feedback",
  path: "/gtr/docs/fieldwork-report/feedback/",
};

export const fieldworkSubnav = [fieldworkSlide, fieldworkFeedback];

const reportChildren = {
  docs: docsReports,
};

export function GTRMark() {
  return <span className="wordmark-mark"><i /><i /><i /></span>;
}

export function GTRHeader({ meta = "Docs archive · 2026" }) {
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
            {reportChildren[id]?.map(([subId, , subLabel, subPath]) => (
              <React.Fragment key={subId}>
                <a className="top-nav-child" href={subPath} onClick={() => setOpen(false)}>↳ {subLabel}</a>
                {subId === "fieldwork-report" && fieldworkSubnav.map((item) => (
                  <a className="top-nav-child top-nav-child--nested" key={item.id} href={item.path} onClick={() => setOpen(false)}>↳ {item.label}</a>
                ))}
              </React.Fragment>
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
          <React.Fragment key={id}>
            <a className={active === "docs" && subActive === id ? "active" : ""} href={path}>
              <span>{number}</span><b>{label}</b><i>→</i>
            </a>
            {id === "fieldwork-report" && (
              <div className="rail-subnav rail-subnav--always">
                {fieldworkSubnav.map((item) => (
                  <a
                    key={item.id}
                    className={active === "docs" && subActive === item.id ? "active" : ""}
                    href={item.path}
                  >
                    <span>↳</span><b>{item.label}</b><i>↗</i>
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