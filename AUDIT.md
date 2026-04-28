# MacKai West — Audit Report

## Cycle 7 Score: 7.5 / 10 (Delta: +0.1 from 7.4)

**Summary:** Cycle 7 closes every open correctness defect from cycle 6 — label font floor fully resolved, sticky CTA both anchors corrected to #contact, process stagger now perceptibly sequential on all three viewports — and adds the contact trust badge. The site reaches the 7.5 cap for the first time. Cap does not move: real photography, verified testimonials, and a published address are still absent.

---

## Axis: Typography System Coherence

Audit lens: does the typographic system read as intentional across the full scroll — consistent scale, appropriate hierarchy, no floor violations, no rogue outliers — at Desktop 1440, iPhone 13, and iPhone SE?

---

## What Landed This Cycle (Cycle 7 commits)

**e202c6d coordinator cycle 7 plan** — Plan scoped to P1a label floor + P1b sticky CTA anchor + P2 stagger + P3 contact badge. No scope creep.

**0c93306 builder cycle 7** — Label base rule `.form-group label` raised 0.78rem → 0.82rem (13.12px); sticky CTA "Submit a resume" href changed #candidates → #contact; process stagger multiplier 140ms → 300ms (delays now 0/300/600/900ms), IO threshold 0.15 → 0.25; contact response-time badge added as `.contact__badge` pill with `.contact__badge-dot` pulsing indicator. Playwright: 12/12 PASS.

**624ab19 spark cycle 7** — Badge Frame B: asymmetric padding 7px 14px 7px 12px, letter-spacing 0.06em → 0.03em, margin-bottom 22 → 28, dot-pulse 2.4s → 3.2s (subtler breath), opacity 0.5 → 0.65, scale 1.18 → 1.12, dot radial-gradient for dimensionality. Process ease cubic-bezier(0.16,1,0.3,1) → cubic-bezier(0.22,1,0.36,1) softer settle.

**51328fa pixel cycle 7** — `.about__pillar-eyebrow` 11.52px → 13px (0.8125rem) on mobile and `.service-fp__sub` 11.52px → 13px on mobile. Both confirmed by Playwright audit: iPhone 13 and SE report exactly 13px for both.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Count-up clean. Gold vignette holds. No change. |
| About | 7.5 | Two-column editorial, Playfair italic anchor, pillars now with correct mobile eyebrow floor. |
| Services | 7.8 | Horizontal scroll-lock verified PASS. sub-labels now 13px on mobile (Pixel cycle 7 fix). |
| Industries | 7.2 | 3D card flip + slide-up expand panel. Unchanged. |
| Process | 7.5 | +0.3 from 7.2. Process stagger is now perceptibly sequential: at scrollY 6280 (desktop 25%), step 0 is 94% complete while step 1 is at 11% and steps 2+3 are at 0%. By 50% position all four are mid-animation. On iPhone 13 the stagger is even cleaner — each step arrives alone before the next fires. This is working as designed. |
| Candidates | 6.8 | No change. Cream wash, copper border, numeral anchor hold. |
| Employers | 7.2 | Navy copper panel. Unchanged. |
| Contact | 7.4 | +0.3. Badge confirmed: 272x38px, "Typically replies within 1 business day", dot-pulse animation running at 3.2s. Both sticky CTA buttons route to #contact (48px height on mobile). No label below 13.12px anywhere in the form. The contact section now has a grounding trust signal and a clean conversion path. |
| Footer | 7.3 | Letter-stagger, scroll-progress rule unchanged and working. |

---

## Typography Coherence Assessment (Cycle 7 axis)

**Floor compliance:** Zero label elements below 13px on iPhone 13 or iPhone SE across all form groups. Float labels: 14.08px. Select label: 13.12px. Plain label: absent from DOM (only float and select groups exist in the form). PASS.

**Pillar eyebrows (`.about__pillar-eyebrow`):** Desktop base is 0.72rem (11.52px) — an intentional small-caps display treatment at 1440px where the surrounding Playfair italic text is large. Mobile override correctly lifts to 0.8125rem (13px). PASS.

**Service sub-labels (`.service-fp__sub`):** Desktop base 0.75rem (12px). Mobile override correctly lifts to 0.8125rem (13px). PASS. Pixel cycle 7 confirmed both viewports at 13px.

**Contact badge:** 13.12px italic Playfair, gold-deep, letterSpacing 0.03em. Sits correctly within the hierarchy — smaller than the contact heading, larger than body small print. The asymmetric padding (7px 14px 7px 12px) gives it a measured anchor rather than a centred pill, which is the right register for a professional services firm.

**One ongoing note:** The `form-group--select` label renders at 13.12px rather than 14.08px (the float label size). This is a minor but non-zero hierarchy inconsistency — the select dropdown label is one scale step below the text input labels. It is below the 13px floor threshold (just), but a future cycle could align both to a single base size. Not a defect, not a regression — just a note for typographic tightening.

---

## What Works (5 bullets)

