# Fieldwork Week

## Prototype User Testing — Startup Climate Concern Platform

<p class="deck-subtitle">Five sessions · intake, report, dashboard · CCA Interaction Design graduation project</p>

Team GTR: Rae, Gabriel, Tej  
June 2026

Note: Fieldwork week deliverable. This deck shares insights, quotes, images, and observations from prototype testing sessions. Full report: /gtr/docs/fieldwork-report/

---

## Founders stop when upside is unclear

<p class="slide-ref">Spine</p>

Five think-aloud sessions on paper prototypes surfaced a consistent pattern: participants evaluated the **project concept** and the **UI** together. When value proposition or document sensitivity failed, layout preferences did not matter.

<p class="slide-closing">Test concept reactions, not only task completion.</p>

---

## What we tested

<p class="slide-ref">Scope</p>

<div class="cards-3">
  <article>
    <h3>Onboarding A vs B</h3>
    <p>Scroll with step count vs step-by-step with Back/Next. Four steps; stated duration 2-5 minutes.</p>
  </article>
  <article>
    <h3>Report A vs B</h3>
    <p>Text-heavy layout vs visual/infographic layout. Footprint, handprint, hotspots, share CTA.</p>
  </article>
  <article>
    <h3>Dashboard + journey</h3>
    <p>Sketch: net, maturity, goals, milestones, projection. Eight-panel storyboard for context.</p>
  </article>
</div>

<p class="slide-source">Materials: session notes, debriefs, and transcript (Caroline) · n=5 · paper and screen prototypes only</p>

---

## Who we tested with

<p class="slide-ref">Participants</p>

| Participant | Context | Role |
| --- | --- | --- |
| Amali | CCA fieldwork participant | Walked through prototypes one screen at a time |
| Caroline | Spouse's SaaS startup (Deltic), Seed, 7 FTE | Role-played founder intake using husband's company |
| Josh | Pet services startup (Otto) | Founder tester |
| Ted | AI marketplace startup | Founder tester |
| Brian | Accessibility reviewer | Founder-adjacent tester |

<p class="slide-closing">Founders and founder-adjacent participants across SaaS, services, and AI.</p>

---

## Document upload is a stop rule, not a minor friction

<p class="slide-ref">Cross-participant finding</p>

4/4 participants with notes raised pitch deck or accounts upload as sensitive. Ted and Brian framed it as IP risk without clear upside.

> "Uploading a pitch deck feels like a massive risk of exposing my intellectual property to a random company without any clear upside." — Ted

> "Early-stage founders in stealth mode might be a little cautious with sharing that data." — Caroline

<p class="slide-closing">Implication: manual spend fields and incubator-only upload path, not default file upload.</p>

---

## Value proposition must come before intake

<p class="slide-ref">Drop-off signal</p>

> "What am I getting out of this? I would probably stop right here and not fill out the rest of the form." — Ted

> "The main question is: why would I do this? How would this benefit me?" — Brian

Brian suggested progressive preview of output after step 1. Ted would not finish without stated benefit before document step.

---

## Visual report beats text for first read

<p class="slide-ref">Validated direction</p>

<div class="media-split">
  <div>
    <p>Amali requested combining text and visual report variations. Caroline, Josh, and Brian preferred visual/infographic layout over text-heavy.</p>
    <p>Instant assessment report read as the compelling artifact; dashboard hierarchy came second.</p>
  </div>
  <img src="assets/images/gtr/fieldwork/assessment-report-print.jpg" alt="Printed instant impact assessment report with footprint, handprint, and hotspots">
</div>

---

## Onboarding format split is real at n=5

<p class="slide-ref">Unresolved A/B</p>

| Preference | Participant | Quote |
| --- | --- | --- |
| Step-by-step (B) | Amali and Caroline | "I like this step-by-step version. I prefer the Back/Next setup." — Caroline |
| Scroll + step count (A) | Josh | "When I see there are only four steps, I know it's going to take 5 to 10 minutes tops." |

Both wanted preset options over typing. Winner not decided — retest with more participants.

---

## Jargon required interviewer explanation

<p class="slide-ref">Testing mistake</p>

Net impact, maturity levels 1-5, impact projection, and milestone diagram were undefined in prototypes. Multiple sessions needed verbal explanation — not scalable.

> "What does Net Impact mean? Do people know what levels 1, 2, 3, and 5 mean?" — Caroline

> "What is impact projection? What is the milestone diagram?" — Amali

<p class="slide-closing">Next: inline definitions and tooltips in interactive prototype.</p>

---

## Dashboard hierarchy needs a vertical stack

<p class="slide-ref">Layout finding</p>

