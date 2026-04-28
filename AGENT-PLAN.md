# Agent Plan — MacKai West Cycle 6

**Date:** 2026-04-27 (ET)
**Cycle:** 6
**Score baseline:** 7.3 (cycle 5)
**Score target this cycle:** 7.4–7.5 — pushing the 7.5 hard cap (cap holds until real photography + real testimonials + published address all land)
**Axis:** Conversion friction
**Live:** https://zed0minat0r.github.io/mackai-west/

## Dispatch Rationale

Cycle 5 closed the two worst defects (stat count-up + services double-headline) and amplified the hero mesh; site sits 0.2 below cap. Cycle 6 attacks the three concrete priorities Nigel flagged in the cycle 5 audit — sticky mobile CTA (P1 conversion-friction lift), Process step reveal (P2 — only static section left), contact placeholder line replacement (P3 — removes empty "Headquartered" text). All three achievable without any user-supplied content. Score 7.3 sits below the 8.5 polish-mode threshold, so the full Builder + Spark + Pixel + Nigel slate runs.

## Memory Rules — Echoed Into Every Agent Brief

- Apps must NOT look AI-generated. Break Claude's default patterns — editorial-luxury restraint.
- NEVER bail features on mobile via JS `matchMedia`. CSS-driven device targeting (`@media (max-width: 768px) { display: flex }`) IS the correct way to make the sticky CTA mobile-only.
- NO fabricated content (no fake names, testimonials, addresses, placement counts, "Est. 19XX" dates, fictional matchups).
- NO ghost numbers (large faded background numerals behind content) — confirmed user dislike.
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414 mobile every cycle.
- Nigel scores from real prospective customer lens. Strict cap 7.5 holds.
- Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle5-p` → `?v=cycle6-<initial>` (b for builder, s for spark, p for pixel).
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 (390) + iPhone SE (375). Single-position snapshots are NOT verification.
- **NO per-agent texting. DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER.**

## Cooldowns This Cycle (DO NOT TOUCH beyond what each priority requires)

- Hero (word reveal, parallax horizon, 3D mesh + vertex-pulse + edge-shimmer + glow) — UNTOUCHED
- Nav — DO NOT TOUCH
- Stat band (visual + count-up + threshold) — UNTOUCHED
- Marquee tape, industries (numerals + hover-reveal + 3D flip), about pillars, employers navy panel — UNTOUCHED
- Process **numerals + scroll-drawn copper line** — UNTOUCHED. Builder ADDS step reveal alongside, must NOT modify the existing line.
- Services scroll-lock (SLIDE_FRAC, IIFE, overflow CSS) — UNTOUCHED
- Candidates, footer — UNTOUCHED
- Contact floating labels + submit choreography — UNTOUCHED. Builder modifies ONLY the "Headquartered in the United States · Searches handled nationally" line per P3.

---

## Agent Slate (Execution Order)

### 1. Builder — three focused fixes (P1 + P2 + P3 from AUDIT.md cycle 6)

**P1 — Sticky mobile CTA bar.**
A fixed bar pinned to the bottom of the mobile viewport (375–768px). CSS gates it to mobile only: `display: none` at desktop, `display: flex` inside `@media (max-width: 768px)`. This is CSS-driven device targeting, NOT a JS `matchMedia` bail.

Markup: two side-by-side buttons, "Submit a search" (primary gold filled) + "Submit a resume" (outline). Both anchor to `#contact`.

Bar styling: navy background with `backdrop-filter: blur(12px)` and `-webkit-backdrop-filter`, thin gold top border (1px solid `#C9A961`), padding generous enough that tap targets are ≥44×44px. Safe-area-inset-bottom honored so it sits above iOS home indicator.

Show/hide logic (IntersectionObserver, NOT scrollY math):
- Observer #1 watches the hero CTA group. While hero CTAs are `isIntersecting`, bar stays hidden.
- Observer #2 watches `.contact`. When contact enters view, bar hides again.
- Bar is visible only between those two zones. Use a small state flag (e.g. `heroVisible`, `contactVisible`) and recompute show/hide on each callback.
- Initial state: hidden. Slide-up transition: `transform: translateY(100%) → translateY(0)` over 220ms.
- `prefers-reduced-motion`: skip the slide transition, just toggle `display`/`visibility`.

