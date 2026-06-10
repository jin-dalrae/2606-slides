# Rae Jin

## Product Engineer · portfolio review

<p class="deck-subtitle">Systems thinking meets human-centered design</p>

Rae Jin  
June 9, 2026  
CCA MDes · Leadership by Design

Note: Hi, I'm Rae, a Product Engineer. I approach design with a heavy foundation in systems thinking and human-centered design — a perspective shaped by my academic background in mathematics, sociology, and human-computer interaction. Before pivoting into this space, I spent eight years as an IT consultant, notably at PwC, where I engineered AI/ML pipelines, optimized SQL databases, and shaped digital product strategies.

---

<p class="slide-ref">Background</p>

# I treat software as an iterative canvas

## Build fast, then return to scale

<div class="cards-3">
  <article>
    <h3>Foundations</h3>
    <p>Mathematics, sociology, and HCI — systems thinking paired with human-centered design.</p>
  </article>
  <article>
    <h3>8 years at PwC</h3>
    <p>IT consultant building AI/ML pipelines, optimizing SQL databases, and shaping digital product strategy.</p>
  </article>
  <article>
    <h3>18+ live MVPs</h3>
    <p>Built across San Francisco hackathons — usually in 48 hours, then scaled the backend and refined the interface over the following weeks.</p>
  </article>
</div>

Note: My portfolio looks a bit different because I treat software development as an active, iterative canvas. I have built over 18 live MVPs across various hackathons in San Francisco. I build fast, usually within 48 hours, but I continuously return to my codebase weeks and months later to scale the backend, optimize data layers, and refine the interface. Today, I'm excited to walk you through two of my primary products.

---

<p class="slide-ref">Case study · PeriCare</p>

# PeriCare

## AI-native support for perimenopause

<div class="media-split">
  <div>
    <p>A native iOS and Apple Watch companion app, built in Swift and Xcode, that builds an intelligent, predictive ecosystem on top of HealthKit data.</p>
    <p><strong>Why now:</strong> days ago at WWDC 2026, Apple announced native perimenopause tracking in its Health app — the shift to midlife hormonal health is happening commercially and culturally.</p>
  </div>
  <img src="assets/images/pericare/hero.jpg" alt="PeriCare — AI-native support for perimenopause">
</div>

Note: The first is PeriCare, a native iOS and Apple Watch companion app built utilizing Swift and Xcode. PeriCare is designed to provide AI-native support for women navigating perimenopause. Culturally and commercially, we are seeing a massive shift toward midlife hormonal health. Even Apple, just days ago at WWDC 2026, announced native perimenopause tracking for its core Health app. My goal with PeriCare was to build an intelligent, predictive ecosystem on top of HealthKit data. From a physiological perspective, perimenopause breaks down the body's natural regulatory loops. When a woman undergoes severe hormonal fluctuations, her traditional behavior-state actuators — like sleep or resting patterns — no longer balance her mood or physical symptoms effectively. This creates a challenging, unpredictable transition.

---

<p class="slide-ref">PeriCare · the problem</p>

# Perimenopause breaks the body's regulatory loops

## Severe hormonal swings, unreliable feedback

<div class="cards-2">
  <article>
    <h3>The physiology</h3>
    <p>Under severe hormonal fluctuation, the usual behavior-state actuators — sleep, rest, movement — no longer reliably balance mood and physical symptoms.</p>
  </article>
  <article>
    <h3>The result</h3>
    <p>A challenging, unpredictable transition where ordinary period trackers break, because cycles stop having a predictable length.</p>
  </article>
</div>

Note: Physiologically, perimenopause breaks down the body's natural regulatory loops. When a woman undergoes severe hormonal fluctuations, her traditional behavior-state actuators — like sleep or resting patterns — no longer balance her mood or physical symptoms effectively. That is the core problem PeriCare is built to address: making sense of a transition that has stopped being predictable.

---

<p class="slide-ref">PeriCare · research &amp; architecture</p>