<div class="media-split">
  <div>
    <p>Josh: four-card horizontal row read as messy; recommended vertical stack (overview, goals, milestones).</p>
    <p>Brian: dense layout; goals and milestones at top; maturity and status metrics at bottom; combine goals and milestones.</p>
  </div>
  <img src="assets/images/gtr/fieldwork/dashboard-sketch.jpg" alt="Hand-drawn dashboard sketch with footprint, handprint, net, goals, and milestones">
</div>

---

## SaaS and AI need different defaults

<p class="slide-ref">Business-model signal</p>

Ted (AI marketplace): primary cost is cloud compute and AI credits; limited levers from generic footprint checklist. Suggested token-usage observability.

Caroline (SaaS proxy): handprint inferred from transport avoidance via remote work when card labels were unclear.

<p class="slide-closing">Tailor EMITS/AVOIDS defaults and intake fields by business model.</p>

---

## What we learned about testing

<p class="slide-ref">The act of testing</p>

<div class="steps-3">
  <article><span class="steps-3__num">01</span><div><h3>Peer-test first</h3><p>Internal runs caught flow and script issues before stakeholder sessions.</p></div></article>
  <article><span class="steps-3__num">02</span><div><h3>Pattern over single session</h3><p>Upload sensitivity replicated 4/4; onboarding preference did not.</p></div></article>
  <article><span class="steps-3__num">03</span><div><h3>Low-fi is enough</h3><p>Paper prototypes surfaced blockers without a working product.</p></div></article>
</div>

---

## Mistakes we made

<p class="slide-ref">The act of testing</p>

- Document upload before stated benefit (Ted drop-off)
- Undefined terms left to interviewer explanation
- Footprint/handprint cards unclear for SaaS
- Inconsistent sample numbers between report and dashboard sketches
- Too many concepts per session

<p class="slide-closing">Held single-session red flags; changed when patterns repeated.</p>

---

## What worked

<p class="slide-ref">The act of testing</p>

- Think-aloud with real founder contexts (Otto, AI marketplace)
- A/B onboarding and report in same session
- Four-step intake with stated duration and step count
- Recording concept reactions alongside UI walkthrough
- Small prototype edits between sessions

---

## Pivots from feedback

<p class="slide-ref">About the project</p>

| From | To | Driver |
| --- | --- | --- |
| Default file upload | Manual spend fields | Ted, Brian |
| Text-primary report | Visual + explanatory text (combine A+B) | Amali, Caroline, Josh, Brian |
| Horizontal dashboard cards | Vertical stack; goals on top | Josh, Brian |
| Generic checklist | SaaS token/compute focus | Ted |
| Public LinkedIn share | Positive metrics only; default private | Josh |

---

## Validated ideas

<p class="slide-ref">About the project</p>

<div class="cards-2">
  <article>
    <h3>Four-step intake works</h3>
    <p>Profile, optional documents, EMITS/AVOIDS selection, generate — completable when jargon is explained.</p>
  </article>
  <article>
    <h3>+ / - framing resonates</h3>
    <p>Separate footprint and handprint ledgers make sense when labels are clear.</p>
  </article>
  <article>
    <h3>Preset inputs win</h3>
    <p>Amali, Caroline, Josh, and Brian preferred dropdowns and checkboxes over typing.</p>
  </article>
  <article>
    <h3>Concept is viable</h3>
    <p>Amali: clean design, idea is good. Caroline: interesting and cool. Leaderboard and peer comparison requested for later.</p>
  </article>
</div>

---

## Challenges still open

<p class="slide-ref">About the project</p>

- Onboarding A vs B unresolved
- Document path not tested with real files or incubator integration
- Emissions numbers illustrative only
- Peer benchmark and leaderboard scope undefined
- Larger-company segment suggested, not tested

<p class="slide-source">Limits: prototype materials only · no live product or validated emissions data</p>

---

## Next steps

<p class="slide-ref">Recommendation</p>

<div class="steps-3">
  <article><span class="steps-3__num">01</span><div><h3>Interactive prototype</h3><p>Value prop above fold; preview after step 1; tooltip copy for net impact and maturity.</p></div></article>
  <article><span class="steps-3__num">02</span><div><h3>Intake redesign</h3><p>Manual spend fields; business-model defaults; visible [Required] labels.</p></div></article>
  <article><span class="steps-3__num">03</span><div><h3>Retest</h3><p>Onboarding A/B with more participants; accessibility pass; visual report as lead artifact.</p></div></article>
</div>

<p class="slide-closing">Full report and raw materials: <a href="/gtr/docs/fieldwork-report/">/gtr/docs/fieldwork-report/</a></p>

Note: End with link to written report for quotes, full participant records, and prototype image archive.