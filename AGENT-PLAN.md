# Agent Plan — MacKai West Cycle 4

**Date:** 2026-04-27 (ET)
**Score baseline:** 6.8 (cycle 3) | **Target:** 7.3–7.5 (cap 7.5 holds until photos / testimonials / address land)
**Cycle focus:** Distinctiveness push — Candidates visual identity, Contact signature feature, Footer signature feature, About pillars subtle interactivity. Concentrated work in 4 agents.

**Cycle 3 carryover already shipped (skip):**
- Hero parallax fixed (b5a2549)
- Stat count-up timing fixed (b5a2549)
- Hero 3D wireframe octahedron + service tilt + industry flip (1863cee)

---

## Memory rules (echoed into every agent prompt)

- Apps must NOT look AI-generated. Editorial-luxury restraint.
- NEVER bail features on mobile via `matchMedia`. Use TOUCH detection (`'ontouchstart' in window`) when needed.
- NO fabricated content — no fake placement stories, no fake company names, no fake "Est. 1985" dates, no fake testimonials, no fake addresses.
- NO ghost numbers (faded background numerals user dislikes). Foreground oversized numerals are fine.
- Spark replaces when adding, never piles on. Frame B keeps content count.
- Pixel must audit center-alignment 375 + 414 mobile, every cycle.
- Nigel scores from a real prospective customer lens. Strict cap 7.5 until real photography + real testimonials + real published office address all land.
- Respectful tone — never call the user a bottleneck.
- **DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER.** Only the orchestrator texts.
- Verification: Playwright must scroll through ≥5 positions on desktop 1440 + iPhone 13 + iPhone SE; single-position snapshots are NOT verification.
- After every CSS edit regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link from `?v=cycle4-3d` → `?v=cycle4-<initial>` after CSS edits (b for builder, s for spark, p for pixel).

## Cooldowns this cycle (DO NOT TOUCH)

- Hero word reveal, hero parallax horizon, hero 3D mesh octahedron
- Nav (locked)
- Stat band copper vignette + count-up + plus animation
- Marquee tape
- Industries 01/02/03 numerals + hover-reveal panels + 3D flip
- About pillars **structural content** (interactivity-only changes are OK in cycle 4)
- Employers navy panel
- Process numerals + line + scroll-draw
- Services scroll-lock structure + JS + 3D tilt
- Services panel typography
- Magnetic underlines
- Mobile 13px font floor + tap targets

---

## Agent execution order

### 1) Builder — Candidates distinctive identity + Footer signature feature

**Scope (P1):** Give the Candidates section a distinct visual identity so it reads visually different from the navy Process above and the cream Employers below.
- Apply a cream wash (e.g., `#FAF7F2` or `--cream` at low overlay) OR a copper left-edge treatment that bleeds inward from the `01` numeral column. Pick whichever creates clearer contrast with neighboring sections.
- Verify the three bullet points render at full body weight (parity with Employers reasons list).
- Verify the "Submit a Resume" CTA reads as primary — at minimum equal visual prominence with the Employers "Open a Search" button.
- Acceptance: section reads visually distinct from neighbors at 5 scroll positions on desktop 1440 + iPhone 13 + iPhone SE.

**Scope (P3):** Footer signature feature — combine two subtle moves.
- (a) Animated wordmark on scroll-into-view: Playfair italic letters of the wordmark animate in with a small stagger (translateY 12px → 0, opacity 0 → 1, ~80ms delay between letters, fires once on intersection).
- (b) Scroll-driven progress indicator: thin gold rule across the top edge of the footer that fills 0% → 100% as the user reaches the very bottom of the page (use `scrollY / (docHeight - viewportHeight)` clamped). Reduced-motion guard required.
- Both must respect `prefers-reduced-motion: reduce` (static end-state).

**Files to touch:** `index.html`, `style.css`, `main.js`, regenerate `style.min.css`, bump cache-buster to `?v=cycle4-b`.
**Files NOT to touch:** Hero, nav, stat band, marquee tape, industries 3D flip, about pillars, process, employers panel, services scroll-lock, contact section.
**Commit:** `builder cycle 4: candidates cream wash + footer wordmark stagger + scroll progress rule`
**MEMORY echoes:** No fabricated content. No ghost numbers. NEVER bail on mobile via matchMedia. After CSS edits regenerate min + bump cache-buster. DO NOT TEXT THE USER.

---

### 2) Spark — Contact signature feature + About pillars interactivity

**Scope (P2 / Frame A):** Contact section signature feature — combine two moves that read considered, not gimmicky.
- (a) **Floating-label form fields**: label sits inside the field by default, animates upward + scales smaller when the field is focused or has a value. Apply across name, email, phone, message inputs and the type select. Keep accessibility (real `<label>` + `for=`) intact.
- (d) **Animated submit button choreography**: button morphs into "Sending…" on submit, then a checkmark pulse on success (or back to default on mailto fallback dispatch). Smooth, no flash of unstyled state.
- Replace the existing flat form styling — do not pile on top.

