# Agent Plan — MacKai West Cycle 7

**Date:** 2026-04-27 (ET)
**Cycle:** 7
**Score baseline:** 7.4 (cycle 6)
**Score target this cycle:** 7.5 (the cap holds — cap will not lift until real photography + verified testimonials + published office address all land; those are user-side content blockers, not design problems)
**Axis:** Closing cycle 6 correctness regressions + raising the perceived design beat
**Live:** https://zed0minat0r.github.io/mackai-west/

## Dispatch Rationale

Cycle 6 left two correctness regressions on the verified checklist (one `.form-group label` base rule still at 10.88px and the sticky-CTA candidate button routing to `#candidates` instead of `#contact`) plus a too-compressed process stagger that wastes the cycle 6 reveal animation. Cycle 7 closes those three gaps with a tight 4-agent slate (Builder fixes, Spark Frame B polish on the new contact trust badge, Pixel verifies, Nigel re-scores). Score 7.4 sits well below the 8.5 polish-mode threshold, so the full Builder + Spark + Pixel + Nigel slate runs.

## Memory Rules — Echoed Into Every Agent Brief

- Apps must NOT look AI-generated. Break Claude's default patterns — editorial-luxury restraint (Heidrick / Russell Reynolds register).
- NEVER bail features on mobile via JS `matchMedia`. Disabling isn't fixing.
- NO fabricated content (no fake names, testimonials, addresses, placement counts, "Est. 19XX" dates, fictional matchups). The cycle 7 contact response-time badge is a brand promise / SLA — copy already says "Replies typically inside one business day", so this is just promoting an existing honest commitment, not invented data.
- NO ghost numbers (large faded background numerals behind content) — confirmed user dislike.
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414 mobile every cycle.
- Nigel scores from real prospective customer lens. Strict cap 7.5 holds.
- Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle6-p` → `?v=cycle7-<initial>` (b for builder, s for spark, p for pixel).
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 (390) + iPhone SE (375). Single-position snapshots are NOT verification.
- **NO per-agent texting. DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

## Cooldowns This Cycle (DO NOT TOUCH beyond what each priority requires)

- Hero (word reveal, parallax horizon, 3D mesh + vertex-pulse + edge-shimmer + glow ::before) — UNTOUCHED
- Nav — DO NOT TOUCH
- Stat band (visual + count-up + threshold) — UNTOUCHED
- Marquee tape, industries (numerals + hover-reveal + 3D flip), about pillars, employers navy panel — UNTOUCHED
- Process **numerals + scroll-drawn copper line** — UNTOUCHED. P2 only adjusts `--i` multiplier and IO threshold; no SVG draw or numeral changes.
- Services scroll-lock (SLIDE_FRAC, IIFE, overflow CSS) — UNTOUCHED
- Candidates, footer (wordmark stagger + scroll-progress rule) — UNTOUCHED
- Contact floating labels + submit choreography — UNTOUCHED. P3 only ADDS a trust badge / mailto anchor in the intro block; existing inputs untouched.
- Magnetic underlines, mobile font floor + tap-target rules — UNTOUCHED at structure (only the label base rule at line ~1803 is patched per P1a).
- Sticky mobile CTA structural CSS + IntersectionObserver wiring — UNTOUCHED. P1b only changes one `href` attribute in HTML.

---

## Agent Slate (Execution Order)

### 1. Builder — three focused fixes (P1 + P2 + P3 from AUDIT.md cycle 7)

**P1a — Label font regression.**
Find the `.form-group label` base rule near `style.css` line 1803 still set to `0.68rem` (10.88px on mobile) and bring it to `0.82rem` minimum so zero `LABEL` elements fall below the 13px mobile floor. Both cycle 5 and cycle 6 partial patches touched the floated and select states; this one is the third instance.

**P1b — Sticky CTA candidate anchor.**
Change the sticky mobile CTA "Submit a resume" button `href` from `#candidates` to `#contact` so a candidate tap lands directly at the form, not at an informational mid-page section that requires a second action. Employer button stays on `#contact` (already correct).

**P2 — Process stagger extension.**
Bump the `.process-step` `--i * 140ms` transition-delay multiplier to `--i * 300ms` (so step delays become 0 / 300 / 600 / 900ms). Raise the IntersectionObserver threshold from `0.15` to `0.25` (in `main.js`) so the reveal fires when the section is more in view, preventing a single-frame burst on fast desktop scroll. Keep Spark's cubic-bezier(0.16,1,0.3,1) soft-spring ease.