Acceptance: zero horizontal overflow at 375/390/414. Tap targets ≥44px. Bar absent on desktop. Bar hidden in hero. Bar visible in mid-page. Bar hidden when scrolled into the contact form.

**P2 — Process step reveal animation.**
Each `.process-step` starts at `opacity: 0` + `transform: translateY(28px)`. IntersectionObserver fires `.is-revealed` on the steps container (or each step individually) on entry. Single-fire — use `unobserve()` after first reveal so it does not replay on scroll back.

Stagger: each step has inline `style="--i:0"` through `style="--i:3"`. Animation-delay: `calc(var(--i) * 140ms)`. So steps animate in over ~560ms total at 140ms intervals.

`prefers-reduced-motion`: bypass the animation, set `opacity: 1` + `translateY(0)` immediately.

The existing scroll-drawn copper line above the steps STAYS untouched — this reveal sits alongside it. Do NOT modify the SVG line draw, the numerals, or the line stroke.

**P3 — Contact trust lift (no fabrication).**
Replace the line currently reading `"Headquartered in the United States · Searches handled nationally"` with `"Searches handled across the United States"` (option c — drops the empty "Headquartered in the" placeholder, keeps the honest geographic claim). No fabrication. No added phone number. No added city. No invented testimonial. One copy edit only.

**Files Builder may touch:** `index.html` (sticky CTA markup, process step `--i` style attrs, contact line copy), `style.css` (sticky bar CSS + media query gating + process reveal keyframes), `main.js` (two IntersectionObservers for sticky bar + one for process steps). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle6-b`.

**Files Builder must NOT touch:** every other section listed under Cooldowns. The hero mesh structure / vertex-pulse / edge-shimmer / glow. The services scroll-lock IIFE / SLIDE_FRAC / overflow CSS. The stat observer JS. Nav. Stat band. Industries flip. About pillars. Employers panel. Candidates cream. Footer wordmark + progress rule. Contact floating labels + submit choreography (only the "Headquartered" line).

**Memory rules to respect:** No JS matchMedia bail (CSS device targeting only). No fabricated content. No ghost numbers. Regenerate style.min.css. Bump cache-buster to `?v=cycle6-b`. Playwright ≥5 positions across all 3 viewports. **DO NOT call mcp__plugin_imessage_imessage__reply. DO NOT TEXT THE USER.**

**Commit format:** `builder cycle 6: sticky mobile CTA + process step reveal + contact line — <verification line>`

---

### 2. Spark — Frame B polish on the new sticky CTA bar + one other recently-shipped section

**Scope:** Frame B only. Refine spacing, button rhythm, border weight, gap balance, type sizing on the freshly-shipped sticky CTA bar so it reads editorial-restraint, not bolted-on. Then sweep ONE other recently-shipped section that needs typography love (e.g. process step reveal copy hierarchy, or the contact details block now that the geographic line was simplified). Do not touch more than two sections this cycle.

**Frame B rule:** keep content count. Do NOT strip bullets, do NOT remove sub-labels, do NOT consolidate. Refine spacing, leading, weight, micro-easing only. Replace-when-adding (no piling on a second decorative layer).

**Files Spark may touch:** `style.css` (sticky bar polish + chosen second section refinement). `main.js` only if a micro-timing easing in the process reveal stagger needs adjustment — refinement only, not restructure. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle6-s`.

**Files Spark must NOT touch:** every section listed under Cooldowns. The sticky CTA show/hide JS observers (Builder owns logic; Spark only refines visual rhythm). The process reveal observer (refine keyframes / easing only). Hero mesh / vertex-pulse / edge-shimmer / glow. Services scroll-lock. Stat. Nav.

**Memory rules to respect:** Frame B keeps content count. Spark replaces when adding, never piles on. Apps must NOT look AI-generated. Unique design — break Claude's default patterns. Regenerate style.min.css. Bump cache-buster to `?v=cycle6-s`. Playwright ≥5 positions across all 3 viewports. **DO NOT call mcp__plugin_imessage_imessage__reply. DO NOT TEXT THE USER.**

**Commit format:** `spark cycle 6: Frame B — sticky CTA polish + <second section refinement> — <verification line>`

---

### 3. Pixel — Mobile audit (sticky CTA + process reveal + standing 375/414 alignment sweep)

