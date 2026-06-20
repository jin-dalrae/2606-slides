const { useEffect, useState } = React;

const chapters = [
  ["intro", "01", "Introduction", "/cosmos/"],
  ["secondary", "02", "Secondary research", "/cosmos/secondary/"],
  ["primary", "03", "Primary research", "/cosmos/primary/"],
  ["making", "04", "Making Cosmos", "/cosmos/making/"],
];

const evidence = [
  {
    index: "A",
    title: "Quiet reading is participation",
    body: "Community research treats lurking as a meaningful behavior—not an absence of one. People learn norms, build context, and decide when it feels safe to contribute.",
    takeaway: "Design for readers before posters.",
    color: "yellow",
  },
  {
    index: "B",
    title: "The wall predates the feed",
    body: "Bulletin boards, poster walls, and public note surfaces already make asynchronous communities spatial, persistent, browsable, and low-pressure.",
    takeaway: "Rebuild the wall, not the feed.",
    color: "pink",
  },
  {
    index: "C",
    title: "Space supports orientation",
    body: "Spatial memory and information-foraging research suggest that position, distance, and density can become useful retrieval cues—not merely decoration.",
    takeaway: "Let location carry meaning.",
    color: "navy",
  },
];

const methods = [
  { number: "06", label: "Comparative user tests", note: "Flat feed vs. VR wall" },
  { number: "30–50", label: "Survey responses", note: "Readers, lurkers, XR users" },
  { number: "3–5", label: "Expert interviews", note: "Community, XR, spatial audio" },
  { number: "02", label: "Wall observations", note: "Physical community surfaces" },
];

