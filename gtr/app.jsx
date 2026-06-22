import { GTRHeader, GTRSidebar, slidesReports } from "./shell.jsx";

const { useEffect, useState } = React;

const testParticipants = [
  ["Amali", "CCA Interaction Design fieldwork participant", "Walked through prototypes one screen at a time"],
  ["Caroline", "Spouse's SaaS startup (Deltic), Seed, 7 FTE", "Role-played founder intake using husband's company"],
  ["Josh", "Pet services startup (Otto)", "Founder tester"],
  ["Ted", "AI marketplace startup", "Founder tester"],
  ["Brian", "Accessibility reviewer", "Founder-adjacent tester"],
];

const sessionQuotes = [
  ["Amali", "Onboarding", "Onboarding can be shorter like plan B. Progressive disclosure step by step feels shorter than the long form."],
  ["Amali", "Report", "Report should combine A and B. Graphs and visualization would help, together with supporting text."],
  ["Amali", "Dashboard", "Milestones looks confusing. What is impact projection? What is the milestone diagram?"],
  ["Amali", "Product", "Is it an app? What is the product — what does it do? Is it specifically climate, environment-related, or finance companies?"],
  ["Amali", "Feature", "Wants leaderboard. Wants to see what other startups are doing and how they are achieving."],
  ["Caroline", "Onboarding", "Every time we have pre-set options to choose from, it's way better."],
  ["Caroline", "Onboarding", "I like this step-by-step version. I prefer the Back/Next setup."],
  ["Caroline", "Privacy", "Early-stage founders in stealth mode might be a little cautious with sharing that data."],
  ["Caroline", "Report", "Oh, the visual one for sure."],
  ["Caroline", "Terms", "What does Net Impact mean? Do people know what levels 1, 2, 3, and 5 mean?"],
  ["Caroline", "Audience", "If you can get access to bigger companies through your university network, you should interview them too."],
  ["Josh", "Onboarding", "When I see there are only four steps, I know it's going to take 5 to 10 minutes tops."],
  ["Josh", "Report", "I was struggling to read and understand what the text-heavy version meant."],
  ["Josh", "Sharing", "No one wants to broadcast their high emissions."],
  ["Ted", "Drop-off", "What am I getting out of this? I would probably stop right here and not fill out the rest of the form."],
  ["Ted", "Upload", "Uploading a pitch deck feels like a massive risk of exposing my intellectual property to a random company without any clear upside."],
  ["Brian", "Accessibility", "Using asterisks for required fields without a clear, visual text indicator fails basic web accessibility guidelines."],
  ["Brian", "Value", "The main question is: why would I do this? How would this benefit me?"],
];

const aggregatedFindings = [
  ["Onboarding format split", "Amali and Caroline preferred step-by-step (variation B). Josh preferred scroll with visible step count and time estimate.", "Support both patterns or default to stepped flow with stated duration and step count."],
  ["Preset inputs over typing", "Amali, Caroline, Josh, and Brian preferred dropdowns and checkboxes over free text.", "Add dropdowns for business model; minimize typing."],
  ["Document upload friction", "Caroline raised stealth-mode concern; Josh, Ted, and Brian also flagged sensitive uploads.", "Replace uploads with manual aggregate fields; keep files local or incubator-only path."],
  ["Value proposition missing", "Amali: product purpose unclear. Ted stopped at upload; Brian asked why he would complete the form.", "State benefit before document step; show preview after step 1."],
  ["Footprint/handprint confusion", "Caroline: card purpose unclear; SaaS handprint = transport avoidance via remote work.", "Add labels; tailor activity defaults by business model."],
  ["Report format", "Amali requested combine A+B; Caroline, Josh, and Brian preferred visual over text-heavy layout.", "Combine text explanation with charts; single-page visual preferred."],
  ["Net impact and maturity unexplained", "Caroline and Josh required interviewer explanation of net impact and levels 1-5.", "Add inline definitions or tooltips."],
  ["Dashboard density", "Amali: milestones and projection confusing; Josh: four-card row skipped; Brian: goals/milestones should be top.", "Vertical stack; separate maturity from metrics; combine goals and milestones."],
  ["LinkedIn sharing conditional", "Josh: would not share high-emission results publicly.", "Share only positive or improved metrics; default to private or investor-only."],
  ["Audience scope unclear", "Amali: unclear if product is an app; climate-only, environment-related, or finance audience.", "State product type, audience, and scope on landing page."],
  ["SaaS / AI fit", "Ted: primary cost is cloud/AI tokens; limited actionable levers at early stage.", "Add token/compute observability; reduce hardware defaults for SaaS."],
  ["Accessibility", "Brian: asterisk-only required fields fail accessibility.", "Use visible [Required] text."],
  ["Peer comparison request", "Amali: wants to see what other startups are doing.", "Add peer benchmark or anonymized comparison section."],
  ["Leaderboard request", "Amali requested leaderboard.", "Out of scope for MVP unless defined; record as future item."],
  ["Larger-company segment", "Caroline and Brian suggested bigger companies may yield richer insights than early startups.", "Record as future research path; not tested in this round."],
];