**P3 — Contact trust accelerator (no fabrication).**
Add a "Typically replies within 1 business day" response-time element to the contact intro block. This is a brand promise / SLA — the existing copy already says "Replies typically inside one business day" so this is just promoting it visually. Format it as a small Playfair italic line in gold-deep, OR a pill-shaped badge with a subtle gold hairline border. Builder picks the precise execution. Optionally also surface `hello@mackaiwest.com` as a more prominent mailto anchor before the form fields.

**Files Builder may touch:** `index.html` (sticky-CTA `href` change, contact intro markup for trust badge / mailto anchor), `style.css` (`.form-group label` base rule fix, `.process-step` `--i` multiplier, trust-badge styles), `main.js` (process-step IntersectionObserver threshold 0.15 → 0.25 only). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-b`.

**Files Builder must NOT touch:** every section listed under Cooldowns. The hero mesh / vertex-pulse / edge-shimmer / glow. The nav. The stat / industries / about / employers / services scroll-lock. Candidates. Footer. Contact floating-label CSS + submit choreography (only ADD trust badge / mailto anchor in intro block — do not edit existing inputs). Magnetic underlines. Sticky-CTA structural CSS + observer JS (only the candidate button `href` may change).

**Memory rules to respect:** No fabricated content (response-time badge is brand promise / SLA, not invented data). No ghost numbers. No matchMedia bails. Apps must NOT look AI-generated. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-b`. Playwright ≥5 positions across all 3 viewports. **DO NOT call `mcp__plugin_imessage_imessage__reply`. DO NOT TEXT THE USER.**

**Commit format:** `builder cycle 7: label 0.82rem floor + sticky CTA #contact anchor + process stagger 0/300/600/900ms + contact response-time badge — <verification line>`

---

### 2. Spark — Frame B polish on the new contact trust badge + optional one other recently-shipped section

**Scope:** Frame B micro-rhythm pass on the brand-new contact trust badge / response-time element Builder ships in P3. Tune Playfair italic letter-spacing, gold-deep tone, vertical rhythm relative to the existing eyebrow + heading; pill border-radius and hairline opacity if a pill route is taken; subtle entrance reveal in step with the rest of the contact section. Optionally polish one other recently-shipped element where micro-rhythm is genuinely off — only if there is a real refinement need, not for the sake of touching.

**Frame B rule:** keep content count. Do NOT strip bullets, do NOT remove sub-labels, do NOT consolidate. Refine spacing, leading, weight, micro-easing only. Replace-when-adding (no piling on a second decorative layer).

**Files Spark may touch:** `style.css` (typography + spacing on the contact trust element, optional one-section micro-rhythm). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-s`.

**Files Spark must NOT touch:** every section listed under Cooldowns. Builder's cycle 7 P1/P2 wiring (that's Pixel verification territory, not refinement). Hero mesh / vertex-pulse / edge-shimmer / glow. Services scroll-lock. Stat. Nav.

**Memory rules to respect:** Frame B keeps content count. Spark replaces when adding, never piles on. Apps must NOT look AI-generated. Unique design — break Claude's default patterns. No ghost numbers. No fabricated content. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-s`. Playwright ≥5 positions across all 3 viewports. **DO NOT call `mcp__plugin_imessage_imessage__reply`. DO NOT TEXT THE USER.**

**Commit format:** `spark cycle 7: Frame B contact trust badge typography refinement — <verification line>`

---

### 3. Pixel — Verify P1 + P2 + P3 + standing 375/414 alignment sweep

**Scope:**
1. **P1a label floor verification at 375 + 390:**
   - Pixel audit JSON must report **zero** `LABEL` elements below 13px on iPhone 13 (390) and iPhone SE (375).
   - The 10.88px reading from cycle 6 must be gone.
   - If any label still falls below 13px, patch the rule and regenerate `style.min.css`.
2. **P1b sticky CTA anchor verification at 375 + 390:**
   - Sticky mobile CTA "Submit a resume" button now routes to `#contact` (form anchor), not `#candidates`.
   - Confirm via Playwright on iPhone 13 + SE: tap the button at scrollY ≥ 1000, verify the page lands at the contact form, not the candidates section.
