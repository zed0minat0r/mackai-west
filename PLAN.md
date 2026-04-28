# PLAN — cycle 13: services iPhone SE verify + about right-column vertical fill

**Date:** 2026-04-27
**Cycle:** 13 (builder)

## Task 1 — Services panel iPhone SE verify
Playwright confirmed at 375×667 all 5 panels PASS: no mid-word truncation, no rightClip, no leftClip, no textOverflow.
Panel 04 "Finance & Accounting" and Panel 05 "Corporate Tax & Treasury" both PASS.
Status: **P1 VERIFIED CLOSED — no CSS change needed.**

## Task 2 — About right-column vertical fill

### Problem
- `.about__inner` uses `align-items: center` — columns are vertically centered, not stretched
- `.about__pillars` (aside) has no explicit height — takes natural content height
- pillar-list = ~388px, placeholder = 184px, total = ~572px with gap
- Right column ~686px vs left copy ~629px — but placeholder has ~114px empty cream gap below it

### Fix — CSS only (no HTML change if possible)

**style.css changes:**
1. `.about__inner`: change `align-items: center` → `align-items: stretch`
2. `.about__pillars`: add `display: flex; flex-direction: column; height: 100%`
3. `.about__placeholder`: add `flex-grow: 1; min-height: 280px` + bump padding to `clamp(48px, 6vw, 72px) clamp(36px, 4vw, 48px)`

**index.html change:**
- Add second typographic line inside `.about__placeholder` below caption:
  `<span class="about__placeholder-location">United States · 2026</span>`
- Add CSS for `.about__placeholder-location`

**Mobile guard:**
- At `max-width: 768px` (single column): do NOT flex-grow placeholder — reset to `flex-grow: 0; min-height: 180px`

### Files
- `style.css` (align-items, pillars flex, placeholder grow + padding)
- `style.min.css` (regenerate)
- `index.html` (add location line + bump cache-buster `?v=cycle13-builder`)

### Success criterion
- Right column fills visually from pillar-list top to bottom of the left copy column
- Placeholder expands to fill the gap — no empty cream space below it
- Mobile: single-column, placeholder at natural height (no flex-grow needed)
- Playwright 5pos × 3 viewports: no overflow, about section renders correctly

## Scope
~8 CSS lines changed, ~1 HTML line added, cache-buster bump
