import { CosmosHeader, CosmosSidebar } from "./shell.jsx";

const { useEffect, useState } = React;

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
      <Progress />
      <CosmosHeader />
      <CosmosSidebar active={activeChapter} />

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

          <div className="intro-report">
            <div className="intro-abstract">
              <p className="mini-label">What this research is</p>
              <h2>The project began with a broad question: could spatial computing make online discourse easier to understand?</h2>
              <div>
                <p>The first concept treated Cosmos as a spatial discourse browser and an alternative to headset doomscrolling. The direction was plausible, but under-evidenced. It did not explain why discussions needed to be spatial, which behavior the product should preserve, or what would distinguish it from social VR, a 3D feed, or an AI summary.</p>
                <p>A deeper audit identified the stronger reference model: offline bulletin boards, poster walls, sticky-note surfaces, and public message walls. These environments already support asynchronous participation through placement, density, movement, and return. Cosmos turns that established behavior into a researchable cross-device system.</p>
              </div>
            </div>

            <div className="research-shift" aria-label="How the Cosmos research direction changed">
              <article>
                <span>Initial frame</span>
                <h3>Spatial discourse browser</h3>
                <p>A broad alternative to feeds and headset doomscrolling.</p>
              </article>
              <div className="shift-axis"><i /><b>Research audit</b><i /></div>
              <article className="shift-result">
                <span>Current frame</span>
                <h3>VR community wall</h3>
                <p>A testable reconstruction of offline asynchronous participation.</p>
              </article>
            </div>

            <div className="wall-reference-heading">
              <div><p className="mini-label">Primary reference model</p><h2>Before the feed,<br /><em>there was the wall.</em></h2></div>
              <p>Physical message walls reveal discussion as a surface. People scan from a distance, move closer, notice clusters, compare adjacent notes, and return to remembered locations. Contribution remains optional; the community trace stays public.</p>
            </div>
            <figure className="wall-reference-grid">
              <div className="wall-image wall-image-wide"><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png" alt="A person reading a dense public poster wall" /></div>
              <div className="wall-image"><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png" alt="A long public wall covered in accumulated handwritten notes" /></div>
              <div className="wall-image"><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png" alt="A quieter community wall with pinned house-shaped notes" /></div>
              <figcaption><span>Fig. 01–03</span><p>Three physical patterns—dense poster field, accumulated public memorial, and curated note wall—show how placement, layering, material difference, and density become community signals.</p></figcaption>
            </figure>

            <div className="definition-block">
              <div className="definition-title"><p className="mini-label">Product definition</p><h2>Wall first.<br /><em>Platform later.</em></h2></div>
              <div className="definition-columns">
                <article><span>Cosmos is</span><ul><li>A persistent spatial message surface</li><li>A read-first form of participation</li><li>A place for source-linked sensemaking</li><li>A cross-device research prototype</li></ul></article>
                <article><span>Cosmos is not</span><ul><li>A headset-only social world</li><li>A new community platform on day one</li><li>A 2D feed arranged decoratively in 3D</li><li>A live spatial voice room</li></ul></article>
              </div>
            </div>

            <div className="hypothesis-block">
              <p className="mini-label">Core hypothesis</p>
              <blockquote>Can spatial form help people understand and remember an asynchronous discussion more comfortably than a flat feed?</blockquote>
              <p>The product claim is not that VR is more immersive. It is that position, proximity, density, and movement may provide usable orientation cues while preserving the low pressure of reading without posting.</p>
            </div>

            <div className="intro-questions">
              <div><p className="mini-label">Research questions</p><h2>Seven questions keep the concept accountable.</h2></div>
              <ol>
                <li><span>01</span><p><b>User need</b> Do people want low-pressure understanding, place memory, or simply faster summaries?</p></li>
                <li><span>02</span><p><b>Offline behavior</b> Which wall qualities matter: density, layering, proximity, materiality, or publicness?</p></li>
                <li><span>03</span><p><b>Market gap</b> What remains unsolved by Reddit, Discord, social VR, spatial OS tools, and AI?</p></li>
                <li><span>04</span><p><b>Product form</b> Should Cosmos become a wall, a browser, or eventually a native platform?</p></li>
                <li><span>05</span><p><b>Presence</b> Does spatial voice add orientation later, or recreate pressure and distraction?</p></li>
                <li><span>06</span><p><b>Interaction</b> Which actions—browsing, labels, source inspection, saved paths—create measurable value?</p></li>
                <li><span>07</span><p><b>Evidence</b> What result would prove that the wall is better than a flat-feed baseline?</p></li>
              </ol>
            </div>

            <div className="evidence-matrix-wrap">
              <div className="matrix-heading"><p className="mini-label">Evidence audit</p><h2>Promising is not the same as proven.</h2><p>The report separates literature-backed claims from strategic inference and names the primary research still required.</p></div>
              <div className="evidence-matrix" role="table" aria-label="Cosmos evidence strength matrix">
                <div className="matrix-row matrix-header" role="row"><span>Claim</span><span>Strength</span><span>What remains to test</span></div>
                <div className="matrix-row" role="row"><b>Offline async community already has spatial form</b><span className="strength strong"><i /> Strong</span><p>Translate wall behaviors into VR through observation and prototype testing.</p></div>
                <div className="matrix-row" role="row"><b>Quiet reading is meaningful participation</b><span className="strength strong"><i /> Strong</span><p>Interview the target audience about non-posting behavior and social permission.</p></div>
                <div className="matrix-row" role="row"><b>Feeds make discussion structure hard to see</b><span className="strength moderate"><i /> Moderate</span><p>Compare comprehension and stance recall against a controlled flat feed.</p></div>
                <div className="matrix-row" role="row"><b>Spatial layout can support sensemaking</b><span className="strength moderate"><i /> Moderate</span><p>Measure cluster interpretation, source recall, and note-location memory.</p></div>
                <div className="matrix-row" role="row"><b>AI labels must remain inspectable</b><span className="strength strong"><i /> Strong</span><p>Test source tracing, correction, and trust when a label is wrong.</p></div>
                <div className="matrix-row" role="row"><b>Wall-first is the right product strategy</b><span className="strength inference"><i /> Inference</span><p>Validate preference, return intent, and content-rights constraints.</p></div>
              </div>
            </div>

            <div className="device-modes">
              <div><p className="mini-label">System scope</p><h2>One wall,<br />four depths of attention.</h2></div>
              <div className="device-mode-grid">
                <article><span>01</span><h3>Desktop</h3><p>Broad access and the usability baseline.</p></article>
                <article><span>02</span><h3>Quest / MR</h3><p>Immersive browsing and comfort testing.</p></article>
                <article><span>03</span><h3>Vision Pro</h3><p>Spatial reading, gaze, and focus behavior.</p></article>
                <article><span>04</span><h3>Glasses</h3><p>Glanceable labels, paths, and resurfacing.</p></article>
              </div>
            </div>

            <div className="intro-conclusion">
              <span>Research position</span>
              <h2>Cosmos is not validated yet.<br /><em>It is now researchable.</em></h2>
              <p>The next step is a controlled comparison between a flat feed and a VR community wall, measured through comprehension, comfort, trust, source inspection, and place memory.</p>
              <div><a href="/cosmos/secondary/">Review the evidence <span>→</span></a><a href="/cosmos/primary/">See the study plan <span>→</span></a></div>
            </div>
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
