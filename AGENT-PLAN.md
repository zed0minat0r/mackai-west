# Agent Plan — MacKai West Cycle 9

**Date:** 2026-04-27 (ET)
**Cycle:** 9
**Score baseline:** 7.5 (cycle 8) — AT THE CAP, plateaued for 2 cycles
**Score target this cycle:** 7.5 plateau (cap holds; +0.0 expected, +0.1 ceiling only if Candidates editorial refresh visibly closes the gap to Employers and the P2 verify confirms about right-col is non-issue OR resolves it cleanly)
**Axis:** Section identity equalization — Candidates is the weakest section (6.8) vs Employers (7.2). The within-cap design lever this cycle.
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Dispatch Rationale

Cycle 8 plateaued at 7.5 with three correctness-only polish fixes that no real visitor perceives. Score gate (≥ 8.5) does NOT trigger — standard 4-agent slate runs. Convergence guard does NOT trigger — cycle 8 had 4 commits, not stuck. Spark frequency satisfied (Spark ran cycle 7).

The cap holds at 7.5 pending real photography + verified testimonials + published office address — all user-side blocked. The only meaningful within-cap design lever remaining: lift Candidates (6.8) toward Employers (7.2) by giving it a structural identity equivalent to the Employers navy copper panel. P3 is the actionable ship this cycle. P1 stays user-side blocked. P2 is conditional on Builder's verify pass.

---

## Memory Rules — Echoed Into Every Agent Brief

- Apps must NOT look AI-generated. Editorial-luxury restraint (Heidrick / Russell Reynolds register).
- NEVER bail features on mobile via JS `matchMedia`. CSS @media is fine; JS feature-bail is a regression.
- NO fabricated content (no fake names, photos, testimonials, addresses, placement counts, fictional client quotes, "M.R., NYC" attributions). Brand voice copy is fine; fabricated client speech is NOT.
- NO ghost numbers (large faded background numerals behind content).
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414 mobile every cycle.
- Nigel scores from real prospective customer lens. Strict cap 7.5 holds.
- Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle8-<x>` → `?v=cycle9-<initial>` (b/s/p).
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 (390) + iPhone SE (375). Single-position snapshots are NOT verification.
- **NO per-agent texting. DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

---

## Priorities

### P1 — Contact form real endpoint — USER-SIDE BLOCKED

The user has not supplied a Formspree URL, Netlify Forms endpoint, or equivalent. **Document the gap. Skip this cycle.** Builder MUST NOT fabricate an endpoint, MUST NOT alter the existing mailto fallback, MUST NOT manufacture a fake POST handler. Cycle 10 picks up the moment the user supplies a URL.

### P2 — About image slot — CONDITIONAL VERIFY

Builder cycle 8 verified pillars fill the 0.95fr column cleanly at 1440 (computed grid 546px / 494px). Nigel cycle 8 still flagged it. Builder this cycle runs ONE Playwright screenshot pass at 1440 + iPhone 13 (390) + iPhone SE (375) on the about right-column.

- If no visible gap → document and skip the panel build.
- If a genuinely visible gap exists → ship a navy "Photography coming soon" panel positioned in/near the about section right column. MacKai West monogram, gold hairline border, italic Playfair caption. **NO stock photography. NO fabricated people. NO fabricated locations.**

### P3 — Candidates editorial identity refresh — ACTIONABLE SHIP

Replace the existing Candidates treatment (cream gradient + 3px copper left-edge rule + oversized "01" Playfair italic numeral) with a single stronger structural anchor.

**Recommended option (b): copper-on-paper FOR / CANDIDATES stacked Playfair italic mark.** Mirrors Employers' navy copper panel for visual parity while staying distinct (paper background + copper accent vs Employers' navy background + cream accent). Provides Candidates with the editorial identity it currently lacks.

**Frame B rule — REPLACE WHEN ADDING (this applies to Builder this cycle, not just Spark):**
- The existing treatment = cream gradient + copper left-edge + oversized "01" numeral.
- Replacing means: pick the new structural anchor and remove redundant elements. The "01" can co-exist OR be replaced — NOT BOTH kept alongside the new mark.
- Content count must NOT shrink. The three reasons + Submit Resume CTA stay.
- Do NOT pile a quote AND a panel AND keep the cream wash AND keep the copper edge. ONE strongest treatment.

**Acceptance criteria:** Candidates section reads as a distinct editorial identity at 1440, 414, 375. Mobile collapses cleanly without overflow. Three reasons + CTA preserved. Brand voice copy only — NO fabricated quotes, NO fictional client testimonials, NO attributed speech ("M.R., NYC" forbidden).

---

## Cooldowns This Cycle (DO NOT TOUCH)

- Hero (word reveal, parallax horizon, 3D mesh + vertex pulse + edge shimmer + glow ::before) — UNTOUCHED
- Nav — DO NOT TOUCH
- Stat band, marquee tape, industries, employers navy panel, services scroll-lock, magnetic underlines — UNTOUCHED
- About pillars structural content — only ADD photo-slot panel per P2 IF confirmed visible gap; do not restructure pillars
- Process (numerals + line + scroll-draw + step reveal + stagger + ease) — UNTOUCHED
- Footer (wordmark stagger + progress rule + gradient + mobile timing) — UNTOUCHED
- Contact (floating labels + submit choreography + trust badge + label sizes) — UNTOUCHED
- Mobile font floor + tap targets, sticky mobile CTA — UNTOUCHED
- Candidates: REPLACE the cream-wash treatment per P3 (this is the ONLY section being restructured this cycle)

---

## Agent Slate (Execution Order)

### 1. Builder — P2 verify + (conditional) panel, then P3 Candidates refresh

**P2 first — Verify-then-fix.** Playwright screenshot pass at 1440 / 390 / 375 capturing the `.about__inner` right column. If pillars fill cleanly → document non-issue, skip panel. If a genuinely visible gap exists → build a navy "Photography coming soon" panel (MacKai West monogram, italic Playfair caption, gold hairline border) in/near the about right column. NO stock photography. NO fabricated people. NO fabricated locations.

**P3 second — Candidates editorial identity.** Execute option (b): copper-on-paper FOR / CANDIDATES stacked Playfair italic mark mirroring Employers' navy panel. Paper background, copper accent. REPLACE the cream gradient + 3px copper left-edge + oversized "01" treatment. Keep three reasons + Submit Resume CTA. Frame B applies — replace, don't pile. The "01" numeral can co-exist OR be replaced; not both kept alongside the new mark. NO fabricated quotes. NO ghost numbers (the new mark is structural type, not a faded background numeral).

**Files Builder may touch:** `index.html` (P3 markup for new mark; P2 only if panel confirmed), `style.css` (P3 candidates restructure replacing existing cream-wash + edge-rule + numeral; P2 panel styles if needed), `main.js` (only if new behavior needed — prefer pure CSS). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle9-b`.

