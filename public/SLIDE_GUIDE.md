# Slide Guide

Use this guide when turning raw notes into decks for the slide system.

## Deck Workflow

1. Create a Markdown file in `presentations/`.
2. Add the deck to the `slides` array in `site-data.js`.
3. Use `---` between horizontal slides.
4. Use the layout patterns below based on the content structure.

## Content-To-Layout Rules

- One big idea: use a plain heading and one paragraph.
- Three related components: use `cards-3`.
- Two opposing ideas: use `cards-2`.
- Research plan, method, or evaluation structure: use a Markdown table.
- Competitive comparison: use a Markdown table.
- Final deliverables: use `cards-3` plus `slide-closing`.
- Subtitle on title slide: use `deck-subtitle`.

## Title Slide

```md
# Project Title

## Short descriptive subtitle

<p class="deck-subtitle">Research proposal</p>

Course: Experience Design  
Presenter: Rae Jin  
June 4, 2026
```

## Three Cards

```html
<div class="cards-3">
  <article>
    <h3>First Component</h3>
    <p>Short explanation.</p>
  </article>
  <article>
    <h3>Second Component</h3>
    <p>Short explanation.</p>
  </article>
  <article>
    <h3>Third Component</h3>
    <p>Short explanation.</p>
  </article>
</div>
```

## Two Cards

```html
<div class="cards-2">
  <article>
    <h3>Option A</h3>
    <p>Short explanation.</p>
  </article>
  <article>
    <h3>Option B</h3>
    <p>Short explanation.</p>
  </article>
</div>
```

## Research Table

```md
| Research Component | Plan |
| --- | --- |
| Objective | What the research needs to learn. |
| Method | How the research will be conducted. |
| Execution | What participants will do. |
| Evaluation | How findings will be judged. |
```

## Comparison Matrix

```md
| Platform | Format | Interaction | Experience Flaw |
| --- | --- | --- | --- |
| Example | Spatial 3D | Synchronous | High cognitive load |
```

## Closing Slide

```html
<div class="cards-3">
  <article>
    <h3>Outcome One</h3>
    <p>What it gives the project.</p>
  </article>
  <article>
    <h3>Outcome Two</h3>
    <p>What it gives the project.</p>
  </article>
  <article>
    <h3>Outcome Three</h3>
    <p>What it gives the project.</p>
  </article>
</div>

<p class="slide-closing">Final takeaway statement.</p>
```

## Editing Principles

- Prefer fewer words per slide.
- Use repeated structures when there are repeated ideas.
- Do not put long paragraphs inside tables.
- Use cards when the audience needs comparison at a glance.
- Use tables when the audience needs method, criteria, or evidence.
- Keep headings concrete and short.
