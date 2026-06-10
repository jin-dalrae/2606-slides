# Case Study for Cloudflare

## Product Engineer · portfolio review

<p class="deck-subtitle">A few projects, then one I'll go deep on.</p>

Rae Jin  
June 9, 2026  
CCA MDes · Leadership by Design

Note: Hi, I'm Rae. I design and build products. I'll show some other projects first, then go deep on AutoScape. It's a web app that turns a single photo of your yard into landscape design concepts. Upload a photo, pick a style, and get generated visualizations with directional cost estimates. Built over 3 weeks for the Sketch and Search Hackathon (Qdrant, Freepik, Google DeepMind). Team of 2 — I handled full-stack development and the Freepik RAG pipeline. Won third place and the Nano Banana Award. It's not just generating pictures — it goes all the way to a builder you can actually contact. Stop me if you have questions.

---

<p class="slide-ref">Introduction · 1 of 3</p>

# I start with real problems

## My background

<div class="cards-2">
  <article>
    <h3>Math and sociology</h3>
    <p>Math taught me to model systems. Sociology taught me to never forget the people inside them.</p>
  </article>
  <article>
    <h3>8 years in banks</h3>
    <p>I built AI products for Korea's biggest banks. High-stakes, regulated, and unforgiving when you get it wrong.</p>
  </article>
</div>

Note: My background isn't a straight line, and that's the point. I studied mathematics and sociology — one taught me to model systems, the other taught me to never forget the human inside the system. I spent eight years as a consultant building AI and data products for the biggest financial institutions in Korea — LLM rollouts, fraud models, recommendation engines — shipping into messy, high-stakes, regulated environments. Now I'm finishing an MDes in interaction design. So I show up as someone who can hold the backend logic and the front-end craft in the same head. That combination is the whole story of how I work.

---

<p class="slide-ref">Introduction · 2 of 3</p>

# What the work taught me

<div class="cards-3">
  <article>
    <h3>Trust is everything</h3>
    <p>The interface has to carry the weight of the model. If a user can't see why a number is there, the whole thing falls apart.</p>
  </article>
  <article>
    <h3>One strong idea beats ten half-built ones</h3>
    <p>I've shipped fifteen-plus small projects. The ones that worked had a single clear idea, not a pile of features.</p>
  </article>
  <article>
    <h3>The hard part is the choices</h3>
    <p>Two patents on turning financial data into images a model could read. The model was never the hard part — deciding what to keep and what to cut was.</p>
  </article>
</div>

Note: I don't collect wins. I look for hard problems and try to solve them in a clean way. This comes from doing the work. In banks I saw what happens when trust breaks. With the small projects I learned that one strong idea beats a bunch of half done ones. The patents showed me that the real work is deciding what to keep and what to throw away.

---

<p class="slide-ref">Introduction · 3 of 3</p>

# How I work

<div class="cards-3">
  <article>
    <h3>I build in code</h3>
    <p>I don't just draw it. I build the real thing in code, and judge it by how it feels to use, not only how it looks.</p>
  </article>
  <article>
    <h3>I choose what not to do</h3>
    <p>I say no to most ideas and pick one group to serve first. Doing one thing well beats doing five things halfway.</p>
  </article>
  <article>
    <h3>It has to feel like one thing</h3>
    <p>Lots of small parts are easy. Making them feel like one product is the hard part — and the part that matters.</p>
  </article>
</div>

Note: You'll see all of this in AutoScape. We picked one kind of user, stayed honest about the costs, and made sure the picture turned into a plan a builder could actually use. The rest is details.

---

<p class="slide-ref">Featured work</p>

# A few things I've built

## Different problems, same instinct

<div class="cards-4">
  <article>
    <h3>Cosmos</h3>
    <p>A 3D way to read online discussions. Not a feed — a space you move through. Built solo at a hackathon.</p>
  </article>
  <article>
    <h3>PeriCare</h3>
    <p>An on-device app for perimenopause. Everything runs on the phone, no data leaves it. Built mostly solo.</p>
  </article>
  <article>
    <h3>Cardinal</h3>
    <p>A dashboard for AI agents that spend company money. Rules and spend in one view.</p>
  </article>
  <article>
    <h3>This deck</h3>
    <p>The slides you're looking at. Built on Cloudflare Workers, and I actually use it.</p>
  </article>
</div>

Note: The projects look different, but the instinct is the same — take something complicated and make it easier to actually use, and make trust visible while doing it. I'll show three quick, then go deep on AutoScape.

---

<p class="slide-ref">Featured work · Cosmos</p>

# Cosmos

## Make a discussion something you can read, not scroll

