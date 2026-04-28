# MacKai West — AGENT-PLAN cycle 3

**Date:** 2026-04-27
**Cycle:** 3
**Score baseline:** 6.3 (cycle 2)
**Score target:** 7.0–7.3 (hard cap 7.5 holds — no real photos / testimonials / address yet)
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Rationale

User escalation received this cycle (verbatim): **"we need more features. Every section needs to have a distinct, eye catching feature."**

Cycle 3 keeps Nigel's P1 (Candidates reveal-opacity defect — a live conversion blocker) but pivots from the rest of cycle 2's audit toward three user-asked distinctive features. Concentrate work in 4 agents: Builder loaded with P1 + two animations (count-up, magnetic underlines), Spark owns the single biggest distinctive feature (Industries hover-reveal panels) plus targeted Frame B polish on the just-landed services scroll-lock panels, Pixel verifies mobile across the new mechanics with multi-position scroll sampling, Nigel re-scores.

---

## Forbidden sections this cycle (cooldown — DO NOT TOUCH)

- Hero (cycle 0 word reveal + cycle 2.5 multi-layer parallax)
- Nav (multiple hotfixes — including brand line-height, padding-top, dropdown opacity-based hide)
- Stat band copper vignette + gold rule + small-caps label (Spark cycle 1) — the count-up JS ADDS to it; no visual change to vignette/rule/label
- Marquee tape (Spark cycle 1)
- About pillars (just landed `9af473b`)
- Process numerals + scroll-drawn line (Builder cycle 2)
- Employers navy panel (Spark cycle 2)
- Mobile 13px font floor + tap targets (Pixel cycles 1+2)
- Services scroll-lock structure / JS / lock mechanics (Builder cycle 2.5 just landed — Pixel verifies, Spark may polish typography only, never touches the JS)

---

## Memory rules — every agent MUST respect

- Apps must NOT look AI-generated. Editorial restraint AND distinctive feature execution.
- NEVER bail features on mobile via `matchMedia` / vertical-stack collapse / hidden behind a media query. Convert hover → tap-to-reveal on mobile, never disable.
- NO fabricated content. Industry roles can be GENERIC archetypes (e.g. "Tax Director," "VP Finance," "Controller") — those are real categories, not invented placements. No fake names, companies, testimonials, addresses, or social handles.
- NO ghost numbers (faded BACKGROUND numerals behind content). FOREGROUND oversized numerals (the existing "01" on Candidates) ARE allowed and explicitly preferred.
- Spark replaces when adding — never piles on. Frame B keeps content count.
- Pixel must audit center-alignment at 375 + 414.
- Nigel scores from a real prospective customer lens. **Strict cap 7.5** until real photography + real testimonials + a published address all land. Nigel never recommends removing glows / animations / effects — only adds or improves.
- Respectful tone — never call the user a bottleneck.
- After every CSS edit: `npx clean-css-cli -o style.min.css style.css`
- Bump cache-buster on `style.min.css` link from `?v=cycle2-impressive` → `?v=cycle3-<initial>` (b/s/p) so Safari refetches.
- Verification: Playwright must scroll ≥5 positions through scroll-driven sections at desktop 1440 + iPhone 13 + iPhone SE. Single-position snapshots are NOT verification.
- **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.** Only the orchestrator texts.

---

## Execution order

### 1. Builder — P1 Candidates fix + F1 stat count-up + F3 magnetic underlines

**Brief:**
- **P1 Candidates reveal-opacity fix.** The heading "A long career is built on the right next move." renders near-invisible at first viewport entry due to scroll-reveal animation timing. Either (a) raise the start-state opacity to ≥0.85, (b) shift the IntersectionObserver threshold so the reveal completes before the section is in primary view, or (c) fire the reveal earlier (e.g. `rootMargin: "0px 0px -10% 0px"`). Heading must be at full opacity when the section is ~30% scrolled into viewport.
- **P1 Numeral visual connection.** The "01" must visually anchor the right-column copy — not float as an orphan. Acceptable: a thin vertical copper rule between numeral column and content column, a subtle column-background contrast, OR repositioning the "01" as a within-column decorative element above the eyebrow + headline. Pick ONE — execute cleanly.
- **F1 Stat band count-up animation.** When the stat band enters viewport, the "$40K+" figure animates from 0 → 40 with smooth easing (cubic-bezier or ease-out, ~1.4s duration). Single fire on enter, never repeats. Respects `prefers-reduced-motion: reduce` (skip animation, show final value). Do NOT alter copper vignette, gold rule, or small-caps label — count-up JS adds only.
- **F3 Magnetic copper underlines on nav links + footer links.** On hover, the underline pulls slightly toward the cursor X position before settling. Subtle (~6px max pull). Implementation: `::after` pseudo with `transform: translateX(var(--mx, 0px))`, JS sets the CSS var on `mousemove` and clears on `mouseleave`. CSS transition handles the smoothing. Touch devices: no JS attaches — static underline behavior is the correct fallback.

**Files to touch:** `index.html` (count-up data hook + any aria for the numeral), `style.css`, `main.js`. Regenerate `style.min.css`. Bump cache-buster to `?v=cycle3-b`.
**Files NOT to touch:** All cooldown sections above. Especially DO NOT touch services scroll-lock JS, hero parallax JS, or process scroll-draw JS.
**Memory rules to echo in prompt:** No fabricated content. No matchMedia bail. No ghost background numerals (foreground "01" stays). `prefers-reduced-motion` MUST be respected by both count-up and magnetic underlines. Verify ≥5 scroll positions on 1440 + iPhone 13 + iPhone SE.
**Commit message:** `builder cycle 3: candidates reveal fix + stat count-up + magnetic nav/footer underlines`

---

