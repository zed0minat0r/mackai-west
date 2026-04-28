# MacKai West — Audit Report

## Cycle 10 Score: 7.6 / 10 (Delta: +0.1 from 7.5)

**Summary:** The navy inversion works. Candidates is now a genuine visual twin of Employers — same colour, same mark system, same rule token — and the cap ceiling is at last breached by one tenth. The remaining gap is the about image slot (still the most prominent pre-launch signal on the page), the mailto fallback, and the mobile panel height proportion on iPhone SE where the navy header occupies too much screen before the mark appears.

---

## Axis: Cross-Section Colour Parity

Audit lens: as a senior Tax or F&A professional — either a hiring director or a candidate — scanning this page cold in 90 seconds, do the two audience sections (Candidates / Employers) communicate equal status and equal visual weight? Does the page feel finished or pre-launch?

---

## What Landed This Cycle (Cycle 10 commits)

**9d3f394 coordinator cycle 10 plan** — Correctly scoped P1 as the navy inversion. Plan was tight and accurate.

**d25a0ab builder cycle 10** — Candidates panel inverted from cream-2 (`rgb(250,246,238)`) to full navy (`rgb(15,27,45)`). "For" token set to gold (`rgb(201,169,97)`), "Candidates" to gold-soft (`rgb(221,185,118)`), rule opacity 0.6, caption set to cream at 0.65 opacity. About section gets "MW · 2026" Playfair italic seal at bottom-right of inner, desktop only. This is the right design decision.

**829b954 spark cycle 10** — Cross-panel parity catches: Employers panel caption raised from 0.65rem (10.4px) to 0.8125rem (13.12px), matching the 13px floor. Employers rule token changed from gold-deep to gold, so both rules now render at identical `rgb(201,169,97)`. These are genuine fixes that improve the parity outcome.

**Pixel cycle 10** — Full audit pass confirmed no CSS defects. All tap targets pass, no overflow.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Unchanged. Count-up clean. |
| About | 7.5 | Seal adds a quiet typographic punctuation mark bottom-right — positive addition. Image slot still absent. |
| Services | 7.8 | Unchanged. Horizontal scroll-lock verified clean. |
| Industries | 7.2 | Unchanged. |
| Process | 7.5 | Unchanged. |
| Candidates | 7.4 | Up from 7.0. Navy inversion closes the visual weight gap with Employers. Panel now reads as deliberate at normal viewing distance. Mobile panel height proportions are slightly excessive on iPhone SE. |
| Employers | 7.2 | Unchanged in score. Cross-panel parity improves the system even if this section's score does not move independently. |
| Contact | 7.4 | Unchanged. |
| Footer | 7.3 | Unchanged. |

---

## Parity Assessment: Candidates vs Employers

**Desktop 1440 verdict:** Visual weight parity is achieved.

The Candidates panel at desktop is `rgb(15,27,45)` — pure navy, full section height, right column. "For" in gold at 38.4px, "Candidates" in gold-soft italic at 60.8px. Gold rule 1px at 281px wide, opacity 0.6. "SENIOR CAREERS" in cream at 65% opacity, 13px. Panel width 281px.

Employers panel: same `rgb(15,27,45)`, left column, 260px wide. "For" in gold, "Employers" in gold-soft italic. Gold rule at same token. "EXECUTIVE SEARCH" cream 65%, 13px.

Both panels now use identical colour tokens, identical typographic marks, identical rule treatment, mirrored column positions. The visual twin is complete. A first-time buyer scrolling through at 1440 will perceive both sections as deliberate anchor columns of equal authority.

The cand-4 desktop screenshot captures both sections beginning to transition simultaneously — the Candidates navy panel in the upper right and the Employers navy panel just entering at lower left. The mirrored grammar is visually clear.

**Mobile verdict:** Mostly correct. One proportional concern.

On iPhone SE (375), the Candidates panel collapses to a full-width navy header bar above copy. The mark ("For Candidates" + gold rule + "SENIOR CAREERS") sits at the bottom of that bar. At the mid-section scroll position (cand-2), the panel occupies most of the viewport as a large solid navy rectangle before the mark resolves. On a 667px device this is slightly heavy — the panel reads as excessive vertical space before the mark appears. The iPhone 13 handles this better (taller viewport). The structural approach is correct; the proportions are slightly off at 375.

**about__seal:** "MW · 2026" Playfair italic, steel-blue-grey `rgb(140,149,166)`, 13.76px, bottom-right of the about inner section at desktop. Correctly hidden on mobile. The seal is understated and intentional — it reads as a founder's mark, not as filler. It adds brand specificity to a section that otherwise still lacks the photography. Positive addition.

---

## Cap Assessment

Score moves to **7.6** — first time above the 7.5 plateau in three cycles. The cap remains in play but is no longer a flat ceiling; the inversion earned the increment.

**Cap conditions still unmet:**
1. No real photography (about image slot is the most visible pre-launch signal on the page).
2. No verified testimonials or named case studies.
3. No published office address or location signal.

These three conditions remain required for scores above 7.8. Until they land, the hard cap is effectively at 7.7–7.8.