<div class="media-split">
  <div>
    <p>Most people in online communities read without ever posting. Feeds are great at volume, weak at structure — you can't see where a debate splits.</p>
    <p><strong>The design call:</strong> design for readers first. Turn existing discussions into regions you can navigate, and never show an AI label without its source posts.</p>
  </div>
  <img src="assets/images/cosmos-sphere-browse.png" alt="Cosmos spatial discourse browser rendering a conversation as a 3D sphere">
</div>

Note: Cosmos is a research direction for browsing discussions spatially. The insight that shaped it: most people read without posting, so the first job isn't getting people to post — it's making a discussion easier to understand than a flat feed. The hard rule was inspectability: every AI cluster or label has to point back to real posts, or people stop trusting it. Built solo at a hackathon.

---

<p class="slide-ref">Featured work · CadinalPay</p>

# CadinalPay

## When an AI agent spends the company's money

<div class="cards-2">
  <article>
    <h3>The story</h3>
    <p>Agents are moving from advice to action — soon they'll buy software and reports themselves. Approve everything and it's too slow; approve nothing and you risk rogue spending.</p>
  </article>
  <article>
    <h3>The design call</h3>
    <p>A human in the loop at the right moments, not every moment. The core screen is the interruption — a $720 report, new vendor — where your choice also teaches the system.</p>
  </article>
</div>

Note: CadinalPay is a payment interface for the moment agents start spending company money. The whole tension is speed versus trust. My main design decision was the interruption moment: control shows up when the amount is high, the vendor is new, or the agent is unsure — not on every purchase. And the human's choice should teach the system, so approvals aren't just yes or no.

---

<p class="slide-ref">Featured work · PeriCare</p>

# PeriCare

## A private companion for perimenopause

<div class="media-split">
  <div>
    <p>Started from a real problem my mom went through. The data is deeply personal, and the app maps two overlapping cycles.</p>
    <p><strong>The design call:</strong> privacy as the starting constraint, not a feature. Everything runs on the phone — that one decision shaped the whole architecture.</p>
  </div>
  <img src="assets/images/pericare-hero.jpg" alt="PeriCare iOS app — a private on-device digital twin for perimenopause">
</div>

Note: PeriCare is for perimenopause — a real problem my mom lived through. Because the data is so personal, I made privacy the constraint everything else had to fit, not a feature I bolted on. Everything runs on-device, nothing leaves the phone. The biology and the privacy need decided the architecture. I built almost all of it myself.

---

<p class="slide-ref">Deep dive</p>

# AutoScape

## One photo to a real plan

<div class="metric-strip">
  <article><strong>3 weeks</strong><span>Team of two. I owned the full stack and the data pipeline.</span></article>
  <article><strong>3rd place + award</strong><span>Sketch &amp; Search Hackathon — Qdrant, Freepik, DeepMind.</span></article>
  <article><strong>Photo to builder</strong><span>See the yard, see the cost, get a plan, reach a contractor.</span></article>
</div>

Note: This is the main one — AutoScape. You upload one photo of your yard, choose a style, and it gives you pictures of what it could look like, plus a list of materials with real-ish prices, a top-down plan, and actual local contractors you can contact. We built the whole flow in three weeks as a team of two. I handled the code and the part that pulls the pricing data. It got third place and an award at the hackathon. It's not just making pretty AI pictures. It actually gets you to someone who can build the thing.

---

<p class="slide-ref">Deep dive · the problem</p>

# You pay before you can see your own yard

## Big money, no real picture

<div class="cards-2">
  <article>
    <h3>You commit first</h3>
    <p>A yard runs $5,000–$50,000, committed from drawings alone. First concepts cost $500–$2,000, and the final bill often lands 30–50% over plan.</p>
  </article>
  <article>
    <h3>Pictures don't close the gap</h3>
    <p>My teammate lived this — endless Pinterest boards, paid designer meetings, still couldn't picture the result. The gap isn't inspiration. It's seeing <em>your</em> yard changed.</p>
  </article>
</div>

Note: The real problem isn't that people don't have ideas. It's that they have to spend serious money before they can see what their actual yard will look like. My teammate went through it with his backyard. He paid for designer meetings and still couldn't picture the end result. There are tons of Pinterest images out there, but none of them are his yard. The gap is visualization, not inspiration. So the tool needs to show your real place changed, be honest about the costs, and get you all the way to someone who can actually build it.

---

<p class="slide-ref">Deep dive · the decision</p>

# We built for one kind of person

## Explorers, not buyers in a hurry

<div class="cards-2">
  <article>
    <h3>Explorers</h3>
    <p>They want options, fast, to see what's even possible. So: upload a photo in seconds, four styles shown as real photos, no jargon to learn.</p>
  </article>
  <article>
    <h3>Deciders</h3>
    <p>They want one exact plan with exact prices and plants. We couldn't do that in three weeks, so we said so instead of faking it.</p>
  </article>
</div>

<p class="slide-closing">Three weeks is short. Better to serve one group well than everyone a little.</p>

