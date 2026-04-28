# Agent Plan — MacKai West Cycle 5

**Date:** 2026-04-27 (ET)
**Cycle:** 5
**Score baseline:** 7.1 (cycle 4)
**Score target this cycle:** 7.4 — pushing toward the 7.5 hard cap (cap holds until real photography + testimonials + address all land)
**Live:** https://zed0minat0r.github.io/mackai-west/

## Dispatch Rationale

Cycle 4 closed personality gaps but left three concrete live defects in AUDIT.md cycle 5 priorities: (P1) stat count-up shows $24K–$26K on mobile mid-fire, (P2) services scroll-lock at 375px shows two truncated headlines mid-transition, (P3) hero 3D mesh reads "tasteful but modest" against the user's explicit "impressive 3D" ask. All three are tight, scoped fixes — Builder owns all three in one pass. Spark does Frame B polish on the now-amplified mesh + recently-shipped sections (no new sections — replace-when-adding rule). Pixel verifies P1 mobile regression as the gate-fix and re-audits 375 + 414 alignment. Nigel re-scores under the strict 7.5 cap.

## Memory Rules — Echoed Into Every Agent Brief

- Apps must NOT look AI-generated. Break Claude's default patterns — editorial-luxury restraint.
- NEVER bail features on mobile via `matchMedia`. Use TOUCH detection (`'ontouchstart' in window`) only when needed.
- NO fabricated content (no fake names, testimonials, addresses, placement counts, "Est. 19XX" dates).
- NO ghost numbers (large faded background numerals behind content) — confirmed user dislike.
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414 mobile every cycle.
- Nigel scores from real prospective customer lens. Strict cap 7.5 holds.
- Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle4-p` → `?v=cycle5-<initial>` (b for builder, s for spark, p for pixel).
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 + iPhone SE. Single-position snapshots are NOT verification.
- **NO per-agent texting. DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER.**

## Cooldowns This Cycle (DO NOT TOUCH beyond what each priority requires)

- Hero word reveal, hero parallax horizon — UNTOUCHED
- Hero 3D mesh **structure** — Builder may AMPLIFY per P3 (size + vertex-pulse), NOT restructure
- Nav — DO NOT TOUCH
- Stat band copper vignette + rule — only the JS observer threshold per P1
- Marquee tape, industries (numerals + hover-reveal + 3D flip), about pillars (structural + stagger), employers navy panel, process (numerals + line + scroll-draw), services panel typography, magnetic underlines, candidates (cream gradient + copper edge), footer (wordmark stagger + progress rule), contact (floating labels + submit choreography)
- Services scroll-lock structure + IIFE skeleton — Builder may adjust SLIDE_FRAC or panel overflow CSS per P2, NOT the IIFE skeleton
- Mobile 13px font floor + tap targets

---

## Agent Slate (Execution Order)

### 1. Builder — three focused fixes (P1 + P2 + P3 from AUDIT.md)

**P1 — Stat count-up mobile regression (CRITICAL).**
At first visible frame, desktop shows $25K, iPhone 13 $26K, iPhone SE $24K. The firm's only verifiable claim is being served as a wrong number to mobile visitors. Pick approach (a) — simpler: raise the IntersectionObserver `threshold` from `0.6` → `0.95` so the count-up only triggers when the section is nearly fully in view (at that point the user's eyes are already on it, animation reads as intentional). Approach (b) — scroll-velocity detection (on observer fire, check `window.scrollY` delta over last 100ms; if >500px/s, skip animation and set textContent directly to "40K") — acceptable as fallback if (a) leaves edge cases. Acceptance: Playwright shows `$40K+` (or completed `is-counted` state) on desktop 1440 + iPhone 13 + iPhone SE at the first scroll position where the stat section is visible.

**P2 — Services scroll-lock 375px split-panel readability.**
At iPhone SE mid-transition, Panel 01 (Tax) exiting and Panel 02 (F&A) entering simultaneously expose truncated headlines fighting for width. Pick: (a) raise `SLIDE_FRAC` from `0.85` → `0.92` (sharper transition, more dwell on each panel), or (b) add `overflow: hidden` on each panel content wrapper so off-panel text does not bleed during slide. Acceptance: at any mid-transition state on iPhone SE through the services runway (sample at 5%, 25%, 50%, 75%, 95% of 240vh), only ONE complete title is readable (or both panels' fragments are clipped enough they do not compete). DO NOT use matchMedia bail. DO NOT touch the IIFE skeleton.

**P3 — Hero 3D mesh amplification.**
Current octahedron `hero__mesh-svg` reads "tasteful but modest" against the user's "impressive 3D" ask. Acceptance:
- Increase SVG viewport coverage from current ~22vw to **~32vw clamped 280–460px** on desktop (≥50% of hero right-half).
- Add **vertex-pulse animation**: each vertex circle's opacity pulses on a 3–5s cycle, **staggered between vertices** so the mesh has constant subtle motion beyond the rotation.
- Mobile (375px) headline must remain fully legible — keep the mobile mesh at **clamp 140–200px**, but pulse animation runs there too.
- DO NOT remove the existing rotation. DO NOT obscure the headline at 375px.

**Files Builder may touch:** `index.html` (only mesh wrapper sizing if needed), `style.css` (mesh size clamp + vertex-pulse keyframes + service panel `overflow: hidden` if approach (b) chosen for P2), `main.js` (stat observer threshold per P1, `SLIDE_FRAC` value per P2 if approach (a)).

**Files Builder must NOT touch:** every other section listed under Cooldowns above. The IIFE skeleton of the services scroll-lock. The hero word reveal. Nav. Stat band copper vignette CSS.

**Memory rules to respect:** No matchMedia bail. No fabricated content. No ghost numbers. Regenerate style.min.css. Bump cache-buster to `?v=cycle5-b`. Playwright ≥5 positions across all 3 viewports. **DO NOT TEXT THE USER.**

**Commit format:** `builder cycle 5: stat observer 0.95 + services SLIDE_FRAC 0.92 + hero mesh 32vw vertex-pulse — <verification line>`

---

### 2. Spark — Frame B polish on amplified mesh + recently-shipped sections

**Scope:** Frame B only. Refine the now-amplified hero mesh vertex-pulse keyframes (stagger timing, ease curve, opacity range) so the pulse reads intentional, not flickery. Then sweep recently-shipped sections (candidates cream gradient, footer wordmark stagger + progress rule, contact floating labels + submit choreography) for typography / spacing / micro-timing refinement.

**Frame B rule:** keep content count. Do NOT strip bullets, do NOT remove sub-labels, do NOT consolidate. Refine spacing, leading, weight, micro-easing only.

**Files Spark may touch:** `style.css` (vertex-pulse keyframe tuning, candidates / footer / contact spacing + leading + weight). `main.js` only if a micro-timing easing in the submit choreography or footer stagger needs adjustment — refinement only, not restructure.

**Files Spark must NOT touch:** every section listed under Cooldowns. The hero mesh **structure** (Builder amplifies; Spark only tunes the pulse keyframe). The services scroll-lock CSS / JS (Builder owns P2). The stat observer JS (Builder owns P1). Nav. Stat band copper vignette.

**Memory rules to respect:** Frame B keeps content count. Replace-when-adding (no piling on). Apps must NOT look AI-generated. Regenerate style.min.css. Bump cache-buster to `?v=cycle5-s`. Playwright ≥5 positions across all 3 viewports. **DO NOT TEXT THE USER.**

**Commit format:** `spark cycle 5: Frame B — vertex-pulse keyframe tune + candidates/footer/contact micro-timing — <verification line>`

---

### 3. Pixel — Mobile alignment + P1 regression gate-check + overflow + tap targets

**Scope:**
1. **Critical regression check:** Verify P1 (stat count-up) is actually fixed on iPhone 13 + iPhone SE — Playwright screenshot at the first scroll position where the stat is visible must show `$40K+` or the completed `is-counted` state, NOT a mid-count value. If the fix did not stick, file the regression and patch the threshold or add the velocity-skip fallback.
2. **Mobile center-alignment audit at 375 + 414** (standing user concern): hero CTAs, stat band, services panel headlines, industries cards, about pillars, candidates section, employers panel, footer wordmark — all center-align cleanly at both viewports.
3. **Full overflow audit:** docWidth must equal winWidth at 375 and 414. No horizontal scroll anywhere.
4. **Tap target audit:** every interactive element ≥44×44px on mobile. Re-verify after Builder's hero mesh amplification (any new vertex circles must not be tappable in a way that misfires).
5. **Verify P3:** mesh visibly larger on desktop 1440 (≥32vw or 280–460px clamp), and headline still fully legible at 375px.

**Files Pixel may touch:** `style.css` for mobile-only fixes (≤480px or ≤768px breakpoints) — alignment, font-size floors, tap-target padding. `main.js` only if Builder's stat observer needs the velocity-skip fallback added.

**Files Pixel must NOT touch:** desktop styles. Any structural HTML. Any section listed under Cooldowns at desktop scope.

**Memory rules to respect:** Pixel must always audit center-alignment consistency on mobile (standing rule). Tap targets ≥44px. 13px font floor. No fabricated content. Regenerate style.min.css. Bump cache-buster to `?v=cycle5-p`. Playwright ≥5 positions across iPhone 13 + iPhone SE + desktop 1440. **DO NOT TEXT THE USER.**

**Commit format:** `pixel cycle 5: P1 regression gate + 375/414 center-alignment audit + tap target sweep — <verification line>`

---

### 4. Nigel — Re-score, write cycle 6 priorities, append SCORES.log

**Scope:**
- Score the live site from a real prospective buyer's 90-second scroll: a Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Tax Manager deciding whether to submit a resume.
- Strict cap 7.5 until real photography + real testimonials + verifiable street address all land. Cycle 5 target: 7.4 if all three priorities (P1, P2, P3) verified live. 7.2–7.3 if two of three. 7.1 hold if regressions persist.
- Write **AUDIT.md cycle 6 top-3 priorities** — concrete, ranked, with acceptance criteria. Do NOT recommend removing any glow / animation / effect (standing rule). Only add or improve.
- Append one line to `SCORES.log`: `cycle 5: <score> (Δ <delta>) — <one-line summary>`
- Append one Nigel entry to `CHANGELOG-AGENT.md`.

**Files Nigel may touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.

**Files Nigel must NOT touch:** `index.html`, `style.css`, `style.min.css`, `main.js`. Nigel does not build — Nigel scores.

**Memory rules to respect:** Nigel scores stricter (real-user perspective, sites start ~5.5 not 7+). Nigel never recommends removing quality features. Strict 7.5 cap. Respectful tone — never call user a bottleneck. No fabricated content recommendations. No ghost numbers. **DO NOT TEXT THE USER.**

**Commit format:** `nigel cycle 5: re-score <score> — <one-line summary>`

---

## Verification gate before Nigel scores

After Builder + Spark + Pixel ship, the live site must show on Playwright:
- Desktop 1440 + iPhone 13 + iPhone SE: stat band shows `$40K+` (or `is-counted` state) at first visible frame.
- iPhone SE through services runway (5 positions): no two complete headlines simultaneously readable mid-transition.
- Desktop 1440: hero mesh visibly larger than cycle 4 (≥32vw or 280–460px clamp), vertex-pulse animation active.
- iPhone SE 375px: hero headline "Specialist recruitment." fully legible, mesh proportionally scaled.
- 375 + 414: no horizontal overflow, all tap targets ≥44px, center-alignment consistent.

If any of these fail, the failing agent re-runs before Nigel scores.
