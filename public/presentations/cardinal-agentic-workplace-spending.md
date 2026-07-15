# CadinalPay

## Agentic workplace spending

**Rae Jin**
June 11
CCA MDes Leadership by Design

Note: Today I am presenting CadinalPay. It is a payment interface for the moment when AI agents move from answering questions to taking action with company money. My goal is to show how agents can spend efficiently while people still understand, control, and trust the process.

---

# What is CadinalPay?

## Human-controlled agent spending

- Agentic procurement
- Smart subscriptions
- Spending memory
- Approval controls

Note: CadinalPay is a B2B agentic payment interface. It helps workplace AI agents buy reports, supplies, subscriptions, and services for a company. The important part is that humans still stay in control through approvals, spending limits, receipt logs, and clear explanations.

---

# Why now?

## Agents are becoming actors

- From chat to action
- From advice to purchase
- From task help to operations

Note: AI agents are starting to do more than answer questions. In the workplace, they may soon renew software, buy research reports, order supplies, and manage small recurring expenses. Current procurement systems were built for humans, so agents can get confused, waste tokens, and leave unclear records.

---

# Core problem

## Speed vs. trust

| Need | Risk |
|---|---|
| Agent efficiency | Confusing actions |
| Human control | Slow approval |
| Automation | Rogue spending |

Note: The design tension is between speed and trust. If the agent asks for approval too often, the workflow becomes slow. If the agent never asks, the company risks bad purchases or policy problems. CadinalPay tries to balance useful automation with human judgment.

---

# Research process

## How I built the concept

- Agentic AI reports
- WorkOS infrastructure
- Token-cost patterns
- Procurement pain points

Note: I built this concept through research on agentic AI, B2B infrastructure, and workplace procurement. I looked at how agents waste tokens when they work in open-ended loops, and I studied why companies need identity, authorization, audit logs, and policy controls before agents can spend money safely.

---

# Client context

## Fictional client: WorkOS

- SSO
- Directory Sync
- Audit Logs
- Fine-Grained Authorization

Note: I chose WorkOS as the fictional client because its brand already focuses on important B2B infrastructure. Agentic payments are not only a payment problem. They also need identity, permissions, and auditability, which match the kind of products WorkOS already builds.

---

# Design challenge

## Main question

> How can agents spend company money safely?

Note: My design question is: How might we design a procurement interface where agents can act efficiently, while humans can understand, approve, interrupt, and audit every action? This question shaped the whole project.

---

# Product thesis

## A shared workplace system

| Actor | Role |
|---|---|
| Human | Goals + judgment |
| Agent | Search + propose |
| CadinalPay | Control + memory |

Note: Most payment products are designed for one human completing one transaction. CadinalPay is designed for a new workplace relationship between a human, an AI agent, and a control layer. The human sets goals and limits, the agent does the work, and CadinalPay structures the process.

---

# Human-in-the-loop flow

## Procurement loop

Goal -> Plan -> Search -> Propose -> Approve -> Pay -> Log -> Learn

Note: This flow shows the full loop. The human gives a goal, the agent plans and searches, CadinalPay checks policy, the human approves when needed, the payment happens, and the system records what happened. The learning step matters because future purchases should become smarter and safer.

---

# Key intervention points

## Where humans stay in control

- Budget limit
- New vendor
- Sensitive category
- Policy mismatch
- Unclear data

Note: Human control should appear at the right moments, not at every moment. A person should step in when the amount is high, the vendor is new, the category is sensitive, or the agent is uncertain. This keeps the workflow useful without making it careless.

---

# Example tasks

## Agentic procurement

- Buy a market report
- Restock office supplies
- Renew team software
- Compare vendors

Note: These examples make the idea more concrete. CadinalPay is not only for dramatic purchases. It is also for small and repeated workplace tasks that take time, create receipts, and require policy awareness.

---

# Spending categories

## What agents may manage

- Research reports
- SaaS tools
- Office inventory
- Vendor requests
- Recurring services

Note: The categories are intentionally ordinary. Many workplace purchases are small, repeated, and context-heavy. These are exactly the kinds of tasks where agents can help, as long as the interface gives them structure and gives humans visibility.

---

# Parallel journey

## Agent + human timelines