Note: We had to pick who we were building for. Some people just want to explore options fast. Others want one final plan with exact prices right away. We went with the explorers. We were upfront that we weren't solving the exact-quote problem in three weeks. Same thing later with the costs — we were clear about what the numbers actually were.

---

<p class="slide-ref">Deep dive · the insight</p>

## The constraint that saved the product: keep the house, change only the yard

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

Note: The thing that kills trust fast is when the AI picture changes your house or moves the fence. People look at it and know it's not their place. We made one strict rule: keep the house exactly as it is in the photo. Only change the yard stuff. That one decision drove everything — how we prompted the images, how we handled bad photos, even adding video walkthroughs so you could feel the scale. Without it, it's just a nice picture of some yard, not yours.

---

<p class="slide-ref">Deep dive · the product</p>

# The full flow

## From photo to a person who can build

<div class="steps-3">
  <article><span class="steps-3__num">1</span><div><h3>See the new yard</h3><p>Upload a photo, pick a style, and see your house unchanged with a brand-new yard.</p></div></article>
  <article><span class="steps-3__num">2</span><div><h3>See the cost</h3><p>Get an itemized material list with honest, directional prices — and we say they're directional.</p></div></article>
  <article><span class="steps-3__num">3</span><div><h3>See the plan and the builder</h3><p>Get a top-down plan and local contractors who can actually build it.</p></div></article>
</div>

Note: We didn't stop at generating pictures. The flow goes all the way through costs, a usable plan, and actual local contractors. That's what makes it feel like a real product instead of another AI demo. The pieces connect. That's the part I'm most proud of.

---

<p class="slide-ref">Deep dive · see it</p>

## Step 1: a deliberately simple start

<img class="slide-image" src="assets/images/autoscape/autoscape-07.png" alt="AutoScape upload step: drop a yard photo, choose location type and space size, three-step wizard">

<img class="slide-image" src="assets/images/autoscape/autoscape-01.png" alt="AutoScape hero / upload context">

Note: The input is super simple on purpose. One photo, plus the kind of place and rough size. That's it. We show styles with actual example photos instead of words people don't use. Normal homeowners don't talk about 'cottage style' — they see a picture and know if they like it. We kept the questions to a minimum so people actually get to see the result before they bounce.

---

<p class="slide-ref">Deep dive · see it</p>

## Show pictures, not words

<img class="slide-image" src="assets/images/autoscape/autoscape-08.png" alt="AutoScape style picker: Modern, Traditional, and Regional style families shown as example photographs">

<img class="slide-image" src="assets/images/autoscape/autoscape-02.png" alt="Additional style examples from the flow">

Note: No jargon for the styles. We just show real photos of what each one looks like. People don't use the landscape terms — they know what feels right when they see the picture. Same thinking as keeping the house the same: cut anything that makes it feel fake or generic.

---

<p class="slide-ref">Deep dive · see it</p>

## You have to see your real yard

<img class="slide-image" src="assets/images/autoscape/autoscape-11.png" alt="AutoScape redesign result: in-app before/after slider with 2D plan and video tabs">

<img class="slide-image" src="assets/images/autoscape/autoscape-03.png" alt="Additional result view">

<img class="slide-image" src="assets/images/autoscape/autoscape-05.png" alt="More result states">

Note: The before-and-after slider is key. A static picture is easy to dismiss as 'just some AI yard.' Dragging between your real photo and the new version makes it feel possible. We also added short videos so you can get a sense of the actual space and scale. Once that lands, people are ready to talk money.

---

<p class="slide-ref">Deep dive · cost it</p>

## Costing that feels usable instead of fake-precise

<img class="slide-image" src="assets/images/autoscape/estimate.png" alt="AutoScape estimate: itemized material list with quantities, costs, and a buy link per item">

<img class="slide-image" src="assets/images/autoscape/autoscape-09.png" alt="Cost view context">

Note: There is no real landscaping price API. We built a RAG pipeline over Freepik's asset library so the costs are pulled from actual product metadata rather than made up. The list is itemized, has quantities, directional prices, and per-item links. The design work was deciding what *not* to promise: clear disclaimers that these are directional, regional variation is real, and the numbers are a starting point for conversation with a contractor, not a quote. Honesty here is a product decision.

---

<p class="slide-ref">Deep dive · cost it</p>

## Honesty as interface, not disclaimer

<img class="slide-image" src="assets/images/autoscape/pie-chart.png" alt="AutoScape cost distribution donut chart with a disclaimer that estimates are directional">

<img class="slide-image" src="assets/images/autoscape/autoscape-10.png" alt="Cost honesty states">

Note: This is the part I would actually linger on in a real interview. When the data is a proxy (asset metadata, not live supplier pricing), the responsible design move is to make the uncertainty visible and usable. The pie chart and the line items carry the same message: these numbers are directional, they will move with region and season, talk to a human before you spend. We could have hidden the disclaimer in small text. We made it part of the experience so the trust earned in the visualization step wasn't immediately spent.

