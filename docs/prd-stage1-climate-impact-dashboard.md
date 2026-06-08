# PRD — Stage 1

## Climate Startup +/- Impact Dashboard (MVP)

Owner: Rae Jin · Project: Social Lab · Date: June 15, 2026 · Status: Draft for review

---

## 1. Summary

Stage 1 ships a gamified, two-sided environmental impact dashboard for **climate startups**. It tracks positive impact (handprint: avoided and enabled emissions) and negative impact (footprint: Scope 1/2/3) on separate accounting bases, gates every positive claim behind an additionality check, and labels every metric by how and when it can be measured. The output is a net impact picture a climate founder can run weekly and a climate VC will accept in diligence.

The product's defensible wedge: **Climate Brick scores scaling readiness but has no impact-integrity axis.** Stage 1 supplies that axis.

---

## 2. Problem

- A climate startup's valuation is an impact claim, but the positive claim is rarely measured with the rigor applied to revenue.
- The startup's own footprint (cloud, AI compute, hardware, travel, supply chain) is usually absent from any dashboard.
- Existing tools are split: Climate Brick (scaling), carbon accounting (footprint inventory), CRANE/Project Frame (one-off avoided-emissions estimate), ESG suites (compliance). None makes the **two-sided, additionality-gated, time-resolved net** a live operating surface.
- Avoided-emissions claims are the default failure mode for inflation (baseline gaming, missing additionality, average-grid assumptions, rebound).

---

## 3. Goals and Non-Goals

### Goals
- G1. Let a climate founder produce a defensible net impact view in under 15 minutes of intake.
- G2. Gate every positive claim behind baseline + displacement + additionality.
- G3. Label every metric as metered vs modeled, with a cadence and a freshness date.
- G4. Make the number a weekly habit via cooperative gamification, not a one-off report.
- G5. Produce a VC/LP-ready share page that preserves uncertainty.

### Non-Goals (Stage 1)
- NG1. Not a certified carbon-accounting or audit product (no assurance-grade inventory).
- NG2. Not for non-climate / footprint-only startups yet (that is Stage 2).
- NG3. No deep per-archetype rubric customization engine yet (Stage 2).
- NG4. No automated follow-up workflow engine yet (Stage 2).
- NG5. Not a regulatory disclosure (CSRD/ISSB) filing tool.

---

## 4. Users

| Persona | Need | Stage-1 job |
| --- | --- | --- |
| Climate founder | Defend impact to investors without overclaiming | Run intake, set goals, attach evidence |
| Climate VC / analyst | Verify impact in diligence | Read two-axis score + share page |
| Startup operator | Know what to do this week | Own goals, complete actions |
| LP / advisor (read-only) | Trust the positive side | View share page with uncertainty intact |

Primary buyer/champion: the climate founder. Primary credibility judge: the climate VC.

---

## 5. Core Concepts

- **Footprint (−):** inventory of real emissions — Scope 1 direct, Scope 2 energy, Scope 3 value chain (incl. 3.11 use-phase, 3.15 financed).
- **Handprint (+):** avoided/enabled emissions vs. a reference scenario. Handprint = baseline footprint − solution footprint, same functional unit and boundaries.
- **Net:** a derived, clearly-labeled context figure with uncertainty bands. Never an offset of the inventory.
- **Integrity gate:** baseline → displacement → additionality → marginal-signal → rebound.
- **Freshness:** metered/real-time vs modeled/annual, with a date and certainty band.

---

## 6. Scope — Modules and Requirements

### 6.1 Archetype Intake
- R1.1 Collect company URL, Climate Brick archetype (7 options), stage, business model, team size.
- R1.2 Suggest an archetype from URL + description; founder confirms or overrides.
- R1.3 Complete in ≤ 15 minutes.
- Acceptance: founder reaches a first impact ledger from a cold start in one session.

### 6.2 Impact Ledger (+/-)
- R2.1 Render footprint and handprint as two separate panels; net shown as a derived figure with an uncertainty band.
- R2.2 Footprint: guided estimate across Scope 1/2/3 with startup-relevant Scope 3 categories pre-listed (cloud/AI compute, hardware, vendors, travel, logistics).
- R2.3 Handprint: a gated avoided-emissions estimate (see 6.3). Cannot be subtracted from footprint.
- R2.4 Every value carries a freshness label (metered/modeled) and a date.
- Acceptance: a user can explain, unprompted, why net is "derived, not absolute."

### 6.3 Integrity Gates
- R3.1 A handprint claim cannot be saved until baseline, displacement, and additionality fields are answered.
- R3.2 If additionality is "would have happened anyway," the claim is auto-flagged and the displayed handprint is set toward zero with a warning.
- R3.3 Prompt for marginal vs. average grid signal; default to marginal for any decision/claim.
- R3.4 Surface a rebound prompt for efficiency/cost-reduction solutions.
- Acceptance: no positive claim ships without a recorded baseline + additionality note.

