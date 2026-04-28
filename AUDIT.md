# MacKai West — Audit Report

## Cycle 6 Score: 7.4 / 10 (Delta: +0.1 from 7.3)

**Summary:** Cycle 6 delivered the sticky mobile CTA correctly — IntersectionObserver-driven, 48px tap targets, hides at hero and contact, zero overflow — and added process step fade-up reveal with soft-spring easing. Both features are verified working. The score moves +0.1 (not the full +0.2 possible) because a label font-size regression persists at 10.88px on mobile despite Pixel's claimed fix, and the process step stagger at 420ms total is too compressed to read as a distinct design beat at desktop. The cap holds at 7.5. Nothing in cycle 6 warrants lifting it.

---

## Axis: Mobile Conversion Completeness

Audit lens: on a 375px device, can a senior hiring leader or candidate understand the value proposition and initiate contact without hitting friction, dead ends, or broken interactions in a 90-second scroll?

---

## What Landed This Cycle (Cycle 6 commits)

**63fef92 coordinator cycle 6 plan** — Plan correctly scoped to P1 sticky mobile CTA + P2 process step reveal + P3 contact line. No scope creep.

**0ea9bc3 builder cycle 6** — Sticky CTA bar: IntersectionObserver on `.hero__actions` and `#contact`, 48px tap targets, `safe-area-inset` bottom padding, hidden/visible toggle with 350ms transition guard. Process steps: 4-step IntersectionObserver at threshold 0.15 with `--i` CSS custom property for stagger delays (0/140/280/420ms). Contact label "Office" → "Reach", copy "Headquartered in the United States" → "Searches handled across the United States". Playwright: all checks PASS across 3 viewports.

**cf999e6 spark cycle 6** — Sticky CTA gold ghost border at rgba(201,169,97,0.45) replacing cream, hairline box-shadow above bar, `cubic-bezier(0.4,0,0.2,1)` entrance curve, letter-spacing tightened to 0.06em. Process step easing: `cubic-bezier(0.16,1,0.3,1)` soft-spring. These are legitimate refinements, not additions-on-additions.

**1ccd18d pixel cycle 6** — Floating label font floor: 0.68rem → 0.82rem claimed for both float and select states. Verified in `style.css`: both `.form-group--float` floated state and `.form-group--select label` now read `font-size: 0.82rem`. However, the pixel audit JSON still reports one `LABEL` element at 10.88px on both iPhone 13 and SE — 10.88px = exactly 0.68rem × 16px, meaning a third label instance was not patched.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged from cycle 5. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Count-up clean. Gold vignette holds. |
| About | 7.5 | Two-column editorial, Roman-numeral pillars. Unchanged and working. |
| Services | 7.8 | Horizontal scroll-lock verified PASS. No regression. |
| Industries | 7.2 | 3D card flip working. Spark's slide-up navy expand panel is the cycle 3 win that still reads well. |
| Process | 7.2 | +0.2 from cycle 5. Step fade-up reveal fires correctly; soft-spring ease gives each step a distinct arrival. Stagger at 420ms total is compressed — at desktop all 4 steps fire within under half a second, which reduces the perceived sequence. Still: this is a material improvement from flat-static. |
| Candidates | 6.8 | No change. Cream wash and copper border hold. The numeral/mobile anchor issue from cycle 5 was not in cycle 6 scope. |
| Employers | 7.2 | Navy panel with italic mark. No change. |
| Contact | 7.1 | +0.1. "Reach: Searches handled across the United States" is a small trust improvement over "Office: Headquartered in the United States" — it changes a placeholder-sounding label to a factual statement of reach. Does not add a trust accelerator, just removes the most deflating string. |
| Footer | 7.3 | Letter-stagger, scroll-progress rule unchanged and working. |

---

## Mobile Conversion Assessment (Cycle 6 lens)

**Sticky CTA — verified working.** On iPhone 13 and SE: bar is hidden at scrollY=0 (hero in view), becomes visible at scrollY=900 (past hero), hides again when contact section enters viewport. Tap targets both 48px × 168–175px. No horizontal overflow introduced. This is a genuine conversion-path improvement — the 12-screen-height scroll distance from hero CTA to form now has a persistent re-entry point.

**One friction remaining that the sticky CTA exposes:** the "Submit a resume" button in the sticky bar links to `#candidates`, not directly to `#contact`. A candidate tapping "Submit a resume" on mobile is taken to the Candidates section, not the form. They must then scroll further or find the section CTA. This is a minor anchor mismatch but it adds one additional step on mobile.

**Process step reveal — functional, but compressed.** 420ms total stagger across 4 steps. A real user scrolling at normal speed through the section may see 2–3 steps fire simultaneously rather than sequentially, because IntersectionObserver fires all steps that entered viewport in a single tick when scrolling fast. The visual beat is present but subtle, not distinctive.

**Label font regression persists.** Despite Pixel's claimed fix, the audit JSON reports one `LABEL` element still at 10.88px (0.68rem) on both mobile viewports. The fix patched the floated-state and select label in `style.css`, but a third instance — likely the plain `form-group label` in a non-float group — was not addressed. 10.88px is below the 13px mobile floor.

**No new trust accelerator landed.** Cycle 5 identified the contact section as the terminal conversion point with no trust signal. Cycle 6 improved the copy string but did not add a response-time badge, a phone-on-request line, or any other grounding element. The contact section still reads as honest-but-bare.

---

## What Works (5 bullets)

