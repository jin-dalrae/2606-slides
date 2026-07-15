# Rae Jin

## Product Engineer · portfolio review

<p class="deck-subtitle">Systems thinking meets human-centered design</p>

Rae Jin  
June 9, 2026  
CCA MDes · Leadership by Design

Note: Hi, I'm Rae, a Product Engineer. I approach design with a heavy foundation in systems thinking and human-centered design — a perspective shaped by my academic background in mathematics, sociology, and human-computer interaction. Before pivoting into this space, I spent eight years as an IT consultant, notably at PwC, where I engineered AI/ML pipelines, optimized SQL databases, and shaped digital product strategies. Today I'll introduce myself briefly, then walk through two of my primary products end to end.

---

<p class="slide-ref">Who I am</p>

# I build systems, for people

## The two halves of how I think

<div class="cards-2">
  <article>
    <h3>Systems thinking</h3>
    <p>Mathematics and eight years of engineering taught me to model a problem as inputs, state, feedback, and control — before I touch the interface.</p>
  </article>
  <article>
    <h3>Human-centered design</h3>
    <p>Sociology and HCI taught me to never forget the person inside the system — the one who has to trust the output and act on it.</p>
  </article>
</div>

Note: My way of working sits at the intersection of two disciplines. From mathematics and engineering I learned to model any problem as a system — inputs, state, feedback, and control. From sociology and HCI I learned to keep the human at the center, because a system is only useful if a real person trusts it and acts on it. Both products today come straight out of that combination.

---

<p class="slide-ref">Background</p>

# Eight years shipping AI in high-stakes settings

## IT consultant, notably at PwC

<div class="cards-3">
  <article>
    <h3>AI/ML pipelines</h3>
    <p>Engineered production machine-learning pipelines for large enterprises where mistakes were expensive and visible.</p>
  </article>
  <article>
    <h3>Data engineering</h3>
    <p>Optimized SQL databases and data layers so the models had something trustworthy to stand on.</p>
  </article>
  <article>
    <h3>Product strategy</h3>
    <p>Shaped digital product strategy — translating messy business needs into systems people could actually use.</p>
  </article>
</div>

Note: Before design school I spent eight years as an IT consultant, notably at PwC. I engineered AI/ML pipelines, optimized SQL databases, and shaped digital product strategies. That work happened in regulated, high-stakes environments, which is where I learned that trust is the real product — the interface has to carry the weight of the model.

---

<p class="slide-ref">How I work</p>

# I treat software as an iterative canvas

## Build fast, then return to scale

<div class="metric-strip">
  <article><strong>18+</strong><span>Live MVPs built across San Francisco hackathons</span></article>
  <article><strong>48 hrs</strong><span>Typical first build — a working product, not a mockup</span></article>
  <article><strong>Weeks later</strong><span>I return to scale the backend, data layers, and interface</span></article>
</div>

Note: My portfolio looks a bit different because I treat software development as an active, iterative canvas. I have built over 18 live MVPs across various hackathons in San Francisco. I build fast, usually within 48 hours, but I continuously return to my codebase weeks and months later to scale the backend, optimize data layers, and refine the interface. Today, I'm excited to walk you through two of those products in depth.

---

<p class="slide-ref">Today</p>

# Two products, end to end

<div class="cards-2">
  <article>
    <h3>PeriCare</h3>
    <p>An AI-native iOS and Apple Watch companion for perimenopause — a personal digital twin that runs entirely on-device.</p>
  </article>
  <article>
    <h3>AutoScape</h3>
    <p>An award-winning outdoor-design app that turns one backyard photo into a render, a buildable plan, and an itemized budget.</p>
  </article>
</div>

Note: I'll go deep on two products. First, PeriCare — a private, on-device companion for perimenopause built on a systems model of the body. Second, AutoScape — a generative design tool that collapses a multi-week, multi-thousand-dollar process into under a minute. Both start from a real human problem and end with something a person can trust and act on.

---

<p class="slide-ref">Case study 1</p>

# PeriCare

## AI-native support for perimenopause

<img class="slide-image" src="assets/images/pericare/hero.webp" alt="PeriCare — AI-native support for perimenopause">

Note: My first product is PeriCare, a native iOS and Apple Watch companion app built in Swift and Xcode, designed to provide AI-native support for women navigating perimenopause.

---

<p class="slide-ref">PeriCare · overview</p>

