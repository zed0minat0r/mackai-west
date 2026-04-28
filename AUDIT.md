# MacKai West — Nigel Audit, Cycle 13

**Score: 8.1 (Δ +0.1 from 8.0)**
**Axis: process section legibility and mobile viewport density**
**Cap: 8.2 (design ceiling). Content ceiling at 8.5–8.7 requires real photography, real testimonials, real address — none shipped this cycle.**

---

## Cycle 13 Verified Fixes

### Builder — Process `display:flex` (commit 675ee84) — PASS
Confirmed across all three mobile viewports. `.process__body` resolves as `flex` / `flex-direction:row`. Bar occupies left column (barLeft=24, barRight=44, barW=20px on SE; barLeft=160, barRight=208 on desktop). Inner steps resolve immediately right (innerLeft=56 on SE; innerLeft=244 on desktop). `sideBySide` test confirms bar-top matches inner-top within 0px at section entry. The "bar dominates empty viewport at section start" defect on iPhone SE is closed. Markers 01–04 visible at section entry via the left spine. No overflow anywhere (bodyScrollWidth === windowW on all four viewports).

### Spark — Services panels 04+05 clip closed (commit d32412c) — PASS
The "clipped" titles at scroll positions 0–2 in the Playwright data are offscreen panels in the horizontal scroll track (left=391, 766, 1141, 1516px) — the design-intended position. Panel 01 (visible, left=16) renders cleanly at 375px: title right=359, no clip, no truncation. Sub letter-spacing 2.34px confirms the Spark tightening took hold. SE screenshot shows clean panel entry.

### Spark — About placeholder MW wordmark — PASS
Desktop about section confirms the two-column layout with left copy col and right MW typographic mark. The Playfair italic MW at clamp(7rem,14vw,12rem) reads as genuine editorial stop. `min-height: clamp(420px,56vh,620px)` keeps the right column matched in visual weight to the copy column.

### Pixel — Process marker font floor 13px — PASS
Journey marker numerals confirmed 13px floor (0.8125rem base). Visible and legible on SE at section entry screenshot.

---

## Section-by-Section Assessment (Cycle 13 State)

| Section | Desktop | iPhone SE | iPhone 13 | Notes |
|---|---|---|---|---|
| Hero | 8.5 | 8.0 | 8.2 | Mesh + word reveal + cursor parallax remain the strongest single frame on the site |
| Stat band | 7.8 | 7.5 | 7.6 | Count-up resolved. Content ceiling cap felt here — no supporting credential |
| About | 7.6 | 6.8 | 7.0 | Placeholder MW mark holds well desktop. Mobile collapses it — left column copy-only, no visual stop. Feels sparse |
| Services | 8.3 | 7.9 | 8.1 | 5-panel scroll-lock is the strongest mechanic on the site. All panels clean |
| Industries | 7.9 | 7.5 | 7.7 | 3D flip + 8 roles per card distinctive. Minor: flip-back text density reads small at SE |
| Process | 7.2 | 6.8 | 7.0 | Flex fix confirmed. BUT: desktop right half of process section is a large empty navy void — steps column occupies only left ~30% of 1280px inner. The horizontal real estate is wasted. At SE the bar is present but the vertical rhythm of stacked steps still reads as a basic list |
| Candidates | 7.8 | 7.4 | 7.6 | Navy panel twin to Employers confirmed. Good parity. Caption "SENIOR CAREERS" legible |
| Employers | 7.8 | 7.4 | 7.6 | Structural parity with Candidates holds |
| Contact | 7.5 | 7.2 | 7.3 | mailto fallback is the terminal weakness. Trust badge present and correctly positioned |
| Footer | 7.6 | 7.0 | 7.3 | Stagger wordmark works on desktop. Footer wordmark mid-reveal visible mid-scroll (only "M" + partial letter before full render). Legibility weak during animation |

---

## Scoring Rationale

**What lifts to 8.1:** The process section flex fix is structurally correct and closes the reported iPhone SE defect. The site now reads as a coherent authored scroll journey from top to bottom with no section that actively breaks trust. The cumulative scroll vocabulary — hero exit transform, bg color shifts, line-mask H2s, 5-panel scroll-lock, 3D industry flips, process spine — is genuinely above-market for this category.

**What holds it at 8.1 rather than 8.2:** Two issues prevent the ceiling:

1. The process section desktop view is now structurally correct but visually underused. The step content sits in the left ~350px of a 1280px inner container. The right ~930px is empty navy. A real buyer at 1440 sees one step of copy in a vast black void. The flex fix solved the mobile defect but exposed the desktop dead-space as a new concern.

2. About section on mobile strips down to a single column of copy with no visual punctuation — the MW placeholder is desktop-only. A candidate or hiring manager arriving on iPhone SE sees three paragraphs of text with no brand anchor.

**Content ceiling note:** Score will not exceed 8.2 regardless of design refinements until real photography, testimonials, and a verifiable address/presence statement ship. The $40K stat and "Searches handled across the United States" copy hold as honest, but they cannot carry the trust load alone past this threshold.

---

## Top 3 Priorities — Cycle 14

### P1 — Process desktop dead-space (highest impact on score)
**File:** `/Users/modica/projects/mackai-west/style.css`
**Issue:** `.process__inner` sits in the left ~350px of a 1280px flex container at desktop, leaving the right ~930px empty navy. The step content does not use the available horizontal width. A real buyer at 1440 perceives an unfinished layout.
**Fix direction:** Expand step cards to use the full `.process__inner` width. On desktop, consider a 2-column grid inside `.process__inner` — steps 01+02 left column, steps 03+04 right column — or apply a wider max-width to the step cards and use horizontal whitespace for editorial breathing rather than an unintentional void. The vertical spine bar is the correct left anchor; the content should radiate right into the canvas.

### P2 — About section mobile visual punctuation
**File:** `/Users/modica/projects/mackai-west/style.css` — `.about__placeholder` display rule at `@media (max-width: 768px)`
**Issue:** The MW typographic mark is `display:none` on mobile. Mobile about is three paragraphs + three pillars with no brand visual stop. At 375px this reads as corporate boilerplate copy.
**Fix direction:** Introduce a mobile brand stop — either show a scaled-down version of the MW mark inline (drop `display:none` at 600px and constrain to `height: 80px`), or add a gold hairline rule + Playfair italic line above the pillar block. Do not add new content — repurpose existing elements already in the DOM.

### P3 — Footer wordmark stagger legibility
**File:** `/Users/modica/projects/mackai-west/style.css` + `index.html` — `.footer__wordmark` / `.footer__letter` stagger timing
**Issue:** On scroll-to-bottom the wordmark mid-stagger shows only "M" + partial second letter. At reading speed the wordmark never fully resolves before the user's eye has moved to nav links. The "Ma" stub reads as a broken element rather than an animation.
**Fix direction:** Reduce stagger delay from 60ms to 30ms (full 11-letter sequence completes in 330ms rather than 660ms), or set initial state to `opacity: 0.15` rather than `0` so the full wordmark shape is always hinted — the stagger then adds brightness rather than revealing from nothing.

---

## Cap Justification

The 8.2 design ceiling stands. Cycle 13 delivers a net +0.1 from closing the marquee process layout defect and the services panel clip. The site is now structurally clean across all four tested viewports. Movement from 8.2 toward the 8.5–8.7 content ceiling requires real photography (about right-column, hero background, industry cards), at least two genuine testimonials, and a verifiable office location or published presence statement.
