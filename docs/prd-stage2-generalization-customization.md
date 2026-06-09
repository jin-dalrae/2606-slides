# PRD — Stage 2

## Generalization, Result Customization, and Meaningful Follow-Up (Stretch)

Team: GTR (Rae, Gabriel, Tej) · Project: Social Lab · Date: June 15, 2026 · Status: Draft for review · Depends on: Stage 1 (Climate Startup +/- Impact Dashboard)

---

## 1. Summary

Stage 2 extends the proven climate-startup core in three directions:

1. **Generalize** to all tech startups, where impact is mostly footprint and the positive side is optional.
2. **Result customization** — the evaluation, goals, and share output adapt to the company's activity map, business model, stage, and audience, instead of a single generic result.
3. **Meaningful follow-up** — every dashboard reading produces an owned next action at the right cadence, turning a dashboard into an operating loop.

Stage 2 starts only after Stage 1 proves the rigorous two-sided model is credible to climate founders and VCs.

---

## 2. Problem

- The broad "every startup has a footprint" opportunity is large, but only credible once the strict climate-first core works.
- A generic result under-serves the actual operating reality: a compute-heavy AI company, a hardware-adjacent team, and an asset operator need different rubrics, baselines, and cadences.
- A dashboard that only displays is inert. Without a follow-up loop, readings do not become reductions.

---

## 3. Goals and Non-Goals

### Goals
- G1. Onboard footprint-first (non-climate) tech startups without forcing a handprint claim.
- G2. Tailor the evaluation rubric, goal set, and share page per company profile and per audience.
- G3. Convert every metric into an owned next action with the right cadence and a deadline.
- G4. Preserve Stage-1 integrity guarantees (no naive netting, additionality gates, freshness labels).

### Non-Goals
- NG1. Not regulatory disclosure (CSRD/ISSB) filing — still operating guidance.
- NG2. Not a full assurance/audit product.
- NG3. No marketplace of third-party verifiers yet.

---

## 4. Users (additions to Stage 1)

| Persona | New in Stage 2 | Need |
| --- | --- | --- |
| Non-climate tech founder | Yes | Footprint-first dashboard without a handprint requirement |
| Operations / sustainability lead | Expanded | Own and route follow-up actions across the team |
| Investor / advisor | Expanded | Audience-specific share page; portfolio view |
| Engineering lead | Yes | Receive compute/grid follow-up tasks directly |

---

## 5. Feature 1 — Generalization to All Tech Startups

- R1.1 Footprint-first onboarding: handprint section is optional and collapsed by default.
- R1.2 Expanded business-model taxonomy (SaaS, AI, marketplace, hardware-adjacent, services).
- R1.3 Map non-climate models to profile logic for milestone/cadence defaults, with Climate Brick used only when it improves the scaling-readiness reference.
- R1.4 Single-axis mode (impact integrity = footprint hygiene) when no positive claim exists.
- Acceptance: a SaaS startup completes a useful footprint dashboard without entering any avoided-emissions claim.

---

## 6. Feature 2 — Result Customization Engine

- R2.1 Per-profile rubric weights: which dimensions and metrics matter most for each activity pattern and generalized tech profile.
- R2.2 Per-profile goal library: recommended goals keyed to material activities + stage + detected gaps.
- R2.3 Per-profile measurement cadence: e.g., compute-heavy AI startups default to real-time grid tracking; hardware startups default to quarterly procurement reviews.
- R2.4 Audience-specific share pages: VC, LP, customer, internal — each rendering the right metrics at the right confidence.
- R2.5 Customization is configuration, not code: rubric/goal/cadence sets are data-driven and versioned.
- Acceptance: two different company profiles produce visibly different rubrics, goals, and share pages from the same engine.

| Customization axis | Driven by | Example |
| --- | --- | --- |
| Rubric weights | Activity profile | Asset operators weight offtake + marginal-grid; software-enabled hardware weights attribution |
| Goal set | Material activities + stage + gaps | Asset deployment → additionality goals; compute-heavy AI → grid-aware scheduling |
| Cadence | Operating model | AI startup → real-time compute; hardware → quarterly procurement |
| Share page | Audience | VC sees two-axis score; customer sees gated claims only |

