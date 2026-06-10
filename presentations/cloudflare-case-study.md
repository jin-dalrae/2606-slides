# Case Study for Cloudflare

## Design Engineer · portfolio review

<p class="deck-subtitle">Selected work, and one deep dive</p>

Rae Jin  
June 9, 2026  
CCA MDes · Leadership by Design

Note: Hi, I'm Rae. Thanks for the time. I design and build products — a designer who ships real code. In the next ~30 minutes I'll do three things: tell you quickly how I got here and how I work, give you a fast map of my taste across a few projects, then go deep on one — AutoScape — so you can see exactly how I take something from a single photo to a near-complete product in three weeks. Stop me anytime.

---

<p class="slide-ref">Introduction · 1 of 3</p>

# I read systems, and I read people

## Two trainings, one instinct

<div class="metric-strip">
  <article><strong>Math</strong><span>+ sociology · how systems &amp; people behave</span></article>
  <article><strong>8 yrs</strong><span>AI for Korea's largest banks</span></article>
  <article><strong>MDes</strong><span>interaction design · designer who codes</span></article>
</div>

Note: My background isn't a straight line, and that's the point. I studied mathematics and sociology — one taught me to model systems, the other taught me to never forget the human inside the system. I spent eight years as a consultant building AI and data products for the biggest financial institutions in Korea — LLM rollouts, fraud models, recommendation engines — shipping into messy, high-stakes, regulated environments. Now I'm finishing an MDes in interaction design. So I show up as someone who can hold the backend logic and the front-end craft in the same head. That combination is the whole story of how I work.

---

<p class="slide-ref">Introduction · 2 of 3</p>

# Five things that built me

## The throughline is shipping under constraint

<div class="cards-3">
  <article>
    <h3>Bank-grade AI</h3>
    <p>Led an LLM rollout across 43+ services; a PoC cut task time 77%. I learned to ship where mistakes are expensive.</p>
  </article>
  <article>
    <h3>0&rarr;1 reflex</h3>
    <p>15+ hackathon products shipped — most polished, several award-winning. Speed without dropping craft.</p>
  </article>
  <article>
    <h3>Patents &amp; research</h3>
    <p>Two patents and a first-author paper turning structured data into images a CNN can read. I go deep on hard problems.</p>
  </article>
</div>

<p class="slide-closing">Different rooms, same instinct: find the real problem, then make something coherent fast.</p>

Note: Five milestones, but here are the three that matter. First, enterprise AI: I led an LLM adoption program across more than forty services for a national bank — that taught me to ship where errors cost money and trust. Second, the 0-to-1 reflex: I've shipped fifteen-plus products at hackathon speed, most of them polished, several award-winning. I don't trade craft for speed. Third, depth: I hold two patents and published research on representing structured financial data as images so a CNN can find patterns in it. The throughline across all of it is the same instinct — find the real problem, then build something coherent, fast.

---

<p class="slide-ref">Introduction · 3 of 3</p>

# What it's like to work with me

## I bring the structure and the standard

<div class="cards-3">
  <article>
    <h3>I design in code</h3>
    <p>Figma to ship. I prototype in the real material — React, the actual interaction, the actual latency.</p>
  </article>
  <article>
    <h3>I make the cut</h3>
    <p>Taste is mostly subtraction. I'll tell you what we're <em>not</em> building this sprint, and why.</p>
  </article>
  <article>
    <h3>I sweat coherence</h3>
    <p>Ten good features that feel like one product beat twenty that feel like a menu.</p>
  </article>
</div>

Note: So what's it actually like to work with me? Three things. One — I design in code. I'm most useful at the seam between design and engineering, prototyping in the real material so we're arguing about the actual interaction and the actual latency, not a static mock. Two — I make the cut. Taste, to me, is mostly subtraction; I'll always have an opinion on what we're deliberately not building yet. Three — I obsess over coherence. The hardest and most valuable thing is making many parts feel like one product. Keep those three in mind, because you'll see all of them in the deep dive.

---

<p class="slide-ref">The landscape · 1 of 2</p>

# A quick map of my taste

## Range, but a consistent point of view

