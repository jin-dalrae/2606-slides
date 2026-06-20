import { GTRHeader, GTRSidebar } from "./shell.jsx";

const { useEffect, useState } = React;

const archiveMap = [
  {
    id: "report",
    label: "Climate Goal Platform Research Report",
    purpose: "Explains the rescoped product direction and the measurement logic behind it.",
    question: "What is GTR now trying to prove?",
  },
  {
    id: "stage1",
    label: "PRD Stage 1",
    purpose: "Defines the climate-startup MVP, its users, constraints, and success metrics.",
    question: "What ships first?",
  },
  {
    id: "stage2",
    label: "PRD Stage 2",
    purpose: "Extends the product toward generalization, customization, and follow-up.",
    question: "What expands after the wedge works?",
  },
  {
    id: "gtr-partners",
    label: "GTR Partners deck",
    purpose: "Shows the earlier advisory and transition-service framing.",
    question: "Where did the project start?",
  },
  {
    id: "product-deck",
    label: "Climate Goal Platform deck",
    purpose: "Converts the service story into a product story with a net-impact model.",
    question: "How does the direction change on slides?",
  },
];

const reportTakeaways = [
  {
    title: "The wedge is climate startups first",
    body: "The project now treats climate startups as the initial buyer because their valuation already depends on an impact claim and they need both footprint and handprint tracked in one place.",
  },
  {
    title: "Positive and negative impact stay separate",
    body: "The dashboard does not merge avoided emissions with the footprint. It keeps the accounting bases visible and exposes the net as a derived figure.",
  },
  {
    title: "The system is operational, not cosmetic",
    body: "The product is meant to run weekly with goals, evidence, and integrity gates. The slides and docs are all pointing at that workflow.",
  },
];

const stage1Goals = [
  "Let a climate founder produce a defensible net view in under 15 minutes of intake.",
  "Gate every positive claim behind baseline, displacement, and additionality checks.",
  "Label every metric by cadence and freshness.",
  "Turn the number into a weekly habit through cooperative gamification.",
  "Preserve uncertainty in the share page for VC and LP review.",
];

