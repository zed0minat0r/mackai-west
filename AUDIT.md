# MacKai West — Audit Report

## Cycle 9 Score: 7.5 / 10 (Delta: 0.0 from 7.5 — plateau holds)

**Summary:** The Candidates panel refresh is a genuine design improvement — the mirrored layout closes the structural gap with Employers meaningfully — but the section still registers as lighter than Employers from a real-buyer's perspective because of contrast differential: cream-on-cream (cream-2 panel on paper background) versus navy-on-cream (Employers). The identity gap narrowed; the visual weight gap persists. Cap holds at 7.5. Score unchanged.

---

## Axis: Section Hierarchy and Visual Weight Distribution

Audit lens: as a senior Tax or F&A candidate scanning this page for the first time in 90 seconds, does each section feel like it was given proportionate visual authority — does the page's weight stack communicate what matters most, and does the two-audience structure (Candidates / Employers) carry equal persuasive gravity?

---

## What Landed This Cycle (Cycle 9 commits)

**315e9ee coordinator cycle 9 plan** — Correctly identified Candidates as weakest section. Scoped tightly: no forbidden zone violations. The plan was sound.

**dcb8c6a builder cycle 9** — Removed cream-wash + 3px copper left-edge + oversized "01" numeral. Replaced with mirrored cream-2 right panel: stacked Playfair italic "For / Candidates" mark in gold-deep + navy, gold rule, "SENIOR CAREERS" small-caps caption, copper-tinted radial wash. Mobile: panel collapses above copy with `order:-1`. This is a meaningful structural improvement — Candidates now has the same layout grammar as Employers.

**4b679b5 spark cycle 9** — Confirmed panel ships clean with no CSS fixes needed. Vertical centering offset 0.0px both panels, rule opacity 0.4 on cream-2 confirmed optically correct.

**5ed94fe pixel cycle 9** — Verified panel at 5 positions x 3 viewports. All tap targets pass. No overflow. Correct.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Unchanged. Count-up clean. |
| About | 7.5 | Unchanged. Image slot still reads as layout gap at 1440px. |
| Services | 7.8 | Horizontal scroll-lock verified. |
| Industries | 7.2 | 3D card flip + expand panel. Unchanged. |
| Process | 7.5 | Sequential stagger confirmed. Unchanged. |
| Candidates | 7.0 | Up from 6.8. Panel structure now correct — mirrored grammar, right-col position, Playfair mark, gold rule, caption at 13px floor. Visual weight still lighter than Employers due to cream-on-cream contrast. |
| Employers | 7.2 | Unchanged. Navy panel gives this section a stronger visual stop. |
| Contact | 7.4 | Unchanged. |
| Footer | 7.3 | Unchanged. |

---

## Parity Assessment: Candidates vs Employers

**What the screenshots show at desktop 1440:**

Employers: navy panel (15, 27, 45) left col, 300px wide, full section height. Gold italic "For / Employers" mark on dark ground. High contrast — the panel is unmistakably a deliberate editorial stop.

Candidates: cream-2 panel (250, 246, 238) right col, 300px wide, full section height, paper background (245, 240, 230) on the copy side. The contrast delta between cream-2 panel and paper background is minimal — approximately 5 luminosity points. The "For / Candidates" mark in gold-deep and navy is typographically correct but visually soft against the near-identical ground. The radial copper wash at 8% opacity is imperceptible at normal viewing distance.

**Structural parity: achieved.** Both sections now share: mirrored panel position (left/right), same column width (clamp 180–300px), same Playfair italic mark structure (For + Who), same gold rule, same small-caps caption, same copy layout.

**Visual weight parity: not achieved.** Employers reads as a deliberate navy anchor. Candidates reads as a slightly warmer cream variant. A senior tax candidate scanning the page will perceive Employers as the more authoritative section — which is the wrong signal on a site trying to recruit senior F&A professionals.

**Mobile:** Panel collapses to 151px header bar above copy. `order:-1` confirmed on iPhone 13 and SE. Both sections behave identically on mobile. This is correct and clean.

---

## Visual Weight Distribution Assessment (Cycle 9 axis)

**Page-level hierarchy from a buyer's scroll:**

1. Hero — highest weight (navy + mesh + word reveal). Correct.
2. Services — second-highest (fullscreen horizontal scroll-lock panels, both navy). Punches above its position.
3. Employers — navy panel gives it the strongest identity of the middle sections.
4. About, Process, Stat band — mid-weight, appropriate.
5. Industries — 3D card flip adds personality, appropriate weight.
6. Candidates — now tied with About in perceived weight rather than distinctly lighter. This is improvement but not parity with Employers.
7. Contact — clean, appropriately terminal.

**The imbalance that remains:** Services and Employers carry navy-dark weight. Candidates carries cream weight. For a two-audience firm, this asymmetry sends a subtle signal that the employer-side engagement is more premium than the candidate-side. The target buyer (senior Tax/F&A professional considering a move) will read this even without articulating it.

