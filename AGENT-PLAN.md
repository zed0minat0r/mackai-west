# MacKai West — Cycle 10 Agent Plan

**Coordinator dispatch:** 2026-04-27
**Cycle 9 outcome:** 7.5 plateau (third cycle at cap). Candidates section moved 6.8 → 7.0 internally; overall held at the cap. Cap remains content-gated (real photography + testimonials + address).
**Live:** https://zed0minat0r.github.io/mackai-west/

---

## Decision rationale

- **Score gate (7.5 cap):** Cycle 9 = 7.5, just at the cap line. Treating as "polish + decisive contrast move" — not a content cycle. Builder is still scheduled because the central remaining design lever is contrast on the Candidates panel, not content.
- **Convergence guard:** Last 2 coordinator entries committed cleanly. Not stuck.
- **Section cooldown:** Hero, nav, stat band, marquee, industries, employers panel, services scroll-lock, magnetic underlines, footer, contact, process, mobile font floor, sticky mobile CTA, about pillars structural content — all FORBIDDEN.
- **Spark frequency:** Spark ran cycle 9; running again as Frame B polish on the new navy-twin Candidates panel.
- **Memory drift check:** Recent memory entries (no-ghost-numbers, no-dev-content, frame-b-richness, simplicity-over-polish, unique-design) all echoed into briefs.
- **Audit priority match:** AUDIT.md cycle 9 P1 = Candidates panel contrast (recommended option B = full navy). Builder owns this. P2 (form endpoint) is user-side blocked, documented and skipped. P3 (about image slot) re-scoped to small intentional brand artifact, not stock photography.

---

## Cycle 10 axis

**Visual weight parity between Candidates and Employers** — close the contrast gap that held cycle 9 at the cap. Recommend option B (full navy panel, mirroring Employers in color while remaining mirrored in column position) for decisive parity.

---

## Scheduled agents (in order)

### 1. Builder

**Brief:** Execute P1 + P3 from AUDIT.md cycle 10.

