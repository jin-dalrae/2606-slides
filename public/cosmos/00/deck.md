# COSMOS

## Explore the social world in 3D

<p class="deck-subtitle">Research · design · prototype</p>

Presenter: Rae Jin<br>July 30, 2026

Note: This is the main story deck. Detailed research, transcripts, and impact notes remain in /cosmos/ as supporting material.

---

## The claim

Feeds give people plenty to read, but little sense of where a conversation is.

Cosmos explores a different model: a spatial wall where people can scan a field of ideas, focus on one position, compare its neighbors, and leave with a clear path back.

<p class="slide-closing">The first product is not a social VR hangout. It is a readable place for asynchronous discussion.</p>

---

## A real use moment

<p class="slide-ref">The body sets the brief</p>

<div class="media-split">
  <div>
    <p>Jeenie is caring for a sleeping baby and has a short pocket of attention.</p>
    <p>Her hands may be occupied, her wrists may be tired, and she still wants to understand what people are saying.</p>
    <p>Desk-style VR browsing assumes a controller, a desk, and uninterrupted time. Cosmos starts from a different condition: gaze-first browsing, optional hands, and the room still present.</p>
  </div>
  <img src="/assets/images/cosmos/storyboard-panels.jpg" alt="Storyboard showing a new parent browsing Cosmos while caring for a sleeping baby">
</div>

<p class="slide-closing">A calm, stoppable reading session is a design requirement, not a side effect.</p>

---

## The problem is orientation

Online discussion already contains many voices, sources, and threads. The feed turns them into one ranked stream.

That makes it difficult to answer simple questions:

- Where are the major positions?
- Which ideas are related?
- What did I already understand?
- Where should I look next — and when am I done?

<p class="slide-closing">Cosmos is not trying to make people consume more. It is trying to make the conversation easier to see.</p>

---

## Offline walls already make place useful

<p class="slide-ref">Reference behavior</p>

<div class="fs-photo-row">
  <figure>
    <img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png" alt="Dense public poster wall">
    <figcaption>Accumulate</figcaption>
  </figure>
  <figure>
    <img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png" alt="Wall of handwritten notes and post-its">
    <figcaption>Scan</figcaption>
  </figure>
  <figure>
    <img src="/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png" alt="Curated community note wall">
    <figcaption>Return</figcaption>
  </figure>
</div>

Messages arrive at different times. Readers understand the whole by noticing density, placement, repetition, and material traces.

<p class="slide-closing">Cosmos rebuilds that behavior digitally — with rules that can be inspected and changed.</p>

---

## Research changed the design brief

<div class="cards-3">
  <article>
    <h3>Reading is participation</h3>
    <p>Many people join a community to understand its norms, not to post immediately. Reading must be a successful endpoint.</p>
  </article>
  <article>
    <h3>Spatial value is comparison</h3>
    <p>The phone already wins at casual single-feed scroll. Spatial form must earn its place by showing several sources or stances together.</p>
  </article>
  <article>
    <h3>Attention is limited</h3>
    <p>Headset comfort, body position, and short pockets of time require a focused field rather than a sphere full of equally loud cards.</p>
  </article>
</div>

<p class="slide-closing">The goal is not more presence. It is better orientation with less pressure.</p>

---

## The design brief

Cosmos should help a reader:

<div class="steps-3">
  <article>
    <span class="steps-3__num">01</span>
    <div>
      <h3>Scan</h3>
      <p>Understand the field before committing attention.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">02</span>
    <div>
      <h3>Compare</h3>
      <p>See relationships, disagreement, and missing voices.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">03</span>
    <div>
      <h3>Return or leave</h3>
      <p>Save a path, archive noise, or stop cleanly.</p>
    </div>
  </article>
</div>

<p class="slide-closing">Contribution comes later. Understanding has to work first.</p>

---

## The wall needs a readable grammar

Placement cannot feel random. The default wall uses three visible rules:

| Spatial rule | Meaning | What the reader should see |
| --- | --- | --- |
| **Region** | Topic or debate neighborhood | Labels or a visible boundary |
| **Depth** | Priority, recency, or unread state | A consistent near / far cue |
| **Adjacency** | Similarity, tension, or source relation | Shared tags, links, or bridges |

These are hypotheses to test, not invisible assumptions.

<p class="slide-closing">If a reader cannot explain why a card is there, the space is only decoration.</p>

---