### 2. Spark — F2 Industries hover-reveal panels + Frame B polish on services panels

**Brief:**
- **F2 Industries hover-reveal expanded panel (Frame A — distinctive feature).** Each of the 3 industry cards (Construction / Real Estate / Manufacturing) gets a foreground reveal on hover that surfaces additional role archetypes typical for that industry. NOT a tooltip. The panel slides or fades IN from below, replacing or layering over the existing card content. Pick ONE reveal style — execute it well, no piling on. Roles MUST be GENERIC archetypes ("Tax Director," "VP Finance," "Controller," "Senior Accountant") — never invented company names or specific placements. Mobile (no hover): a button with `aria-expanded` toggles the reveal on tap. CSS transition only — no JS-driven height animation. Replace the existing card body content at hover-state — do NOT pile on additional copy outside the reveal.
- **Frame B polish on services scroll-lock panels (Tax / F&A).** The major restructure landed in `cc266b3`. Typography hierarchy may need tuning: eyebrow → headline → bullet list spacing, italic accents, gold rule placement. **Do NOT touch `main.js`, lock runway (240vh), `SLIDE_FRAC` (0.85), dot indicators, or panel structure.** Frame B is typography/spacing only. Keep content count identical.

**Files to touch:** `index.html` (industries cards markup + tap-to-reveal button + aria-expanded), `style.css` (industries reveal + services panel typography). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle3-s`.
**Files NOT to touch:** `main.js` (services scroll-lock JS untouchable), hero, nav, stat band visuals, about pillars, process, employers, candidates (Builder owns P1).
**Memory rules to echo in prompt:** Replace when adding, never pile on. Frame B keeps content count. No fabricated content — generic role archetypes only. No matchMedia bail — convert hover → tap-to-reveal on mobile. Hover-reveal must remain accessible: `aria-expanded` correctly toggled, focusable button, focus-visible state.
**Commit message:** `spark cycle 3: industries hover-reveal panels + services panel typography polish`

---

### 3. Pixel — Mobile audit at 375 + 414 + multi-position scroll verification

**Brief:**
- **Critical: Services scroll-lock mobile verification.** Just got restructured to 2 panels with row-layout on mobile in `cc266b3`. Sample 5 scroll positions through the section (5%, 25%, 50%, 75%, 95%) on iPhone 13 (390) AND iPhone SE (375) — verify the slide actually works on mobile, transforms apply, no horizontal overflow, dot indicators render correctly.
- Verify F1 stat count-up fires once at viewport entry on mobile and respects `prefers-reduced-motion`.
- Verify F2 industries hover-reveal converts to tap-to-reveal on mobile via the aria-expanded button — tap target ≥44px, reveal panel readable, no overflow, focus-visible state present.
- Verify F3 magnetic underlines do not break on touch (static behavior on mobile is the correct fallback — no JS attach on touch).
- Verify P1 Candidates heading renders at full opacity at section first-entry on mobile.
- Center-alignment audit at 375 + 414 — re-confirm no regressions in nav, hero, about pillars, candidates "01," employers panel, services panels.
- 13px font floor must hold across all new copy.
- All tap targets ≥44px.

**Files to touch:** `style.css` (mobile fixes only if defects found — do NOT redesign). Regenerate `style.min.css`. Bump cache-buster to `?v=cycle3-p` if CSS edits.
**Files NOT to touch:** `main.js`, `index.html` structure, anything not actively broken on mobile.
**Memory rules to echo in prompt:** Center-alignment audit on mobile is the standing Pixel mandate. No matchMedia bail. No content stripping. No ghost numerals. 13px font floor still applies.
**Commit message:** `pixel cycle 3: <one-line summary of what was audited / fixed>`

---

### 4. Nigel — Re-score from prospective customer lens, write cycle 4 priorities

**Brief:**
- Re-score from the lens of a CFO opening a $40K retained search OR a Senior-Manager tax candidate evaluating which boutique to engage. **Strict cap 7.5** still applies — no real photos, no testimonials, no published address yet.
- Append to `SCORES.log` with `cycle 3: <score> (Δ <±N>) — <one-line summary>`.
- Rewrite `AUDIT.md` with cycle 4 top-3 priorities in ranked form with acceptance criteria.
- Specifically evaluate: did the count-up land or feel gimmicky? Does the industries hover-reveal look intentional or templated? Are the magnetic underlines noticeable enough to register as a craft signal without being annoying? Did the Candidates section finally read confident at first-viewport-entry?
- Note explicitly whether the "every section has a distinct eye-catching feature" axis moved another step or stalled.
- Nigel never recommends removing glows / animations / effects — only adding or improving.

**Files to touch:** `AUDIT.md` (full rewrite for cycle 3 → cycle 4 priorities), `SCORES.log` (append one line), `CHANGELOG-AGENT.md` (append one line).
**Files NOT to touch:** `index.html`, `style.css`, `style.min.css`, `main.js`, `AGENT-PLAN.md`.
**Memory rules to echo in prompt:** Strict cap 7.5. Score from real customer perspective. Respectful tone — never call user a bottleneck. Never recommend removing quality elements. No ghost numbers in any cycle 4 recommendation.
**Commit message:** `nigel cycle 3: score <X.X> — <one-line rationale>`

---

## Stop conditions (per agent)

- 30-tool-call hard cap → commit progress, append `STOP cycle-cap` to `CHANGELOG-AGENT.md`, exit.
- If a CSS edit lands without `style.min.css` regeneration → that agent's work is incomplete — regenerate before commit.
- If verification cannot scroll through 5 positions on all three viewports → agent must mark the work unverified in the commit message and not claim "fixed."
- **DO NOT call `mcp__plugin_imessage_imessage__reply` / DO NOT TEXT THE USER.** Only the orchestrator texts.
