# PLAN — cycle 13: process journey bar — horizontal top -> vertical sticky side

**Date:** 2026-04-27
**Cycle:** 13 (journey-vertical sub-task)

## Problem
The horizontal `process__line` SVG sits above the `.process__steps` grid. As user scrolls into the steps, the line disappears from view — it does not track the user's progress through the 4 steps at all.

## Fix — Option A: vertical sticky journey bar

### HTML delta (index.html)
- Remove the `.process__line` div entirely
- Wrap `.process__steps` + new `.process__journey-bar` inside `.process__inner` (flex-row)
- `.process__journey-bar` has: SVG with base + fill lines; 4 `.process__journey-marker` spans (01/02/03/04)
- Bump cache-buster to `?v=cycle13-journey-vertical`

### CSS delta (style.css)
- Remove `.process__line` rules (lines ~1659-1686)
- Add `.process__inner` flex layout (row, gap 0)
- Add `.process__journey-bar`: sticky positioning, ~48px wide, full height of steps
- Add `.process__journey-base`, `.process__journey-fill`, `.process__journey-marker` styles
- Marker `.is-active` state = bright gold
- Mobile (<=600px): bar 32px wide, runs alongside single-column stacked steps
- Regenerate `style.min.css`

### JS delta (main.js)
- Rewrite process IIFE: vertical line dashoffset based on scroll through .process section
- Total line length = SVG height (dynamic, set via JS from .process__steps offsetHeight)
- Activate marker[0] at progress 0, marker[1] at 0.25, marker[2] at 0.5, marker[3] at 0.75

## Files
- `index.html`
- `style.css` + `style.min.css`
- `main.js`

## Success criterion
- Bar visible at all 5 scroll positions inside Process section (desktop + iPhone 13 + SE)
- dashoffset decreases progressively 0->100% scroll
- Markers light up in sequence
- Zero horizontal overflow

## Scope
~20 HTML lines, ~70 CSS lines, ~40 JS lines
