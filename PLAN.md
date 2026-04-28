# PLAN.md — Cycle 14 Builder

## Changes

### B1: 2x2 grid on .process__steps (desktop)
- File: style.css line ~1730
- Change base `grid-template-columns` from `repeat(4, 1fr)` to `repeat(2, 1fr)`
- Add `gap: clamp(40px, 4vw, 64px) clamp(32px, 3vw, 48px)` (row x col)
- Tablet override line 2673 `repeat(2, 1fr)` stays (already correct for 960px)
- Mobile override line 2697 `1fr` stays untouched
- Steps 01+02 top row, 03+04 bottom row naturally

### B2: Marker ring halo via ::before pseudo
- File: style.css lines ~1834-1854
- Add `::before` on `.process__journey-marker`: 14px circle, gold stroke ring, opacity 0.25
- `.process__journey-marker.is-active::before`: expand to 22px, opacity 1.0, glow box-shadow
- Transition 0.4s cubic-bezier on ring properties
- Numeral stays at 0.8125rem (13px floor) — never reduced

### B3: Sync .is-active to step cards
- File: style.css — add `.process-step.is-active` rule: border-top full gold + border-left 3px gold-soft + padding-left clamp
- File: main.js lines ~170-177 — extend existing marker forEach loop to also toggle `.is-active` on matching `.process-step`

## Success criteria
- Desktop 1440: `.process__steps` 2 columns, both rows fill inner width
- Mobile 375: single column, no overflow
- Marker rings visible; active = bigger + glow
- Active step card gets gold top + left accent
- `style.min.css` regenerated; cache-buster `?v=cycle14-b`

Scope: ~30 CSS lines, ~5 JS lines
