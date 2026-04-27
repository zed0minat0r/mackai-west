# PLAN — Builder Cycle 1

**Date:** 2026-04-27
**Scope:** iOS notch logo fix + scroll-drawn copper process line

## Files changing

| File | Change |
|------|--------|
| `index.html` | viewport meta + process__line SVG before `<ol>` |
| `style.css` | `.nav` safe-area inset + `.hero` padding-top fix + `.process__line` styles |
| `style.min.css` | regenerated from style.css |
| `main.js` | new IIFE: scroll listener updating `stroke-dashoffset` on `.process__line-fill` |

## TASK 1 — iOS notch fix

- `<meta name="viewport">` gains `viewport-fit=cover`
- `.nav` gets `padding-top: env(safe-area-inset-top, 0px)` — stacks on top of `--nav-h: 72px`
- `.nav__inner` already uses `height: 100%` so it fills the full nav height; inner content aligns via `align-items: center`
- `.hero` gets `padding-top: calc(var(--nav-h) + env(safe-area-inset-top, 0px))`

## TASK 2 — Copper process line

- SVG horizontal line inserted before `<ol class="process__steps">` inside `.process`
- `.process__line` is `position: relative; width: 100%; margin-bottom: 0` (flows above steps)
- Base line: gold opacity 0.18, fill line: dasharray 1200 / dashoffset animated via JS
- JS IIFE: passive scroll listener, getBoundingClientRect-based 0–1 progress through section, updates dashoffset
- `prefers-reduced-motion`: sets dashoffset to 0 immediately (fully drawn)
- No matchMedia bail on mobile — works at all viewports

## Success criteria

1. iPhone 13 (390×664) at scrollY=0: full MW monogram + wordmark visible, no clipping
2. Process line stroke-dashoffset changes measurably across 5 scroll positions on desktop + mobile
3. No JS errors, no horizontal overflow
4. `style.min.css` regenerated

**Expected diff scope:** ~30 lines CSS, ~35 lines JS, ~8 lines HTML, 1 meta change
