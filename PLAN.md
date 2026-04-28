# PLAN — Cycle 11

## Files touched
- `index.html` — add `about__placeholder` element inside `.about__pillars` aside, bump cache-buster `?v=cycle11-b`
- `style.css` — add `.about__placeholder` + monogram + caption rules; add `min-height: 220px` override for candidates/employers panels at 600px
- `style.min.css` — regenerate after CSS edits

## Changes

### TASK 1: About navy placeholder panel
- Add `<div class="about__placeholder">` below `</ul>` inside `.about__pillars` aside
- Contains `<span class="about__placeholder-monogram">MW</span>` and `<span class="about__placeholder-caption">Studio photography forthcoming</span>`
- CSS for `.about__placeholder`: navy bg, gold hairline border, border-radius 4px, flex column center, min-height 180px, margin-top clamp(32px,4vw,48px)
- CSS for `.about__placeholder-monogram`: 56x56 gold circle border, Playfair italic, gold color
- CSS for `.about__placeholder-caption`: Playfair italic, cream-60, 0.92rem
- Mobile ≤768px: renders naturally in single-column flow below pillars (no changes needed)

### TASK 2: Mobile candidates/employers panel min-height
- Existing `@media (max-width: 600px)` block already has `.candidates__panel` and `.employers__panel` rules
- Add `min-height: 220px` to both existing selectors (candidates at line ~2468, employers at line ~2435)

## Success criterion
- Playwright desktop 1440: placeholder visible below pillars, navy bg, gold hairline, MW monogram, italic caption
- Playwright iPhone SE 375: placeholder in single-column flow, no disruption to pillar stagger
- Playwright iPhone SE 375: candidates/employers panel min-height ≤ 220px
- No horizontal overflow
- style.min.css regenerated

## Scope
~30 CSS lines added + 4 HTML lines. Low diff.
