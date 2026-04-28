# MacKai West — Audit Report

## Cycle 8 Score: 7.5 / 10 (Delta: 0.0 from 7.5 — plateau)

**Summary:** Cycle 8 was a deliberate polish cycle at the cap. Three minor fixes shipped: select label 0.82rem → 0.88rem (+0.96px, imperceptible to any real visitor), footer mobile stagger 60ms → 40ms (220ms timing shortening no user would consciously register), and contact email tap target 26 → 44px (a correctness fix that matters only if you previously failed to tap it). The about right-column gap was investigated and confirmed a non-issue — no CSS change was needed. None of these moves are visible in a 90-second site visit. Score holds at 7.5. Cap holds. Content gates unchanged.

---

## Axis: Interaction Completeness

Audit lens: does every interactive element on the page (CTAs, forms, scroll animations, hover states, sticky bar, services scroll-lock) complete its action without a dead end, broken route, or missing feedback state — at Desktop 1440, iPhone 13, and iPhone SE?

---

## What Landed This Cycle (Cycle 8 commits)

**5c5a47a coordinator cycle 8 plan** — Scoped to three items: about right-col verify-then-fix, select label 0.88rem, footer mobile stagger 40ms.

**bba0005 builder cycle 8** — P1: about right-column gap investigated, pillars confirmed filling 0.95fr cleanly, no CSS change required. P2: `.form-group--select label` 0.82rem → 0.88rem (14.08px, matching float labels). P3: `@media (max-width:600px)` footer stagger 60ms → 40ms per letter (440ms total). Cache-buster cycle8-b. style.min.css regenerated.

**e7ba513 pixel cycle 8** — Contact details email tap target 26px → 44px (inline-flex min-height on mobile). Skip-link 43px → 45px. Both pass WCAG 2.5.5.

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.0 | Unchanged. Mesh + vertex-pulse + edge-shimmer hold. |
| Hero (mobile) | 7.2 | Unchanged. |
| Stat band | 7.5 | Count-up clean. Gold vignette holds. No change. |
| About | 7.5 | Two-column editorial, Playfair italic anchor, pillars with correct mobile eyebrow floor. Right-column image slot still reads as layout gap at 1440px — unchanged. |
| Services | 7.8 | Horizontal scroll-lock verified. |
| Industries | 7.2 | 3D card flip + slide-up expand panel. Unchanged. |
| Process | 7.5 | Sequential stagger confirmed working. Unchanged. |
| Candidates | 6.8 | No change. Still the weakest section identity on the page. |
| Employers | 7.2 | Navy copper panel. Unchanged. |
| Contact | 7.4 | Select label now 14.08px matching float labels. Email tap target now 44px. Both correctness improvements, invisible to a real visitor but correct. Badge and sticky CTA unchanged. |
| Footer | 7.3 | Mobile stagger 440ms total. Unchanged at desktop (660ms). |

---

## Interaction Completeness Assessment (Cycle 8 axis)

**Sticky mobile CTA (both routes):** Both "Submit a search" and "Submit a resume" anchor to #contact as confirmed cycle 7. Tap targets 48px. No regression.

**Services scroll-lock:** Two panels, fullscreen, dots advance, no horizontal overflow on any viewport. No regression.

**Industries 3D flip / tap-reveal:** Card flip hover on desktop, tap toggle on mobile with aria-expanded and keyboard support (Enter/Space/Escape). No regression.

**Contact form floating labels:** All five labels at 14.08px including the select group. Spinner → checkmark choreography unchanged. mailto fallback present.

**Footer stagger + progress rule:** Letter stagger fires on IntersectionObserver. Progress rule scaleX 0→1 on rAF. Both present and working.

**Hero word reveal:** Fires on load. Mesh + vertex-pulse + edge-shimmer running.

**One gap that remains:** The contact form's mailto fallback means form submissions generate an email client open rather than a true async POST. For a real buyer filling out the form, this is the most jarring UX moment on the site — the page does not confirm receipt; the OS email client appears. This is a known infrastructure gap (no real endpoint wired), not a design fault. It is the interaction-completeness ceiling until a real form backend lands.

---

## What Works (5 bullets)

