# Plan — cycle 2.5: Services horizontal scroll-lock + Hero multi-layer parallax

## Feature 1: Services horizontal scroll-lock

**Files:** index.html, style.css, main.js

### index.html changes
- Remove `.services__grid` + 2 `.practice` cards
- Add `.services-runway` > `.services-sticky` > `.services-track` wrapper
- Insert 2 `.service-fp` articles (sfp-1 Tax, sfp-2 F&A) with full content verbatim from existing practice cards
- Add `.services-dots` with 2 dot buttons
- Cache-buster → `?v=cycle2-impressive`

### style.css changes
- Add: `.services-runway { position: relative; height: 240vh; }`
- Add: `.services-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }`
- Add: `.services-track { display: flex; flex-direction: row; height: 100%; width: max-content; will-change: transform; }`
- Add: `.service-fp { flex: 0 0 100vw; height: 100%; ... }`
- Panel 1 (cream bg), Panel 2 (navy bg + cream text)
- Dots: absolute, bottom 32px, centered
- Mobile: keep row layout, shrink typography — NO column flip

### main.js changes
- Add services scroll-lock IIFE (from salon-site pattern, SLIDE_FRAC=0.85, 2 panels)
- Add hero parallax IIFE (3 layers, rates 0.15/0.35/0.55, reduced-motion guard)

## Feature 2: Hero multi-layer parallax

### index.html changes
- Split existing hero SVG into 3 `<div class="hero__skyline hero__skyline--back/mid/front">` wrappers
- Each gets `data-parallax-rate` attribute

### style.css changes
- `.hero__skyline--back/mid/front`: position absolute, bottom 0, full width, pointer-events none
- Different opacity per layer (back: 0.45, mid: 0.65, front: 0.85)

## Success criteria
- Desktop 1440: track translates 0 → -100vw as user scrolls through runway
- iPhone 13 + SE: same scroll-lock behavior (no matchMedia bail)
- Hero layers move at 3 different rates
- No horizontal overflow at any scroll position
- style.min.css regenerated

## Diff scope
- index.html: ~80 lines changed (services section replaced, hero split)
- style.css: ~120 lines added
- main.js: ~80 lines added
- style.min.css: regenerated