3. **P2 process stagger verification at desktop 1440:**
   - At fast human-speed scroll through the Process section, capture each `.process-step` element's `is-revealed` class state at 5 successive scroll positions through the section runway.
   - Steps must arrive **sequentially** (not all in one frame). Different scroll positions must show different combinations of revealed/unrevealed steps.
   - Confirm IntersectionObserver threshold has moved from 0.15 to 0.25 by reading `main.js`.
4. **P3 contact trust badge verification at all viewports:**
   - Trust badge / response-time element renders cleanly on Desktop, iPhone 13, iPhone SE.
   - No overflow, no awkward wrapping, gold hairline / Playfair italic register holds, no AI-generated default-card look.
5. **Standing center-alignment audit at 375 + 414** — hero CTAs, stat band, services panel headlines, industries cards, about pillars, candidates section, employers panel, footer wordmark — all center-align cleanly at both viewports.
6. **Full overflow audit:** docWidth must equal winWidth at 375, 390, 414. No horizontal scroll anywhere.
7. **Tap target audit:** every interactive element ≥ 44 × 44 px on mobile.

**Files Pixel may touch (only if verification reveals a defect):** `style.css` for mobile-only fixes (≤480px or ≤768px breakpoints) — alignment, font-size floors, tap-target padding. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-p`. Otherwise pure verification commit.

**Files Pixel must NOT touch:** desktop styles outside the standing audit scope. Any structural HTML. Any section listed under Cooldowns at desktop scope. The sticky bar JS observer logic (file a regression for Builder if logic is wrong).

**Memory rules to respect:** Pixel must always audit center-alignment consistency on mobile (standing rule). Actually scroll-test (≥5 positions, not single-position snapshots). Tap targets ≥ 44 px. 13px font floor. NEVER bail features on mobile via matchMedia. No ghost numbers. No fabricated content. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle7-p`. **DO NOT call `mcp__plugin_imessage_imessage__reply`. DO NOT TEXT THE USER.**

**Commit format:** `pixel cycle 7: verify P1 label 13px floor + P1 candidate anchor + P2 sequential process reveal + P3 trust badge — <pass / fix-list>`

---

### 4. Nigel — Re-score, write cycle 8 priorities, append SCORES.log

**Scope:**
- Score the live site from a real prospective buyer's 90-second scroll: a Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Tax Manager deciding whether to submit a resume.
- Strict cap 7.5 until real photography + real testimonials + verifiable street address all land. Cycle 7 target: 7.5 if all three priorities (P1a + P1b + P2 + P3) verified live and clean. 7.4 if any partial. 7.3 hold if regressions persist.
- Write **AUDIT.md cycle 8 top-3 priorities** — concrete, ranked, with acceptance criteria. Do NOT recommend removing any glow / animation / effect (standing rule). Only add or improve.
- Append one line to `SCORES.log`: `cycle 7: <score> (Δ <delta>) — <one-line summary>`
- Append one Nigel entry to `CHANGELOG-AGENT.md`.

**Files Nigel may touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.

**Files Nigel must NOT touch:** `index.html`, `style.css`, `style.min.css`, `main.js`. Nigel does not build — Nigel scores.

**Memory rules to respect:** Nigel scores stricter (real-user perspective, sites start ~5.5 not 7+). Nigel never recommends removing quality features. Strict 7.5 cap. Respectful tone — never call user a bottleneck. No fabricated content recommendations. No ghost numbers. **DO NOT call `mcp__plugin_imessage_imessage__reply`. DO NOT TEXT THE USER.**

**Commit format:** `nigel cycle 7: re-score <score> — <one-line summary>`

---

## Verification gate before Nigel scores

After Builder + Spark + Pixel ship, the live site must show on Playwright:
- Pixel audit JSON reports **zero** `LABEL` elements below 13px on iPhone 13 + SE.
- Sticky mobile CTA "Submit a resume" routes to `#contact` (form anchor), not `#candidates`.
- At desktop 1440 fast scroll through Process section, the four `.process-step` elements visibly reveal **in sequence** (not in a single frame). Stagger total ~900ms (0/300/600/900). IO threshold 0.25.
- Contact intro block carries an honest, branded "Typically replies within 1 business day" trust signal that reads as editorial restraint, not a fabricated metric.
- 375 + 414: center-alignment consistent across all sections, zero horizontal overflow, all tap targets ≥ 44 px, no font below 13 px.
- `style.min.css` regenerated after every CSS edit.
- Site does NOT look AI-generated — Heidrick / Russell Reynolds editorial restraint holds.

If any of these fail, the failing agent re-runs before Nigel scores.