# A predictive ecosystem on HealthKit

<div class="media-split">
  <div>
    <p>Native iOS and Apple Watch, built in Swift and Xcode. PeriCare builds an intelligent, predictive ecosystem on top of a user's own HealthKit data.</p>
    <p><strong>The shift is happening now:</strong> days ago at WWDC 2026, Apple announced native perimenopause tracking in its Health app. Midlife hormonal health is moving to the center, culturally and commercially.</p>
  </div>
  <img src="assets/images/pericare/pericare-04.webp" alt="PeriCare Digital Twin — a body map of five symptom groups watched together">
</div>

Note: PeriCare is a native iOS and Apple Watch companion app built utilizing Swift and Xcode. Culturally and commercially, we are seeing a massive shift toward midlife hormonal health. Even Apple, just days ago at WWDC 2026, announced native perimenopause tracking for its core Health app. My goal with PeriCare was to build an intelligent, predictive ecosystem on top of HealthKit data.

---

<p class="slide-ref">PeriCare · the problem</p>

# Perimenopause breaks the body's regulatory loops

## When the usual feedback stops working

<div class="cards-2">
  <article>
    <h3>The physiology</h3>
    <p>Under severe hormonal fluctuation, the body's normal behavior-state actuators — sleep, rest, movement — no longer reliably balance mood and physical symptoms.</p>
  </article>
  <article>
    <h3>The lived experience</h3>
    <p>Years of quiet rewiring: 3am wake-ups, cycles that won't pick a length, moods that arrive uninvited, words you can't quite find.</p>
  </article>
</div>

Note: From a physiological perspective, perimenopause breaks down the body's natural regulatory loops. When a woman undergoes severe hormonal fluctuations, her traditional behavior-state actuators — like sleep or resting patterns — no longer balance her mood or physical symptoms effectively. This creates a challenging, unpredictable transition. As a systems person, I saw a control loop that had lost its feedback.

---

<p class="slide-ref">PeriCare · the market</p>

# A massive, underserved transition

<div class="metric-strip">
  <article><strong>1.1B</strong><span>Women in peri- or post-menopause globally by 2030</span></article>
  <article><strong>75%</strong><span>Experience at least one symptom affecting daily life</span></article>
  <article><strong>~32M</strong><span>US women aged 40–55 today</span></article>
</div>

Note: This is not a niche. By 2030, roughly 1.1 billion women will be in peri- or post-menopause globally. About 75% experience at least one symptom that affects daily life, and a quarter experience severe symptoms. In the US alone there are around 32 million women aged 40 to 55. It's a massive population going through a transition the market barely serves.

---

<p class="slide-ref">PeriCare · the gap</p>

# The tools fail exactly when they're needed

<div class="cards-3">
  <article>
    <h3>Misdiagnosis is common</h3>
    <p>73% of US women report not being told what to expect; 56% have been misdiagnosed.</p>
  </article>
  <article>
    <h3>Period trackers break</h3>
    <p>Apps like Clue and Flo assume a predictable cycle — but perimenopausal cycles swing 24 to 48 days.</p>
  </article>
  <article>
    <h3>Nobody models the loop</h3>
    <p>Existing tools track the hormonal cycle <em>or</em> physiology — never the feedback between mood, sleep, and symptoms.</p>
  </article>
</div>

Note: And the existing tools fail exactly when they're needed most. 73% of women report not being told what to expect, and 56% have been misdiagnosed. Standard period trackers break because they assume a predictable cycle length, while perimenopausal cycles swing wildly. And critically, no existing product models both the hormonal cycle and the self-reinforcing loop between mood, sleep, and symptoms. That gap is the opening.

---

<p class="slide-ref">PeriCare · research</p>

# From one interview to a digital twin

<div class="media-split">
  <div>
    <p>I interviewed a user living with severe perimenopausal depression. Her doctor prescribed hormonal treatment — but subtle side effects, like localized swelling, went untracked, leaving her unsure whether she needed clinical intervention.</p>
    <p>That uncertainty was the real pain: not a lack of data, but no way to connect a treatment to its effect on her body.</p>
  </div>
  <img src="assets/images/pericare/pericare-02.webp" alt="PeriCare onboarding — a few optional fields, nothing leaves the phone">
</div>