const onboardingSteps = [
  ["01", "Tell us about your startup", "Company name, website, business model, funding stage, team size. Stated duration: 2-5 minutes."],
  ["02", "Add your documents", "Optional pitch deck and accounts. Files stay local in browser."],
  ["03", "Confirm what your company does", "Checkbox list of EMITS (-) and AVOIDS (+) activities. Selection drives estimation scope."],
  ["04", "Describe it in your words", "Optional free-text field. Generate my assessment ends intake."],
];

const emitsActivities = [
  "Cloud & AI compute",
  "Hardware & electronics",
  "Air travel & commutes",
  "Key vendors & SaaS",
  "Logistics & distribution",
];

const avoidsActivities = [
  "Grid decarbonization",
  "Transport avoidance",
  "Low-carbon materials",
];



const journeyStages = [
  ["Entice", "Demo day", "Awareness via startups presenting impact calculations."],
  ["Entice", "Peer referral", "Referral includes app access and discount code."],
  ["Enter", "Mobile open", "Site opened on mobile; free-assessment CTA visible."],
  ["Engage", "Onboarding", "Pitch deck, accounts, and intake questions completed."],
  ["Engage", "Instant report", "Analysis report delivered; LinkedIn share shown."],
  ["Engage", "Dashboard", "Desktop login for goals, data, and checkpoints."],
  ["Exit", "Team invite", "Team invite link issued; legitimacy evaluated."],
  ["Extend", "Operating use", "Additional company documents added to dashboard."],
];

const archiveMap = [
  {
    id: "fieldwork",
    label: "Fieldwork report",
    purpose: "Prototype user testing for a startup climate concern platform.",
    question: "Can founders complete intake and read the report and dashboard concepts?",
  },
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

function FieldworkFigure({ src, alt, caption, label = "Fig." }) {
  return (
    <figure className="prototype-figure">
      <div className="figure-image">
        <img src={src} alt={alt} />
      </div>
      <figcaption><span>{label}</span><p>{caption}</p></figcaption>
    </figure>
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
            ["/gtr/docs/fieldwork-report/", "Read the fieldwork report"],
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
            <a href="/gtr/docs/fieldwork-report/">Open the fieldwork report <span>→</span></a>
            <a href="/gtr/slides/fieldwork-week/">Open fieldwork slides <span>→</span></a>
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
            ["/gtr/docs/fieldwork-report/", "Fieldwork report"],
            ["/gtr/docs/research-report/", "Research report"],
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
            ["/gtr/docs/stage-2/", "Stage 2 PRD"],
          ]}
        />

        <section className="report-chapter" id="docs-scope">
          <span className="report-number">2.0</span>
          <h2>Scope and method</h2>
          <p className="report-lead">The docs turn a messy project trail into a clear sequence of decisions.</p>
          <p>The fieldwork report documents five prototype testing sessions for a startup climate concern platform. The research report establishes the rationale for the climate startup wedge. Stage 1 defines the product boundary. Stage 2 defines the extension path. Together they show where the project starts, what it must prove, and what remains deliberately out of scope.</p>
        </section>

        <section className="report-chapter" id="docs-map">
          <span className="report-number">2.1</span>
          <h2>Documentation map</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Document</th><th>Main use</th><th>Reading cue</th></tr></thead>
              <tbody>
                <tr><td>Fieldwork report</td><td>Five-session prototype user test (Amali, Caroline, Josh, Ted, Brian).</td><td>Intake A/B, report format, dashboard hierarchy.</td></tr>
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
            <a href="/gtr/docs/fieldwork-report/">Fieldwork report <span>→</span></a>
            <a href="/gtr/docs/research-report/">Read the report <span>→</span></a>
            <a href="/gtr/docs/stage-1/">Stage 1 PRD <span>→</span></a>
            <a href="/gtr/docs/stage-2/">Stage 2 PRD <span>→</span></a>
          </div>
        </section>
      </div>
    </section>
  );
}