- **Sticky mobile CTA** — The IntersectionObserver implementation is clean. Hero exit triggers display, contact entry suppresses it. The bar entrance uses `cubic-bezier(0.4,0,0.2,1)` and slides up 80px cleanly. The 48px tap targets meet the mobile floor. This is the highest-impact conversion-path addition cycle 6 could have made without real content.
- **Process section upgrade** — Stepping from a fully static 4-column layout to a staggered fade-up reveal gives the Process section an interaction identity for the first time. The soft-spring ease on each step arrival reads as considered rather than mechanical.
- **Contact copy is now honest and active** — "Searches handled across the United States" is a factual, present-tense statement of reach, not a corporate HQ placeholder. It removes the single most trust-deflating string in the terminal conversion section.
- **No overflow regression** — Sticky CTA bar introduced a new fixed-position layer. No horizontal overflow appeared at any scroll position across all three viewports. The `safe-area-inset` padding is correctly applied.
- **Design system coherence** — Gold ghost border on the sticky CTA matches the site's existing palette register. The hairline box-shadow above the bar reads as a deliberate material edge, not a bolt-on addition.

---

## What's Still Off (5 bullets)

- **Label font regression not fully resolved** — One `LABEL` element still reads 10.88px on iPhone 13 and SE. Pixel patched two of three instances in `style.css`. The uncorrected instance is the non-float `form-group label` rule (`.form-group label`), which was not part of the cycle 6 patch.
- **Sticky CTA "Submit a resume" links to #candidates, not #contact** — A candidate tapping the ghost button on mobile is routed to the Candidates section, requiring a second navigation action to reach the form. The employer button correctly links to #contact. This asymmetry creates a slightly worse conversion path for candidates on mobile.
- **Process stagger too compressed at desktop** — 0/140/280/420ms means all 4 steps fire in under half a second. On a fast desktop scroll through the section, steps 2–4 often enter the viewport in the same frame as step 1, collapsing the stagger. Extending the stagger to 0/300/600/900ms and raising the threshold slightly would make the sequence perceptible.
- **No contact trust accelerator** — The contact section's conversion intent is: a $40K decision-maker must feel confident enough to type their details. "Searches handled across the United States" and "Mon–Fri, 8a–6p ET" are correct but sparse. No response-time commitment, no phone-on-request option, no social proof.
- **Cap conditions unchanged** — No real photography, no verified testimonials, no published office address. The three cap conditions that would lift the ceiling to 7.7–7.8 are all user-side content. Design cannot substitute for them.

---

## Cap Assessment

The site sits at **7.4**, one-tenth below the 7.5 cap. The +0.1 delta reflects a genuine, verified conversion-path improvement (sticky CTA), a modest interaction upgrade (process reveal), and a copy improvement in the contact section. The cap is not being gamed — the single-tenth gain is appropriate given that the label regression was not fully resolved and the process stagger is too compressed to achieve its full effect.

If the three cap-lifting conditions (real photography, verified testimonials, verified office address) landed simultaneously, the design infrastructure is ready to support a score of **7.7–7.8**. No existing design element would need to be removed to absorb that content.

---

## Cycle 7 Top-3 Priorities (Ranked)

### P1 — Resolve the remaining label font regression + sticky CTA anchor fix
**What:** (a) Find and fix the third `LABEL` instance still rendering at 10.88px — likely the `.form-group label` base rule (around line 1803 in `style.css`). Bring it to `0.82rem` minimum. Regenerate `style.min.css`. (b) Change the sticky CTA "Submit a resume" `href` from `#candidates` to `#contact` — a candidate tapping that button on mobile should land at the form, not a mid-page section requiring a second action.
**Acceptance criteria:** Pixel audit reports zero `LABEL` elements below 13px on both iPhone 13 and SE. Sticky CTA "Submit a resume" button routes to `#contact`. Verified via Playwright.
**Why P1:** A font floor violation and a broken candidate conversion path are correctness failures, not design improvements. They ship as regressions on a verified checklist.

### P2 — Process stagger extension
**What:** Extend the process step CSS `--i` stagger multiplier from 140ms to 300ms per step (0/300/600/900ms total). Consider raising the IntersectionObserver threshold from 0.15 to 0.25 so steps don't fire in a burst when the section is scrolled through quickly. The soft-spring ease from Spark is correct and should be preserved.
**Acceptance criteria:** At desktop 1440px, scrolling at normal human speed through the Process section, steps 1–4 must visibly fire sequentially, not simultaneously. Playwright scroll test at 5 positions through the section, confirming each step's `is-revealed` class fires in order, not in a single frame.
**Why P2:** The process section is where a CFO builds their mental model of the engagement. An imperceptible stagger wastes the animation entirely — it reads as a minor fade-in rather than a deliberate reveal sequence.

### P3 — Contact section trust accelerator (no fabrication)
**What:** Add one honest trust element to the contact intro block. Best option given zero fabrication constraint: a "Typically replies within 1 business day" pill/badge styled in the brand register (small, gold hairline border, Inter 11–12px, uppercase tracked). This requires no invented data — it is an honest operating commitment. Secondary option: a `mailto:` quick-contact line before the form ("Prefer to write directly? hello@mackaiwest.com") which makes the email address salient before the form, reducing form-entry friction.
**Acceptance criteria:** Contact intro block reads as more grounded on first arrival. No fabricated credentials, no invented names or numbers. Passes CLAUDE.md content honesty rules. Verified at desktop and 375px.
**Why P3:** The terminal conversion section is currently the weakest trust moment on the page. Everything before it builds intent; the contact section must close the decision. Any honest addition to that block that grounds the firm as real and responsive improves conversion without requiring user-supplied data.

---

*Audit completed 2026-04-27. Axis: mobile conversion completeness. Viewports: Desktop 1440, iPhone 13 (390px), iPhone SE (375px). Scroll positions sampled via Playwright cycle 6 audit JSON. Screenshots verified.*