Note: To understand this deeply, I conducted extensive interviews with a user who had been experiencing severe perimenopausal depression. She shared a crucial pain point: her doctor prescribed hormonal treatments, but minor, subtle side effects like localized body swelling went untracked, leaving her uncertain whether she needed a clinical intervention. That uncertainty — not a lack of effort or data — was the real problem. It inspired the entire product architecture.

---

<p class="slide-ref">PeriCare · architecture</p>

# I modeled the body as a control loop

<div class="media-split">
  <div>
    <p>PeriCare maps a user's unique symptoms into a personal <strong>digital twin</strong>. Continuous Apple Watch biometrics are the sensors; hormonal change is the disturbance; mood and energy are the variable being regulated.</p>
    <p>An on-device agent acts as the comparator — reading the gap between where she is and where she wants to be, then driving behavioral or medical advice.</p>
  </div>
  <img src="assets/images/pericare/pericare-system-2.webp" alt="Hand-drawn control-loop architecture: Apple Watch and iPhone sensors, hormonal disturbance, a mood/energy variable, a comparator against goals, and advice actuators with medical escalation">
</div>

Note: This is the systems thinking made literal. I modeled the body as a control loop. The Apple Watch is the sensor — temperature, HRV, resting heart rate, fitness. Hormonal change is the disturbance. Mood and energy are the variable we're trying to regulate. An on-device agent is the comparator, reading the gap between her current state and her goal, then acting through two actuators: behavioral advice first, and an escalation path that checks whether things are improving and, if not, flags medical intervention.

---

<p class="slide-ref">PeriCare · the model</p>

# A two-cycle model nobody else builds

<div class="cards-2">
  <article>
    <h3>The hormonal cycle</h3>
    <p>A STRAW+10-aligned phase estimator tells her where she is despite irregularity — refined by an on-device classifier that reads symptom context.</p>
  </article>
  <article>
    <h3>The feedback loop</h3>
    <p>The self-reinforcing loop between mood, sleep, and symptoms — read together, not in isolation, so an intervention's effect is visible.</p>
  </article>
</div>

Note: At the core are two cycles. The first is the irregular hormonal cycle — I use a STRAW+10-aligned phase estimator, refined by an on-device classifier that reads her symptom context, to tell her where she is even when the length keeps changing. The second is the feedback loop between mood, sleep, and symptoms. Modeling both, together, is what makes this a digital twin rather than another tracker.

---

<p class="slide-ref">PeriCare · the model</p>

# Judged against her own baseline

<div class="media-split">
  <div>
    <p>A personal-baseline radar across five axes — Mood, Energy, Sleep, Autonomic, Movement — normalized to her own 14- and 28-day baselines, not population averages.</p>
    <p>An HRV of 42ms is only "low" if it's low <em>for her</em>. That one decision makes the signal honest.</p>
  </div>
  <img src="assets/images/pericare/pericare-08.webp" alt="PeriCare insights — personal-baseline radar plus cluster trends for hot flashes, sleep, mood, body aches, and brain fog">
</div>

Note: Every reading is interpreted against her own baseline, not a population goal. The radar has five axes — mood, energy, sleep, autonomic, and movement — each normalized to her own 14- and 28-day baselines. An HRV of 42 milliseconds is only bad if it's bad for her. It's a small feature with a huge felt difference: it makes the whole system honest instead of judgmental.

---

<p class="slide-ref">PeriCare · the model</p>

# Advice it can defend

<div class="media-split">
  <div>
    <p>A curated, evidence-tagged intervention library of 22 options across movement, sleep, CBT, and nutrition. Each is tagged to NAMS, SWAN, or peer-reviewed RCTs.</p>
    <p><strong>The agent picks from the library — it never invents.</strong> Every suggestion is traceable, and the set narrows with her thumbs-up and thumbs-down.</p>
  </div>
  <img src="assets/images/pericare/pericare-06.webp" alt="PeriCare today tab — best moves for today, drawn from an evidence-tagged library">
</div>

Note: The advice is not generated from thin air. There's a curated library of 22 interventions across movement, sleep, CBT, and nutrition, each tagged to NAMS, SWAN, or peer-reviewed RCTs. The on-device agent selects from that library — it never invents a recommendation. So every suggestion is traceable back to evidence, and the library narrows to what works for her through simple thumbs-up, thumbs-down feedback.

---

<p class="slide-ref">PeriCare · the interface</p>

# The journey: onboarding

<img class="slide-image" src="assets/images/pericare/pericare-01.webp" alt="PeriCare onboarding — perimenopause is years of quiet rewiring; private, on your device, no accounts">

