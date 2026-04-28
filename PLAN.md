# PLAN — Builder Cycle 12 (Services 2→5 + Caption + Industries)

**Date:** 2026-04-27
**Cycle:** 12 (user escalated services expand to P1)

## Files to touch
- `index.html` — services 2→5 panels, dots 2→5, section title, about caption, industries back-face role lists, cache-buster → `?v=cycle12-b`
- `style.css` — `.services-runway` height 240vh → 480vh; mobile breakpoint 260vh → 600vh
- `style.min.css` — regenerated after CSS edits

## Expected diff scope
- index.html: ~100 lines changed (services panels 3-5 added, dots 3-5 added, title text, caption text, 3x back-face lists expanded)
- style.css: 2 line changes (runway height desktop + mobile)

## Task A — Services 2 → 5 panels
- Desktop runway: 240vh → 480vh (5 panels need 4 transitions of ~100vh each + dwell)
- Mobile runway: 260vh → 600vh
- Panels: cream/navy/cream/navy/cream alternating
- JS reads numPanels dynamically — no JS change needed
- Section title: "Two specialist practices." → "Five practice lanes."
- Eyebrow: "Practices" → "Practice areas"
- 5 dots with correct data-panel + aria-label

## Task B — About caption
- "Studio photography forthcoming" → "Specialist tax & finance recruitment"

## Task C — Industries back-face role expansion
- Construction: +Project Controller, +Senior Estimator / Cost Lead, +Director of Tax (R&D Credits)
- Real Estate: +Director of Asset Management, +Senior Property Tax Specialist, +REIT Reporting Manager
- Manufacturing: +Plant CFO, +Senior Cost Analyst, +Treasury Manager
- No structural changes — append only

## Success criterion
- Playwright: services track reaches -400vw at 95% scroll (5 panels = 4 transitions)
- 5 dots present, active state advances 0→1→2→3→4
- About caption shows new text at all 3 viewports
- Industries back face shows new roles on hover/tap at all 3 viewports

# PLAN — Scout Top 5 (line-mask heading reveal + text scramble decode) [archived]

## Goal
Ship features 4 + 5 from SCOUT-REPORT.md (Scout priority order 4 = line-mask, 5 = scramble).
Features 1-3 already landed in de7107f.

## Files changing
- `index.html`: add SplitType CDN script tag, bump cache-buster `?v=scout-top3` → `?v=scout-top5`
- `style.css`: `.reveal-line` + `.reveal-line__inner` rules, stagger delays, `.scramble-char` gold color
- `style.min.css`: regenerate
- `main.js`: TextScramble class + heading-reveal IIFE + scramble-observer IIFE appended at end

## Feature 4 — Line-mask heading reveal
- Target: all `.section-title` H2s (7 elements) EXCEPT hero (hero already has word-fade)
- SplitType at CDN split each H2 into `.reveal-line` / `.reveal-line__inner` pairs
- Each `.reveal-line` has `overflow: hidden`, inner starts at `translateY(110%)`
- IntersectionObserver threshold 0.4 fires `.is-revealed` on the H2
- Stagger: `--i` CSS var per line, `transition-delay: calc(var(--i) * 80ms)`
- Transition: 720ms cubic-bezier(0.22,1,0.36,1)
- prefers-reduced-motion: skip transform, show immediately

## Feature 5 — Text scramble / decode
- Same 7 `.section-title` H2s
- TextScramble vanilla class (~70 lines) using A-Z glyphs
- Scramble chars render in `var(--gold)` via `.scramble-char` span
- Triggered by same IntersectionObserver as Feature 4
- Scramble runs WHILE line wipes up (they compose)
- prefers-reduced-motion: skip scramble, set final text immediately

## Conflict resolution
Both features fire from same observer callback. Scramble fires first (runs async via rAF),
line-mask class added at same time. They overlap visually — scramble happening inside
the rising line mask = premium composed effect.

## Success criteria
- Each section H2 starts at translateY(110%) and resolves to translateY(0) on scroll-into-view
- Scramble chars (gold .scramble-char spans) visible during animation, final text locked after
- Playwright 5 positions × 3 viewports: Desktop 1440 + iPhone 13 + iPhone SE

## Cache buster: scout-top5

# PLAN — Scout Top 3 (grain overlay + hero exit + section bg shift) [archived]

## Goal
Ship 3 features from SCOUT-REPORT.md in one commit. Per Scout priority order:
1. FEATURE 3 (grain noise overlay) — 8 CSS lines, 0 JS
2. FEATURE 4 (hero-exit scroll transform) — 30 JS lines, 5 CSS
3. FEATURE 1 (section bg color shift) — 30 CSS + 15 JS

## Files changing
- `index.html`: add inline `<svg>` noise filter before `</body>`, wrap `.hero__inner` in `.hero__scroll-exit`, add `data-section-bg` attrs to sections, bump cache-buster to `?v=scout-top3`
- `style.css`: grain ::after on .hero + navy sections, hero-exit CSS, body transition + data-bg color map
- `style.min.css`: regenerate
- `main.js`: hero-exit IIFE + section-bg-shift IIFE appended at end

## Conflict resolution (cursor parallax vs scroll exit)
Cursor parallax IIFE targets `.hero__inner` (rotateX/Y). Scroll-exit targets new `.hero__scroll-exit` wrapper ABOVE `.hero__inner`. No conflict.

## Color map
- hero → navy (body default)
- stat → navy
- about → cream (#F5F0E6)
- services → navy
- industries → cream-2 (#EDE8D8)
- process → navy
- candidates → cream (#F5F0E6)
- employers → navy
- contact → cream-2 (#EDE8D8)
- footer: has own dark bg, no data-section-bg needed

## Success criteria
- Grain ::after visible on .hero, opacity ~0.04
- Hero exit at 50% scroll: scale ~0.96, blur ~4px
- Body bg-color changes per section confirmed in Playwright

## Cache buster: scout-top3
