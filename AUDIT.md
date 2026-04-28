# MacKai West — Audit Report

## Cycle 11 Score: 7.7 / 10 (Delta: +0.1 from 7.6)

**Summary:** The about placeholder panel resolves the forgotten-layout-element signal without hiding the absence; the mobile panel proportion fix closes the iPhone SE stranded-mark defect. Both changes are correct and executed cleanly. The site moves to 7.7, the lower bound of the design ceiling. Cap holds.

---

## Axis: Photography Absence Management

Audit lens: as a hiring director or senior Tax/F&A candidate landing cold, does the about section now communicate deliberate pre-launch framing, or does it still read as an unfinished site? Does the mobile mid-scroll experience in Candidates/Employers feel proportionate?

---

## What Landed This Cycle (Cycle 11 commits)

**df019ea builder cycle 11** — About placeholder panel: navy background (`var(--navy)`), 1px gold hairline border at 30% opacity, 56px MW monogram circle (gold border, Playfair italic, 1.04rem), Playfair italic caption "Studio photography forthcoming" at 0.04em letter-spacing, min-height 180px, margin-top clamp(32–48px). Mobile candidates/employers min-height reduced from 420px to 220px at ≤600px breakpoint with restored column-stacking and tighter padding. Builder commit is technically complete.

**b4a9693 spark cycle 11** — Frame B caption polish: letter-spacing 0.02em → 0.04em. Minimal and correct — aligns caption rhythm with editorial typography elsewhere on the page.

**d4a6ec8 pixel cycle 11** — Full verification pass. Placeholder confirmed at expected positions across 3 viewports. Mobile panel proportion fix confirmed. No CSS defects found.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Unchanged. Count-up clean. |
| About | 7.6 | Up from 7.5. Placeholder panel adds vertical substance below the pillars. Still a pre-launch signal, but now a managed one. |
| Services | 7.8 | Unchanged. Horizontal scroll-lock verified clean. |
| Industries | 7.2 | Unchanged. |
| Process | 7.5 | Unchanged. |
| Candidates | 7.5 | Up from 7.4. Mobile proportion fix resolves the iPhone SE stranded-mark defect. |
| Employers | 7.3 | Up from 7.2. Mobile proportion fix applies equally. |
| Contact | 7.4 | Unchanged. Mailto fallback remains the terminal defect. |
| Footer | 7.3 | Unchanged. |

---

## About Placeholder Assessment

**Does it resolve the pre-launch signal cleanly?**

Partially. The placeholder is executed correctly: navy background visually anchors the right column, the gold hairline border gives the panel deliberate structure, the 56px MW monogram circle is on-brand and restrained, and the Playfair italic caption is typographically coherent with the site system.

However, the explicit caption text "Studio photography forthcoming" is a double-edged choice. It is honest — better than a stock image — but it tells a cold buyer directly that the firm's site is not finished. A hiring director evaluating MacKai West against Russell Reynolds or Heidrick & Struggles will read this as a negative trust signal. The about section is the firm identity statement, positioned second after hero + stat band. Announcing missing photography in that position costs credibility even when the framing is polished.

The net result: the panel moves from "forgotten layout element" to "managed pre-launch framing." That is real progress and earns the increment. It does not close the gap with competitors who have actual photography in place.

**What would close the gap:** Real photography is the only answer. An alternative holding treatment that does not announce the absence (abstract architectural texture at low opacity, or a typographic pattern fill without explanatory text) would reduce the trust cost while still deferring the image. The current approach is the right call given honesty constraints; it is the best available move at this stage.

---

## Mobile Panel Proportion Assessment

**Does the min-height 220px fix improve the mid-scroll experience perceptibly?**

Yes. The 420px → 220px reduction at ≤600px is a meaningful structural change. At 220px min-height with the column-restored mark (For / Candidates stacked vertically, not horizontal), the panel now reads as a proportionate header bar. The mark should be visible without excessive blank navy above it at iPhone SE (375px).

The `justify-content: flex-start` combined with `padding: clamp(28px, 7vw, 44px)` pulls the mark toward the top of the panel rather than centring it within an over-tall block. This is the correct approach — the mark anchors the top and the copy section begins immediately below the panel fold.

The `clamp(28px, 7vw, 44px)` top padding evaluates to approximately 26px at 375px, which is correct. The mark at stacked column layout with "For" at clamp(1.1rem, 4.5vw, 1.5rem) ≈ 16.9px and "Candidates" at clamp(2rem, 8.5vw, 2.8rem) ≈ 31.9px plus the gold rule and 13px caption will occupy roughly 90–100px of the 220px panel — proportionate.

---

## Cap Assessment

Score moves to **7.7** — the lower bound of the design ceiling established in cycle 10. Both cycle 11 changes earned their fraction: the placeholder resolves a flagged issue without fabricating content, and the mobile proportion fix closes a real defect.

**Cap conditions still unmet:**
1. No real photography. The placeholder is the best honest treatment; it is not a substitute.
2. No verified testimonials or named case studies.
3. No published office address or location signal.