**Scope (P4 / Frame B):** About pillars subtle interactivity.
- Either: subtle hover state on each pillar — Roman numeral grows slightly + the gold rule extends — OR a scroll-into-view stagger reveal where each pillar fades in with ~100ms delay.
- Pick whichever adds polish without piling on. Frame B must KEEP content count — do NOT restructure or remove pillars I/II/III.

**Files to touch:** `index.html`, `style.css`, `main.js`, regenerate `style.min.css`, bump cache-buster to `?v=cycle4-s`.
**Files NOT to touch:** Hero, nav, stat band, marquee tape, industries, employers, process, services scroll-lock, candidates section (Builder owns Candidates this cycle), footer (Builder owns).
**Commit:** `spark cycle 4: Frame A contact floating labels + animated submit / Frame B about pillar reveal`
**MEMORY echoes:** Replace, don't pile on. Frame B keeps content count. No fabricated content. NEVER bail on mobile via matchMedia. After CSS edits regenerate min + bump cache-buster. DO NOT TEXT THE USER.

---

### 3) Pixel — Mobile alignment audit + 3D regression check

**Scope:** Mobile center-alignment audit at 375 (iPhone SE) + 414 (iPhone 13 Pro Max-ish) viewports.
- Verify new Candidates treatment renders with the cream wash / copper edge as intended on mobile, no horizontal overflow, CTA tap target ≥44px, body bullets readable.
- Verify floating labels in Contact: animate correctly on focus/blur, do not collide with field borders, no zoom-on-focus iOS issue (font-size ≥16px on inputs to prevent iOS zoom).
- Verify footer scroll-driven progress rule renders correctly — does not cause layout shift, does not introduce horizontal scroll, fills smoothly at 5 scroll positions.
- Verify About pillar interactivity fires on tap/scroll on mobile.
- **Regression check on 3D features (1863cee):** industry card flip works on tap (mobile uses JS toggle, not hover), service-fp tilt is bypassed on touch (no broken tilt residue), hero mesh octahedron rotates without horizontal overflow.
- Audit center-alignment of all section headers + CTAs at 375 and 414. Document any drift.

**Files to touch:** `style.css` for any drift fixes, regenerate `style.min.css`, bump cache-buster to `?v=cycle4-p`. Otherwise verification-only.
**Files NOT to touch:** Functional JS, structural HTML.
**Commit:** `pixel cycle 4: mobile alignment audit + 3D regression check + any drift fixes`
**MEMORY echoes:** Audit center-alignment 375 + 414 every cycle. NEVER bail on mobile — fix the underlying CSS. 13px font floor. Tap targets ≥44px. After CSS edits regenerate min + bump cache-buster. DO NOT TEXT THE USER.

---

### 4) Nigel — Cycle 4 score + AUDIT.md cycle 5 priorities

**Scope:** Re-score from a real prospective customer lens (Tax Practice Leader deciding on a $40K retained search; Senior Manager Tax candidate deciding to submit a resume).
- Strict cap 7.5 holds — no real photos, no real testimonials, no real published street address yet.
- Score ≥ cycle 3's 6.8 only if the new features (Candidates identity, Contact floating labels + submit choreography, Footer wordmark + progress rule, About pillar interactivity) actually elevate the section's perceived quality.
- Nigel must NEVER recommend removing glows / animations / effects. Only ADD or IMPROVE.
- Append one line to `SCORES.log` with the cycle 4 score + delta + one-sentence rationale.
- Rewrite `AUDIT.md` for cycle 5: top-3 priorities ranked, acceptance criteria for each, what worked / what's still off.
- Append one line to `CHANGELOG-AGENT.md`.

**Files to touch:** `AUDIT.md`, `SCORES.log`, `CHANGELOG-AGENT.md`.
**Files NOT to touch:** index.html, style.css, main.js, style.min.css.
**Commit:** `nigel cycle 4: re-score <X> — <one-line summary>`
**MEMORY echoes:** Score from real customer lens. Cap 7.5. Never recommend removing glows / animations / effects. Respectful tone — never blame user for blockers. DO NOT TEXT THE USER.

---

## Rationale

Cycle 3 carryover (hero parallax + stat count-up + 3D features) already shipped in interrupt commits b5a2549 + 1863cee, so cycle 4 concentrates on the remaining open priorities: Candidates section identity (still the visual weak point), and three signature distinctiveness moves the user has been pushing for — Contact, Footer, About pillars. Four agents, no spread, each with one or two clearly-scoped deliverables. Section cooldowns prevent re-touching anything stable. Memory rules echoed in every brief.
