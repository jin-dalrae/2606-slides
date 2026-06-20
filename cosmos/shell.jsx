export const cosmosPages = [
  ["intro", "01", "Introduction", "/cosmos/"],
  ["secondary", "02", "Secondary research", "/cosmos/secondary/"],
  ["primary", "03", "Primary research", "/cosmos/primary/"],
  ["making", "04", "Making Cosmos", "/cosmos/making/"],
  ["design", "05", "Design system", "/cosmos/design-system/"],
];

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
        {cosmosPages.map(([id, number, label, path]) => <a key={id} href={path} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <p className="header-meta">{meta}</p>
    </header>
  );
}

export function CosmosSidebar({ active }) {
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
          <a className={active === id ? "active" : ""} key={id} href={path}>
            <span>{number}</span><b>{label}</b><i>→</i>
          </a>
        ))}
      </nav>
      <div className="rail-status"><i /> Cosmos archive <span>2026</span></div>
    </aside>
  );
}