**Scope:**
1. **Sticky CTA verification at 375 + 390 + 414:**
   - Bar absent at desktop 1440 (display:none confirmed).
   - Bar hidden while hero CTAs are visible.
   - Bar reveals once hero CTAs leave viewport.
   - Bar hides again when contact section enters view.
   - Tap targets ≥44×44px on both buttons.
   - Zero horizontal overflow introduced (docWidth = winWidth).
   - Safe-area-inset-bottom respected (bar not clipped by iOS home indicator).
2. **Process step reveal verification:**
   - Each of the 4 steps fades up + translates from 28px to 0 on viewport entry.
   - Stagger visible (140ms between steps).
   - Single-fire (does not replay on scroll back).
   - prefers-reduced-motion respected (steps appear immediately under that media query).
   - Existing copper line draw still works untouched.
3. **Standing center-alignment audit at 375 + 414** — hero CTAs, stat band, services panel headlines, industries cards, about pillars, candidates section, employers panel, footer wordmark — all center-align cleanly at both viewports.
4. **Full overflow audit:** docWidth must equal winWidth at 375, 390, 414. No horizontal scroll anywhere.
5. **Tap target audit:** every interactive element ≥44×44px on mobile.

**Files Pixel may touch:** `style.css` for mobile-only fixes (≤480px or ≤768px breakpoints) — alignment, font-size floors, tap-target padding, sticky bar layout patches if a defect surfaces. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle6-p`. Otherwise pure verification commit.

**Files Pixel must NOT touch:** desktop styles outside the standing audit scope. Any structural HTML. Any section listed under Cooldowns at desktop scope. The sticky bar JS observer logic (file a regression for Builder if logic is wrong).

**Memory rules to respect:** Pixel must always audit center-alignment consistency on mobile (standing rule). Tap targets ≥44px. 13px font floor. NEVER bail features on mobile via matchMedia. No fabricated content. Regenerate style.min.css. Bump cache-buster to `?v=cycle6-p`. Playwright ≥5 positions across iPhone SE + iPhone 13 + desktop 1440. **DO NOT call mcp__plugin_imessage_imessage__reply. DO NOT TEXT THE USER.**

**Commit format:** `pixel cycle 6: sticky CTA mobile audit + process reveal verify + 375/414 alignment sweep — <verification line>`

---

### 4. Nigel — Re-score, write cycle 7 priorities, append SCORES.log

**Scope:**
- Score the live site from a real prospective buyer's 90-second scroll: a Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Tax Manager deciding whether to submit a resume.
- Strict cap 7.5 until real photography + real testimonials + verifiable street address all land. Cycle 6 target: 7.5 if all three priorities (P1, P2, P3) verified live and clean. 7.4 if two of three. 7.3 hold if regressions persist.
- Write **AUDIT.md cycle 7 top-3 priorities** — concrete, ranked, with acceptance criteria. Do NOT recommend removing any glow / animation / effect (standing rule). Only add or improve.
- Append one line to `SCORES.log`: `cycle 6: <score> (Δ <delta>) — <one-line summary>`
- Append one Nigel entry to `CHANGELOG-AGENT.md`.

**Files Nigel may touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.

**Files Nigel must NOT touch:** `index.html`, `style.css`, `style.min.css`, `main.js`. Nigel does not build — Nigel scores.

**Memory rules to respect:** Nigel scores stricter (real-user perspective, sites start ~5.5 not 7+). Nigel never recommends removing quality features. Strict 7.5 cap. Respectful tone — never call user a bottleneck. No fabricated content recommendations. No ghost numbers. **DO NOT call mcp__plugin_imessage_imessage__reply. DO NOT TEXT THE USER.**

**Commit format:** `nigel cycle 6: re-score <score> — <one-line summary>`

---

## Verification gate before Nigel scores

After Builder + Spark + Pixel ship, the live site must show on Playwright:
- Desktop 1440: sticky CTA bar absent (display:none).
- iPhone SE 375 + iPhone 13 390 + 414: sticky bar hidden in hero, visible mid-page, hidden in contact.
- Sticky bar tap targets ≥44px, zero horizontal overflow at 375/390/414.
- Process steps fade+translate up with 140ms stagger on viewport entry; single-fire; prefers-reduced-motion bypassed cleanly.
- Existing scroll-drawn copper line in process section unchanged.
- Contact details block reads "Searches handled across the United States" (no "Headquartered" string anywhere).
- 375 + 414: center-alignment consistent across all sections, no horizontal overflow, all tap targets ≥44px.

If any of these fail, the failing agent re-runs before Nigel scores.