<img class="slide-image" src="assets/images/pericare/pericare-02.webp" alt="PeriCare onboarding — a few optional fields, nothing leaves the phone">

<img class="slide-image" src="assets/images/pericare/pericare-12.webp" alt="PeriCare onboarding — one gentle daily nudge, a single daily check-in">

Note: Here's the native iOS journey. Onboarding is deliberately gentle and private — it names the experience honestly, asks only a few optional fields, and sets up a single daily nudge. The message from the first screen is that nothing leaves the phone and there are no accounts.

---

<p class="slide-ref">PeriCare · the interface</p>

# A fifteen-second daily loop

<img class="slide-image" src="assets/images/pericare/pericare-14.webp" alt="PeriCare today tab — a single on-device suggestion framed by cycle phase, plus today's body signals">

<img class="slide-image" src="assets/images/pericare/pericare-15.webp" alt="PeriCare log — a quick mood scale, common symptoms, optional period, and a note">

Note: The daily loop is intentionally light. The Today tab gives her where she is in the cycle, a single suggested move for the day, and her body signals at a glance. Logging is a fifteen-second interaction — a mood scale, a few common symptoms, an optional period entry. Low friction is the point: a tool she'll actually open every day.

---

<p class="slide-ref">PeriCare · the digital twin</p>

# The digital twin, made visible

<div class="media-split">
  <div>
    <p>Five symptom groups, watched together. The twin frames her perimenopause as a control loop: <strong>goal → state → action → feedback</strong>.</p>
    <p>It surfaces what's in effect now, what the loop is trying to land, and how she's actually feeling against her baseline.</p>
  </div>
  <img src="assets/images/pericare/pericare-05.webp" alt="PeriCare digital twin detail — goal, current state, recommended moves, and feedback, with the active phase and medication">
</div>

Note: The Digital Twin tab is where the model becomes something she can see. It shows five symptom groups watched together, and it frames everything as a loop: the goal she set, her current state, the recommended action, and the feedback. It tells her what's in effect right now — her phase, her medication — what the loop is trying to land, like steady mood, and how she's actually feeling relative to her own baseline.

---

<p class="slide-ref">PeriCare · cycle intelligence</p>

# It learns what moves with what

<div class="media-split">
  <div>
    <p>Over time the twin surfaces real correlations: how her cycle length is changing, how a medication shifted her symptoms, and which signals move together.</p>
    <p>Cycles shortening by ~19 days across the last four — a classic early-transition pattern — becomes something she can see and bring to a doctor.</p>
  </div>
  <img src="assets/images/pericare/pericare-07.webp" alt="PeriCare cycle intelligence — check-ins, a medication-effect analysis, and a baseline radar">
</div>

Note: As she logs, the twin starts surfacing patterns she could never hold in her head. How her cycle length is changing — shortening cycles are one of the most common early signs of perimenopause. How a specific medication, like magnesium glycinate, shifted her symptoms over the following weeks. Which signals move together. This is the cycle intelligence that turns raw logs into something actionable.

---

<p class="slide-ref">PeriCare · the report</p>

# A weekly synthesis, and a bridge to her doctor

<div class="media-split">
  <div>
    <p>On-device Apple Foundation Models synthesize the week into 2–4 findings and one focus for next week — with clinical red-flag detection when symptoms trend wrong for several weeks.</p>
    <p>A one-tap <strong>doctor-ready PDF</strong> turns the personal record into a clinical conversation — a bridge to care, not a substitute for it.</p>
  </div>
  <img src="assets/images/pericare/pericare-10.webp" alt="PeriCare weekly AI report — findings, a focus for next week, a clinician flag, and a doctor-ready PDF export">
</div>

Note: Once a week, an on-device model synthesizes everything into a short, structured report — two to four findings, a single focus for the next week, and a red-flag check that suggests seeing a clinician if hot flashes, sleep, and mood all trend the wrong way for several weeks. And she can export a doctor-ready one-page PDF: her staging, cycle context, vital changes, and active medications. It's explicitly a bridge to a clinical visit, not a replacement for one.

---

<p class="slide-ref">PeriCare · privacy</p>

# Privacy is the foundational constraint

## The entire AI engine runs on-device

