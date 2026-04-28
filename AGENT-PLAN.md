# Agent Plan — MacKai West Cycle 8

**Date:** 2026-04-27 (ET)
**Cycle:** 8
**Score baseline:** 7.5 (cycle 7) — AT THE CAP
**Score target this cycle:** 7.5 plateau (cap holds; +0.0 expected, +0.1 ceiling only if both P2 + P3 land cleanly and P1 actually needed a fix)
**Axis:** Minor polish AT the cap — three tight scoped fixes
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Dispatch Rationale

Cycle 7 closed every outstanding correctness defect and the site reached the 7.5 cap for the first time. Cycle 8 is a polish-mode pass on Nigel's three residuals — none structural. Score-gate triggers polish-mode at ≥ 8.5; we're at 7.5, so the standard 4-agent slate runs but Builder is doing tight scoped fixes only (no feature growth). Spark is conditional — skip if Builder doesn't introduce a new visible element. Pixel verifies. Nigel re-scores. The cap will not lift this cycle: real photography + verified testimonials + published office address remain user-side blockers.

---

## Memory Rules — Echoed Into Every Agent Brief

- Apps must NOT look AI-generated. Editorial-luxury restraint (Heidrick / Russell Reynolds register).
- NEVER bail features on mobile via JS `matchMedia`. CSS @media is fine; JS feature-bail is a regression.
- NO fabricated content (no fake names, photos, testimonials, addresses, placement counts).
- NO ghost numbers (large faded background numerals behind content).
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414 mobile every cycle.
- Nigel scores from real prospective customer lens. Strict cap 7.5 holds.
- Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle7-<x>` → `?v=cycle8-<initial>` (b/s/p).
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 (390) + iPhone SE (375). Single-position snapshots are NOT verification.
- **NO per-agent texting. DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

---

## Cooldowns This Cycle (DO NOT TOUCH beyond what each priority requires)

- Hero (word reveal, parallax horizon, 3D mesh + vertex pulse + edge shimmer + glow ::before) — UNTOUCHED
- Nav — DO NOT TOUCH
- Stat band, marquee tape, industries, employers navy panel, services scroll-lock, candidates, magnetic underlines — UNTOUCHED
- About pillars structural content — only ADD photo-slot panel per P1 if a real gap exists; do not restructure pillars
- Process (numerals + line + scroll-draw + step reveal + stagger + ease) — UNTOUCHED
- Footer wordmark structure — UNTOUCHED; only adjust mobile per-letter stagger timing per P3
- Contact floating labels structure + submit choreography + trust badge — UNTOUCHED; only align select label size per P2
- Mobile font floor + tap targets, sticky mobile CTA — UNTOUCHED

---

## Agent Slate (Execution Order)

### 1. Builder — All 3 priorities, tight scoped fixes

**P1 — About right-column layout gap.** First verify with Playwright at desktop 1440: does the right column of `.about__inner` (where `.about__pillars` sits since cycle 2 removed the photo group) currently have empty visual space, or do the pillars fill cleanly? If they fill, P1 is a non-issue Nigel misread — report and skip. If a real gap exists, prefer in this order: (a) widen `.about__pillars` max-width OR adjust `grid-template-columns` to give pillars more visual weight; (c) add a subtle wordmark watermark / atmospheric element to fill space; (b) lowest preference — a structured "photography coming soon" panel (navy bg, monogram, italic caption, gold hairline border) IF and only if pillars genuinely cannot fill. **NO stock photography. NO fabricated people. NO fabricated locations.**

**P2 — Select label font alignment.** `.form-group--select label` currently 13.12px (0.82rem) vs `.form-group--float label` at 14.08px (0.88rem). Bump `.form-group--select label` to 0.88rem so all 5 contact form labels render at the same computed size on desktop AND mobile.

**P3 — Footer stagger mobile timing.** 11 letters × 60ms = 660ms total may complete imperceptibly on iPhone SE. Add a CSS `@media (max-width: 480px)` override that reduces the per-letter delay to 40ms (total 440ms). **CSS @media is acceptable — this is NOT a JS matchMedia bail.** Desktop timing must be unchanged.

**Files Builder may touch:** `index.html` (only P1 if option (b) panel is needed), `style.css` (P1 grid/max-width OR new panel styles, P2 select label size, P3 mobile @media stagger override), `main.js` (only if P3 needs to read the per-letter delay from CSS variable — prefer pure CSS solution). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle8-b`.

**Files Builder must NOT touch:** every section under Cooldowns. Hero. Nav. Stat. Marquee. Industries. Employers panel. Services scroll-lock. Process. Candidates. Magnetic underlines. Sticky CTA. Footer wordmark structure (only the mobile per-letter delay value). Contact form structure beyond the select label size.

**Memory rules to respect:** No fabricated content (no stock photos, no invented people for P1). No matchMedia JS bail (CSS @media is fine for P3). No ghost numbers. Apps must NOT look AI-generated. Respectful tone. Regenerate `style.min.css`. Bump cache-buster. Playwright ≥5 positions × 3 viewports. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `builder cycle 8: about right-col <verify/fix> + select label 0.88rem + footer mobile stagger 40ms — <verification line>`

---

### 2. Spark — Frame B polish, CONDITIONAL on Builder shipping a new visible element

