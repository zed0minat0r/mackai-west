# AGENT-PLAN — MacKai West

**Cycle:** 1
**Date:** 2026-04-27
**Coordinator:** scheduling Builder → Spark → Pixel → Nigel
**Score baseline:** none yet (cycle 0 was scaffold only)
**Score cap this cycle:** 7.5 (no real photography, no real testimonials, no real address)
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## User feedback driving this cycle (verbatim)

> "It's way too basic and generic. Also the top logo is cut off"

### Thread A — Logo cut-off (REPRODUCED)
Playwright iPhone 13 (390×664) screenshot at scrollY=0 shows the MW monogram circle and "MacKai West" wordmark visibly clipped at the top edge.
- Root cause: `<meta name="viewport">` has `width=device-width, initial-scale=1.0` only — no `viewport-fit=cover`.
- `.nav` is `position: fixed; top: 0` with no `padding-top: env(safe-area-inset-top)`, so on iOS notch/dynamic-island devices the nav row sits underneath the status bar.
- Fix is two lines: (1) viewport meta `viewport-fit=cover`, (2) `.nav { padding-top: env(safe-area-inset-top); }` and increase nav height accordingly OR shift `.nav__inner` alignment.

### Thread B — "Way too basic and generic"
Cycle 0 is template-flavored. We need 2–3 distinctive scroll/interaction treatments — not all of them. Replace-when-adding rule applies.

---

## Memory rules every agent MUST respect this cycle

- Apps must NOT look AI-generated. Break Claude's default patterns.
- NO fabricated content (no fake names, no fake testimonials, no fake addresses, no fake placement counts).
- NO ghost numbers (large faded background numerals behind content — user dislikes).
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel always audits center-alignment at 375 + 414 mobile.
- Nigel scores from a real prospective employer/candidate lens, strict cap 7.5 until real photography + real testimonials + real address all land. Nigel never recommends removing glows/animations/effects.
- Respectful tone — never call user a bottleneck.
- **NO per-agent texting.** Every agent: DO NOT call `mcp__plugin_imessage_imessage__reply`. DO NOT TEXT THE USER.
- **NEVER disable a feature on mobile via matchMedia bail.** Fix the underlying CSS/JS mismatch instead.
- After every CSS edit: regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Verification: scroll through ≥5 positions on desktop 1440 + iPhone 13 + iPhone SE before claiming done.

---

## 1. Builder — Logo fix + scroll-drawn copper line through process

**Scope (do these, nothing else):**
1. **Thread A logo fix.** In `index.html` change viewport meta to `width=device-width, initial-scale=1.0, viewport-fit=cover`. In `style.css` add `padding-top: env(safe-area-inset-top, 0px)` to `.nav` and bump effective hit area so the brand never clips. Verify in Playwright at iPhone 13 (390×664) and iPhone SE (375×667) with scrollY=0 that the MW monogram circle's top edge is fully visible.
2. **Distinctiveness Thread B contribution: scroll-drawn copper line through the four-step Process section.** A vertical (or horizontal on desktop) copper SVG path that draws as the user scrolls past the section, connecting steps 01→04. Use `IntersectionObserver` + `stroke-dashoffset` animation. Must work on mobile (do NOT bail via matchMedia).
3. Regenerate `style.min.css`.

**Files to touch:** `index.html` (viewport meta + process section markup for SVG line), `style.css`, `style.min.css`, `main.js` (scroll observer for line draw).
**Files NOT to touch:** the contact form logic, the existing skyline SVG, services/industries section content.
**Verification:** Playwright sample at scrollY 0%, 25%, 50%, 75%, 95% across the process section on desktop 1440, iPhone 13, iPhone SE. Capture transform/stroke-dashoffset values, save 5 screenshots per viewport to `/tmp/builder-c1-*.png`.
**Commit message:** `builder cycle 1: fix iOS notch logo clip + add scroll-drawn copper process line`

---

## 2. Spark — Frame B polish + marquee tape divider

**Scope:**
1. **Frame B polish** of the two most generic-looking sections from cycle 0: the Stat band and the Industries grid. Refine spacing, typography rhythm, and add subtle copper-detail breaks. Keep all current bullets/copy — content count stays.
2. **Add a slow horizontal marquee tape band** between Industries and Process: typographic ribbon reading `TAX · CORPORATE FINANCE · CONSTRUCTION · REAL ESTATE · MANUFACTURING · TAX` in Playfair italic, copper on cream (or cream-on-navy variant — pick one and commit). Continuous slow loop, pauses on hover. This is the single new "feature" — do not pile on parallax, pinned slides, count-up, hover panels, etc. **Pick this one, ship it well.**
3. Regenerate `style.min.css`.

**Files to touch:** `index.html` (insert marquee section), `style.css`, `style.min.css`, `main.js` if needed for pause-on-hover only.
**Files NOT to touch:** Builder's process line, the nav, the hero skyline, services bullets.
**Forbidden:** Do NOT add count-up animation, parallax, pinned horizontal slide, hover-reveal industry panels — those are deferred. Pick the marquee, ship it.
**Verification:** Playwright at desktop 1440 + iPhone 13 + iPhone SE. Marquee must scroll smoothly on mobile too (no matchMedia bail).
**Commit message:** `spark cycle 1: marquee tape divider + Frame B polish on stat & industries`

---

## 3. Pixel — Mobile alignment audit (logo fix verification + 375/414)

**Scope:**
1. **Verify Builder's logo fix.** Capture iPhone 13 (390×664) and iPhone SE (375×667) at scrollY=0. Confirm MW monogram circle's top edge has ≥8px clearance from the viewport top.
2. **Center-alignment audit at 375 + 414** across every section: hero, stat band, about, services, industries, process (incl. new copper line), marquee, candidates, employers, contact, footer. Flag any element that is not symmetrically centered or whose left/right margins are unequal.
3. Capture screenshots to `/tmp/pixel-c1-*.png` and write findings into `PIXEL-AUDIT.md`.

**Files to touch:** `PIXEL-AUDIT.md` only. Pixel does NOT modify CSS/HTML/JS.
**Files NOT to touch:** anything besides PIXEL-AUDIT.md.
**Commit message:** `pixel cycle 1: mobile alignment audit + logo fix verification`

---

## 4. Nigel — Re-score + AUDIT.md + SCORES.log

**Scope:**
1. Score the live site at https://zed0minat0r.github.io/mackai-west/ from a prospective hiring leader's perspective AND a senior tax candidate's perspective. **Strict cap 7.5** — no real photography, no real testimonials, no published address yet.
2. Write `AUDIT.md` with current state and top 3 priorities for cycle 2 (do not repeat sections that just got worked on this cycle).
3. Append one line to `SCORES.log`: `2026-04-27 cycle 1 — Nigel: <score> — <one-line note>`.
4. Nigel never recommends removing glows/animations/effects. Only adds or improves.

**Files to touch:** `AUDIT.md`, `SCORES.log`.
**Files NOT to touch:** anything else.
**Commit message:** `nigel cycle 1: score + AUDIT cycle-2 priorities`

---

## Forbidden sections this cycle

None — every section is in play because this is cycle 1. Cooldown begins cycle 2.

## One-line rationale

Cycle 0 left a real iOS notch bug + generic feel; cycle 1 fixes the notch, adds exactly two distinctiveness moves (process line + marquee), then audits and re-scores under the 7.5 cap.
