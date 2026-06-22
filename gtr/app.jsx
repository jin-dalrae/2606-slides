import { GTRHeader, GTRSidebar, fieldworkSlide } from "./shell.jsx";

const { useEffect, useState } = React;

const testParticipants = [
  ["Amali", "Data engineer met at a networking event", "Role-played founder; technical and data perspective"],
  ["Caroline", "Investment analyst", "Role-played founder; investor perspective"],
  ["Josh", "CCA Interaction Design student", "Role-played founder; peer-design perspective"],
  ["Ted", "Startup founder", "Actual founder; direct target-audience perspective"],
  ["Brian", "Accessibility Lead at Superhuman", "Role-played founder; accessibility expert perspective"],
];

const sessionObservations = [
  ["Amali", "Assessment", "Preferred the shorter, step-by-step assessment direction."],
  ["Amali", "Report", "Recommended combining graphs with supporting explanation."],
  ["Amali", "Dashboard", "Could not interpret milestones or impact projection without explanation."],
  ["Amali", "Product", "Could not identify the product type, purpose, or intended audience from the prototype alone."],
  ["Amali", "Feature", "Requested peer comparison and a leaderboard concept."],
  ["Caroline", "Assessment", "Preferred preset choices and the Back/Next flow."],
  ["Caroline", "Privacy", "Raised stealth-stage sensitivity around sharing company documents."],
  ["Caroline", "Report", "Preferred Report 2, the infographic version."],
  ["Caroline", "Terms", "Needed definitions for net impact and maturity levels."],
  ["Caroline", "Audience", "Suggested including larger companies in future research."],
  ["Josh", "Assessment", "Preferred a continuous flow when step count and expected duration were visible."],
  ["Josh", "Report", "Found the text-heavy report difficult to parse."],
  ["Josh", "Sharing", "Would not publicly share a high-emissions result."],
  ["Ted", "Value", "Did not see enough benefit to justify completing the intake."],
  ["Ted", "Privacy", "Treated pitch-deck upload as an IP risk without a clear return."],
  ["Brian", "Accessibility", "Flagged asterisk-only required-field labeling as inaccessible."],
  ["Brian", "Value", "Could not identify a sufficient reason to complete the intake."],
];

