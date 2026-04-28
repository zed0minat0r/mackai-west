# MacKai West — Audit Report

## Cycle 5 Score: 7.3 / 10 (Delta: +0.2 from 7.1)

**Summary:** Cycle 5 closed the two worst-offending defects — stat count-up now starts correctly at 0K and completes cleanly, and the services scroll-lock double-headline at 375px is eliminated — while the amplified hero mesh, vertex-pulse, and edge-shimmer give the hero genuine presence at desktop scale. The site sits just below the 7.5 cap. The cap is being held by the right reasons: no real photography, no verifiable office location, no testimonials. Those three items landing simultaneously would cleanly carry the score to 7.7–7.8 under the current cap rule — the design infrastructure is now ready for real content.

---

## Axis: Conversion Friction

Audit lens: could a hiring leader or senior candidate arrive, understand the value proposition in 90 seconds, and find a credible path to contact — without confusion, dead ends, or broken interactions?

---

## What Landed This Cycle (Cycle 5 commits)

**86b72c8 coordinator cycle 5 plan** — Plan correctly prioritised the three verified Nigel defects from cycle 4 as the cycle's only mandate. No scope creep.

**74aa3c4 builder cycle 5** — IntersectionObserver threshold raised 0.6 → 0.95 resolves the mid-count fire defect. Playwright confirms: stat starts at "0K" and completes at "40K" on all three viewports when user scrolls naturally through the section. The services SLIDE_FRAC 0.85 → 0.92 with overflow:hidden on .service-fp__inner eliminates the simultaneous dual-headline condition at 375px. Hero mesh clamp raised to 460px desktop with vertex-pulse on 6 vertices (staggered 0–3.5s delays).

**e31d7ed spark cycle 5** — Vertex-pulse refined to a 3-stop organic dwell pattern rather than a sharp bell curve, giving the mesh animation natural breath rather than mechanical pulsing. Edge-shimmer on 12 lines at 8s/0.65s stagger adds genuine depth. The mesh::before radial gold glow and footer progress gradient falloff are restrained finishing touches.

**35374e3 pixel cycle 5** — Verified all three P1/P2/P3 fixes passing. Mobile alignment clean at 375 and 414. No overflow anywhere.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Mesh at 460px with vertex-pulse is distinctive; rotation + edge-shimmer read as structural rather than decorative |
| Hero (mobile) | 7.2 | Mesh visible at 140px; tasteful restraint. The hero text-stack works at 375 |
| Stat band | 7.5 | Count-up now verified clean — starts 0K, lands 40K. Gold vignette holds up |
| About | 7.5 | Two-column editorial with Roman-numeral pillars reads as considered, not generic |
| Services | 7.8 | Horizontal scroll-lock working at all three viewports; SLIDE_FRAC fix confirmed no double-headline at 375 |
| Industries | 7.2 | 3D card-flip conceptually good; on desktop the flip-back content is cleanly accessible; on mobile the toggle works |
| Process | 7.0 | Scroll-drawn copper line is the right idea; 4-column layout at desktop is clean; section feels slightly static compared to surrounding sections |
| Candidates | 6.8 | Cream wash + oversized "01" numeral + bullet structure is the right move. Conversion friction: the CTA anchors to #contact which is correct, but no mid-page friction relief — a candidate landing here has no email as fallback |
| Employers | 7.2 | "For Employers" navy panel with stacked italic mark is the cycle 2 editorial win that still holds. Copy is appropriately senior-addressed |
| Contact | 7.0 | Floating labels, send choreography, confidentiality note all land. The form's mailto-fallback is honest. "Office: Headquartered in the United States" reads as a placeholder not a trust signal — this is the single largest remaining conversion-friction item |
| Footer | 7.3 | Letter-stagger wordmark reveal, scroll-progress gold rule, gradient falloff — all working. Stacked mobile layout is clean |

---

## Conversion Friction Assessment

**Desktop (1440px):** Low friction path exists. Nav CTA "Submit a search" is always visible. Both hero CTAs are prominent. The employer and candidate sections each have a dedicated primary button. The form is accessible with proper labels. Time-to-contact understanding: under 15 seconds.

**Mobile iPhone 13 / SE (375px):** Nav CTA collapses to hamburger — correct, expected. Hero CTAs remain prominent. The form stacks correctly. Friction point: the mobile contact section shows the form below the intro text but the scroll distance from hero CTA to form completion is significant on a 375px device — roughly 12 full-screen lengths. No sticky CTA on mobile to reduce drop-off. This is the principal untapped conversion-friction opportunity.

**Form itself:** All fields properly labelled. Required fields marked. The mailto fallback is the honest solution pre-endpoint. The "Send" button choreography (spinner → checkmark → success) is polished. No friction blocking form entry.

**Trust gap — the remaining 0.2 points:** "Headquartered in the United States · Searches handled nationally" reads as a placeholder. A hiring leader evaluating a $40K search commitment needs something more grounding. No testimonials, no LinkedIn, no city. These are acknowledged cap items — not agent failures.

---

## What Works (5 bullets)