<div class="cards-2">
  <article>
    <h3>Nothing leaves the phone</h3>
    <p>No health metrics are transmitted to any external server. No cloud account, no logs, no aggregates ever leave the device.</p>
  </article>
  <article>
    <h3>On-device intelligence</h3>
    <p>The natural-language engine runs locally on Apple Foundation Models, so her health journey stays entirely private and under her control.</p>
  </article>
</div>

Note: Because we are dealing with deeply sensitive medical and biometric data, data privacy was our foundational constraint, not a feature added later. PeriCare does not transmit health metrics to any external server. The entire natural-language engine runs locally on-device using Apple's on-device models. No cloud account, no logs, nothing leaves the phone. That is what gives a user the confidence to engage with the app every single day.

---

<p class="slide-ref">PeriCare · the stack</p>

# Built to keep everything local

<div class="cards-3">
  <article>
    <h3>Client</h3>
    <p>SwiftUI + SwiftData, iOS 26, Swift 6. 100% local storage, no cloud account.</p>
  </article>
  <article>
    <h3>On-device AI</h3>
    <p>Apple Foundation Models for phase classification and weekly synthesis — running entirely on the phone.</p>
  </article>
  <article>
    <h3>HealthKit</h3>
    <p>Live ingestion of resting HR, HRV, steps, active energy, sleep, and mindful sessions.</p>
  </article>
</div>

Note: The stack exists to serve that privacy constraint. The client is SwiftUI and SwiftData on iOS 26, with one hundred percent local storage. The intelligence is Apple Foundation Models running on-device for phase classification and the weekly synthesis. And it ingests live HealthKit signals — resting heart rate, HRV, steps, active energy, sleep, mindful sessions. Apple's on-device models, new as of iOS 26, are what made this viable for the first time.

---

<p class="slide-ref">PeriCare · status</p>

# Shipped, not slideware

<div class="metric-strip">
  <article><strong>8 of 9</strong><span>Build phases shipped — logging, HealthKit, agents, twin</span></article>
  <article><strong>On-device</strong><span>Weekly AI report and phase classification running live</span></article>
  <article><strong>H2 2027</strong><span>Final phase: clinical pilots and automatic scheduling</span></article>
</div>

Note: This is shipped, not a concept. Eight of nine planned phases are complete — the daily logging loop, HealthKit integration, the charts, the on-device agents, onboarding, the weekly report, and the full Digital Twin with cycle intelligence. The last phase, planned for the second half of 2027, is clinical pilots and automatic report scheduling.

---

<p class="slide-ref">PeriCare · the business</p>

# A clear path to revenue

<div class="cards-3">
  <article>
    <h3>Free</h3>
    <p>The full daily loop — Today, Log, Insights, and the on-device advisor.</p>
  </article>
  <article>
    <h3>PeriCare+ · ~$10/mo</h3>
    <p>Weekly report, PDF export, extended history, and deeper analytics.</p>
  </article>
  <article>
    <h3>B2B2C</h3>
    <p>Menopause clinics and employer benefits providers issue codes to patients.</p>
  </article>
</div>

Note: The business model is freemium with a B2B2C path. The full daily loop is free. PeriCare+, around ten dollars a month, adds the weekly report, PDF export, extended history, and deeper analytics. And longer term, menopause clinics and employer benefits providers can issue codes to their patients — PeriCare owns the daily, between-visits layer that telehealth competitors don't.

---

<p class="slide-ref">PeriCare · the moat</p>

# Why this is hard to copy

<div class="cards-2">
  <article>
    <h3>The two-cycle twin</h3>
    <p>Nobody else models the feedback loop — most tools track one cycle and stop.</p>
  </article>
  <article>
    <h3>On-device by default</h3>
    <p>Privacy-by-default is exactly what enterprise health and insurance gate on — and it's hard to retrofit.</p>
  </article>
</div>

Note: The moat is real. The two-cycle digital twin is something no one else builds. The on-device agent makes privacy a default, which is precisely what enterprise health and insurance partners require and what's hard to bolt on after the fact. Add the evidence-tagged library and personal-baseline interpretation, and you have a product that's defensible on both trust and depth.

---

<p class="slide-ref">Case study 2</p>

# AutoScape

## One photo to a buildable plan

<div class="before-after">
  <figure>
    <img src="assets/images/autoscape/hero-before.webp" alt="A bare, unpolished backyard — the homeowner's own photo">
    <figcaption>Before — a single uploaded photo</figcaption>
  </figure>
  <figure>
    <img src="assets/images/autoscape/hero-after.webp" alt="The same backyard, fully redesigned with planting and hardscape">
    <figcaption class="after">After — generated in under a minute</figcaption>
  </figure>