const stage2Axes = [
  ["Profile-based rubrics", "Different activity patterns weight different metrics."],
  ["Audience-specific share pages", "VC, LP, customer, and internal views show different detail levels."],
  ["Follow-up rules", "Metrics can emit owned tasks and cadences."],
  ["Portfolio view", "Investors can inspect multiple companies without collapsing the data model."],
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

function PageIntro({ eyebrow, title, summary, links = [] }) {
  return (
    <header className="report-page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{summary}</p>
      {links.length > 0 && (
        <div className="report-next-links">
          {links.map(([href, label]) => <a key={href} href={href}>{label} <span>→</span></a>)}
        </div>
      )}
    </header>
  );
}

function IntroPage() {
  return (
    <section className="report-section" id="intro">
      <ChapterLabel number="01">Overview</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="GTR archive"
          title="A reading room for the GTR docs and slide decks"
          summary="This site keeps the project in report form: left rail for navigation, right side for reading. It covers the transition from the original GTR advisory framing to the climate goal platform product, plus the docs and slide decks that explain the move."
          links={[
            ["/gtr/docs/", "Read the docs"],
            ["/gtr/slides/", "Review the slides"],
          ]}
        />

        <nav className="report-contents" aria-label="GTR contents">
          <p>In this archive</p>
          <a href="#summary"><span>0</span>Executive summary</a>
          <a href="#map"><span>1</span>Archive map</a>
          <a href="#reading-order"><span>2</span>Recommended reading order</a>
          <a href="#direction"><span>3</span>What changed</a>
          <a href="#decision"><span>4</span>Decision rule</a>
        </nav>

        <section className="report-chapter" id="summary">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">GTR now reads as a product archive, not just a slide archive.</p>
          <p>The documents show a clear sequence: an early advisory service for climate-aware startup work, then a tighter product direction focused on a climate startup +/- impact dashboard, then a Stage 2 plan for generalization and customization. The slide decks mirror that shift.</p>
          <aside className="report-note"><b>What this site does</b><p>It groups the docs and slides into a single reading interface so the project can be reviewed as a set of decisions, not as disconnected files.</p></aside>
        </section>

        <section className="report-chapter" id="map">
          <span className="report-number">1</span>
          <h2>Archive map</h2>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead>
                <tr><th>Artifact</th><th>What it contains</th><th>What it answers</th></tr>
              </thead>
              <tbody>
                {archiveMap.map((item) => (
                  <tr key={item.id}>
                    <td>{item.label}</td>
                    <td>{item.purpose}</td>
                    <td>{item.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="reading-order">
          <span className="report-number">2</span>
          <h2>Recommended reading order</h2>
          <ol>
            <li>Start with the research report to understand the rescoped direction.</li>
            <li>Read Stage 1 to see the MVP boundary, user groups, and success metrics.</li>
            <li>Read Stage 2 to see how the product expands without losing the climate wedge.</li>
            <li>Finish with the slide decks to see how the story was presented over time.</li>
          </ol>
        </section>

        <section className="report-chapter" id="direction">
          <span className="report-number">3</span>
          <h2>What changed</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead>
                <tr><th>Earlier framing</th><th>Current framing</th></tr>
              </thead>
              <tbody>
                <tr><td>Advisory service for climate awareness and founder support</td><td>Productized +/- impact dashboard for climate startups</td></tr>
                <tr><td>Bespoke services and transition work</td><td>Reusable workflow with goals, evidence, and integrity gates</td></tr>
                <tr><td>Climate Brick as an embedded reference</td><td>Own measurement method, with Climate Brick only as a reference shelf</td></tr>
                <tr><td>Broad startup relevance</td><td>Climate startups first, generalization later</td></tr>
              </tbody>
            </table>
          </div>
          {reportTakeaways.map((item) => (
            <aside className="report-note report-note-yellow" key={item.title}>
              <b>{item.title}</b>
              <p>{item.body}</p>
            </aside>
          ))}
        </section>

        <section className="report-chapter" id="decision">
          <span className="report-number">4</span>
          <h2>Decision rule</h2>
          <p>If a reader can understand the archive from the docs and slides alone, the site is working. If the site makes the project feel more coherent than the raw folder of files, it is doing its job.</p>
          <div className="report-next-links">
            <a href="/gtr/docs/">Open the docs <span>→</span></a>
            <a href="/gtr/slides/">Open the slides <span>→</span></a>
          </div>
        </section>
      </div>
    </section>
  );
}

function DocsOverviewPage() {
  return (
    <section className="report-section" id="docs">
      <ChapterLabel number="02">Docs</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Documentation index"
          title="The docs are where the product logic lives"
          summary="These pages explain the project direction in report form: the research report, the Stage 1 PRD, and the Stage 2 PRD. The point is not to compress them into a pitch, but to preserve the reasoning."
          links={[
            ["/gtr/docs/research-report/", "Research report"],
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
            ["/gtr/docs/stage-2/", "Stage 2 PRD"],
          ]}
        />

        <section className="report-chapter" id="docs-scope">
          <span className="report-number">2.0</span>
          <h2>Scope and method</h2>
          <p className="report-lead">The docs turn a messy project trail into a clear sequence of decisions.</p>
          <p>The research report establishes the rationale for the climate startup wedge. Stage 1 defines the product boundary. Stage 2 defines the extension path. Together they show where the project starts, what it must prove, and what remains deliberately out of scope.</p>
        </section>

        <section className="report-chapter" id="docs-map">
          <span className="report-number">2.1</span>
          <h2>Documentation map</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Document</th><th>Main use</th><th>Reading cue</th></tr></thead>
              <tbody>
                <tr><td>Research report</td><td>Explains the rescoped direction and the + / - model.</td><td>Why this product exists.</td></tr>
                <tr><td>PRD Stage 1</td><td>Defines the MVP and the first shippable boundary.</td><td>What gets built first.</td></tr>
                <tr><td>PRD Stage 2</td><td>Generalization, customization, and follow-up.</td><td>What comes after the wedge works.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">2.2</span>
          <h2>What the docs need to prove</h2>
          <ul>
            <li>The project should stay focused on climate startups before expanding outward.</li>
            <li>The dashboard should keep positive and negative impact separate.</li>
            <li>The workflow should be operational enough to use weekly, not just read once.</li>
            <li>Future flexibility should come from data and rules, not from a vague redesign.</li>
          </ul>
        </section>

        <section className="report-chapter">
          <span className="report-number">2.3</span>
          <h2>Go deeper</h2>
          <div className="report-next-links">
            <a href="/gtr/docs/research-report/">Read the report <span>→</span></a>
            <a href="/gtr/docs/stage-1/">Stage 1 PRD <span>→</span></a>
            <a href="/gtr/docs/stage-2/">Stage 2 PRD <span>→</span></a>
          </div>
        </section>
      </div>
    </section>
  );
}

function ResearchReportPage() {
  return (
    <section className="report-section" id="research-report">
      <ChapterLabel number="02.1">Docs / Research report</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Climate Goal Platform research report"
          title="The rescoped direction is a product, not a service"
          summary="The report argues that GTR should move from a hands-on advisory model to a reusable product: a climate startup +/- impact dashboard where footprint and handprint remain separate and auditable."
          links={[
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
            ["/gtr/slides/climate-goal-platform/", "Product deck"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">The report narrows the project to climate startups because that is where impact, diligence, and value are already linked.</p>
          <p>The product is framed as a live operating surface for a startup's environmental story. Footprint measures the negative side. Handprint measures the positive side. Net appears as a derived view, not as a merged accounting trick.</p>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Before and after</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Before</th><th>After</th></tr></thead>
              <tbody>
                <tr><td>Broad advisory service for startup climate awareness</td><td>Climate startup +/- impact dashboard</td></tr>
                <tr><td>Services were bespoke and hard to scale</td><td>Workflow is reusable and productized</td></tr>
                <tr><td>Climate Brick was part of the concept stack</td><td>Climate Brick becomes reference material only</td></tr>
                <tr><td>Impact was adjacent to the business</td><td>Impact becomes the operating surface</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>The model</h2>
          <p>The report keeps the accounting bases separate because footprint and handprint are not the same kind of measurement. The dashboard can show a net number, but only after the positive side passes baseline, displacement, and additionality checks.</p>
          <aside className="report-note report-note-yellow"><b>Core rule</b><p>Show the inventory, show the modeled positive impact, and make the net a clearly labeled derivative.</p></aside>
        </section>

        <section className="report-chapter">
          <span className="report-number">3</span>
          <h2>What the report sets up for Stage 1</h2>
          <ul>
            <li>Climate startups become the first buyer and the first product wedge.</li>
            <li>The dashboard must be useful in a short intake, not only in a long audit.</li>
            <li>Gamification is allowed only if it supports evidence and weekly use.</li>
            <li>The share page has to preserve uncertainty for VCs, LPs, and operators.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

function Stage1Page() {
  return (
    <section className="report-section" id="stage-1">
      <ChapterLabel number="02.2">Docs / Stage 1 PRD</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="PRD stage 1"
          title="The MVP is a climate startup impact dashboard"
          summary="Stage 1 defines the first shippable product: a two-sided dashboard for climate startups that tracks positive and negative impact separately, applies integrity gates, and turns the result into weekly action."
          links={[
            ["/gtr/docs/research-report/", "Back to the report"],
            ["/gtr/docs/stage-2/", "Read Stage 2"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>Goals</h2>
          <ol>
            {stage1Goals.map((goal) => <li key={goal}>{goal}</li>)}
          </ol>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Users</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Persona</th><th>Need</th></tr></thead>
              <tbody>
                <tr><td>Climate founder</td><td>Defend impact to investors without overclaiming.</td></tr>
                <tr><td>Climate VC / analyst</td><td>Verify the claim in diligence.</td></tr>
                <tr><td>Startup operator</td><td>Know what to do this week.</td></tr>
                <tr><td>LP or advisor</td><td>Read the share page with uncertainty intact.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>Core modules</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Module</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Impact ledger</td><td>Shows + handprint and - footprint side by side.</td></tr>
                <tr><td>Integrity gates</td><td>Checks baseline, displacement, and additionality.</td></tr>
                <tr><td>Freshness layer</td><td>Labels metered versus modeled values and their cadence.</td></tr>
                <tr><td>Goal board</td><td>Assigns owners, deadlines, and evidence.</td></tr>
                <tr><td>Progress game</td><td>Uses levels and evidence points to create weekly momentum.</td></tr>
                <tr><td>Share page</td><td>Communicates the result to investors and internal reviewers.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">3</span>
          <h2>Non-goals</h2>
          <ul>
            <li>Not a certified carbon-accounting product.</li>
            <li>Not a broad tech-startup product yet.</li>
            <li>Not a compliance filing tool.</li>
            <li>Not a handprint-only calculator.</li>
          </ul>
          <aside className="report-note"><b>Stage 1 verdict</b><p>If the climate-startup wedge does not work, the rest of the system should not expand.</p></aside>
        </section>
      </div>
    </section>
  );
}

function Stage2Page() {
  return (
    <section className="report-section" id="stage-2">
      <ChapterLabel number="02.3">Docs / Stage 2 PRD</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="PRD stage 2"
          title="Generalization, customization, and follow-up"
          summary="Stage 2 expands the product only after the wedge works. It adds footprint-only mode, profile-based rubrics, audience-specific share pages, and a follow-up loop that turns readings into owned tasks."
          links={[
            ["/gtr/docs/stage-1/", "Review Stage 1"],
            ["/gtr/slides/climate-goal-platform/", "See the slide version"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>What expands</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Axis</th><th>Stage 2 addition</th></tr></thead>
              <tbody>
                {stage2Axes.map(([axis, detail]) => (
                  <tr key={axis}><td>{axis}</td><td>{detail}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Business model change</h2>
          <p>Stage 2 introduces a footprint-only tier for general tech startups, while the climate-startup product remains the flagship. The upsell is not more charts. It is a better operating loop: data-driven rubrics, routing, and follow-up.</p>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>Risks to keep visible</h2>
          <ul>
            <li>Customization sprawl can turn the product into a configuration maze.</li>
            <li>Follow-up can become noisy if cadence is ignored.</li>
            <li>Generalization can weaken the climate-first credibility if it arrives too early.</li>
            <li>Portfolio and investor tooling should not flatten the underlying company logic.</li>
          </ul>
          <aside className="report-note report-note-yellow"><b>Stage 2 rule</b><p>Generalize only after the climate wedge proves that the workflow has real pull.</p></aside>
        </section>
      </div>
    </section>
  );
}

function SlidesOverviewPage() {
  return (
    <section className="report-section" id="slides">
      <ChapterLabel number="03">Slides</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Slides index"
          title="The slide decks track the same story as the docs"
          summary="The earlier GTR Partners deck frames the service idea. The later Climate Goal Platform deck reframes the project as a product. That shift is the point of the archive."
          links={[
            ["/gtr/slides/gtr-partners/", "GTR Partners"],
            ["/gtr/slides/climate-goal-platform/", "Climate Goal Platform"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">3.0</span>
          <h2>Deck map</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Deck</th><th>Focus</th><th>Relationship to the docs</th></tr></thead>
              <tbody>
                <tr><td>GTR Partners</td><td>Startup climate awareness and advisory services</td><td>Earlier framing</td></tr>
                <tr><td>Climate Goal Platform</td><td>Two-sided impact dashboard for climate startups</td><td>Later product framing</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">3.1</span>
          <h2>Reading note</h2>
          <p>The slides are not separate from the docs. They are the presentation layer for the same trajectory: advisory service first, product second, climate startups as the wedge, and a measurement system that keeps the positive and negative sides legible.</p>
        </section>
      </div>
    </section>
  );
}

function GTRPartnersPage() {
  return (
    <section className="report-section" id="gtr-partners">
      <ChapterLabel number="03.1">Slides / GTR Partners</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="GTR Partners"
          title="The original deck framed a transition service"
          summary="This deck focused on San Francisco startup culture, climate awareness, founder habits, and a service model that could bridge tech work with planetary impact."
          links={[
            ["/gtr/slides/climate-goal-platform/", "Later product deck"],
            ["/gtr/docs/research-report/", "Research report"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>What the deck argues</h2>
          <p>The deck treats climate awareness as something startups should build into daily operations. It proposes advisory services, founder support, and nature-based immersive work as a bridge between ambition and responsibility.</p>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Key themes</h2>
          <ul>
            <li>Startup culture in San Francisco is the setting.</li>
            <li>Climate impact is underpriced and often disconnected from the company story.</li>
            <li>Founders need a way to connect strategy, operations, and nature.</li>
            <li>Climate Brick appears as a reference for scaling and capital logic.</li>
          </ul>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>How it differs from the product deck</h2>
          <p>This deck is advisory-led and service-led. The later deck is measurement-led and product-led. That is the archive's most important pivot.</p>
        </section>
      </div>
    </section>
  );
}

function ClimateGoalPlatformPage() {
  return (
    <section className="report-section" id="climate-goal-platform">
      <ChapterLabel number="03.2">Slides / Climate Goal Platform</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Climate Goal Platform"
          title="The updated deck makes the product shift explicit"
          summary="This deck reframes GTR as a climate startup +/- impact dashboard with a two-sided ledger, integrity gates, and a weekly operating loop."
          links={[
            ["/gtr/docs/research-report/", "Back to the report"],
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>What the deck emphasizes</h2>
          <ul>
            <li>Climate startups first, because the value proposition is already impact-shaped.</li>
            <li>Positive and negative impact must stay separate.</li>
            <li>The product needs to be credible enough for diligence, not just catchy on a slide.</li>
            <li>The workflow should turn impact into a weekly habit.</li>
          </ul>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Slide logic</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Section</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Why climate startups first</td><td>Defines the wedge and buyer.</td></tr>
                <tr><td>The +/- model</td><td>Explains the accounting separation.</td></tr>
                <tr><td>Integrity gate</td><td>Shows why additionality matters.</td></tr>
                <tr><td>Roadmap</td><td>Connects MVP, Stage 2, and the longer product path.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>One-line conclusion</h2>
          <aside className="report-note report-note-yellow"><b>Slide conclusion</b><p>The deck turns GTR into a product story with a measurable wedge and a visible growth path.</p></aside>
        </section>
      </div>
    </section>
  );
}

function App() {
  const path = window.location.pathname;
  const activeChapter = path.includes("/docs/")
    ? "docs"
    : path.includes("/slides/")
      ? "slides"
      : "intro";
  const docsPage = path.includes("/docs/research-report")
    ? "research-report"
    : path.includes("/docs/stage-1")
      ? "stage-1"
      : path.includes("/docs/stage-2")
        ? "stage-2"
        : "overview";
  const slidesPage = path.includes("/slides/gtr-partners")
    ? "gtr-partners"
    : path.includes("/slides/climate-goal-platform")
      ? "climate-goal-platform"
      : "overview";

  return (
    <div id="top">
      <Progress />
      <GTRHeader />
      <GTRSidebar
        active={activeChapter}
        subActive={activeChapter === "docs" ? docsPage : activeChapter === "slides" ? slidesPage : undefined}
      />

      <main>
        {activeChapter === "intro" && <IntroPage />}
        {activeChapter === "docs" && docsPage === "overview" && <DocsOverviewPage />}
        {activeChapter === "docs" && docsPage === "research-report" && <ResearchReportPage />}
        {activeChapter === "docs" && docsPage === "stage-1" && <Stage1Page />}
        {activeChapter === "docs" && docsPage === "stage-2" && <Stage2Page />}
        {activeChapter === "slides" && slidesPage === "overview" && <SlidesOverviewPage />}
        {activeChapter === "slides" && slidesPage === "gtr-partners" && <GTRPartnersPage />}
        {activeChapter === "slides" && slidesPage === "climate-goal-platform" && <ClimateGoalPlatformPage />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
