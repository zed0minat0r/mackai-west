# PLAN — Builder Cycle 5

**Date:** 2026-04-27
**Scope:** Three focused fixes in one commit

## Change 1 — Stat count-up threshold (main.js)
- Line 280: `threshold: 0.6` → `threshold: 0.95`
- Effect: count-up fires only when stat section is 95% in view; user sees 40K at reveal not mid-count

## Change 2 — Services SLIDE_FRAC (main.js)
- Line 162: `var SLIDE_FRAC = 0.85` → `var SLIDE_FRAC = 0.92`
- Line 175: `var SLIDE_FRAC_CLICK = 0.85` → `var SLIDE_FRAC_CLICK = 0.92`
- CSS: add `overflow: hidden` to `.service-fp__inner` (~line 949)

## Change 3 — Hero mesh amplify (index.html + style.css)
- style.css `.hero__mesh`: width `clamp(200px, 22vw, 360px)` → `clamp(260px, 32vw, 460px)`
- Mobile breakpoint stays `clamp(140px, 35vw, 200px)` (unchanged)
- Add `@keyframes vertex-pulse` with per-vertex nth-child delay stagger
- index.html: add class `hero__mesh-vertex hero__mesh-vertex--N` to each <circle>
- Bump cache-buster to `?v=cycle5-b`

## Regenerate
- `npx clean-css-cli -o style.min.css style.css`

## Verification
- Playwright: stat shows 40K at first visible frame (3 viewports)
- Playwright: services iPhone SE 5 positions no double-headline
- Playwright: mesh visibly larger on desktop, vertex pulses active

## Success criteria
- All 3 Playwright checks pass
- Commit `builder cycle 5: stat count-up threshold + services slide_frac + hero mesh amplify`

**Diff scope:** ~25 lines main.js, ~30 lines style.css, ~10 lines index.html