## Focus makes the field readable

<div class="media-split">
  <div>
    <p><strong>One active card</strong> becomes the reading surface.</p>
    <p><strong>Neighbors stay quiet</strong>: title and one line, not full competing paragraphs.</p>
    <p><strong>Connections remain visible</strong>: the reader can see which posts support, challenge, or extend the focus.</p>
    <p><strong>Source trails stay attached</strong>: every generated label opens to the posts behind it.</p>
  </div>
  <img src="/assets/images/cosmos-sphere-browse.webp" alt="Cosmos prototype showing discussion cards arranged in a spatial field">
</div>

<p class="slide-closing">Readable exploration beats a dense sphere of full posts.</p>

---

## The wall supports a complete loop

<div class="steps-3">
  <article>
    <span class="steps-3__num">01</span>
    <div>
      <h3>Bring forward</h3>
      <p>Focus a post and inspect the evidence behind its label.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">02</span>
    <div>
      <h3>Shape the field</h3>
      <p>Rearrange by time or source; save a path or archive noise.</p>
    </div>
  </article>
  <article>
    <span class="steps-3__num">03</span>
    <div>
      <h3>Leave with context</h3>
      <p>Return later from a visible shelf, or exit without another feed loop.</p>
    </div>
  </article>
</div>

<p class="slide-closing">Without these actions, the wall is a scene. With them, it becomes a tool.</p>

---

## Prototype walkthrough: from field to focus

<p class="slide-ref">What exists now</p>

<div class="media-split">
  <div>
    <p><strong>1 · Scan</strong> — see the topic regions and the distribution of posts.</p>
    <p><strong>2 · Approach</strong> — bring one card forward without losing the surrounding context.</p>
    <p><strong>3 · Inspect</strong> — read the post, related positions, and source trail.</p>
    <p><strong>4 · Decide</strong> — save, archive, rearrange, or leave.</p>
  </div>
  <img src="/assets/images/cosmos/full-story/slide-07.jpg" alt="Cosmos prototype walkthrough screen showing spatial discussion browsing">
</div>

<p class="slide-closing">The next prototype must make the placement rules visible in the interaction, not only in the explanation.</p>

---

## From research to build

| Status | What it means in Cosmos |
| --- | --- |
| **Built** | Web-based spatial browsing, card focus, early cluster behavior, and source-linked content |
| **Mocked** | Clear region labels, priority cues, save/archive shelf, and rearrangement controls |
| **Unproven** | Whether users understand the map without instruction and whether spatial comparison beats a feed |
| **Next** | Test the same discussion in feed and spatial formats with short, task-based sessions |

<p class="slide-closing">The prototype is useful because it exposes the design questions; it is not evidence that they are solved.</p>

---

## Responsibility is part of the design

| Risk | Mitigation |
| --- | --- |
| Spatial browsing becomes another endless session | Optimize for orientation, saved paths, and clean exit |
| Only premium headset users benefit | Keep the web experience first-class |
| AI labels flatten or misrepresent discussion | Show confidence, provenance, and the underlying posts |
| Empty walls fail to communicate value | Seed a bounded discussion before claiming community scale |
| Body and voice data create new exposure | Make gaze and text paths work without voice capture |

<p class="slide-closing">A responsible spatial product makes its limits visible too.</p>

---

## The next test

Compare the same discussion in two forms: a conventional feed and the Cosmos wall.

| Question | Evidence to collect |
| --- | --- |
| Can people explain the main positions? | Recall of regions, claims, and disagreement |
| Can people explain why a post is placed there? | Placement explanation without prompting |
| Does spatial comparison help? | Accuracy and confidence across multiple sources |
| Can people stop easily? | Time to find a stopping point and willingness to return |
| Does the system earn trust? | Source checking and response to incorrect labels |

<p class="slide-closing">The next milestone is not more features. It is proof that the map improves understanding.</p>

---

## The decision

Keep developing Cosmos if the wall helps people understand a multi-voice discussion faster, more comfortably, or more completely than a feed.

Stop and revise the spatial model if people cannot explain the layout, do not use comparison, or feel trapped in another attention loop.

<p class="slide-closing">First prove the wall. Then decide whether it deserves a community around it.</p>

Note: The supporting library contains the full evidence trail: /cosmos/secondary/, /cosmos/primary/, /cosmos/design-decision/, /cosmos/impact-analysis/, and /cosmos/making/.
