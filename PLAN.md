# PLAN.md — Builder cycle 3

**Date:** 2026-04-27
**Scope:** TASK 1 (Candidates fix) + TASK 2 (stat count-up) + TASK 3 (magnetic underlines)

## Files changing

- `index.html` — cache-buster `?v=cycle3-b`; wrap `40K` in `<span id="stat-count">40K</span>` inside `.stat__number` for JS targeting
- `style.css` — 4 targeted edits:
  1. `.reveal-up` keep as-is; fix is JS-side: lower threshold from 0.12 → 0.05 + add rootMargin "0px 0px -5% 0px" so heading fires earlier
  2. `.candidates__numeral` — add right border copper hairline to visually connect numeral column to copy column
  3. `.stat__plus` — add `opacity: 0; transition: opacity 0.4s 0.2s ease-out;` + `.stat__number.is-counted .stat__plus { opacity: 1; }`
  4. `.nav__links a::after` + `.footer__nav a` — update transform to include `translateX(var(--mag-x, 0px))` on hover
- `main.js` — 2 new IIFEs appended:
  1. Stat count-up: IntersectionObserver on `.stat__number`, rAF loop 0→40, formats `$XK`, applies `.is-counted` after done; prefers-reduced-motion guard
  2. Magnetic underlines: mousemove on nav + footer links, `--mag-x` CSS var ±6px clamped; bail on touch devices via `'ontouchstart' in window`
- `style.min.css` — regenerated after CSS edits

## Expected diff scope

- style.css: ~20 lines changed/added
- main.js: ~65 lines added
- index.html: 3 lines (cache-buster + stat span id + JS threshold tweak is JS-side)

## Success criterion

- Candidates heading visible at first viewport entry (fires at 5% threshold + earlier rootMargin)
- Numeral "01" visually anchored to right column via hairline border-right
- Count-up fires once on stat band entry; `+` fades in via `.is-counted`
- Nav/footer links show magnetic translateX shift on hover (--mag-x non-zero on mousemove)
- Touch devices: no JS attached to magnetic underline
- prefers-reduced-motion: count-up skipped (shows $40K+ immediately)
- style.min.css regenerated
