# Cycle 13 Agent Plan — MacKai West

**Date:** 2026-04-28
**Current score:** 8.0 (Nigel cycle 12). Design ceiling 8.2 / content-unlocked ceiling 8.5–8.7.
**Live:** https://zed0minat0r.github.io/mackai-west/
**Cache-buster baseline:** `?v=journey-sticky` — every CSS-touching agent must bump it (e.g. `cycle13-b`, `cycle13-s`, `cycle13-p`).

---

## Dispatch Order (4 agents, sequential, each commits before next)

### 1. Builder — Process section START layout fix (NEW issue from user screenshot)

**Scope (tight):**
- File: `style.css` around line 1756–1786 (`.process__body` + `.process__inner` + `.process__journey-bar`).
- Convert `.process__body` from block to `display: flex; gap: clamp(16px, 3vw, 36px); align-items: flex-start;` so the gold journey bar lives in the LEFT column and the steps grid (`.process__inner`) lives in the RIGHT column laterally instead of vertically stacked.
- Remove the `padding-left: clamp(52px, 5vw, 72px)` indent on `.process__inner` — no longer needed once the bar isn't in normal flow above it.
- Remove the `margin-left: clamp(24px, 5vw, 60px)` on `.process__journey-bar` — flex parent handles horizontal placement now.
- Verify `position: sticky` continues to work inside the flex container (sticky inside flex is fine in modern browsers — confirm with mid-runway scroll capture).
- At ≤768px breakpoint, decide whether the bar stays as a left flex column or stacks above with reduced height — whichever keeps step content visible at section start on iPhone SE 375. Test BOTH options and pick.
- After CSS edit: `npx clean-css-cli -o style.min.css style.css` AND bump `index.html` cache-buster to `?v=cycle13-b`.

**Verification (RULE 3):** Playwright at 1440×900, iPhone 13 (390×664), iPhone SE 375×667. Sample at 5%, 25%, 50%, 75%, 95% of `.process` section. Assert at section start (5%): step content is visible inside viewport, not pushed below an empty bar. Assert at mid (50%): journey bar still pinned at top: clamp position. Assert at end (95%): bar disappears as section exits, no bleed into Candidates.

**Memory rules they MUST respect:**
- RULE 1: DO NOT call `mcp__plugin_imessage_imessage__reply`. Return result as text only.
- RULE 4: Never collapse to vertical stack via matchMedia bail to "make it work on mobile." Pick one consistent flex layout that works at all three viewports.
- RULE 5: Regenerate `style.min.css` after the edit. Non-negotiable.
- RULE 6: Bump cache-buster to `?v=cycle13-b`.

**Forbidden:** Everything in the cooldown list (hero anything, nav, stat band visuals, marquee tape, industries, employers, services scroll-lock structure, candidates panel navy, contact, footer, magnetic underlines, mobile font floor, sticky mobile CTA, line-mask H2 reveal, section bg color shift). DO NOT touch the process numerals / scroll-drawn copper line / step reveal stagger — only the LAYOUT CONTAINER (`.process__body` / `.process__inner` / bar positioning).

**Commit before next agent runs.**

---

### 2. Spark — Services panels 04 / 05 iPhone SE clip + About right-column vertical fill (P1 + P2)

**Scope (two tight surgical changes — NO new section invention this cycle):**

**P1 — Services panels 04/05 iPhone SE clip fix.**
- File: `style.css` around line 1198 (`.service-fp`) and the `@media (max-width: 600px)` block around line 2796–2818.
- Symptom: panels 04 (F&A Industry) and 05 (Corporate Tax & Treasury) clip headings/sub-labels at the right edge during horizontal scroll-lock at 375px.
- Fix path A (PREFERRED): tighten `.service-fp` mobile horizontal padding further from `clamp(20px, 5vw, 40px)` to `clamp(14px, 4vw, 28px)` AND tighten `.service-fp__inner` `max-width` on mobile (currently 600px desktop default — set explicit narrower max-width inside the mobile media query, e.g. `max-width: 100%; padding-right: 4px;`).
- Fix path B (combine if A insufficient): drop `.service-fp__title` mobile font from `clamp(1.7rem, 7vw, 2.4rem)` to `clamp(1.55rem, 6.4vw, 2.15rem)` AND drop `.service-fp__sub` letter-spacing on mobile from 0.26em to 0.18em — both buy horizontal room without restructuring.
- DO NOT change SLIDE_FRAC, DO NOT remove panels, DO NOT collapse to vertical stack on mobile.

**P2 — About right-column vertical fill.**
- File: `style.css` around line 1009 (`.about__placeholder`).
- Symptom: at 1440 desktop, placeholder ~280px min-height against ~600px+ left copy column = visible empty cream below the navy block.
- ADD only — do not restructure. Pick ONE of:
  - Bump `min-height` from 280px to a column-matching value via `min-height: clamp(420px, 56vh, 620px);` and let `flex-grow: 1` close the rest.
  - Add a second internal element inside `.about__placeholder`: a typographic fill (Playfair italic "MW" repeated mark at 0.06–0.08 opacity, vertically distributed) — must be a deliberate brand artifact, NOT a ghost number (no-ghost-numbers memory), so use letterforms, not digits.
- The mobile `display: none` rule at line 2647 stays untouched.

**Reference vibes:** Heidrick & Struggles editorial restraint for the typographic fill; Korn Ferry practice-card padding rhythm for the services tighten. Frame B refinement only — refine spacing/typography, never strip content count (Spark Frame B richness rule).