### 6.4 Freshness / Cadence Layer
- R4.1 Tag each metric: real-time, monthly, quarterly, or annual.
- R4.2 Metered values render solid; modeled values render with uncertainty bands + "last modeled" date.
- R4.3 Real-time footprint integrations (Stage-1 minimum: one grid-intensity source).
- Acceptance: user can state which metrics are metered vs modeled.

### 6.5 Goal Board
- R5.1 Goal cards with owner, status, deadline, evidence slot.
- R5.2 Recommend goals by archetype (Climate Brick critical unlocks + impact-integrity gaps).
- Acceptance: founder selects ≥ 3 archetype-appropriate goals.

### 6.6 Progress Game (cooperative)
- R6.1 Maturity levels 0–5 (Unmapped → Improved); team streaks; evidence points.
- R6.2 Integrity gate is a hard requirement to level a positive claim.
- R6.3 No public ranking of startups; tone is "next step," not "good/bad."
- Acceptance: mechanics drive weekly return without trivializing impact (tested).

### 6.7 Share Page
- R7.1 Two-sided view (footprint + gated handprint + derived net) with uncertainty bands and dates.
- R7.2 Audience toggle (founder-internal vs investor/LP) — minimal in Stage 1.
- Acceptance: a climate VC would accept it in diligence (tested with 2 VCs).

---

## 7. Methodology Requirements

- M1. Footprint follows GHG Protocol scope definitions; Scope 3 estimate is allowed to be coarse but must be labeled as estimate.
- M2. Handprint follows the comparative/avoided-emissions frame (GHG Protocol comparative guidance; Project Frame principles): explicit baseline, conservative estimation, uncertainty grows with horizon, reported separately.
- M3. Climate Brick used as the scaling lens: archetype → milestones, critical unlocks, capital-stack expectations.
- M4. Two-axis evaluation = scaling readiness (Climate Brick) × impact integrity (our axis).
- M5. Grid signal: marginal (e.g., WattTime MOER) for claims; average (e.g., Electricity Maps) acceptable for context only.

---

## 8. Data, Inputs, Integrations (Stage-1 minimum)

| Need | Stage-1 source | Later |
| --- | --- | --- |
| Grid carbon intensity | One real-time API (WattTime or Electricity Maps) | Both, region-aware |
| Software/cloud carbon | Green Software Foundation SCI method, manual inputs | Cloud billing APIs |
| Footprint factors | Public emission-factor set | Verified factor library |
| Avoided-emissions baselines | Founder-entered + reference scenarios | CRANE-style library |

---

## 9. Success Metrics

| Goal | Metric | Target |
| --- | --- | --- |
| Integrity | Share of + claims with baseline + additionality note | 100% |
| Relevance | Founders selecting ≥ 3 archetype goals | ≥ 80% |
| Clarity | Users who can explain net = derived | ≥ 70% |
| Timing fit | Users who can name metered vs modeled metrics | ≥ 70% |
| Credibility | Climate VCs who would accept the share page | ≥ 4 of first 6 |
| Engagement | Teams returning weekly to update goals | ≥ 50% at 4 weeks |

---

## 10. Risks

| Risk | Mitigation |
| --- | --- |
| Greenwashing via inflated + claims | Hard additionality/baseline gates before any claim ships |
| Naive netting | Separate accounting bases; net labeled derived |
| Rebound / Jevons | Track total consumption, not only per-unit efficiency |
| Modeled-as-metered confusion | Uncertainty bands + freshness dates on modeled figures |
| Founder time pressure | Intake + first ledger ≤ 15 min |
| Climate Brick mismatch | Use as scaling lens only, not the whole product |

---

## 11. Milestones

| Phase | Output |
| --- | --- |
| M0 | Clickable prototype: intake → ledger → gates → share (6 screens) |
| M1 | First-run usable: footprint estimate + one real-time grid integration |
| M2 | Gated handprint + freshness layer |
| M3 | Goal board + progress game |
| M4 | Share page + first 6 founder / 2 VC tests |

---

## 12. Open Questions

1. Minimum credible Scope 3 coverage for a seed-stage climate startup?
2. WattTime vs Electricity Maps as the Stage-1 default grid source?
3. How prescriptive should additionality gating be before it becomes friction?
4. Does the two-axis score belong on the share page, or stay internal in Stage 1?

---

## Sources

GHG Protocol (avoided/comparative emissions); Project Frame; WattTime (additionality, MOER); Electricity Maps; Green Software Foundation SCI; VTT/LUT Carbon Handprint Guide v2.0; Climate Brick (climatebrick.com). Full URLs in the Climate Goal Platform report and deck source trails.