---

## 7. Feature 3 — Meaningful Follow-Up Loop

- R3.1 Every metric and gate can emit a follow-up task (owner, due date, cadence, linked metric).
- R3.2 Rule library maps conditions → actions:

| Condition | Follow-up action | Owner | Cadence |
| --- | --- | --- | --- |
| High Scope 3 compute | Grid-aware scheduling task | Engineering | Real-time/weekly |
| Weak additionality | Revise baseline before claim ships | Founder | Before publish |
| Stale modeled handprint | Re-model with new adoption data | Founder | Annual |
| Vendor policy gap | Procurement review with decision | Ops | Quarterly |

- R3.3 Tasks feed back into the goal board and progress game (closing the loop).
- R3.4 Notifications honor cadence (no real-time nagging on annual metrics).
- Acceptance: a reading that breaches a threshold creates a routed, owned task within the product, not a dead number.

---

## 8. Platform / Data Extensions

- R4.1 Multi-team workspaces, roles (owner, member, advisor read-only).
- R4.2 Cloud billing API integrations (AWS/GCP/Azure) for metered Scope 2/3 compute.
- R4.3 Region-aware grid sourcing (marginal + average) across providers.
- R4.4 Verified emission-factor and baseline libraries (CRANE-style reference scenarios).
- R4.5 Portfolio view for investors across multiple companies (read-only, consented).
- R4.6 Data model extends Stage 1: add Workspace, Rule (follow-up), and Integration entities; Company gains a `profile_type` (climate vs footprint-only) that drives single- vs two-axis mode.

### Business model evolution

- Add a **footprint-only tier** priced for general tech startups (lower than the climate-startup two-sided tier, which carries the higher-value impact claim).
- **Result customization and the follow-up engine are the upsell** from a flat footprint dashboard to a managed operating loop.
- **Portfolio view** is the investor/accelerator seat — the highest-ACV motion, sold top-down.
- Entry to Stage 2 is gated on the Stage 1 result (≥ 4 of 6 VCs accept the share page; ≥ 50% weekly return). Do not generalize before the climate-first core is validated.

---

## 9. Success Metrics

| Goal | Metric | Target |
| --- | --- | --- |
| Generalization | Non-climate startups completing a useful footprint dashboard | ≥ 70% |
| Customization value | Users who say the result "fits our company" | ≥ 75% |
| Follow-up efficacy | Readings that convert to owned, completed actions | ≥ 40% |
| Integrity retained | + claims with additionality note (unchanged from Stage 1) | 100% |
| Cadence fit | Notifications rated "right timing, not noisy" | ≥ 70% |

---

## 10. Risks

| Risk | Mitigation |
| --- | --- |
| Customization sprawl | Data-driven, versioned rubric sets; cap profile configs |
| Follow-up nagging | Cadence-aware notifications; batch by owner |
| Footprint-only greenwashing | Keep "no positive claim" honest; never imply net positive without handprint |
| Integration fragility | Graceful manual fallback when billing/grid APIs fail |
| Dilution of the climate-first credibility | Keep climate-startup mode as the flagship, rigorous path |

---

## 11. Milestones

| Phase | Output |
| --- | --- |
| S2.0 | Footprint-first onboarding + single-axis mode |
| S2.1 | Result customization engine (rubrics, goals, cadence by profile) |
| S2.2 | Audience-specific share pages |
| S2.3 | Follow-up rule library + task routing |
| S2.4 | Cloud billing integrations + portfolio view |

---

## 12. Open Questions

1. How many distinct profile rubric sets are worth maintaining before diminishing returns?
2. Should follow-up rules be user-editable, or curated-only at first?
3. Does a footprint-only startup ever get a "net" number, or only a footprint score?
4. Is the investor portfolio view a Stage-2 feature or its own stage?

---

## Sources

Inherits Stage 1 methodology and sources (GHG Protocol; Project Frame; WattTime; Electricity Maps; Green Software Foundation SCI; VTT/LUT handprint; Climate Brick). See Stage 1 PRD and the Climate Goal Platform report for full URLs.
