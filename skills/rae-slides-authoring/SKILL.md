---
name: rae-slides-authoring
description: Use when creating or editing Markdown presentation decks for the Rae Jin Slides web app, including deck registration, defaults for font/background/theme/transition, slide layout selection, three-component layouts, speaker notes, and render-safe Markdown structure.
---

# Rae Slides Authoring

Use this skill to create a deck that renders correctly in the Rae Jin Slides web app.

## Workflow

1. Create one Markdown file in `presentations/`.
2. Do not use YAML front matter. This app uses `---` as slide separators, so front matter creates a broken first slide.
3. Register the deck in `script.js` in the `presentations` array.
4. Keep slides concise: one main idea per slide, concrete headings, short paragraphs.
5. Run `node --check script.js` and verify the deck splits with `md.split(/\n---+\n/g)`.

## Deck Registration

Use this shape:

```js
{
  slug: "short-url-safe-slug",
  title: "Deck Title",
  date: "June 11, 2026",
  file: "presentations/deck-file-name.md",
  transition: "slide",
  background: "shader",
  font: "lora",
  theme: "dark"
}
```

Supported `transition` values:

- `slide`
- `fade`
- `convex`
- `concave`
- `zoom`
- `none`

Supported `background` values:

- `shader`: animated WebGL background
- `plain`: black in dark mode, white in light mode
- `ivory`: light warm paper background
- `gray`: neutral dark gray background

Supported `font` values:

- `lora`
- `inter`
- `roboto`
- `playfair`
- `merriweather`
- `montserrat`
- `poppins`
- `noto-sans`
- `source-serif`

Supported `theme` values:

- `dark`
- `light`

## Markdown Structure

Title slide:

```md
# Project Title

## Short descriptive subtitle

<p class="deck-subtitle">Presentation type or context</p>

Course: Class or venue  
Presenter: Rae Jin  
June 11, 2026

Note: Opening speaker note.
```

New slide:

```md
---

# Slide title
## Optional subtitle

Short body text.
```

Speaker notes:

```md
Note: This appears in the speaker notes panel, not on the slide.
```

Notes must start with `Note:`. Put notes at the end of the slide content.

## Layout Choices

Use plain Markdown when the slide has one main idea:

```md
# Main idea

One short paragraph that explains the point.
```

Use `cards-3` for three components, three options, or three outcomes:

```html
<div class="cards-3">
  <article>
    <h3>First</h3>
    <p>Short explanation.</p>
  </article>
  <article>
    <h3>Second</h3>
    <p>Short explanation.</p>
  </article>
  <article>
    <h3>Third</h3>
    <p>Short explanation.</p>
  </article>
</div>
```

Use `cards-2` for binary comparison:

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

Use tables for method, criteria, metrics, comparison matrices, or structured evidence:

```md
| Category | Detail |
|---|---|
| Agent efficiency | 70% token reduction |
| Human oversight | 100% traceable payments |
```

Use `steps-3` for a three-step vertical process:

```html
<div class="steps-3">
  <article>
    <span class="steps-3__num">01</span>
    <div>
      <h3>Step one</h3>
      <p>Short explanation.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">02</span>
    <div>
      <h3>Step two</h3>
      <p>Short explanation.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">03</span>
    <div>
      <h3>Step three</h3>
      <p>Short explanation.</p>
    </div>
  </article>
</div>
```

Use `orbital-3` for three related concepts that should feel equal or systemic:

```html
<div class="orbital-3">
  <article>
    <span class="orbital-3__circle">One</span>
    <p>Short explanation.</p>
  </article>
  <article>
    <span class="orbital-3__circle">Two</span>
    <p>Short explanation.</p>
  </article>
  <article>
    <span class="orbital-3__circle">Three</span>
    <p>Short explanation.</p>
  </article>
</div>
```

Use `media-split` when text and one image need equal attention:

```html
<div class="media-split">
  <div>
    <p>Key explanation.</p>
  </div>
  <img src="assets/images/example.png" alt="Specific visual description">
</div>
```

Closing emphasis:

```html
<p class="slide-closing">Final takeaway sentence.</p>
```

## Mermaid And Diagrams

The app does not currently render Mermaid diagrams. If source notes contain Mermaid, convert it into:

- a plain text flow using `->`
- a table
- a placeholder line for a future visual
- a custom HTML layout

Do not leave fenced `mermaid` blocks if the deck needs polished rendering.

## Writing Rules

- Prefer fewer words per slide.
- Do not put long paragraphs inside cards or tables.
- Avoid huge tables; split them into multiple slides.
- Use `**bold**` for emphasis, not all caps.
- Use straight quotes and ASCII arrows (`->`) unless the source deck already uses Unicode consistently.
- Every image needs a useful `alt`.
- Keep placeholder visuals explicit: `**Placeholder:** Human dashboard mockup`.

## Validation

Run:

```sh
node --check script.js
```

Count slides:

```sh
node -e "const fs=require('fs'); const md=fs.readFileSync('presentations/YOUR_FILE.md','utf8'); console.log(md.split(/\n---+\n/g).length)"
```

Check that the first slide title is not YAML metadata:

```sh
node -e "const fs=require('fs'); const md=fs.readFileSync('presentations/YOUR_FILE.md','utf8'); console.log((md.match(/^#{1,3}\s+(.+)$/m)||[])[1])"
```