</div>

Note: My second project is AutoScape, an intelligent outdoor design application that won an award from Google DeepMind at a recent hackathon. AutoScape completely re-imagines how homeowners conceptualize and execute residential backyard renovations. A homeowner uploads a single photo of an empty or unpolished backyard, and in under a minute gets back a complete design package.

---

<p class="slide-ref">AutoScape · recognition</p>

# 3rd place + the Nano Banana Award

<div class="metric-strip">
  <article><strong>3 weeks</strong><span>From idea to a working end-to-end product</span></article>
  <article><strong>Team of 2</strong><span>I owned the full stack and the RAG cost pipeline</span></article>
  <article><strong>DeepMind</strong><span>Sketch &amp; Search Hackathon — Qdrant, Freepik, Google DeepMind</span></article>
</div>

Note: AutoScape was built in three weeks by a team of two at the Sketch and Search Hackathon, run with Qdrant, Freepik, and Google DeepMind. It took third place and the Nano Banana Award. I owned the full stack and the retrieval pipeline behind the cost engine.

---

<p class="slide-ref">AutoScape · the market</p>

# A huge, fragmented, analog market

<div class="metric-strip">
  <article><strong>$189B</strong><span>US landscaping services market</span></article>
  <article><strong>693K</strong><span>Businesses — deeply fragmented</span></article>
  <article><strong>65%</strong><span>Of homeowners who want to improve never start</span></article>
</div>

Note: The market is huge and fragmented. US landscaping is a 189 billion dollar services market spread across nearly 700,000 businesses. And the headline number that defines the opportunity: 65% of homeowners who want to improve their landscape never start. The demand is there; the process is what's broken.

---

<p class="slide-ref">AutoScape · the problem</p>

# The process prices people out

<div class="cards-3">
  <article>
    <h3>Expensive</h3>
    <p>Landscape architects charge $2,000 to $10,000+ per design, pricing out most homeowners before they begin.</p>
  </article>
  <article>
    <h3>Slow and blind</h3>
    <p>Two to six weeks to a first concept, delivered as flat CAD or sketches you can't really picture.</p>
  </article>
  <article>
    <h3>Cost overruns</h3>
    <p>Estimates are opaque or nonexistent, and 30–50% budget overruns are common.</p>
  </article>
</div>

Note: Why don't they start? The process prices them out and keeps them in the dark. A professional design runs two to ten thousand dollars and takes two to six weeks, and it comes back as a flat drawing they can't really visualize. Costs are opaque, and overruns of thirty to fifty percent are normal. It's expensive, slow, and risky — so people just freeze.

---

<p class="slide-ref">AutoScape · the solution</p>

# Collapse the whole workflow

<div class="steps-3">
  <article><span class="steps-3__num">1</span><div><h3>See it</h3><p>Upload a photo, pick a style, get a photorealistic render — in seconds.</p></div></article>
  <article><span class="steps-3__num">2</span><div><h3>Cost it</h3><p>An itemized, RAG-powered budget of materials, plants, and labor.</p></div></article>
  <article><span class="steps-3__num">3</span><div><h3>Build it</h3><p>A top-down 2D plan, a video walkthrough, and a path to a contractor.</p></div></article>
</div>

Note: AutoScape collapses that entire workflow. You upload a photo and pick a style, and the generative engine produces a photorealistic render. The system then itemizes the cost, generates a buildable top-down plan, and even builds a video walkthrough. What used to take weeks and thousands of dollars happens in under a minute, for free.

---

<p class="slide-ref">AutoScape · the pipeline</p>

# An entirely automated pipeline

<img class="slide-image" src="assets/images/autoscape/autoscape-07.webp" alt="AutoScape upload — drop a photo and set location type and space size">

<img class="slide-image" src="assets/images/autoscape/autoscape-08.webp" alt="AutoScape style picker — styles shown as real example photographs, not jargon">

Note: The input is deliberately simple — one photo, plus a few constraints like the kind of space and rough size. And we show styles as real example photographs rather than landscape jargon, because homeowners don't think in terms of "cottage" or "Mediterranean" — they see a picture and know if they like it. We kept the questions to a minimum so people actually reach the result before they bounce.

---

<p class="slide-ref">AutoScape · the render</p>

