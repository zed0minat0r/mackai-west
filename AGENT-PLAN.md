# MacKai West — AGENT-PLAN cycle 2

**Date:** 2026-04-27
**Cycle:** 2
**Score baseline:** 5.8 (cycle 1)
**Score target:** 6.5–7.0 (hard cap 7.5 holds — no real photos / testimonials / address)
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Rationale

Cycle 1 moved a half-step on "basic and generic" via marquee tape, copper vignette, ordinal numerals, and gold-rule hover. The mid-cycle iOS notch + dropdown overlap fixes are stable and on cooldown. The three sections a real prospective client lingers in — **About, Candidates, Employers, Process** — are still the weakest by design investment. Cycle 2 attacks all three with strict no-fabrication, no-feature-bail discipline.

---

## Forbidden sections this cycle (cooldown — DO NOT TOUCH)

- Hero (silhouette + word reveal — Builder cycle 0)
- Nav (iOS notch + dropdown overlap fix — Builder cycle 1 + hotfix `ab2e903`)
- Stat band (copper vignette + gold rule + small-caps — Spark cycle 1)
- Marquee tape (Spark cycle 1 — only Pixel may touch IF overflow detected)
- Industries 01/02/03 numerals + gold-rule hover (Spark cycle 1)
- Mobile 13px font floor + footer tap target (Pixel cycle 1)
- Services, Contact form, Footer (cooldown — untouched)

---

## Memory rules — every agent MUST respect

- Apps must NOT look AI-generated. Break default patterns.
- NEVER bail features on mobile via `matchMedia` / vertical-stack collapse / hidden behind a media query. Fix the underlying CSS/JS mismatch — especially the closed-dropdown-overlap class of bug we just fixed.
- NO fabricated content (no fake names, testimonials, addresses, placement counts, URLs, social handles).
- NO ghost numbers (large faded BACKGROUND numerals behind content). Oversized FOREGROUND numerals on Candidates/Employers ARE fine and recommended for P2.
- Spark replaces when adding — never piles on. Frame B keeps content count.
- Pixel audits center-alignment at 375 + 414.
- Nigel scores from a real prospective client lens (CFO, Tax Practice Leader, Senior-Manager candidate). Strict cap 7.5 until real photos + testimonials + published address all land.
- Respectful tone — never call user a bottleneck.
- After every CSS edit: regenerate `style.min.css` via `npx clean-css-cli -o style.min.css style.css`.
- Bump cache-buster on `style.min.css` link to `?v=cycle2-<initial>` (b/s/p/n) so Safari refetches.
- Verification: Playwright must scroll through ≥5 positions on **desktop 1440 + iPhone 13 + iPhone SE**. Single-position snapshots are NOT verification.
- **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.** Only the orchestrator texts.

---

## Execution order

### 1. Builder — P1 About overhaul + P3 Process visual weight

**Brief:** Replace the two Unsplash stock photos in the About section with a typographic / graphic anchor (large Playfair display moment, abstract architectural mark, OR a Corbusier-style line drawing) — OR purpose-fit photography ONLY if a clearly better, non-template stock asset exists. Resolve the 375px inset-photo overlap (currently reads as a clipping error). Then increase Process visual weight: stroke-width 1.5 → 2px+, ghost line opacity 0.18 → 0.30+, step numerals 0.78rem eyebrow → 3-4rem Playfair italic so the numbers anchor as the focal point. Re-tune scroll-draw easing so the line is still drawing when the user reaches the step grid.

**Files to touch:** `index.html` (about section markup + process step numerals), `style.css` (.about, .process, .process-step__num), `main.js` (scroll-draw easing if needed), regenerate `style.min.css`, bump cache-buster to `?v=cycle2-b`.
**Files NOT to touch:** hero, nav, stat band, marquee tape, industries, services, contact, footer.
**Memory rules to echo in prompt:** No fabricated content. No matchMedia bail on mobile. No ghost background numerals (foreground oversized numerals on Process steps ARE the goal). Verify at 5 scroll positions on 1440 + iPhone 13 + iPhone SE.
**Commit message:** `builder cycle 2: about typographic anchor + process numeral scale + line weight bump`