# From one interview to a digital twin

<div class="media-split">
  <div>
    <p>I interviewed a user living with severe perimenopausal depression. Her doctor prescribed hormonal treatment, but subtle side effects — like localized swelling — went untracked, leaving her unsure whether she needed clinical intervention.</p>
    <p><strong>The architecture:</strong> map each user's symptoms into a personal <em>digital twin</em>. Continuous Apple Watch biometrics plus daily logged symptoms map the intersection of the hormonal and menstrual cycles.</p>
  </div>
  <img src="assets/images/pericare/pericare-system-1.jpg" alt="PeriCare control-loop architecture: Apple Watch sensors and event logs feed a mood/energy model balanced by BioSync agents that drive behavioral and medical advice">
</div>

Note: To understand this deeply, I conducted extensive interviews with a user who had been experiencing severe perimenopausal depression. She shared a crucial pain point: her doctor prescribed hormonal treatments, but minor, subtle side effects like localized body swelling went untracked, leaving her uncertain whether she needed a clinical intervention. This inspired the core product architecture. PeriCare maps a user's unique symptoms to create a highly personalized digital twin. By continuously reading background biometric data from the Apple Watch and pairing it with daily user-logged symptoms, the application maps the intersection of their hormonal and menstrual cycles.

---

<p class="slide-ref">PeriCare · the interface</p>

# The native iOS journey

<img class="slide-image" src="assets/images/pericare/pericare-01.png" alt="PeriCare onboarding — private, on-device, no accounts">

<img class="slide-image" src="assets/images/pericare/pericare-08.png" alt="PeriCare digital twin — personal-baseline radar and cluster trends across the cycle">

<img class="slide-image" src="assets/images/pericare/pericare-10.png" alt="PeriCare weekly AI report — findings, focus for next week, and a doctor-ready summary">

Note: Here you can see the native iOS user journey, moving from onboarding to the digital twin visualization and active symptom logging. The underlying engine relies on an intelligent assistant that flags anomalies and provides predictive, actionable lifestyle coaching — every reading is normalized against the user's own baseline, not a population goal.

---

<p class="slide-ref">PeriCare · the interface</p>

# Glanceable today, predictive coaching

<img class="slide-image" src="assets/images/pericare/pericare-06.png" alt="PeriCare today tab — best moves for today with on-device suggestions">

<img class="slide-image" src="assets/images/pericare/pericare-12.png" alt="PeriCare onboarding — one gentle daily nudge with a daily check-in reminder">

Note: The daily loop is intentionally light — a fifteen-second log and a single suggested move for the day, framed by where she is in her cycle. The assistant flags anomalies and turns them into small, actionable lifestyle coaching instead of raw data she has to interpret herself.

---

<p class="slide-ref">PeriCare · privacy</p>

# Privacy is the foundational constraint

## The entire AI engine runs on-device

<div class="cards-2">
  <article>
    <h3>Nothing leaves the phone</h3>
    <p>PeriCare does not transmit health metrics to any external server. There are no cloud accounts and no aggregates ever leave the device.</p>
  </article>
  <article>
    <h3>On-device intelligence</h3>
    <p>The natural-language engine runs locally using iOS on-device execution, so a user's health journey stays entirely private and under their control.</p>
  </article>
</div>

Note: Given that we are dealing with deeply sensitive medical and biometric data, data privacy was our foundational constraint. PeriCare does not transmit health metrics to an external server. The entire natural language engine runs locally on-device using iOS local execution libraries. This ensures that a user's health journey remains entirely private, secure, and fully under their control, giving them the confidence to engage with the app daily.

---

<p class="slide-ref">Case study · AutoScape</p>

# AutoScape

## One photo to a buildable plan — Google DeepMind award

<div class="before-after">
  <figure>
    <img src="assets/images/autoscape/hero-before.png" alt="A bare, unpolished backyard — the homeowner's own photo">
    <figcaption>Before — a single uploaded photo</figcaption>
  </figure>
  <figure>
    <img src="assets/images/autoscape/hero-after.png" alt="The same backyard, fully redesigned with planting and hardscape">
    <figcaption class="after">After — generated in under a minute</figcaption>
  </figure>