# A high-fidelity render of their real yard

<div class="media-split">
  <div>
    <p>The generative engine produces a photorealistic redesign — keeping the home's architecture intact and changing only the yard, so it feels like <em>their</em> place, not a generic stock image.</p>
    <p>An in-app before/after slider lets them drag between their photo and the new version, which is what makes it feel possible.</p>
  </div>
  <img src="assets/images/autoscape/autoscape-11.webp" alt="AutoScape result — photorealistic redesign with an in-app before/after slider, plan, and video tabs">
</div>

Note: The render is the emotional core. The hard engineering was keeping the photographed architecture intact and changing only the vegetation and hardscape, so it reads as the user's actual yard rather than some generic AI picture. The before/after slider lets them drag between their real photo and the transformed version — a static image is easy to dismiss, but dragging between the two makes it feel achievable.

---

<p class="slide-ref">AutoScape · the plan</p>

# A render isn't a handoff — a plan is

<div class="media-split">
  <div>
    <p>The system corrects the camera's spatial distortion to translate the flat photo into a precise, top-down 2D landscaping plan — something a contractor can actually build from.</p>
    <p>This is the step that turns an explorer into someone moving toward a real decision.</p>
  </div>
  <img src="assets/images/autoscape/plan-2d.webp" alt="AutoScape 2D top-down architectural landscape plan with placement and scale">
</div>

Note: A beautiful image is not a handoff. AutoScape corrects the camera's spatial distortion to translate that flat image into a precise, top-down 2D landscaping plan with real placement and scale — something a landscaper can actually use for installation. A lot of the technical work lives here, converting the generative output into clean 2D documentation. It even builds a localized video walkthrough to make the exploration immersive.

---

<p class="slide-ref">AutoScape · the MVP</p>

# The MVP is the cost report

## Total financial clarity before they talk to anyone

<div class="media-split">
  <div>
    <p>The long-term vision is a marketplace. The MVP targets the highest-value pain point: the <strong>automated cost distribution report</strong>.</p>
    <p>Projects stall because homeowners fear hidden costs and sales pressure. AutoScape parses the render, isolates each component, and extracts an itemized breakdown of materials, regional plant costs, and labor hours.</p>
  </div>
  <img src="assets/images/autoscape/estimate.webp" alt="AutoScape itemized estimate — materials, quantities, directional prices, and per-item links">
</div>

Note: While the long-term vision includes a full marketplace connecting homeowners with local professionals, the immediate MVP strategy focuses strictly on the highest-value pain point: the automated cost distribution report. Landscaping projects stall because people fear hidden costs and aggressive sales pitches. AutoScape acts as a zero-pressure exploration layer — it parses the generated image, isolates the design components, and extracts an itemized breakdown of materials, regional plant costs, and estimated labor hours. That gives the user total financial clarity before they ever speak to a landscaper.

---

<p class="slide-ref">AutoScape · honest costs</p>

# Honesty as interface, not disclaimer

<div class="media-split">
  <div>
    <p>There's no landscaping price API, so the costs come from a <strong>RAG pipeline</strong> over real product metadata — Freepik's asset library indexed in Qdrant — not hallucinated numbers.</p>
    <p>The uncertainty is made visible and usable: directional prices, regional variation, a starting point for a conversation, never a fake-precise quote.</p>
  </div>
  <img src="assets/images/autoscape/pie-chart.webp" alt="AutoScape cost-distribution donut chart with a clear directional-estimate disclaimer">
</div>

Note: This is the part I'd linger on. There is no real landscaping price API, so I built a retrieval-augmented pipeline over Freepik's real asset library, indexed in Qdrant, so the costs come from actual product metadata instead of made-up numbers. The design decision was about what not to promise: the prices are directional, they move with region and season, and they're a starting point for a conversation with a contractor. We made that honesty part of the interface — the pie chart and the line items carry the same message — so the trust earned in the render isn't immediately spent.

---

<p class="slide-ref">AutoScape · the edge</p>

# The only end-to-end AI design at consumer prices

| | AutoScape | Yardzen | iScape |
| --- | --- | --- | --- |
| AI-generated renders | Yes | No (human designers) | No (manual) |
| Design in under a minute | Yes | No (days) | No |
| RAG cost estimation | Yes | No | No |
| 3D + video | Yes | No | No |
| Price | $0–29/mo | $2,499+ | $24/mo |

