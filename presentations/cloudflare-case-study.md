# Case Study for Cloudflare

## Product Engineer · portfolio review

<p class="deck-subtitle">Some of my work. One big example.</p>

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
    <p>Math helped me understand systems. Sociology helped me remember the people in the systems.</p>
  </article>
  <article>
    <h3>8 years in banks</h3>
    <p>I made AI tools for big banks in Korea. The work was hard. Mistakes cost a lot.</p>
  </article>
</div>

Note: My background isn't a straight line, and that's the point. I studied mathematics and sociology — one taught me to model systems, the other taught me to never forget the human inside the system. I spent eight years as a consultant building AI and data products for the biggest financial institutions in Korea — LLM rollouts, fraud models, recommendation engines — shipping into messy, high-stakes, regulated environments. Now I'm finishing an MDes in interaction design. So I show up as someone who can hold the backend logic and the front-end craft in the same head. That combination is the whole story of how I work.

---

<p class="slide-ref">Introduction · 2 of 3</p>

# What the work taught me

<div class="cards-3">
  <article>
    <h3>Trust is everything</h3>
    <p>In banks I learned the interface has to carry the weight of the model. If the user can't see why a number is there the whole thing falls apart.</p>
  </article>
  <article>
    <h3>One strong idea beats a bunch of half ones</h3>
    <p>I did fifteen plus small projects. The ones that worked had one clear thing. Not lots of features thrown together.</p>
  </article>
  <article>
    <h3>The hard part is the choices</h3>
    <p>Two patents on turning financial data into images a model could read. The hard part wasn't the model. It was deciding what to keep and what to change.</p>
  </article>
</div>

Note: I don't collect wins. I look for hard problems and try to solve them in a clean way. This comes from doing the work. In banks I saw what happens when trust breaks. With the small projects I learned that one strong idea beats a bunch of half done ones. The patents showed me that the real work is deciding what to keep and what to throw away.

---

<p class="slide-ref">Introduction · 3 of 3</p>

# How I work

<div class="cards-3">
  <article>
    <h3>I build in code</h3>
    <p>i don't just draw. i make real things with code. we talk about how it feels to use not just how it looks.</p>
  </article>
  <article>
    <h3>i choose what not to do</h3>
    <p>i say no to some ideas. i pick one group of people to help first. it is better to do one thing well.</p>
  </article>
  <article>
    <h3>things must fit together</h3>
    <p>many small parts are easy. making them feel like one thing is hard. that is the important work.</p>
  </article>
</div>

Note: you'll see this in autoscape. we chose one kind of user. we were honest about the costs. we made sure the picture turned into a plan a builder could use. the rest is details.

---

<p class="slide-ref">The landscape · 1 of 2</p>

# My other projects

## A few examples

<div class="cards-4">
  <article>
    <h3>Cosmos</h3>
    <p>A 3D way to look at talks online. Not a list. A space you move in. Made alone for a hackathon.</p>
  </article>
  <article>
    <h3>PeriCare</h3>
    <p>A tool on the phone for women in perimenopause. It works on the phone only. No data leaves. I made most of it alone.</p>
  </article>
  <article>
    <h3>Cardinal</h3>
    <p>A tool to watch AI agents that spend company money. Rules and spending in one view.</p>
  </article>
  <article>
    <h3>This tool</h3>
    <p>The slides you see now. I made it with Cloudflare Workers. It is real. I use it.</p>
  </article>
</div>

Note: The projects look different but the idea is the same — take something complicated and make it easier to actually use. This slide thing is built on Cloudflare Workers. I've been using their stuff already. I'll show two quick ones, then the main example.

---

<p class="slide-ref">The landscape · 2 of 2</p>

# Two quick looks

<div class="media-split">
  <div>
    <h3>Cosmos</h3>
    <p>Online talks are not flat lists. They have shape. I made a 3D ball you can look at. Made alone.</p>
  </div>
  <img src="assets/images/cosmos-sphere-browse.png" alt="Cosmos spatial discourse browser rendering a conversation as a 3D sphere">
</div>

Note: First one is Cosmos. Online discussions are a mess in a normal feed. I made a 3D space you can actually move through so you can see how the conversation connects. Did it solo for a hackathon.