These three conditions remain required for scores above 7.8. The site is at the ceiling's floor. The next half-point requires real content, not further UI polish.

**Design ceiling:** 7.7–7.8. The site cannot score above this on UI/UX work alone. The next meaningful score movement requires the user to supply photography and at least one verifiable proof point (testimonial or named placement outcome).

**Expected range when photography + testimonials + address land:** 7.9–8.2.

---

## What Works (5 bullets)

- **About placeholder is the right design decision** — A navy panel with gold hairline and MW monogram is coherent with the site's brand system. It fills the visual gap with intentional structure rather than leaving an orphaned layout column. The Playfair italic caption at 0.04em is in register with the typographic system elsewhere. The execution is clean.
- **Mobile proportion fix is a genuine UX improvement** — Reducing from 420px to 220px at 375–600px and restoring column stacking removes the stranded-mark defect that was flagged in cycle 10. The panel now reads as a proportionate editorial header on the most constrained viewport.
- **Both panels now have symmetrical mobile treatment** — Candidates and Employers receive the same 220px min-height, same column-restore, same padding clamp at ≤600px. The mobile system is now internally consistent.
- **No regressions** — All interactions from prior cycles verified intact by Pixel. Services scroll-lock, sticky CTA, process stagger, form labels, footer stagger, stat count-up all remain functional.
- **Honest pre-launch framing beats fabrication** — The caption "Studio photography forthcoming" is explicit and honest. Given the standing instruction not to fabricate content, this is the correct approach. It manages expectations without inventing false specifics.

---

## What's Still Off (5 bullets)

- **"Studio photography forthcoming" announces the absence rather than masking it** — Honest, yes. But a cold hiring director sees this as "the firm is not ready." The panel resolves the layout gap; the caption text creates a different kind of trust deficit. An alternative holding treatment without explicit absence-announcement would be stronger.
- **Contact form mailto fallback remains the terminal conversion defect** — Submit opens the OS email client. The spinner → checkmark in-page choreography never fires. This is the highest-priority functional defect on the site and has been open since cycle 5.
- **$40K stat remains the only quantitative trust signal** — No testimonials, no case studies, no named outcome. For a firm charging $40K per search, a cold buyer needs more than one data point before submitting a search request.
- **No location signal** — "Searches handled across the United States" is accurate but thin. For executive search at this fee level, a buyer typically wants to know where the firm is headquartered. The absence is felt even when it cannot be fabricated.
- **Design ceiling is now a hard wall** — The site is at 7.7. Further UI/UX cycles will produce diminishing returns. The next increment requires the user to supply real content. Agent loops that continue without that input risk chasing fractions without moving the needle.

---

## Cycle 12 Top-3 Priorities (Ranked)

### P1 — Contact form real endpoint
**What:** Replace mailto fallback with Formspree (free tier, no backend required). The spinner → checkmark → success choreography was purpose-built for this in cycle 4 and currently never fires.
**Acceptance criteria:** Form submission completes in-page. `.contact__success` visible after submit. No OS mail client opens. Playwright confirms the full choreography sequence fires on form submit.
**Why P1:** Every other interaction on the site routes correctly. The terminal conversion action — the entire reason the site exists — is broken. This is a functional defect, not a polish issue.

### P2 — About placeholder caption language soften
**What:** Replace "Studio photography forthcoming" with an alternative that does not explicitly announce the absence. Options: an abstract typographic line ("MW — Est. for the searches that don't close themselves"), a simple MW logotype at larger scale with a gold rule, or a minimal geometric pattern fill. The panel structure stays; only the caption text and monogram treatment change.
**Acceptance criteria:** The about right column at 1440px does not contain explicit pre-launch language. The panel reads as a deliberate brand artifact, not a construction notice.
**Why P2:** The panel structure is correct. The caption text is the trust cost. This is a one-line copy change and a minor visual adjustment.

### P3 — Industries section hover-reveal depth
**What:** The 3 industry cards (Construction / Real Estate / Manufacturing) use a slide-up navy expand panel on hover. The panel content (role archetypes, Playfair italic eyebrow, gold hairline rules) is strong in structure but the role archetype copy is thin. Adding 2–3 representative role titles per industry (honest, generic) would give the hover reveal genuine informational value rather than reading as a design gesture.
**Acceptance criteria:** Each industry card hover-reveal contains at least 3 specific role titles (e.g. "Tax Manager, Construction / Senior Accountant, Real Estate"). Content must be honest generics, not fabricated specific placements.
**Why P3:** The interaction is already built. Adding real informational value to it converts a design feature into a conversion asset.

---

*Audit completed 2026-04-27. Axis: photography absence management. About placeholder resolves the forgotten-layout signal with honest pre-launch framing; mobile proportion fix closes the iPhone SE stranded-mark defect. Score moves to 7.7, the lower bound of the design ceiling. Cap holds pending real photography + testimonials + address.*
