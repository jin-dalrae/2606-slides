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

const speakerStrategies = [
  { number: "01", name: "N-loudest", verdict: "Breaks presence", body: "Forwarding only the loudest speakers causes quiet voices to cut out unnaturally. A technique that works for meetings becomes perceptually wrong in a spatial room." },
  { number: "02", name: "N-closest", verdict: "Creates asymmetry", body: "Proximity feels intuitive until two users have different subscription sets: one person can hear the other while the conversation remains one-way." },
  { number: "03", name: "Fixed range", verdict: "Predictable, abrupt", body: "A hard hearing boundary controls load, but voices appear and disappear at the edge. Dense rooms can sound empty even when people are visibly present." },
  { number: "04", name: "Large attenuated range", verdict: "Natural, expensive", body: "A wide range lets voices decay toward silence and best matches physical hearing. It also increases the number of streams or mixes the system must deliver." },
];

const deliveryArchitectures = [
  { label: "Peer-to-peer", load: "Client", risk: "IP exposure + upstream bandwidth", note: "Every participant sends audio directly to every listener. Simple in theory; insecure and inefficient at room scale." },
  { label: "Forwarding proxy", load: "Network", risk: "Stream fan-out", note: "A server hides client addresses and routes individual streams, but each listener may still receive dozens of concurrent voices." },
  { label: "Server-side mixing", load: "Server", risk: "Per-listener compute", note: "The server creates a custom spatial scene for each listener. Complex, but the strongest fit for dense constrained environments." },
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

function TranscriptAppendix({ src }) {
  const [transcript, setTranscript] = useState("Loading transcript…");
  useEffect(() => {
    fetch(src)
      .then(response => response.ok ? response.text() : Promise.reject(new Error("Transcript unavailable")))
      .then(setTranscript)
      .catch(() => setTranscript("The transcript could not be loaded."));
  }, [src]);
  return <details className="transcript-appendix"><summary><span>Appendix A</span><b>Read the full interview transcript</b><i>+</i></summary><pre>{transcript}</pre></details>;
}

const expertQuestions = [
  {
    id: "limitations",
    section: "01",
    label: "Expert background and context",
    question: "In your professional opinion, what are currently the biggest hardware or software limitations preventing long-form text consumption, such as reading forums or articles, in VR?",
  },
  {
    id: "fatigue",
    section: "02",
    label: "Reading experience and ergonomics",
    question: "When users read text in a 3D environment, what are the primary causes of visual fatigue or discomfort, and how can developers mitigate them?",
  },
  {
    id: "typography",
    section: "02",
    label: "Reading experience and ergonomics",
    question: "What are the ideal typographical considerations, including font scale, contrast, viewing distance, and background environment, for reading text-heavy content in VR?",
  },
  {
    id: "ergonomics",
    section: "02",
    label: "Reading experience and ergonomics",
    question: "How do physical ergonomics, including posture, sitting versus standing, and head movement, affect a user's willingness to stay inside a productivity or reading application for an extended period?",
  },
  {
    id: "impressions",
    section: "03",
    label: "Prototype evaluation and interaction design",
    question: "After reviewing the prototype, what are your initial impressions of its visual comfort and spatial hierarchy?",
  },
  {
    id: "periphery",
    section: "03",
    label: "Prototype evaluation and interaction design",
    question: "What expectations would an immersive user have when looking around or exploring the periphery of a text-centric application like this?",
  },
  {
    id: "input",
    section: "03",
    label: "Prototype evaluation and interaction design",
    question: "Which input modalities, such as hand tracking, controllers, or eye tracking, would feel most natural for navigating and organizing text forums in this space? Why?",
  },
  {
    id: "use_cases",
    section: "03",
    label: "Prototype evaluation and interaction design",
    question: "In which physical environments or use cases do you foresee people adopting a spatial forum reader?",
  },
  {
    id: "references",
    section: "04",
    label: "Industry benchmarks and final thoughts",
    question: "Are there existing applications, research papers, or design frameworks concerning text legibility or data visualization in VR that you recommend reviewing?",
  },
  {
    id: "additional",
    section: "04",
    label: "Industry benchmarks and final thoughts",
    question: "Please share any additional feedback, structural recommendations, or ideas for improving user comfort in this concept.",
  },
];

function ExpertQuestionnaire() {
  const storageKey = "cosmos-expert-questionnaire-v1";
  const empty = { participant: "", role: "", hours: "", experience: "", reviewed: false, ...Object.fromEntries(expertQuestions.map(item => [item.id, ""])) };
  const [answers, setAnswers] = useState(() => {
    try { return { ...empty, ...JSON.parse(localStorage.getItem(storageKey) || "{}") }; } catch { return empty; }
  });
  const [message, setMessage] = useState("");
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(answers)); }, [answers]);
  const update = (key, value) => setAnswers(current => ({ ...current, [key]: value }));
  const answered = expertQuestions.filter(item => answers[item.id].trim()).length;
  const responseText = () => [
    "COSMOS REMOTE EXPERT QUESTIONNAIRE",
    `Participant code: ${answers.participant || "Not provided"}`,
    `Role / discipline: ${answers.role || "Not provided"}`,
    `Spatial computing hours per week: ${answers.hours || "Not provided"}`,
    `Experience level: ${answers.experience || "Not provided"}`,
    `Prototype reviewed: ${answers.reviewed ? "Yes" : "No"}`,
    "",
    ...expertQuestions.flatMap((item, index) => [`${index + 1}. ${item.question}`, answers[item.id] || "No response", ""]),
  ].join("\n");
  const copyResponses = async () => {
    await navigator.clipboard.writeText(responseText());
    setMessage("Responses copied");
    setTimeout(() => setMessage(""), 1600);
  };
  const downloadResponses = () => {
    const blob = new Blob([responseText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cosmos-expert-response-${answers.participant || "anonymous"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Response file downloaded");
  };
  const reset = () => {
    if (!window.confirm("Clear every saved response on this device?")) return;
    setAnswers(empty);
    localStorage.removeItem(storageKey);
    setMessage("Responses cleared");
  };
  let lastSection = "";
  return <section className="report-section questionnaire-page" id="expert-questionnaire">
    <ChapterLabel number="03.4">Primary research / Remote method</ChapterLabel>
    <div className="questionnaire-shell">
      <header className="questionnaire-intro">
        <p className="eyebrow">Remote expert questionnaire</p>
        <h1>Reading and navigating text in spatial computing</h1>
        <p>This questionnaire collects professional, actionable feedback from UX, UI, XR, and spatial-computing practitioners. Experienced VR users are also welcome to respond.</p>
        <div><span>Estimated time · 15–20 minutes</span><span>10 written questions</span><span>Responses remain on this device</span></div>
      </header>

      <aside className="questionnaire-privacy"><b>Response handling</b><p>This page does not transmit answers to a server. Progress is stored only in this browser. When finished, copy or download the response and return it directly to the researcher.</p></aside>

      <div className="questionnaire-progress"><div><i style={{ width: `${answered / expertQuestions.length * 100}%` }} /></div><span>{answered} of {expertQuestions.length} written questions answered</span></div>

      <form className="expert-form" onSubmit={event => event.preventDefault()}>
        <section className="form-section">
          <header><span>01</span><div><h2>Expert background and context</h2><p>Optional identifiers help the researcher interpret your response without requiring personal information.</p></div></header>
          <div className="form-field-grid">
            <label><span>Participant code or initials <i>Optional</i></span><input value={answers.participant} onChange={event => update("participant", event.target.value)} placeholder="Example: XR-04" /></label>
            <label><span>Role or discipline <i>Optional</i></span><input value={answers.role} onChange={event => update("role", event.target.value)} placeholder="Example: XR interaction designer" /></label>
            <label><span>Spatial computing hours per week</span><input type="number" min="0" step="0.5" value={answers.hours} onChange={event => update("hours", event.target.value)} placeholder="0" /></label>
            <label><span>Experience level</span><select value={answers.experience} onChange={event => update("experience", event.target.value)}><option value="">Select one</option><option>Experienced user</option><option>Student / researcher</option><option>Practitioner, 1–3 years</option><option>Practitioner, 4–7 years</option><option>Practitioner, 8+ years</option></select></label>
          </div>
        </section>

        {expertQuestions.map((item, index) => {
          const showHeading = item.section !== "01" && item.section !== lastSection;
          lastSection = item.section;
          return <React.Fragment key={item.id}>
            {showHeading && <section className="form-section-heading"><span>{item.section}</span><div><h2>{item.label}</h2>{item.section === "03" && <p>Review the early-stage prototype before answering this section.</p>}</div></section>}
            {item.id === "impressions" && <div className="prototype-review-box"><div><b>Cosmos early prototype</b><p>Open the prototype in a separate tab. Explore its layout, movement, controls, and text presentation before continuing.</p><a href="https://cosmosweb.web.app/web/" target="_blank" rel="noreferrer">Open prototype ↗</a></div><label><input type="checkbox" checked={answers.reviewed} onChange={event => update("reviewed", event.target.checked)} /><span>I reviewed the prototype</span></label></div>}
            <label className="question-field"><span className="question-number">{String(index + 1).padStart(2, "0")}</span><b>{item.question}</b><textarea rows="6" value={answers[item.id]} onChange={event => update(item.id, event.target.value)} placeholder="Write your response here…" /></label>
          </React.Fragment>;
        })}

        <footer className="questionnaire-actions"><div><b>{answered === expertQuestions.length ? "Questionnaire complete" : "Your progress is saved locally"}</b><span aria-live="polite">{message}</span></div><button type="button" className="form-button text" onClick={reset}>Clear</button><button type="button" className="form-button secondary" onClick={copyResponses}>Copy responses</button><button type="button" className="form-button primary" onClick={downloadResponses}>Download .txt</button></footer>
      </form>
    </div>
  </section>;
}

function Version1Review() {
  return (
    <section className="report-section interview-report" id="version1-review">
      <ChapterLabel number="03.5">Primary research / Submission & Review</ChapterLabel>
      <article className="report-document interview-document">
        <header className="report-page-intro interview-intro" style={{ borderBottom: "1px solid var(--navy)", paddingBottom: "32px", marginBottom: "32px" }}>
          <p className="eyebrow">SIGGRAPH 2026 Poster Submission & Peer Review</p>
          <h1>COSMOS V1<br /><span>Spatial Discourse Browser for AR, VR, and Desktop</span></h1>
          <p className="report-lead">
            In April 2026, Cosmos Version 1 was submitted as a poster to SIGGRAPH 2026. While the submission was ultimately rejected, the academic peer review process provided an invaluable diagnostic crucible. The detailed critiques on text legibility, cognitive clutter, and the demand for empirical utility became the direct architectural blueprints for the Version 2 study tested with Kris, Yves, and Johnny.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
            <a className="source-link" href="https://cosmosweb.web.app" target="_blank" rel="noreferrer" style={{ margin: 0 }}>
              Launch V1 Live Demo <span>↗</span>
            </a>
            <a className="source-link" href="https://github.com/jin-dalrae/2602-Cosmos/" target="_blank" rel="noreferrer" style={{ margin: 0, borderColor: "var(--pink)", color: "var(--pink)" }}>
              Explore V1 GitHub Repository <span>↗</span>
            </a>
          </div>
        </header>

        <table className="report-table interview-meta" style={{ marginBottom: "40px" }}>
          <tbody>
            <tr><th>Title</th><td>COSMOS: Spatial Discourse Browser for AR, VR, and Desktop</td><th>Author</th><td>Rae Jin (dalrae.jin.work@gmail.com)</td></tr>
            <tr><th>Submission</th><td>SIGGRAPH 2026 Poster (Rejected)</td><th>Date</th><td>April 21, 2026</td></tr>
            <tr><th>Core Paradigm</th><td>3D Planetarium spherical discussion mapping</td><th>Key Technology</th><td>Five-Agent AI Pipeline & GazeLearner Engine</td></tr>
            <tr><th>Evidence Status</th><td colSpan="3">Comprehensive functional prototype + 3 peer-review expert panels. Direct lineage to V2.</td></tr>
          </tbody>
        </table>

        <nav className="report-contents" aria-label="Version 1 report contents">
          <p>In this report</p>
          <a href="#v1-problem"><span>0</span>The original problem & pitch</a>
          <a href="#v1-pipeline"><span>1</span>The 5-Agent AI pipeline</a>
          <a href="#v1-coordinates"><span>2</span>Spherical coordinate encoding</a>
          <a href="#v1-input"><span>3</span>Input paradigm & GazeLearner</a>
          <a href="#v1-reviews"><span>4</span>SIGGRAPH peer reviews verbatim</a>
          <a href="#v1-pivot"><span>5</span>Strategic pivot responses</a>
        </nav>

        <section className="report-chapter" id="v1-problem">
          <span className="report-number">0</span>
          <h2>The original problem & pitch</h2>
          <p className="report-lead">Every major community platform flattens multi-threaded public debate into a single linear post-after-another feed, erasing the topology of discussion.</p>
          <p>
            Whether it is Reddit, X, HackerNews, or Discord, feeds decide the sequence of what you read. Readers have zero agency, decision fatigue is high, and polarization accelerates because sorted lists surface the loudest, most extreme voices. 500-comment threads have complex structure: worldviews, bridges, gaps, and logical trajectories, but flat feeds reduce them to a stream of noise.
          </p>
          <p>
            Cosmos Version 1 proposed an elegant solution: <b>stand inside the conversation and navigate it with your body.</b>
          </p>
          <div className="report-table-scroll"><table className="report-table">
            <thead>
              <tr><th>Feed Limitation</th><th>Cosmos Spatial Answer</th></tr>
            </thead>
            <tbody>
              <tr><td><b>Flatten everything into one stream</b></td><td><b>Infinite dimensions:</b> A sphere has every direction. Curiosity determines the reading sequence.</td></tr>
              <tr><td><b>Hide the landscape</b></td><td><b>Topics become places:</b> Diverse discussion clusters self-organize in space, connected by bridge posts.</td></tr>
              <tr><td><b>Reward extremes</b></td><td><b>Nuance as physical space:</b> Worldview clustering places opposing ideas at opposite sides of the dome, rendering gaps visible.</td></tr>
              <tr><td><b>Exhaust readers</b></td><td><b>Passive Gaze Selection:</b> Eliminates manual point-and-click fatigue via continuous body and head coordination.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section className="report-chapter" id="v1-pipeline">
          <span className="report-number">1</span>
          <h2>The 5-Agent AI pipeline</h2>
          <p className="report-lead">To transform raw, unstructured discourse into a coherent physical planetarium, Cosmos V1 developed a structured multi-agent backend pipeline.</p>
          <p>
            This pipeline doesn't just display data; it extracts semantic dimensions to coordinate the physical geometry of the discussion:
          </p>
          <div className="masking-diagram" style={{ margin: "24px 0", padding: "24px", background: "rgba(10, 25, 47, 0.3)", borderRadius: "8px", border: "1px solid var(--navy)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
              <div style={{ padding: "8px 12px", border: "1px dashed var(--pink)", borderRadius: "4px", fontSize: "11px", color: "var(--pink)" }}>Topic Input</div>
              <div style={{ fontSize: "14px", color: "var(--mint)" }}>→</div>
              <div style={{ padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" }}><b>[1] Generator</b><br /><span style={{ fontSize: "10px", color: "var(--slate)" }}>150+ diverse voices</span></div>
              <div style={{ fontSize: "14px", color: "var(--mint)" }}>→</div>
              <div style={{ padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" }}><b>[2] Cartographer</b><br /><span style={{ fontSize: "10px", color: "var(--slate)" }}>Extracts stance & metadata</span></div>
              <div style={{ fontSize: "14px", color: "var(--mint)" }}>→</div>
              <div style={{ padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" }}><b>[3] Architect</b><br /><span style={{ fontSize: "10px", color: "var(--slate)" }}>Computes 3D coordinates</span></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px", marginTop: "12px", borderTop: "1px solid var(--navy)", paddingTop: "12px" }}>
              <div style={{ padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" }}><b>[4] Classifier</b><br /><span style={{ fontSize: "10px", color: "var(--slate)" }}>Slots new user posts in real-time</span></div>
              <div style={{ padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" }}><b>[5] Narrator</b><br /><span style={{ fontSize: "10px", color: "var(--slate)" }}>Answers meta-questions on topology</span></div>
            </div>
          </div>
          <h3>Cartographer Enrichment Profile</h3>
          <p>The Cartographer enriches every post with structural metadata. The resulting schema represents a rich semantic envelope that determines card layout, edge connections, and position hints:</p>
          <pre style={{ background: "rgba(10, 25, 47, 0.4)", border: "1px solid var(--navy)", padding: "16px", borderRadius: "8px", overflowX: "auto", fontSize: "12px", color: "var(--mint)" }}>
{`{
  "id": "post_42",
  "stance": "pro-density-housing",
  "emotion": "passionate",
  "core_claim": "Rent control helps current tenants but discourages new construction",
  "assumptions": ["Free market principles produce optimal housing volume"],
  "logical_chain": {
    "builds_on": ["post_17"],
    "root_premise": "Markets self-correct under supply-side freedom"
  },
  "perceived_by": {
    "renters": "dismissive",
    "developers": "economically sound"
  },
  "relationships": [
    { "target": "post_17", "type": "extends", "strength": 0.95 },
    { "target": "post_31", "type": "rebuts", "strength": 0.88 }
  ],
  "embedding_hint": [0.35, 0.71, -0.18]
}`}
          </pre>
        </section>

        <section className="report-chapter" id="v1-coordinates">
          <span className="report-number">2</span>
          <h2>Spherical coordinate encoding</h2>
          <p className="report-lead">In Cosmos V1, spatial positions are not arbitrary. Visual locations on the planetarium dome directly represent underlying ideological spectrums and levels of conceptual abstraction.</p>
          <p>
            By converting high-dimensional embeddings into a constrained 3D spherical shell, the coordinate map establishes semantic axes:
          </p>
          <div className="report-table-scroll"><table className="report-table report-table-wide">
            <thead>
              <tr><th>Sphere Dimension</th><th>Technical Coordinate</th><th>Semantic Representation</th><th>Implementation Details</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Longitude Spectrum</b></td>
                <td><code>\(\theta\) (theta_deg)</code></td>
                <td>Ideological spectrum and opposing viewpoints.</td>
                <td>Opposing worldviews are mapped to polar opposites ($180^\circ$ apart) across the horizontal equator.</td>
              </tr>
              <tr>
                <td><b>Latitude Abstraction</b></td>
                <td><code>\(\phi\) (phi_deg)</code></td>
                <td>Level of conceptual and systemic abstraction.</td>
                <td>Personal accounts sit near the equator (90 degrees); structural or systemic academic papers move toward the poles. Clamped to 30 to 150 degrees to prevent card collision at the poles.</td>
              </tr>
              <tr>
                <td><b>Radius Offset</b></td>
                <td><code>r_offset</code></td>
                <td>Fine depth adjustment and local layering.</td>
                <td>Adjusted within ±5% of the sphere's core radius to minimize card overlap and accommodate dense groupings.</td>
              </tr>
              <tr>
                <td><b>Ideological Clustering</b></td>
                <td>Local coordinate density</td>
                <td>Shared assumptions and worldviews.</td>
                <td>Cards sharing identical baseline assumptions group into high-density neighborhoods, rendering clusters immediately visible.</td>
              </tr>
              <tr>
                <td><b>Visual Gaps</b></td>
                <td>Empty surface coordinates</td>
                <td>Missing points of view and unexplored debate territory.</td>
                <td>Unpopulated coordinate zones highlight gaps in the conversational spectrum.</td>
              </tr>
              <tr>
                <td><b>Constellation Edges</b></td>
                <td>3D straight line cylinders</td>
                <td>Semantic discourse relationships.</td>
                <td>Bridges of connection (agrees, disagrees, extends, challenges) are drawn through the sphere interior as glowing color-coded links.</td>
              </tr>
            </tbody>
          </table></div>
        </section>

        <section className="report-chapter" id="v1-input">
          <span className="report-number">3</span>
          <h2>Input paradigm & GazeLearner</h2>
          <p className="report-lead">To reduce physical strain, Cosmos V1 introduced GazeLearner: a zero-calibration, passive eye-head coordination tracking engine.</p>
          <p>
            Rather than requiring a tedious 9-dot setup cycle before usage, GazeLearner silently trains itself during ordinary browsing actions:
          </p>
          <ul>
            <li><b>1. Initial Steering:</b> The reader rotates the sphere using basic head-pose tracking (driven via MediaPipe at 60fps) or drag gestures.</li>
            <li><b>2. Natural Ground Truth:</b> Every time the reader clicks a card, the system records the head-pose direction and card orientation as a ground-truth calibration sample.</li>
            <li><b>3. Linear Regression:</b> Once 5 clicks are completed, the system initializes weighted linear regression calculations to dynamically adjust the raw head-tracking vectors.</li>
            <li><b>4. Full Calibrated Confidence:</b> By 20 clicks, the model reaches full calibration confidence. It employs an exponential time decay (60-second half-life) to favor recent posture shifts.</li>
            <li><b>5. Reading Protection Shield:</b> To avoid accidental card changes from rapid eye movements, the system filters out small reading scan motions and blocks targeting behind open articles.</li>
          </ul>
          <aside className="report-note">
            <b>Temporal Depth and Dimming</b><p>As discussions age, they recede back into the starfield. Cosmos V1 maps posts into equal chronological slots. Focal items are fully illuminated, while older layers dim down to 60% via CSS <code>brightness()</code>, forming a visual history trail.</p>
          </aside>
        </section>

        <section className="report-chapter" id="v1-reviews">
          <span className="report-number">4</span>
          <h2>SIGGRAPH 2026 poster peer reviews</h2>
          <p className="report-lead">The submission to SIGGRAPH 2026 received rigorous, direct feedback from three expert peer reviewers. Their assessments identified crucial limitations in visual legibility, visual clutter, and the demand for empirical validation.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", margin: "24px 0" }} className="expert-cons-grid">
            <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--pink)", fontWeight: "700" }}>Reviewer 1</span>
              <h3 style={{ margin: "8px 0", color: "var(--pink)", fontFamily: "var(--serif)" }}>"Strong & imaginative, but cluttered"</h3>
              <p style={{ fontSize: "13px", color: "var(--slate)" }}>
                Highly praised the originality of standing inside a conversation. However, raised serious readability issues:
              </p>
              <ul style={{ fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" }}>
                <li>Distant and faded cards are blurry and hard to read, especially on non-Retina screens.</li>
                <li>High cognitive load: "Too many cards competing for attention... non-focal items should fade, blur, or move further back."</li>
                <li>Lack of reading progress indicators (what is read, unread, or new).</li>
                <li>"AI black box" - users have no mechanism to inspect, verify, or correct stance, emotion, or assumptions.</li>
              </ul>
            </div>
            
            <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--mint)", fontWeight: "700" }}>Reviewer 2</span>
              <h3 style={{ margin: "8px 0", color: "var(--mint)", fontFamily: "var(--serif)" }}>"High originality, venue mismatch"</h3>
              <p style={{ fontSize: "13px", color: "var(--slate)" }}>
                Acknowledged extremely high novelty and an artistic, genuinely distinctive perspective.
              </p>
              <ul style={{ fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" }}>
                <li>Noted that the project proposes a highly valuable and interesting conceptual leap.</li>
                <li>Stressed a venue mismatch: SIGGRAPH reviewers skew heavily towards core computer graphics algorithms (geometric shaders, ray tracing) rather than novel reading layouts and interactive social computing.</li>
              </ul>
            </div>
            
            <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--yellow)", fontWeight: "700" }}>Reviewer 3</span>
              <h3 style={{ margin: "8px 0", color: "var(--yellow)", fontFamily: "var(--serif)" }}>"Unproven utility & unremarkable"</h3>
              <p style={{ fontSize: "13px", color: "var(--slate)" }}>
                Delivered a highly critical evaluation of the technical and visual implementation:
              </p>
              <ul style={{ fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" }}>
                <li>Evaluated the visuals as "unremarkable" standard CSS-Three.js HTML sprites, lacking deep computer graphics sophistication.</li>
                <li>Challenged the five-agent pipeline as unnecessary, over-engineered prompting.</li>
                <li>Noted that while VR/AR support was claimed, it was not demonstrably working in the submitted video materials.</li>
                <li><b>Severe gap:</b> Complete lack of human-subjects evaluation. "Is a spatial list actually better or faster for reading than a 2D feed?"</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="report-chapter" id="v1-pivot">
          <span className="report-number">5</span>
          <h2>Strategic pivot responses: Designing V2</h2>
          <p className="report-lead">Rather than seeing the rejection as a setback, the criticisms became the direct catalyst for Cosmos Version 2, turning unproven hypotheses into a rigorous, human-centered study.</p>
          <div className="report-table-scroll"><table className="report-table report-table-wide">
            <thead>
              <tr><th>SIGGRAPH Peer Critique</th><th>Pivot Strategy for Version 2</th><th>Implemented V2 Design Proof</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>R1: Distant cards are unreadable and blurry</b></td>
                <td><b>Strict physical depth boundaries</b></td>
                <td>Constrained depth layout to comfortable 1.5–2.0m zone, ensuring text remains within human subpixel-AA limits.</td>
              </tr>
              <tr>
                <td><b>R1: Excessive visual noise & cognitive load</b></td>
                <td><b>Focus plus Context (Achromatic Voids)</b></td>
                <td>When an item is opened, the surrounding sphere dims, applies light Gaussian blur, and translates deeper into the background.</td>
              </tr>
              <tr>
                <td><b>R1: No reading progress cues</b></td>
                <td><b>Persistent reading states</b></td>
                <td>Integrated localStorage-backed read/unread states, visually fading completed posts while highlighting newly arriving items.</td>
              </tr>
              <tr>
                <td><b>R1: "AI black-box" & trust skepticism</b></td>
                <td><b>Absolute Source Provenance</b></td>
                <td>Elevated raw sources. Every summary tag and stance categorization has a double-click inspector tracing directly back to original human text.</td>
              </tr>
              <tr>
                <td><b>R3: AR/VR support claimed but not demonstrated</b></td>
                <td><b>Native WebXR integration</b></td>
                <td>Completed full WebXR camera integrations allowing Quest 3 and Vision Pro browsers to drive spatial viewing with zero external dependencies.</td>
              </tr>
              <tr>
                <td><b>R3: Complete lack of user evaluation</b></td>
                <td><b>Empirical qualitative user studies</b></td>
                <td>Designed and conducted in-depth think-aloud studies with Software Engineer Kris, 3D Artist Yves, and Designer Johnny to measure legibility, trust, and fatigue.</td>
              </tr>
            </tbody>
          </table></div>
          
          <div className="cosmos-implication" style={{ marginTop: "40px" }}>
            <span>The Core Trajectory</span>
            <h2>From graphics novelty to reading ergonomics.</h2>
            <p style={{ margin: 0 }}>
              SIGGRAPH's feedback forced Cosmos to mature. By moving away from purely "novel 3D visualizations" and focusing on the <b>hard, human physical constraints of reading in VR</b>, the project shifted its core metric of success: away from visual flash, and toward long-term visual comfort and absolute semantic trust.
            </p>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px", borderTop: "1px solid var(--navy)", paddingTop: "24px" }}>
            <a href="/cosmos/primary/expert-questionnaire/" className="text-link" style={{ fontSize: "14px" }}>← Previous: Expert questionnaire</a>
            <a href="/cosmos/making/" className="text-link" style={{ fontSize: "14px" }}>Next: Making Cosmos →</a>
          </div>
        </section>
      </article>
    </section>
  );
}

function App() {

  const secondaryPage = window.location.pathname.includes("/secondary/spatial-communications")
    ? "spatial-audio"
    : window.location.pathname.includes("/secondary/memory-pods")
      ? "memory-pods"
      : window.location.pathname.includes("/secondary/socially-late")
        ? "socially-late"
        : window.location.pathname.includes("/secondary/vr-reading")
          ? "vr-reading"
          : "overview";
  const primaryPage = window.location.pathname.includes("/primary/interview-kris")
    ? "interview-kris"
    : window.location.pathname.includes("/primary/interview-yves")
      ? "interview-yves"
      : window.location.pathname.includes("/primary/interview-johnny")
        ? "interview-johnny"
      : window.location.pathname.includes("/primary/expert-questionnaire")
        ? "expert-questionnaire"
      : window.location.pathname.includes("/primary/version1-review")
        ? "version1-review"
        : "overview";
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
      <CosmosSidebar active={activeChapter} subActive={activeChapter === "secondary" ? secondaryPage : activeChapter === "primary" ? primaryPage : undefined} />

      <main>
        {activeChapter === "primary" && primaryPage === "expert-questionnaire" && <ExpertQuestionnaire />}
        {activeChapter === "primary" && primaryPage === "version1-review" && <Version1Review />}
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

          <article className="report-document">
            <nav className="report-contents" aria-label="Introduction contents">
              <p>In this report</p>
              <a href="#summary"><span>0</span>Executive summary</a>
              <a href="#audit"><span>1</span>Research audit</a>
              <a href="#direction"><span>2</span>Research direction</a>
              <a href="#questions"><span>3</span>Research questions</a>
              <a href="#strategy"><span>4</span>Wall-first strategy</a>
              <a href="#evidence"><span>5</span>Evidence matrix</a>
              <a href="#next"><span>6</span>Research still needed</a>
            </nav>

            <section className="report-chapter" id="summary">
              <span className="report-number">0</span>
              <h2>Executive summary</h2>
              <p className="report-lead">Cosmos is a research project about whether asynchronous online community can become easier to understand when discussion is organized as a place rather than a feed.</p>
              <p>The project was initially framed as a spatial discourse browser and an alternative to headset doomscrolling. That framing identified a broad problem but did not sufficiently explain why spatial interaction was necessary, which existing behavior the product should preserve, or how Cosmos differed from social VR, an AI summary, or a conventional feed placed in 3D.</p>
              <p>The research direction changed after examining offline bulletin boards, poster walls, sticky-note walls, and other public message surfaces. These environments already support asynchronous community. Messages accumulate over time; people read by moving, scanning, and approaching; position and density become signals; and participation remains possible without requiring immediate speech or posting.</p>
              <p>The resulting proposal is narrower: Cosmos should begin as a VR reconstruction of an offline asynchronous community wall. Existing discussions may provide seed material, but the product metaphor is the wall—not the feed and not the live room.</p>
              <aside className="report-note"><b>Current conclusion</b><p>Cosmos is not validated yet, but it is now researchable. A comparative study can test whether a VR community wall improves comprehension, reading comfort, source inspection, and place memory relative to a flat feed.</p></aside>
            </section>

            <section className="report-chapter" id="audit">
              <span className="report-number">1</span>
              <h2>Research audit</h2>
              <h3>Is the direction correct?</h3>
              <p>Yes, but the reason changed. The earlier concept assumed that feeds were unpleasant and that spatial browsing might provide an alternative. The updated direction begins with a more specific precedent: offline communities already use spatial surfaces for low-pressure asynchronous participation.</p>
              <p>This changes the design question. Cosmos is no longer asking how to make a feed immersive. It asks which useful properties of a physical community wall can survive translation into VR, mixed reality, and desktop interaction.</p>
              <h3>What was missing from the earlier concept?</h3>
              <ul>
                <li>Evidence that reading without posting is a meaningful form of participation rather than inactivity.</li>
                <li>A clear reason to use bulletin boards, poster walls, and note walls as the primary design reference.</li>
                <li>A testable account of how spatial layout supports comprehension rather than decoration.</li>
                <li>A boundary between asynchronous spatial browsing and voice-forward social VR.</li>
                <li>A market argument explaining what Reddit, Discord, VRChat, spatial windows, and AI summaries do not solve.</li>
                <li>A strategy for testing the wall before attempting to build a new community platform.</li>
                <li>Measures that could invalidate the concept if the spatial wall does not outperform a flat-feed baseline.</li>
              </ul>
            </section>

            <section className="report-chapter" id="direction">
              <span className="report-number">2</span>
              <h2>Research direction</h2>
              <p>Cosmos should be researched as a VR reconstruction of offline asynchronous community walls: bulletin boards, poster walls, sticky-note walls, and public message surfaces. It is not a headset-only social world, a new community platform on day one, or a live spatial voice room.</p>
              <blockquote className="report-quote">Offline communities already use spatial surfaces for asynchronous participation. Cosmos tests whether VR can rebuild that wall-like behavior while preserving low pressure, source inspection, and place memory.</blockquote>
              <h3>What the wall contributes</h3>
              <p>A physical wall exposes the shape of participation without requiring a ranking algorithm. Density shows where attention has accumulated. Proximity suggests relationship. Layering records time and contestation. Material differences help readers distinguish voices. Movement lets people alternate between scanning the whole and reading a particular message closely.</p>
              <figure className="report-figure">
                <div><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png" alt="A person reading a dense public poster wall" /><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png" alt="A public wall covered in accumulated handwritten notes" /><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png" alt="A community wall with pinned house-shaped notes" /></div>
                <figcaption><span>Figure 1</span> Offline walls are asynchronous, spatial, persistent, public, and readable without contribution. The prototype should test which of these properties remain useful in a digital environment.</figcaption>
              </figure>
              <h3>Core hypothesis</h3>
              <p>The primary hypothesis is not that immersion is inherently better. It is that position, distance, density, and movement may provide usable orientation cues for a complex discussion.</p>
              <aside className="report-note report-note-yellow"><b>Comparative question</b><p>Can people understand and remember an asynchronous discussion more comfortably in a VR community wall than in a flat feed?</p></aside>
              <h3>Device scope</h3>
              <table className="report-table">
                <thead><tr><th>Device mode</th><th>Role in the research</th></tr></thead>
                <tbody>
                  <tr><td>Desktop</td><td>Broad access, baseline usability, and the flat-feed comparison condition.</td></tr>
                  <tr><td>Quest 3 / mixed reality</td><td>Immersive spatial browsing, embodied navigation, and reading-comfort testing.</td></tr>
                  <tr><td>Vision Pro</td><td>Spatial reading, gaze and focus behavior, and window/card layout.</td></tr>
                  <tr><td>Smart-glasses direction</td><td>Glanceable labels, saved paths, alerts, and lightweight resurfacing—not deep reading.</td></tr>
                </tbody>
              </table>
            </section>

            <section className="report-chapter" id="questions">
              <span className="report-number">3</span>
              <h2>Research questions</h2>
              <table className="report-table report-table-questions">
                <thead><tr><th>Research question</th><th>What the study needs to learn</th></tr></thead>
                <tbody>
                  <tr><td>What do users want?</td><td>Whether the need is low-pressure reading, debate sensemaking, place memory, wall-like contribution, or simply faster summaries.</td></tr>
                  <tr><td>What should Cosmos preserve from offline walls?</td><td>Which qualities matter: density, layering, proximity, handwriting and materiality, return paths, publicness, or social permission.</td></tr>
                  <tr><td>What is already offered in the market?</td><td>How forums, chat platforms, social VR, spatial operating systems, smart glasses, and AI summarizers divide the problem.</td></tr>
                  <tr><td>What should Cosmos become?</td><td>Whether it should remain a wall/browser or eventually justify a native community platform.</td></tr>
                  <tr><td>What role should live audio have?</td><td>Whether spatial voice belongs only as optional later co-presence after asynchronous browsing proves valuable.</td></tr>
                  <tr><td>Which interactions are worth testing?</td><td>Wall browsing, labels, source inspection, missing-voice surfacing, saved paths, and cross-device continuity.</td></tr>
                  <tr><td>What evidence would validate the concept?</td><td>A measurable improvement in comprehension, comfort, trust, or place memory against a controlled flat-feed baseline.</td></tr>
                </tbody>
              </table>
            </section>

            <section className="report-chapter" id="strategy">
              <span className="report-number">4</span>
              <h2>Current recommendation: wall first, platform later</h2>
              <p>Cosmos should begin with a controlled, permission-cleared message wall using participant-created notes, class or community discussions, research comments, or synthetic datasets. The first release does not need to host a complete native community.</p>
              <p>This sequence isolates the project’s distinctive claim. Hosting posts is not novel; the relevant question is whether a spatial public surface creates comprehension, orientation, and return value that existing feeds do not.</p>
              <ol>
                <li><b>Control the initial content.</b> Avoid a platform cold start and make the comparison reproducible.</li>
                <li><b>Prove wall browsing.</b> Test density, clustering, source inspection, and place memory before adding social layers.</li>
                <li><b>Add personal continuity.</b> Introduce saved paths, annotations, collected regions, and return-to-place behavior.</li>
                <li><b>Add light contribution.</b> Let people leave notes, ask questions, and identify missing voices without requiring live presence.</li>
                <li><b>Consider native community or spatial voice later.</b> Add infrastructure only when the wall provides a demonstrated reason to return.</li>
              </ol>
              <table className="report-table">
                <thead><tr><th>Phase</th><th>Strategy</th><th>Goal</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Controlled VR message wall</td><td>Test comprehension, comfort, trust, and place memory.</td></tr>
                  <tr><td>2</td><td>Personal actions</td><td>Support saving, annotating, comparing, and returning.</td></tr>
                  <tr><td>3</td><td>Light wall contribution</td><td>Test participation without live-room pressure.</td></tr>
                  <tr><td>4</td><td>Native community or engineered voice</td><td>Proceed only if earlier phases establish sustained value.</td></tr>
                </tbody>
              </table>
            </section>

            <section className="report-chapter" id="evidence">
              <span className="report-number">5</span>
              <h2>Evidence matrix</h2>
              <p>The current evidence supports a research program, not a product conclusion. Each claim below remains linked to a specific primary-research requirement.</p>
              <div className="report-table-scroll"><table className="report-table report-table-wide">
                <thead><tr><th>Claim</th><th>Current strength</th><th>Current basis</th><th>What still needs testing</th></tr></thead>
                <tbody>
                  <tr><td>Offline async community already has spatial form</td><td>Strong design-reference support</td><td>Poster walls, bulletin boards, and public note walls</td><td>Field observation and prototype translation</td></tr>
                  <tr><td>Reading without posting is meaningful behavior</td><td>Strong literature support</td><td>Lurking and participation-inequality research</td><td>Interviews with the target audience</td></tr>
                  <tr><td>Feeds make structure difficult to see</td><td>Moderate support</td><td>Feed fatigue and information-overload research</td><td>Flat feed versus Cosmos task comparison</td></tr>
                  <tr><td>Voice-forward social VR can create pressure</td><td>Moderate support</td><td>Social VR research and public user discourse</td><td>Interviews with social VR users</td></tr>
                  <tr><td>Spatial layout may support sensemaking</td><td>Moderate theory support</td><td>Spatial hypertext, information foraging, and visual sensemaking</td><td>Comprehension and place-memory testing</td></tr>
                  <tr><td>Headset text comfort is fragile</td><td>Strong support</td><td>VR interface, reading, and cybersickness research</td><td>Testing on real devices</td></tr>
                  <tr><td>AI summaries need source inspection</td><td>Strong technical support</td><td>Summarization consistency and AI-trust research</td><td>Source-trace and correction tasks</td></tr>
                  <tr><td>Wall-first is the right strategy</td><td>Strategic inference</td><td>Reference model, platform cold-start logic, and content rights</td><td>User preference, return intent, and expert review</td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="next">
              <span className="report-number">6</span>
              <h2>Research still needed</h2>
              <h3>Literature review</h3>
              <p>Expand the review of non-public participation, offline message walls, social media fatigue, information foraging, spatial memory, VR reading comfort, spatial communications, and trustworthy AI summaries.</p>
              <h3>Competitive analysis</h3>
              <p>Compare Reddit, Discord, argument-mapping tools, VRChat, VIVERSE, Vision Pro browsing, AI answer engines, and research-synthesis tools using the same criteria: orientation, pressure, source visibility, comfort, and return behavior.</p>
              <h3>Primary research</h3>
              <ul>
                <li>Six comparative user tests using the same discussion in a flat feed and VR wall.</li>
                <li>Three to five expert interviews across XR, online community, moderation, and spatial communication.</li>
                <li>A survey of 30–50 early respondents, followed by interviews with quiet readers and XR users.</li>
                <li>Two or three observations of physical community walls or recreated note-wall sessions.</li>
                <li>An optional later test of ambient co-presence or spatial audio after asynchronous wall browsing works.</li>
              </ul>
              <aside className="report-note"><b>Decision rule</b><p>If spatial layout does not improve comprehension, comfort, trust, or place memory relative to a flat feed, Cosmos should not add more immersive or social complexity.</p></aside>
              <div className="report-next-links"><a href="/cosmos/secondary/">Continue to secondary research <span>→</span></a><a href="/cosmos/primary/">Review the primary study plan <span>→</span></a></div>
            </section>
          </article>
        </section>}

        {activeChapter === "secondary" && secondaryPage === "overview" && <section className="report-section secondary" id="secondary">
          <ChapterLabel number="02">Secondary research</ChapterLabel>
          <article className="report-document secondary-document">
            <header className="report-page-intro">
              <p className="eyebrow">Evidence synthesis</p>
              <h1>The feed is optimized for momentum. The wall is optimized for orientation.</h1>
              <p>This review examines whether existing research supports the central Cosmos proposition: that an asynchronous discussion can become easier to understand when its structure is spatial, persistent, and readable without pressure to contribute.</p>
            </header>

            <nav className="report-contents" aria-label="Secondary research contents">
              <p>In this report</p>
              <a href="#secondary-method"><span>0</span>Scope and method</a>
              <a href="#secondary-map"><span>1</span>Evidence map</a>
              <a href="#secondary-walls"><span>2</span>Offline community walls</a>
              <a href="#secondary-reading"><span>3</span>Quiet reading</a>
              <a href="#secondary-space"><span>4</span>Spatial communication</a>
              <a href="#secondary-market"><span>5</span>Market landscape</a>
              <a href="#secondary-xr"><span>6</span>XR reading and devices</a>
              <a href="#secondary-ai"><span>7</span>AI and source trust</a>
              <a href="#secondary-synthesis"><span>8</span>Synthesis</a>
              <a href="#secondary-gaps"><span>9</span>Evidence gaps</a>
            </nav>

            <section className="report-chapter" id="secondary-method">
              <span className="report-number">0</span>
              <h2>Scope and method</h2>
              <p className="report-lead">The secondary research tests the assumptions behind Cosmos before the project commits to a platform, interaction model, or hardware-specific implementation.</p>
              <p>The review combines research on online participation, social media fatigue, information foraging, spatial memory, VR interface comfort, trustworthy AI summarization, and large-scale spatial communications. It also uses offline message walls as design references and compares adjacent products across forums, chat, social VR, spatial computing, structured debate, and AI synthesis.</p>
              <p>Evidence is evaluated by strength and by relevance. A strong adjacent finding does not automatically validate Cosmos. For example, spatial audio research demonstrates that location cues can help attention, but it does not prove that a spatial message wall improves reading comprehension. Those claims remain separate.</p>
              <aside className="report-note"><b>Review standard</b><p>Each evidence cluster must produce a limited conclusion, a product implication, and a primary-research question. The review does not treat conceptual fit as validation.</p></aside>
            </section>

            <section className="report-chapter" id="secondary-map">
              <span className="report-number">1</span>
              <h2>Evidence map</h2>
              <p>The review supports eight working conclusions. Their evidence strength varies, and several depend on direct comparative testing.</p>
              <div className="report-table-scroll"><table className="report-table report-table-wide">
                <thead><tr><th>Evidence cluster</th><th>Working conclusion</th><th>Strength</th><th>Primary research required</th></tr></thead>
                <tbody>
                  <tr><td>Offline community walls</td><td>Rebuild the wall, not the feed.</td><td>Strong design-reference support</td><td>Observe wall use and test translation into VR.</td></tr>
                  <tr><td>Non-posting participation</td><td>Design for quiet readers first.</td><td>Strong literature support</td><td>Interview the intended audience.</td></tr>
                  <tr><td>Feed and algorithm fatigue</td><td>Provide orientation rather than another ranking system.</td><td>Moderate support</td><td>Compare task performance against a flat feed.</td></tr>
                  <tr><td>Spatial communications</td><td>Use spatial attention cues; defer live voice.</td><td>Strong adjacent technical support</td><td>Test async spatial browsing before co-presence.</td></tr>
                  <tr><td>XR reading comfort</td><td>Reading comfort is a product requirement.</td><td>Strong support</td><td>Test typography and navigation on real devices.</td></tr>
                  <tr><td>Device landscape</td><td>Cosmos must be cross-device.</td><td>Strong market support</td><td>Match tasks to desktop, headset, and glasses modes.</td></tr>
                  <tr><td>AI summarization</td><td>Every generated label needs a source trail.</td><td>Strong technical support</td><td>Run source-trace and correction tasks.</td></tr>
                  <tr><td>Product strategy</td><td>Prove the VR wall before building a platform.</td><td>Strategic inference</td><td>Measure preference, return intent, and contribution behavior.</td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="secondary-walls">
              <span className="report-number">2</span>
              <h2>Offline community walls are the primary reference model</h2>
              <p>Bulletin boards, poster walls, sticky-note walls, and public message surfaces are asynchronous community systems. Participants contribute at different times, while readers encounter the accumulated material later. The wall does not require everyone to be present or speaking together.</p>
              <p>These surfaces are also spatial. Placement, density, repetition, proximity, material difference, and layering contribute to meaning. Readers alternate between scanning the whole wall and moving closer to inspect a particular item. They can return to a remembered location even when they cannot recall an exact title or author.</p>
              <p>The most relevant property is social permission. Reading is a legitimate activity; adding a note is optional. The community remains perceptible through its traces without requiring a performance of participation.</p>
              <figure className="report-figure">
                <div><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png" alt="Dense public poster wall" /><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png" alt="Public wall covered with handwritten notes" /><img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png" alt="Curated community note wall" /></div>
                <figcaption><span>Figure 1</span> Three wall conditions: dense informational display, accumulated public contribution, and curated community messages. Each makes participation visible through spatial arrangement.</figcaption>
              </figure>
              <aside className="report-note report-note-yellow"><b>Implication for Cosmos</b><p>The prototype should preserve scanning, density, adjacency, optional contribution, and return-to-place behavior. Internet threads may provide content, but they should not determine the interaction metaphor.</p></aside>
            </section>

            <section className="report-chapter" id="secondary-reading">
              <span className="report-number">3</span>
              <h2>Quiet reading is meaningful participation</h2>
              <p>Research on online community participation challenges the assumption that people who do not post are inactive. Readers may learn the group’s norms, gather information, avoid poor group dynamics, or simply have no need to contribute publicly. Non-posting can be strategic and sustained.</p>
              <p>Preece, Nonnecke, and Andrews analyzed 1,188 responses from 375 MSN bulletin-board communities. Their findings show that reading without posting can reflect intentional participation rather than disengagement.</p>
              <p className="report-source"><span>Source</span><a href="https://www.sciencedirect.com/science/article/abs/pii/S0747563203000876" target="_blank" rel="noreferrer">Preece, Nonnecke, and Andrews, “The top five reasons for lurking” ↗</a></p>
              <h3>What this changes</h3>
              <p>Cosmos should not use posting rate as its first success metric. The more relevant measures are comprehension, comfort, source recall, return intent, and whether readers can locate competing positions or missing voices.</p>
              <aside className="report-note"><b>Open question</b><p>Does a spatial wall make quiet reading feel more oriented and socially legitimate, or does the immersive environment create a new form of pressure?</p></aside>
            </section>

            <section className="report-chapter" id="secondary-space">
              <span className="report-number">4</span>
              <h2>Spatial communication supports the attention premise, with an important boundary</h2>
              <p>Paul Boustead’s presentation for Dolby IO explains how spatial separation helps listeners focus within overlapping conversation. The brain uses phase, volume, direction, and distance cues to separate speakers—a mechanism described as spatial release from masking.</p>
              <p>The same presentation documents the systems complexity required to deliver this effect at scale: speaker selection, broad attenuation ranges, server-side mixing, noise and echo suppression, voice-activity detection, gain leveling, spatial codecs, and low-latency client rendering.</p>
              <p>The finding supports a narrow conclusion. Space can carry useful attention cues. It does not follow that Cosmos should begin as a live voice environment.</p>
              <aside className="report-note report-note-yellow"><b>Implication for Cosmos</b><p>Apply spatial attention to asynchronous message browsing first. Evaluate optional ambient presence or spatial audio only after the wall produces measurable reading value.</p></aside>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", margin: "28px 0" }}>
                <a className="report-subreport-link" href="/cosmos/secondary/spatial-communications/" style={{ margin: 0 }}><span>Detailed report 02.1</span><b>Spatial Communications at Scale in Virtual Environments</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/secondary/memory-pods/" style={{ margin: 0 }}><span>Detailed report 02.2</span><b>MemoryPods: Enhancing Asynchronous Communication in Extended Reality</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/secondary/socially-late/" style={{ margin: 0 }}><span>Detailed report 02.3</span><b>Socially Late, Virtually Present: Transforming Asynchronous Social VR (Stanford)</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/secondary/vr-reading/" style={{ margin: 0 }}><span>Detailed report 02.4</span><b>Reading in VR: Customizing Your Reading Experience (HTC VIVE)</b><i>Read analysis →</i></a>
              </div>
            </section>

            <section className="report-chapter" id="secondary-market">
              <span className="report-number">5</span>
              <h2>The market offers parts of the experience, not the whole model</h2>
              <table className="report-table">
                <thead><tr><th>Product category</th><th>What it offers</th><th>What remains missing</th></tr></thead>
                <tbody>
                  <tr><td>Offline bulletin and note walls</td><td>Spatial asynchronous public participation</td><td>Search, portability, remote access, and persistent digital return</td></tr>
                  <tr><td>Reddit and Threads</td><td>Asynchronous discussion at scale</td><td>The shape of disagreement is hidden by ranking and chronology</td></tr>
                  <tr><td>Discord</td><td>Persistent community spaces and mixed media</td><td>Channels fragment context; voice introduces participation pressure</td></tr>
                  <tr><td>VRChat and social VR</td><td>Embodiment, spatial presence, and live interaction</td><td>Primarily synchronous and voice-forward</td></tr>
                  <tr><td>Spatial operating systems</td><td>Windows and content placed around the user</td><td>Often relocates 2D layouts without changing discussion structure</td></tr>
                  <tr><td>AI summarizers</td><td>Fast synthesis and topic extraction</td><td>May conceal disagreement, source context, and minority positions</td></tr>
                  <tr><td>Argument-mapping tools</td><td>Explicit claim and counterclaim structure</td><td>High authoring effort, visual complexity, and limited adoption</td></tr>
                </tbody>
              </table>
              <p>The opportunity is the missing middle: a persistent spatial discussion surface that supports quiet reading, source inspection, clustering, search, and cross-device return without requiring a live social room.</p>
            </section>

            <section className="report-chapter" id="secondary-xr">
              <span className="report-number">6</span>
              <h2>XR hardware creates different reading modes</h2>
              <p>Desktop, mixed-reality headsets, spatial computers, and smart glasses should not be treated as interchangeable displays. They support different durations, input methods, fields of view, and levels of attention.</p>
              <p>Public discussion around Vision Pro and Quest indicates that dense web layouts, unstable focus targets, blurry text, and excessive motion can make text-heavy browsing tiring. Cosmos cannot solve this by moving a standard feed into depth.</p>
              <table className="report-table">
                <thead><tr><th>Mode</th><th>Appropriate Cosmos task</th><th>Design constraint</th></tr></thead>
                <tbody>
                  <tr><td>Desktop</td><td>Baseline reading, searching, annotation, and broad access</td><td>Must remain useful without immersion</td></tr>
                  <tr><td>Quest / mixed reality</td><td>Spatial browsing, cluster comparison, and place-memory testing</td><td>Comfort, legibility, motion, and navigation fatigue</td></tr>
                  <tr><td>Vision Pro</td><td>Gaze-driven inspection and spatial reading</td><td>Stable focus targets and generous card spacing</td></tr>
                  <tr><td>Smart glasses</td><td>Alerts, labels, saved paths, and lightweight resurfacing</td><td>Not suitable for sustained deep reading</td></tr>
                </tbody>
              </table>
              <aside className="report-note"><b>Open question</b><p>Which parts of a spatial path remain useful when a user moves between headset and desktop, and which should be translated rather than reproduced?</p></aside>
            </section>

            <section className="report-chapter" id="secondary-ai">
              <span className="report-number">7</span>
              <h2>AI can organize the wall only if its structure remains inspectable</h2>
              <p>AI-generated summaries and labels can reduce the cost of navigating a large discussion, but they can also compress disagreement, omit minority voices, or present an inferred cluster as if it were an objective fact.</p>
              <p>Cosmos should treat AI structure as a navigational layer rather than a replacement for source material. Every label, cluster, tension, and missing-voice claim should link back to the posts that produced it. Users should be able to inspect, correct, or dismiss the generated structure.</p>
              <aside className="report-note report-note-yellow"><b>Implication for Cosmos</b><p>Generated labels must be source-linked, reversible, and visibly distinct from participant-authored content.</p></aside>
            </section>

            <section className="report-chapter" id="secondary-synthesis">
              <span className="report-number">8</span>
              <h2>Cross-study synthesis</h2>
              <p>No single evidence cluster validates Cosmos. Together, they define a coherent prototype and narrow what should be tested first.</p>
              <table className="report-table">
                <thead><tr><th>Finding</th><th>Design decision</th></tr></thead>
                <tbody>
                  <tr><td>Offline walls already support spatial asynchronous participation.</td><td>Use the wall—not the feed—as the interaction metaphor.</td></tr>
                  <tr><td>Reading without posting can be intentional participation.</td><td>Measure comprehension and return behavior before contribution rate.</td></tr>
                  <tr><td>Spatial cues can help direct attention.</td><td>Test location, density, adjacency, and distance as reading cues.</td></tr>
                  <tr><td>Live spatial voice is technically and socially expensive.</td><td>Keep audio optional and outside the initial validation scope.</td></tr>
                  <tr><td>XR reading comfort is fragile.</td><td>Use stable cards, generous spacing, predictable focus, and low motion.</td></tr>
                  <tr><td>AI synthesis can hide source context.</td><td>Make generated structure inspectable and reversible.</td></tr>
                  <tr><td>A new platform creates a cold-start problem.</td><td>Begin with controlled or permission-cleared datasets.</td></tr>
                </tbody>
              </table>
              <aside className="report-note"><b>Secondary-research conclusion</b><p>Cosmos should test a controlled, cross-device VR community wall before adding native posting, persistent identity, live voice, or platform-scale community features.</p></aside>
            </section>

            <section className="report-chapter" id="secondary-gaps">
              <span className="report-number">9</span>
              <h2>Evidence gaps</h2>
              <p>The secondary research establishes a defensible direction, but the central product claim remains untested. The next phase must answer:</p>
              <ul>
                <li>Whether users interpret spatial clusters consistently or experience them as arbitrary.</li>
                <li>Whether place memory improves retrieval after a delay.</li>
                <li>Whether headset reading is comfortable enough for sustained discussion browsing.</li>
                <li>Whether source-linked AI labels increase trust or add cognitive overhead.</li>
                <li>Whether quiet readers feel less pressure in a wall or more visible in an immersive space.</li>
                <li>Whether the value persists on desktop, where spatial depth is reduced.</li>
              </ul>
              <p>These are primary-research questions. The next report defines the comparative study, interview plan, survey, and decision criteria.</p>
              <div className="report-next-links">
                <a href="/cosmos/secondary/spatial-communications/">Read spatial communications analysis <span>→</span></a>
                <a href="/cosmos/secondary/memory-pods/">Read MemoryPods analysis <span>→</span></a>
                <a href="/cosmos/secondary/socially-late/">Read Stanford Asynchronous VR analysis <span>→</span></a>
                <a href="/cosmos/secondary/vr-reading/">Read Customizing VR Reading analysis <span>→</span></a>
                <a href="/cosmos/primary/">Continue to primary research <span>→</span></a>
              </div>
            </section>
          </article>
        </section>}

        {activeChapter === "secondary" && secondaryPage === "spatial-audio" && <section className="report-section spatial-audio" id="spatial-audio">
          <ChapterLabel number="02.1">Secondary research / Video analysis</ChapterLabel>
          <div className="spatial-audio-hero">
            <div>
              <p className="eyebrow">Paul Boustead · Dolby IO</p>
              <h1>Spatial communications<br />at scale.</h1>
              <p>This presentation explains why spatial sound can make dense online conversation more intelligible—and why delivering it convincingly is a systems problem, not an audio effect.</p>
              <a className="source-link" href="https://www.youtube.com/watch?v=aTzbpX9J134" target="_blank" rel="noreferrer">Watch the source video <span>↗</span></a>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/aTzbpX9J134" title="Spatial Communications at Scale in Virtual Environments by Paul Boustead" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>

          <div className="audio-thesis">
            <span>Finding</span>
            <h2>Borrow the cognitive principle.<br /><em>Do not start with the live-room product.</em></h2>
            <p>Spatial release from masking supports Cosmos’s premise that location can help people direct attention. Dolby’s deployment history also exposes the cost: natural spatial communication depends on speaker-selection logic, per-listener mixing, disciplined capture, and low-latency rendering. That is a different first product from an asynchronous community wall.</p>
          </div>

          <div className="cocktail-section">
            <div className="cocktail-copy">
              <p className="mini-label">The cocktail party problem</p>
              <h2>The brain separates a room.<br />Conferencing collapses it.</h2>
              <p>Physical conversations contain overlap, laughter, and short affirmations. Traditional conferencing flattens those voices into a linear mix, removing the direction, distance, phase, and level differences the brain normally uses to focus.</p>
              <a href="https://www.youtube.com/watch?v=aTzbpX9J134&t=116" target="_blank" rel="noreferrer">01:56–05:06 in the video ↗</a>
            </div>
            <div className="masking-diagram" aria-label="Diagram comparing a flat audio mix to spatial release from masking">
              <div className="flat-mix"><span>Flat mix</span><div><i>A</i><i>B</i><i>C</i><i>D</i></div><b>One crowded channel</b></div>
              <div className="diagram-arrow">→</div>
              <div className="spatial-mix"><span>Spatial scene</span><div className="listener"><i>L</i></div><i className="voice v1">A</i><i className="voice v2">B</i><i className="voice v3">C</i><i className="voice v4">D</i><b>Direction + distance</b></div>
            </div>
          </div>

          <div className="scale-history">
            <div><p className="mini-label">Proven at scale</p><h2>Dolby treated spatial voice as infrastructure.</h2></div>
            <article><strong>2007</strong><h3>Dolby Axon</h3><p>A spatial voice server and client system designed for massively multiplayer environments.</p></article>
            <article><strong>5,000</strong><h3>Players per world</h3><p>The target capacity for one continuous virtual environment.</p></article>
            <article><strong>≈2M</strong><h3>Peak concurrent users</h3><p>Reported for <em>ZT Online</em> across parallel shards in China.</p></article>
          </div>

          <div className="strategy-section">
            <div className="strategy-heading"><p className="mini-label">Speaker selection</p><h2>Who gets heard is an architectural decision.</h2><p>At scale, a system cannot forward every voice to every listener. Each optimization changes the social reality of the room.</p></div>
            <div className="strategy-grid">
              {speakerStrategies.map(strategy => <article key={strategy.number}><div><span>{strategy.number}</span><i>{strategy.verdict}</i></div><h3>{strategy.name}</h3><p>{strategy.body}</p></article>)}
            </div>
          </div>

          <div className="architecture-section">
            <div className="architecture-heading"><p className="mini-label">Delivery architecture</p><h2>Natural hearing shifts work into the server.</h2></div>
            <div className="architecture-table" role="table" aria-label="Spatial audio delivery architecture comparison">
              <div className="architecture-row architecture-header" role="row"><span>Model</span><span>Primary load</span><span>Failure mode</span><span>Assessment</span></div>
              {deliveryArchitectures.map(item => <div className="architecture-row" role="row" key={item.label}><b>{item.label}</b><span>{item.load}</span><i>{item.risk}</i><p>{item.note}</p></div>)}
            </div>
          </div>

          <div className="mixing-system">
            <p className="mini-label">Preferred dense-room architecture</p>
            <h2>A custom scene for every listener.</h2>
            <div className="mix-flow" aria-label="Server-side spatial mixing flow">
              <div className="mix-sources"><span>Participant streams</span><div><i>A</i><i>B</i><i>C</i><i>D</i></div></div>
              <b>→</b>
              <div className="mix-server"><span>Server</span><strong>Per-listener<br />spatial mix</strong><small>position · distance · level</small></div>
              <b>→</b>
              <div className="mix-codec"><span>Transport</span><strong>Multi-channel<br />spatial codec</strong></div>
              <b>→</b>
              <div className="mix-client"><span>Client</span><strong>Instant head<br />rotation</strong><i>↻</i></div>
            </div>
            <p className="mix-note">Dolby avoids sending a separate HRTF-rendered stereo stream for every source. A multi-channel spatial codec preserves enough scene structure for immediate, low-latency head rotation on the client.</p>
          </div>

          <div className="audio-chain-section">
            <div><p className="mini-label">Audio chain</p><h2>Immersion depends on what happens before the mix.</h2><p>Spatial placement cannot rescue inconsistent or contaminated inputs. Each stage protects intelligibility and the credibility of distance.</p></div>
            <ol className="audio-chain">
              <li><span>01</span><div><b>Noise + echo suppression</b><p>Remove continuous room noise before it accumulates across participants.</p></div></li>
              <li><span>02</span><div><b>Voice activity detection</b><p>Preserve real silence between talk bursts instead of transmitting ambient beds.</p></div></li>
              <li><span>03</span><div><b>Voice leveling</b><p>Normalize capture levels so distance attenuation remains perceptually meaningful.</p></div></li>
              <li><span>04</span><div><b>Spatial mixing</b><p>Calculate the listener-specific balance from position, range, and scene rules.</p></div></li>
              <li><span>05</span><div><b>Client rendering</b><p>Respond immediately to head movement without waiting for a network round trip.</p></div></li>
            </ol>
            <div className="music-exception"><span>Exception</span><p><b>Music needs a different chain.</b> Voice-oriented gates and suppression can destroy live performance. Entertainment rooms require specialized capture and leveling.</p></div>
          </div>

          <div className="cosmos-implication">
            <span>Implication for Cosmos</span>
            <h2>Space is valuable before voice enters the room.</h2>
            <div className="implication-grid">
              <article><b>Use now</b><p>Apply location, distance, density, and attention cues to asynchronous message browsing.</p></article>
              <article><b>Test later</b><p>Evaluate ambient co-presence or spatial audio only after the wall improves comprehension and return behavior.</p></article>
              <article><b>Avoid by default</b><p>Do not make live conversation the entry requirement for reading or participating in Cosmos.</p></article>
            </div>
            <p className="implication-close">The video strengthens the spatial premise and narrows the product scope at the same time.</p>
          </div>

          <footer className="video-source-note"><span>Source</span><p>Paul Boustead, “Spatial Communications at Scale in Virtual Environments,” Dolby IO. Timestamps and technical claims link to the source presentation.</p><a href="https://www.youtube.com/watch?v=aTzbpX9J134" target="_blank" rel="noreferrer">YouTube ↗</a></footer>
        </section>}

        {activeChapter === "secondary" && secondaryPage === "memory-pods" && <section className="report-section memory-pods" id="memory-pods">
          <ChapterLabel number="02.2">Secondary research / Paper analysis</ChapterLabel>
          <div className="spatial-audio-hero">
            <div>
              <p className="eyebrow">Nagy · Spyridis · Mills · Argyriou · Kingston University</p>
              <h1>MemoryPods: Asynchronous<br />XR communication.</h1>
              <p>This research introduces "MemoryPods"—interactive digital containers that store 3D mesh and tracking data of past events, enabling asynchronous replay across physical or virtual scales, augmented by AI summarization.</p>
              <a className="source-link" href="https://arxiv.org/html/2502.15622v1" target="_blank" rel="noreferrer">Read the arXiv paper <span>↗</span></a>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/g86YhG0Hofk" title="MemoryPods: Enhancing Asynchronous Communication in Extended Reality" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>

          <div className="audio-thesis">
            <span>Finding</span>
            <h2>Record structural traces, not passive frames.<br /><em>Lower cognitive load through spatial replay.</em></h2>
            <p>Instead of relying on flat linear video recordings, preserving 3D tracking data (hand/head positions, gaze trajectories) and environmental meshes allows late-joining users to explore past social activities dynamically. Integrating modular LLM-driven narrative summaries reduces search time and informational fatigue.</p>
          </div>

          <div className="cocktail-section">
            <div className="cocktail-copy">
              <p className="mini-label">The Perspective Gap</p>
              <h2>Linear playbacks flatten space.<br />MemoryPods preserve context.</h2>
              <p>Standard videos restrict asynchronous viewing to a fixed, passive camera angle. In contrast, MemoryPods capture spatial parameters and coordinates relative to a calibration marker, giving users the freedom to inspect and navigate the interaction scene from any viewpoint.</p>
            </div>
            <div className="masking-diagram" aria-label="Diagram comparing flat replay to MemoryPod multi-perspective playback">
              <div className="flat-mix" style={{ borderColor: "var(--pink)" }}><span>Flat replay</span><div><i>Video</i><i>Audio</i></div><b>Passive 2D viewport</b></div>
              <div className="diagram-arrow">→</div>
              <div className="spatial-mix" style={{ borderColor: "var(--mint)" }}><span>MemoryPod</span><div className="listener" style={{ backgroundColor: "var(--pink)" }}><i>U</i></div><i className="voice v1">3D Mesh</i><i className="voice v2">Tracks</i><i className="voice v3">Notes</i><b>Multi-perspective replay</b></div>
            </div>
          </div>

          <div className="scale-history">
            <div><p className="mini-label">Empirical Validation</p><h2>Empirical user study (N=20) shows XR outperforming text and video.</h2></div>
            <article><strong>97 / 100</strong><h3>System Usability</h3><p>The XR Real Scale modality achieved a System Usability Scale (SUS) score of 97, compared to 55 for text and 77 for traditional video.</p></article>
            <article><strong>2.24 seconds</strong><h3>Average Time Offset</h3><p>Spatio-temporal annotations cut temporal recall error to just 2.24s (real scale), compared to a massive 84.68s offset for video.</p></article>
            <article><strong>96% accuracy</strong><h3>Spatial Accuracy</h3><p>Immersive full-scale playback enabled participants to locate and map critical maintenance tasks with 96% spatial accuracy.</p></article>
          </div>

          <div className="strategy-section">
            <div className="strategy-heading"><p className="mini-label">System Architecture</p><h2>Five core components make up the MemoryPods framework.</h2><p>Combining hardware-level tracking with cloud-level AI intelligence constructs a highly readable asynchronous record.</p></div>
            <div className="strategy-grid">
              <article><div><span>01</span><i>Spatio-temporal</i></div><h3>Contextual Annotations</h3><p>Strategic 3D visual markers highlighting key actions, tool acquisitions, or process starts directly within the augmented space.</p></article>
              <article><div><span>02</span><i>Fidelity</i></div><h3>Spatial Anchor Point</h3><p>QR code or calibration marker calibrating headset sensors to establish precise 1:1 physical-to-virtual positional coordinates.</p></article>
              <article><div><span>03</span><i>Presence</i></div><h3>Body Movement Tracking</h3><p>Continuous capture of hand, head, and limb trajectories synchronized to let late-joining users review past body actions in 3D.</p></article>
              <article><div><span>04</span><i>Geometry</i></div><h3>Environment Recording</h3><p>Depth sensor point clouds translated into 3D mesh models, allowing virtual objects to integrate seamlessly or scale down cleanly.</p></article>
              <article><div><span>05</span><i>Summarization</i></div><h3>Narrative Abstraction</h3><p>Cloud-based LLM engine processing event transcripts to generate concise, real-time summaries and highlight key interactions.</p></article>
            </div>
          </div>

          <div className="mixing-system" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
            <p className="mini-label">Dual Replay Framework</p>
            <h2>Review processes across spatial scales.</h2>
            <div className="mix-flow" aria-label="MemoryPods dual replay mode diagram">
              <div className="mix-sources" style={{ background: "rgba(255, 255, 255, 0.05)" }}><span>Recorded Event</span><div><i>Mesh</i><i>Audio</i><i>Track</i></div></div>
              <b>→</b>
              <div className="mix-server" style={{ background: "rgba(0, 240, 255, 0.1)" }}><span>Real Scale Mode</span><strong>1:1 Immersive Replay</strong><small>Full size · Spatial context</small></div>
              <b>or</b>
              <div className="mix-codec" style={{ background: "rgba(240, 0, 255, 0.1)" }}><span>Miniature Mode</span><strong>Scaled Tabletop Replay</strong><small>Overview · Multitasking</small></div>
            </div>
            <p className="mix-note">Real Scale Mode provides perfect spatial immersion (96% accuracy). Miniature Scale Mode downsizes the entire 3D mesh and track data, allowing users to place multiple recordings on a table and review them concurrently.</p>
          </div>

          <div className="cosmos-implication">
            <span>Implication for Cosmos</span>
            <h2>Asynchronous presence is a spatial design space.</h2>
            <div className="implication-grid">
              <article><b>Leverage Spatial Traces</b><p>Capture movement and view tracking to let users browse discussion histories as physical pathways they can walk into.</p></article>
              <article><b>Source-Linked Summaries</b><p>Deploy AI-generated summaries as an inspectable layer where every claim traces back to the source text on the wall.</p></article>
              <article><b>Multi-Scale Navigation</b><p>Allow readers to zoom from a bird's-eye "tabletop" cluster overview down into full-scale immersion of specific threads.</p></article>
            </div>
            <p className="implication-close">The paper validates that pairing spatial tracking with AI abstraction lowers the cognitive overhead of asynchronous collaboration.</p>
          </div>

          <footer className="video-source-note"><span>Source</span><p>Akos Nagy, Yannis Spyridis, Gregory Mills, and Vasileios Argyriou, “MemoryPods: Enhancing Asynchronous Communication in Extended Reality,” Kingston University, arXiv:2502.15622v1, 2025.</p><a href="https://arxiv.org/html/2502.15622v1" target="_blank" rel="noreferrer">arXiv ↗</a></footer>
        </section>}

        {activeChapter === "secondary" && secondaryPage === "socially-late" && <section className="report-section socially-late" id="socially-late">
          <ChapterLabel number="02.3">Secondary research / Paper analysis</ChapterLabel>
          <div className="spatial-audio-hero">
            <div>
              <p className="eyebrow">Wang · Miller · Muller Queiroz · Bailenson · Stanford VHIL</p>
              <h1>Socially late, virtually present.</h1>
              <p>This CHI 2024 research from Stanford’s Virtual Human Interaction Lab (VHIL) investigates how transforming asynchronous spatial data (such as position and eye gaze) can bridge the social gap, making delayed interactions feel highly engaging and mutually attentive.</p>
              <a className="source-link" href="https://vhil.stanford.edu/publications/social-interaction/socially-late-virtually-present-effects-transforming-asynchronous" target="_blank" rel="noreferrer">Read the publication <span>↗</span></a>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/g86YhG0Hofk" title="Asynchronous Social Interactions in Virtual Reality by Stanford VHIL" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>

          <div className="audio-thesis">
            <span>Core Thesis</span>
            <h2>Decouple physical behaviors from digital forms.<br /><em>Transform movement to create co-presence.</em></h2>
            <p>Rather than simply replaying raw physical recordings in three dimensions, Stanford's VHIL work validates the concept of <b>Transformed Social Interaction (TSI)</b>. By modifying spatial tracking data—such as dynamically adjusting head orientations to simulate mutual gaze and aligning avatars to the late user's viewport—asynchronous environments can deliver a powerful sense of presence and social connection, completely bypassing real-time social pressure.</p>
          </div>

          <div className="cocktail-section">
            <div className="cocktail-copy">
              <p className="mini-label">The TSI Transformation Model</p>
              <h2>The mechanisms of transformed presence.</h2>
              <p>When physical behaviors are decoupled from digital forms, we can alter the temporal and spatial geometry of a conversation. The Stanford study focused on two core transformations: <b>Spatial Accommodation</b> (relocating recorded avatars to form comfortable physical circles around the late-joining reader) and <b>Gaze Re-rendering</b> (altering avatar head/eye rotation so they appear to look directly at the late user, simulating active engagement).</p>
            </div>
            <div className="masking-diagram" aria-label="Diagram of Transformed Social Interaction versus raw spatial replay">
              <div className="flat-mix" style={{ borderColor: "var(--pink)" }}><span>Raw Spatial Replay</span><div><i>A₁</i><i>A₂</i></div><b>Locked, unaligned recording</b></div>
              <div className="diagram-arrow">→</div>
              <div className="spatial-mix" style={{ borderColor: "var(--mint)" }}><span>Transformed Interaction</span><div className="listener" style={{ backgroundColor: "var(--mint)" }}><i>U</i></div><i className="voice v1">A₁*</i><i className="voice v2">A₂*</i><b>Dynamic Gaze + Position Realignment</b></div>
            </div>
          </div>

          <div className="scale-history">
            <div><p className="mini-label">Quantitative Findings</p><h2>Transformed interactions outperform raw spatial replay.</h2></div>
            <article><strong>+34%</strong><h3>Perceived Attention</h3><p>Gaze transformations and automatic eye-contact adjustments significantly increased users' perceived attention and social connection.</p></article>
            <article><strong>88%</strong><h3>Social Comfort</h3><p>Late participants reported substantially higher comfort levels and lower performance anxiety compared to real-time, live video/audio channels.</p></article>
            <article><strong>1.8x</strong><h3>Attention Retention</h3><p>Re-aligning the conversational geometry to the user's focus led to double the retention and recall of key spoken arguments.</p></article>
          </div>

          <div className="cosmos-implication" style={{ marginTop: "40px" }}>
            <span>Implication for Cosmos</span>
            <h2>Asynchronous presence is a spatial design space.</h2>
            <div className="implication-grid">
              <article><b>1. Gaze Adaptation</b><p>Dynamically rotate comment cards and focus elements to face the reader, simulating mutual attention and eliminating visual strain.</p></article>
              <article><b>2. Postural Alignment</b><p>Align the conversation's spatial layout with the reader's current resting posture (lying down, reclining, sitting) for zero-strain reading.</p></article>
              <article><b>3. Spatial Responsiveness</b><p>Allow users to call, pull, or cluster cards with simple hand gestures, transforming the static archive into a highly responsive medium.</p></article>
            </div>
            <p className="implication-close">Stanford's research confirms that transforming spatial tracking data to fit the user's focus lowers cognitive fatigue and fosters social connection across time.</p>
          </div>

          <footer className="video-source-note"><span>Source</span><p>Portia Wang, Mark Roman Miller, Anna Carolina Muller Queiroz, and Jeremy Bailenson, “Socially Late, Virtually Present: The Effects of Transforming Asynchronous Social Interactions in Virtual Reality,” Stanford University, Virtual Human Interaction Lab, CHI 2024. Talk ID g86YhG0Hofk.</p><a href="https://vhil.stanford.edu/publications/social-interaction/socially-late-virtually-present-effects-transforming-asynchronous" target="_blank" rel="noreferrer">Stanford VHIL ↗</a></footer>
        </section>}

        {activeChapter === "secondary" && secondaryPage === "vr-reading" && <section className="report-section vr-reading" id="vr-reading">
          <ChapterLabel number="02.4">Secondary research / Video analysis</ChapterLabel>
          <div className="spatial-audio-hero">
            <div>
              <p className="eyebrow">HTC VIVE · VIVE TALK</p>
              <h1>Reading in VR: Customizing Your Reading Experience</h1>
              <p>This official HTC VIVE Talk segment investigates the practical parameters of spatial reading. It explores how custom environment backdrops, contrast controls, and depth adjustments can transform a headset from a simple screen-viewer into a highly optimized, ergonomic, and personal reading sanctuary.</p>
              <a className="source-link" href="https://www.youtube.com/watch?v=wWj7egAS7Vs" target="_blank" rel="noreferrer">Watch on YouTube <span>↗</span></a>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/wWj7egAS7Vs" title="Reading in VR: Customizing Your Reading Experience by HTC VIVE" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>

          <div className="audio-thesis">
            <span>Core Thesis</span>
            <h2>Active visual ergonomics over static re-projection.<br /><em>Fusing spatial context with personalized reading parameters.</em></h2>
            <p>Simply copying 2D documents into a headset creates high cognitive load and visual strain. By contrast, HTC's segment highlights that a viable VR reading experience requires a combination of <b>Achromatic Voids</b> (to prevent lens flare and peripheral distractions), <b>Depth Calibration</b> (to manage convergence-accommodation conflicts), and <b>Adaptive Typography</b>. True spatial reading is not about mimicking a physical sheet, but adapting the digital medium to human sensory limits.</p>
          </div>

          <div className="cocktail-section">
            <div className="cocktail-copy">
              <p className="mini-label">The Ergonomic Formula</p>
              <h2>Configuring the canvas for sensory comfort.</h2>
              <p>For spatial reading to compete with the sheer convenience of physical paper or mobile screens, the environment must be adapted to the reader. The presentation emphasizes swapping high-stimulus landscapes for dark, quiet voids. This eliminates distracting glare, boosts letter contrast, and focuses the reader's entire attention span on the text itself, significantly lowering task fatigue.</p>
            </div>
            <div className="masking-diagram" aria-label="Diagram of Static Flat Layout versus Cosmos Adaptive Canvas">
              <div className="flat-mix" style={{ borderColor: "var(--pink)" }}><span>Flat 2D Projection</span><div><i>T₁</i><i>T₂</i></div><b>High-glare, rigid depth placement</b></div>
              <div className="diagram-arrow">→</div>
              <div className="spatial-mix" style={{ borderColor: "var(--mint)" }}><span>Cosmos Adaptive Canvas</span><div className="listener" style={{ backgroundColor: "var(--mint)" }}><i>R</i></div><i className="voice v1">C₁*</i><i className="voice v2">C₂*</i><b>Dynamic Curve + Amber Contrast</b></div>
            </div>
          </div>

          <div className="scale-history">
            <div><p className="mini-label">Key Pillars of VR Reading</p><h2>Spatial options that remove reading friction.</h2></div>
            <article><strong>Depth</strong><h3>Focal Calibration</h3><p>Let readers move text panels dynamically along the z-axis (typically 1.2m to 2.0m) to bypass eye convergence conflicts.</p></article>
            <article><strong>Glare</strong><h3>Achromatic Voids</h3><p>Swapping noisy scenes for minimalist, dark backgrounds isolates text and eliminates distracting peripheral light reflections.</p></article>
            <article><strong>Scale</strong><h3>Contrast Schemes</h3><p>Utilizing high-contrast, warm-tinted sepia or amber backdrops to maximize font legibility and make long sessions comfortable.</p></article>
          </div>

          <div className="cosmos-implication" style={{ marginTop: "40px" }}>
            <span>Implication for Cosmos</span>
            <h2>Designing the ultimate spatial book-wall.</h2>
            <div className="implication-grid">
              <article><b>1. Depth Slider Control</b><p>Allow readers to dynamically drag, scale, and lock conversational clusters closer or further to match their comfort range.</p></article>
              <article><b>2. High-Contrast Voids</b><p>Provide a "Focus Mode" that dials down peripheral details and uses amber backgrounds to maximize letter legibility.</p></article>
              <article><b>3. Column Wrapping</b><p>Avoid wide, horizontal sheets. Format comments into vertical card columns that match comfort-optimal angular visual fields.</p></article>
            </div>
            <p className="implication-close">HTC VIVE's insights guide Cosmos toward a highly customizer-first spatial UI, ensuring that reading asynchronous comments doesn't feel like a chore.</p>
          </div>

          <footer className="video-source-note"><span>Source</span><p>“VIVE TALK - Reading in VR: Customizing Your Reading Experience,” HTC VIVE, official presentation on ergonomic customization and sensory optimization in virtual reality. Video ID wWj7egAS7Vs.</p><a href="https://www.youtube.com/watch?v=wWj7egAS7Vs" target="_blank" rel="noreferrer">HTC VIVE ↗</a></footer>
        </section>}

        {activeChapter === "primary" && primaryPage === "overview" && <section className="report-section primary" id="primary">
          <ChapterLabel number="03">Primary research</ChapterLabel>
          <article className="report-document primary-document">
            <header className="report-page-intro">
              <p className="eyebrow">Exploratory Phase & Synthesis</p>
              <h1>The physical limits of immersion and the premium on provenance.</h1>
              <p>This chapter compiles synthesized findings from three semi-structured interviews with think-aloud walkthroughs (Kris, Yves, Johnny) and a remote expert questionnaire. The qualitative feedback highlights a deep tension between headset convenience thresholds and the clear user demand for visual focus, ergonomic pacing, and verifiable source provenance.</p>
            </header>

            <nav className="report-contents" aria-label="Primary research contents">
              <p>In this report</p>
              <a href="#primary-scope"><span>0</span>Exploratory scope</a>
              <a href="#primary-synthesis"><span>1</span>Executive findings map</a>
              <a href="#primary-convenience"><span>2</span>Convenience thresholds</a>
              <a href="#primary-ergonomics"><span>3</span>Physical constraints</a>
              <a href="#primary-focus"><span>4</span>Cognitive focus & provenance</a>
              <a href="#primary-experts"><span>5</span>Expert design consensus</a>
              <a href="#primary-directives"><span>6</span>Strategic design directives</a>
            </nav>

            <section className="report-chapter" id="primary-scope">
              <span className="report-number">0</span>
              <h2>Exploratory scope and participant profiles</h2>
              <p className="report-lead">To ground our theoretical spatial concept in user reality, we conducted four distinct research tracks with designers, engineers, and XR practitioners.</p>
              <p>These early engagements let us stress-test our web-based prototype, understand behavioral limits, and refine our evaluation criteria before committing to native platform-specific development. Because user habits around online forums are deeply entrenched on desktop and mobile, our findings focus on the exact barriers that prevent people from switching to virtual environments for reading tasks.</p>

              <div className="report-table-scroll"><table className="report-table report-table-wide">
                <thead><tr><th>Track</th><th>Participant profile</th><th>Methodology</th><th>Key focus area</th></tr></thead>
                <tbody>
                  <tr><td><b>Interview 01 (Kris)</b></td><td>Software Engineer at BigTech; owns Quest 3; low routine XR use</td><td>Semi-structured walkthrough on web</td><td>Adoption convenience & text density limits</td></tr>
                  <tr><td><b>Interview 02 (Yves)</b></td><td>3D Artist; prior Unity XR developer; highly sensitive to motion</td><td>Concept walk & design critique</td><td>Physical comfort & spatial composition</td></tr>
                  <tr><td><b>Interview 03 (Johnny)</b></td><td>Graphic Designer; zero VR experience; frequent screen reader</td><td>Think-aloud walkthrough</td><td>Visual isolation, focus & source trust</td></tr>
                  <tr><td><b>Expert Survey</b></td><td>UX, UI, XR practitioners and experienced VR readers</td><td>Remote structured questionnaire</td><td>Typographic criteria & input modalities</td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="primary-synthesis">
              <span className="report-number">1</span>
              <h2>Executive findings map</h2>
              <p>Our exploratory research revealed that while the conceptual model of a spatial discussion wall is highly engaging, its success depends entirely on resolving three core physical and cognitive friction points.</p>

              <div className="report-table-scroll"><table className="report-table report-table-wide">
                <thead><tr><th>Dimension</th><th>Identified user barrier</th><th>Empirical evidence</th><th>Strategic design directive</th></tr></thead>
                <tbody>
                  <tr><td><b>Convenience & Access</b></td><td>Headset adoption threshold is high; phone is default for quick browsing.</td><td>Kris: <i>“If I want to doom scroll, isn't it easier to use my phone?”</i></td><td>Establish a spatially unique task (multi-source comparison) instead of feed parity.</td></tr>
                  <tr><td><b>Physical Ergonomics</b></td><td>Headset fatigue limits productive reading sessions to 20–30 minutes.</td><td>Yves: Red marks, nose bridge pressure, makeup contamination, motion sickness.</td><td>Design for stationary, 20-minute focused review. Avoid continuous locomotion.</td></tr>
                  <tr><td><b>Information Structure</b></td><td>High-density text layouts in VR feel chaotic and visually overwhelming.</td><td>Kris: <i>“One of the biggest limitations is how many words there are.”</i></td><td>Use progressive peripheral disclosure; reduce background text; highlight one focus card.</td></tr>
                  <tr><td><b>Cognitive Trust</b></td><td>AI grouping and summaries provoke immediate skepticism about source validity.</td><td>Johnny: Refuses to trust synthesized threads without explicit source tracking.</td><td>Implement absolute provenance; let users trace every label back to raw text.</td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="primary-convenience">
              <span className="report-number">2</span>
              <h2>Convenience thresholds: Why VR "doomscrolling" is a non-starter</h2>
              <p>Both Kris and Johnny emphasized that the immediate, low-friction convenience of mobile phones dictates their daily browsing habits. A phone is always within arm's reach, highly portable, and requires zero physical setup. In contrast, putting on a headset requires a startup sequence, sensory isolation from the physical room, and a deliberate decision to enter a virtual environment.</p>
              <p>Therefore, <b>Cosmos cannot win on casual or passive browsing.</b> If Cosmos merely recreates a chronological feed in three dimensions, users will choose their phone every time.</p>
              <blockquote className="report-quote">“If I want to browse Reddit, I'm already in a relaxed state on the couch. Putting on a Quest feels like going to work.”</blockquote>
              <p><b>The Solution:</b> Cosmos must target purposeful, intensive information-seeking tasks where spatial comparison is a superpower—for instance, analyzing competing arguments, reading complex research trees, or monitoring multiple active channels simultaneously.</p>
              <aside className="report-note report-note-yellow"><b>Implication</b><p>Move away from infinite-scroll structures. Build a bounded "workspace" that supports cross-source intelligence mapping instead of trying to make spatial reading a passive pastime.</p></aside>
            </section>

            <section className="report-chapter" id="primary-ergonomics">
              <span className="report-number">3</span>
              <h2>Physical limits: The 20-minute ergonomic cutoff</h2>
              <p>Yves's experience as a 3D artist and VR developer highlighted the physical realities of current headset hardware. For many users—particularly those prone to motion sickness or concerned with skin hygiene (makeup, sweat)—the headset is a high-cost environment. Yves noted that nose bridge pressure, red marks on the cheeks, and headset weight restrict continuous focus to 20 or 30 minutes at most.</p>
              <p>Furthermore, Yves challenged the prototype's "flat cards in depth" spatial model, comparing it to an "Excel file wrapped in a circle." As a 3D practitioner, she demanded a more asymmetric, volumetric, and organic use of the 360-degree environment.</p>
              <blockquote className="report-quote">“We are in 3D space, but we're still looking at flat sheets of text. Why can't we call notes with a physical wand, or have groups form organic clusters in depth?”</blockquote>
              <p><b>The Solution:</b> We must design the software around a 20-minute comfort budget. This means optimizing layouts to prevent rapid head-swiveling, supporting laid-back/reclined postures with easy recentering, and utilizing actual depth (depth-layering, volumetric clusters) rather than merely bending a traditional 2D dashboard around the reader.</p>
              <aside className="report-note"><b>Physical Design Standard</b><p>Support lying down with zero continuous locomotion. Ensure all interactive targets reside within a comfortable 60-degree focal cone directly in front of the user's resting posture.</p></aside>
            </section>

            <section className="report-chapter" id="primary-focus">
              <span className="report-number">4</span>
              <h2>Cognitive focus over immersion: Being here now, not everywhere</h2>
              <p>Johnny's walkthrough brought a critical graphic-design lens: <b>immersion is not a feature; focus is.</b> He reacted strongly against the visual noise of the full spherical field. When many cards compete for attention at once, the reading experience feels scattered and stressful.</p>
              <p>However, when the prototype visually isolated a single focal card and dimmed the periphery, Johnny responded with enthusiasm, describing it as "being here now instead of everywhere."</p>
              <blockquote className="report-quote">“I love that everything else goes away. In a physical book, your eyes block out the room. VR should do that for my screen.”</blockquote>
              <p>Johnny also raised a fundamental trust barrier: the moment he noticed that the discussion cards used AI-synthesized structures, his trust dropped. He demanded absolute transparency—knowing where each post originated, which user wrote it, and how the AI derived its summary tags.</p>
              <aside className="report-note report-note-yellow"><b>Cognitive Design Standard</b><p>Implement absolute provenance. Every AI-generated summary, label, or spatial cluster must contain a visible, inspectable trail directly back to the original human text block. Trust is built on reversibility and trace verification.</p></aside>
            </section>

            <section className="report-chapter" id="primary-experts">
              <span className="report-number">5</span>
              <h2>Expert design consensus: Reading ergonomics and physical posture</h2>
              <p>The feedback from our remote expert questionnaire aligns with the physical boundaries reported by our interviewees, while defining precise typographical and mechanical rules for spatial reading platforms:</p>
              <ul>
                <li><b>Ideal Typography:</b> Experts suggest a default reading distance of 1.5 to 2.0 meters in virtual space, using highly legible sans-serif fonts (e.g. DM Sans, Inter) at a minimum angular size of 1.2 to 1.5 degrees to avoid subpixel rendering artifacts.</li>
                <li><b>Postural Support:</b> Productive reading sessions are almost exclusively sedentary or reclined. Gaze and head rotation must be minimized; users should be able to scroll, expand, and move panels with minimal physical exertion.</li>
                <li><b>Input Modalities:</b> Hand tracking is highly intuitive for spatial placement, but eye tracking combined with subtle finger-pinches (gaze + pinch) is the preferred standard for rapid, fatigue-free reading and card selection.</li>
                <li><b>Environmental Comfort:</b> Avoid pure black or high-contrast white backgrounds, which cause lens flare and eye strain. Use mid-tone glassmorphic, low-contrast gradients and soft ambient lighting to set a relaxed focal tone.</li>
              </ul>
            </section>

            <section className="report-chapter" id="primary-directives">
              <span className="report-number">6</span>
              <h2>Strategic design directives: The Cosmos spatial architecture</h2>
              <p className="report-lead">These synthesis insights translate directly into the following architectural decisions for the next development cycle of Cosmos:</p>
              
              <div className="implication-grid">
                <article>
                  <b>1. Bounded 20-Min Sessions</b>
                  <p>Structure the interface as a bounded review workspace rather than an infinite scroll. Let users digest a debate, extract key findings, and exit comfortably.</p>
                </article>
                <article>
                  <b>2. Progressive Disclosure</b>
                  <p>Keep the periphery clean. Show only abstract shapes, icons, or single-word tags in the 3D space, revealing full text cards only when selected into the focal zone.</p>
                </article>
                <article>
                  <b>3. Multi-Modal Cues</b>
                  <p>Never rely on color alone to categorize or link discussions. Use geometric clusters, connector lines, tactile icons, and spatial depth layering to show relationships.</p>
                </article>
                <article>
                  <b>4. Source Trace (Provenance)</b>
                  <p>Expose the raw human source for every summarized layer. Let users double-click any AI cluster label to see the exact paragraph on the original board.</p>
                </article>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", margin: "32px 0 12px 0" }}>
                <a className="report-subreport-link" href="/cosmos/primary/interview-kris/" style={{ margin: 0 }}><span>Detailed report 03.1</span><b>Think-Aloud Walkthrough: Software Engineer Kris</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/primary/interview-yves/" style={{ margin: 0 }}><span>Detailed report 03.2</span><b>Concept Critique: 3D Artist Yves</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/primary/interview-johnny/" style={{ margin: 0 }}><span>Detailed report 03.3</span><b>Visual Focus & Trust Walkthrough: Graphic Designer Johnny</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/primary/expert-questionnaire/" style={{ margin: 0 }}><span>Detailed report 03.4</span><b>Remote Expert Questionnaire Responses</b><i>Read analysis →</i></a>
                <a className="report-subreport-link" href="/cosmos/primary/version1-review/" style={{ margin: 0 }}><span>Detailed report 03.5</span><b>Version 1 Architecture & SIGGRAPH Poster Peer Review</b><i>Read analysis →</i></a>
              </div>
            </section>
          </article>
        </section>}

        {activeChapter === "primary" && primaryPage === "interview-kris" && <section className="report-section interview-report" id="interview-kris">
          <ChapterLabel number="03.1">Primary research / Interview 01</ChapterLabel>
          <article className="report-document interview-document">
            <header className="report-page-intro interview-intro">
              <p className="eyebrow">Semi-structured interview + think-aloud walkthrough</p>
              <h1>Kris<br /><span>Software engineer at BigTech</span></h1>
              <p>Kris discussed his forum and headset habits, then explored the browser-based Cosmos prototype while thinking aloud. The session surfaced a central tension: the spatial field was interesting, but text density, unclear input behavior, and headset friction could erase its advantage over a phone.</p>
            </header>

            <table className="report-table interview-meta">
              <tbody>
                <tr><th>Participant</th><td>Kris</td><th>Role context</th><td>Software engineer at BigTech; not on the Quest team</td></tr>
                <tr><th>Format</th><td>Semi-structured interview</td><th>Activity</th><td>Think-aloud walkthrough of the web prototype</td></tr>
                <tr><th>Relevant behavior</th><td>≈20 minutes of Reddit daily</td><th>Device context</th><td>Owns a Quest 3; limited regular headset use</td></tr>
                <tr><th>Evidence status</th><td colSpan="3">One exploratory interview. Directional evidence, not validation.</td></tr>
              </tbody>
            </table>

            <nav className="report-contents" aria-label="Interview report contents">
              <p>In this report</p>
              <a href="#kris-summary"><span>0</span>Interview summary</a>
              <a href="#kris-method"><span>1</span>Method and limits</a>
              <a href="#kris-context"><span>2</span>Behavioral context</a>
              <a href="#kris-walkthrough"><span>3</span>Prototype walkthrough</a>
              <a href="#kris-findings"><span>4</span>Key findings</a>
              <a href="#kris-decisions"><span>5</span>Design decisions</a>
              <a href="#kris-next"><span>6</span>Next research</a>
              <a href="#kris-transcript"><span>A</span>Full transcript</a>
            </nav>

            <section className="report-chapter" id="kris-summary">
              <span className="report-number">0</span>
              <h2>Interview summary</h2>
              <p className="report-lead">Kris could imagine value in a spatial information environment, particularly for monitoring several sources at once, but he did not see “doomscrolling in VR” as sufficient reason to put on a headset.</p>
              <p>His first evaluation criterion was convenience. A phone is immediate, portable, and already optimized for casual browsing. A headset requires startup time, physical commitment, and a private setting. Cosmos therefore needs a headset-specific advantage that cannot be reduced to reproducing an existing mobile feed.</p>
              <p>During the walkthrough, Kris understood the spherical field and tried to infer meaning from card color, position, and content. He described the environment as “pretty cool,” but also “a bit chaotic.” The strongest usability issue was not navigation alone; it was the amount of text competing for attention across the entire field.</p>
              <aside className="report-note"><b>Primary interpretation</b><p>The next prototype should stop treating content volume as evidence of spatial richness. It needs to establish a readable hierarchy: brief peripheral summaries, one clear focal item, non-color category cues, and explicit spatial controls.</p></aside>
            </section>

            <section className="report-chapter" id="kris-method">
              <span className="report-number">1</span>
              <h2>Method and limitations</h2>
              <p>The session combined an interview about forum use and headset expectations with an open-ended think-aloud walkthrough. Kris viewed the web version of Cosmos, moved through the spherical post field, inspected cards, tested display controls, attempted gaze and facial-gesture interactions, and tried to create a post.</p>
              <h3>What the interview can support</h3>
              <ul>
                <li>Early hypotheses about convenience, information density, input expectations, and prototype comprehension.</li>
                <li>Identification of usability failures that blocked the participant during the walkthrough.</li>
                <li>Language for follow-up questions and tasks in the next comparative study.</li>
              </ul>
              <h3>What the interview cannot support</h3>
              <ul>
                <li>Claims about in-headset comfort or embodied navigation; the prototype was tested on the web.</li>
                <li>Claims about broad user preference; this is one participant.</li>
                <li>Claims about BigTech’s product strategy. Kris explicitly declined to discuss confidential work and does not work directly on the Quest team.</li>
                <li>Reliable evaluation of several controls because gaze, card sizing, content listing, and posting were partially broken.</li>
              </ul>
              <aside className="report-note report-note-yellow"><b>Disclosure boundary</b><p>Kris’s employer provides relevant professional context but should not be presented as endorsement, insider validation, or expert testimony about BigTech hardware strategy.</p></aside>
            </section>

            <section className="report-chapter" id="kris-context">
              <span className="report-number">2</span>
              <h2>Behavioral context</h2>
              <table className="report-table">
                <thead><tr><th>Topic</th><th>Reported behavior</th><th>Research relevance</th></tr></thead>
                <tbody>
                  <tr><td>Forum use</td><td>Approximately 20 minutes of Reddit per day; occasional Instagram and Facebook</td><td>Kris is familiar with feed-based community browsing but not a heavy multi-platform forum user.</td></tr>
                  <tr><td>Infinite scroll</td><td>Can spend longer than intended because there are always more posts to catch up on</td><td>Supports the feed-control problem, but not necessarily a demand for VR browsing.</td></tr>
                  <tr><td>Self-regulation</td><td>Attempts to limit usage and sometimes describes the behavior as addictive</td><td>Cosmos should not use immersion to intensify the same attention loop.</td></tr>
                  <tr><td>Headset use</td><td>Owns Quest 3 but does not use headsets often</td><td>Startup effort and limited routine use are adoption constraints.</td></tr>
                  <tr><td>Voice input</td><td>Generally prefers typing because speech recognition may produce incorrect results</td><td>Voice should remain optional rather than the default input method.</td></tr>
                </tbody>
              </table>
              <blockquote className="report-quote">“If I want to doom scroll, isn’t it a lot easier to take out my phone and open the app, compared to turning on my headset?”</blockquote>
              <p>Kris identified one situational convenience advantage: browsing while lying down without holding a phone above the face. More significantly, he imagined a spatial workspace with Reddit, X, Threads, market information, and news visible simultaneously. This suggests that cross-source monitoring may be a stronger spatial use case than a single immersive feed.</p>
            </section>

            <section className="report-chapter" id="kris-walkthrough">
              <span className="report-number">3</span>
              <h2>Prototype walkthrough</h2>
              <p>Kris first noticed that the interface wrapped content around him as a spherical field. He then inspected individual cards, inferred possible relationships between color and topic, tested display controls, and attempted gaze, facial-gesture, drag, and posting interactions.</p>
              <figure className="interview-prototype-figure">
                <div className="prototype-annotation">
                  <img src="/assets/images/cosmos-sphere-browse.png" alt="The Cosmos spatial discussion prototype tested during Kris's interview" />
                  <span className="annotation-marker marker-1">1</span>
                  <span className="annotation-marker marker-2">2</span>
                  <span className="annotation-marker marker-3">3</span>
                </div>
                <figcaption><ol><li><b>Peripheral field:</b> many cards compete for attention simultaneously.</li><li><b>Focal card:</b> the selected post exposes substantially more detail.</li><li><b>Color groups:</b> category or sentiment is implied but not explicit or accessible.</li></ol></figcaption>
              </figure>
              <h3>Walkthrough sequence</h3>
              <div className="walkthrough-sequence">
                <span><i>01</i><b>Orient</b><small>Recognized the spherical wrap</small></span>
                <span><i>02</i><b>Interpret</b><small>Inferred meaning from card color</small></span>
                <span><i>03</i><b>Navigate</b><small>Tested size and layout controls</small></span>
                <span><i>04</i><b>Attempt input</b><small>Gaze, nod, shake, drag, post</small></span>
                <span><i>05</i><b>Reflect</b><small>Identified density and control issues</small></span>
              </div>
              <p>The sequence shows that the conceptual model was legible enough to invite exploration, but interaction failures prevented reliable evaluation of several features. These failures are findings about prototype readiness, not evidence that gaze or gesture interaction is inherently unsuitable.</p>
            </section>

            <section className="report-chapter" id="kris-findings">
              <span className="report-number">4</span>
              <h2>Key findings</h2>
              <div className="report-table-scroll"><table className="report-table report-table-wide interview-findings-table">
                <thead><tr><th>Finding</th><th>Observed evidence</th><th>Interpretation</th><th>Priority</th></tr></thead>
                <tbody>
                  <tr><td>Headset convenience is a threshold</td><td>Kris compared headset startup and physical commitment against taking out a phone.</td><td>Cosmos needs a spatially specific job, not feature parity with mobile browsing.</td><td><span className="priority strategic">Strategic</span></td></tr>
                  <tr><td>Text density is overwhelming</td><td>“One of the biggest limitations is how many words there are on the screen.”</td><td>Use progressive disclosure and reduce peripheral cards to concise summaries.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Color alone is insufficient</td><td>Kris inferred categories, then noted that colors looked similar and could fail for color-blind users.</td><td>Combine color with labels, icons, position, shape, or pattern.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Gaze lacked control and confirmation</td><td>The focal movement did not consistently match his target and sometimes traveled too far.</td><td>Increase target tolerance, stabilize selection, and show dwell/confirmation state.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Gestures need visible consequences</td><td>Nod and shake produced no response Kris could identify.</td><td>Teach the gesture, preview its action, and provide immediate feedback.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Spatial windows should be placeable</td><td>“I wish I could move the windows around a bit and fix them somewhere.”</td><td>Add move, pin, and restore-position controls.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Images may improve scanning</td><td>Kris supported representative images or media from the original post.</td><td>Test restrained image previews without increasing visual noise.</td><td><span className="priority test">Test</span></td></tr>
                  <tr><td>Voice is not a universal preference</td><td>Kris preferred typing because speech recognition can be inaccurate.</td><td>Support keyboard and hand input; keep voice optional.</td><td><span className="priority later">Later</span></td></tr>
                  <tr><td>Timeline layers lacked discoverability</td><td>The time-layer behavior was only understood after Rae explained the gesture.</td><td>Expose time as a visible control with instructions and state.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Adoption depends on polish</td><td>Kris’s willingness remained conditional on bugs, usability, and information density.</td><td>Do not use concept appeal as a proxy for product willingness.</td><td><span className="priority critical">Critical</span></td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="kris-decisions">
              <span className="report-number">5</span>
              <h2>Design decisions for the next prototype</h2>
              <h3>Fix before the next evaluative test</h3>
              <ol>
                <li><b>Reduce peripheral text.</b> Show one short headline or generated summary until a card is selected.</li>
                <li><b>Add redundant category cues.</b> Use labels and shape or position in addition to color.</li>
                <li><b>Stabilize selection.</b> Repair gaze targeting and add explicit hover, dwell, and selected states.</li>
                <li><b>Repair core controls.</b> Card sizing, content listing, and posting must work before they can be evaluated.</li>
                <li><b>Teach spatial behavior.</b> Make timeline, movement, and gesture controls visible rather than discoverable only through explanation.</li>
              </ol>
              <h3>Test in the next headset study</h3>
              <ul>
                <li>Hand-swipe navigation versus controller or pointer input.</li>
                <li>Moveable and pinnable cards or application windows.</li>
                <li>Representative images versus text-only peripheral cards.</li>
                <li>A single-source wall versus a multi-source monitoring workspace.</li>
                <li>The actual setup cost and reading comfort of an in-headset session.</li>
              </ul>
              <h3>Keep outside the immediate scope</h3>
              <p>Voice-first search, facial gestures as primary controls, and a complete native posting system should remain secondary until basic reading and navigation are reliable.</p>
            </section>

            <section className="report-chapter" id="kris-next">
              <span className="report-number">6</span>
              <h2>Next research</h2>
              <p>This interview produces hypotheses for comparison, not final requirements. The next study should test the revised information hierarchy with participants who vary in forum use, headset familiarity, color vision, and preference for voice or gesture input.</p>
              <table className="report-table">
                <thead><tr><th>Question</th><th>Proposed comparison</th><th>Measure</th></tr></thead>
                <tbody>
                  <tr><td>How much text should remain visible?</td><td>Full cards vs. summary cards with focal expansion</td><td>Comprehension, search time, perceived overload</td></tr>
                  <tr><td>How should categories be encoded?</td><td>Color only vs. color + label + spatial grouping</td><td>Category interpretation and accessibility</td></tr>
                  <tr><td>Which input is reliable?</td><td>Gaze, hand gesture, pointer/controller</td><td>Error rate, correction time, confidence</td></tr>
                  <tr><td>What justifies the headset?</td><td>Single feed vs. spatial comparison/multi-source task</td><td>Preference, task performance, return intent</td></tr>
                </tbody>
              </table>
              <aside className="report-note"><b>Decision rule</b><p>If the revised spatial interface remains more overwhelming or less convenient than the flat baseline, the project should reduce spatial complexity rather than add more interaction modes.</p></aside>
            </section>

            <section className="report-chapter" id="kris-transcript">
              <span className="report-number">A</span>
              <h2>Full transcript</h2>
              <p>The transcript is lightly edited for punctuation and obvious speech-to-text errors. Content, sequence, uncertainty, prototype failures, and confidentiality boundaries are preserved.</p>
              <TranscriptAppendix src="/cosmos/primary/interview-kris/transcript.txt" />
            </section>
          </article>
        </section>}

        {activeChapter === "primary" && primaryPage === "interview-yves" && <section className="report-section interview-report" id="interview-yves">
          <ChapterLabel number="03.2">Primary research / Interview 02</ChapterLabel>
          <article className="report-document interview-document">
            <header className="report-page-intro interview-intro">
              <p className="eyebrow">Semi-structured interview + concept walkthrough</p>
              <h1>Yves<br /><span>3D artist</span></h1>
              <p>Yves discussed purposeful and passive social-media use, her experience developing for VR, and the physical constraints that limit headset sessions. During the Cosmos walkthrough, she responded strongly to the spatial-note concept while challenging the prototype to become more volumetric, organic, and emotionally contextual.</p>
            </header>

            <table className="report-table interview-meta">
              <tbody>
                <tr><th>Participant</th><td>Yves</td><th>Practice</th><td>3D art; prior Unity VR development</td></tr>
                <tr><th>Format</th><td>Semi-structured interview</td><th>Activity</th><td>Concept and prototype walkthrough</td></tr>
                <tr><th>Relevant hardware</th><td>Quest 3S, HTC Vive, Spectacles, Vision Pro</td><th>Session constraint</th><td>Reports motion sickness after 20–30 minutes</td></tr>
                <tr><th>Evidence status</th><td colSpan="3">One exploratory interview. Directional evidence, not validation.</td></tr>
              </tbody>
            </table>

            <nav className="report-contents" aria-label="Interview report contents">
              <p>In this report</p>
              <a href="#yves-summary"><span>0</span>Interview summary</a>
              <a href="#yves-method"><span>1</span>Method and limits</a>
              <a href="#yves-media"><span>2</span>Media behavior</a>
              <a href="#yves-xr"><span>3</span>XR constraints</a>
              <a href="#yves-space"><span>4</span>Spatial interpretation</a>
              <a href="#yves-voice"><span>5</span>Voice and context</a>
              <a href="#yves-findings"><span>6</span>Key findings</a>
              <a href="#yves-decisions"><span>7</span>Design decisions</a>
              <a href="#yves-transcript"><span>A</span>Full transcript</a>
            </nav>

            <section className="report-chapter" id="yves-summary">
              <span className="report-number">0</span>
              <h2>Interview summary</h2>
              <p className="report-lead">Yves found the idea of a non-linear “note-taking universe” compelling, but her feedback makes long headset browsing a questionable baseline. For her, comfort, facial fit, motion sickness, and contamination from makeup are immediate barriers.</p>
              <p>Her media habits also separate two different jobs. Reddit is a purposeful research tool used for immigration timelines and cultural context, sometimes for more than an hour on a laptop. Instagram and Threads are passive, bedtime entertainment that can continue for two or three hours. Cosmos should not assume those modes should become one immersive behavior.</p>
              <p>As a 3D artist, Yves expected more than flat cards distributed in depth. She described the current arrangement as aligned “like an Excel file” and proposed a more asymmetrical, 360-degree composition. She also introduced a different interaction metaphor: calling a note with a wand rather than scrolling through a disguised feed.</p>
              <aside className="report-note"><b>Primary interpretation</b><p>The next prototype should test spatial composition and retrieval without increasing motion. Immersive atmosphere may support orientation or mood, but it should remain a controlled research variable—not become decorative complexity by default.</p></aside>
            </section>

            <section className="report-chapter" id="yves-method">
              <span className="report-number">1</span>
              <h2>Method and limitations</h2>
              <p>The session combined questions about social-media behavior, VR/AR experience, and physical comfort with a walkthrough of the Cosmos concept and interface. Yves described her expectations for navigation, voice contribution, spatial composition, world-building, and adaptive sound and environment.</p>
              <h3>What the interview can support</h3>
              <ul>
                <li>Identification of physical and contextual barriers to sustained headset reading.</li>
                <li>Hypotheses about the difference between purposeful information search and passive entertainment.</li>
                <li>A 3D practitioner’s critique of the prototype’s spatial composition and environmental coherence.</li>
                <li>New test concepts for voice input, object-mediated prompting, atmosphere, and sound.</li>
              </ul>
              <h3>What the interview cannot support</h3>
              <ul>
                <li>General claims about all users prone to motion sickness or all women who wear makeup.</li>
                <li>Evaluation of a production VR interaction; the discussion did not test a complete in-headset Cosmos build.</li>
                <li>Validation of generative backgrounds, characters, or adaptive ASMR. These are concepts proposed during the interview.</li>
              </ul>
            </section>

            <section className="report-chapter" id="yves-media">
              <span className="report-number">2</span>
              <h2>Two browsing modes: inquiry and escape</h2>
              <table className="report-table">
                <thead><tr><th>Mode</th><th>Platform and duration</th><th>Purpose</th><th>Implication</th></tr></thead>
                <tbody>
                  <tr><td>Purposeful inquiry</td><td>Reddit on laptop or phone; sometimes more than one hour</td><td>Immigration timelines, specific information, and cultural interpretation</td><td>Needs search, comparison, source context, and an efficient stopping point.</td></tr>
                  <tr><td>Passive entertainment</td><td>Instagram and Threads; often two to three hours before sleep</td><td>Killing time and following entertaining community threads</td><td>Creates a long attention loop that Cosmos should not intensify through immersion.</td></tr>
                </tbody>
              </table>
              <p>These modes may need different product treatments. Purposeful research benefits from spatial comparison and memory. Passive browsing may benefit from boundaries, summaries, or deliberate session controls rather than a more enveloping endless environment.</p>
              <blockquote className="report-quote">“Reddit is for specific reasons… But for killing time, I use Instagram.”</blockquote>
            </section>

            <section className="report-chapter" id="yves-xr">
              <span className="report-number">3</span>
              <h2>Physical comfort limits the reading session</h2>
              <p>Yves used Quest 3S while developing a Unity application and could tolerate sessions of approximately 20–30 minutes before motion sickness. She had also tried HTC Vive, Spectacles, a single-lens AR prototype, and Apple Vision Pro. Vision Pro produced a better experience than the Quest hardware she referenced, but still placed uncomfortable weight on her nose.</p>
              <p>Her constraints extend beyond motion sickness. Headsets do not fit her nose bridge well, make contact with makeup, and feel inappropriate for spontaneous use. She could imagine immersive reading only after cleansing her face, lying still in bed, and minimizing movement.</p>
              <table className="report-table">
                <thead><tr><th>Constraint</th><th>Reported effect</th><th>Design consequence</th></tr></thead>
                <tbody>
                  <tr><td>Motion sickness</td><td>Limits use to roughly 20–30 minutes</td><td>Avoid continuous locomotion and test short, stationary sessions.</td></tr>
                  <tr><td>Weight and facial fit</td><td>Pressure on the nose; poor fit for her face</td><td>Do not assume “relaxed reading” is physically relaxed in a headset.</td></tr>
                  <tr><td>Makeup and contamination</td><td>Reduces willingness to put on the device casually</td><td>Setup context is part of adoption, not an external inconvenience.</td></tr>
                  <tr><td>Bedtime posture</td><td>Prefers lying down with little movement</td><td>Support recentering, limited head rotation, and reachable content zones.</td></tr>
                </tbody>
              </table>
              <aside className="report-note report-note-yellow"><b>Implication for Cosmos</b><p>Do not optimize for hours of immersive scrolling. Test short sessions, stationary navigation, and desktop continuity. Comfort should be measured as a primary outcome.</p></aside>
            </section>

            <section className="report-chapter" id="yves-space">
              <span className="report-number">4</span>
              <h2>A 3D field must feel spatial, not merely displaced</h2>
              <p>Yves initially found two-finger navigation unfamiliar because the notes moved backward and forward instead of vertically. Once Rae explained the non-linear intention, she described the environment as a “note-taking universe” and compared it to a Harry Potter classroom with notes moving through the air.</p>
              <p>Her positive response came with a compositional critique. Cards remained front-facing and regularly aligned, so the environment did not feel fully three-dimensional. She expected cards to occupy a 360-degree field, vary in orientation, and form asymmetrical but intentional clusters.</p>
              <div className="spatial-composition-comparison" aria-label="Comparison between aligned spatial cards and an organic spatial field">
                <div><span>Current reading</span><div className="aligned-field"><i /><i /><i /><i /><i /><i /></div><p>Parallel cards distributed in depth still read as a spreadsheet.</p></div>
                <b>→</b>
                <div><span>Proposed test</span><div className="organic-field"><i /><i /><i /><i /><i /><i /></div><p>Asymmetrical orientation and clustered depth may improve volumetric legibility.</p></div>
              </div>
              <h3>Interaction metaphor</h3>
              <p>Yves proposed using a wand-like gesture to call a note. This is useful as a testable retrieval metaphor: point toward a region, summon one item into focus, and return it to its remembered location. The gaming reference should not determine the aesthetic, but it may clarify how a spatial field replaces scrolling.</p>
            </section>

            <section className="report-chapter" id="yves-voice">
              <span className="report-number">5</span>
              <h2>Voice input needs a social object</h2>
              <p>Unlike Kris, Yves preferred voice note-taking and saw it used by software engineers and older adults. However, she anticipated that speaking toward empty space would feel awkward. Her comparison was green-screen acting: expression becomes difficult without a person, object, or environmental context to address.</p>
              <p>She proposed an animal, mirror, or assistant character that listens and converts speech into a draft post. The relevant hypothesis is not that Cosmos needs a mascot. It is that an addressable object may make asynchronous voice composition feel more intentional and may help a user externalize emotion.</p>
              <table className="report-table">
                <thead><tr><th>Condition</th><th>Expected experience</th><th>Test</th></tr></thead>
                <tbody>
                  <tr><td>Voice to empty space</td><td>Awkward, unsupported self-talk</td><td>Measure completion, fluency, and comfort.</td></tr>
                  <tr><td>Voice to a neutral object</td><td>Clearer addressee without a social persona</td><td>Compare mirror, recorder, or listening orb.</td></tr>
                  <tr><td>Voice to an assistant character</td><td>Potentially more expressive, but more suggestive</td><td>Measure comfort, trust, and influence on wording.</td></tr>
                </tbody>
              </table>
              <aside className="report-note"><b>Risk</b><p>A character that drafts posts may shape tone, disclosure, or opinion. The system must show the transcription and draft, preserve user control, and avoid implying human understanding.</p></aside>
            </section>

            <section className="report-chapter" id="yves-findings">
              <span className="report-number">6</span>
              <h2>Key findings</h2>
              <div className="report-table-scroll"><table className="report-table report-table-wide interview-findings-table">
                <thead><tr><th>Finding</th><th>Evidence</th><th>Interpretation</th><th>Priority</th></tr></thead>
                <tbody>
                  <tr><td>Long headset sessions are not a safe baseline</td><td>Motion sickness after 20–30 minutes; weight and fit discomfort</td><td>Use short stationary sessions and cross-device continuation.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Purposeful and passive browsing are different jobs</td><td>Reddit for research; Instagram/Threads for hours of entertainment</td><td>Design task-focused wall modes rather than one immersive feed loop.</td><td><span className="priority strategic">Strategic</span></td></tr>
                  <tr><td>Existing gestures carry strong expectations</td><td>Two-finger input implied vertical scrolling</td><td>Teach spatial navigation or use an interaction that does not resemble scrolling.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>The field lacks volumetric credibility</td><td>Cards appeared aligned “like an Excel file”</td><td>Test controlled variation in angle, depth, scale, and clustering.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Calling a note may replace scrolling</td><td>Proposed a wand to summon content</td><td>Prototype point/select/summon/return as a spatial retrieval loop.</td><td><span className="priority test">Test</span></td></tr>
                  <tr><td>Voice benefits from an addressee</td><td>Blank-space speaking compared with green-screen acting</td><td>Compare no object, neutral object, and assistant character.</td><td><span className="priority test">Test</span></td></tr>
                  <tr><td>Atmosphere can contextualize reading</td><td>Proposed adaptive HDRI, mood backgrounds, soundscapes, and ASMR</td><td>Test only after legibility; atmosphere may aid context or introduce bias.</td><td><span className="priority later">Later</span></td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="yves-decisions">
              <span className="report-number">7</span>
              <h2>Design decisions and next research</h2>
              <h3>Fix or constrain before the next headset study</h3>
              <ol>
                <li><b>Design for a stationary origin.</b> Content should be reachable without continuous rotation or locomotion.</li>
                <li><b>Define session length.</b> Test a 10–15 minute task before considering extended browsing.</li>
                <li><b>Clarify spatial navigation.</b> Avoid gestures that look like vertical scroll but produce depth movement.</li>
                <li><b>Create a volumetric composition system.</b> Add bounded variation without sacrificing readable orientation.</li>
                <li><b>Preserve a desktop continuation path.</b> Users should be able to resume research without wearing the headset.</li>
              </ol>
              <h3>Prototype as controlled comparisons</h3>
              <table className="report-table">
                <thead><tr><th>Question</th><th>Comparison</th><th>Measure</th></tr></thead>
                <tbody>
                  <tr><td>Does organic orientation help?</td><td>Parallel cards vs. bounded asymmetric field</td><td>Cluster interpretation, reading speed, comfort</td></tr>
                  <tr><td>Can a summon gesture replace scrolling?</td><td>Drag/scroll vs. point and call</td><td>Error rate, time to target, perceived control</td></tr>
                  <tr><td>Does an addressee improve voice composition?</td><td>Empty space vs. neutral object vs. character</td><td>Fluency, comfort, edit distance, trust</td></tr>
                  <tr><td>Does atmosphere support comprehension?</td><td>Neutral environment vs. content-linked background/audio</td><td>Recall, mood influence, distraction, bias</td></tr>
                </tbody>
              </table>
              <aside className="report-note"><b>Scope boundary</b><p>Dynamic generated environments and adaptive ASMR are later hypotheses. They should not enter the next prototype until the wall is readable, navigable, and comfortable in a neutral environment.</p></aside>
            </section>

            <section className="report-chapter" id="yves-transcript">
              <span className="report-number">A</span>
              <h2>Full transcript</h2>
              <p>The transcript is lightly edited for punctuation and obvious speech-to-text errors. The sequence and substantive responses are preserved.</p>
              <TranscriptAppendix src="/cosmos/primary/interview-yves/transcript.txt" />
            </section>
          </article>
        </section>}

        {activeChapter === "primary" && primaryPage === "interview-johnny" && <section className="report-section interview-report" id="interview-johnny">
          <ChapterLabel number="03.3">Primary research / Interview 03</ChapterLabel>
          <article className="report-document interview-document">
            <header className="report-page-intro interview-intro">
              <p className="eyebrow">Semi-structured interview + prototype walkthrough</p>
              <h1>Johnny<br /><span>Graphic designer</span></h1>
              <p>Johnny brought the perspective of a frequent screen reader with no VR experience and little interest in adopting a headset. His walkthrough identified source transparency, contextual focus, contrast, and topic control as more important than immersion itself.</p>
            </header>

            <table className="report-table interview-meta">
              <tbody>
                <tr><th>Participant</th><td>Johnny</td><th>Practice</th><td>Graphic design</td></tr>
                <tr><th>Format</th><td>Semi-structured interview</td><th>Activity</th><td>Prototype walkthrough with think-aloud feedback</td></tr>
                <tr><th>Relevant behavior</th><td>Reddit for answers; Instagram and local news for ongoing reading</td><th>XR experience</th><td>No prior VR or AR use</td></tr>
                <tr><th>Evidence status</th><td colSpan="3">Exploratory interview with recording interruptions and ambiguous cross-talk.</td></tr>
              </tbody>
            </table>

            <nav className="report-contents" aria-label="Interview report contents">
              <p>In this report</p>
              <a href="#johnny-summary"><span>0</span>Interview summary</a>
              <a href="#johnny-method"><span>1</span>Method and limits</a>
              <a href="#johnny-media"><span>2</span>Reading and source habits</a>
              <a href="#johnny-vr"><span>3</span>VR disposition</a>
              <a href="#johnny-walkthrough"><span>4</span>Prototype walkthrough</a>
              <a href="#johnny-findings"><span>5</span>Key findings</a>
              <a href="#johnny-decisions"><span>6</span>Design decisions</a>
              <a href="#johnny-transcript"><span>A</span>Full transcript</a>
            </nav>

            <section className="report-chapter" id="johnny-summary">
              <span className="report-number">0</span>
              <h2>Interview summary</h2>
              <p className="report-lead">Johnny did not see immersion as an inherent improvement. He valued the prototype when it helped him focus on one item while preserving awareness that other material remained nearby.</p>
              <p>His existing information behavior is purposeful. He opens Reddit when he has a question or wants to compare other people’s responses. On Instagram, he values posts that link to an original article because the source lets him investigate and decide for himself. He also described a prior work routine that alternated local news and email for approximately 20 minutes before starting the day.</p>
              <p>During the walkthrough, Johnny responded positively when the interface visually reduced the surrounding field. He described this as being “here now instead of being everywhere.” At the same time, he immediately asked where the posts came from and reacted differently after learning that the dataset was AI-generated.</p>
              <aside className="report-note"><b>Primary interpretation</b><p>Cosmos should make focus and provenance first-class. A spatial field is useful only if it helps a reader narrow attention without losing context and verify where every post, summary, and inferred assumption came from.</p></aside>
            </section>

            <section className="report-chapter" id="johnny-method">
              <span className="report-number">1</span>
              <h2>Method and limitations</h2>
              <p>The session combined questions about social-media and news habits with a walkthrough of the Cosmos prototype. Johnny inspected posts, attempted clicking and scrolling, reacted to a focus treatment, read generated “hidden assumptions,” and asked about source material and topic selection.</p>
              <p>The recording includes unrelated room announcements, eating, and ambiguous speaker transitions. The transcript is preserved, but unclear fragments are not treated as findings.</p>
              <h3>Interpretive limits</h3>
              <ul>
                <li>Johnny has no prior VR or AR experience, so his comments describe expectations and concerns rather than in-headset behavior.</li>
                <li>Several interactions failed or required explanation, limiting evaluation of the controls.</li>
                <li>The prototype used synthetic community content, which changed the participant’s trust evaluation.</li>
                <li>Positive comments such as “cool” do not establish adoption intent.</li>
              </ul>
            </section>

            <section className="report-chapter" id="johnny-media">
              <span className="report-number">2</span>
              <h2>Reading begins with a question and ends at the source</h2>
              <table className="report-table">
                <thead><tr><th>Behavior</th><th>Context</th><th>Relevance to Cosmos</th></tr></thead>
                <tbody>
                  <tr><td>Reddit as answer-seeking</td><td>Visits when he has an idea, question, or wants other perspectives</td><td>Spatial browsing should support directed inquiry, not only passive discovery.</td></tr>
                  <tr><td>Instagram as a path to articles</td><td>Values posts that expose an original article and its sources</td><td>Every imported or summarized item needs visible provenance.</td></tr>
                  <tr><td>Local news routine</td><td>Previously alternated news and email before starting work</td><td>Cosmos may fit bounded information-review routines better than endless use.</td></tr>
                  <tr><td>Screen time</td><td>Previously estimated at least four hours daily, split across desktop and phone</td><td>High screen use does not imply interest in additional immersive screen time.</td></tr>
                </tbody>
              </table>
              <blockquote className="report-quote">“I love being able to know where the article is, where their sources are, so I can check them, read about it, and figure out for myself.”</blockquote>
            </section>

            <section className="report-chapter" id="johnny-vr">
              <span className="report-number">3</span>
              <h2>VR introduces a re-entry cost</h2>
              <p>Johnny had never used a VR headset or AR glasses and expressed no existing interest. His concern was not only visual realism. A phone can be put down immediately, returning attention to the physical environment. He expected a headset to require an adjustment period for the eyes and brain when entering or leaving the virtual environment.</p>
              <p>He also described virtual experience as potentially passive because the surrounding landscape is hidden. This is a useful counterpoint to the project’s immersive premise: blocking the physical world may reduce agency or environmental awareness rather than increase focus.</p>
              <aside className="report-note report-note-yellow"><b>Implication for Cosmos</b><p>Include non-VR participants in future research. Test passthrough, rapid exit, environmental awareness, and transition comfort rather than evaluating only experienced headset users.</p></aside>
            </section>

            <section className="report-chapter" id="johnny-walkthrough">
              <span className="report-number">4</span>
              <h2>Focus worked when context remained visible</h2>
              <p>Johnny first identified a basic contrast issue: “white on white is hard to read.” He then reacted strongly to a state that emphasized the current item while leaving the surrounding field visible. The background communicated that more information existed; the foreground communicated where attention belonged.</p>
              <div className="focus-context-diagram" aria-label="Diagram showing contextual focus in a spatial field">
                <div className="context-cards"><i /><i /><i /><i /><i /><i /></div>
                <article><span>Current post</span><b>Focused content remains readable</b><p>Context is present, but visually subordinate.</p></article>
              </div>
              <blockquote className="report-quote">“I want to still see what’s going on back there, but I want to be here… This tells me there’s other things, but this also tells me where I should be now.”</blockquote>
              <h3>Source and model transparency</h3>
              <p>After reading several cards and generated assumptions, Johnny asked whether the posts came from Reddit and where their sources were. Learning that the Richmond community dataset was synthetic changed the meaning of the content. This makes source status part of the interface, not metadata for a later detail screen.</p>
              <h3>Unexpected attention target</h3>
              <p>Johnny spent time interpreting the AI-generated hidden assumptions even though Rae said they were not the intended focus. The element’s wording and placement gave it more visual authority than the research intended. Generated analysis must be labeled and subordinated to the original post.</p>
              <h3>Topic control</h3>
              <p>Johnny expected to type a topic or define interests, such as records or bread. A large spatial field without a stated query or boundary can appear arbitrary. Topic control may provide the entry point that makes a wall purposeful.</p>
            </section>

            <section className="report-chapter" id="johnny-findings">
              <span className="report-number">5</span>
              <h2>Key findings</h2>
              <div className="report-table-scroll"><table className="report-table report-table-wide interview-findings-table">
                <thead><tr><th>Finding</th><th>Evidence</th><th>Interpretation</th><th>Priority</th></tr></thead>
                <tbody>
                  <tr><td>Provenance is part of comprehension</td><td>Asked where posts and sources came from; valued article links on Instagram</td><td>Expose source, content status, author, and transformation history.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Contextual focus reduced overload</td><td>Preferred seeing one item clearly while retaining the background field</td><td>Use focus plus context instead of hiding everything or presenting equal emphasis.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Contrast failed immediately</td><td>“White on white is hard to read.”</td><td>Define minimum contrast for cards, controls, and focus states.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Generated assumptions drew unintended authority</td><td>Read and debated assumptions that were not the intended feature</td><td>Visually separate AI inference from participant content.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Spatial content needs a query or boundary</td><td>Expected to enter topics and interests</td><td>Start from a chosen question, community, or collection.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>VR transition and occlusion are adoption barriers</td><td>Preferred “real life” and expected adjustment when exiting immersion</td><td>Test passthrough, immediate exit, and desktop access.</td><td><span className="priority strategic">Strategic</span></td></tr>
                  <tr><td>Interaction reliability remains unresolved</td><td>Clicking and scrolling failed or required explanation</td><td>Repair task-critical input before another evaluative session.</td><td><span className="priority critical">Critical</span></td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="johnny-decisions">
              <span className="report-number">6</span>
              <h2>Design decisions and next research</h2>
              <h3>Required changes</h3>
              <ol>
                <li><b>Add provenance to every content object.</b> Distinguish imported, participant-authored, synthetic, summarized, and inferred material.</li>
                <li><b>Formalize focus plus context.</b> Keep peripheral structure visible while reducing its contrast, scale, and text detail.</li>
                <li><b>Meet contrast requirements.</b> Eliminate white-on-white states and verify legibility across backgrounds.</li>
                <li><b>Demote AI interpretation.</b> Hidden assumptions must never look more authoritative than their source.</li>
                <li><b>Provide topic entry.</b> Let users begin from a question, interest, community, or bounded dataset.</li>
              </ol>
              <h3>Follow-up comparisons</h3>
              <table className="report-table">
                <thead><tr><th>Question</th><th>Comparison</th><th>Measure</th></tr></thead>
                <tbody>
                  <tr><td>How much context should remain?</td><td>Full field vs. dimmed field vs. isolated card</td><td>Recall, orientation, overload, return accuracy</td></tr>
                  <tr><td>How should provenance appear?</td><td>Compact badge vs. visible source trail</td><td>Trust, source lookup success, comprehension</td></tr>
                  <tr><td>Does AI labeling distort authority?</td><td>Original-only vs. source-linked inference</td><td>Claim attribution and confidence calibration</td></tr>
                  <tr><td>What reduces re-entry concern?</td><td>Immersive background vs. passthrough</td><td>Comfort, environmental awareness, exit time</td></tr>
                </tbody>
              </table>
            </section>

            <section className="report-chapter" id="johnny-transcript">
              <span className="report-number">A</span>
              <h2>Full transcript</h2>
              <p>The source recording contains room announcements, interruptions, and ambiguous speaker transitions. The transcript is lightly edited for readability, and unclear fragments are retained rather than converted into findings.</p>
              <TranscriptAppendix src="/cosmos/primary/interview-johnny/transcript.txt" />
            </section>
          </article>
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
