# MacKai West — Audit Report

## Cycle 3 Score: 6.8 / 10 (Delta: +0.5 from 6.3)

**Summary:** The horizontal scroll-lock and industries hover-reveal are genuinely distinctive features that no template ships by default — the "basic and generic" axis has moved meaningfully — but two live defects (hero parallax not firing, stat count-up showing a mid-count value at first scroll) and the Candidates section's persistently wan visual treatment prevent a larger step.

---

## What Landed This Cycle (Cycles 2.5 + 3)

- **cc266b3 Builder (2.5):** Services horizontal scroll-lock — two fullscreen panels (Tax / F&A) pin and slide horizontally on scroll, 240vh runway, active dot indicator, live on mobile with no matchMedia bail. Verified working on desktop (track steps 0vw → -18.6vw → -55.9vw → -100vw through the runway), iPhone 13 (same progression confirmed), and iPhone SE (intro heading lands before the track panel). This is the strongest interactive feature on the site.
- **cc266b3 Builder (2.5):** Hero 3-layer parallax (skyline back/mid/front at rates 0.15/0.35/0.55). Intent correct; execution not firing (see defects below).
- **9af473b Builder (2.5):** About section duplicate `$40K` panel replaced with "The Practice" pillars list (I / II / III). Correct — removes redundancy, adds content depth on the right column.
- **22092f9 Builder (3):** Candidates scroll-reveal threshold lowered (0.12 → 0.05 + rootMargin -5%) — heading opacity is now 1.0 at section entry. Copper hairline border-right added to numeral column. Stat count-up (0 → 40K, easeOutCubic, 1.4s) confirmed working: `is-counted` class fires, `$40K+` renders correctly after animation. Magnetic copper underlines on nav and footer (±6px cursor-follow, touch bail).
- **16a3d41 Spark (3):** Industries hover-reveal expand panels — navy card with "Roles we place" eyebrow, gold hairline rules, role archetypes list. Confirmed visually: Construction card flips to navy expand panel with Tax Director / Plant Controller / VP Finance / Project Accounting Lead / Director of FP&A. This is a genuine editorial interaction — it earns the "we know this industry cold" claim rather than just asserting it.
- **16a3d41 Spark (3):** Services typography polish — numeral scaled, title tightened, sub-label gold hairline separator. Desktop screenshot confirms the panel layout reads cleanly with "01 / Tax Recruitment / PUBLIC ACCOUNTING" hierarchy.
- **fd46f61 Pixel (3):** Tap target compliance — industry toggle 32 → 44px, footer nav 25 → 44px, link-arrow CTAs 26 → 44px on mobile. Correct compliance pass.

---

## Did Cycles 2.5 + 3 Close the "Basic and Generic" Gap?

**Yes — substantially, but unevenly across sections.**

The site is no longer generic. Two sections — Services and Industries — now have interactions that a hiring leader or senior candidate will not have seen on a competitor's site in this niche. The services scroll-lock is executed without gimmickry: it uses the horizontal-pin pattern to give each practice (Tax vs F&A) its own moment of attention, which maps directly to the firm's positioning as a two-practice specialist. The industries hover-reveal earns credibility by surfacing specific role archetypes on demand — a CFO landing on the Construction card and seeing "Director of FP&A / Plant Controller" listed specifically will register that as knowledge, not marketing copy.

The remaining gap is structural. Hero parallax is not firing (all three skyline layers remain at `translateY(0px)` at scroll=400 — dead on arrival). The Candidates section heading is now fully opaque (the cycle 2 defect is fixed), but the section itself reads visually lightweight against everything surrounding it: plain white background, muted grey bullet-point copy, an "01" numeral that now has a copper hairline connector to the content but still reads more like a section index than an editorial anchor. A senior Tax Manager arriving at that section sees an adequate layout, not a compelling pitch.

The gap is half-closed. The top of the page (hero → stat → about → services) and the Industries section are now in a different tier from cycle 0. The bottom half (Process → Candidates → Employers → Contact) is polished but not yet distinctive.

---

## What Works (Confidence-Builders)

