# MacKai West — Cycle 11 Agent Plan

**Cycle:** 11
**Date:** 2026-04-27
**Last score (cycle 10):** 7.6 / 10
**Design-only ceiling this cycle:** 7.7–7.8 (real photography/testimonials/address required for higher)
**Focus axis:** About-section pre-launch signal resolution + mobile Candidates panel proportion
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Dispatch Decision

Standard 4-agent rotation (Builder → Spark → Pixel → Nigel). Score is 7.6, below the 8.5 polish-only gate. AUDIT.md P1 + P3 are concrete, non-cooldown moves. P2 (form endpoint) is user-side blocked and is documented and skipped per directive.

**One-line rationale:** Resolve the about right-column pre-launch signal with a deliberate brand-artifact panel (no fabricated content, no stock photo) and fix the iPhone SE Candidates panel min-height regression carried over from cycle 9.

---

## Scheduled Agents (in order)

### 1. Builder
**Brief:** Ship P1 about navy placeholder panel — small editorial card (~200–280px × 240–320px), navy bg, MW monogram circle (matching nav monogram weight), gold hairline border, Playfair italic caption ("Photography forthcoming" or "Studio · 2026"). Place visually associated with the about section — preferred path: insert as a 3rd column inside `.about__inner` grid at desktop, OR layer below the pillars list, OR drop in as a 4th `.about__pillars` item. Mobile must collapse cleanly. Ship P3 mobile candidates min-height fix — at `@media (max-width: 600px)`, set `.candidates__panel { min-height: auto }` or `min-height: 220px` so the panel sizes to content + padding only, and apply the same rule to `.employers__panel` if it inherited the over-tall mobile rule from the cycle 10 unification. Regenerate `style.min.css`. Verify Playwright at ≥5 positions × desktop 1440 + iPhone 13 + iPhone SE.

**MEMORY rules to respect:**
- No fabricated content (no fake "Est." dates, no fake names — MW monogram + honest pre-launch caption only)
- Apps must NOT look AI-generated (deliberate brand-artifact, not a generic placeholder box)
- NEVER bail mobile via matchMedia
- No ghost numbers
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER

**Forbidden sections / scope:** All hero, nav, stat band, marquee, industries, services scroll-lock, magnetic underlines, footer, contact, process, about pillars structural content, about seal, candidates panel navy inversion + cross-panel parity (only mobile min-height per P3), employers panel (only matching mobile min-height fix if it shares the rule), mobile font floor + tap targets, sticky mobile CTA. Do not restructure the pillars or move the seal.

---

### 2. Spark
**Brief:** Frame B polish on the new about navy placeholder panel only — refine monogram circle stroke weight, internal spacing, Playfair italic caption tracking + size, gold hairline border opacity, panel inner padding rhythm. Frame B keeps content count — refine the panel that Builder shipped, never strip it down or pile on additional elements. Pull a single editorial reference (Heidrick / Korn Ferry / Bottega Veneta press card) and replace one specific weakness in the Builder version. Regenerate `style.min.css`. Verify at ≥5 positions × 3 viewports.

**MEMORY rules to respect:**
- Spark replaces, doesn't pile (one weakness identified, one targeted refinement, swap don't add)
- Frame B keeps content count (no removing the monogram or the caption)
- Apps must NOT look AI-generated
- Simplicity over polish
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER

**Forbidden sections / scope:** Same cooldown list as Builder. Spark touches only the new about navy panel internals — no stat band, no marquee, no industries, no services typography, no contact form, no candidates/employers panels, no footer wordmark.

---

### 3. Pixel
**Brief:** Verify P1 about navy panel renders cleanly at desktop 1440 (no layout disruption to existing pillars, no overflow, no stacking break, monogram + caption legible, gold border crisp). Verify P3 mobile candidates panel proportion now correct at iPhone SE (375) — mark no longer stranded at the bottom of an over-tall navy bar; panel sizes to content. Standing 375 + 414 audit (font floor 13px, tap targets ≥44px, no horizontal overflow). Pixel must always audit center-alignment consistency on mobile. Confirm employers mobile panel didn't regress.

**MEMORY rules to respect:**
- Pixel must audit 375 + 414 always
- Pixel must audit mobile center-alignment consistency
- Verification Playwright at ≥5 positions × 3 viewports
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER

**Forbidden scope:** Do not modify any section outside what Builder + Spark touched this cycle except defensive font-floor or tap-target fixes if a regression is detected.

---

### 4. Nigel
**Brief:** Re-score from a senior Tax / F&A buyer perspective scanning the live site cold in 90 seconds. Cycle 10 closed at 7.6. The design-only ceiling this cycle is 7.7–7.8 — anything above requires real photography + real testimonials + published office address. The about navy placeholder panel resolves the most prominent pre-launch signal but it is still a placeholder (not real photography), so the cap conditions remain unmet. Score honestly. Identify cycle 12 P1/P2/P3 and write them into AUDIT.md. Nigel never recommends removing glows / animations / effects — only adds or improves.

**MEMORY rules to respect:**
- Nigel must score stricter (real-user perspective, not assistant optimism)
- Nigel cap 7.7–7.8 design ceiling — do not exceed without real content
- Nigel never removes quality
- Respectful tone (never call the user a bottleneck)
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER

---

## Forbidden sections (cycle 11)

All hero variants, nav, stat band, marquee tape, industries, services scroll-lock, magnetic underlines, footer (wordmark + progress + mobile timing), contact (floating labels + submit + trust badge + label sizes), about pillars structural content, about seal, process (numerals + line + scroll-draw + step reveal + stagger + ease), candidates panel navy inversion + cross-panel parity, employers panel (except matching mobile min-height fix if same issue exists), mobile font floor + tap targets, sticky mobile CTA.

**Allowed touches this cycle:**
- ADD: about navy placeholder panel (new element)
- FIX: candidates `.candidates__panel` mobile min-height at `@media (max-width: 600px)`
- FIX: employers `.employers__panel` mobile min-height ONLY if it inherited the same over-tall rule
- POLISH: Spark Frame B internal refinement of the new about panel only

---

## Memory guardrails — repeated for every agent

- Apps must NOT look AI-generated
- NEVER bail mobile via matchMedia
- NO fabricated content
- NO ghost numbers
- Spark replaces, doesn't pile
- Frame B keeps content count
- Pixel must audit 375 + 414 + center-alignment
- Nigel cap 7.7–7.8 design ceiling holds
- Respectful tone
- Verification Playwright at ≥5 positions × 3 viewports
- After CSS edits regenerate `style.min.css`
- DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER

---

*Plan written 2026-04-27 by Coordinator. Live: https://zed0minat0r.github.io/mackai-west/*
