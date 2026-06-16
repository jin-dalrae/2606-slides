---
name: slides
description: Use when creating or editing presentation decks in this repo (the Rae Jin Slides web app) and the goal is a deck with real depth — an argument backed by evidence, not a buzzword exhibition. Covers the depth methodology (argument spine, claim→evidence→source, engaging prior art, pressure-testing the recommendation), a fabrication audit for drafted decks, and the verified render mechanics (registration in site-data.js, layouts, validation). Triggers: "make a deck", "make slides", "build a presentation", "make this deck deeper", "audit this deck".
---

# Slides — depth-first deck authoring

Build decks that a skeptical senior person would respect. The bar (from the
user's standing instruction): **senior-consultant grade — a 5-year consultant
who could be promoted to manager.** Not a patch job, not a buzzword reel.

A deck has depth when **every slide advances one argument and load-bearing
claims survive a fact-check.** A deck is an "empty words exhibition" when slides
display categories and adjectives that no one could disagree with. This skill
exists to produce the former.

The gold-standard reference in this repo is
`presentations/cosmos-spatializing-asynchronous-community-jun11.md`. Read it
before drafting — it is what "depth" looks like here.

---

## The depth methodology

Apply these in order. They are the difference between a deck and a slideshow.

### 1. Find the spine before writing any slide

A deck with depth is **one argument**, not a topic tour. State it in a single
sentence first:

> *Given [situation], we should [recommendation], because [reason], and here is
> the evidence — including why the obvious objection fails.*

Every slide must move this sentence forward. If a slide doesn't advance the
spine, it is cut. The Cosmos deck tags each slide's job (`slide-ref` →
"Research question 1", "Competitive gap", "Strategic implication") so the spine
is visible. Do the same: name each slide's role in the argument.

### 2. The headline test (the single most powerful anti-buzzword rule)

**Every slide title is a complete, falsifiable claim — something a smart person
could disagree with — or a sharp question the slide answers.**

- ❌ "Market Overview" · "Our Approach" · "Key Considerations" · "AI Strategy"
- ✅ "Reddit has the content but is still a feed" · "Platform-first is too risky"
  · "Live audio is not the wedge" · "Structure has been tried before"

If you can't turn a title into an assertion, you don't yet have a point — you
have a topic. Go find the point or cut the slide.

### 3. Claim → Evidence → Source (no naked claims)

For every load-bearing claim, answer: *how do I know this, and can the audience
check it?*

- Specific beats abstract: not "overload causes fatigue" but *"Information
  overload was the strongest predictor of social media fatigue"* with the
  source line.
- A statistic without a source is decoration. Either attach a real, checkable
  source (`slide-source` with the URL), soften it to a clearly-labeled
  hypothesis, or cut it.
- A claim you can't support is a liability, not filler. Remove it.

### 4. Engage the strongest counter-argument head-on

Depth means you've already thought of the objection the audience will raise.
Put it on a slide and answer it. The Cosmos deck dedicates a slide to "Structure
has been tried before" (Kialo, Debategraph) — the closest prior art — and shows
why the new approach differs, instead of pretending it's first. **Hiding the
nearest competitor or the obvious risk is the clearest tell of a shallow deck.**

### 5. Pressure-test the recommendation

A deck with depth states what would make it **wrong**. Include the conditions
under which you'd abandon or change course:

- Go / Stop criteria (Cosmos has both as explicit slides)
- Risks, each with the test that retires it
- What evidence is still missing

A recommendation no one stress-tested reads as a pitch, not analysis.

### 6. Synthesis, not enumeration

Tables and cards exist to **compare and decide**, not to list. Every comparison
table needs a "so what" column — the column that turns data into a decision
("Gap Cosmos can test", "Cosmos implication", "Evidence needed"). A table of
features with no consequence column is enumeration; add the judgment.

### 7. Earn the conclusion

The final position is the payoff of everything before it, stated precisely
enough to be acted on or argued with:

> *"A cross-device VR community wall that rebuilds offline asynchronous message
> surfaces with place memory, inspectable clusters, and low-pressure
> contribution."*

Not "Cosmos is exciting and has great potential." Vague endings retroactively
make the whole deck feel like an empty-words exhibition.