const aggregatedFindings = [
  ["Assessment format split", "Amali and Caroline preferred Assessment 2, the step-by-step mobile flow. Josh preferred Assessment 1, the continuous flow, with visible step count and time estimate.", "Retest Assessment 1 against Assessment 2 with more founders before selecting a default."],
  ["Preset inputs over typing", "Amali, Caroline, Josh, and Brian preferred dropdowns and checkboxes over free text.", "Add dropdowns for business model; minimize typing."],
  ["Document upload friction", "Caroline raised stealth-mode concern; Josh, Ted, and Brian also flagged sensitive uploads.", "Replace uploads with manual aggregate fields; keep files local or incubator-only path."],
  ["Value proposition missing", "Amali: product purpose unclear. Ted stopped at upload; Brian asked why he would complete the form.", "State benefit before document step; show preview after step 1."],
  ["Footprint/handprint confusion", "Caroline: card purpose unclear; SaaS handprint = transport avoidance via remote work.", "Add labels; tailor activity defaults by business model."],
  ["Report format", "Amali requested a combination of Report 1 and Report 2; Caroline, Josh, and Brian preferred Report 2's infographic direction.", "Use Report 2 as the visual overview and Report 1 as the explanation and methodology layer."],
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

const fieldworkArtifacts = [
  ["Journey storyboard", "storyboard.jpeg", "Eight-stage journey from discovery at demo day through assessment, dashboard use, team access, and extended use"],
  ["Assessment 1 (A)", "assessment1.jpeg + assessment1-stage.jpeg", "Continuous/long-form free impact assessment; the investment-stage paper is part of this version"],
  ["Assessment 2 (B)", "assessment2-mobile.jpeg", "Four-screen mobile assessment with progress, Back, and Next controls"],
  ["Report 1 (A)", "report1-information.jpeg", "Information-led assessment report with footprint, handprint, hotspots, comparison, cost exposure, and methodology"],
  ["Report 2 (B)", "report2-infographic.jpeg", "Infographic assessment report with visual metric cards, maturity gauge, hotspot charts, and impact-beyond-carbon cards"],
  ["Dashboard concept", "dashboard.jpeg", "Extension beyond the instant report: footprint, handprint, derived net, maturity, goals, milestones, and impact projection"],
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

const fieldworkSlideAgenda = [
  ["1", "Storyboard to prototypes", "What we built and which A/B pairs matter"],
  ["2", "Testing process", "Who we tested, what failed, what worked"],
  ["3", "What we learned", "How to read directional evidence"],
  ["4", "Next direction", "Challenges, pivots, and the hybrid prototype"],
];

const testingMistakes = [
  ["01", "Trust before value", "Sensitive documents were requested before participants saw what they would receive.", "Noise"],
  ["02", "Facilitator-dependent terms", "Net impact, maturity, projection, and milestones required interviewer explanation.", "Control"],
  ["03", "Inconsistent sample values", "Report and dashboard used different illustrative emissions numbers.", "Noise"],
  ["04", "Too much per session", "Full journey plus two A/B pairs and dashboard limited depth on each question.", "Scope"],
];

const testingStrengths = [
  ["Peer-test first", "Internal walkthroughs caught sequencing and script problems before stakeholder time."],
  ["Storyboard framing", "Every participant entered the same founder journey before comparing screens."],
  ["Think-aloud", "Trust, comprehension, sharing, and accessibility surfaced beyond task completion."],
  ["Low-fidelity A/B", "Paper artifacts made structural alternatives cheap to compare and revise."],
];

const stakeholderLenses = [
  ["Ted", "Founder", "Value unclear; document upload felt risky", "Show benefit first; manual inputs before files"],
  ["Amali", "Data", "Scope and dashboard terms unclear; wanted visual + explanation", "Define terms; combine both report strengths"],
  ["Caroline", "Investment", "Preferred presets, Assessment 2, and Report 2", "Guided inputs and visual first-read"],
  ["Josh", "Peer design", "Preferred Assessment 1 reviewability and Report 2 readability", "Preserve easy review inside guided flow"],
  ["Brian", "Accessibility", "Labels, hierarchy, and data requests created barriers", "Accessible labels, clearer hierarchy, trusted inputs"],
];

const validatedDecisions = [
  ["Keep", "Storyboard-led sequence: discover → assess → instant report → dashboard."],
  ["Hybrid", "Assessment 2 guidance + Assessment 1 visibility and answer review."],
  ["Layer", "Report 2 visual overview + Report 1 explanation and methodology."],
  ["Separate", "Footprint and handprint distinct, with plain-language definitions."],
];

const openChallenges = [
  ["01", "Assessment navigation", "Guidance and easy review still need to work together.", "Open"],
  ["02", "Real workflow", "No real data, files, deployment, or calculation accuracy was tested.", "Untested"],
  ["03", "Comprehension", "Core terms still depend on facilitator explanation.", "Open"],
  ["04", "Trust", "Privacy claims and trusted document handling remain untested.", "Untested"],
  ["05", "Founder sample", "Only one participant was an actual startup founder.", "Sample"],
  ["06", "Calculation accuracy", "Illustrative emissions model was not tested against real company data.", "Untested"],
];

const pivotChanges = [
  ["Ask for documents before payoff", "Show benefit first; manual fields before files"],
  ["Assessment 1 or Assessment 2", "Hybrid: guided steps + visible scope + answer review"],
  ["Report 1 or Report 2", "Layered: visual overview + explanation and methodology"],
  ["Generic activity checklist", "Business-model-specific questions and defaults"],
  ["Horizontal dashboard cards", "Vertical hierarchy with goals and milestones grouped"],
  ["Public sharing default", "Private by default; selective sharing only for positive or improved metrics"],
];

const nextResearchSteps = [
  ["01", "Build the hybrid", "Value proposition → guided assessment with review → visual report with expandable detail."],
  ["02", "Separate the studies", "Test terminology, document trust, and assessment navigation as distinct questions."],
  ["03", "Recruit more founders", "Then test real data and calculation credibility after the flow works without facilitation."],
];

const fieldworkSpeakerNotes = {
  title: "This is our fieldwork week deliverable — five prototype testing sessions for a climate impact platform aimed at startups. We are not pitching a finished product. We are reporting what we built, how we tested it, what broke, and what we would change before the next round. Flag upfront: every participant was asked to act as a startup founder, but Ted was the only actual founder. That shapes how you read everything that follows.",
  boundary: "Set the boundary before the findings. Five think-aloud sessions, two A/B pairs, one journey storyboard with eight stages. Enough to decide what to redesign and retest — not enough to claim product-market fit, calculation accuracy, or a winning UI variant. Keep Amali, Caroline, Josh, and Brian's role-play feedback analytically separate from Ted's founder signal.",
  agenda: "Four sections, each with a decision attached — not a topic tour. Prototypes first, then honest process review, then how to interpret findings without over-claiming, then concrete pivots for the hybrid prototype. The full written report with participant records is at /gtr/docs/fieldwork-report/.",
  metrics: "Walk the three numbers if needed: five sessions, two A/B pairs, eight journey stages. This round identifies what to retest; it does not validate calculation accuracy or market demand.",
  storyboard: "Walk the storyboard left to right if you have time: demo day, referral, mobile entry, assessment, instant report, dashboard, team invite, extended use. Every paper prototype tested a specific moment in this journey. The narrative came first — and that turned out to be one of the things that worked well.",
  prototypes: "Two numbered A/B pairs, not four unrelated screens. Pair one: Assessment 1 continuous layout versus Assessment 2 four-screen mobile flow — investment-stage paper belongs to Assessment 1. Pair two: Report 1 information-led versus Report 2 infographic-first. Dashboard extends continued use after the instant report; it is not an A/B pair.",
  dashboard: "Participants treated the instant report as the first payoff. Josh wanted a vertical stack; Brian wanted goals and milestones at the top. Amali could not read milestones or projection without facilitator help. Do not expand the dashboard until the instant report works without explanation.",
  intake: "Both assessment variants shared the same intake: profile, optional evidence, EMITS and AVOIDS selection, free text. Screen two says files stay in-browser — but several participants never trusted that because value was not clear first. Caroline's SaaS scenario exposed footprint/handprint card confusion.",
  mistakes: "Be direct about what we did wrong. Trust before value confounded concept trust with form usability. Facilitator-dependent terms mean the prototype did not stand alone. Inconsistent sample values added noise. Too much per session gave breadth but not depth on each A/B question.",
  worked: "What we would repeat: internal peer tests first, storyboard framing, think-aloud for trust and accessibility, paper A/B in the same session. Separate repeated blockers from one-off requests — Amali's leaderboard goes to backlog; trust and comprehension drive redesign.",
  participants: "Five lenses, not five identical founders. Ted's trust reactions are the highest-priority founder signal. Brian's findings are baseline requirements. Caroline informs presets and sharing defaults. When you hear a finding later, ask which lens produced it.",
  synthesis: "Nobody picked one prototype and won. The package is: keep the storyboard sequence, hybrid assessment, layered report, separate footprint and handprint with plain-language definitions. If someone asks which variant won, the answer is synthesis.",
  validated: "Four decisions directionally supported for the next build. Stress that A/B preference at n=5 is directional — repeated signals determine what to retest, not what is validated.",
  challenges: "Do not skip this if the audience is planning-oriented. Real data, deployed trust, facilitator-free comprehension, and calculation accuracy are all still open. Illustrative emissions values are not validated source data.",
  pivots: "The journey sequence stays — feedback did not overturn that. What changes is ordering inside it: benefit before documents, hybrid assessment, layered report, business-model defaults, vertical dashboard, private-by-default sharing. Ted's SaaS point for Q&A: primary cost is cloud and AI tokens, not generic hardware defaults.",
  next: "Three steps in order: build the hybrid flow, run separate studies for terminology trust and navigation, recruit more actual founders. Only after comprehension is stable should real-data workflows enter the test plan. Stage 1 PRD is the build target if anyone asks what ships first.",
  close: "Close on the shift, not a recap. Fieldwork moved us from which layout looks better to whether a founder would trust the intake and understand the result without help. Full participant records and prototype files are in the written report. Open for questions on any lens or artifact.",
};

const archiveMap = [
  {
    id: "fieldwork",
    label: "Fieldwork report",
    purpose: "Prototype user testing for a climate impact platform for startups.",
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

function FieldworkFigure({ src, alt, caption, label = "Fig.", compact = false }) {
  return (
    <figure className={`prototype-figure${compact ? " prototype-figure--compact" : ""}`}>
      <div className="figure-image">
        <img src={src} alt={alt} />
      </div>
      <figcaption>{label && <span>{label}</span>}<p>{caption}</p></figcaption>
    </figure>
  );
}

function SlideNote({ note, visible = true }) {
  if (!note || !visible) {
    return null;
  }

  return (
    <aside className="slide-speaker-note" aria-label="Speaker note">
      <b>Speaker note</b>
      <p>{note}</p>
    </aside>
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
            <a href="/gtr/docs/fieldwork-report/slides/">Open fieldwork slides <span>→</span></a>
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
          <p>The fieldwork report documents five prototype testing sessions for a climate impact platform for startups. The research report establishes the rationale for the climate startup wedge. Stage 1 defines the product boundary. Stage 2 defines the extension path. Together they show where the project starts, what it must prove, and what remains deliberately out of scope.</p>
        </section>

        <section className="report-chapter" id="docs-map">
          <span className="report-number">2.1</span>
          <h2>Documentation map</h2>
          <div className="report-table-scroll">
            <table className="report-table">
              <thead><tr><th>Document</th><th>Main use</th><th>Reading cue</th></tr></thead>
              <tbody>
                <tr><td>Fieldwork report</td><td>Five founder-role prototype sessions (Amali, Caroline, Josh, Ted, Brian).</td><td>Storyboard-led journey, Assessment 1/2, Report 1/2, and dashboard hierarchy.</td></tr>
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
          title="Prototype testing for a climate impact platform for startups"
          summary="The journey storyboard defined the founder experience first. From it, the team built and tested two A/B pairs—Assessment 1 vs 2 and Report 1 vs 2—plus a dashboard concept for continued use."
          links={[
            ["/gtr/docs/research-report/", "Research report"],
            ["/gtr/docs/stage-1/", "Stage 1 PRD"],
          ]}
        />

        <nav className="report-contents" aria-label="Fieldwork report contents">
          <p>In this report</p>
          <a href="#fieldwork-summary"><span>0</span>Executive summary</a>
          <a href="#fieldwork-raw"><span>1</span>Storyboard to prototypes</a>
          <a href="#fieldwork-testing"><span>2</span>Testing Process</a>
          <a href="#fieldwork-project"><span>3</span>What we learned</a>
          <a href="#fieldwork-direction"><span>4</span>Changes &amp; Future Direction</a>
          <a href="#fieldwork-method"><span>5</span>Method and evidence</a>
          <a href="#fieldwork-participants"><span>6</span>Participant records</a>
          <a href="#fieldwork-materials"><span>7</span>Test materials</a>
          <a href="#fieldwork-findings"><span>8</span>Aggregated findings</a>
        </nav>

        <section className="report-chapter" id="fieldwork-summary">
          <span className="report-number">0</span>
          <h2>Executive summary</h2>
          <p className="report-lead">Fieldwork week deliverable: five prototype sessions for a climate impact platform for startups.</p>
          <p>The team began with an eight-stage journey storyboard: discovery at demo day, referral, mobile entry, assessment, instant report, dashboard use, team access, and extended use. The prototypes were built around that journey. Assessment 1 and Assessment 2 tested two intake structures; Report 1 and Report 2 tested two result formats; the dashboard explored what continued use could look like after the instant report. Five participants completed the founder-role walkthrough, and their feedback was captured in the provided transcript.</p>
          <aside className="report-note"><b>Study boundary</b><p>All five participants were asked to act as a startup founder. Ted was the only actual founder; the other four brought technical, investment, peer-design, and accessibility perspectives to the founder scenario. The study supports prototype and comprehension decisions, not product-market-fit or calculation-accuracy claims.</p></aside>
          <div className="report-next-links">
            <a href="/gtr/docs/fieldwork-report/slides/">Present fieldwork slides <span>→</span></a>
            <a href="/gtr/docs/research-report/">Research report <span>→</span></a>
          </div>
        </section>

        <section className="report-chapter" id="fieldwork-raw">
          <span className="report-number">1</span>
          <h2>Storyboard to prototypes</h2>
          <p className="report-lead">The storyboard came first. Each prototype artifact tested a specific moment or decision in that journey.</p>

          <h3>1. Storyboard defined the experience</h3>
          <p><code>storyboard.jpeg</code> mapped the founder journey from initial awareness through assessment, instant results, dashboard use, team access, and longer-term use. It gave the sessions a shared scenario and determined which prototype moments needed to be built.</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/user-journey-storyboard.jpg"
            alt="Eight-panel founder journey storyboard"
            caption="storyboard.jpeg: discovery at demo day → referral → mobile assessment → instant report → dashboard → team access → extended use."
            label="Storyboard"
          />

          <h3>2. Two A/B pairs tested the key transitions</h3>
          <p>The first pair tested how a founder completes the free impact assessment: Assessment 1 (A) versus Assessment 2 (B). The investment-stage paper, <code>assessment1-stage.jpeg</code>, belongs to Assessment 1 (A). The second pair tested how the result should be communicated: Report 1 (A) versus Report 2 (B).</p>

          <h3>Artifact inventory and A/B mapping</h3>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Sequence</th><th>Original file</th><th>Purpose in the journey</th></tr></thead>
              <tbody>
                {fieldworkArtifacts.map(([role, file, detail]) => (
                  <tr key={role}><td>{role}</td><td><code>{file}</code></td><td>{detail}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p><code>testing1.jpeg</code> through <code>testing6.jpeg</code> document the prototype sessions. The walkthrough feedback was captured in the provided transcript.</p>

          <h3>Prototype sequence</h3>
          <p>Paper and screen prototypes shown in sessions. Sample company in printed materials: pre-seed hardware and clean-energy startup.</p>
          <div className="prototype-grid">
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/onboarding-sheets.jpg"
              alt="Continuous handwritten free impact assessment"
              caption="2A · Assessment 1 / assessment1.jpeg: continuous long-form assessment."
              label="Fig. 2A"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/onboarding-flow-4up.jpg"
              alt="Four hand-drawn screens for Assessment 2"
              caption="2B · Assessment 2 / assessment2-mobile.jpeg: four-screen mobile flow with progress, Back, and Next controls."
              label="Fig. 2B"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/assessment-report-print.jpg"
              alt="Printed two-page instant impact assessment report"
              caption="3A · Report 1 / report1-information.jpeg: information-led result with footprint, handprint, hotspots, comparison, cost exposure, methodology, and share actions."
              label="Fig. 3A"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/assessment-report-sketch.jpg"
              alt="Visual infographic instant impact report"
              caption="3B · Report 2 / report2-infographic.jpeg: infographic result with metric cards, gauge, and charts."
              label="Fig. 3B"
            />
            <FieldworkFigure
              src="/assets/images/gtr/fieldwork/dashboard-sketch.jpg"
              alt="Hand-drawn dashboard overview sketch"
              caption="4 · dashboard.jpeg: continued-use concept with footprint, handprint, derived net, maturity, goals, milestones, and projection."
              label="Fig. 4"
            />
          </div>

        </section>

        <section className="report-chapter" id="fieldwork-testing">
          <span className="report-number">2</span>
          <h2>Testing Process</h2>
          <p className="report-lead">Each session began with the storyboard scenario, then moved through Assessment 1/2, Report 1/2, and the dashboard concept while participants thought aloud.</p>

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
          <p>All five participants were instructed to move through the prototypes as a startup founder. Ted contributed direct founder experience; Amali, Caroline, Josh, and Brian contributed role-play feedback shaped by their own professional or design expertise.</p>

          <h3>What mistakes did you make while testing?</h3>
          <ul>
            <li>The test asked for sensitive documents before clearly showing the participant benefit. This confounded trust in the concept with usability of the form.</li>
            <li>Terms such as net impact, maturity, projection, and milestones required interviewer explanation. The facilitator became part of the interface.</li>
            <li>The report and dashboard used inconsistent illustrative emissions values, adding noise to a hierarchy test.</li>
            <li>Each session covered the full journey plus Assessment 1/2, Report 1/2, the dashboard, and sharing prompts. This produced breadth but limited depth on each A/B question.</li>
            <li>Only one participant was an actual startup founder. Role-play feedback and direct founder feedback should be analyzed separately.</li>
          </ul>

          <h3>What worked well while testing?</h3>
          <ul>
            <li>Internal walkthroughs caught sequencing and script problems before stakeholder sessions.</li>
            <li>Starting with the storyboard gave every participant the same founder journey before they compared individual screens.</li>
            <li>Think-aloud exposed trust, comprehension, sharing, and accessibility concerns that task completion alone would have missed.</li>
            <li>Low-fidelity artifacts kept iteration inexpensive and made it possible to compare alternative structures in the same session.</li>
            <li>Using hypothetical startup contexts exposed questions worth testing directly with founders in the next round.</li>
            <li>Repeated issues were separated from one-off requests, creating a clearer threshold for redesign.</li>
          </ul>
          <aside className="report-note"><b>Testing Process conclusion</b><p>The storyboard created a coherent founder scenario, and the two numbered A/B pairs produced comparable feedback. The main weaknesses were scope and control: too many artifacts in one session, only one actual founder, inconsistent sample values, and terminology that required facilitator explanation.</p></aside>
        </section>

        <section className="report-chapter" id="fieldwork-project">
          <span className="report-number">3</span>
          <h2>What we learned</h2>
          <p className="report-lead">The sessions identified the conditions under which the concept is worth testing again. They did not validate a product or market.</p>

          <h3>What did you learn about testing?</h3>
          <ul>
            <li>Concept value, trust, and interface usability cannot be interpreted as separate layers when participants encounter them at the same time.</li>
            <li>Low-fidelity testing is sufficient for identifying blockers, but preference comparisons at n=5 remain directional.</li>
            <li>Cross-participant repetition is more useful than isolated enthusiasm. Repeated blockers should drive the next prototype; one-off feature requests should enter a backlog.</li>
            <li>Founder role-play can reveal usability and comprehension friction, but founder-specific behavior must be followed up with more actual founders.</li>
          </ul>

          <h3>What did you learn from your stakeholders?</h3>
          <ul>
            <li>Ted's founder perspective made the trust problem concrete: the value of the assessment must be clear before requesting a pitch deck, accounts, or other sensitive material.</li>
            <li>Amali's data perspective exposed unclear product scope, undefined dashboard terms, and the need to pair visualization with explanation.</li>
            <li>Caroline's investment perspective favored preset inputs, Assessment 2's guided flow, Report 2's visual format, and broader company research.</li>
            <li>Josh's peer-design perspective favored Assessment 1's easy review, Report 2's readability, selective sharing, and a vertical dashboard hierarchy.</li>
            <li>Brian's accessibility perspective identified required-field labeling, comprehension, form hierarchy, and trusted data-entry alternatives as baseline requirements.</li>
          </ul>

          <h3>What ideas were validated from testing?</h3>
          <p>The sessions directionally validated the following design decisions for the next prototype:</p>
          <ul>
            <li>Keep the storyboard-led sequence: discover → assess → receive an instant report → return to a dashboard.</li>
            <li>Use a guided assessment with visible progress and preset choices, while preserving easy review of earlier answers.</li>
            <li>Use Report 2's infographic structure as the first layer and Report 1's explanation and methodology as the detail layer.</li>
            <li>Keep footprint and handprint separate, but define both in plain language before showing a derived net value.</li>
            <li>Make the instant report the first payoff; position the dashboard as continued use rather than the first result.</li>
          </ul>
          <aside className="report-note"><b>What we learned conclusion</b><p>The winning direction is not one untouched variant. It is a synthesis: Assessment 2's guided flow with Assessment 1's visibility and revisability, plus Report 2's visual hierarchy with Report 1's explanatory depth.</p></aside>
        </section>

        <section className="report-chapter" id="fieldwork-direction">
          <span className="report-number">4</span>
          <h2>Changes &amp; Future Direction</h2>
          <p className="report-lead">The next round should narrow the question, reduce trust risk, and test comprehension with a more representative sample.</p>

          <h3>What challenges do you still face?</h3>
          <ul>
            <li>The assessment interaction still needs confirmation: continuous review versus step-by-step guidance.</li>
            <li>The prototype has not tested real data entry, real files, calculation accuracy, or trust in a deployed system.</li>
            <li>Illustrative emissions values are not validated source data and should not be interpreted as product accuracy.</li>
            <li>Core terms still need to be understood without facilitator explanation.</li>
            <li>The sample is small and mixed, with only one target startup founder.</li>
          </ul>

          <h3>Any major changes or pivots from their feedback?</h3>
          <ul>
            <li>Keep the storyboard sequence but make the instant report—not document upload—the first visible payoff.</li>
            <li>Replace default file upload with manual aggregate fields; reserve files for an explicitly trusted path.</li>
            <li>Combine Assessment 2's step-by-step guidance with Assessment 1's visible scope and easy answer review.</li>
            <li>Combine Report 2's visual overview with Report 1's explanation, methodology, and evidence detail.</li>
            <li>Move the dashboard to follow-up use after the instant report.</li>
            <li>Use a vertical dashboard hierarchy with goals and milestones grouped near the top.</li>
            <li>Tailor intake questions to the participant's business model.</li>
            <li>Default results to private; treat public sharing as an explicit, selective action.</li>
          </ul>

          <h3>What are your next steps based on feedback?</h3>
          <ol>
            <li>Build the hybrid interactive flow: value proposition → guided assessment with review → visual report with expandable detail.</li>
            <li>Run separate tests for terminology comprehension, document trust, and assessment navigation instead of combining every question in one session.</li>
            <li>Recruit more startup founders and compare their behavior with the founder-role feedback from this round.</li>
            <li>Test accessibility and terminology without facilitator assistance.</li>
            <li>After comprehension is stable, test real-data workflows and calculation credibility.</li>
          </ol>
          <aside className="report-note"><b>Changes &amp; Future Direction conclusion</b><p>The next prototype should be a narrower hybrid, not a larger feature set. Its job is to prove that founders understand the value, trust the data request, complete the assessment without help, and understand the visual result before the dashboard expands.</p></aside>
          <div className="report-next-links">
            <a href="/gtr/docs/fieldwork-report/slides/">Present fieldwork slides <span>→</span></a>
            <a href="/gtr/docs/stage-1/">Stage 1 PRD <span>→</span></a>
          </div>
        </section>

        <section className="report-chapter" id="fieldwork-method">
          <span className="report-number">5</span>
          <h2>Method and evidence</h2>
          <p className="report-lead">Think-aloud prototype sessions during fieldwork week.</p>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Dimension</th><th>Record</th></tr></thead>
              <tbody>
                <tr><td>Sequence</td><td>Internal team runs first; stakeholder sessions after internal kinks are addressed.</td></tr>
                <tr><td>Participants</td><td>5 (Amali, Caroline, Josh, Ted, Brian). All were instructed to act as startup founders; Ted was the only actual founder.</td></tr>
                <tr><td>Format</td><td>Interviewer-led founder-role walkthrough and think-aloud. The storyboard established the scenario; participants then compared Assessment 1/2 and Report 1/2 before reviewing the dashboard.</td></tr>
                <tr><td>Materials</td><td>Journey storyboard (<code>storyboard.jpeg</code>); Assessment 1 (<code>assessment1.jpeg</code> and <code>assessment1-stage.jpeg</code>); Assessment 2 (<code>assessment2-mobile.jpeg</code>); Report 1 (<code>report1-information.jpeg</code>); Report 2 (<code>report2-infographic.jpeg</code>); dashboard (<code>dashboard.jpeg</code>); session photos (<code>testing1.jpeg</code>–<code>testing6.jpeg</code>); and the provided transcript.</td></tr>
                <tr><td>Test objectives</td><td>Intake friction, document sensitivity, +/- comprehension, report readability, dashboard hierarchy, stated willingness to share, reaction to overall project concept.</td></tr>
                <tr><td>Iteration rule</td><td>Small prototype updates allowed after each session. Specific headline or CTA variants require multiple participants before a decision.</td></tr>
                <tr><td>Change threshold</td><td>Single-participant red flags held until replicated. Pattern-level red flags trigger redesign of what is tested and how.</td></tr>
                <tr><td>Evidence status</td><td>Exploratory and directional. Suitable for prototype, copy, and follow-up research decisions; not product-market-fit or calculation validation.</td></tr>
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
          <span className="report-number">6</span>
          <h2>Participant records</h2>
          <p className="report-lead">Participant feedback organized by session. All participants used a founder-role scenario; Ted was the only actual founder.</p>
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

          <h3>Transcript summary by participant and topic</h3>
          <p>The transcript is summarized here by topic; detailed session notes follow.</p>
          <div className="report-table-scroll">
            <table className="report-table report-table-wide">
              <thead><tr><th>Participant</th><th>Topic</th><th>Observation</th></tr></thead>
              <tbody>
                {sessionObservations.map(([name, topic, observation]) => (
                  <tr key={`${name}-${topic}-${observation.slice(0, 24)}`}><td>{name}</td><td>{topic}</td><td>{observation}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Amali</h3>
          <p>Data engineer met at a networking event. Role-played a founder and contributed an external technical and data perspective.</p>
          <ul>
            <li>Assessment 1/2: preferred Assessment 2, the shorter step-by-step mobile flow. Requested a clear end state on the final step.</li>
            <li>Report 1/2: recommended combining Report 2's graphs and visualization with supporting explanation from Report 1.</li>
            <li>Dashboard: milestones read as confusing. Asked what impact projection and the milestone diagram mean. Requested leaderboard and peer comparison (what other startups are doing and how they are achieving).</li>
            <li>Product scope: asked whether product is an app. Stated what the product does is not clear. Asked whether audience is climate-only, environment-related, or finance companies.</li>
            <li>Overall: stated idea is good and the project could be improved.</li>
          </ul>

          <h3>Caroline</h3>
          <p>Investment analyst. Role-played a founder while reviewing the concept through an investor and company-evaluation lens.</p>
          <ul>
            <li>Assessment 1/2: used a startup scenario, asked whether Pre-Seed includes accelerators and incubators, and preferred preset options over typing. Preferred Assessment 2's Back/Next flow over Assessment 1's continuous layout.</li>
            <li>Documents: raised stealth-mode concern for pitch deck and accounts at early stage. Stated early-stage founders are cautious about competitors and sharing business ideas.</li>
            <li>Footprint/handprint: card purpose was unclear initially. The proxy context used transport avoidance through remote work; hardware and logistics examples did not fit the SaaS scenario.</li>
            <li>Report 1/2: preferred Report 2, the infographic variation.</li>
            <li>Dashboard: assessment layout preferred over dashboard layout. Net impact and maturity levels 1-5 required interviewer explanation.</li>
            <li>Audience: suggested interviewing bigger companies through university network; noted larger environmental footprint and reporting requirements.</li>
          </ul>

          <h3>Josh</h3>
          <p>CCA Interaction Design student. Role-played a founder and contributed a peer-design perspective.</p>
          <ul>
            <li>Assessment 1/2: preferred Assessment 1's continuous flow if step count and time estimate were shown at the start. The continuous layout made answers easier to revisit.</li>
            <li>Report 1/2: preferred Report 2's infographic direction and found Report 1 difficult to parse.</li>
            <li>Sharing: in the founder scenario, would not share a high-emissions result publicly and considered a full LinkedIn report excessive.</li>
            <li>Dashboard: four-card horizontal layout read as messy; recommended vertical stack (overview, then goals, then milestones).</li>
          </ul>

          <h3>Ted</h3>
          <p>Startup founder. Participated as the only direct target-audience representative in this round.</p>
          <ul>
            <li>Value proposition: asked what he gets from completing the form; stated he would stop before finishing. Uploading pitch deck stated as IP risk without clear upside.</li>
            <li>Business model auto-detect: stated system cannot infer business model from company name or URL alone.</li>
            <li>Documents: one-person/tiny teams lack data to upload; larger teams still hesitant on sensitive files.</li>
            <li>SaaS impact: stated primary cost is cloud compute and AI credits; limited levers at early stage. Suggested token-usage observability instead of generic footprint checklist.</li>
          </ul>

          <h3>Brian</h3>
          <p>Accessibility Lead at Superhuman. Role-played a founder while reviewing the prototype through an accessibility expert lens.</p>
          <ul>
            <li>Accessibility: asterisk-only required fields fail basic accessibility; use visible [Required] text.</li>
            <li>Labels: business model label unclear; recent accounts and pitch deck read as sensitive. Suggested manual numeric fields (e.g. monthly AI/cloud spend) instead of document upload.</li>
            <li>Assessment 1/2: the long form did not invite investment; suggested previewing the output after step 1.</li>
            <li>Report 1/2: Report 2 was easier to understand, but the benefit of completing the assessment remained unclear. Suggested correlating cost reduction with impact.</li>
            <li>Metrics: requested travel spend and website carbon (deploy/load impact) in addition to emissions.</li>
            <li>Dashboard: layout dense. Recommended milestones and climate goals at top; maturity and status metrics at bottom; combine goals and milestones sections.</li>
            <li>Distribution: suggested incubator or investor partnership so document sharing occurs inside trusted context.</li>
            <li>Audience: noted larger companies may yield more insight than early startups (legal reporting requirements).</li>
          </ul>
        </section>

        <section className="report-chapter" id="fieldwork-materials">
          <span className="report-number">7</span>
          <h2>Test materials</h2>
          <p>Materials shown across sessions. Sample company in printed materials: pre-seed hardware and clean-energy startup, FTE-scaled modeled estimate.</p>

          <h3>Journey storyboard — built first</h3>
          <p>The storyboard established the founder scenario before the interface variants were made. It connected discovery, assessment, instant results, dashboard use, team access, and extended use into one testable journey.</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/user-journey-storyboard.jpg"
            alt="Hand-drawn eight-panel user journey storyboard from demo day awareness through assessment, report sharing, dashboard use, and extended use"
            caption="storyboard.jpeg: eight-stage founder journey used to define the Assessment 1/2, Report 1/2, and dashboard prototypes."
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

          <h3>Assessment 1 (A) / Assessment 2 (B)</h3>
          <p><b>Assessment 1 (A)</b> used the continuous/long-form layout in <code>assessment1.jpeg</code>. Its investment-stage paper, <code>assessment1-stage.jpeg</code>, supplied the Pre-Seed, Seed, Series A, and Series B+ choices. <b>Assessment 2 (B)</b> used the four-screen mobile flow in <code>assessment2-mobile.jpeg</code>, with progress, Back, and Next controls. Both covered the same core sequence: company profile, optional evidence, EMITS/AVOIDS activity selection, and free-text description.</p>
          <div className="walkthrough-sequence">
            {onboardingSteps.map(([number, title, detail]) => (
              <span key={number}><i>{number}</i><b>{title}</b><small>{detail}</small></span>
            ))}
          </div>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/onboarding-flow-4up.jpg"
            alt="Four hand-drawn screens for Assessment 2"
            caption="Assessment 2 / assessment2-mobile.jpeg: four screens for company profile, optional local documents, EMITS/AVOIDS activity selection, free-text description, and generate assessment."
          />
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/onboarding-sheets.jpg"
            alt="Five handwritten paper sheets showing the free impact assessment intake flow"
            caption="Assessment 1 / assessment1.jpeg: continuous long-form layout with business model, team size, evidence prompts, activity selection, and generate-assessment CTA."
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
            caption="Investment-stage choices in Assessment 1 (A)."
            label=""
            compact
          />
          <p>Screen 2 states files stay in-browser and are not uploaded to servers.</p>

          <h3>Report 1 (A) / Report 2 (B)</h3>
          <p><b>Report 1</b> (<code>report1-information.jpeg</code>) was information-led: footprint and handprint values, ranked hotspot bars, peer range, cost exposure, methodology, impact beyond carbon, and share/account actions. <b>Report 2</b> (<code>report2-infographic.jpeg</code>) presented the same assessment as visual cards: handprint, maturity gauge, footprint, donut charts for hotspots, and energy/water/waste cards.</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/assessment-report-print.jpg"
            alt="Printed two-page instant impact assessment report with footprint, handprint, hotspots, peer comparison, and methodology"
            caption="Report 1 / report1-information.jpeg: information-led assessment with footprint, handprint, hotspots, peer comparison, cost exposure, methodology, and share actions."
          />
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/assessment-report-sketch.jpg"
            alt="Pencil sketch of the instant impact assessment report layout"
            caption="Report 2 / report2-infographic.jpeg: infographic assessment with metric cards, maturity gauge, hotspot charts, and impact-beyond-carbon cards."
          />
          <h3>Dashboard concept</h3>
          <p>Dashboard sketch: footprint, handprint, derived net, maturity gauge, climate goals, milestones, impact projection. Sample values differ from instant report (footprint 42.6, handprint 108, net -65.4 tCO₂e on sketch vs 10.7 / ~20 on report). Participants asked to define impact projection, milestone diagram, net impact, and maturity levels.</p>
          <FieldworkFigure
            src="/assets/images/gtr/fieldwork/dashboard-sketch.jpg"
            alt="Hand-drawn dashboard overview sketch with footprint, handprint, net impact, maturity level, climate goals, milestones, and impact projection"
            caption="dashboard.jpeg: separate footprint and handprint, derived net, maturity, goals, milestones, and impact projection."
          />

        </section>

        <section className="report-chapter" id="fieldwork-findings">
          <span className="report-number">8</span>
          <h2>Aggregated findings</h2>
          <p className="report-lead">Directional cross-participant observations from five sessions. These findings identify what to retest; they do not establish validation.</p>
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

function FieldworkSlidePage() {
  const [showNotes, setShowNotes] = useState(true);

  return (
    <section className={`report-section fieldwork-slides${showNotes ? " fieldwork-slides--notes-on" : ""}`} id="fieldwork-slides">
      <ChapterLabel number="02.1">Docs / Fieldwork slides</ChapterLabel>

      <div className="fieldwork-slides-toolbar">
        <p>Presenter view</p>
        <button
          type="button"
          className={showNotes ? "active" : ""}
          onClick={() => setShowNotes((value) => !value)}
          aria-pressed={showNotes}
        >
          {showNotes ? "Hide speaker notes" : "Show speaker notes"}
        </button>
      </div>

      <article className="fieldwork-slide" id="fieldwork-slide-title">
      <div className="spatial-audio-hero">
        <div>
          <p className="eyebrow">GTR · Fieldwork week</p>
          <h1>Prototype testing<br />for climate startups.</h1>
          <p>The journey storyboard defined the founder experience first. From it, the team built two A/B pairs — Assessment 1 vs 2 and Report 1 vs 2 — plus a dashboard concept for continued use.</p>
          <a className="source-link" href="/gtr/docs/fieldwork-report/">Read the full report <span>↗</span></a>
        </div>
        <div className="fieldwork-hero-frame">
          <img
            src="/assets/images/gtr/fieldwork/user-journey-storyboard.jpg"
            alt="Eight-panel founder journey storyboard from demo day through assessment, report, dashboard, and extended use"
          />
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.title} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-boundary">
      <div className="audio-thesis">
        <span>Study boundary</span>
        <h2>Directional prototype evidence —<br /><em>not product-market fit.</em></h2>
        <p>Five founder-role walkthroughs support comprehension and structure decisions. Ted was the only actual founder; the other four brought technical, investment, peer-design, and accessibility lenses to the same scenario. This round identifies what to retest — it does not validate calculation accuracy or market demand.</p>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.boundary} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-agenda">
      <nav className="report-contents fieldwork-slide-agenda" aria-label="Presentation agenda">
        <p>In this presentation</p>
        {fieldworkSlideAgenda.map(([number, label, decides]) => (
          <a key={number} href={`#fieldwork-slide-${number}`}>
            <span>{number}</span>{label}<i>{decides}</i>
          </a>
        ))}
      </nav>
      <SlideNote note={fieldworkSpeakerNotes.agenda} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-metrics">
      <div className="scale-history">
        <div><p className="mini-label">This round</p><h2>Storyboard first, then A/B pairs.</h2></div>
        <article><strong>5</strong><h3>Sessions</h3><p>Founder-role think-aloud walkthroughs with mixed expertise lenses.</p></article>
        <article><strong>2</strong><h3>A/B pairs</h3><p>Assessment 1/2 and Report 1/2 tested the key transitions.</p></article>
        <article><strong>8</strong><h3>Journey stages</h3><p>From demo-day discovery through dashboard and extended use.</p></article>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.metrics} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-1">
      <div className="cocktail-section">
        <div className="cocktail-copy">
          <p className="mini-label">Storyboard to prototypes</p>
          <h2>The storyboard came first.<br />Artifacts followed the journey.</h2>
          <p><code>storyboard.jpeg</code> mapped discovery at demo day through referral, mobile assessment, instant report, dashboard use, team access, and extended use. Each prototype tested one decision inside that sequence.</p>
        </div>
        <div className="journey-flow" aria-label="Founder journey from discovery to extended use">
          <div className="journey-flow__stage"><span>Entice</span><b>Demo day</b><small>Peer referral</small></div>
          <b className="journey-flow__arrow">→</b>
          <div className="journey-flow__stage"><span>Enter</span><b>Mobile open</b><small>Free assessment CTA</small></div>
          <b className="journey-flow__arrow">→</b>
          <div className="journey-flow__stage journey-flow__stage--highlight"><span>Engage</span><b>Assess</b><small>A/B intake pair</small></div>
          <b className="journey-flow__arrow">→</b>
          <div className="journey-flow__stage journey-flow__stage--highlight"><span>Engage</span><b>Instant report</b><small>A/B result pair</small></div>
          <b className="journey-flow__arrow">→</b>
          <div className="journey-flow__stage"><span>Extend</span><b>Dashboard</b><small>Continued use</small></div>
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.storyboard} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-prototypes">
      <div className="prototype-grid fieldwork-slides-grid">
        <FieldworkFigure
          src="/assets/images/gtr/fieldwork/onboarding-sheets.jpg"
          alt="Continuous handwritten free impact assessment"
          caption="2A · Assessment 1: continuous long-form assessment with visible scope and answer review."
          label="Fig. 2A"
        />
        <FieldworkFigure
          src="/assets/images/gtr/fieldwork/onboarding-flow-4up.jpg"
          alt="Four hand-drawn screens for Assessment 2"
          caption="2B · Assessment 2: four-screen mobile flow with progress, Back, and Next controls."
          label="Fig. 2B"
        />
        <FieldworkFigure
          src="/assets/images/gtr/fieldwork/assessment-report-print.jpg"
          alt="Printed two-page instant impact assessment report"
          caption="3A · Report 1: information-led result with footprint, handprint, hotspots, and methodology."
          label="Fig. 3A"
        />
        <FieldworkFigure
          src="/assets/images/gtr/fieldwork/assessment-report-sketch.jpg"
          alt="Visual infographic instant impact report"
          caption="3B · Report 2: infographic result with metric cards, gauge, and hotspot charts."
          label="Fig. 3B"
        />
      </div>
      <SlideNote note={fieldworkSpeakerNotes.prototypes} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-dashboard">
      <FieldworkFigure
        src="/assets/images/gtr/fieldwork/dashboard-sketch.jpg"
        alt="Hand-drawn dashboard overview sketch"
        caption="4 · dashboard.jpeg: continued-use concept with footprint, handprint, derived net, maturity, goals, milestones, and projection."
        label="Fig. 4"
      />
      <SlideNote note={fieldworkSpeakerNotes.dashboard} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-intake">
      <div className="walkthrough-sequence fieldwork-intake-sequence">
        {onboardingSteps.map(([number, title, detail]) => (
          <span key={number}><i>{number}</i><b>{title}</b><small>{detail}</small></span>
        ))}
      </div>
      <SlideNote note={fieldworkSpeakerNotes.intake} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-2">
      <div className="strategy-section">
        <div className="strategy-heading">
          <p className="mini-label">Testing process</p>
          <h2>The test mixed too many questions<br />and introduced avoidable noise.</h2>
          <p>Each session began with the storyboard scenario, then moved through Assessment 1/2, Report 1/2, and the dashboard while participants thought aloud.</p>
        </div>
        <div className="strategy-grid">
          {testingMistakes.map(([number, title, body, verdict]) => (
            <article key={number}>
              <div><span>{number}</span><i>{verdict}</i></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.mistakes} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-worked">
      <div className="cocktail-section fieldwork-worked">
        <div className="cocktail-copy">
          <p className="mini-label">What worked</p>
          <h2>Low fidelity and think-aloud<br />exposed the right blockers.</h2>
          <p>Internal peer tests, storyboard framing, and cheap A/B comparison produced the signal. Session scope and facilitator dependence did not.</p>
        </div>
        <div className="fieldwork-strength-grid">
          {testingStrengths.map(([title, body]) => (
            <article key={title}><b>{title}</b><p>{body}</p></article>
          ))}
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.worked} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-participants">
      <FieldworkFigure
        src="/assets/images/gtr/fieldwork/onboarding-sheets.jpg"
        alt="Assessment 1 continuous paper prototype used in sessions"
        caption="Assessment 1 paper prototype shown during think-aloud sessions."
        label="Session"
        compact
      />

      <div className="architecture-section">
        <div className="architecture-heading">
          <p className="mini-label">Who we tested</p>
          <h2>Five participants — one lens each.</h2>
          <p>Everyone used the founder scenario. Only Ted brought direct founder experience; the others stress-tested comprehension, investment logic, design review, and accessibility.</p>
        </div>
        <div className="architecture-table" role="table" aria-label="Participant lenses and decisions">
          <div className="architecture-row architecture-header" role="row">
            <span>Participant</span><span>Lens</span><span>Strongest feedback</span><span>Decision</span>
          </div>
          {stakeholderLenses.map(([name, lens, feedback, decision]) => (
            <div className="architecture-row" role="row" key={name}>
              <b>{name}</b><span>{lens}</span><i>{feedback}</i><p>{decision}</p>
            </div>
          ))}
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.participants} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-3">
      <div className="audio-thesis fieldwork-synthesis">
        <span>What we learned</span>
        <h2>The winning direction is a synthesis —<br /><em>not one untouched variant.</em></h2>
        <p>Repeated blockers matter more than isolated enthusiasm. Assessment 2's guided flow should keep Assessment 1's visibility and revisability. Report 2's visual hierarchy should carry Report 1's explanatory depth. Founder role-play reveals friction; founder-specific behavior still needs more actual founders.</p>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.synthesis} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-validated">
      <div className="cosmos-implication fieldwork-validated">
        <span>Validated for next prototype</span>
        <h2>Four decisions are ready to build.</h2>
        <div className="implication-grid">
          {validatedDecisions.map(([label, body]) => (
            <article key={label}><b>{label}</b><p>{body}</p></article>
          ))}
        </div>
        <p className="implication-close">A/B preference at n=5 is directional. Repeated signals determine what to retest, not what is validated.</p>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.validated} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-4">
      <div className="strategy-section">
        <div className="strategy-heading">
          <p className="mini-label">Open challenges</p>
          <h2>Six questions remain<br />before the dashboard expands.</h2>
          <p>Trust, comprehension, founder sample size, and calculation credibility are still open. The next prototype should narrow — not grow — the feature set.</p>
        </div>
        <div className="strategy-grid">
          {openChallenges.map(([number, title, body, verdict]) => (
            <article key={number}>
              <div><span>{number}</span><i>{verdict}</i></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.challenges} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-pivots">
      <div className="comparison-block fieldwork-pivots">
        <div>
          <p className="mini-label">Pivots from feedback</p>
          <h3>Feedback changes the prototype,<br />not the storyboard sequence.</h3>
        </div>
        <div className="comparison-list">
          {pivotChanges.map(([before, after]) => (
            <p key={before} className="highlight"><span>{before}</span><b>{after}</b></p>
          ))}
        </div>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.pivots} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-next">
      <div className="audio-chain-section fieldwork-next">
        <div>
          <p className="mini-label">Next steps</p>
          <h2>Narrow, build, then test.</h2>
          <p>Prove value, trust, independent comprehension, and the hybrid flow before expanding the dashboard or testing real company data.</p>
        </div>
        <ol className="audio-chain">
          {nextResearchSteps.map(([number, title, body]) => (
            <li key={number}><span>{number}</span><div><b>{title}</b><p>{body}</p></div></li>
          ))}
        </ol>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.next} visible={showNotes} />
      </article>

      <article className="fieldwork-slide" id="fieldwork-slide-close">
      <div className="cosmos-implication fieldwork-close">
        <span>Close</span>
        <h2>Fieldwork moved the project from feature questions to trust questions.</h2>
        <div className="implication-grid">
          <article><b>Value first</b><p>Show the outcome before requesting effort or sensitive data.</p></article>
          <article><b>Evidence precisely</b><p>Keep directional support separate from validation.</p></article>
          <article><b>Test narrowly</b><p>One research question per round will produce stronger decisions.</p></article>
        </div>
        <p className="implication-close">Full report, participant records, and prototype archive: /gtr/docs/fieldwork-report/</p>
      </div>
      <SlideNote note={fieldworkSpeakerNotes.close} visible={showNotes} />
      </article>

      <footer className="video-source-note">
        <span>Archive</span>
        <p>Fieldwork week slides distill the written report. Speaker notes toggle above for presenter view.</p>
        <a href="/gtr/docs/fieldwork-report/">Full report ↗</a>
      </footer>
    </section>
  );
}

function isDocsIndex(path) {
  return path === "/gtr/docs" || path === "/gtr/docs/" || path.endsWith("/gtr/docs/index.html");
}

function isLegacySlidesPath(path) {
  return path.includes("/gtr/slides/");
}

function App() {
  const path = window.location.pathname;

  useEffect(() => {
    if (isDocsIndex(path)) {
      window.location.replace("/gtr/docs/fieldwork-report/");
    } else if (isLegacySlidesPath(path)) {
      window.location.replace("/gtr/docs/fieldwork-report/slides/");
    }
  }, [path]);

  const activeChapter = path.includes("/docs/") ? "docs" : "intro";
  const docsPage = path.includes("/docs/fieldwork-report/slides")
    ? fieldworkSlide.id
    : path.includes("/docs/fieldwork-report")
      ? "fieldwork-report"
      : path.includes("/docs/research-report")
        ? "research-report"
        : path.includes("/docs/stage-1")
          ? "stage-1"
          : path.includes("/docs/stage-2")
            ? "stage-2"
            : null;

  return (
    <div id="top">
      <Progress />
      <GTRHeader />
      <GTRSidebar
        active={activeChapter}
        subActive={activeChapter === "docs" ? docsPage : undefined}
      />

      <main>
        {activeChapter === "intro" && <IntroPage />}
        {activeChapter === "docs" && docsPage === "fieldwork-report" && <FieldworkReportPage />}
        {activeChapter === "docs" && docsPage === "research-report" && <ResearchReportPage />}
        {activeChapter === "docs" && docsPage === "stage-1" && <Stage1Page />}
        {activeChapter === "docs" && docsPage === "stage-2" && <Stage2Page />}
        {activeChapter === "docs" && docsPage === fieldworkSlide.id && <FieldworkSlidePage />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