- **Services horizontal scroll-lock is the signature interaction.** Track stepping 0vw → -18.6vw → -55.9vw → -100vw confirmed across desktop and both mobile viewports. The dot indicator advances correctly (dot 0 active through mid-travel, dot 1 at -100vw). On iPhone 13 the full-width cream panel with "Tax Recruitment / PUBLIC ACCOUNTING" headline reads confidently — this is not a compromised mobile experience, it is the same feature.
- **Industries hover-reveal is the most trust-generating new feature.** The navy expand panel with role archetypes surfaces specific knowledge that no template ships. A hiring leader in Construction who sees "Project Accounting Lead" and "Director of FP&A" listed under their card understands immediately that this firm has placed those roles — not asserted, demonstrated. The Playwright screenshot confirms it fires correctly: navy panel visible, role list rendered, chevron toggle present.
- **Stat count-up works correctly.** Mid-scroll shows $35K (animation in progress), post-animation shows $40K+ with `is-counted` class and `stat__plus` at full opacity. The Playfair Display numeral at this size (visually estimated ~6rem) reads as a brand statement, not a data point.
- **About section "The Practice" pillars are an improvement over the duplicate stat panel.** Three numbered pillars (I / II / III) — Tax recruitment, Finance & accounting, Senior retained & contingent — read as a service taxonomy, not marketing filler. The Playfair italic pillar marks at gold with Inter body text is typographically clean.
- **Candidates heading opacity defect is resolved.** Playwright confirmed opacity=1 at both "before section entry" and "at entry" positions on iPhone SE. The copper hairline border-right on the numeral column creates a visual divider that was absent in cycle 2, reducing the floating-index problem.

---

## What's Still Off (Actual Problems)

- **Hero parallax is not firing.** All three skyline layers (`hero__skyline--back`, `hero__skyline--mid`, `hero__skyline--front`) report `translateY(0px)` at scroll=0 and scroll=400 identically. The rAF handler is either not attaching, the scroll listener is not triggering, or the GitHub Pages static build does not match the committed JS. A buyer scrolling slowly through the hero sees a flat skyline silhouette — the "3-layer depth" effect does not exist on the live site. This is the most egregious gap between what was committed and what is live.
- **Stat count-up shows mid-animation value at first scroll.** The Playwright screenshot captured at `scrollY=820` (the natural scroll position to see the stat band at 1440) shows `$35K` — the count-up is mid-travel when the stat first enters the viewport. The animation fires on IntersectionObserver entry, but the observer threshold or rootMargin may be too eager, starting the count before the section is fully in view. A real buyer who scrolls quickly past the stat band sees `$35K` not `$40K+`. This is a factual accuracy defect.
- **Candidates section remains the visual weak point.** The section has plain white background, muted grey bullet-point text (the three points — "Senior, not entry-level", "Discreet", "Honest counsel" — render at approximately 40–50% of the body text weight visually), and an "01" numeral that, despite the copper hairline connector, does not give the section a distinct tone. Every other section has either a navy background (Process, hero), a cream background (Services, Industries, Employers right column), or a strong typographic anchor (About, Employers left panel). Candidates alone has neither. A senior tax professional arriving here would find the content credible but the layout unmemorable.
- **Process section has too much vertical whitespace on desktop.** The four-column grid (Discovery / Search / Placement / Aftercare) sits within a navy section with generous padding above and below. At 1440px the section occupies a full viewport height but the content (numeral + title + 2–3 lines of body) fills only the middle third. The scroll-drawn copper line and Playfair italic numerals are correct design choices, but the section as a whole feels underfilled relative to its height. A buyer who pauses here registers the copy (which is excellent) but reads "lots of empty navy" not "deliberate editorial restraint."
- **Mobile services section has a large blank white area above the sticky panel on iPhone SE at scroll=3200.** The Playwright screenshot shows roughly 40% of the viewport as blank white above the nav transition before the services intro heading appears. This is the services-runway top margin rendering before the sticky panel pins — it reads as a loading gap or broken section on a small screen, not an intentional pause.

---

## Cycle 4 Top-3 Priorities (Ranked)

### Priority 1 — Fix hero parallax (live defect, most damaging gap)

**Why it's first:** This feature was shipped two cycles ago and is the most visually impactful animation on the site — the multi-layer skyline depth is the hero's primary visual distinction from a flat navy gradient. It is not functioning on the live site. Fixing it closes the largest gap between "committed" and "live."