---

<div class="media-split">
  <div>
    <h3>PeriCare</h3>
    <p>A phone tool for perimenopause. It shows two cycles. It runs only on the phone. Private. I made almost all of it alone.</p>
  </div>
  <img src="assets/images/pericare-hero.jpg" alt="PeriCare iOS app — a private on-device digital twin for perimenopause">
</div>

Note: Second is PeriCare. It's for perimenopause — real problem my mom went through. I made it private by default, everything runs on the phone. No data going anywhere. I built almost all of it alone. The actual biology and privacy needs decided how the whole thing was built. Okay, now the main one.

---

<p class="slide-ref">Deep dive</p>

# AutoScape

## One photo to a real plan

<div class="metric-strip">
  <article><strong>3 weeks</strong><span>Two people. I did the code and the data part.</span></article>
  <article><strong>3rd place + award</strong><span>A hackathon with Qdrant, Freepik and DeepMind.</span></article>
  <article><strong>Photo to builder</strong><span>See the yard. See the cost. See the plan. Talk to a person.</span></article>
</div>

Note: This is the main one — AutoScape. You upload one photo of your yard, choose a style, and it gives you pictures of what it could look like, plus a list of materials with real-ish prices, a top-down plan, and actual local contractors you can contact. We built the whole flow in three weeks as a team of two. I handled the code and the part that pulls the pricing data. It got third place and an award at the hackathon. It's not just making pretty AI pictures. It actually gets you to someone who can build the thing.

---

<p class="slide-ref">Deep dive · the problem</p>

# The problem is you cannot see the yard before you pay

## Big money with no picture

<div class="cards-2">
  <article>
    <h3>You pay first</h3>
    <p>People spend 5,000 to 50,000 dollars on a yard. They do this from drawings or words. They often pay 500 to 2,000 dollars just to see first ideas. The final cost is often 30 to 50 percent more than planned. Prices change with the season and the place.</p>
  </article>
  <article>
    <h3>Pictures do not help enough</h3>
    <p>My friend had this problem with his own yard. He looked at many pictures. He paid for talks with designers. The result was not what he thought. He still did not know what the yard would really look like. The problem is not a lack of pictures. The problem is you cannot see your own yard changed before you spend the money.</p>
  </article>
</div>

Note: The real problem isn't that people don't have ideas. It's that they have to spend serious money before they can see what their actual yard will look like. My teammate went through it with his backyard. He paid for designer meetings and still couldn't picture the end result. There are tons of Pinterest images out there, but none of them are his yard. The gap is visualization, not inspiration. So the tool needs to show your real place changed, be honest about the costs, and get you all the way to someone who can actually build it.

---

<p class="slide-ref">Deep dive · the decision</p>

# We picked one kind of person

## People who want to look, not people who want to buy right now

<div class="cards-2">
  <article>
    <h3>People who look first</h3>
    <p>They want many ideas fast. They want to see what is possible. We made it fast to upload a photo. We showed four styles with real example photos. No hard words. Easy to try.</p>
  </article>
  <article>
    <h3>People who want to buy now</h3>
    <p>They want one exact plan with exact prices and exact plants. We could not do that in three weeks. We said this clearly. We did not pretend we could do everything.</p>
  </article>
</div>

<p class="slide-closing">Three weeks is short. It is better to help one group well than to help everyone a little.</p>

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
  <article><span class="steps-3__num">1</span><div><h3>See the new yard</h3><p>Upload a photo. Pick a style. See pictures that keep your house the same.</p></div></article>
  <article><span class="steps-3__num">2</span><div><h3>See the cost</h3><p>Get a list of things to buy. The prices are real but not exact. We say this clearly.</p></div></article>
  <article><span class="steps-3__num">3</span><div><h3>See the plan and the builder</h3><p>Get a top view plan. Get names of people near you who can do the work.</p></div></article>
</div>

Note: We didn't stop at generating pictures. The flow goes all the way through costs, a usable plan, and actual local contractors. That's what makes it feel like a real product instead of another AI demo. The pieces connect. That's the part I'm most proud of.