---

<p class="slide-ref">Deep dive · build it</p>

## The render has to become something buildable

<img class="slide-image" src="assets/images/autoscape/plan-2d.png" alt="2D top-down architectural landscape plan generated by AutoScape">

<img class="slide-image" src="assets/images/autoscape/autoscape-12.png" alt="Plan generation in context">

Note: A beautiful image is not a handoff. We generate a proper 2D top-down architectural plan with placement and scale so a landscaper can actually use it for installation. This is the step that turns an Explorer (playing with options) into someone who can move toward a real decision. It is also where a lot of the technical work lives — converting the 3D-ish generative output into clean 2D documentation.

---

<p class="slide-ref">Deep dive · build it</p>

## The loop closes on a person you can call

<img class="slide-image" src="assets/images/autoscape/autoscape-04.png" alt="AutoScape contractor matching: local landscape designers and contractors with ratings and contact">

<img class="slide-image" src="assets/images/autoscape/autoscape-13.png" alt="Contractor view">

<img class="slide-image" src="assets/images/autoscape/autoscape-14.png" alt="Final handoff states">

Note: The last screen shows location-matched contractors with the 2D plan attached. This is the part that makes the whole thing feel like a product instead of a demo. We got the user from "I have an idea" to "here is a plan and three people who can build it." Stopping before payment and fulfillment was honest about what three weeks and two people could actually close. The rest is partnerships, not missing features.

---

<p class="slide-ref">Deep dive · under the hood</p>

# The technical work existed to solve product problems

## RAG for trust, prompting for fidelity, boring stack for speed

<div class="cards-3">
  <article>
    <h3>RAG = the only honest proxy</h3>
    <p>No landscaping price API exists, so we indexed Freepik's real asset library into Qdrant. Costs come from product data, not hallucinated numbers.</p>
  </article>
  <article>
    <h3>Prompts = the fidelity constraint</h3>
    <p>Image models love to repaint the house. We engineered hard to keep the architecture intact and change only the yard.</p>
  </article>
  <article>
    <h3>Stack = what ships in three weeks</h3>
    <p>React, image-gen APIs, Qdrant + Freepik, Firebase. Deliberately boring so two people could own the whole loop.</p>
  </article>
</div>

Note: The RAG pipeline wasn't a cool tech choice. It was the only way to make "cost" feel like it belonged in the same product as the visualization. The prompt constraints weren't an implementation detail — they were the product requirement that the output had to feel like the user's actual yard or the trust would collapse. I owned the full stack because in three weeks there was no one else to hand anything to. The boring stack was a feature.

---

<p class="slide-ref">Reflections · 1 of 2</p>

# What I would do next time

<div class="cards-3">
  <article>
    <h3>Better prices</h3>
    <p>Prices are a guide today. A real version needs live supplier pricing, not asset metadata.</p>
  </article>
  <article>
    <h3>Serve the deciders too</h3>
    <p>We built for explorers. Next is the buyers who want an exact, ready-to-order plan.</p>
  </article>
  <article>
    <h3>Bring in builders earlier</h3>
    <p>We stopped before payment. Next time I'd line up contractors from week one.</p>
  </article>
</div>

Note: We knew exactly what we weren't going to finish in three weeks. The cost numbers are only as good as the data we had. We optimized for people exploring, not the ones ready to sign a contract right away. And we stopped before the actual money moved because that needed real business relationships. None of this was a surprise — naming the gaps is part of doing it properly. The next round would start talking to suppliers and contractors from day one.

---

<p class="slide-ref">Reflections · 2 of 2</p>

# The main lesson

> Three weeks is short, but you can go far if you stay on one thing. The hard part wasn't any single piece. It was making all the pieces feel like one product.

<p class="slide-closing">People don't care about the retrieval pipeline or the prompt rules. They care whether a photo can become a person who'll build their yard — and whether they can trust every step.</p>

Note: We went from a photo all the way to a builder you could call. The technical bits were interesting, but the hardest part was making the whole thing feel connected instead of separate demos. People don't care about the search or the prompting. They care whether they can go from a picture of their yard to someone who can actually build it, without losing trust along the way. That's the bar I hold everything to now.

---

# Thank you

## Rae Jin · Product Engineer

[dalrae.jin.work@gmail.com](mailto:dalrae.jin.work@gmail.com)  
[raejin.web.app](https://raejin.web.app) · [github.com/jin-dalrae](https://github.com/jin-dalrae)

Note: Thank you. Happy to go deep on anything — the scoping call, the fidelity constraint, the RAG as product work, the Explorers-versus-Deciders call, or what the next phase would actually require. What's on your mind?
