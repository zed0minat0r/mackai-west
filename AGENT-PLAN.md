# MacKai West — Cycle 12 Plan

**Cycle:** 12
**Date:** 2026-04-28
**Last score:** 7.7 (Nigel cycle 11) — but stale; multiple feature drops (cycle 11.5 hero refresh, scout-top-3, scout-top-5, hero-center fix) have landed since. Re-score required.
**Cap stance:** Cycle 11 stamped a 7.5–7.8 design ceiling pending real photography + testimonials + address. Coordinator authorizes Nigel to lift the cap to 8.0 this cycle to account for the cumulative cycle 11.5 + scout-top-3 + scout-top-5 distinctiveness gain — the design ceiling itself is what's been raised by the feature density, not the content cap.

---

## Dispatch decision (one-line rationale)

Score 7.7 < 8.5 → score gate not triggered → full slate. P1 is user-side blocked (Formspree URL); cycle 12 executes P2 caption rewrite + P3 industries role expansion, then re-scores against the cumulative feature drops since cycle 11.

---

## Scheduled agents (in order)

### 1. Builder — P2 caption + P3 role expansion

**Brief:** Execute two surgical edits.

**P2 — About placeholder caption rewrite.** Current caption "Studio photography forthcoming" announces the absence (Nigel cycle 11 trust-deficit flag). Replace with a brand-voice line that doesn't reference the missing photo. Builder picks the cleanest visually from these three options:
- (a) "Specialist tax & finance recruitment" — brand voice, doesn't reference photography
- (b) "United States · 2026" — mark-style line, location + year as a brand artifact
- (c) Remove the caption entirely — let the MW monogram circle stand silently as a brand artifact

Builder ships ONE option, doesn't combine. Caption typography (Playfair italic, 0.04em letter-spacing, cream-60) stays — only the text changes (or is removed in option c).

**P3 — Industries hover-reveal role expansion.** Each of the 3 industry cards currently has ~5 role archetypes on the back face. Add 2-3 more honest generic role titles per card (NO fabricated client placements — generic role categories only):
- **Construction**: + Project Controller, + Senior Estimator/Cost Lead, + Director of Tax (R&E projects)
- **Real Estate**: + Director of Asset Management, + Senior Property Tax Specialist, + REIT Reporting Manager
- **Manufacturing**: + Plant CFO, + Senior Cost Analyst, + Treasury Manager

**MEMORY rules to respect (echo in the prompt):**
- Apps must NOT look AI-generated (feedback_unique_design)
- NEVER bail mobile via matchMedia (feedback_disabling_isnt_fixing / RULE 4)
- NO fabricated content — generic role categories only, no fake client names (RULE 7 / feedback_no_invented_fight_data)
- NO ghost numbers (feedback_no_ghost_numbers / RULE 8)
- After CSS edits regenerate style.min.css (RULE 5)
- Bump cache-buster to `cycle12-b` (RULE 6)
- Verification Playwright at >=5 positions x 3 viewports (RULE 3 / feedback_actually_scroll_test)
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER (RULE 1)

**Forbidden sections (cooldown):** Hero (word reveal, parallax horizon, 3D meshes + vertex pulse + edge shimmer + glow, animated pattern, cursor parallax, eyebrow ticker, hero exit transform, scroll-exit wrapper, grain overlay), nav, stat band, marquee tape, employers panel, services scroll-lock, magnetic underlines, footer (wordmark stagger + progress rule + gradient + mobile timing), contact (floating labels + submit choreography + trust badge + label sizes), about pillars structural content, about seal, about placeholder panel structure (only adjust caption text per P2), process (numerals + line + scroll-draw + step reveal + stagger + ease), candidates panel navy inversion + cross-panel parity + mobile min-height, mobile font floor + tap targets, sticky mobile CTA, section bg color shift, line-mask H2 reveal.

---

### 2. Spark — Frame B polish (conditional)

**Brief:** Frame B refines spacing/typography on whatever Builder shipped. If P2 went with option (c) caption removal, Spark may rebalance monogram circle position within the panel (no scale change, only padding/alignment). If P2 went with option (a) or (b), Spark adjusts caption letter-spacing/line-height for editorial rhythm if needed. P3 industries back-face role lists: Spark verifies type rhythm holds with the added rows — adjust line-height or row spacing only if the back face reads dense. Frame B never strips content count (feedback_frame_b_richness). If nothing needs polish, Spark skips and logs "no fixes — ships clean."

**MEMORY rules:**
- Spark replaces, doesn't pile (feedback_simplicity_over_polish)
- Frame B keeps content count (feedback_frame_b_richness)
- Apps must NOT look AI-generated (feedback_unique_design)
- DO NOT TEXT THE USER (RULE 1)

**Forbidden sections:** Same cooldown list as Builder. Spark may only touch what Builder touched this cycle.

---

### 3. Pixel — P3 mobile back-face overflow audit + standing 375+414 audit