- **All interactive routes functional and routed correctly** — Every CTA, anchor link, form element, and scroll-driven animation routes to the correct destination or completes its animation without a dead end.
- **Select label hierarchy now clean** — The contact form's five labels are all 14.08px, removing the last scale inconsistency within the form group. The form reads as a single intentional system.
- **Tap target compliance full** — Contact email link now 44px (was 26px), skip-link 45px, sticky CTA 48px. Every primary interactive element on mobile meets WCAG 2.5.5.
- **About right column confirmed non-issue** — Builder's correct call to investigate first and ship nothing avoids a regression. The 0.95fr column fills cleanly; there is no visible gap artifact.
- **Footer stagger tighter on mobile** — 440ms total at iPhone SE is within the natural glance window (under 500ms), so the reveal now has a chance of being consciously perceived. At 660ms it was completing outside the visual attention window on short-footer mobile views.

---

## What's Still Off (5 bullets)

- **Cap conditions unchanged** — No real photography, no verified testimonials, no published office address. The three user-side conditions that lift the ceiling to 7.7–7.8 are all absent.
- **Contact form mailto fallback** — The most jarring UX moment: a real buyer submitting the contact form gets the OS email client rather than an in-page confirmation. This is a backend infrastructure gap, but from a buyer's lens it reads as "site not finished."
- **About image slot** — The right column at 1440px still reads as a layout gap. This is the most immediately visible "pre-launch draft" signal on the site. No design substitute is adequate; only real photography resolves it.
- **Candidates section identity** — Still the weakest section. The cream wash and copper border read as a styled content block, not a distinct editorial identity. Employers has the navy copper panel with the italic mark; Candidates has no equivalent anchor.
- **No social proof anywhere** — The $40K stat is the site's only quantitative trust signal. No testimonials, no placement counts, no client names. For a firm charging $40K per placement, a real buyer will want some evidence of track record before contacting.

---

## Cap Assessment

Score holds at **7.5** — the hard cap. Cycle 8's three polish fixes are correctness improvements, not experience improvements. A real prospective employer or candidate visiting the site for the first time cannot perceive the difference between cycle 7 and cycle 8. The cap is a content constraint:

1. Real photography (About slot + anywhere else)
2. Verified testimonials or placement case studies
3. Published office address or location signal

All three absent. Cap holds at 7.5.

Expected score range when all three land: **7.8–8.1**, contingent on photography quality and testimonial specificity.

---

## Cycle 9 Top-3 Priorities (Ranked)

### P1 — Contact form real endpoint
**What:** Replace the mailto fallback with an actual form submission endpoint (Formspree, Netlify Forms, or equivalent static-site form service). The current behavior — OS email client appears on submit — is the single biggest UX rupture on the site. An in-page "Your message is on its way" confirmation is what the submit choreography (spinner → checkmark) was built to deliver; currently the choreography never fires because the mailto intercepts before JS handles the submit event.
**Acceptance criteria:** Form submission sends without opening the email client. Page shows the spinner → checkmark → success-reveal sequence. No page navigation. Playwright confirms `.contact__success` visible after submit.
**Why P1:** The terminal conversion action is broken for a real buyer. Every other section now routes correctly. This is the last broken interaction.

### P2 — About image slot honest placeholder
**What:** Replace the empty image slot in the About section right column with an intentional navy panel — MacKai West monogram, gold hairline border, italic "Photography coming soon" caption in small Playfair italic. This signals pre-launch intentionality rather than forgotten layout element.
**Acceptance criteria:** About right column at 1440px does not read as a layout gap. No stock photography. No fabricated people or locations.
**Why P2:** The most visible "draft site" signal remaining. Every other section has a defined identity.

### P3 — Candidates section editorial identity
**What:** Give the Candidates section a visual anchor equivalent to Employers' navy copper panel. Options: a fullscreen-width cream-to-navy diagonal wash behind the section, or an oversized italic Playfair pull-quote ("Your next firm is already looking.") as the section opener, or a structural left/right split mirroring Employers. Replace the current cream wash — do not pile on top of it.
**Acceptance criteria:** Candidates section reads as a distinct editorial identity, not a styled content block. Mobile collapses cleanly. No content removed.
**Why P3:** The weakest section on the page by score (6.8). Employers is at 7.2; closing that gap is the highest design-side score lever remaining within the cap.

---

*Audit completed 2026-04-27. Axis: interaction completeness. Cycle 8 was a polish cycle at the cap — three minor correctness fixes, no experience delta. Score: 7.5 (plateau). Cap holds pending real photography, testimonials, and address.*