<div class="cards-4">
  <article>
    <h3>Spatial</h3>
    <p><strong>Cosmos</strong> — a 3D discourse browser for AR/VR. Three.js, solo, Anthropic hackathon.</p>
  </article>
  <article>
    <h3>Healthtech</h3>
    <p><strong>PeriCare</strong> — an on-device digital twin for perimenopause. iOS, private by default.</p>
  </article>
  <article>
    <h3>Agentic</h3>
    <p><strong>Cardinal</strong> — a control room for AI agents that spend company money.</p>
  </article>
  <article>
    <h3>Dev tools</h3>
    <p><strong>This deck</strong> — a markdown slide engine I built on Cloudflare Workers.</p>
  </article>
</div>

Note: Here's the fast map. I work across spatial interfaces, healthtech, agentic systems, and developer tools — but with one consistent point of view: take a genuinely hard problem and make it feel calm and usable. Quick pointer on the last one — the deck you're looking at right now runs on a markdown slide engine I built and host on Cloudflare Workers. So I'm not just interviewing at Cloudflare; I already build on it. Let me show you two of these for thirty seconds each, then we go deep.

---

<p class="slide-ref">The landscape · 2 of 2</p>

# Taste, in two glances

<div class="media-split">
  <div>
    <h3>Cosmos</h3>
    <p>Reddit is a feed; discourse is actually a shape. Cosmos browses conversation as a 3D sphere you move through — gaze-calibrated, five-agent pipeline, built solo.</p>
  </div>
  <img src="assets/images/cosmos-sphere-browse.png" alt="Cosmos spatial discourse browser rendering a conversation as a 3D sphere">
</div>

Note: Two glances. Cosmos first. The premise: a feed flattens conversation into a list, but discourse actually has a shape — branches, clusters, tangents. So I built a browser that renders a discussion as a 3D sphere you move through, gaze-calibrated for a headset, behind a five-agent pipeline. Solo build. What I want you to take from this is the instinct to question the default container — "why is this a list?" — and then actually build the alternative, not just mock it.

---

<div class="media-split">
  <div>
    <h3>PeriCare</h3>
    <p>A digital twin for perimenopause that models two real cycles — the hormonal one and the mood&ndash;sleep&ndash;symptom loop. On-device Apple Foundation Models, private by default, eight of nine phases shipped solo.</p>
  </div>
  <img src="assets/images/pericare-hero.jpg" alt="PeriCare iOS app — a private on-device digital twin for perimenopause">
</div>

Note: Second glance — PeriCare. Perimenopause is under-served and intensely personal, so two design constraints drove everything: it had to model the real biology — not one cycle but two, the irregular hormonal cycle and the self-reinforcing mood-sleep-symptom loop — and it had to be private, so it runs on-device with Apple's Foundation Models, no data leaving the phone. I shipped eight of nine phases solo. The takeaway: I let the real constraints — biology and privacy — set the architecture, instead of bolting them on later. Okay — that's the map. Let me go deep on one.

---

<p class="slide-ref">Deep dive</p>

# AutoScape

## AI landscape design from a single photo

<div class="metric-strip">
  <article><strong>3 wks</strong><span>team of 2 · my role: full-stack + RAG</span></article>
  <article><strong>3rd</strong><span>place + Nano Banana award</span></article>
  <article><strong>1 photo</strong><span>&rarr; hired landscaper</span></article>
</div>

Note: This is AutoScape. The one-line version, the way I'd open a case study: it turns a single photo of your yard into a buildable, costed landscape design — and we pushed it almost all the way to hiring a contractor. Three weeks, team of two; I owned full-stack development and the retrieval pipeline that powers cost estimation. It won third place and the Nano Banana award at the Qdrant–Freepik–DeepMind hackathon. Now I'll show you the problem, the key decisions, the product itself, and how it's built under the hood.

---

<p class="slide-ref">Deep dive · the problem</p>

# Landscaping is a trust problem

## You commit before you can see it

<div class="metric-strip">
  <article><strong>$5k&ndash;50k</strong><span>committed on a sketch</span></article>
  <article><strong>$500&ndash;2k</strong><span>just for initial concepts</span></article>
  <article><strong>30&ndash;50%</strong><span>typical budget overrun</span></article>