**Files Builder must NOT touch:** every section under Cooldowns. Hero. Nav. Stat. Marquee. Industries. Employers panel. Services scroll-lock. Process. Magnetic underlines. Sticky CTA. Footer. Contact. About pillars structural content (only ADD photo-slot per P2 if confirmed gap).

**Memory rules MUST respect:** Apps must NOT look AI-generated; NEVER bail features via matchMedia; NO fabricated quotes/testimonials/attributions/people; NO ghost numbers; Spark replaces, doesn't pile (also applies to Builder this cycle on P3); Frame B keeps content count; respectful tone.

**Verification:** Playwright ≥5 positions × 3 viewports (1440 / 390 / 375). Capture: P2 about right column screenshots; P3 Candidates section at multiple scroll positions verifying mark renders, three reasons preserved, CTA preserved, mobile stack clean. Regenerate `style.min.css`. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `builder cycle 9: about right-col <verify/panel> + candidates editorial identity (FOR / CANDIDATES copper-on-paper mark, replaces cream-wash) — <verification>`

---

### 2. Spark — Frame B polish on Builder's Candidates refresh (and panel if shipped)

**Scope:** Frame B refine whatever Builder landed. Candidates new mark — refine italic letter-spacing, copper tone vs gold-deep weight, hairline rule weight, vertical rhythm between mark and reasons, mobile mark stacking. If Builder also shipped P2 photo-slot panel — refine caption type weight + border weight + monogram scale.

**Frame B is REPLACE-WHEN-ADDING.** Do not stack additional decorative elements on top of Builder's new Candidates mark. If Builder's mark is the anchor, redundant cream-wash decoration goes (Builder removed in P3, do not reintroduce). Frame B keeps content count — three reasons + CTA preserved.

**SKIP if Builder shipped no visible elements** (e.g., P2 verify confirmed no gap AND P3 was bypassed for some reason). In skip case, append `spark cycle 9: skipped — no new element to refine` to `CHANGELOG-AGENT.md` only.