**Brief:** Verify P3 expanded role lists don't overflow on mobile cards. The 3D flip back face on industries cards is the highest-risk surface for cycle 12 — adding 2-3 rows per card could break iPhone SE (375). Pixel audits:
- iPhone SE 375x667: each industries card hover/tap-flip back face — does the role list fit without clipping or vertical scroll inside the card? All 3 cards: Construction, Real Estate, Manufacturing.
- iPhone 13 390x664: same audit.
- iPhone 14 Pro Max 414: confirm the standing 414 alignment audit per Pixel cooldown rule.
- Standing center-alignment audit on mobile (feedback_pixel_alignment).
- P2 caption: confirm whichever option Builder shipped renders correctly at 375 + 414 (no overflow, correct font, correct letter-spacing).

**MEMORY rules:**
- Pixel must audit 375 + 414 (feedback_pixel_alignment)
- Pixel must audit center-alignment consistency on mobile (feedback_pixel_alignment)
- After CSS edits regenerate style.min.css (RULE 5)
- Bump cache-buster to `cycle12-p` if any CSS edit (RULE 6)
- Verification at >=5 positions x 3 viewports for any scroll-driven feature (RULE 3)
- DO NOT TEXT THE USER (RULE 1)

**Forbidden sections:** Same cooldown list. Pixel may only fix what Builder touched OR the standing mobile alignment audit.

---

### 4. Nigel — RE-SCORE cumulative feature drops + write cycle 13 priorities

**Brief:** Cycle 11 score (7.7) is stale. Re-score the site accounting for ALL feature work landed since:
- Cycle 11.5 hero refresh: animated SVG blueprint pattern (10 strokes), cursor-reactive parallax (hero inner + meshes + touch bail), headline scale clamp(3.2rem, 9vw, 7.4rem), eyebrow ticker (7-word rotating), dual 3D meshes (primary upper-right + secondary lower-left)
- scout-top-3: SVG feTurbulence grain overlay (hero + process + panels), hero-exit scroll transform (scale -> 0.92, blur -> 8px, fade), section bg color shift (8 sections, IO -45% rootMargin)
- scout-top-5: line-mask H2 reveal (SplitType CDN, 7 section H2s, 80ms stagger), text scramble decode (REMOVED in 8cd5178 — confirm absent)
- Hero off-center FIXED (3b8f4ff) — `.hero > *` universal rule replaced with specific selector
- Cycle 12 P2 caption rewrite + P3 industries role expansion

**Cap directive:** The cycle 11 cap was 7.5–7.8 pending real photography + testimonials + address. Coordinator authorizes Nigel to RAISE the cap floor to 8.0 this cycle in light of the cumulative distinctiveness work — the design ceiling has been materially elevated by cycle 11.5 + scout-top-3 + scout-top-5. Score honestly: if site warrants 8.0+ on UI distinctiveness alone, give it. The content gates (real photo / real testimonials / real address) still cap at ~8.5 — but they no longer cap at 7.8.

**Score from a real prospective customer's lens** (feedback_nigel_stricter). Top issue must be specific and actionable. Write 3 ranked cycle 13 priorities (P1 / P2 / P3).

**MEMORY rules:**
- Nigel must score stricter from a real user lens (feedback_nigel_stricter)
- Nigel never recommends removing glows/animations/effects — only adds or improves (feedback_nigel_no_removal)
- NO ghost numbers in any recommendation (feedback_no_ghost_numbers)
- NO fabricated content recommendations (RULE 7)
- Respectful tone — never blame the user for the photography/testimonials/address gap (feedback_respectful_tone / RULE 10)
- DO NOT TEXT THE USER (RULE 1)

**Forbidden:** Recommending removal of any feature. Inventing content. Calling the user a bottleneck.

---

## Cooldown roster (forbidden across the whole cycle)

Hero (word reveal, parallax horizon, 3D meshes + vertex pulse + edge shimmer + glow, animated pattern, cursor parallax, eyebrow ticker, hero exit transform, scroll-exit wrapper, grain overlay) · nav · stat band · marquee tape · employers panel · services scroll-lock · magnetic underlines · footer wordmark stagger + progress rule + gradient + mobile timing · contact floating labels + submit choreography + trust badge + label sizes · about pillars structural content · about seal · about placeholder panel structure (caption text only per P2) · process numerals + line + scroll-draw + step reveal + stagger + ease · candidates panel navy inversion + cross-panel parity + mobile min-height · industries hover-reveal mechanics + 3D flip + numerals (only ADD role copy per P3) · mobile font floor + tap targets · sticky mobile CTA · section bg color shift · line-mask H2 reveal.

---

## Memory drift check

Recent (<=7 day) memory entries — all visibly active:
- feedback_actually_scroll_test (cycle 11 builder used 5pos x 3 viewports — followed)
- feedback_disabling_isnt_fixing (cycle 11.5 hero used touch-bail not matchMedia bail — followed)
- feedback_no_self_throttle (cycle 11.5 + scout-top-3 + scout-top-5 shipped at full intensity — followed)
- RULE 1 no per-agent texting (echoed in every brief)

No drift. All recent rules are landing in agent behavior.

---

## Audit priority match

Cycle 11 audit P1 (form endpoint) = user-side blocked. P2 (caption) + P3 (industries depth) both scheduled this cycle. Audit priorities current.

---

*Coordinator cycle 12 — full 4-agent slate. Builder executes P2 + P3, Spark frame-B polishes, Pixel verifies mobile back-face overflow, Nigel re-scores against cumulative feature drops with cap raised to 8.0 floor.*