**P1 — Candidates panel full-navy inversion (recommended path):**
- Flip `.candidates__panel` background from cream-2 (#FAF6EE) to full navy (#0F1B2D) — color-twins Employers panel, retains mirrored right-column position.
- Type colors flip:
  - `For` mark → cream-60 (or copper-deep, match Employers' gold-on-navy treatment)
  - `Candidates` italic display → gold (#C9A961) — becomes the dominant accent on dark
  - Gold rule → gold-deep
  - `SENIOR CAREERS` small-caps caption → cream-60 (NOT gold-deep — that color was readable on cream-2 but won't have enough contrast on navy)
  - Copper radial wash: keep but raise opacity slightly (was 8% on cream — try 12-15% on navy to remain perceptible without going decorative)
- DO NOT touch Candidates panel structure (column position, width, mark layout, mobile collapse). Color shift only.
- Fallback: if visual review during build clearly favors option (a) deeper warm cream (#EDE3D2 or #E8DCC4) over full navy, builder may pivot, but document the choice in changelog.

**P3 — About small intentional brand artifact:**
- Add ONE small deliberate element NEXT TO or BENEATH the about pillars area. Keep it small, deliberate, must not compete visually with the pillars.
- Options (pick one, document choice):
  - Small navy card with MW monogram + Playfair italic "Photography forthcoming" caption (no fabricated date)
  - Typographic anchor: "MW · 2026" in Playfair italic, gold, corner of about section
- HARD constraints: NO stock photography. NO fabricated dates beyond the brand year. NO ghost numbers (background giant numerals — confirmed user dislike). Element must read as deliberate brand artifact, not as filler.

**P2 — Form endpoint:** USER-SIDE BLOCKED. Document in changelog that this is awaiting Formspree/Netlify account credentials and skip. No code change this cycle.

**MEMORY rules to respect:**
- **Apps must NOT look AI-generated** (feedback_unique_design)
- **NEVER bail mobile via matchMedia** (feedback_disabling_isnt_fixing) — color shift won't trigger this but stay alert
- **NO ghost numbers** (feedback_no_ghost_numbers) — small artifact must not be a giant background numeral
- **NO fabricated content** (feedback_no_invented_fight_data + content honesty in CLAUDE.md) — no fake dates, no fake quotes
- **Simplicity over polish** (feedback_simplicity_over_polish) — small artifact, not piled-on decoration
- **Verification ≥5 positions × 3 viewports** (Playwright at 1440 + iPhone 13 + iPhone SE)
- **Regenerate style.min.css** after every CSS edit
- **DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER**

**Forbidden sections (cooldown):**
Hero (mesh + parallax + word reveal), nav, stat band, marquee tape, industries, employers panel, services scroll-lock, magnetic underlines, footer (wordmark + progress + mobile timing), contact (floating labels + submit + trust badge + label sizes), about pillars structural content (only ADD small artifact), process (numerals + line + scroll-draw + step reveal + stagger + ease), candidates panel structure (only adjust bg/type per P1 contrast shift), mobile font floor + tap targets, sticky mobile CTA.

---

### 2. Spark

**Brief:** Frame B polish on the new navy Candidates panel. Goal: type contrast and rule weights match Employers exactly since the two panels are now color-twinned.

- Compare gold-on-navy treatment between Candidates and Employers panels at 1440 + iPhone 13.
- Refine Candidates panel typography weights, letter-spacing, rule opacity, caption color so the two panels read as a deliberate matched pair (mirrored color twins).
- Frame B = spacing + typography refinement, NOT content removal. Do not strip the mark, the rule, or the caption. Do not remove the radial copper wash.
- If Builder picked option (a) deeper warm cream instead of full navy, recalibrate accordingly — but the panels will not be color-twins so parity polish targets will differ.

**MEMORY rules to respect:**
- **Frame B keeps content count** (feedback_frame_b_richness)
- **Spark replaces, doesn't pile** (feedback_simplicity_over_polish) — refining only
- **Nigel never removes quality** echoes here too — do not strip glows or animations
- **Regenerate style.min.css**
- **DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER**

**Forbidden sections (cooldown):** Same list as Builder.

---

### 3. Pixel

**Brief:** Verification cycle for the new Candidates panel + new about brand artifact + standing 375 + 414 mobile audit.

- **Candidates panel readability verification:** Capture at desktop 1440 + iPhone 13 + iPhone SE. Confirm gold "Candidates" italic mark reads cleanly on navy. Confirm "For" mark color is readable. Confirm "SENIOR CAREERS" caption is legible. Confirm rule visible. Confirm radial wash perceptible without going decorative. Capture at ≥5 scroll positions through the section.
- **New about artifact verification:** Confirm artifact reads as deliberate (not filler), does not compete with pillars, does not introduce horizontal overflow at 375/414, and is centered or anchored correctly per builder's choice.
- **Standing mobile audit:** 375 + 414. All tap targets ≥44px. Center alignment consistency on every section. No horizontal overflow.
- **Verification standard:** ≥5 positions × 3 viewports (1440, iPhone 13, iPhone SE).
- If any defect found: fix the CSS/JS mismatch, regenerate style.min.css, commit. NEVER bail via matchMedia.

**MEMORY rules to respect:**
- **Pixel must audit 375 + 414 center alignment** (feedback_pixel_alignment)
- **Actually scroll-test, not single-position** (feedback_actually_scroll_test)
- **Disabling isn't fixing** (feedback_disabling_isnt_fixing) — fix CSS/JS mismatch, never matchMedia bail
- **Regenerate style.min.css** after any CSS fix
- **DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER**

**Forbidden sections (cooldown):** Same list, except Pixel may verify and fix any cooldown section as defensive regression checks.

---

### 4. Nigel

**Brief:** Re-score from a real senior Tax / F&A candidate's perspective at first scroll. Cap remains at 7.5 until real photography + real testimonials + real published address all land.

- Expected delta range this cycle: +0.0 to +0.2 within cap. A decisive contrast move (full navy Candidates panel) could finally close the Candidates/Employers visual weight gap, possibly justifying movement within cap; could not break it.
- Score Candidates section specifically. Compare directly to Employers at section level — has the parity gap closed?
- Score from a real-buyer's perspective, NOT a designer's checklist.
- Strict cap 7.5 holds. No movement above 7.5 until photography + testimonials + address.
- **Nigel never recommends removing quality** (no removing glows, animations, effects). Only ADD or IMPROVE.
- Identify cycle 11 P1/P2/P3 priorities for next coordinator dispatch.

**MEMORY rules to respect:**
- **Nigel must score stricter** (feedback_nigel_stricter) — buyer's lens, not designer's checklist
- **Nigel never removes quality** (feedback_nigel_no_removal)
- **Nigel cap 7.5 holds**
- **Respectful tone** (feedback_respectful_tone) — never call the user a bottleneck or blame for blockers (form endpoint is user-side, frame collaboratively)
- **No content in agent loops** (feedback_no_news_in_loops) — UI/UX scoring, not content additions
- **DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER**

**Forbidden sections (cooldown):** N/A — Nigel reviews everything but recommends nothing in cooldown sections this cycle.

---

## Forbidden across cycle 10

- Hero (mesh + parallax + word reveal)
- Nav
- Stat band
- Marquee tape
- Industries
- Employers panel
- Services scroll-lock
- Magnetic underlines
- Footer (wordmark + progress + mobile timing)
- Contact (floating labels + submit + trust badge + label sizes)
- About pillars structural content (Builder may ONLY ADD small artifact)
- Process (numerals + line + scroll-draw + step reveal + stagger + ease)
- Candidates panel structure (Builder may ONLY adjust bg/type per P1)
- Mobile font floor + tap targets
- Sticky mobile CTA

---

## One-line rationale

Full-navy Candidates inversion (mirroring Employers in color, mirrored in position) plus a small deliberate about brand artifact — a decisive contrast move targeting the visual weight parity gap that held cycle 9 at the cap.