**What the navy inversion earned:** +0.4 on the Candidates section score (7.0 → 7.4), which translates to approximately +0.1 at the overall page level. The score improvement is real but constrained by the unchanged cap conditions.

**Expected range when photography + testimonials + address land:** 7.9–8.2.

---

## What Works (5 bullets)

- **Navy inversion closes the parity gap completely** — Both panels now share `rgb(15,27,45)`, same gold-rule token, same Playfair italic mark structure, same cream-65 caption floor. A real buyer sees two deliberate editorial anchors of equal visual weight, one left, one right. The paired-section concept the design has been building toward for three cycles is now legible.
- **Spark's cross-panel parity catches were surgical and correct** — Employers caption raised from 10.4px to 13.12px matches the floor. Rule token unified to gold across both panels. These are exactly the kind of detail-level corrections that separate polished work from assembled work.
- **about__seal is an addition that earns its place** — "MW · 2026" in Playfair italic at the bottom-right of the about section reads as a typographic brand artifact, not as placeholder text. It partially alleviates the emptiness of the right column below the pillars without fabricating content. Desktop-only hiding is correct.
- **Mobile collapse is functionally correct** — Both panels collapse to full-width header bars with the mark visible at the bottom. iPhone 13 (390) handles this cleanly. The Employers mobile panel (iPhoneSE-375-cand-4) shows "EXECUTIVE SEARCH" clearly with the full mark. Structural symmetry holds on mobile.
- **No regressions** — All interactions from prior cycles verified intact. Services scroll-lock, sticky CTA, process stagger, form labels, footer stagger all remain functional. Pixel's clean-pass confirmation is accurate.

---

## What's Still Off (5 bullets)

- **About image slot remains the most prominent pre-launch signal** — The right column at 1440px still lacks photography. The seal helps but does not replace the missing visual. At the bottom-of-section scroll (desktop-1440-about-seal.png), the right column shows two practice pillars and then the seal floating at bottom-right with significant empty space above it. A real buyer will read this as "under construction" rather than "refined."
- **Mobile Candidates panel is slightly over-tall on iPhone SE** — At 375px, the navy panel header occupies a large vertical block before the mark resolves at the bottom. Mid-scroll (cand-2 screenshot) shows a near-full-viewport navy rectangle with the mark cut at the very bottom edge. The panel needs either a max-height constraint or the mark needs to sit higher within the bar at this viewport.
- **Contact form mailto fallback remains broken for real buyers** — Submitting the form opens the OS email client. The spinner → checkmark in-page choreography built in cycle 4 never fires. This is the terminal conversion action and it continues to fail silently for any buyer on a device without a configured mail client.
- **$40K stat is still the only quantitative trust signal** — No testimonials, no case studies, no named placement outcomes. For a firm charging $40K per search, a cold buyer needs more evidence before contacting. The site would benefit from even one honest proof point.
- **"SENIOR CAREERS" caption legibility on mobile** — At 13px cream-65 on navy, the caption is technically above the font-floor but at the lower boundary of comfortable legibility in ambient light. This is not a failure but it is a watch item as the section develops.

---

## Cycle 11 Top-3 Priorities (Ranked)

### P1 — About image slot intentional placeholder panel
**What:** Replace the empty right column gap below the about pillars with a deliberately designed navy placeholder panel. Suggested treatment: navy background, MW monogram centred, gold hairline border, Playfair italic line "Photography to follow" or similar honest pre-launch language. Must not be stock photography. Must not include fabricated names or dates beyond what is already present.
**Acceptance criteria:** The about right column at 1440px does not read as a forgotten layout element. The MW seal remains; the panel adds vertical substance above it.
**Why P1:** The about section is the second section a buyer encounters after hero + stat band. It is the firm identity statement. The image slot gap is the most visible signal that the site is not finished.

### P2 — Contact form real endpoint
**What:** Replace mailto fallback with Formspree or Netlify Forms free tier. The spinner → checkmark → success choreography was purpose-built for this; it currently never fires.
**Acceptance criteria:** Form submission completes in-page. `.contact__success` visible after submit. No OS mail client opens. Playwright confirms the full choreography sequence.
**Why P2:** Every other interaction on the site now routes correctly. The terminal conversion action remains broken. This is the highest-priority functional defect on the site.

### P3 — Mobile Candidates panel height proportion
**What:** On iPhone SE (375px), the Candidates navy panel header is too tall relative to the mark's position within it. The mark sits at the bottom of a large navy rectangle, leaving excessive blank navy above. Either add a `max-height` or adjust the panel's vertical padding to move the mark closer to vertical centre at this viewport.
**Acceptance criteria:** At 375px, the Candidates panel header is perceived as proportionate — the mark is visually centred or at least occupying a clearly intentional position within the panel height, not stranded at the bottom of excessive negative space.
**Why P3:** Affects every mobile visitor. The structural fix is simple. The proportion issue slightly undermines the panel's authority on the most constrained mobile viewport.

---

*Audit completed 2026-04-27. Axis: cross-section colour parity. Navy inversion closes Candidates/Employers visual weight gap — parity is now real at desktop. about__seal is a positive addition. Cap breach: +0.1 to 7.6. Cap ceiling holds at 7.7–7.8 until photography + testimonials + address land.*
