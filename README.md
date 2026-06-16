# Rae Jin Slides

A static presentation library for Rae Jin's 2026 Summer MDes IxD CCA work.

## Features

- Home page with deck previews and profile links.
- Left-side deck library with real titles pulled from each markdown.
- Per-deck slide outline with smart `H1: H2` titling for title slides.
- Reveal.js engine, Markdown-authored decks.
- Keyboard navigation (arrows, space) and fullscreen mode (F).
- Speaker notes through Reveal `Note:` syntax, with right, below, and hidden note layouts.
- Markdown download and PDF export controls for each deck.
- Theme toggle (dark / light) with palette-aware shader.
- Animated WebGL shader background inside every slide frame.
- Cardinal-inspired visual system: Lora typography, mint accents, translucent panels, compact chrome.
- Layout patterns: two-card, three-card, orbital triad, vertical numbered steps, media split, tables, subtitle, closing line.
- Edit-on-GitHub link to jump straight from the deck to the source file.
- Static deployment friendly — no build step.

## What We're Proud Of

- Orbital triad and vertical step layouts that break the three-card monotony and fit the cosmic theme.
- Real-title resolution: the chrome always reflects what the deck actually says, not a placeholder label.
- Animated shader background gives every deck atmosphere without a single hero image.
- Markdown-first authoring — a new deck is a single `.md` file plus one line in `script.js`.
- Zero-build static deploy, even with theme toggle, custom layouts, speaker notes, exports, and live shader.

## What We're Working On

- A few more layout patterns: vertical 3-stack, comparison columns, full-bleed quote.
- Slide thumbnails in the sidebar slide list.
- Speaker view on a second display.
- Polish on the orbital triad (connecting lines, subtle motion).
- Mobile chrome pass — sidebar, header, and controls feel tight at narrow widths.
- Accessibility audit: keyboard focus rings, contrast over the shader, screen-reader labels.

## Local Preview

Reveal loads Markdown decks over HTTP, so preview with a local server:

```sh
python3 -m http.server 8000
```

Open:

```txt
http://localhost:8000
```

## Export

- `MD` downloads the active deck Markdown.
- `PDF` opens a slide-only export window using Reveal's `print-pdf` mode.
- For PDF export, use Chrome or Chromium and choose Save as PDF, Landscape, no margins, and background graphics enabled.
- PDF export forces a white slide background and light deck colors, independent of the current app theme.

## Deck Format

Decks live in `presentations/` and are written in Markdown.

- `---` creates a new horizontal slide.
- `--` creates a vertical slide.
- `Note:` starts speaker notes.
- Tables render with the presentation table style.
- Use `<div class="cards-3">...</div>` for three-column card slides.
- Use `<div class="cards-2">...</div>` for two-column comparison slides.
- Use `<div class="steps-3">...</div>` for vertical numbered steps.
- Use `<div class="orbital-3">...</div>` for the orbital triad layout.
- Use `<div class="media-split">...</div>` for text and image side-by-side.
- Use `<p class="deck-subtitle">...</p>` for a large mint subtitle.
- Use `<p class="slide-closing">...</p>` for closing emphasis text.

## Add A Deck

1. Add a Markdown file to `presentations/`.
2. Register it in the `presentations` array in `script.js`:

```js
{
  title: "Presentation Title",
  date: "June 4, 2026",
  file: "presentations/file-name.md"
}
```
