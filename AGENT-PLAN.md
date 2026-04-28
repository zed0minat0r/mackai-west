# MacKai West — Cycle 13 Plan

**Cycle:** 13
**Date:** 2026-04-27
**Score:** 8.0 (Nigel cycle 12). Design ceiling 8.2 / content-unlocked 8.5–8.7.
**Focus axis:** Mobile services verification + about right-column vertical balance.

**Rationale:** Major builder + pixel work landed mid-cycle (services panel redo 9b5b6d8, vertical journey bar f8dc6e3, full-site pixel audit b4489b2). Cycle 13 closes loops on those interrupts and tackles the only remaining design defect (about right-column emptiness) before re-scoring. Score 8.0 is below the 8.5 polish-mode gate, so full Builder/Spark/Pixel/Nigel slate is appropriate — but additions must be surgical, not new feature territory.

---

## Memory guardrails (universal — every agent must respect)

- `feedback_no_dev_content` — B2B recruitment site, never add dev/marketplace language
- `feedback_pixel_alignment` — Pixel must audit center-alignment on mobile every cycle
- `feedback_unique_design` — no AI-template patterns, keep MacKai West editorial identity
- `feedback_horizontal_scroll` + `feedback_interesting_scroll` — preserve the scroll vocabulary intact
- `feedback_simplicity_over_polish` — additions must replace, not pile on
- `feedback_frame_b_richness` — Spark Frame B refines spacing/type, never strips content count
- `feedback_no_ghost_numbers` — no large faded background numerals on about pillars
- `feedback_nigel_no_removal` — Nigel must never recommend removing glows/animations/effects
- `feedback_nigel_stricter` — score from real-user perspective, no inflation
- `CLAUDE.md` content honesty — never invent names/photos/testimonials/addresses; placement fee ~$40K is the only verifiable fact
- Verification: Playwright ≥5 positions × 3 viewports (1440 + iPhone 13 + iPhone SE), cache-buster bump, NEVER bail mobile via matchMedia, regenerate style.min.css after CSS edits

---

## Scheduled agents (in order)

### 1. Builder
**Brief:** Two priorities this cycle.
- **P1 verify (services panel iPhone SE post-9b5b6d8):** scroll all 5 panels at 375px, confirm panel 04 (F&A Industry) and panel 05 (Corporate Tax & Treasury) titles do NOT truncate mid-word after the recent layout redo (numeral 88px → 29px, inner max-width 760 → 600, lede max-width 560 → 480, line-height tightened). If clean, document closed in changelog. If still clipping, push a focused fix — further line-height/max-width tighten only, do NOT restructure panels.
- **P2 about right-column vertical fill:** placeholder panel ~180px vs left copy ~600px+ creates empty cream space below it that still signals pre-launch even with the corrected caption. Apply: flex-grow the placeholder + bump min-height so the right column visually balances with copy. Do NOT restructure pillars or move the seal.
**MUST respect:** `feedback_unique_design` (no template patterns), `feedback_simplicity_over_polish` (min-height + flex-grow only), `CLAUDE.md` content-honesty (no fabricated dates/names if any caption tweak is needed).
**Forbidden:** see global cooldown list below.

### 2. Spark
**Brief:** Frame B polish on whatever Builder ships if needed. If Builder verifies P1 closed with no shipped change AND P2 lands clean, run Frame B audit on the new about right-column proportions only (caption tracking, monogram weight, panel border opacity). Replace something — never pile on.
**MUST respect:** `feedback_frame_b_richness` (refine, don't strip content count), `feedback_simplicity_over_polish` (replace when adding).
**Forbidden:** see global cooldown list below.

### 3. Pixel
**Brief:** Mobile audit at 375 + 414. Confirm P1 services panels 04+05 closed (no mid-word truncation across all 5 panel positions). Confirm P2 about right-column fill doesn't introduce overflow. Re-verify center-alignment per `feedback_pixel_alignment`. Bump cache-buster if any CSS ships.
**MUST respect:** `feedback_pixel_alignment` (mandatory mobile center-alignment audit).
**Forbidden:** see global cooldown list below — touch-only-if-defect.

### 4. Nigel
**Brief:** Re-score against cumulative cycle 13 work (services panel redo 9b5b6d8 + vertical journey bar f8dc6e3 + full-site pixel audit b4489b2 + cycle 13 about fill). Likely move within +0.0 to +0.2 inside the 8.2 design ceiling. Score from real prospective employer/candidate perspective per `feedback_nigel_stricter`. Write cycle 14 priorities. P3 contact form endpoint stays user-blocked — document and skip.
**MUST respect:** `feedback_nigel_stricter` (no inflation), `feedback_nigel_no_removal` (never recommend stripping effects).

---

## Global cooldown — DO NOT TOUCH this cycle

All hero (word reveal, parallax horizon, 3D meshes, animated pattern, cursor parallax, eyebrow ticker, hero-exit, grain, scroll-exit wrapper, hero-center fix), nav, stat band, marquee, industries, employers panel, services scroll-lock + 5 panels (just adjusted in 9b5b6d8), magnetic underlines, footer (wordmark stagger + progress + gradient + mobile timing), contact (floating labels + submit + trust badge + label sizes), process (numerals + line + scroll-draw + step reveal + stagger + ease), candidates panel, line-mask H2 reveal, section bg shift, mobile font floor + tap targets, sticky CTA, services panel redo (9b5b6d8), process journey bar (f8dc6e3), services dots fix (b4489b2), about pillars structural content, about seal, about placeholder structure (only adjust min-height + flex-grow per P2).

---

## Skip
- **P3 contact form endpoint** — user-side blocked (no Formspree URL). Document and skip.
