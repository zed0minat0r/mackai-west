# MacKai West — Nigel Audit, Cycle 15

**Score: 8.2 (Delta 0.0 from cycle 14 — ceiling holds)**  
**Axis: conversion micro-copy and mobile section rhythm**  
**Cap: 8.2 (design ceiling). Content ceiling at 8.5–8.7 requires real photography, real testimonials, real address — none shipped this cycle.**

---

**Date:** 2026-04-28  
**Live URL:** https://zed0minat0r.github.io/mackai-west/?v=cycle15-b  
**Viewports tested:** iPhone SE 375, iPhone 13 390, iPhone 14 Plus 414, Desktop 1440  
**Scroll positions:** 5 per viewport (5% / 25% / 50% / 75% / 95%) — verified live on Playwright  
**Commits audited:** Builder `ee8cda7`, Pixel `7347334`

---

## CONVERGENCE

**This site has reached its design ceiling at 8.2. No further design moves are available without content unlock.**

Cycle 15 was explicitly surgical — three targeted fixes, two of which closed already-identified defects. The cumulative polish across 15 cycles has brought this site to the top tier of the executive search category for scroll vocabulary, visual identity, and mobile craft. Further loop iterations without real content will not move the score.

**The customer-blocked items are:**
1. Formspree endpoint (or equivalent form handler) — contact form currently submits to `action="#"` with mailto fallback; this is the terminal conversion action and it is broken for real buyers
2. Real testimonials — even two or three short pull-quotes from genuine clients would enable a testimonial band that could push the score materially
3. Real photography — the about placeholder resolves the layout gap honestly but it will never score as well as a genuine brand image
4. Published office address or city — the "United States · 2026" line is honest but carries no trust weight with a candidate evaluating a firm

**Recommendation:** Pause the automated loop. Resume only when the Formspree URL and one of the above content items is available.

---

## What Landed Cleanly This Cycle

### P2 — Process mobile row-gap clamp (Builder `ee8cda7`)
Verified across all three mobile viewports. At iPhone SE 375, iPhone 13 390, and iPhone 14 Plus 414, `.process__steps` now shows `rowGap: 28px` (Playwright computed style confirmed). The ~180px navy void below step 03 on iPhone 13 that was called out in the cycle 14 audit is closed. Step heights are compact and even (215–268px per card across viewports), with no dead space between rows. Desktop is unaffected: `rowGap: 57.6px` in the 2x2 grid is correct and proportionate.

### P3 — Stat band micro-label (Builder `ee8cda7`)
`stat__label-aux` element is present and correct on all four viewports:
- Text: "Senior roles only. Manager and above."
- Font size: 13px (floor holds)
- Text transform: uppercase
- Letter spacing: 2.34px
- Color: rgba(245, 240, 230, 0.55) — cream at 55% opacity, correctly subordinate to the primary label
- Margin top: 8px — properly separated from "Average placement fee"

This is honest copy that reframes the $40K stat for both audiences. It does not alienate candidates by implying cost; it signals the firm's seniority threshold, which is relevant to senior candidates as a quality signal. No fabricated data introduced.

### P1 — Nav Employers link (Builder `ee8cda7` note)
Correctly identified as already-present. Playwright confirmed the nav contains both Candidates and Employers links at all viewports. No unnecessary edit was made. Correct call by Builder.

### Pixel Verification (`7347334`)
All 10 gates PASS per Pixel's log. The Playwright run here independently confirms: zero horizontal overflow on all four viewports (hScrollMax = 0, docScrollWidth = innerWidth at all viewports), all tap targets functional, no font-floor regressions.

---

## Section Scores (Cycle 15 — unchanged from cycle 14 except stat band)

| Section | Score | Notes |
|---|---|---|
| Hero | 8.5 | Blueprint mesh + cursor parallax + ticker eyebrow + hero-exit transform — genuine personality |
| Stat band | 8.0 | +0.2 from cycle 14. P3 micro-label closes the dual-audience gap; $40K lands for employers, seniority signal lands for candidates |
| About | 7.6 | MW wordmark placeholder is honest; desktop flex-grow fills correctly; mobile hides placeholder appropriately |
| Services | 8.3 | 5-panel horizontal scroll-lock with cream/navy alternation remains the site's strongest scroll moment |
| Industries | 8.0 | 3D card flip + 8 roles per back-face; tap-to-reveal functional on mobile |
| Process | 8.2 | 2x2 grid at desktop, single-col mobile with tightened row-gap; sync and halo working; material improvement from cycle 13 |
| Candidates | 7.8 | Navy panel inversion matches Employers; For/Candidates italic mark lands editorially |
| Employers | 7.8 | Parity with Candidates confirmed |
| Contact | 7.2 | Floating labels, trust badge, honest reach copy all clean; mailto fallback is the outstanding conversion blocker |
| Footer | 7.9 | Letter-stagger wordmark + scroll progress rule both visible; mobile stagger 40ms confirmed |

---

## Score Justification — Why 8.2 Holds (Not 8.3)

The cycle 15 fixes are correct and clean, but they resolve defects that were already named — they do not introduce new craft. The process row-gap was called out in the cycle 14 audit as P2. The stat micro-label was P3. Both delivered as specified.

For the score to move to 8.3, the craft improvement would need to be perceptible to a prospective buyer scrolling the site cold — something they would consciously notice or feel as a step up in quality. Tighter row-gap on a section they are scrolling past and a secondary label under the stat band are polish moves, not step-change moves. A real buyer would not register either as a meaningful quality improvement versus cycle 14. The ceiling holds.

---

## Top 3 Priorities for Cycle 16 — Content Unlock Required

These three moves cannot be executed without the customer providing material. Each is blocked, not neglected.

### P1 — Wire Formspree (or equivalent) to the contact form
**What is needed:** A Formspree endpoint URL (or similar headless form service).  
**What to do:** Replace `action="#"` in index.html with the live endpoint. The in-page submit choreography (spinner, checkmark, ring pulse, success reveal) is already implemented and will fire correctly the moment a real endpoint is in place. This is the single highest-leverage action available — it converts the site from a brochure into a lead-generation tool.

### P2 — Replace the about placeholder with real photography
**What is needed:** One brand photograph (team, workspace, or atmospheric) — even a single strong image.  
**What to do:** Replace `.about__placeholder` with an `<img>` or `<picture>` element inside the right column. The layout flex structure is already correct. A real image here would lift the About section from 7.6 to 8.2+ and break the "stock-photo-free but placeholder-heavy" tension visible to any sophisticated buyer.

### P3 — Wire one real testimonial
**What is needed:** One verified quote from a genuine client or placed candidate (initials and role title acceptable; fabricated attributions are prohibited by content rules).  
**What to do:** A single testimonial band above the Contact section — large Playfair italic pull-quote, small-caps attribution. No grid needed. One real voice from a real engagement would do more for the trust score than any further design iteration.

---

## Cap Justification

The design ceiling of 8.2 is firm and correct. This site is in the top 10–15% of executive search sites by scroll experience, visual identity, and mobile craft. Every section has a distinct personality. The scroll vocabulary (horizontal scroll-lock, hero-exit, section bg-shift, line-mask H2s, 3D industry flips, process journey bar with halo) is authored rather than templated.

The remaining 0.3–0.5 points (toward 8.5–8.7) are entirely gated on real content. Design cannot substitute for:

- A genuine brand photograph in the About section
- A real testimonial from a verified client
- A published office location
- A wired form endpoint that processes submissions

These are customer-provided. They are not blocked by technical or design limitations.