</div>

Note: My second project is AutoScape, an intelligent outdoor design application that won an award from Google DeepMind at a recent hackathon. AutoScape completely re-imagines how homeowners conceptualize and execute residential backyard renovations. The technical pipeline is entirely automated. A homeowner uploads a simple photograph of an empty or unpolished backyard and inputs their design constraints, such as specific regional plants, hardscaping materials, or spaces for a children's playground.

---

<p class="slide-ref">AutoScape · the pipeline</p>

# An entirely automated pipeline

<img class="slide-image" src="assets/images/autoscape/autoscape-07.png" alt="AutoScape upload step: drop a photo, choose location type and space size">

<img class="slide-image" src="assets/images/autoscape/autoscape-11.png" alt="AutoScape result: photorealistic redesign with in-app before/after slider, 2D plan, and video tabs">

<img class="slide-image" src="assets/images/autoscape/plan-2d.png" alt="AutoScape 2D top-down architectural landscape plan generated from the render">

Note: Our generative engine immediately produces a high-fidelity 3D visualization. Simultaneously, the system corrects the camera's spatial distortion to translate that flat image into a precise, top-down 2D landscaping plan. It even builds a localized video walkthrough to make the exploration process highly engaging and immersive. So the flow is: upload a photo, set constraints, get a photorealistic render, a buildable 2D plan, and an immersive walkthrough.

---

<p class="slide-ref">AutoScape · MVP strategy</p>

# The MVP: an automated cost report

## Total financial clarity before you talk to anyone

<div class="media-split">
  <div>
    <p>The long-term vision is a marketplace connecting homeowners with neighborhood professionals. The MVP targets the highest-value pain point: the <strong>automated cost distribution report</strong>.</p>
    <p>Projects stall because homeowners fear hidden costs and sales pressure. AutoScape parses the generated image, isolates the design components, and extracts an itemized breakdown of materials, regional plant costs, and estimated labor hours.</p>
  </div>
  <img src="assets/images/autoscape/estimate.png" alt="AutoScape itemized cost estimate: materials, quantities, directional prices, and per-item links">
</div>

Note: While our long-term vision includes a complete marketplace connecting homeowners with neighborhood professionals, our immediate MVP strategy focuses strictly on the highest-value pain point: the automated cost distribution report. Landscaping projects frequently stall because homeowners fear hidden costs or aggressive sales pitches from contractors. AutoScape acts as a zero-pressure exploration layer. The app parses the generated image, isolates the design components, and extracts an itemized breakdown of exact materials, regional plant costs, and estimated labor hours. This gives the user total financial clarity before they ever speak to a landscaper.

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
    <p>By lowering the barrier to exploration and backing it with hard, algorithmic financial data, an intimidating renovation becomes an intuitive, modular, buildable project.</p>
  </article>
</div>

Note: Our target audience shifts past a general pool of homeowners to look specifically at suburban Millennials and Gen X buyers who have recently invested in property. This demographic values data transparency and seamless mobile experiences, yet they are navigating a highly fragmented, traditional analog industry. By lowering the barrier to design exploration and backing it with hard, algorithmic financial data, AutoScape turns an intimidating, opaque renovation process into an intuitive, modular, and buildable project. Thank you, and I would love to open the floor to your questions.

---

# Thank you

## Rae Jin · Product Engineer

[dalrae.jin.work@gmail.com](mailto:dalrae.jin.work@gmail.com)  
[raejin.web.app](https://raejin.web.app) · [github.com/jin-dalrae](https://github.com/jin-dalrae)

Note: Thank you. I'd love to open the floor — happy to go deep on the on-device AI in PeriCare, the digital-twin architecture, or the generative pipeline and RAG cost engine behind AutoScape. What's on your mind?