### Depth anti-patterns — cut on sight

- Title is a category/noun, not a claim (fails the headline test).
- Bullets are buzzwords or nouns, not assertions ("Scalability. Innovation. Synergy.").
- A number with no source, or no comparison to make it mean something.
- A "framework" slide that names boxes without saying what each one *decides*.
- The recommendation is never challenged anywhere in the deck.
- Two slides make the same point — merge them.
- Agenda/"thank you"/section-divider slides that carry no content. An agenda is
  allowed only if each row states *what that section decides* (see Cosmos
  "Agenda" → "What it decides" column).

---

## Fabrication audit (run on any drafted or inherited deck)

Decks here are often drafted by another model and **can contain fabricated
citations, paraphrases dressed up as direct quotes, and invented URLs.** This is
the highest-risk failure mode in this repo. Before trusting a draft:

- Verify every `slide-source` URL and every quoted line against the primary
  source. **Specific URLs (exact thread IDs, deep links) are the riskiest of
  all** — confirm they resolve and say what's claimed.
- A `> "quote"` must be the source's actual words. If it's a paraphrase, drop
  the quote marks or replace with the real wording.
- Stats: confirm the number, the date, and the publisher. Reddit/market figures
  go stale — check the "as of" date.
- If a claim can't be verified, downgrade it to a labeled hypothesis or remove
  it. Never launder an unverifiable claim into a confident assertion.
- Keep the deck and its backing report in `docs/` consistent — divergence
  between the pair is itself a tell that something was fabricated or drifted.

When the user says "don't touch it," that means **audit / read-only** — report
findings and confirm before editing.

---

## Workflow

1. **Establish the spine** (one sentence, §1). Confirm it with the user if the
   ask is open-ended.
2. **Outline by argument**, not by topic. List slide titles as *claims* (apply
   the headline test, §2) and the role each plays in the spine.
3. **Gather evidence first.** For a research/strategy deck, the depth usually
   lives in a backing report in `docs/`; the deck distills it. Consider pairing
   the deck with a `docs/` report and ending the deck with a source-trail slide
   pointing at `/docs/#<report-slug>` (Cosmos does exactly this).
4. **Draft** the Markdown file in `presentations/` using the mechanics below.
5. **Run the depth pass** (every anti-pattern above) and the **fabrication
   audit**. This is not optional — it is where the quality bar is met.
6. **Register** in `site-data.js` and **validate** (below).

---

## Render mechanics (verified against current code, 2026-06-14)

> ⚠️ The older `SLIDE_GUIDE.md` and `skills/rae-slides-authoring/SKILL.md` say to
> register decks in `script.js` and list a per-deck `theme` field. **Both are
> stale.** Decks register in `site-data.js`; there is no per-deck `theme`. Use
> the steps below.

### File rules

- One Markdown file in `presentations/`.
- **No YAML front matter.** The app splits slides on a line containing only
  `---`, so front matter creates a broken first slide.
- Slides are separated by `---` on its own line.
- Speaker notes: a line starting with `Note:` at the **end** of a slide. It
  shows in the notes panel, not on the slide.

### Registration — `site-data.js`, `slides[]` array

The site is data-driven from `site-data.js` (loaded by `index.html` as
`window.RJ_SITE`). Add an object to the `slides` array:

```js
{
  slug: "short-url-safe-slug",      // becomes /#slug
  title: "DECK TITLE",
  docTitle: "Subtitle / context",   // shown in chrome
  sidebarTitle: "Short sidebar label", // optional
  project: "Cosmos",                // must match a name in the projects[] array
  date: "June 14, 2026",
  file: "presentations/your-file.md",
  transition: "slide",              // slide | fade | convex | concave | zoom | none
  background: "shader",             // see below
  font: "lora",                     // see below
  public: true                      // readable by URL without login; editing still needs auth
}
```

**Backgrounds** (`background`):
- Theme-aware (follow the site light/dark toggle): `shader` (labeled "Aurora"),
  `waves`, `plasma`, `plain`.
- Fixed identity (ignore the site theme): `cloudflare`, `ivory`, `gray`.
- **A deck must never change the site theme.** There is no per-deck `theme`
  field — the toggle owns `data-theme`. Background is the only deck-level
  appearance knob.