- **Hero mesh at desktop scale** — The 460px amplified mesh with organic vertex-pulse and edge-shimmer reads as a genuine design identity, not a stock animation. At 1440px it anchors the hero without competing with the copy.
- **Services horizontal scroll-lock** — The two-panel fullscreen experience works correctly at all three viewports now. The SLIDE_FRAC fix gives the first panel proper dwell time; the dot navigation advances cleanly. This is the site's most ambitious interaction and it is working.
- **Brand voice consistency** — Copy throughout uses the same measured, confident register. "Narrow is what makes the placement stick" / "not a stack of nearly-rights" / "the searches that don't close themselves" all reinforce the positioning without inventing credentials.
- **Process section** — Four stages, scroll-drawn copper line, navy background. The section gives hiring leaders a clear mental model of the engagement. "We replace the placement if it doesn't take" is the strongest trust signal on the page that doesn't require real data.
- **No horizontal overflow, correct tap targets** — Pixel's verification holds. 375px shows zero overflow. Buttons ≥44px. Mobile text at readable size throughout.

---

## What's Still Off (5 bullets — even at the cap, these would push higher if cap lifted)

- **No real address** — "Headquartered in the United States" is the most trust-deflating string in the contact section. A CFO evaluating a $40K search commitment cross-references the firm online. A city at minimum, a LinkedIn company page URL, or a phone number would close the gap faster than any design improvement possible this cycle.
- **No sticky mobile CTA** — On iPhone SE, the scroll distance from hero to form is approximately 12 full-screen heights. There is no persistent "Submit a search" button on mobile scroll. A slim fixed bar or floating button on mobile would materially reduce drop-off.
- **Process section is the scroll experience gap** — Every other section has a distinctive interaction: horizontal scroll-lock, 3D card flip, vertex-pulse mesh, letter stagger, pillar stagger. The Process section has only the scroll-drawn copper line, which is tasteful but passive. A hiring leader pausing here has nothing to engage with.
- **Candidates section below-the-fold problem on mobile** — The "01" numeral is outside the viewport on mobile when the section is scrolled to. The section reveal relies on scroll-up animation which works, but the numeral loses its editorial anchor function at 375px because it renders above the visible fold before the copy arrives.
- **Contact form on mobile requires the full journey** — No email-first quick-contact option exists. A senior candidate who wants to make a discreet inquiry on mobile faces a multi-field form. A "Send us a note" mailto link before the form would lower the entry bar without replacing the form.

---

## Cap Assessment

The site sits **just below the 7.5 cap** at 7.3. The 0.2 remaining gap to the cap is a fair reflection of the placeholder office situation and the absence of any third-party trust signal. The cap is not a design ceiling — it is a content ceiling. If real photography, verified testimonials, and a real office address landed simultaneously in one cycle, the design infrastructure is now in a position to carry a score of **7.7–7.8** cleanly. Nothing in the current design would need to be undone to absorb that content.

---

## Cycle 6 Top-3 Priorities (Ranked)

### P1 — Sticky mobile CTA
**What:** A slim fixed bar at the bottom of the mobile viewport (375–768px) that shows "Submit a search" and "Submit a resume" as compact buttons, visible only after the hero CTAs scroll out of view.
**Acceptance criteria:** Bar appears after scrollY passes hero bottom on mobile. Does not obstruct content. Disappears when the contact form is in view. Tap target ≥44px. Zero horizontal overflow introduced. Verified at 375, 390, 414 all three viewports.
**Why P1:** This is the highest-leverage conversion-friction fix available without real content. Every other CTA bottleneck requires user-supplied data.

### P2 — Process section interactive depth
**What:** Add a scroll-triggered or hover interaction to each process step — e.g., step number counts up / expands with a supporting micro-detail line when the step enters the viewport, or a timed sequential reveal across the four columns. Should replace or extend the existing copper line draw, not pile on top of it.
**Acceptance criteria:** Each step's arrival in viewport triggers a visible, non-jarring animation. Reduced-motion guard required. Verified at desktop and mobile. Spark must replace the flat-static state of each step card, not add a second layer over it.
**Why P2:** Process is the only section without a distinctive interaction post-cycle 5. It is also the section that most directly builds employer trust — the one a CFO reads before deciding to fill in the form.

### P3 — Contact section trust lift (no fabrication)
**What:** Add one honest trust accelerator to the contact intro: either (a) a discreet "phone number available on request" line alongside the email, or (b) a response-time badge ("Typically replies in < 1 business day" formatted as a small pill/badge rather than body text), or (c) a "We've closed searches in [X] states" statement if the user can verify it. Any of the three requires zero invented data.
**Acceptance criteria:** The contact intro block reads as more grounded to a new visitor at first glance. No fabricated credentials. No invented names or addresses. Copy is either user-verified or honest framing. Verified against CLAUDE.md content honesty rules.
**Why P3:** The contact section is the terminal conversion point. Everything before it builds intent; the contact section must close the decision. Currently the "Office" line actively undermines the close. Any honest addition to that block improves conversion without requiring real photography.

---

*Audit completed 2026-04-27. Axis: conversion friction. Viewports: Desktop 1440, iPhone 13 (390px), iPhone SE (375px). Scroll positions sampled: 6 per viewport. Screenshots verified for all sections.*