Note: Competitively, AutoScape is the only platform delivering end-to-end AI design — render, budget, 2D plan, 3D, and video — at consumer price points in under a minute. Yardzen uses human designers and starts at twenty-five hundred dollars over days. AR tools and manual apps don't generate the design at all. Our edge is the full automated loop at a price that actually unlocks the 65% who never start.

---

<p class="slide-ref">AutoScape · the stack</p>

# A boring stack that ships in three weeks

<div class="cards-3">
  <article>
    <h3>Generative AI</h3>
    <p>Gemini 2.0 Flash for vision and photorealistic generation from a single photo.</p>
  </article>
  <article>
    <h3>RAG + 3D</h3>
    <p>Qdrant + Freepik for retrieval-augmented cost estimation; Meshy.ai and Three.js for the 3D walkthrough.</p>
  </article>
  <article>
    <h3>App platform</h3>
    <p>React 19 + TypeScript + Vite, FastAPI, Firebase/Firestore, Stripe for billing.</p>
  </article>
</div>

Note: The stack was chosen to ship in three weeks with a team of two. Gemini 2.0 Flash handles vision and generation. Qdrant and Freepik power the RAG cost engine, and Meshy plus Three.js handle the 3D walkthrough. The app is React, TypeScript, and Vite on top of FastAPI and Firebase, with Stripe for billing. Deliberately unsexy, so two people could own the whole loop instead of fighting infrastructure.

---

<p class="slide-ref">AutoScape · the audience</p>

# Built for the new homeowner

## Suburban Millennials and Gen X buyers

<div class="cards-2">
  <article>
    <h3>Who they are</h3>
    <p>Recent property buyers who value data transparency and seamless mobile experiences — yet face a fragmented, traditional, analog industry.</p>
  </article>
  <article>
    <h3>What AutoScape changes</h3>
    <p>Lowering the barrier to exploration and backing it with hard, algorithmic financial data turns an intimidating renovation into an intuitive, modular, buildable project.</p>
  </article>
</div>

Note: The target audience narrows past a general pool of homeowners to suburban Millennials and Gen X buyers who have recently invested in property. They value data transparency and seamless mobile experiences, yet they're navigating a highly fragmented, traditional, analog industry. By lowering the barrier to design exploration and backing it with hard, algorithmic financial data, AutoScape turns an intimidating, opaque renovation process into an intuitive, modular, and buildable project.

---

<p class="slide-ref">AutoScape · why now</p>

# The timing is right

<div class="cards-3">
  <article>
    <h3>Generative inflection</h3>
    <p>Models now produce output indistinguishable from professional renders.</p>
  </article>
  <article>
    <h3>Outdoor boom</h3>
    <p>Outdoor spending surged 30%+ since 2020 and hasn't reverted.</p>
  </article>
  <article>
    <h3>Labor shortage</h3>
    <p>A persistent skilled-labor gap makes design automation necessary, not just nice.</p>
  </article>
</div>

Note: And the timing is right on three fronts. Generative AI just crossed the line where its output is indistinguishable from professional renders. Post-pandemic outdoor spending is up more than thirty percent and holding. And a persistent landscaping labor shortage makes design automation not just desirable but necessary. The technology, the demand, and the supply gap all line up.

---

<p class="slide-ref">Close</p>

# How I work, in two products

<div class="cards-2">
  <article>
    <h3>Start from the system</h3>
    <p>Both products began as a model — a control loop for the body, a pipeline for the yard — before a single screen.</p>
  </article>
  <article>
    <h3>End in trust</h3>
    <p>On-device privacy, evidence-tagged advice, honest directional costs — the interface earns the right to be acted on.</p>
  </article>
</div>

Note: So that's the through-line. Both products started from a system — a control loop for the body, an automated pipeline for the yard — and both end in trust: on-device privacy, advice I can defend with evidence, costs that are honest about their uncertainty. That's the kind of work I like, and the way I like to work.

---

# Thank you

## Rae Jin · Product Engineer

[dalrae.jin.work@gmail.com](mailto:dalrae.jin.work@gmail.com)  
[raejin.web.app](https://raejin.web.app) · [github.com/jin-dalrae](https://github.com/jin-dalrae)

Note: Thank you. I'd love to open the floor — happy to go deep on the on-device AI and two-cycle model in PeriCare, the systems architecture, or the generative pipeline and RAG cost engine behind AutoScape. What's on your mind?