**Fonts** (`font`): `lora`, `inter`, `roboto`, `playfair`, `merriweather`,
`montserrat`, `poppins`, `noto-sans`, `source-serif`. (Chrome stays Inter
regardless; `font` only restyles the deck.)

### Layout catalog (only these classes exist in `styles.css`)

Pick layout from the *content's shape*, never for decoration.

Title slide:

```md
# DECK TITLE

## Short descriptive subtitle

<p class="deck-subtitle">Presentation type or context</p>

Presenter: Rae Jin  
June 14, 2026

Note: Opening speaker note.
```

Single idea — plain Markdown (the default; reach for cards only when comparing):

```md
## A claim as the headline

One short paragraph that earns the claim.

<p class="slide-closing">The takeaway sentence.</p>
```

Role tag + source line (use liberally — they make the spine and evidence visible):

```md
<p class="slide-ref">Competitive gap</p>
<p class="slide-source">Source: Publisher, Date<br><a href="https://...">domain.com</a></p>
```

Comparison — `cards-2` (binary) / `cards-3` / `cards-4`:

```html
<div class="cards-3">
  <article><h3>First</h3><p>One assertion, not a label.</p></article>
  <article><h3>Second</h3><p>One assertion.</p></article>
  <article><h3>Third</h3><p>One assertion.</p></article>
</div>
```

Process — `steps-3` (ordered, vertical):

```html
<div class="steps-3">
  <article><span class="steps-3__num">01</span><div><h3>Step one</h3><p>…</p></div></article>
  <article><span class="steps-3__num">02</span><div><h3>Step two</h3><p>…</p></div></article>
  <article><span class="steps-3__num">03</span><div><h3>Step three</h3><p>…</p></div></article>
</div>
```

Systemic/equal trio — `orbital-3`:

```html
<div class="orbital-3">
  <article><span class="orbital-3__circle">One</span><p>…</p></article>
  <article><span class="orbital-3__circle">Two</span><p>…</p></article>
  <article><span class="orbital-3__circle">Three</span><p>…</p></article>
</div>
```

Text + one image — `media-split`:

```html
<div class="media-split">
  <div><p>Key explanation.</p></div>
  <img src="assets/images/example.png" alt="Specific, useful description">
</div>
```

Headline metrics — `metric-strip` (each metric needs a `slide-source` nearby):

```html
<div class="metric-strip">
  <article><strong>121M+</strong><span>daily active uniques</span></article>
  <article><strong>471M+</strong><span>weekly active uniques</span></article>
</div>
```

Method / criteria / comparison matrix — Markdown table **with a "so what"
column** (§6). Keep tables small; split a long one across slides.

```md
| Product | Strength | Gap we can exploit |
| --- | --- | --- |
| Reddit | Content scale | Debate structure |
```

### Writing rules

- Prefer fewer words per slide; never long paragraphs inside cards or tables.
- `**bold**` for emphasis, not ALL CAPS (except the deck title).
- Straight quotes and ASCII arrows (`->`) unless the deck already uses Unicode
  consistently.
- Every image needs a useful `alt`. Mark placeholders explicitly:
  `**Placeholder:** Human dashboard mockup`.
- Mermaid does not render. Convert any diagram to a table, a `->` text flow, or
  a custom HTML layout. Never leave a fenced `mermaid` block in a finished deck.

### Validation (run before finishing)

```sh
# 1. site-data.js still parses
node --check site-data.js

# 2. slide count is what you expect (splits on a bare --- line)
node -e "const fs=require('fs');const md=fs.readFileSync('presentations/YOUR_FILE.md','utf8');console.log(md.split(/\n---+\n/g).length,'slides')"

# 3. first slide title is real content, not stray YAML
node -e "const fs=require('fs');const md=fs.readFileSync('presentations/YOUR_FILE.md','utf8');console.log((md.match(/^#{1,3}\s+(.+)$/m)||[])[1])"
```

Then open the deck in the app (`/#your-slug`) and read it end to end as the
audience would — the depth pass isn't done until you've watched the argument
hold together slide by slide.