**Scope:** If Builder's P1 introduced a new structured element (option (b) photo-slot panel or option (c) watermark), Frame B refine its spacing/typography/micro-rhythm. If P1 resolved by widening pillars or P1 was a non-issue, **SKIP this cycle** and append `spark cycle 8: skipped — no new element to refine` to `CHANGELOG-AGENT.md` only. Do not manufacture polish on cooldown sections. Frame B keeps content count.

**Files Spark may touch (conditional):** `style.css` for the new P1 element only. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle8-s`.

**Files Spark must NOT touch:** every section under Cooldowns. Builder's P2 select label. Builder's P3 footer mobile stagger. Anything Spark already polished in cycles 6/7 (sticky CTA gold ghost border, process step soft-spring ease, contact badge dot-pulse, hero vertex-pulse + edge-shimmer + radial glow).

**Memory rules to respect:** Frame B keeps content count. Spark replaces when adding, never piles on. Simplicity over polish. Apps must NOT look AI-generated. Unique design. No fabricated content. No ghost numbers. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format (if running):** `spark cycle 8: Frame B <element> — <verification>`
**Commit format (if skipping):** changelog line only, no commit needed beyond it.

---

### 3. Pixel — Verify all 3 priorities + standing 375/414 alignment sweep

**Scope:**
1. **P1 about right-column verification at desktop 1440:** confirm no awkward layout gap. If Builder shipped a new panel/watermark, confirm it renders cleanly without overflow, no AI-default-card look.
2. **P2 select label alignment at desktop 1440 + iPhone 13 + iPhone SE:** all 5 contact form labels report the same computed `font-size`. None below 13px on mobile.
3. **P3 footer mobile stagger visibility on iPhone SE (375):** scroll to footer, capture IntersectionObserver firing, confirm letters arrive visibly in sequence (per-letter delay reads as 40ms × 11 = 440ms total, not 660ms). Desktop stagger timing unchanged.
4. **Standing center-alignment audit at 375 + 414** — every section reads cleanly aligned.
5. **Full overflow audit:** docWidth equals winWidth at 375, 390, 414.
6. **Tap target audit:** every interactive element ≥ 44 × 44 px on mobile.

**Files Pixel may touch (only if verification reveals a defect):** `style.css` mobile-only fixes (≤480px or ≤768px breakpoints). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle8-p`.

**Files Pixel must NOT touch:** desktop styles outside standing audit scope. Structural HTML. Anything under Cooldowns at desktop scope. JS observer logic (file regression for Builder if wrong).

**Memory rules to respect:** Pixel always audits center-alignment at 375 + 414. Scroll-test (≥5 positions, not single snapshots). Tap targets ≥ 44 px. 13 px font floor. NEVER bail features on mobile via matchMedia. No ghost numbers. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `pixel cycle 8: verify about right-col + select label alignment + footer mobile stagger 40ms — <pass / fix-list>`

---

### 4. Nigel — Re-score, write cycle 9 priorities, append SCORES.log

**Scope:**
- Score from a real prospective buyer's 90-second scroll lens (Tax Practice Leader on a $40K retained search; Senior Tax Manager deciding whether to submit a resume).
- Strict cap 7.5 holds. Cycle 8 expected: 7.5 plateau (Δ +0.0) or 7.6 ceiling (Δ +0.1) only if select label hierarchy + footer mobile stagger improvements genuinely lift perceived polish AND P1 was a real fix not a non-issue.
- Write **AUDIT.md cycle 9 top-3 priorities** — concrete, ranked, with acceptance criteria. Do NOT recommend removing any glow / animation / effect.
- Append one line to `SCORES.log`: `cycle 8: <score> (Δ <delta>) — <one-line summary>`.
- Append Nigel entry to `CHANGELOG-AGENT.md`.

**Files Nigel may touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.

**Files Nigel must NOT touch:** `index.html`, `style.css`, `style.min.css`, `main.js`. Nigel does not build — Nigel scores.

**Memory rules to respect:** Nigel scores stricter (real-user perspective). Nigel never recommends removing quality features. Strict 7.5 cap. Respectful tone — never call user a bottleneck. No fabricated content recommendations. No ghost numbers. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `nigel cycle 8: re-score <score> — <one-line summary>`

---

## Verification gate before Nigel scores

After Builder + (conditional Spark) + Pixel ship, the live site must show on Playwright:
- About right column at desktop 1440: either pillars fill cleanly, OR new element renders cleanly without AI-default-card register.
- All 5 contact form labels render at the same computed `font-size` at desktop and mobile. No element below 13 px floor.
- Footer wordmark stagger on iPhone SE: per-letter delay reads as 40 ms (total ~440 ms) — perceptibly sequential. Desktop unchanged.
- 375 + 414: center-alignment consistent, zero horizontal overflow, tap targets ≥ 44 px, fonts ≥ 13 px.
- `style.min.css` regenerated after every CSS edit.
- Site does NOT look AI-generated — Heidrick / Russell Reynolds editorial restraint holds.

If any fail, the failing agent re-runs before Nigel scores.

---

## Cap-lifting conditions (unchanged)

- Real photography of leadership / office / brand
- Verified testimonials with attribution
- Published office address

When all three land simultaneously, expected score range: 7.8–8.1.