</div>

Note: Here's the problem, and it's not really a landscaping problem — it's a visualization-trust problem. Homeowners commit five to fifty thousand dollars on a sketch or a verbal description, then discover the result doesn't match what was in their head. Just getting initial concepts from a designer costs five hundred to two thousand. And because pricing is opaque and seasonal, overruns of thirty to fifty percent are normal. My teammate lived all of this on his own backyard. The gap wasn't information — people have hundreds of Pinterest images. The gap was that they could never actually see the end result before paying.

---

<p class="slide-ref">Deep dive · the decision</p>

# We picked one user on purpose

## Explorers, not deciders

<div class="cards-2">
  <article>
    <h3>Explorers — we built for them</h3>
    <p>Want many options, fast. Optimized for quick generation, multiple styles, low friction.</p>
  </article>
  <article>
    <h3>Deciders — we scoped out</h3>
    <p>Want one refined concept with exact costs. Itemized estimates and plant ID didn't fit three weeks.</p>
  </article>
</div>

<p class="slide-closing">Three weeks forces honesty. We optimized hard for one user instead of half-serving two.</p>

Note: First real decision, and this is the "I make the cut" thing in practice. There are two users hiding in this space. Explorers want lots of options fast to figure out what they even like. Deciders want one refined concept with exact, trustworthy costs. You cannot do both well in three weeks. So we explicitly built for Explorers — fast generation, multiple styles, low friction — and deliberately scoped out itemized estimates and plant identification. I'd rather delight one user than half-serve two, and I want to be able to say out loud which one we chose.

---

<p class="slide-ref">Deep dive · the insight</p>

## The make-or-break detail: keep the house, change the yard

<div class="before-after">
  <figure>
    <img src="assets/images/autoscape/yard-before.jpg" alt="A suburban home with a barren, dead front lawn">
    <figcaption>Before — the homeowner's own photo</figcaption>
  </figure>
  <figure>
    <img src="assets/images/autoscape/yard-after.webp" alt="The same home, same architecture, with a lush redesigned yard">
    <figcaption class="after">After — same house, transformed yard</figcaption>
  </figure>
</div>

Note: Second decision — the technical insight that made or broke the product. The seductive failure mode with image generation is that it produces something gorgeous that is not your yard — different house color, the fence is gone, the lot is the wrong shape. The moment a user sees that, they stop trusting it and they leave. Look at this pair: same house, same garage, same porch, same driveway — only the yard transforms. That faithfulness is the whole game. So the entire generation approach was built around preserving the existing structure of the photo while transforming only the vegetation and hardscape. That one constraint — keep the house, change the yard — drove all the prompt engineering.

---

<p class="slide-ref">Deep dive · the product</p>

# One coherent flow

## Photo to hired landscaper

<div class="steps-3">
  <article><span class="steps-3__num">1</span><div><h3>See it</h3><p>Upload a photo, pick a style, generate a faithful redesign.</p></div></article>
  <article><span class="steps-3__num">2</span><div><h3>Cost it</h3><p>Directional estimate and material list, retrieved from real asset pricing.</p></div></article>
  <article><span class="steps-3__num">3</span><div><h3>Build it</h3><p>2D top-down plan, then matched to a local contractor.</p></div></article>
</div>

Note: The product is one flow with three acts: see it, cost it, build it. Upload a photo and get a faithful redesign; turn that into a directional cost estimate and material list; then hand off a 2D plan and a matched contractor. The work I'm proud of isn't any single screen — it's that these feel like one continuous experience instead of three bolted-together tools. Let me walk the screens.

---

<p class="slide-ref">Deep dive · see it</p>

## Step 1 — one photo, two inputs

<img class="slide-image" src="assets/images/autoscape/autoscape-07.png" alt="AutoScape upload step: drop a yard photo, choose location type and space size, three-step wizard">

