# Rae Jin Slides

Static presentation library for 2026 Summer, MDes IxD CCA.

## Run Locally

Reveal.js loads Markdown decks over HTTP, so use a local server:

```sh
python3 -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

## Edit Presentations

Decks live in `presentations/`.

- `---` creates the next horizontal slide.
- `--` creates a vertical slide.
- `Note:` starts speaker notes for the slide.

Example:

```md
# Slide Title

Slide body text.

---

## Next Slide

- One point
- Another point

Note:
Speaker notes for this slide.
```

## Add A Presentation

1. Create a new Markdown file in `presentations/`.
2. Add it to the `presentations` array in `script.js`.