**Files Spark may touch (conditional):** `style.css` for Candidates new mark and (if shipped) P2 panel. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle9-s`.

**Files Spark must NOT touch:** every section under Cooldowns. Builder's structural P3 markup (only refine its CSS). Anything Spark already polished in cycles 6/7 (sticky CTA gold ghost border, process step soft-spring ease, contact badge dot-pulse, hero vertex-pulse + edge-shimmer + radial glow).

**Memory rules MUST respect:** Frame B keeps content count; Spark replaces, doesn't pile; simplicity over polish; Apps must NOT look AI-generated; unique design; NO fabricated content; NO ghost numbers; respectful tone.

**Verification:** Playwright 3 viewports. Regenerate `style.min.css`. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format (if running):** `spark cycle 9: Frame B candidates mark — <verification>`
**Commit format (if skipping):** changelog line only.

---

### 3. Pixel — Verify Cycle 9 changes + standing 375/414 alignment sweep

**Scope:**
1. **P3 Candidates new mark verification at desktop 1440 + iPhone 13 (390) + iPhone SE (375):** mark renders at all three viewports, three reasons preserved, Submit Resume CTA preserved, mobile stack clean, no overflow.
2. **P2 about right column verification at 1440 + 390 + 375:** confirms Builder's verify call, OR confirms shipped panel renders cleanly without AI-default-card register.
3. **Standing center-alignment audit at 375 + 414** — every section reads cleanly aligned (Pixel's standing duty per memory).
4. **Full overflow audit:** docWidth equals winWidth at 375, 390, 414.
5. **Tap target audit:** every interactive element ≥ 44 × 44 px on mobile. Submit Resume CTA in restructured Candidates must remain ≥ 44 px.
6. **Font floor audit:** no text below 13 px on mobile in restructured Candidates section.

**Files Pixel may touch (only if verification reveals a defect):** `style.css` mobile-only fixes (≤480 px or ≤768 px breakpoints) for Candidates new mark or P2 panel only. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle9-p`.

**Files Pixel must NOT touch:** desktop styles outside standing audit scope. Structural HTML. Anything under Cooldowns at desktop scope. JS observer logic.

**Memory rules MUST respect:** Pixel always audits center-alignment at 375 + 414; scroll-test ≥5 positions, not single snapshots; tap targets ≥ 44 px; 13 px font floor; NEVER bail features via matchMedia; NO ghost numbers; respectful tone.

**Verification:** Playwright 5 positions × 375 + 414 + 1440. Regenerate `style.min.css` if edited. **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `pixel cycle 9: verify candidates mark + about right-col + standing alignment — <pass / fix-list>`

---

### 4. Nigel — Re-score, write cycle 10 priorities, append SCORES.log

**Scope:**
- Score from a real prospective candidate's 90-second scroll lens (Senior Tax Manager deciding whether to submit a resume) AND a real prospective employer's lens (Tax Practice Leader on a $40K retained search).
- Strict cap 7.5 holds. Cycle 9 expected: 7.5 plateau (Δ +0.0) or 7.6 ceiling (Δ +0.1) only if Candidates editorial refresh visibly closes the 6.8 → 7.2 gap to Employers in a real-buyer 90-second scroll.
- Write **AUDIT.md cycle 10 top-3 priorities** — concrete, ranked, with acceptance criteria. Do NOT recommend removing any glow / animation / effect / structural element. Recommend additions only.
- Append one line to `SCORES.log`: `cycle 9: <score> (Δ <delta>) — <one-line summary>`.
- Append Nigel entry to `CHANGELOG-AGENT.md`.
- If P1 contact endpoint remains user-side blocked, document it as the standing top blocker — do NOT recommend Builder fabricate one.

**Files Nigel may touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.

**Files Nigel must NOT touch:** `index.html`, `style.css`, `style.min.css`, `main.js`. Nigel does not build — Nigel scores.

**Memory rules MUST respect:** Nigel scores stricter (real-user perspective, not generously); Nigel never recommends removing quality features; strict 7.5 cap; respectful tone — never call user a bottleneck; NO fabricated content recommendations; NO ghost numbers.

**Verification:** **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.**

**Commit format:** `nigel cycle 9: re-score <score> — <one-line summary>`

---

## Verification gate before Nigel scores

After Builder + (conditional Spark) + Pixel ship, the live site must show on Playwright:
- Candidates section reads as a distinct editorial identity at 1440 / 390 / 375. Three reasons + CTA preserved. No fabricated quotes. New mark stacks cleanly on mobile.
- About right column at 1440: pillars fill cleanly OR new "Photography coming soon" panel renders cleanly without AI-default-card register.
- 375 + 414: center-alignment consistent, zero horizontal overflow, tap targets ≥ 44 px, fonts ≥ 13 px in restructured Candidates section.
- `style.min.css` regenerated after every CSS edit.
- Site does NOT look AI-generated — Heidrick / Russell Reynolds editorial restraint holds.

If any fail, the failing agent re-runs before Nigel scores.

---

## Cap-lifting conditions (unchanged)

- Real photography of leadership / office / brand
- Verified testimonials with attribution
- Published office address
- Real contact form endpoint (cycle 9 P1 — user-side blocked)

When all four land simultaneously, expected score range: 7.8–8.1.

---

*Coordinator cycle 9 — 2026-04-27. Scheduled: Builder, Spark, Pixel, Nigel. Focus axis: Candidates editorial parity. Forbidden cooldowns: hero, nav, stat band, marquee tape, industries, employers, services, magnetic underlines, footer, contact, about pillars structural content, process, mobile font floor, sticky CTA.*
