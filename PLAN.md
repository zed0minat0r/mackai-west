# PLAN — Cycle 10

## Files touched
- `style.css` — candidates panel navy inversion + about__seal styles
- `style.min.css` — regenerate after CSS edits
- `index.html` — add about__seal span, bump cache-buster to `?v=cycle10-b`

## Changes

### TASK 1: Candidates panel full-navy inversion
- `.candidates__panel`: bg `var(--cream-2)` → `var(--navy)`; radial-gradient ellipse → circle at 30% 30%, gold 0.10
- `.candidates__panel-for`: color `var(--gold-deep)` opacity 0.75 → color `var(--gold)`, remove opacity
- `.candidates__panel-who`: color `var(--navy)` → color `var(--gold-soft)`
- `.candidates__panel-rule`: bg stays `var(--gold-deep)`, opacity `0.4` → `0.6`
- `.candidates__panel-caption`: color `var(--gold-deep)` opacity 0.65 → color `rgba(245,240,230,0.65)` (cream at 65%)
- No changes to employers panel — reference only

### TASK 2: About brand seal
- `.about__inner` needs `position: relative` if not set
- Add `.about__seal` CSS: position absolute, bottom 24px, right 24px, Playfair italic 0.86rem, slate-2, letter-spacing 0.18em
- Mobile `≤768px`: `display: none`
- Add `<span class="about__seal" aria-hidden="true">MW · 2026</span>` inside `.about__inner` at end

## Success criterion
- Playwright 5 positions × 3 viewports: navy bg confirmed on candidates panel, type readable
- About seal visible bottom-right at 1440, hidden on 375/390 mobile
- No horizontal overflow anywhere
- style.min.css regenerated

## Scope
~25 CSS lines changed + 1 HTML line. Low diff.