---

<p class="slide-ref">Deep dive · see it</p>

## Step 1 — very simple start

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

## You must see your real yard

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
    <h3>RAG = the only honest proxy we had</h3>
    <p>No landscaping price API exists. We indexed Freepik's real asset library (plants, materials, furniture) into Qdrant so costs came from actual product data with metadata, not hallucinated numbers.</p>
  </article>
  <article>
    <h3>Prompts = the fidelity constraint</h3>
    <p>General image models will happily repaint the house or move the fence. We engineered hard to keep the photographed architecture intact and only transform vegetation and hardscape. Preprocessing for low light and bad angles was part of the same decision.</p>
  </article>
  <article>
    <h3>Stack = what actually ships in three weeks</h3>
    <p>React + Vite + Tailwind, image gen APIs, Qdrant + Freepik for retrieval, Firebase. Deliberately unsexy so the team of two could own the whole loop instead of fighting infrastructure.</p>
  </article>
</div>

Note: The RAG pipeline wasn't a cool tech choice. It was the only way to make "cost" feel like it belonged in the same product as the visualization. The prompt constraints weren't an implementation detail — they were the product requirement that the output had to feel like the user's actual yard or the trust would collapse. I owned the full stack because in three weeks there was no one else to hand anything to. The boring stack was a feature.

---

<p class="slide-ref">Reflections · 1 of 2</p>

# What I would do next time

<div class="cards-3">
  <article>
    <h3>Better prices</h3>
    <p>The prices are only a guide. A real version would need live prices from stores.</p>
  </article>
  <article>
    <h3>Help the other group too</h3>
    <p>We helped people who want to look. Later we can help people who want to buy right away with exact plans.</p>
  </article>
  <article>
    <h3>Find builders earlier</h3>
    <p>We stopped before payment. Next time I would talk to builders from the first week.</p>
  </article>
</div>

Note: We knew exactly what we weren't going to finish in three weeks. The cost numbers are only as good as the data we had. We optimized for people exploring, not the ones ready to sign a contract right away. And we stopped before the actual money moved because that needed real business relationships. None of this was a surprise — naming the gaps is part of doing it properly. The next round would start talking to suppliers and contractors from day one.

---

<p class="slide-ref">Reflections · 2 of 2</p>

# The main lesson

> Three weeks is short. But you can go far if you stay on one thing. The hard part was not one piece. It was making all the pieces feel like one thing.

<p class="slide-closing">People do not care about the smart search or the picture rules. They care if they can go from a photo to a person who can build the yard. And they must trust every step.</p>

Note: We went from a photo all the way to a builder you could call. The technical bits were interesting, but the hardest part was making the whole thing feel connected instead of separate demos. People don't care about the search or the prompting. They care whether they can go from a picture of their yard to someone who can actually build it, without losing trust along the way. That's the bar I hold everything to now.

---

<p class="slide-ref">Close</p>

# Why Cloudflare

## This is the kind of work I like

<div class="cards-3">
  <article>
    <h3>I take one idea to the end</h3>
    <p>I start with a real problem. I finish with something a real person can use. In three weeks we went from a photo to a builder you can call.</p>
  </article>
  <article>
    <h3>I say what I do and what I do not do</h3>
    <p>We helped one group of people. We said we did not help the other group. We showed that the prices are only a guide. This is honest work.</p>
  </article>
  <article>
    <h3>I already use your tools</h3>
    <p>This slide tool runs on Cloudflare. The pictures and the data too. I am not new here. I want to do this kind of work with your team.</p>
  </article>
</div>

Note: This is the kind of work I like — I take something from a real problem I see to something that actually works in the world. I try to be upfront about what we didn't solve yet. And I'm already shipping on Cloudflare Workers — this whole deck runs on it. I'd like to do more of this kind of thing on the team.

---

# Thank you

## Rae Jin · Product Engineer

dalrae.jin.work@gmail.com  
raejin.web.app · github.com/jin-dalrae

Note: Thank you. Happy to go deep on anything — the scoping call, the fidelity constraint, the RAG as product work, the Explorers-versus-Deciders call, or what the next phase would actually require. What's on your mind?
