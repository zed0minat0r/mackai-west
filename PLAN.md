# PLAN — Cycle 11.5 Hero Refresh (Interrupt)

## Files touched
- `index.html` — hero__pattern SVG + eyebrow ticker spans + second mesh + cache-buster bump
- `style.css` — 5 feature blocks: SVG pattern keyframes, hero perspective + parallax transitions, headline scale, ticker keyframes, second mesh styles
- `style.min.css` — regenerate
- `main.js` — cursor parallax IIFE for .hero

## Changes

### FEATURE 1 — SVG architectural pattern
- Add `<div class="hero__pattern" aria-hidden="true">` between `.hero__bg` and `.hero__horizon`
- Inside: SVG 1440x900 with 10 long architectural strokes (diagonals + gentle curves)
- stroke gold 0.15-0.3 opacity, stroke-width 0.5-1px
- CSS draw keyframes: stroke-dasharray + stroke-dashoffset draw + pause + un-draw cycle
- Staggered delays: 0s, 0.6s, 1.2s ... up to 6s
- prefers-reduced-motion: animation-play-state paused

### FEATURE 2 — Cursor-reactive parallax
- Add IIFE in main.js after horizon parallax IIFE
- Touch bail via `ontouchstart`
- mousemove on `.hero` → normalize cursor to -1..+1 relative to hero center
- Apply rotateX/rotateY to `.hero__inner` (max ±1.2deg) and `.hero__mesh` (max ±2deg)
- CSS: `.hero { perspective: 1500px }`, inner/mesh `transform-style: preserve-3d; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1)`
- mouseleave resets transforms

### FEATURE 3 — Headline scale
- `.hero__title` font-size: `clamp(2.6rem, 6.5vw, 5.4rem)` → `clamp(3.2rem, 9vw, 7.4rem)`
- letter-spacing: -0.018em → -0.022em

### FEATURE 4 — Eyebrow ticker
- Replace `<p class="hero__eyebrow">Tax · Finance · Accounting</p>` with wrapper + 7 spans
- Words: Tax, Public Accounting, Finance & Accounting, Construction, Real Estate, Manufacturing, $40K avg fee
- CSS: ticker-word @keyframes, 22s cycle, each span --i:0-6 with calc delay
- Wrapper `position: relative; height: 1.2em; overflow: hidden`

### FEATURE 5 — Mesh amplification + second mesh
- Upper-right mesh width: `clamp(260px,32vw,460px)` → `clamp(320px,38vw,540px)`
- Add `filter: drop-shadow(0 0 8px rgba(201,169,97,0.5))` to .hero__mesh-svg
- Add second `.hero__mesh--secondary` element lower-left
- Same SVG octahedron, `clamp(160px,18vw,240px)` width, 40s rotation, hidden on mobile

## Success criterion
- All 5 features verified by Playwright at 5 scroll positions x 3 viewports
- style.min.css regenerated
- No horizontal overflow

## Scope
~120 CSS lines + 60 HTML lines + 40 JS lines
