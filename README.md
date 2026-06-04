# Rae Jin Slides

A static presentation library for Rae Jin's 2026 Summer MDes IxD CCA work.

## Features

- Home page with profile links.
- Left-side presentation library.
- Per-presentation slide outline.
- Reveal.js presentation engine.
- Markdown-authored decks.
- Keyboard and button navigation.
- Fullscreen presentation mode.
- Speaker notes support through Reveal notes syntax.
- Cadinal-inspired visual system using Lora typography, mint accents, translucent panels, and compact chrome.
- Animated WebGL shader background inside each slide frame.
- Reusable slide patterns for tables, three-card rows, subtitles, and closing statements.
- Static deployment friendly: no build step required.

## Local Preview

Reveal loads Markdown decks over HTTP, so preview with a local server:

```sh
python3 -m http.server 8000
```

Open:

```txt
http://localhost:8000
```

## Deck Format

Decks live in `presentations/` and are written in Markdown.

- `---` creates a new horizontal slide.
- `--` creates a vertical slide.
- `Note:` starts speaker notes.
- Tables render with the presentation table style.
- Use `<div class="cards-3">...</div>` for three-column card slides.
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