| Stage | Agent | Human |
|---|---|---|
| Goal | Parses | Reviews |
| Search | Compares | Watches |
| Approval | Requests | Decides |
| Payment | Executes | Confirms |
| Learning | Saves | Corrects |

Note: This table shows that the agent and human are working in parallel. The agent is doing operational work, while the human sees enough information to supervise. The interface should make the agent's thinking visible without overwhelming the person.

---

# Two interfaces

## Protocol + control room

| Agent side | Human side |
|---|---|
| Structured data | Visual timeline |
| Fast decisions | Clear approvals |
| Low token cost | High trust |

Note: CadinalPay separates the agent interface from the human interface. Agents need structured information, clear states, and low token cost. Humans need explanation, control, and a way to interrupt the process when something feels wrong.

---

# Agent protocol

## Procurement primitives

- Search vendors
- Compare options
- Check policy
- Request approval
- Execute payment
- Store receipt

Note: Instead of forcing agents to read messy websites and long policy documents every time, CadinalPay gives them simple procurement primitives. These primitives reduce ambiguity and help the agent complete tasks with less repeated reasoning.

---

# Protocol files

## Agent-readable modules

| File | Purpose |
|---|---|
| `auth.md` | Access rules |
| `guardrails.md` | Spending limits |
| `receipt.md` | Invoice parsing |
| `state.md` | Memory |

Note: I imagined CadinalPay as a set of structured files or modules that agents can read. This is a design decision based on how agents work. Agents perform better when they have clear rules, stable memory, and structured outputs instead of vague instructions.

---

# Agent states

## Simple decision states

- Searching
- Comparing
- Waiting
- Approved
- Paid
- Logged

Note: These states make the agent's work easier to follow. Instead of a hidden chain of actions, the system shows where the agent is in the process. This helps both the agent and the human understand what should happen next.

---

# Agent-side flow

## From goal to payment

1. Goal
2. Policy
3. Search
4. Proposal
5. Approval
6. Payment
7. Learning

Note: The agent-side flow is intentionally simple. The agent receives a goal, asks CadinalPay for policy and budget rules, searches vendors, submits a proposal, waits for approval if needed, completes payment, and saves the result for future learning.

---

# Human dashboard

## The control room

- Current task
- Purchase reason
- Cost
- Policy status
- Action buttons
- Audit trail

Note: The human dashboard is the control room. A manager should quickly understand what the agent is trying to do, why it chose a vendor, how much it costs, whether it follows policy, and what actions are available.

---

# Human controls

## Steering the agent

- Approve
- Reject
- Edit budget
- Change vendor
- Pause task
- Add note

Note: These controls are designed for interruption. The human should not need to restart the whole workflow if the agent needs guidance. They should be able to approve once, lower the budget, change the vendor, reject the action, or add a policy note.

---

# Interruption moment

## Highest-trust interaction

**Scenario:** $720 report, new vendor

- Above threshold
- Vendor unverified
- Approval required

Note: The interruption moment is the most important part of the design. In this example, the agent wants to buy a report that is above the automatic approval limit and from a new vendor. The interface should clearly explain the risk and give the human practical choices.

---

# Approval options

## Human choices

- Approve once
- Whitelist vendor
- Lower budget
- Find alternatives
- Reject
- Pause spending

Note: These options are more useful than a simple yes or no. They let the human teach the system. For example, approving and whitelisting a vendor creates a future rule, while rejecting with a reason helps the agent learn what not to do next time.

---

# Mockup 1

## Agent command screen

- Goal entry
- Budget field
- Policy preview
- Structured output

Note: The first mockup should show the agent-facing command interface. It should be minimal and structured, because agents do not need a decorative interface. They need clear fields, constraints, and outputs that are easy to process.

---

# Mockup 2

## Confirmation flow

- Vendor
- Amount
- Reason
- Policy check
- Pay button

Note: The confirmation flow should show why the purchase is being made, how much it costs, and whether it follows company policy. This screen is where trust becomes visible before payment happens.

---

# Mockup 3

## Inventory check

- Current stock
- Reorder threshold
- Proposed vendor
- Auto-approval rule

Note: The inventory example shows a simple recurring use case. An agent can check office supplies, notice that an item is low, compare vendors, and reorder under a safe spending threshold.

---

# Mockup 4

## Human dashboard

- Live activity feed
- Approval queue
- Interrupt buttons
- Recent receipts