Note: Step one. We keep the input almost embarrassingly simple — drop one photo, and just two structured fields: location type and space size. A three-step wizard sets expectations up front. Notice we don't ask for anything a homeowner wouldn't know. The constraint here was friction: every extra field is a person who bounces before they ever see the magic, so the magic has to come first.

---

<p class="slide-ref">Deep dive · see it</p>

## Show, don't name

<img class="slide-image" src="assets/images/autoscape/autoscape-08.png" alt="AutoScape style picker: Modern, Traditional, and Regional style families shown as example photographs">

Note: Style selection — and this is a small taste decision I like. Homeowners don't know landscape vocabulary; "xeriscape" means nothing to most people. So instead of naming styles, we show them — every style is a real example photo grouped into families like modern, traditional, and regional. You pick by recognition, not by jargon. Designing for what the user actually knows, rather than what the domain calls things.

---

<p class="slide-ref">Deep dive · see it</p>

## Explore it live, not as a static render

<img class="slide-image" src="assets/images/autoscape/autoscape-11.png" alt="AutoScape redesign result: in-app before/after slider with 2D plan and video tabs">

Note: And here's how that lands inside the product. It's not a single static render — it's an interactive before/after slider you drag, with tabs for a 2D plan and a video walkthrough. Letting people scrub between their real photo and the redesign is what makes the transformation feel trustworthy rather than like a stock image. We also generated short video walkthroughs so people could feel scale and depth a flat render can't convey. This is the moment the product earns the right to talk about money.

---

<p class="slide-ref">Deep dive · cost it</p>

## A material list you can act on

<img class="slide-image" src="assets/images/autoscape/estimate.png" alt="AutoScape estimate: itemized material list with quantities, costs, and a buy link per item">

Note: Now cost. From the design we generate an itemized material list — quantities, directional prices, and a real purchase link per line item, so the list is something you can actually act on, not just read. Under the hood every one of these rows comes out of a retrieval pipeline I built, which I'll explain in a second. The design job here was making estimation feel trustworthy without overclaiming.

---

<p class="slide-ref">Deep dive · cost it</p>

## Honesty is a design decision

<img class="slide-image" src="assets/images/autoscape/pie-chart.png" alt="AutoScape cost distribution donut chart with a disclaimer that estimates are directional">

Note: And this is the slide I'd actually spend time on in an interview. We did not have a real landscaping price API — no one does. So rather than fake precision, we made the honesty part of the interface: a clear cost breakdown, labeled directional, with an explicit note that numbers vary by region. Telling the user how much to trust the number is itself a design decision, and the right one when the data is a proxy. Overclaiming here would have destroyed the trust the redesign just earned.

---

<p class="slide-ref">Deep dive · build it</p>

## A plan a landscaper can build from

<img class="slide-image" src="assets/images/autoscape/plan-2d.png" alt="2D top-down architectural landscape plan generated by AutoScape">

Note: Before we hand off to a human, we turn the pretty render into something a professional can actually install from — a 2D top-down architectural plan. This is the bridge between "I like this" and "someone can build this." It's also where the Explorer quietly becomes a Decider: the same design, now expressed as a buildable plan with placement and scale. Generating this from the concept was a real piece of work, not a screenshot filter.

---

<p class="slide-ref">Deep dive · build it</p>

## Close the loop to a real person

<img class="slide-image" src="assets/images/autoscape/autoscape-04.png" alt="AutoScape contractor matching: local landscape designers and contractors with ratings and contact">

Note: And build. The flow ends where the real-world job begins — matched local contractors, with the 2D top-down plan a landscaper can actually install from. This is what "stopped just short of invoicing" means: we went photo, to faithful render, to costed material list, to plan, to a real person you can hire — and stopped only at payment and fulfillment, which needed partnerships we didn't have time to set up. The point is the loop closes onto an actual outcome.

---

<p class="slide-ref">Deep dive · under the hood</p>

# How it's actually built

## The RAG pipeline was the core