const phases = [
  {
    phase: "01",
    name: "The controlled wall",
    status: "Next",
    body: "Build one permission-cleared message wall and test whether spatial browsing improves comprehension, comfort, trust, and place memory.",
    outputs: ["Quest + desktop prototype", "Flat-feed control", "Reading comfort study"],
  },
  {
    phase: "02",
    name: "Personal paths",
    status: "Then",
    body: "Give people a reason to return: saved paths, annotations, collected regions, comparisons, and remembered places.",
    outputs: ["Save + revisit", "Private annotations", "Viewpoint collections"],
  },
  {
    phase: "03",
    name: "Light contribution",
    status: "Later",
    body: "Add low-pressure participation only after reading works: leave notes, ask questions, mark missing voices, and export summaries.",
    outputs: ["Place a note", "Ask the wall", "Source-linked summaries"],
  },
  {
    phase: "04",
    name: "Community layer",
    status: "Conditional",
    body: "Consider native community or engineered spatial voice only when Cosmos has a clear return loop and evidence that presence adds value.",
    outputs: ["Community spaces", "Optional co-presence", "Spatial voice trials"],
  },
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
  return <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Progress />
      <header className="site-header">
        <a className="wordmark" href="/cosmos/" aria-label="Cosmos home">
          <span className="wordmark-mark"><i /><i /><i /></span>
          COSMOS
        </a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <nav className={open ? "top-nav is-open" : "top-nav"} aria-label="Main navigation">
          {chapters.map(([id, n, label, path]) => <a key={id} href={path} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <p className="header-meta">Research report <span>•</span> 2026</p>
      </header>
    </>
  );
}

function ChapterLabel({ number, children }) {
  return <div className="chapter-label"><span>{number}</span><p>{children}</p></div>;
}

function App() {
  const [lens, setLens] = useState("reader");
  const activeChapter = window.location.pathname.includes("/secondary")
    ? "secondary"
    : window.location.pathname.includes("/primary")
      ? "primary"
      : window.location.pathname.includes("/making")
        ? "making"
        : "intro";
  return (
    <div id="top">
      <Header />

      <aside className="chapter-rail" aria-label="Report chapters">
        <div className="rail-intro">
          <p>Research report</p>
          <h2>Cosmos</h2>
          <span>Spatializing asynchronous community</span>
        </div>
        <nav>
          <p>Index</p>
          {chapters.map(([id, n, label, path]) => <a className={activeChapter === id ? "active" : ""} key={id} href={path}><span>{n}</span><b>{label}</b><i>→</i></a>)}
          <a href="/cosmos/design-system/"><span>05</span><b>Design system</b><i>→</i></a>
        </nav>
        <div className="rail-status"><i /> Reading mode <span>2026</span></div>
      </aside>

      <main>
        {activeChapter === "intro" && <section className="hero" id="intro">
          <div className="hero-kicker"><span>Independent research</span><span>June 2026</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Spatializing asynchronous community</p>
              <h1>A community wall<br />you can <em>walk into.</em></h1>
              <p className="hero-summary">Cosmos investigates whether VR can make online discussions easier to understand by rebuilding a familiar offline behavior: reading a public wall.</p>
              <a className="text-link" href="/cosmos/secondary/">Read the findings <span>→</span></a>
            </div>
            <div className="hero-orbit" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="planet"><span>READ</span><b>MOVE</b><i>RETURN</i></div>
              <div className="satellite sat-one">context</div>
              <div className="satellite sat-two">place</div>
              <div className="satellite sat-three">memory</div>
            </div>
          </div>
          <div className="thesis-strip">
            <span className="thesis-number">01</span>
            <p><strong>Working thesis</strong> Cosmos is not another social feed or a live voice room. It is a VR reconstruction of an offline asynchronous community wall.</p>
          </div>
        </section>}

        {activeChapter === "secondary" && <section className="report-section secondary" id="secondary">
          <ChapterLabel number="02">Secondary research</ChapterLabel>
          <div className="section-heading">
            <h2>The feed is optimized for momentum.<br /><em>The wall is optimized for orientation.</em></h2>
            <p>The first research pass changed the product metaphor. The strongest precedent for Cosmos was not social VR—it was the physical message wall.</p>
          </div>

          <div className="evidence-grid">
            {evidence.map((item) => (
              <article className={`evidence-card ${item.color}`} key={item.index}>
                <span className="evidence-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <strong>{item.takeaway}</strong>
              </article>
            ))}
          </div>

          <figure className="prototype-figure">
            <div className="figure-image"><img src="/assets/images/cosmos-sphere-browse.png" alt="Early Cosmos prototype showing messages arranged in a spatial field" /></div>
            <figcaption><span>Fig. 01</span><p>An early spatial browsing prototype. Messages become places; distance, density, and adjacency become part of how people read.</p></figcaption>
          </figure>

          <div className="comparison-block">
            <div>
              <p className="mini-label">The market gap</p>
              <h3>Existing products solve fragments of the experience.</h3>
            </div>
            <div className="comparison-list">
              <p><span>Reddit / Discord</span><b>Content without spatial orientation</b></p>
              <p><span>VRChat</span><b>Presence without quiet sensemaking</b></p>
              <p><span>AI summaries</span><b>Speed without inspectable place</b></p>
              <p className="highlight"><span>Cosmos</span><b>Read-first, spatial, source-linked</b></p>
            </div>
          </div>
        </section>}

        {activeChapter === "primary" && <section className="report-section primary" id="primary">
          <ChapterLabel number="03">Primary research</ChapterLabel>
          <div className="section-heading split-heading">
            <h2>Turn the concept into<br /><em>a falsifiable study.</em></h2>
            <p>The next phase compares the wall against a conventional flat feed. The question is not whether VR feels novel—it is whether spatial form improves understanding.</p>
          </div>

          <div className="metrics-row">
            {methods.map((method) => <article key={method.label}><strong>{method.number}</strong><h3>{method.label}</h3><p>{method.note}</p></article>)}
          </div>

          <div className="research-question">
            <p className="mini-label">Study lens</p>
            <div className="lens-tabs" role="tablist" aria-label="Research lenses">
              {[["reader", "Reader"], ["community", "Community"], ["system", "System"]].map(([id, label]) => (
                <button key={id} className={lens === id ? "active" : ""} onClick={() => setLens(id)}>{label}</button>
              ))}
            </div>
            <div className="lens-panel">
              {lens === "reader" && <><span>01 / Reader</span><h3>Can people understand and remember a discussion more comfortably in space than in a feed?</h3><p>Measure comprehension, reading comfort, source recall, place memory, and the ability to find a missing viewpoint.</p></>}
              {lens === "community" && <><span>02 / Community</span><h3>Does a wall lower the pressure to participate while preserving a sense of shared public space?</h3><p>Interview quiet readers, observe contribution decisions, and compare perceived social pressure across formats.</p></>}
              {lens === "system" && <><span>03 / System</span><h3>Can AI-generated structure remain useful when every label is inspectable, reversible, and source-linked?</h3><p>Test trust through source-trace tasks, incorrect-label recovery, and user-controlled clustering.</p></>}
            </div>
          </div>

          <div className="field-notes">
            <div><p className="mini-label">Interview prompts</p><h3>Listen for the moment when reading becomes participation.</h3></div>
            <ol>
              <li><span>01</span><p>Tell me about the last online discussion you read but did not reply to.</p></li>
              <li><span>02</span><p>How do you know where the important parts of a long discussion are?</p></li>
              <li><span>03</span><p>What would make a spatial version feel useful rather than overwhelming?</p></li>
              <li><span>04</span><p>When should AI organize a conversation—and when should it stay out?</p></li>
            </ol>
          </div>
        </section>}

        {activeChapter === "making" && <section className="report-section making" id="making">
          <ChapterLabel number="04">Making Cosmos</ChapterLabel>
          <div className="section-heading">
            <h2>Prove the wall first.<br /><em>Earn the platform later.</em></h2>
            <p>A phased plan keeps the research honest. Each layer is added only after the previous one creates measurable value.</p>
          </div>
          <div className="roadmap">
            {phases.map((phase) => (
              <article key={phase.phase}>
                <div className="phase-top"><span>{phase.phase}</span><i>{phase.status}</i></div>
                <h3>{phase.name}</h3>
                <p>{phase.body}</p>
                <ul>{phase.outputs.map(output => <li key={output}>{output}</li>)}</ul>
              </article>
            ))}
          </div>
          <blockquote>
            <span>Big conclusion</span>
            <p>Cosmos is not validated yet, but it is now researchable.</p>
            <footer>The next study can test whether a VR community wall helps people understand and remember asynchronous messages without adding live-room pressure.</footer>
          </blockquote>
        </section>}
      </main>

      <footer className="site-footer">
        <div className="footer-mark"><span className="wordmark-mark"><i /><i /><i /></span></div>
        <p>Cosmos is an independent research project by Rae Jin.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