Note: The dashboard should feel like a calm control room. It should not make the manager read every detail, but it should make important agent actions visible and easy to stop or correct.

---

# Mockup 5

## Audit + memory

- Purchase history
- Human feedback
- Learning signals
- Future rules

Note: The audit and memory screen closes the loop. It shows what was bought, why it was approved, who approved it, and what the system learned. This is important for accountability and future trust.

---

# Key flow

## Stationery autopilot

Before: notice -> search -> pay -> forget
After: check -> compare -> approve -> log -> learn

Note: This example is useful because it is not dramatic. It shows how CadinalPay can help with everyday operational work. The value comes from making a repeated task safer, faster, and easier to remember.

---

# Institutional memory

## What agents remember

- Vendor trust
- Budget patterns
- Team preferences
- Approval history
- Human feedback

Note: CadinalPay records not only what was purchased, but also why it was approved or rejected. Over time, this creates memory. The agent can learn which vendors are trusted, which categories need approval, and what each team prefers.

---

# Feedback loop

## Manager-level learning

- Thumbs up/down
- Written note
- Cost tag
- Vendor tag
- Repeat rule
- Never-again rule

Note: Human feedback becomes part of the agent's future decision-making. For example, if a report was too general, the manager can write that future reports should include original survey data or sector-specific benchmarks.

---

# Intervention logic

## When to ask

| Situation | Action |
|---|---|
| Under $50 | Auto-approve |
| $50-$500 | Notify |
| Over $500 | Ask |
| New vendor | Ask |
| Unclear data | Pause |

Note: This table defines the right level of human involvement. Low-risk routine purchases can move quickly. Higher-risk purchases need approval. Unclear information should pause the workflow because agent confidence alone is not enough.

---

# Trust mechanisms

## Safety layer

- Spending limits
- Vendor restrictions
- Policy memory
- Receipt logs
- Explanation trails
- Emergency stop

Note: Agentic payment needs trust infrastructure. The safety layer includes spending limits, vendor rules, policy checks, receipt logs, explanations, and an emergency stop. These features make automation more acceptable in a company setting.

---

# Audit questions

## What the system must answer

- Who set the goal?
- What did the agent compare?
- Which policy applied?
- Who approved?
- What was paid?
- What changed?

Note: The audit trail should answer basic accountability questions. A company needs to know who started the task, what options were compared, what policy was used, who approved the payment, and what the system learned afterward.

---

# Success metrics

## Measuring the product

| Category | Metric |
|---|---|
| Efficiency | Token reduction |
| Autonomy | Routine purchases |
| Oversight | Traceable payments |
| Speed | Faster approvals |
| Trust | Fewer follow-ups |

Note: Success is not full automation. Success is the right balance between autonomy and control. The product should reduce token use and manual work, but it should also make every payment traceable and understandable.

---

# Product vision

## Agent-human coworking

- Agents act
- Humans steer
- System remembers

Note: CadinalPay turns procurement from a human-only workflow into a shared workspace between agents and managers. The larger idea is not just payment. It is a coworking system where financial action, workplace memory, and human judgment are connected.

---

# Roadmap

## Next steps

- Prototype protocol
- Design dashboard
- Define policies
- Test workflows
- Explore WorkOS integration

Note: The next step is to build the high-fidelity prototype. I would focus first on the interruption moment, the human dashboard, and the memory screen, because those areas best show the trust and control model.

---

# Open questions

## Feedback I want

- Default procurement layer?
- Human in or out?
- Enough explanation?
- Best memory design?

Note: I want feedback on what would make CadinalPay useful enough to become the default procurement layer for agentic platforms. I also want to discuss where humans should stay in the loop and where automation should be allowed to move faster.

---

# Closing definition

## CadinalPay

Agentic procurement with human control.

Note: CadinalPay is an agentic procurement interface for B2B teams. It lets workplace AI agents purchase reports, supplies, subscriptions, and services on behalf of a company, while humans keep oversight through approval controls, spending limits, and audit trails.

---

# Thank you

## CadinalPay

Rae Jin
CCA MDes Leadership by Design

Note: Thank you. I would love to hear your thoughts on the interruption moment and the memory layer. Those two parts were my biggest design decisions because they decide whether people can actually trust agentic spending.