function FieldworkReportPage() {
  return (
    <section className="report-section" id="fieldwork-report">
      <ChapterLabel number="02.1">Docs / Fieldwork report</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Fieldwork week · prototype user testing"
          title="Prototype user testing for a startup climate concern platform"
          summary="Five participant sessions. Paper and screen prototypes of intake (variations A/B), assessment report (text vs visual), and dashboard. CCA Interaction Design graduation project fieldwork. Evidence: session notes, debriefs, and transcript (Caroline)."
          links={[
            ["/gtr/docs/research-report/", "Research report"],
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
          ]}
        />

        <nav className="report-contents" aria-label="Fieldwork report contents">
          <p>In this report</p>
          <a href="#fieldwork-summary"><span>0</span>Executive summary</a>
          <a href="#fieldwork-raw"><span>1</span>Raw materials</a>
          <a href="#fieldwork-testing"><span>2</span>The act of testing</a>
          <a href="#fieldwork-project"><span>3</span>About your project</a>
          <a href="#fieldwork-method"><span>4</span>Method and evidence</a>
          <a href="#fieldwork-participants"><span>5</span>Participant records</a>
          <a href="#fieldwork-materials"><span>6</span>Test materials</a>
          <a href="#fieldwork-findings"><span>7</span>Aggregated findings</a>
        </nav>

        <section className="report-chapter" id="fieldwork-summary">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">Fieldwork week deliverable: five prototype sessions for a startup climate concern platform.</p>
          <p>Tested intake (scroll vs step-by-step), assessment report (text vs visual), and dashboard layout with founders and founder-adjacent participants. Recurring blockers: document upload sensitivity, missing value proposition before intake, undefined terms (net impact, maturity levels), dashboard density. Validated: visual report format, preset inputs, separate +/- framing when explained, four-step intake structure.</p>
          <div className="report-next-links">
            <a href="/gtr/slides/fieldwork-week/">Present fieldwork slides <span>→</span></a>
            <a href="/gtr/docs/research-report/">Research report <span>→</span></a>
          </div>
        </section>

        <section className="report-chapter" id="fieldwork-raw">
          <span className="report-number">1</span>
          <h2>Raw materials</h2>
          <p className="report-lead">Quotes, prototype images, and session observations from fieldwork week. Source: session notes and debriefs only.</p>

          <h3>Participant quotes</h3>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Participant</th><th>Topic</th><th>Quote</th></tr></thead>
              <tbody>
                {sessionQuotes.map(([name, topic, quote]) => (
                  <tr key={`${name}-${topic}-${quote.slice(0, 24)}`}><td>{name}</td><td>{topic}</td><td><q>{quote}</q></td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Prototype artifacts</h3>
          <p>Paper and screen prototypes shown in sessions. Sample company in printed materials: pre-seed hardware and clean-energy startup.</p>
          <div className="prototype-grid">
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/onboarding-flow-4up.jpg"
              alt="Four hand-drawn wireframe screens for the free impact assessment onboarding flow"
              caption="Onboarding flow: company profile, documents, EMITS/AVOIDS selection, generate assessment."
              label="Fig. 1"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/assessment-report-print.jpg"
              alt="Printed two-page instant impact assessment report"
              caption="Instant report: footprint, handprint, hotspots, peer comparison, share CTA."
              label="Fig. 2"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/dashboard-sketch.jpg"
              alt="Hand-drawn dashboard overview sketch"
              caption="Dashboard sketch: footprint, handprint, net, goals, milestones, projection."
              label="Fig. 3"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/user-journey-storyboard.jpg"
              alt="Eight-panel user journey storyboard"
              caption="Storyboard: demo day through onboarding, report, dashboard, extended use."
              label="Fig. 4"
            />
          </div>

          <h3>Cross-session observations</h3>
          <ul>
            <li>Amali and Caroline both preferred step-by-step onboarding (variation B); Josh preferred scroll with step count (variation A).</li>
            <li>Amali, Caroline, Josh, and Brian preferred preset dropdowns and checkboxes over free text.</li>
            <li>Caroline raised stealth-mode concern for pitch deck and accounts upload; Ted and Brian also flagged sensitive uploads.</li>
            <li>Amali requested combine text and visual report; Caroline, Josh, and Brian preferred visual over text-heavy layout.</li>
            <li>Net impact and maturity levels 1-5 required interviewer explanation (Caroline, Josh).</li>
          </ul>
        </section>

        <section className="report-chapter" id="fieldwork-testing">
          <span className="report-number">2</span>
          <h2>The act of testing</h2>
          <p className="report-lead">Draft reflection on how testing was run during fieldwork week.</p>

          <h3>What did you learn about testing?</h3>
          <ul>
            <li>Peer sessions before stakeholder sessions caught flow and script problems early. Internal runs reduced embarrassment and let the team fix sequencing before exposing founders.</li>
            <li>Think-aloud on paper prototypes still surfaces real blockers. Upload sensitivity, value proposition gaps, and jargon confusion appeared without a working product.</li>
            <li>Participants react to the project concept and the UI in the same session. A founder can reject the form before evaluating the report if the upside is unclear.</li>
            <li>A/B comparisons (scroll vs step-by-step onboarding; text vs visual report) produce directional signal but not a unanimous winner at n=5. Pattern-level issues (uploads, undefined terms) replicated faster than layout preferences.</li>
            <li>Role-play with a proxy company (Caroline using spouse's SaaS startup Deltic) still produced valid friction on stealth mode, SaaS handprint interpretation, and product scope questions.</li>
            <li>Single-session red flags should be held; cross-participant patterns should trigger redesign. The iteration rule matched how the team actually decided what to change.</li>
          </ul>

          <h3>What mistakes did you make while testing?</h3>
          <ul>
            <li>Placed optional document upload (step 2) before participants understood what they would receive. Ted stated he would stop before finishing; Brian asked why he would complete the form at all.</li>
            <li>Used terms (net impact, maturity levels, impact projection, milestone diagram) without inline definitions. Multiple sessions required interviewer explanation, which is not scalable.</li>
            <li>Footprint and handprint card labels did not read clearly for SaaS. Caroline had to infer handprint from transport avoidance via remote work.</li>
            <li>Sample numbers differed between the instant report and dashboard sketch (e.g. footprint 10.7 vs 42.6 tCO₂e). This added confusion when asking participants to evaluate hierarchy, not arithmetic.</li>
            <li>Tested many concepts per session (onboarding A/B, report A/B, dashboard, storyboard, sharing). Sessions ran long and some questions (e.g. leaderboard, peer comparison) were recorded but not designed for.</li>

          </ul>

          <h3>What worked well while testing?</h3>
          <ul>
            <li>Internal peer-test-first protocol. Team resolved obvious flow issues before stakeholder time.</li>
            <li>Think-aloud with interviewer-led walkthrough. Participants named concerns (IP risk, LinkedIn sharing, accessibility) unprompted.</li>
            <li>Low-fidelity paper and pencil prototypes. Fast to revise between sessions; founders engaged with layout and copy, not polish.</li>
            <li>Four-step intake with stated duration (2-5 minutes) and visible step count. Josh used step count to estimate time commitment.</li>
            <li>A/B onboarding and report variants in the same session. Direct preference statements (Amali and Caroline: B; Josh: A for onboarding; visual report preferred across sessions).</li>
            <li>Real startup contexts in the room: Josh (Otto pet services), Ted (AI marketplace), Brian (accessibility and founder-adjacent). Feedback mapped to business models, not generic opinions.</li>
            <li>Recording concept reactions alongside task walkthrough. Ted's drop-off and Brian's incubator distribution suggestion came from "would you use this?" not checkbox tasks.</li>
          </ul>
        </section>

        <section className="report-chapter" id="fieldwork-project">
          <span className="report-number">3</span>
          <h2>About your project</h2>
          <p className="report-lead">Draft synthesis: who was tested, what changed, what held, and what remains open.</p>

          <h3>Who did you test with?</h3>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Participant</th><th>Context</th><th>Role in test</th></tr></thead>
              <tbody>
                {testParticipants.map(([name, context, role]) => (
                  <tr key={name}><td>{name}</td><td>{context}</td><td>{role}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Primary audience: startup founders or founder proxies completing intake and reacting to report and dashboard concepts. Amali walked through prototypes one screen at a time. Caroline role-played her husband's SaaS startup (Deltic). Brian added accessibility and distribution lens.</p>

          <h3>What did you learn from your stakeholders?</h3>
          <ul>
            <li>Early-stage founders treat pitch decks and accounts as IP and stealth risks, not optional convenience (Caroline, Ted, Brian).</li>
            <li>Product purpose and audience must be clear before intake investment. Amali asked whether this is an app and who it is for; Ted and Brian asked what they get from completing the form.</li>
            <li>Visual report with graphs and supporting text beats text-heavy layout; Amali requested combining both report variations (Caroline, Josh, Brian).</li>
            <li>Dashboard should stack vertically: overview, then goals and milestones at top; maturity and status metrics lower (Josh, Brian). Four-card horizontal row was skipped or read as messy.</li>
            <li>SaaS and AI startups: primary cost driver is cloud compute and token usage, not hardware checklist items (Ted). Manual spend fields may fit better than document upload.</li>
            <li>LinkedIn sharing is conditional. Founders will not broadcast high-emission results; positive or improved metrics for investors are acceptable (Josh).</li>
            <li>Product scope and audience are unclear from prototypes alone. Amali asked whether this is an app and whether the audience is climate-only, environment-related, or finance companies.</li>
            <li>Accessibility: asterisk-only required fields fail basic guidelines; use visible [Required] text (Brian).</li>
            <li>Peer comparison and leaderboard requested (Amali) but undefined for MVP scope.</li>
            <li>Caroline and Brian suggested interviewing larger companies for richer environmental footprint data.</li>
          </ul>

          <h3>Major changes or pivots from their feedback</h3>
          <ul>
            <li>Deprioritize pitch deck and accounts upload as default intake path. Shift toward manual aggregate fields (e.g. monthly AI/cloud spend) and incubator-only document path (Brian).</li>
            <li>Move value proposition and output preview earlier — show what the assessment delivers after step 1, not only at report end (Brian, Ted).</li>
            <li>Default report direction toward visual/infographic layout combined with explanatory text, not text-primary alone (Amali, Caroline, Josh).</li>
            <li>Redesign dashboard hierarchy: vertical stack; combine goals and milestones; separate maturity from headline metrics (Josh, Brian).</li>
            <li>Add SaaS-specific intake: token/compute observability instead of generic hardware defaults (Ted).</li>
            <li>Restrict public sharing to positive or improved metrics; default private or investor-only (Josh).</li>
          </ul>

          <h3>Ideas validated from testing</h3>
          <ul>
            <li>Four-step intake structure (profile, documents optional, EMITS/AVOIDS selection, generate) is completable and understandable when jargon is explained.</li>
            <li>Separate footprint (-) and handprint (+) framing resonates when labels are clear. Participants engaged with activity checklists.</li>
            <li>Preset options and dropdowns preferred over typing for business model, funding stage, and activity selection.</li>
            <li>Progress indicator and stated step count reduce perceived length of onboarding.</li>
            <li>Instant visual assessment report is the compelling artifact. Participants preferred it over dashboard for first read.</li>
            <li>Overall concept rated positively (Amali: clean design, understandable, idea is good; Caroline: interesting and cool).</li>
          </ul>

          <h3>Challenges you still face</h3>
          <ul>
            <li>Onboarding format unresolved: scroll with step count (Josh) vs step-by-step with Back/Next (Amali and Caroline).</li>
            <li>Document upload path not tested with real files, incubator integration, or trusted third-party context.</li>
            <li>Emissions numbers in prototypes are illustrative only; not validated against source data.</li>
            <li>Net impact, maturity levels, impact projection, and milestones still need product copy, not interviewer explanation.</li>
            <li>Peer benchmark and leaderboard requested but scope, privacy, and data model undefined.</li>
            <li>Larger-company segment suggested by Caroline and Brian; not tested in this round.</li>
          </ul>

          <h3>Next steps based on feedback</h3>
          <ol>
            <li>Build interactive prototype with value proposition above the fold and preview after step 1.</li>
            <li>Replace default document upload with manual spend fields; keep upload as optional incubator path.</li>
            <li>Ship visual report layout first; add inline definitions for net impact, maturity, milestones, impact projection.</li>
            <li>Redesign dashboard as vertical hierarchy with goals and milestones at top.</li>
            <li>Add business-model-specific defaults (SaaS: cloud/AI compute; pet services: logistics; etc.).</li>
            <li>Retest onboarding A vs B with additional participants before picking a default.</li>
            <li>Run accessibility pass on required-field labeling and form structure.</li>
          </ol>
          <div className="report-next-links">
            <a href="/gtr/slides/fieldwork-week/">Present fieldwork week slides <span>→</span></a>
            <a href="/gtr/docs/stage-1/">Stage 1 PRD <span>→</span></a>
          </div>
        </section>

        <section className="report-chapter" id="fieldwork-method">
          <span className="report-number">4</span>
          <h2>Method and evidence</h2>
          <p className="report-lead">Think-aloud prototype sessions during fieldwork week.</p>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Dimension</th><th>Record</th></tr></thead>
              <tbody>
                <tr><td>Sequence</td><td>Internal team runs first; stakeholder sessions after internal kinks are addressed.</td></tr>
                <tr><td>Participants</td><td>5 (Amali, Caroline, Josh, Ted, Brian).</td></tr>
                <tr><td>Format</td><td>Interviewer-led walkthrough; think-aloud; A/B comparison of onboarding and report layouts.</td></tr>
                <tr><td>Materials</td><td>Onboarding wireframes (scroll and step), assessment report (text and visual), dashboard sketch, user-journey storyboard.</td></tr>
                <tr><td>Test objectives</td><td>Intake friction, document sensitivity, +/- comprehension, report readability, dashboard hierarchy, stated willingness to share, reaction to overall project concept.</td></tr>
                <tr><td>Iteration rule</td><td>Small prototype updates allowed after each session. Specific headline or CTA variants require multiple participants before a decision.</td></tr>
                <tr><td>Change threshold</td><td>Single-participant red flags held until replicated. Pattern-level red flags trigger redesign of what is tested and how.</td></tr>
                <tr><td>Evidence status</td><td>Session notes and debriefs. Not production validation.</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Testing protocol</h3>
          <ul>
            <li>Run sessions with each other before stakeholder sessions. Resolve flow and script issues internally first.</li>
            <li>Record reactions to the overall project concept, not only UI task completion.</li>
            <li>Apply minor prototype edits between sessions. Do not treat one session as final for headline/CTA decisions without repetition across participants.</li>
            <li>Do not change the test plan based on one negative session alone.</li>
            <li>Change the test plan when the same issue appears across multiple participants.</li>
          </ul>
        </section>

        <section className="report-chapter" id="fieldwork-participants">
          <span className="report-number">5</span>
          <h2>Participant records</h2>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Participant</th><th>Context</th><th>Role</th></tr></thead>
              <tbody>
                {testParticipants.map(([name, context, role]) => (
                  <tr key={name}><td>{name}</td><td>{context}</td><td>{role}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Amali</h3>
          <p>Participant 1. Walked through the form one screen at a time. Stated design is clean and understandable.</p>
          <ul>
            <li>Onboarding: preferred variation B (shorter, step-by-step). Stated progressive disclosure feels shorter than long form. Requested clear end state on final step.</li>
            <li>Report: requested combining variations A and B. Stated graphs and visualization would help with supporting text to explain what the graph shows.</li>
            <li>Dashboard: milestones read as confusing. Asked what impact projection and the milestone diagram mean. Requested leaderboard and peer comparison (what other startups are doing and how they are achieving).</li>
            <li>Product scope: asked whether product is an app. Stated what the product does is not clear. Asked whether audience is climate-only, environment-related, or finance companies.</li>
            <li>Overall: stated idea is good and the project could be improved.</li>
          </ul>

          <h3>Caroline</h3>
          <p>Role-played spouse's SaaS startup Deltic (deltic.com, Seed, 7 FTE, SaaS). Think-aloud session with transcript on file. Not a founder herself; raised founder-proxy concerns.</p>
          <ul>
            <li>Onboarding: opened session using husband's startup as example. Asked whether Pre-Seed includes accelerators and incubators. Preferred preset options and dropdowns over typing; requested business model dropdown. Progress indicator noted as useful. Preferred variation B (Back/Next) over continuous scroll.</li>
            <li>Documents: raised stealth-mode concern for pitch deck and accounts at early stage. Stated early-stage founders are cautious about competitors and sharing business ideas.</li>
            <li>Footprint/handprint: card purpose unclear initially. For SaaS, applied transport avoidance via remote work (home offices; walking/biking vs commute). Hardware and logistics examples did not apply to Deltic.</li>
            <li>Report: preferred visual/infographic variation ("the visual one for sure").</li>
            <li>Dashboard: assessment layout preferred over dashboard layout. Net impact and maturity levels 1-5 required interviewer explanation.</li>
            <li>Audience: suggested interviewing bigger companies through university network; noted larger environmental footprint and reporting requirements.</li>
            <li>Overall: stated project is interesting and cool. Congratulated team on graduation project (CCA Interaction Design).</li>
          </ul>

          <h3>Josh (Otto, pet services)</h3>
          <ul>
            <li>Onboarding: preferred variation A (scroll) if step count and time estimate shown at start (e.g. four steps, 5-10 minutes). Stated scroll allows correcting answers without repeated Back clicks.</li>
            <li>Report: preferred visual/infographic variation. Stated text-heavy layout was difficult to parse.</li>
            <li>Sharing: stated full report on LinkedIn is too much; would not share high-emission results publicly. Would share if metrics look good for investors.</li>
            <li>Dashboard: four-card horizontal layout read as messy; recommended vertical stack (overview, then goals, then milestones).</li>
          </ul>

          <h3>Ted (AI marketplace)</h3>
          <ul>
            <li>Value proposition: asked what he gets from completing the form; stated he would stop before finishing. Uploading pitch deck stated as IP risk without clear upside.</li>
            <li>Business model auto-detect: stated system cannot infer business model from company name or URL alone.</li>
            <li>Documents: one-person/tiny teams lack data to upload; larger teams still hesitant on sensitive files.</li>
            <li>SaaS impact: stated primary cost is cloud compute and AI credits; limited levers at early stage. Suggested token-usage observability instead of generic footprint checklist.</li>
          </ul>

          <h3>Brian</h3>
          <ul>
            <li>Accessibility: asterisk-only required fields fail basic accessibility; use visible [Required] text.</li>
            <li>Labels: business model label unclear; recent accounts and pitch deck read as sensitive. Suggested manual numeric fields (e.g. monthly AI/cloud spend) instead of document upload.</li>
            <li>Onboarding: long form did not invite investment; suggested progressive preview of output after step 1.</li>
            <li>Report: second (visual) variation easier to understand; main question remained "why would I do this?" Suggested correlating cost reduction with impact.</li>
            <li>Metrics: requested travel spend and website carbon (deploy/load impact) in addition to emissions.</li>
            <li>Dashboard: layout dense. Recommended milestones and climate goals at top; maturity and status metrics at bottom; combine goals and milestones sections.</li>
            <li>Distribution: suggested incubator or investor partnership so document sharing occurs inside trusted context.</li>
            <li>Audience: noted larger companies may yield more insight than early startups (legal reporting requirements).</li>
          </ul>
        </section>

        <section className="report-chapter" id="fieldwork-materials">
          <span className="report-number">6</span>
          <h2>Test materials</h2>
          <p>Materials shown across sessions. Sample company in printed materials: pre-seed hardware and clean-energy startup, FTE-scaled modeled estimate.</p>

          <h3>Onboarding (variations A and B)</h3>
          <p>Four steps. Variation A: continuous scroll. Variation B: step-by-step with Back/Next and progress indicator. Stated duration: 2-5 minutes.</p>
          <div className="walkthrough-sequence">
            {onboardingSteps.map(([number, title, detail]) => (
              <span key={number}><i>{number}</i><b>{title}</b><small>{detail}</small></span>
            ))}
          </div>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/onboarding-flow-4up.jpg"
            alt="Four hand-drawn wireframe screens for the free impact assessment onboarding flow"
            caption="Screens 1-4: company profile, optional local documents, EMITS/AVOIDS activity selection, free-text description, generate assessment."
          />
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/onboarding-sheets.jpg"
            alt="Five handwritten paper sheets showing the free impact assessment intake flow"
            caption="Alternate layout: business model, team size, document reminders, generate-assessment CTA."
          />
          <p>Screen 3 collects EMITS (-) footprint and AVOIDS (+) handprint activities. Selection determines estimation scope.</p>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>EMITS (-) footprint</th><th>AVOIDS (+) handprint</th></tr></thead>
              <tbody>
                <tr>
                  <td><ul>{emitsActivities.map((item) => <li key={item}>{item}</li>)}</ul></td>
                  <td><ul>{avoidsActivities.map((item) => <li key={item}>{item}</li>)}</ul></td>
                </tr>
              </tbody>
            </table>
          </div>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/funding-stages.jpg"
            alt="Handwritten funding stage list: Pre-Seed, Seed, Series A, Series B plus"
            caption="Funding-stage options: Pre-Seed, Seed, Series A, Series B+."
            label="Prompt"
          />
          <p>Screen 2 states files stay in-browser and are not uploaded to servers.</p>

          <h3>Assessment report (variations A and B)</h3>
          <p>Printed report (sample company): footprint 10.7 tCO₂e/yr, handprint potential ~20 tCO₂e/yr, maturity Level 1 Mapped. Hotspots: logistics and distribution, cloud and AI compute, purchased electricity. Pencil sketch uses same layout; hotspot values differ (e.g. cloud compute 2.5 vs 0.25 tCO₂e/yr on print).</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/assessment-report-print.jpg"
            alt="Printed two-page instant impact assessment report with footprint, handprint, hotspots, peer comparison, and methodology"
            caption="Printed sample report: footprint, handprint, hotspots, impact beyond carbon, peer comparison, cost exposure, methodology, share and account CTAs."
          />
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/assessment-report-sketch.jpg"
            alt="Pencil sketch of the instant impact assessment report layout"
            caption="Pencil sketch of report layout: footprint, handprint, maturity, hotspots, impact beyond carbon."
          />
          <h3>Dashboard</h3>
          <p>Dashboard sketch: footprint, handprint, derived net, maturity gauge, climate goals, milestones, impact projection. Sample values differ from instant report (footprint 42.6, handprint 108, net -65.4 tCO₂e on sketch vs 10.7 / ~20 on report). Participants asked to define impact projection, milestone diagram, net impact, and maturity levels.</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/dashboard-sketch.jpg"
            alt="Hand-drawn dashboard overview sketch with footprint, handprint, net impact, maturity level, climate goals, milestones, and impact projection"
            caption="Dashboard sketch: separate footprint and handprint, derived net, goals, milestones, projection."
          />

          <h3>User journey storyboard</h3>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/user-journey-storyboard.jpg"
            alt="Hand-drawn eight-panel user journey storyboard from demo day awareness through onboarding, report sharing, dashboard use, and extended use"
            caption="Eight-stage storyboard shown in sessions. Not validated against live participant behavior."
          />
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Stage</th><th>Moment</th><th>Description</th></tr></thead>
              <tbody>
                {journeyStages.map(([stage, moment, detail]) => (
                  <tr key={`${stage}-${moment}`}><td>{stage}</td><td>{moment}</td><td>{detail}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-chapter" id="fieldwork-findings">
          <span className="report-number">7</span>
          <h2>Aggregated findings</h2>
          <p className="report-lead">Cross-participant observations from five sessions. Counts noted where applicable.</p>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Finding</th><th>Observation</th><th>Implication</th></tr></thead>
              <tbody>
                {aggregatedFindings.map(([finding, observation, implication]) => (
                  <tr key={finding}><td>{finding}</td><td>{observation}</td><td>{implication}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


      </div>
    </section>
  );
}

function ResearchReportPage() {
  return (
    <section className="report-section" id="research-report">
      <ChapterLabel number="02.2">Docs / Research report</ChapterLabel>
      <div className="report-document">
        <PageIntro
          eyebrow="Climate Goal Platform research report"
          title="The report turns GTR into a climate startup product"
          summary="The research report is the core document in the archive. It explains why the project narrowed from broad startup climate support into a climate startup +/- impact dashboard, why that wedge is credible, and what has to be tested before the product expands."
          links={[
            ["/gtr/docs/fieldwork-report/", "Fieldwork report"],
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
      <ChapterLabel number="02.3">Docs / Stage 1 PRD</ChapterLabel>
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
      <ChapterLabel number="02.4">Docs / Stage 2 PRD</ChapterLabel>
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

function SlideEmbedPage({ slideId }) {
  const entry = slidesReports.find(([id]) => id === slideId);
  if (!entry) return null;
  const [, number, label, , slug] = entry;
  return (
    <section className="gtr-slide-shell" id={slideId}>
      <div className="gtr-slide-shell__chrome">
        <p><span>{number}</span> {label}</p>
        <div className="gtr-slide-shell__links">
          {slideId === "fieldwork-week" && <a href="/gtr/docs/fieldwork-report/">Fieldwork report</a>}
          {slideId === "climate-goal-platform" && <a href="/gtr/docs/research-report/">Research report</a>}
          <a href={`/#${slug}`} target="_blank" rel="noopener noreferrer">Open fullscreen ↗</a>
        </div>
      </div>
      <iframe title={label} src={`/#${slug}`} className="gtr-slide-embed" loading="lazy" />
    </section>
  );
}

function isDocsIndex(path) {
  return path === "/gtr/docs" || path === "/gtr/docs/" || path.endsWith("/gtr/docs/index.html");
}

function isSlidesIndex(path) {
  return path === "/gtr/slides" || path === "/gtr/slides/" || path.endsWith("/gtr/slides/index.html");
}

function App() {
  const path = window.location.pathname;

  useEffect(() => {
    if (isDocsIndex(path)) {
      window.location.replace("/gtr/docs/fieldwork-report/");
    } else if (isSlidesIndex(path)) {
      window.location.replace("/gtr/slides/fieldwork-week/");
    }
  }, [path]);

  const activeChapter = path.includes("/docs/")
    ? "docs"
    : path.includes("/slides/")
      ? "slides"
      : "intro";
  const docsPage = path.includes("/docs/fieldwork-report")
    ? "fieldwork-report"
    : path.includes("/docs/research-report")
      ? "research-report"
      : path.includes("/docs/stage-1")
        ? "stage-1"
        : path.includes("/docs/stage-2")
          ? "stage-2"
          : null;
  const slidesPage = path.includes("/slides/fieldwork-week")
    ? "fieldwork-week"
    : path.includes("/slides/gtr-partners")
      ? "gtr-partners"
      : path.includes("/slides/climate-goal-platform")
        ? "climate-goal-platform"
        : null;

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
        {activeChapter === "docs" && docsPage === "fieldwork-report" && <FieldworkReportPage />}
        {activeChapter === "docs" && docsPage === "research-report" && <ResearchReportPage />}
        {activeChapter === "docs" && docsPage === "stage-1" && <Stage1Page />}
        {activeChapter === "docs" && docsPage === "stage-2" && <Stage2Page />}
        {activeChapter === "slides" && slidesPage && <SlideEmbedPage slideId={slidesPage} />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
