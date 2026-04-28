# MacKai West — Nigel Audit, Cycle 14

**Score: 8.2 (Delta +0.1 from 8.1)**  
**Axis: information architecture**  
**Cap: 8.2 (design ceiling). Content ceiling at 8.5–8.7 requires real photography, real testimonials, real address — none shipped this cycle.**

---

**Date:** 2026-04-28  
**Live URL:** https://zed0minat0r.github.io/mackai-west/?v=cycle14-p  
**Viewports tested:** iPhone SE 375, iPhone 13 390, iPhone 14 Plus 414, Desktop 1440  
**Scroll positions:** 5 per viewport (5% / 25% / 50% / 75% / 95%) + 5 positions within Process section per viewport

---

## What Landed Cleanly

### Process section — 2x2 grid (Builder `3990a98`)
The cycle 13 dead-space defect is closed. At 1440px desktop the `.process__steps` grid renders at 496px x 496px per column (1036px total) — four steps filling the container with balanced weight. Previously the content hugged ~350px of 1280px inner width; now it uses the full horizontal real estate. This is a material improvement: the section now reads as a considered chapter rather than an afterthought. Single-column stack on mobile (375/390) is correct; `.process__steps` at `@media (max-width: 600px)` collapses to `1fr` (style.css line 2738).

### Ring halo and step card sync (Builder `3990a98`, Spark `ad7d444`)
Playwright confirmed marker-to-step sync fires correctly: at 75% through the Process section, 2 active markers and 2 active step cards; at 95%, 3 active markers and 3 active step cards. The ring halo progression works. Gold top border and left accent on active `.process-step` (style.css lines 1748–1750) give the cards a discernible visual state change. Spark's cream hairline on inactive cards (rgba 245,240,230 at 0.15) creates the right contrast so active gold reads with full authority.

### Gradient fill stroke (Spark `ad7d444`)
Inline `linearGradient id="journey-fill-grad"` (gold-deep to gold-soft top-to-bottom) present in SVG source. Gives the drawn line vertical depth without adding visual noise.

### Font floor fixes (Pixel `aaceb30`)
`.btn--sm` lifted from 0.78rem to 0.8125rem (style.css line 124). `.about__placeholder-location` lifted from 0.72rem to 0.8125rem (style.css line 1061). Both confirmed at 13px floor on mobile — no regression.

---

## Section Scores (Cycle 14)

| Section | Score | Notes |
|---|---|---|
| Hero | 8.5 | Blueprint mesh + cursor parallax + ticker eyebrow + hero-exit transform — genuine personality |
| Stat band | 7.8 | Count-up fires correctly at threshold 0.6; $40K lands clean on desktop |
| About | 7.6 | MW wordmark placeholder is honest; right-col flex-grow fills correctly at desktop; mobile hides placeholder |
| Services | 8.3 | 5-panel horizontal scroll-lock with cream/navy alternation is the site's strongest scroll moment |
| Industries | 8.0 | 3D card flip + 8 roles per back-face; tap-to-reveal functional |
| Process | 8.1 | 2x2 grid closes the dead-space; sync working; minor mobile rhythm gap at mid-scroll (step 03 card has empty base on iPhone 13) |
| Candidates | 7.8 | Navy panel inversion matches Employers; For/Candidates italic mark lands editorially |
| Employers | 7.8 | Parity with Candidates confirmed |
| Contact | 7.2 | Floating labels, trust badge, honest reach copy all clean; mailto fallback is the outstanding conversion blocker |
| Footer | 7.9 | Letter-stagger wordmark + scroll progress rule both visible |

---

## Information Architecture Assessment

The site's IA is coherent for a specialist B2B firm targeting senior candidates and employers. Navigation order (About, Services, Industries, Process, Candidates, Employers, Contact) follows a logical trust-building arc: who we are, what we do, where we work, how we work, who we serve, engage us.

**Strengths:**
- Dual-audience CTAs (Submit a Search / Submit a Resume) are persistent and correctly anchored to `#contact` since cycle 7
- Services horizontal scroll establishes depth without requiring a separate page
- Section eyebrows (small-caps labels) give each section a clear chapter identity

**Remaining IA friction:**
1. A prospective employer landing via search sees "Submit a Search" in the nav but the nav has no Employers-first path. They must scroll through About, Services, Industries, Process, and Candidates before reaching the Employers section — section 9 of 11.
2. The contact form `type` dropdown (Hiring / Candidate / Other) is the only audience-routing mechanism but is invisible until the user reaches the bottom. Nothing mid-page signals that one form handles both audiences.
3. The stat band reads "$40K+ Average Placement Fee" — an employer-facing trust signal positioned before the About section. Candidates would find this confusing or off-putting (it signals cost, not opportunity).

---

## Top 3 Priorities for Cycle 15

### P1 — Add "Employers" anchor to desktop nav (or second CTA button for candidates)
**File:** `/Users/modica/projects/mackai-west/index.html` (nav section, approx. lines 30–60)  
**File:** `/Users/modica/projects/mackai-west/style.css` (nav styles, approx. lines 140–220)

The desktop nav has 7 links but Employers is buried at section 9. Either reorder the nav to surface Employers earlier (after Candidates), or add a ghost "Submit a Resume" sibling button next to the existing "Submit a Search" CTA — making dual-audience intent unmistakable at the top of every page. This is a direct conversion-path fix for the employer audience.

### P2 — Process mobile step card row gap tightening
**File:** `/Users/modica/projects/mackai-west/style.css` lines 1738–1774 (`.process-step`) and line 2738 (`@media max-width 600px` single-col override)

On iPhone 13 at mid-section scroll, the active step card (step 03, Placement) shows ~180px of empty navy below the description text before the next card begins. The `@media (max-width: 600px)` block adjusts `.process__body` gap but not `.process__steps` row gap. Adding an explicit reduced row gap on the single-column mobile layout would tighten the rhythm without changing desktop.

### P3 — Stat band candidate micro-label
**File:** `/Users/modica/projects/mackai-west/index.html` stat section (approx. lines 90–115)  
**File:** `/Users/modica/projects/mackai-west/style.css` stat styles (approx. lines 600–680)

The "$40K+ Average Placement Fee" framing serves only the employer audience. Adding a secondary eyebrow or sub-label below the stat that speaks to candidates — e.g. "Senior-level roles only. Manager and above." — would make the band serve both audiences without fabricating data. No invented stats, no fake claims; just a content framing that doesn't alienate half the audience at second viewport.

---

## Cap Justification

Design ceiling of 8.2 is reached this cycle. The site is now in the top 10–15% of executive search sites from a scroll-experience and visual identity standpoint. The cap holds because:

- No real photography (about placeholder is honest but is still a placeholder)
- No real testimonials
- No published office address or city
- Contact form submits to `action="#"` with mailto fallback (index.html line 640) — terminal conversion action not wired

When all three content unlocks land, the ceiling rises to 8.5–8.7.