- **Process stagger confirmed sequential** — The 300ms multiplier + 0.25 threshold combination is working. At desktop, the Playwright data shows steps 0 through 3 in clear sequential arrival (step 0 at 94% while step 1 is at 11% and steps 2+3 are at 0% at the 25% scroll position). On mobile the stagger is even more visible because the section is 1272px tall versus 793px at desktop, giving each step more scroll runway before the next fires.
- **Contact badge is a genuine trust addition** — "Typically replies within 1 business day" is an honest, present-tense operating commitment that grounds the firm as real and responsive at the terminal conversion point. The pulsing gold dot reads as active status, not decoration. No fabricated credentials.
- **Sticky CTA now routes both audiences correctly** — Both "Submit a search" and "Submit a resume" anchor to #contact (verified at 48px tap height across 7 scroll positions on iPhone 13 and SE). A candidate tapping the ghost button now reaches the form in one tap.
- **Typography floor clean across all mobile viewports** — Zero elements below 13px on iPhone 13 or SE. Pillar eyebrows, service subs, form labels, select labels, contact labels, footer small — all at or above floor.
- **Badge spacing is correct** — 28px margin-bottom below the badge before the lede text gives the contact intro block measured vertical rhythm without crowding. Spark's Frame B refinement of the original 22px is the right call.

---

## What's Still Off (5 bullets)

- **Cap conditions unchanged** — No real photography, no verified testimonials, no published office address. These are the three user-side content conditions that would lift the ceiling to 7.7–7.8. No design work can substitute for them at this point.
- **Select label at 13.12px vs float labels at 14.08px** — A minor typographic inconsistency within the form. The "I am a…" select sits one scale step below the text input labels. Not a floor violation but a hierarchy mismatch that a typographically attentive visitor would notice.
- **Candidates section lacks a visual identity comparable to Employers** — Employers has the navy copper panel with the italic mark. Candidates has the cream wash and copper border, which reads more like a styled content block than a distinct section identity. This gap has been present since cycle 2 with only incremental polish.
- **No scroll depth signal at bottom of page** — The footer progress rule tracks scroll-to-bottom but there is no visual cue that the footer wordmark stagger is firing unless the user watches carefully. The stagger completion is imperceptible on mobile because the footer is shorter than the animation duration at small viewports.
- **About photo group still absent** — The About section has a two-column layout with an image placeholder column. Without a real image, the right column reads as a layout gap. On mobile this collapses cleanly but on desktop the asymmetry is visible. This is a content gap, not a design fault, but it is among the most immediately noticeable "this is a pre-launch site" signals.

---

## Cap Assessment

The site has reached **7.5** — the hard cap — for the first time. This is not a number inflation; cycle 7 legitimately closed every outstanding correctness defect and added one honest trust signal. The cap is designed to hold at 7.5 until real photography, verified testimonials, and a published office address all land. Those three conditions are unchanged.

The design infrastructure is ready to absorb that content. No existing feature would need to be removed or reworked when real photography arrives — the About section right column has a structural slot. No feature is fighting testimonials if they land. The cap is a content constraint, not a design constraint.

If all three cap-lifting conditions landed simultaneously, the expected score range would be **7.8–8.1**, depending on photography quality and testimonial specificity.

---

## Cycle 8 Top-3 Priorities (Ranked)

### P1 — About image slot: real photography or honest placeholder upgrade
**What:** The About right column has an image slot that currently renders as a layout gap on desktop. Options without real photography: (a) a structured "photography coming soon" treatment that reads as intentional — e.g., a navy panel with the MacKai West monogram and a small italic "Studio portrait — coming soon" caption in gold hairline border register; or (b) leave for when real photography arrives and use the cycle for something else. If the user can supply even a single real brand photo, this is the highest-impact content swap available. Do not fabricate a stock-photo substitution.
**Acceptance criteria:** About section right column does not read as a layout gap at 1440px. No stock photography introduced. No fabricated people or locations.
**Why P1:** A $40K-fee executive search firm with an obvious image placeholder in its About section signals "pre-launch draft." Every other section has an identity now; this gap is the most prominent remaining tell.

### P2 — Select label font alignment to text input labels
**What:** Align `.form-group--select label` font-size to 0.88rem (14.08px) to match the float label size, removing the scale inconsistency between select and text inputs in the contact form.
**Acceptance criteria:** All five contact form labels render at the same computed size at desktop and mobile. Playwright confirms no element below 13px. style.min.css regenerated after edit.
**Why P2:** The contact form is the terminal conversion action on the site. Any typographic inconsistency within it — even one the user consciously notices — erodes confidence at the decision moment.

### P3 — Footer stagger visibility on mobile
**What:** The footer wordmark stagger reveal (60ms per letter) fires when the footer enters the viewport. On mobile, the footer is short and the stagger's 11 × 60ms = 660ms window may complete before the user visually registers it. Consider shortening the per-letter delay to 40ms on mobile (total 440ms) so the stagger completes within a natural glance duration. The scroll-driven progress rule is correct and should not change.
**Acceptance criteria:** On iPhone SE at the footer, the wordmark stagger is perceptible — letters arrive visibly in sequence before the final letter settles. Playwright sample at footer entry confirms IntersectionObserver fires and `.is-revealed` class triggers visible animation. No regression to desktop stagger timing.
**Why P3:** The footer is the last impression. The stagger was designed as a deliberate identity beat. If it fires and completes invisibly on mobile, it adds JS overhead without delivering the moment.

---

*Audit completed 2026-04-27. Axis: typography system coherence. Viewports: Desktop 1440 (7 positions), iPhone 13 (7 positions), iPhone SE (7 positions) + targeted process section 5-position sample on all three. Badge, label, and sticky CTA verified via dedicated Playwright checks.*