---

## What Works (5 bullets)

- **Structural parity between Candidates and Employers is now real** — Same layout grammar, same column widths, same typographic mark system. The "matched pair" goal from the cycle 9 brief is architecturally achieved.
- **Mobile collapse is correct** — Both panels collapse to 151px header bars with `order:-1`, stacking above copy. Identical behaviour across both sections on iPhone 13 and SE. No overflow.
- **"For / Candidates" mark is typographically clean** — 60.8px Playfair italic "Candidates" at desktop, 38.4px "For" in gold-deep, 13px small-caps "SENIOR CAREERS" caption. The mark itself is well-constructed.
- **No regressions from cycle 8** — All verified interactions from prior cycles (scroll-lock, sticky CTA, process stagger, form labels, footer stagger) remain intact.
- **Pixel's 5-position x 3-viewport verification was correct** — The builder's changes were clean enough to require no Pixel fixes, which is the right outcome on a polish cycle.

---

## What's Still Off (5 bullets)

- **Cream-on-cream contrast** — The candidates__panel (cream-2, rgb 250/246/238) sits against a paper background (rgb 245/240/230). The ~5-point luminosity gap is insufficient to read as a deliberate editorial panel — it reads as a background colour shift. This is the central remaining issue for the Candidates section.
- **Cap conditions unchanged** — No real photography, no verified testimonials, no published office address. Cap ceiling remains at 7.5.
- **About image slot** — Right column at 1440px still reads as a layout gap. Most visible "pre-launch draft" signal on the page.
- **Contact form mailto fallback** — Remains the most jarring UX moment. OS email client opens on submit rather than in-page spinner → checkmark choreography completing.
- **No social proof** — $40K stat is still the site's only quantitative trust signal. For a $40K-per-placement firm, a real buyer needs more evidence before contacting.

---

## Cap Assessment

Score holds at **7.5**. The Candidates refresh earns +0.2 on the section score (6.8 → 7.0) but the overall page score does not move because:

1. The section score improvement is from 6.8 → 7.0, not to parity with Employers (7.2).
2. The three cap conditions remain unmet: photography, testimonials, address.
3. The visual weight asymmetry between the two audience sections is a persistent brand signal problem that requires a contrast decision, not photography.

**What would move the overall score above 7.5:**

- Real photography in the About slot (immediate +0.1–0.2)
- One verified testimonial or named case study (+0.1–0.2)
- Published office address or location signal (+0.05)
- Candidates panel contrast resolution — either a non-white tint (warm copper #F0E6D2 range) or a full-bleed colour swap (+0.1 on section, possible +0.05 overall)

Expected range when photography + testimonials + address land: **7.8–8.1**

---

## Cycle 10 Top-3 Priorities (Ranked)

### P1 — Candidates panel contrast resolution
**What:** The cream-2 panel against the paper background is insufficiently differentiated. Two paths: (A) deepen the panel background to a warm copper-tinted cream (#EDE3D2 or similar — perceptibly darker than paper but not full navy), or (B) invert the section entirely: paper panel LEFT on navy section background, mirroring Employers' structure at the colour level not just the layout level. Option B achieves true parity. Option A is the safer increment.
**Acceptance criteria:** Candidates panel reads as a deliberate editorial stop at normal viewing distance on desktop 1440, not as a background colour shift. Panel must be perceptibly distinct from its surrounding paper background.
**Why P1:** The structural work from cycle 9 is in place; contrast is the single remaining design variable blocking visual weight parity. This is resolvable in CSS without content changes.

### P2 — Contact form real endpoint
**What:** Replace mailto fallback with Formspree or Netlify Forms. The spinner → checkmark choreography was purpose-built for this; it currently never fires because mailto intercepts before JS handles submit.
**Acceptance criteria:** Form submission sends without OS email client. `.contact__success` visible in page after submit. Playwright confirms spinner → checkmark → success-reveal sequence.
**Why P2:** Terminal conversion action broken for real buyers. Every other interaction now routes correctly.

### P3 — About image slot intentional placeholder
**What:** Replace empty right column with a deliberately-designed navy placeholder panel: MW monogram, gold hairline border, Playfair italic "Photography coming soon" caption. Signals pre-launch intentionality rather than forgotten layout element.
**Acceptance criteria:** About right column at 1440px does not read as a layout gap. No stock photography, no fabricated content.
**Why P3:** Most visible "draft site" signal remaining after the Candidates fix.

---

*Audit completed 2026-04-27. Axis: section hierarchy and visual weight distribution. Cycle 9 Candidates refresh closes structural gap but not visual weight gap — cream-on-cream contrast is insufficient. Score: 7.5 (plateau at cap). Cap holds pending real photography, testimonials, and address.*
