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

function TranscriptAppendix() {
  const [transcript, setTranscript] = useState("Loading transcript…");
  useEffect(() => {
    fetch("/cosmos/primary/interview-kevin/transcript.txt")
      .then(response => response.ok ? response.text() : Promise.reject(new Error("Transcript unavailable")))
      .then(setTranscript)
      .catch(() => setTranscript("The transcript could not be loaded."));
  }, []);
  return <details className="transcript-appendix"><summary><span>Appendix A</span><b>Read the full interview transcript</b><i>+</i></summary><pre>{transcript}</pre></details>;
}

function App() {
  const [lens, setLens] = useState("reader");
  const secondaryPage = window.location.pathname.includes("/secondary/spatial-communications") ? "spatial-audio" : "overview";
  const primaryPage = window.location.pathname.includes("/primary/interview-kevin") ? "interview-kevin" : "overview";
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
              <a className="report-subreport-link" href="/cosmos/secondary/spatial-communications/"><span>Detailed report 02.1</span><b>Spatial Communications at Scale in Virtual Environments</b><i>Read analysis →</i></a>
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
              <div className="report-next-links"><a href="/cosmos/primary/">Continue to primary research <span>→</span></a><a href="/cosmos/secondary/spatial-communications/">Read spatial communications analysis <span>→</span></a></div>
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

        {activeChapter === "primary" && primaryPage === "overview" && <section className="report-section primary" id="primary">
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

        {activeChapter === "primary" && primaryPage === "interview-kevin" && <section className="report-section interview-report" id="interview-kevin">
          <ChapterLabel number="03.1">Primary research / Interview 01</ChapterLabel>
          <article className="report-document interview-document">
            <header className="report-page-intro interview-intro">
              <p className="eyebrow">Semi-structured interview + think-aloud walkthrough</p>
              <h1>Kevin<br /><span>Software engineer at Meta</span></h1>
              <p>Kevin discussed his forum and headset habits, then explored the browser-based Cosmos prototype while thinking aloud. The session surfaced a central tension: the spatial field was interesting, but text density, unclear input behavior, and headset friction could erase its advantage over a phone.</p>
            </header>

            <table className="report-table interview-meta">
              <tbody>
                <tr><th>Participant</th><td>Kevin</td><th>Role context</th><td>Software engineer at Meta; not on the Quest team</td></tr>
                <tr><th>Format</th><td>Semi-structured interview</td><th>Activity</th><td>Think-aloud walkthrough of the web prototype</td></tr>
                <tr><th>Relevant behavior</th><td>≈20 minutes of Reddit daily</td><th>Device context</th><td>Owns a Quest 3; limited regular headset use</td></tr>
                <tr><th>Evidence status</th><td colSpan="3">One exploratory interview. Directional evidence, not validation.</td></tr>
              </tbody>
            </table>

            <nav className="report-contents" aria-label="Interview report contents">
              <p>In this report</p>
              <a href="#kevin-summary"><span>0</span>Interview summary</a>
              <a href="#kevin-method"><span>1</span>Method and limits</a>
              <a href="#kevin-context"><span>2</span>Behavioral context</a>
              <a href="#kevin-walkthrough"><span>3</span>Prototype walkthrough</a>
              <a href="#kevin-findings"><span>4</span>Key findings</a>
              <a href="#kevin-decisions"><span>5</span>Design decisions</a>
              <a href="#kevin-next"><span>6</span>Next research</a>
              <a href="#kevin-transcript"><span>A</span>Full transcript</a>
            </nav>

            <section className="report-chapter" id="kevin-summary">
              <span className="report-number">0</span>
              <h2>Interview summary</h2>
              <p className="report-lead">Kevin could imagine value in a spatial information environment, particularly for monitoring several sources at once, but he did not see “doomscrolling in VR” as sufficient reason to put on a headset.</p>
              <p>His first evaluation criterion was convenience. A phone is immediate, portable, and already optimized for casual browsing. A headset requires startup time, physical commitment, and a private setting. Cosmos therefore needs a headset-specific advantage that cannot be reduced to reproducing an existing mobile feed.</p>
              <p>During the walkthrough, Kevin understood the spherical field and tried to infer meaning from card color, position, and content. He described the environment as “pretty cool,” but also “a bit chaotic.” The strongest usability issue was not navigation alone; it was the amount of text competing for attention across the entire field.</p>
              <aside className="report-note"><b>Primary interpretation</b><p>The next prototype should stop treating content volume as evidence of spatial richness. It needs to establish a readable hierarchy: brief peripheral summaries, one clear focal item, non-color category cues, and explicit spatial controls.</p></aside>
            </section>

            <section className="report-chapter" id="kevin-method">
              <span className="report-number">1</span>
              <h2>Method and limitations</h2>
              <p>The session combined an interview about forum use and headset expectations with an open-ended think-aloud walkthrough. Kevin viewed the web version of Cosmos, moved through the spherical post field, inspected cards, tested display controls, attempted gaze and facial-gesture interactions, and tried to create a post.</p>
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
                <li>Claims about Meta’s product strategy. Kevin explicitly declined to discuss confidential work and does not work directly on the Quest team.</li>
                <li>Reliable evaluation of several controls because gaze, card sizing, content listing, and posting were partially broken.</li>
              </ul>
              <aside className="report-note report-note-yellow"><b>Disclosure boundary</b><p>Kevin’s employer provides relevant professional context but should not be presented as endorsement, insider validation, or expert testimony about Meta hardware strategy.</p></aside>
            </section>

            <section className="report-chapter" id="kevin-context">
              <span className="report-number">2</span>
              <h2>Behavioral context</h2>
              <table className="report-table">
                <thead><tr><th>Topic</th><th>Reported behavior</th><th>Research relevance</th></tr></thead>
                <tbody>
                  <tr><td>Forum use</td><td>Approximately 20 minutes of Reddit per day; occasional Instagram and Facebook</td><td>Kevin is familiar with feed-based community browsing but not a heavy multi-platform forum user.</td></tr>
                  <tr><td>Infinite scroll</td><td>Can spend longer than intended because there are always more posts to catch up on</td><td>Supports the feed-control problem, but not necessarily a demand for VR browsing.</td></tr>
                  <tr><td>Self-regulation</td><td>Attempts to limit usage and sometimes describes the behavior as addictive</td><td>Cosmos should not use immersion to intensify the same attention loop.</td></tr>
                  <tr><td>Headset use</td><td>Owns Quest 3 but does not use headsets often</td><td>Startup effort and limited routine use are adoption constraints.</td></tr>
                  <tr><td>Voice input</td><td>Generally prefers typing because speech recognition may produce incorrect results</td><td>Voice should remain optional rather than the default input method.</td></tr>
                </tbody>
              </table>
              <blockquote className="report-quote">“If I want to doom scroll, isn’t it a lot easier to take out my phone and open the app, compared to turning on my headset?”</blockquote>
              <p>Kevin identified one situational convenience advantage: browsing while lying down without holding a phone above the face. More significantly, he imagined a spatial workspace with Reddit, X, Threads, market information, and news visible simultaneously. This suggests that cross-source monitoring may be a stronger spatial use case than a single immersive feed.</p>
            </section>

            <section className="report-chapter" id="kevin-walkthrough">
              <span className="report-number">3</span>
              <h2>Prototype walkthrough</h2>
              <p>Kevin first noticed that the interface wrapped content around him as a spherical field. He then inspected individual cards, inferred possible relationships between color and topic, tested display controls, and attempted gaze, facial-gesture, drag, and posting interactions.</p>
              <figure className="interview-prototype-figure">
                <div className="prototype-annotation">
                  <img src="/assets/images/cosmos-sphere-browse.png" alt="The Cosmos spatial discussion prototype tested during Kevin's interview" />
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

            <section className="report-chapter" id="kevin-findings">
              <span className="report-number">4</span>
              <h2>Key findings</h2>
              <div className="report-table-scroll"><table className="report-table report-table-wide interview-findings-table">
                <thead><tr><th>Finding</th><th>Observed evidence</th><th>Interpretation</th><th>Priority</th></tr></thead>
                <tbody>
                  <tr><td>Headset convenience is a threshold</td><td>Kevin compared headset startup and physical commitment against taking out a phone.</td><td>Cosmos needs a spatially specific job, not feature parity with mobile browsing.</td><td><span className="priority strategic">Strategic</span></td></tr>
                  <tr><td>Text density is overwhelming</td><td>“One of the biggest limitations is how many words there are on the screen.”</td><td>Use progressive disclosure and reduce peripheral cards to concise summaries.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Color alone is insufficient</td><td>Kevin inferred categories, then noted that colors looked similar and could fail for color-blind users.</td><td>Combine color with labels, icons, position, shape, or pattern.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Gaze lacked control and confirmation</td><td>The focal movement did not consistently match his target and sometimes traveled too far.</td><td>Increase target tolerance, stabilize selection, and show dwell/confirmation state.</td><td><span className="priority critical">Critical</span></td></tr>
                  <tr><td>Gestures need visible consequences</td><td>Nod and shake produced no response Kevin could identify.</td><td>Teach the gesture, preview its action, and provide immediate feedback.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Spatial windows should be placeable</td><td>“I wish I could move the windows around a bit and fix them somewhere.”</td><td>Add move, pin, and restore-position controls.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Images may improve scanning</td><td>Kevin supported representative images or media from the original post.</td><td>Test restrained image previews without increasing visual noise.</td><td><span className="priority test">Test</span></td></tr>
                  <tr><td>Voice is not a universal preference</td><td>Kevin preferred typing because speech recognition can be inaccurate.</td><td>Support keyboard and hand input; keep voice optional.</td><td><span className="priority later">Later</span></td></tr>
                  <tr><td>Timeline layers lacked discoverability</td><td>The time-layer behavior was only understood after Rae explained the gesture.</td><td>Expose time as a visible control with instructions and state.</td><td><span className="priority next">Next</span></td></tr>
                  <tr><td>Adoption depends on polish</td><td>Kevin’s willingness remained conditional on bugs, usability, and information density.</td><td>Do not use concept appeal as a proxy for product willingness.</td><td><span className="priority critical">Critical</span></td></tr>
                </tbody>
              </table></div>
            </section>

            <section className="report-chapter" id="kevin-decisions">
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

            <section className="report-chapter" id="kevin-next">
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

            <section className="report-chapter" id="kevin-transcript">
              <span className="report-number">A</span>
              <h2>Full transcript</h2>
              <p>The transcript is lightly edited for punctuation and obvious speech-to-text errors. Content, sequence, uncertainty, prototype failures, and confidentiality boundaries are preserved.</p>
              <TranscriptAppendix />
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