**Verification (RULE 3):** Playwright at 1440×900, iPhone 13, iPhone SE. For services: sample 5pos through `.services` runway at 375px and assert no `.service-fp__title` or `.service-fp__sub` clips beyond `clientWidth`. For about: capture 1440 desktop screenshot showing right column visually balanced against left copy column.

**Memory rules they MUST respect:**
- RULE 1: DO NOT text the user.
- RULE 2: Execute "category-leading services + balanced about" at full intensity. Do not invent throttle vocabulary like "subtle" / "considered" — refine for legibility, not restraint-for-restraint's-sake.
- RULE 5 + 6: Regenerate `style.min.css`, bump cache-buster to `?v=cycle13-s`.
- "No ghost numbers" memory: if using a typographic fill in the about placeholder, use LETTERS (MW, italic Playfair), NOT large faded digits.
- "Replace when adding" / "no piling on": don't layer new glow/rule effects on services or about — just adjust the existing padding/sizing/min-height.

**Forbidden:** Everything in the cooldown list. DO NOT touch services scroll-lock JS, SLIDE_FRAC, dot timeline, panel count, panel order. DO NOT restructure about pillars, about seal, about copy column, about placeholder structure (only ADD vertical fill / adjust min-height per P2).

**Commit before next agent runs.**

---

### 3. Pixel — Mobile alignment audit + Process layout regression gate

**Scope:**
- Audit at iPhone 13 (390×664) AND iPhone SE 3rd gen (375×667). Pixel always covers 375 + 414 mobile per memory.
- Verify Builder's process flex-layout fix didn't introduce horizontal overflow or broken sticky behavior.
- Verify Spark's services 04/05 padding tighten actually closed the iPhone SE clip (re-run mid-runway 5-position sample on services scroll-lock).
- Verify about placeholder vertical fill renders correctly at 375 (where placeholder is `display: none` on mobile — confirm rule still applies and no leak-through).
- Center-alignment audit on every section per the standing Pixel directive in MEMORY.md (`feedback_pixel_alignment.md`). Tap targets ≥44px.
- Capture screenshots at section start + section middle + section exit for: Hero, Services panel 04, Services panel 05, Process (NEW LAYOUT), About.

**If Pixel finds regressions, fix only the specific CSS that regressed — DO NOT touch features outside the cycle 13 scope.**

**Memory rules they MUST respect:**
- RULE 1: DO NOT text the user. Return findings only.
- RULE 3: Mid-runway scrolling at 5+ positions × 3 viewports. No single-snapshot verification.
- RULE 4: If a viewport breaks, fix the CSS/JS mismatch — never matchMedia-bail.
- RULE 5 + 6 if any CSS change made: regenerate `style.min.css`, bump cache-buster to `?v=cycle13-p`.
- Pixel alignment focus: center-alignment consistency on mobile is the primary lens.

**Forbidden:** Adding new features, modifying the cooldown list, recommending feature removal.

**Commit before next agent runs.**

---

### 4. Nigel — Re-audit + Cycle 13 score (final scoring agent)

**Scope:**
- Score from a real prospective customer's lens (Tax Senior Manager candidate / Construction CFO hiring leader). Strict cap.
- Design ceiling 8.2 / content-unlocked ceiling 8.5–8.7 per cycle 12 audit. Without real photography + testimonials + published address, the cap stays at 8.2.
- Write AUDIT.md current state (no history). Append SCORES.log line: `cycle 13: <score> (Δ <delta>) — <one-sentence summary>`.
- Identify cycle 14 top-3 priorities.

**Memory rules they MUST respect:**
- RULE 1: DO NOT text the user.
- "Nigel never removes quality" (`feedback_nigel_no_removal.md`): NEVER recommend removing glows / animations / 3D effects / scroll mechanics. Only ADD or IMPROVE.
- "Nigel must score stricter" (`feedback_nigel_stricter.md`): score from a real user's perspective, not feature inventory inflation.
- RULE 7: No fabricated content recommendations. If suggesting copy, it must be honest brand voice, not invented specifics (no fake placement counts, no fake firm names, no fake testimonials).
- "Respectful tone" (`feedback_respectful_tone.md`): if Formspree endpoint still missing, frame as "still needs your endpoint URL," not "user has not supplied" or "blocker."

**Forbidden:** Recommending the removal of any feature in the cooldown list. Recommending fabricated content as a fix path.

**Commit AUDIT.md + SCORES.log before exit.**

---

## Rationale (one line)

Cycle 12 broke the 7.7–7.8 ceiling at 8.0; cycle 13 is targeted defect-closure (process start layout, services SE clip, about vertical fill) — no new sections, no new mechanics — to lock in 8.0 as the floor and protect the ceiling with surgical Frame-B refinement before the next content unlock.

## Ownership map

- **Process section START layout fix (NEW):** Builder (it's CSS structural — flex container conversion + sticky verification, not just alignment). Pixel will regression-gate after.
- **P1 services panel clip (iPhone SE):** Spark (Frame B padding/typography refinement).
- **P2 about right-column vertical fill:** Spark (additive Frame B fill, same agent for cohesion with services).
- **P3 Formspree endpoint:** SKIP — user-blocked. Document in audit, do not dispatch.
- **Final Nigel re-audit:** Agent 4, scores cycle 13 and writes AUDIT.md + SCORES.log.

## Score gate

Current score 8.0 is below the 8.5 polish-mode threshold, so Builder + Spark are still in scope this cycle (not just QA + Pixel). Once a future cycle reaches ≥ 8.5, switch to polish-mode (QA + Pixel + Accessibility only).

## Convergence check

Last 4 changelog/git entries show real commits (6b3cf91, 9f42ebd, b9e9bbe, 54484d2) — loop is healthy, not stuck. Proceed.