<div class="cards-3">
  <article>
    <h3>Retrieval = pricing</h3>
    <p>Indexed Freepik's asset library into a Qdrant vector DB; semantic search returns visually similar items <em>with</em> price metadata.</p>
  </article>
  <article>
    <h3>Prompts = fidelity</h3>
    <p>Engineered prompts to preserve photo structure while transforming greenery, with preprocessing for low light and hard angles.</p>
  </article>
  <article>
    <h3>Stack = shippable</h3>
    <p>React + Vite + Tailwind, generative image APIs, Qdrant, Freepik API, Firebase hosting.</p>
  </article>
</div>

Note: Under the hood — and this is where the design-engineer part lives. The core technical contribution was the retrieval pipeline. There's no pricing API for landscaping, so I indexed Freepik's asset library — plants, materials, furniture — into a Qdrant vector database, and used semantic search to pull visually similar items that carry real price metadata. That's how a render becomes a costed material list. The second hard part was prompt engineering for fidelity — preserving the photo's structure while transforming the greenery, plus preprocessing for bad lighting and extreme angles. Stack was deliberately boring and shippable: React, Vite, Tailwind, image-gen APIs, Qdrant, Freepik, Firebase. I owned the full stack and that pipeline end to end.

---

<p class="slide-ref">Reflections · 1 of 2</p>

# What I'd do differently

## Constraints I'd name in the room

<div class="cards-3">
  <article>
    <h3>Directional ≠ truth</h3>
    <p>The RAG estimate is a proxy. Next: a real supplier price feed before promising accuracy.</p>
  </article>
  <article>
    <h3>We served one user</h3>
    <p>Deciders still can't get an exact quote. That's the next build, not a bug we hid.</p>
  </article>
  <article>
    <h3>Stopped at payment</h3>
    <p>Invoicing and fulfillment needed partnerships. I'd line those up before the next sprint, not after.</p>
  </article>
</div>

Note: What I'd do differently — and I think naming this honestly is part of being senior. Three things. The cost estimate is directional, a proxy off asset metadata; if this were a real product the next move is a genuine supplier price feed before I promise accuracy. We optimized for Explorers, which means Deciders still can't get an exact quote — that's a deliberate gap and the obvious next build, not something I'd paper over. And we stopped just short of invoicing because fulfillment needed partnerships; knowing that, I'd start lining those up at the beginning of the next phase, not the end. None of these are surprises — and that's the point.

---

<p class="slide-ref">Reflections · 2 of 2</p>

# What I took away

> You can go remarkably far in three weeks if you stay focused. The hardest part was never a single feature — it was making them feel like one product.

<p class="slide-closing">Users don't care about the architecture. They care whether they can go from photo to hired landscaper without friction.</p>

Note: The big takeaway. We went from "generate a pretty picture" to a near-complete workflow — visualization, costing, material lists, 2D plans, contractor matching — in three weeks. And the hardest part, every time, was not building any one feature. It was coherence: making all of them feel like a single product instead of a pile of demos. Users never care about the architecture I just walked you through. They care about one thing: can I get from a photo to a hired landscaper without friction. That's the standard I hold everything to.

---

<p class="slide-ref">Close</p>

# Why I'm here

## A designer who ships the real thing

<div class="cards-3">
  <article>
    <h3>Design in code</h3>
    <p>I prototype and ship in the real material — exactly the Design Engineer seam.</p>
  </article>
  <article>
    <h3>Judgment under constraint</h3>
    <p>I'll choose the user, name the trade-off, and protect coherence.</p>
  </article>
  <article>
    <h3>Already on your platform</h3>
    <p>I build on Cloudflare Workers today. I'd love to do it on the team.</p>
  </article>
</div>

Note: To close — why Cloudflare, why this role. A Design Engineer lives at the seam between design and code, and that's exactly where I'm most useful: I prototype and ship in the real material. I bring judgment under constraint — I'll choose the user, name the trade-off out loud, and fight to keep the product coherent. And I'm already building on your platform; this deck is running on Workers right now. I'd love to do that work with your team.

---

# Thank you

## Rae Jin · Design Engineer

dalrae.jin.work@gmail.com  
raejin.web.app · github.com/jin-dalrae

Note: Thank you. I'd love to dig into anything — the retrieval pipeline, the Explorers-versus-Deciders call, or how I'd have handled the pricing problem with more time. What's on your mind?
