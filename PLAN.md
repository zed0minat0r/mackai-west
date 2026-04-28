# PLAN — Builder Cycle 6

**Date:** 2026-04-27 ET
**Commit target:** `builder cycle 6: sticky mobile cta + process step reveal + contact trust lift`

## What changes

### index.html
- Append `<div class="sticky-cta" id="stickyCta" ...>` after `</main>` before `<footer>`
- Replace "Headquartered in the United States · Searches handled nationally" with "Searches handled across the United States"
- Change label from "Office" to "Reach"
- Add `style="--i:0"` through `--i:3"` attrs on the four `.process-step` list items
- Bump cache-buster `?v=cycle5-s` → `?v=cycle6-b`

### style.css
- Add `.sticky-cta` default `display:none` + `@media (max-width:768px)` rules with `display:flex`, `position:fixed`, slide-up transform, backdrop-filter, gold border-top, safe-area-inset-bottom
- Add `.sticky-cta__btn`, `--primary`, `--ghost` button rules
- Add `.sticky-cta.is-visible` reveal rule
- Add `.process-step` opacity/transform initial state + `.is-revealed` revealed state
- Add `nth-child` transition-delay stagger (0/140/280/420ms)
- Add `prefers-reduced-motion` guards for both new features

### main.js
- IIFE: sticky CTA — IntersectionObserver on `.hero__actions` (passedHero) + `#contact` (inContact); show when `passedHero && !inContact`; toggle `.is-visible` + `aria-hidden` + remove `hidden`
- IIFE: process step reveal — IntersectionObserver threshold 0.15 on each `.process-step`; add `.is-revealed`; unobserve after fire

### style.min.css — regenerate via clean-css-cli

## Success criterion
- Sticky CTA: hidden at top, visible mid-scroll, hidden in contact on all 3 viewports
- Process steps: fade-up with stagger on entry, single-fire
- Contact line: reads "Searches handled across the United States"
- No horizontal overflow, all tap targets >=44px

**Scope:** ~80 lines CSS, ~60 lines JS, 5 HTML edits
