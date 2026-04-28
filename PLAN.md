# PLAN.md — Builder cycle 4b: Candidates distinctive identity + Footer signature features

**Date:** 2026-04-27 (ET)
**Scope:** Two tasks — Candidates visual identity + Footer wordmark stagger + scroll progress rule

## TASK 1 — Candidates distinctive visual identity

**Files:** `style.css`, `index.html`

Changes:
- `.candidates` background: replace flat `--paper` with `linear-gradient(135deg, var(--cream-2) 0%, var(--paper) 50%, var(--cream-2) 100%)`
- Add `position: relative` + copper left-edge accent via `::before` pseudo (3px wide, full section height, gold at 0.6 opacity)
- `.candidates__points li` font-weight bump to 500
- Mobile (≤960px): copper edge `::before` still runs vertically on left

## TASK 2 — Footer signature features

**Files:** `index.html`, `style.css`, `main.js`

HTML changes:
- Wrap each letter of `.footer__wordmark` text in `<span class="footer__letter" style="--i:N">X</span>`
- Add `<div class="footer__progress" aria-hidden="true"></div>` as first child of `.footer`

CSS changes:
- `.footer__progress`: absolute, top:0, left:0, full width, 1px height, gold 0.5 opacity, scaleX(0) transform-origin left
- `.footer__letter` stagger animation: `translateY(20px) opacity:0` → `translateY(0) opacity:1`
- `.footer__wordmark.is-revealed .footer__letter` triggers animation with `animation-delay: calc(var(--i) * 60ms)`
- `prefers-reduced-motion`: wordmark shows immediately, progress rule still works

JS changes:
- Footer wordmark IntersectionObserver IIFE: single-fire, adds `.is-revealed`
- Footer progress rule IIFE: rAF-throttled scroll, `scaleX((scrollY + winH) / docH)` clamped 0-1

**Then:** regenerate `style.min.css`, bump `?v=cycle4-3d` → `?v=cycle4-b`

## Success criteria
- Candidates reads visually distinct from navy Process above and cream-2 Employers below
- Footer letters stagger in from below when footer enters viewport
- Progress rule grows 0→1 as user scrolls to end
- Verified 5 positions × 3 viewports (desktop 1440, iPhone 13, iPhone SE)

---

# PLAN.md — Builder cycle 4a (archived): 3D Hero Wireframe + Service Tilt + Industry Flip

**Date:** 2026-04-27
**Scope:** FEATURE 1 (hero mesh), FEATURE 2 (service tilt), FEATURE 3 (industry flip)

## Files changing

- `index.html` — Add `.hero__mesh` after `.hero__horizon`; restructure 3 `.industry` articles with `.industry__inner/.industry__face--front/.industry__face--back`; bump cache-buster to `?v=cycle4-3d`
- `style.css` — Add hero mesh + octahedron SVG keyframes; service-fp perspective + tilt + gold glow; industry flip (preserve-3d, backface-visibility, rotateY); remove old `.industry__expand` slide-up rules; mobile mesh scaling
- `style.min.css` — Regenerated after CSS edits
- `main.js` — New IIFE: service-fp 3D tilt (touch bail, rAF, mousemove/leave); update industries IIFE: `.is-flipped` on `.industry__inner`

## Success criterion

- Hero mesh present in DOM, SVG rotating (visible in screenshots)
- Service tilt: rotateX/Y ±6deg max on mousemove; no tilt on touch
- Industry flip: rotateY 0→180deg on hover/tap, back face visible
- style.min.css regenerated

---

# PLAN.md — Builder cycle 3 (archived)

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
