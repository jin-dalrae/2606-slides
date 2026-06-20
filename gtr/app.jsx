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

const competitiveLandscape = [
  { category: "Footprint-only carbon tools", offer: "Measure the negative side well", gap: "Do not resolve the positive side." },
  { category: "Avoided-emissions and credit tools", offer: "Handle parts of the + side", gap: "Usually sit outside a live operating workflow." },
  { category: "Climate Brick", offer: "A useful scaling and capital reference", gap: "Not an impact measurement engine." },
  { category: "General AI summaries", offer: "Compress navigation and topic extraction", gap: "Can hide the source trail and minority positions." },
];

const productFlow = [
  ["1. Map", "List the company's operations, vendors, product use, and customer effects."],
  ["2. Rank", "Sort activities by likely materiality so the intake can start fast."],
  ["3. Measure", "Use a tiered ladder: proxy, metered, modeled."],
  ["4. Gate", "Baseline, displacement, additionality, marginal signal, rebound."],
  ["5. Monitor", "Track each metric at its natural cadence."],
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

const marketSignals = [
  ["Climate tech VC", "$40.5B invested in 2025, up roughly 8% YoY; about $255B cumulatively since 2020."],
  ["Carbon accounting software", "Estimated at $14.1B-$22.5B in 2025, with roughly 22% CAGR in the cited analyst range."],
  ["Regulatory pull", "California SB 253 pushes reporting down to suppliers; EU CSRD is weaker as a startup tailwind."],
  ["Validation proxy", "Watershed's $100M Series C at a $1.8B valuation is the clearest willingness-to-pay signal cited in the report."],
];

const impactChecks = [
  ["Baseline", "What would have happened without the solution?"],
  ["Displacement", "Did the clean output replace fossil output or merely add supply?"],
  ["Additionality", "Would the avoided claim still exist if the solution had not shipped?"],
  ["Marginal signal", "Does the model use the plant that actually ramps, not a flattering average?"],
  ["Rebound", "Does the cleaner or cheaper path induce more total consumption?"],
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
          title="Climate Goal Platform is a product report, not a pitch deck"
          summary="The archive reads the GTR project the way the docs ask it to be read: as a climate-first product transition. The early advisory framing gives way to a reusable +/- impact dashboard for climate startups, with the slide decks showing the same pivot from service to product."
          links={[
            ["/gtr/docs/research-report/", "Read the research report"],
            ["/gtr/slides/climate-goal-platform/", "See the product deck"],
          ]}
        />

        <nav className="report-contents" aria-label="GTR contents">
          <p>In this archive</p>
          <a href="#summary"><span>0</span>Executive summary</a>
          <a href="#pivot"><span>1</span>Rescoped direction</a>
          <a href="#market"><span>2</span>Market and timing</a>
          <a href="#model"><span>3</span>The +/- model</a>
          <a href="#questions"><span>4</span>Research questions</a>
          <a href="#deck-evidence"><span>5</span>Deck evidence</a>
          <a href="#decision"><span>6</span>Decision rule</a>
        </nav>

        <section className="report-chapter" id="summary">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">Climate Goal Platform is a product direction for making a startup's environmental impact a live, owned, and credible operating surface rather than an annual slide.</p>
          <p>The report narrows the MVP to climate startups and a two-sided +/- net impact dashboard. The positive side is handprint, meaning avoided or enabled emissions. The negative side is footprint, meaning Scope 1, 2, and 3 emissions. The early broad framing becomes the stretch tier, not the starting point.</p>
          <p>The reason the product exists is also the reason it is narrow: for climate startups, impact is not an extra claim. It is the investment thesis itself. That makes them the right wedge, because the buyer already cares about the claim and already needs to defend it.</p>
          <p>The report's tone is deliberate: it does not promise a magical new climate system. It argues for a practical operating surface that can be measured, checked, and used week to week without flattening the accounting logic.</p>
          <aside className="report-note"><b>What the archive shows</b><p>The docs, PRDs, and slides all point toward the same shape: a climate-first product, a separate accounting for + and -, and a weekly operating loop that makes the number useful to founders and investors.</p></aside>
        </section>

        <section className="report-chapter" id="pivot">
          <span className="report-number">1</span>
          <h2>The rescoped direction</h2>
          <p>The earlier Social Lab direction was a hands-on advisory and transition service: measure a startup's climate impact, build a reduction strategy, support ongoing management, and run nature-based founder workshops, with Climate Brick embedded in an AI Capital Navigator. That model is valuable, but it does not scale past one-to-one engagements.</p>
          <p>The new direction turns the repeatable core into a product, and sequences it: climate startups first, because that is where the two-sided model is non-negotiable, the integrity bar is highest, and a paying, sophisticated buyer already exists. Broad tech startups come later.</p>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead>
                <tr><th>Before</th><th>Now</th><th>Why the change matters</th></tr>
              </thead>
              <tbody>
                <tr><td>Advisory service: measure, reduce, reconnect founders</td><td>Self-serve gamified +/- impact dashboard</td><td>The work becomes a repeatable product instead of a bespoke service.</td></tr>
                <tr><td>Broad startup audience</td><td>Climate startups first</td><td>The buyer and the impact claim are already tightly linked in that wedge.</td></tr>
                <tr><td>Climate Brick embedded as the method</td><td>Climate Brick as reference only</td><td>The report wants an ownable measurement method, not a borrowed one.</td></tr>
                <tr><td>Impact adjacent to business</td><td>Impact as operating surface</td><td>The dashboard should be used weekly, not just reviewed annually.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="market">
          <span className="report-number">2</span>
          <h2>Market and timing</h2>
          <p className="report-lead">The timing driver is not hype. It is reporting pressure moving down-market.</p>
          <p>The report treats the market as large and funded, but it keeps the numbers in ranges and the regulatory timing honest. The point is not that regulation forces the purchase now. The point is that the wedge is credible, the buyer already exists, and the direction of travel favors a more defensible impact surface.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Signal</th><th>What the report says</th></tr></thead>
              <tbody>
                {marketSignals.map(([signal, detail]) => (
                  <tr key={signal}><td>{signal}</td><td>{detail}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>California SB 253 matters because it forces large CA-nexus companies to collect emissions data from suppliers, which includes startups. EU CSRD is weaker for this project because it explicitly tries to reduce supplier trickle-down. The honest caveat stays visible: the SEC climate rule is not a tailwind if it is being rescinded.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Landscape</th><th>What it offers</th><th>What remains missing</th></tr></thead>
              <tbody>
                {competitiveLandscape.map((item) => (
                  <tr key={item.category}><td>{item.category}</td><td>{item.offer}</td><td>{item.gap}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="model">
          <span className="report-number">3</span>
          <h2>The +/- model</h2>
          <p className="report-lead">The report presents net impact as two ledgers and one derived figure.</p>
          <p>Footprint is an inventory of real emissions. Handprint is a comparative model of what would have happened otherwise. Net is a context number shown alongside, not instead of, the two ledgers. The report is explicit that these accounting bases should never be merged into one silent total.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Side</th><th>What it captures</th><th>Accounting basis</th></tr></thead>
              <tbody>
                <tr><td>- Footprint</td><td>The startup's own emissions: Scope 1 direct, Scope 2 energy, Scope 3 value chain</td><td>Inventory: what you actually emitted</td></tr>
                <tr><td>+ Handprint</td><td>Emissions the solution helps others avoid versus a reference scenario</td><td>Comparative: what would have happened otherwise</td></tr>
                <tr><td>= Net</td><td>A context figure shown alongside, not instead of, the inventory</td><td>Derived, with uncertainty bands</td></tr>
              </tbody>
            </table>
          </div>
          <aside className="report-note report-note-yellow"><b>Non-negotiable</b><p>Footprint is an inventory. Avoided emissions are a counterfactual model. The product should never merge them into one quiet number.</p></aside>
        </section>

        <section className="report-chapter" id="questions">
          <span className="report-number">4</span>
          <h2>Research questions</h2>
          <p>The report keeps the research questions narrow on purpose. It wants to know what can be measured, when it can be measured, and whether the result is useful enough to become a repeated operating habit.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Question</th><th>Why it matters</th></tr></thead>
              <tbody>
                <tr><td>What viable, reliable method lets a startup monitor its own handprint and footprint?</td><td>The report wants an activity-based method that can be measured in tiers and tracked on a cadence.</td></tr>
                <tr><td>What impact can actually be addressed in the dashboard, and can it be checked at the right time?</td><td>Footprint can be metered more directly than handprint, which is usually a later model with uncertainty.</td></tr>
                <tr><td>Can a climate startup read the dashboard weekly without greenwashing?</td><td>The product is meant to become a team habit, not a compliance artifact.</td></tr>
                <tr><td>Can generated structure stay inspectable?</td><td>AI labels and clusters need to stay source-linked and reversible.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="deck-evidence">
          <span className="report-number">5</span>
          <h2>What the slides reinforce</h2>
          <p>GTR Partners gives the earlier service story: San Francisco startup culture, climate awareness, founder behavior, and an AI Capital Navigator built around Climate Brick. The Climate Goal Platform deck shows the later product story: climate startups first, a two-sided ledger, an integrity gate, and a weekly operating layer.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Deck</th><th>Signal</th><th>Role in the archive</th></tr></thead>
              <tbody>
                <tr><td>GTR Partners</td><td>Advisory service and transition support</td><td>Shows the original framing before the product pivot.</td></tr>
                <tr><td>Climate Goal Platform</td><td>Net impact dashboard with gamified operations</td><td>Shows the product form after the pivot.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="decision">
          <span className="report-number">6</span>
          <h2>Decision rule</h2>
          <p>If a reader can understand why GTR changed shape by reading the report, PRDs, and decks in this archive, the site is doing its job. The content should feel like a documented design decision, not a brand page.</p>
          <p>That means the introduction should read like a report summary, and the research section should read like a report body. The archive should not feel like a portfolio or a marketing site.</p>
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
          title="The report turns GTR into a climate startup product"
          summary="The research report is the core document in the archive. It explains why the project narrowed from broad startup climate support into a climate startup +/- impact dashboard, why that wedge is credible, and what has to be tested before the product expands."
          links={[
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
            ["/gtr/slides/climate-goal-platform/", "Product deck"],
          ]}
        />

        <nav className="report-contents" aria-label="Research report contents">
          <p>In this report</p>
          <a href="#research-summary"><span>0</span>Executive summary</a>
          <a href="#research-direction"><span>1</span>The rescoped direction</a>
          <a href="#research-market"><span>2</span>Why climate startups first</a>
          <a href="#research-model"><span>3</span>The +/- impact model</a>
          <a href="#research-integrity"><span>4</span>Positive impact, done honestly</a>
          <a href="#research-product"><span>5</span>Product overview</a>
          <a href="#research-next"><span>6</span>Research still needed</a>
        </nav>

        <section className="report-chapter" id="research-summary">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">Climate Goal Platform is a product direction for making a climate startup's environmental impact a live, owned, and credible operating surface rather than an annual slide.</p>
          <p>The direction has been rescoped. The MVP narrows to climate startups and a two-sided (+/-) net impact dashboard, where net impact equals positive handprint (avoided and enabled emissions) minus negative footprint (Scope 1, 2, 3). The earlier broad framing becomes the stretch tier, reached only after the rigorous climate-first core works.</p>
          <p>The report also makes a strategic claim: climate startups are the right wedge because, for them, impact is not a side report. It is the investment thesis. The buyer already underwrites impact and already needs to explain it to others.</p>
          <aside className="report-note"><b>Primary premise</b><p>The work is not about making another dashboard pretty. It is about turning impact into something that can be measured, checked, and used operationally without collapsing the accounting logic.</p></aside>
        </section>

        <section className="report-chapter" id="research-direction">
          <span className="report-number">1</span>
          <h2>The rescoped direction</h2>
          <p>The earlier Social Lab direction was a hands-on advisory and transition service: measure a startup's climate impact, build a reduction strategy, support ongoing management, and run nature-based founder workshops, with Climate Brick embedded in an AI Capital Navigator. That model is valuable, but it does not scale past one-to-one engagements.</p>
          <p>The new direction turns the repeatable core into a product, and sequences it: climate startups first, because that is where the two-sided model is non-negotiable, the integrity bar is highest, and a paying, sophisticated buyer already exists. Broad tech startups come later.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Before</th><th>Now</th><th>Implication</th></tr></thead>
              <tbody>
                <tr><td>One-to-one consulting and workshops</td><td>Self-serve gamified dashboard</td><td>The value has to survive without a human service layer.</td></tr>
                <tr><td>Broad startup climate awareness</td><td>Climate startups first</td><td>The report chooses the buyer who already cares most about the claim.</td></tr>
                <tr><td>Climate Brick as the model</td><td>Climate Brick as a reference shelf</td><td>The product needs its own method, not a borrowed one.</td></tr>
                <tr><td>Impact as adjacent context</td><td>Impact as operating surface</td><td>The dashboard should be weekly, owned, and credible.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="research-market">
          <span className="report-number">2</span>
          <h2>Why climate startups first</h2>
          <p>The report says the market is large, funded, and pressured from below. Climate tech VC, carbon accounting software, and regulatory pull all point in the same direction, but the report refuses to overstate certainty. It keeps the argument at the level of a credible wedge rather than a guaranteed market pull.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Reason</th><th>Report logic</th></tr></thead>
              <tbody>
                <tr><td>The + side is the pitch</td><td>A climate startup exists to avoid emissions, so the positive claim deserves revenue-level rigor.</td></tr>
                <tr><td>The - side is ignored</td><td>Cloud, AI compute, hardware, travel, and supply chain emissions are usually missing from the story.</td></tr>
                <tr><td>The buyer already exists</td><td>A climate-focused VC underwrites impact, so it needs a defensible net number, not a slogan.</td></tr>
              </tbody>
            </table>
          </div>
          <aside className="report-note report-note-yellow"><b>Timing note</b><p>The market is large and funded, but the report treats the numbers as ranges and the regulation as uneven. The thesis is not that everyone is forced to buy this now. It is that the wedge is credible and the timing is moving in the right direction.</p></aside>
        </section>

        <section className="report-chapter" id="research-model">
          <span className="report-number">3</span>
          <h2>The +/- impact model</h2>
          <p className="report-lead">Net impact is presented as two ledgers and a clearly labeled derived figure.</p>
          <p>The report's accounting logic is strict. Footprint is the inventory of actual emissions. Handprint is the comparative estimate of avoided or enabled emissions. Net is only a context number. This separation exists so the dashboard can stay honest even when the model is useful.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Side</th><th>What it captures</th><th>Accounting basis</th></tr></thead>
              <tbody>
                <tr><td>- Footprint</td><td>The startup's own emissions: Scope 1 direct, Scope 2 energy, Scope 3 value chain</td><td>Inventory: what you actually emitted</td></tr>
                <tr><td>+ Handprint</td><td>Emissions the solution helps others avoid versus a reference scenario</td><td>Comparative: what would have happened otherwise</td></tr>
                <tr><td>= Net</td><td>A context figure shown alongside, not instead of, the inventory</td><td>Derived, with uncertainty bands</td></tr>
              </tbody>
            </table>
          </div>
          <aside className="report-note"><b>Non-negotiable</b><p>Different accounting bases must stay separate. The report explicitly says the dashboard should never net naively.</p></aside>
        </section>

        <section className="report-chapter" id="research-integrity">
          <span className="report-number">4</span>
          <h2>Positive impact, done honestly</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Test</th><th>Question the dashboard must answer</th></tr></thead>
              <tbody>
                {impactChecks.map(([test, question]) => (
                  <tr key={test}><td>{test}</td><td>{question}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Why the gate matters: in the absence of additionality, quantifying avoided emissions amounts to multiplying by zero. The report treats inflated positive claims as the default failure mode, not an edge case.</p>
          <aside className="report-note report-note-yellow"><b>Integrity gate</b><p>The product should ask for baseline, displacement, additionality, marginal signal, and rebound before the positive side is shown as meaningful.</p></aside>
        </section>

        <section className="report-chapter" id="research-product">
          <span className="report-number">5</span>
          <h2>Product overview</h2>
          <p>The product is a weekly operating surface. A founder enters the company, the system estimates footprint and proposed handprint, integrity gates prompt for baseline and additionality, the team chooses goals, and the company publishes a share page with uncertainty intact.</p>
          <p>The report describes the implementation as a sequence: map the actual company activity, rank what matters, measure by tier, gate the positive claim, then monitor on the cadence each metric deserves. The point is to make the method viable enough to start and reliable enough for a climate VC.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Flow step</th><th>What happens</th></tr></thead>
              <tbody>
                {productFlow.map(([step, detail]) => (
                  <tr key={step}><td>{step}</td><td>{detail}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Module</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Impact ledger</td><td>Shows + handprint and - footprint side by side.</td></tr>
                <tr><td>Integrity gates</td><td>Baseline, displacement, additionality, marginal signal, rebound.</td></tr>
                <tr><td>Freshness layer</td><td>Metered versus modeled values, with cadence and freshness dates.</td></tr>
                <tr><td>Goal board</td><td>Owned actions, deadlines, and evidence points.</td></tr>
                <tr><td>Progress game</td><td>Levels and evidence tied to integrity, not vanity points.</td></tr>
                <tr><td>Share page</td><td>Investor- and LP-ready view that preserves uncertainty.</td></tr>
              </tbody>
            </table>
          </div>
          <aside className="report-note report-note-yellow"><b>Product summary</b><p>The report's goal is not to define the whole company on day one. It is to make the core claim testable, measurable, and worth repeating weekly.</p></aside>
        </section>

        <section className="report-chapter" id="research-next">
          <span className="report-number">6</span>
          <h2>Research still needed</h2>
          <ul>
            <li>Whether people can monitor both handprint and footprint without confusion.</li>
            <li>Whether the dashboard is usable in under 15 minutes of intake.</li>
            <li>Whether the share page is credible in diligence.</li>
            <li>Whether the weekly operating loop actually sticks.</li>
            <li>Whether the positive side can be kept honest as the product expands.</li>
            <li>Whether the cross-device promise stays coherent when the product moves from desktop to headset to lighter wearables.</li>
            <li>Whether AI-assisted labels and clusters remain source-linked and reversible in practice.</li>
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
          title="The slide decks show the pivot in presentation form"
          summary="The GTR Partners deck is the service-era story: San Francisco startup culture, climate awareness, founder behavior, and advisory support. The Climate Goal Platform deck is the product-era story: a two-sided dashboard, a climate startup wedge, and a weekly operating loop."
          links={[
            ["/gtr/slides/gtr-partners/", "GTR Partners"],
            ["/gtr/slides/climate-goal-platform/", "Climate Goal Platform"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">3.0</span>
          <h2>Deck map</h2>
          <p>The slides are useful because they preserve the project's sequence. The early deck argues why climate awareness belongs in startup culture. The later deck shows how that concern became a product with an explicit accounting model.</p>
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
          <p>The slides are not separate from the docs. They are the presentation layer for the same trajectory. If the docs explain the logic, the slides show how the logic was communicated to reviewers, peers, and potential collaborators.</p>
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
          title="The original deck framed GTR as a transition service"
          summary="This deck argues that San Francisco startup culture, climate impact, founder habits, and the relationship to nature should all be part of the conversation before the product pivot."
          links={[
            ["/gtr/slides/climate-goal-platform/", "Later product deck"],
            ["/gtr/docs/research-report/", "Research report"],
          ]}
        />

        <section className="report-chapter">
          <span className="report-number">0</span>
          <h2>What the deck argues</h2>
          <p>The deck treats climate awareness as something startups should build into daily operations. It proposes advisory services, founder support, and nature-based immersive work as a bridge between ambition and responsibility.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Section</th><th>Point being made</th></tr></thead>
              <tbody>
                <tr><td>Why San Francisco</td><td>The city is dense with startups and founder culture, so it is the right setting for the service.</td></tr>
                <tr><td>The blind spot</td><td>Climate impact is underpriced, climate startups are undervalued, and founder culture disconnects from nature.</td></tr>
                <tr><td>Core tension</td><td>Climate change and infrastructure operate on long timelines while venture capital pushes speed.</td></tr>
                <tr><td>Company overview</td><td>GTR Partners bridges the gap with climate measurement, strategy, and immersive experiences.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Key themes</h2>
          <ul>
            <li>Startup culture in San Francisco is the setting.</li>
            <li>Climate impact is underpriced and often disconnected from the company story.</li>
            <li>Founders need a way to connect strategy, operations, and nature.</li>
            <li>Climate Brick appears as a reference for scaling and capital logic.</li>
            <li>The deck positions GTR as a bridge between tech innovation and planetary impact.</li>
          </ul>
        </section>

        <section className="report-chapter">
          <span className="report-number">2</span>
          <h2>How it differs from the product deck</h2>
          <p>This deck is advisory-led and service-led. The later deck is measurement-led and product-led. That is the archive's most important pivot. The slide sequence makes the transition visible: first the service, then the net-impact product.</p>
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
            <li>Climate tech VC, carbon software, and regulatory pressure make the wedge timely enough to test.</li>
          </ul>
        </section>

        <section className="report-chapter">
          <span className="report-number">1</span>
          <h2>Slide logic</h2>
          <p>The deck is structured to make the switch from service to product feel inevitable: the market is real, the accounting is careful, and the operating loop is the thing that makes the product different from a one-off carbon calculator.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Section</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Why climate startups first</td><td>Defines the wedge and buyer.</td></tr>
                <tr><td>The +/- model</td><td>Explains the accounting separation.</td></tr>
                <tr><td>Integrity gate</td><td>Shows why additionality matters.</td></tr>
                <tr><td>Roadmap</td><td>Connects MVP, Stage 2, and the longer product path.</td></tr>
                <tr><td>Market / why now</td><td>Connects funding, software spend, and reporting pressure.</td></tr>
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