---

### 2. Spark — P2 Candidates + Employers visual backbones (must read DIFFERENT from each other)

**Brief:** Both sections are currently flat left-column text + bullets + button — the longest scroll distance with the least design investment. Give each a distinct anchor. Options: a large Playfair pull-quote on the right side, a copper wash panel, an oversized FOREGROUND numeral (00 / 01 style — explicitly approved for P2), or a typographic treatment. The two sections must feel visually distinct from one another after the cycle (Candidates = senior professional, Employers = hiring leader). **Replace the flat layout — do not pile on. Keep content count.** No new sections.

**Files to touch:** `index.html` (candidates + employers section markup only), `style.css` (.candidates, .employers and any new modifier classes), regenerate `style.min.css`, bump cache-buster to `?v=cycle2-s`.
**Files NOT to touch:** about (Builder owns), process (Builder owns), hero, nav, stat band, marquee tape, industries, services, contact, footer.
**Memory rules to echo in prompt:** Replace when adding, never pile on. Frame B keeps content count. No fabricated testimonials or quote attributions in the pull-quote — if used, must be brand-voice editorial line, NOT attributed. No ghost background numerals (foreground oversized 00/01 IS the recommended pattern). No matchMedia bail on mobile.
**Commit message:** `spark cycle 2: candidates + employers visual backbones — distinct anchors, no content stripped`

---

### 3. Pixel — Mobile alignment audit at 375 + 414 over all new work

**Brief:** Audit center-alignment consistency at iPhone SE (375) and iPhone Pro Max (414) across the new About anchor, the new Candidates and Employers anchors, and the scaled-up Process numerals. Verify no horizontal overflow, no overlapping CTAs with new visual elements, all new tap targets ≥44px. Confirm marquee tape still has no overflow after the changes above and below it. Do NOT introduce new features or restyle — Pixel is a polish + alignment pass only.

**Files to touch:** `style.css` (alignment + tap target tweaks only), regenerate `style.min.css`, bump cache-buster to `?v=cycle2-p`.
**Files NOT to touch:** index.html structure, main.js, any cooldown section.
**Memory rules to echo in prompt:** Center-alignment audit on mobile is the standing Pixel mandate. No matchMedia bail. 13px font floor still applies to any new copy. No content stripping. No ghost numerals.
**Commit message:** `pixel cycle 2: mobile alignment audit + tap target check across new about/candidates/employers/process work`

---

### 4. Nigel — Re-score from prospective customer lens, write cycle 3 priorities

**Brief:** Score from the lens of a CFO opening a $40K retained search OR a Senior-Manager tax candidate evaluating which boutique to engage. Strict cap 7.5 until real photos + real testimonials + published office address all land. Append to `SCORES.log`. Rewrite `AUDIT.md` with cycle 3 top-3 priorities in ranked form with acceptance criteria. Note explicitly whether the "basic and generic" axis moved another half-step or stalled. Never recommend removing glows / animations / effects — only adding or improving.

**Files to touch:** `AUDIT.md` (full rewrite for cycle 2 → cycle 3 priorities), `SCORES.log` (append one line), `CHANGELOG-AGENT.md` (append one line).
**Files NOT to touch:** index.html, style.css, style.min.css, main.js, AGENT-PLAN.md.
**Memory rules to echo in prompt:** Strict cap 7.5. Score from real customer perspective. Respectful tone — never call user a bottleneck. Never recommend removing quality elements. No ghost numbers in any cycle 3 recommendation.
**Commit message:** `nigel cycle 2: score <X.X> — <one-line rationale>`

---

## Stop conditions (per agent)

- 30-tool-call hard cap → commit progress, append `STOP cycle-cap` to CHANGELOG-AGENT.md, exit.
- If a CSS edit lands without `style.min.css` regeneration → that agent's work is incomplete — regenerate before commit.
- If verification cannot scroll through 5 positions on all three viewports → agent must mark the work unverified in commit message and not claim "fixed".
