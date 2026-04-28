# PLAN — Builder Cycle 13: Services Panel Layout Redo

**Date:** 2026-04-27
**Cycle:** 13

## Problem
- `service-fp__num` is `clamp(3.2rem, 6vw, 5.5rem)` — too tall, clips at top of panel
- `service-fp__inner` max-width is 760px — content sprawls too wide on desktop
- `service-fp__lede` max-width 560px — still too wide relative to 760px inner
- List items: 11px top+bottom padding × 6 items = too much vertical space, spreads content
- Inner `overflow: hidden` clips tall numeral when top padding is insufficient
- Mobile: `align-items: flex-start` + `padding-top: clamp(80px, 12vw, 120px)` clips numeral

## Fix — CSS-only, style.css lines 1166–1330 + mobile block ~2572–2591

### Changes:
1. `.service-fp__num` — shrink to `clamp(1.2rem, 2.5vw, 1.8rem)`, eyebrow-style, opacity 0.7 (more visible as small label)
2. `.service-fp__inner` — max-width 760px → 600px; add `padding-top: 8px` to give numeral breathing room above
3. `.service-fp__title` — keep `clamp(2.2rem, 4.5vw, 3.4rem)` (stays as visual anchor)
4. `.service-fp__lede` — max-width 560px → 480px
5. `.service-fp__list` — max-width: 480px; margin-bottom 36px → 24px
6. `.service-fp__list li` — padding 11px → 8px top/bottom; line-height 1.5 → 1.4
7. Mobile overrides — num: `clamp(1rem, 4vw, 1.4rem)`; inner padding-top stays; list li padding 6px

## Files to touch
- `style.css` — service-fp block ~1183–1291 + mobile block ~2572–2591
- `style.min.css` — regenerated
- `index.html` — cache-buster → `?v=cycle13-services-redo`

## Files NOT to touch
- index.html panel structure
- main.js

## Success criterion
- Playwright 5 positions × 3 viewports: numeral not clipped, title 1-2 lines, content fits within 600px, no horizontal overflow
- Panel feels composed, not spread

## Estimated diff scope
- style.css: ~15 lines changed
- index.html: 1 line (cache-buster)
