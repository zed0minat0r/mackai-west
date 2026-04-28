# PLAN — Cycle 9 Builder

**Date:** 2026-04-27 ET
**Commit target:** `builder cycle 9: candidates editorial refresh — for/candidates panel mirroring employers (inverted palette)`

## Task 1 — P2 About right-column verify
Run Playwright at 1440, iPhone 13 (390), iPhone SE (375) on `.about__inner`.
If no visible gap: document and skip. If gap: build navy photo-slot panel.

## Task 2 — P3 Candidates editorial identity refresh

### index.html changes
- Remove `.candidates__numeral` div (`aria-hidden="true">01</div>`)
- Restructure `.candidates__inner` to 2-column grid: LEFT = copy block, RIGHT = new `.candidates__panel`
- New `.candidates__panel` div with `.candidates__panel-mark` (stacked "For / Candidates" Playfair italic) + rule + caption ("Senior Careers")
- Bump cache-buster `?v=cycle8-b` → `?v=cycle9-b` on style.min.css link

### style.css changes
- Remove `.candidates__numeral` rules (all ~15 lines)
- Remove `.candidates::before` copper-edge rule (no longer needed with panel)
- Replace `.candidates` bg: cream gradient → flat paper white (cleaner with panel)
- Replace `.candidates__inner` grid: numeral-col + 1fr → `1fr clamp(180px,26vw,300px)` (copy LEFT, panel RIGHT — mirrors employers but content-left)
- Add `.candidates__panel` rules: cream-2 bg + radial copper wash, centered mark
- Add `.candidates__panel-mark`, `__panel-for`, `__panel-who`, `__panel-rule`, `__panel-caption` mirroring employers pattern but with copper-deep type on cream-2
- Mobile ≤960px: grid → 1fr, panel collapses to top (above copy)
- Remove numeral mobile rules

### style.min.css — regenerate via clean-css-cli

## Success criterion
- 3 bullets + CTA preserved verbatim
- New panel: cream-2 bg, "For / Candidates" Playfair italic in gold-deep/navy
- No cream gradient, no ::before copper edge, no oversized "01"
- Mobile collapses panel above copy, no overflow
- Playwright 5pos × 3 viewports PASS

**Scope:** ~60 lines CSS replaced/added, ~15 HTML lines restructured
