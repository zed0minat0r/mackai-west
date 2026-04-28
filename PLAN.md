# PLAN — Cycle 7 Builder

**Date:** 2026-04-27 ET
**Commit target:** `builder cycle 7: label fix + sticky cta href + process stagger 300ms + contact trust badge`

## What changes

### index.html
- Sticky CTA "Submit a resume" href="#candidates" → href="#contact"
- Insert contact trust badge `<p class="contact__badge">` between section-title h2 and contact__lede p
- Bump cache-buster `?v=cycle6-p` → `?v=cycle7-b`

### style.css
- `.form-group label` font-size: 0.78rem → 0.82rem (meets 13px floor)
- `.process-step` transition-delay calc multiplier 140ms → 300ms
- Add `.contact__badge`, `.contact__badge-dot`, `@keyframes dot-pulse`, prefers-reduced-motion guard

### main.js
- Process step IntersectionObserver threshold 0.15 → 0.25

### style.min.css — regenerate via clean-css-cli

## Success criterion
- Label ≥13px computed on iPhone 13
- Sticky CTA btn 2 href ends in #contact
- Process steps stagger at 0/300/600/900ms
- Contact badge visible, gold-deep italic, dot pulses

**Scope:** ~25 lines CSS, 1 line JS, 3 HTML edits