**Acceptance criteria:**
- At scroll=0, all three skyline layers (`--back`, `--mid`, `--front`) must report `translateY(0px)`.
- At scroll=300, the back layer must report approximately `translateY(-45px)` (300 × 0.15), mid approximately `translateY(-105px)` (300 × 0.35), front approximately `translateY(-165px)` (300 × 0.55). Tolerances: ±10px acceptable.
- Verified by Playwright sampling at scroll positions 0, 150, 300, 500, 700 on desktop 1440 — transform values must differ between positions and scale proportionally to scroll distance.
- Reduced-motion guard must remain: `@media (prefers-reduced-motion: reduce)` users must see static layers.
- Root cause must be identified (likely: scroll event listener not attaching post-DOMContentLoaded on GitHub Pages static serve, or rAF not running because hero section is out of viewport when listener registers). Do not suppress the feature — fix the attachment.

### Priority 2 — Fix stat count-up to show $40K+ on arrival, not mid-count

**Why it's second:** This is a factual accuracy issue. A visitor who scrolls at a normal pace to the stat band sees `$35K` or `$38K` — an incorrect number — rather than `$40K+`. The count-up intent (adding kinetic interest to a static number) is correct; the trigger timing is wrong.

**Acceptance criteria:**
- The count-up animation must begin only when the stat number is fully visible in the viewport — not merely intersecting. Use `threshold: 1.0` or `rootMargin: '-20% 0px'` to delay the trigger until the element is comfortably on screen.
- Alternatively: start the animation from a higher base (e.g., $36K → $40K over 0.8s) so that even a fast scroll sees the ending value before the element exits the viewport.
- Verified by Playwright: scroll to `stat section top - 50px`, pause 200ms, capture text — value must be $40K+ (or the animation not yet started), not a mid-count value like $35K.
- The `stat__plus` fade-in must remain and must be visible at the completed state.

### Priority 3 — Give the Candidates section a distinct visual treatment

**Why it's third:** The section is the primary conversion point for candidates — the "Submit a Resume" CTA lives here — and it reads as the thinnest section on the page. Two cycles of investment have addressed opacity and numeral framing; the underlying visual identity of the section is still plain white.

**Acceptance criteria:**
- The Candidates section must receive a background treatment that distinguishes it from the plain white default. Acceptable approaches: a cream wash (`--cream` at 15–25% overlay), a subtle left-edge copper rule that bleeds into the section from the `01` numeral column, or a very light warm tint (`#FAF7F2` or similar). The treatment must not clash with the copper numeral hairline already present.
- The three bullet points ("Senior, not entry-level" / "Discreet" / "Honest counsel") must read at full body weight — if they currently render muted due to a colour or opacity override, restore them to the same legibility level as the Employers section bullet points.
- The "Submit a Resume" CTA button must read as a primary action, not a ghost: it must be at minimum as visually prominent as the "Open a Search" button in the Employers section.
- Verified visually on desktop 1440 and iPhone 13: the section must have a distinctive tone, not plain white, and the CTA must be immediately legible without scrolling.

---

## Audit Notes

- Cap of 7.5 holds: no real photography, no testimonials, no published street address on file. "Headquartered in the United States" in the contact section is honest but not a verifiable address. Cap lifts when all three land.
- Scored from a real prospective buyer's 90-second scroll: a Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Manager Tax candidate deciding whether to submit a resume.
- Hero parallax defect confirmed by Playwright: transform values identical at scroll=0 and scroll=400 across all three skyline layers. This is not a Playwright timing issue — the layers should show measurable transform differences at scroll=400 if the JS is running.
- Stat count-up animation confirmed working (class fires, final value correct) but trigger timing confirmed too early — mid-count value captured at natural first-scroll position.
- Services horizontal scroll-lock: fully functional on desktop and iPhone 13. Track transform confirmed stepping correctly through the runway.
- Industries hover-reveal: confirmed working on desktop. Navy expand panel visible, role list rendered, chevron present.
- Candidates heading opacity: defect from cycle 2 confirmed resolved. Opacity=1 at section entry on iPhone SE.
- All copy remains honest. No fabricated content introduced in cycles 2.5 or 3.
