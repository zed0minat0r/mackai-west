# MacKai West — Audit Report

## Cycle 4 Score: 7.1 / 10 (Delta: +0.3 from 6.8)

**Summary:** The 3D hero mesh, candidates cream wash, footer signature features, and contact floating labels each move the needle — the site now has genuine personality across more sections — but the stat count-up mid-fire defect persists and is now worse (showing $24K–$26K on mobile), the services scroll-lock mid-transition creates a split-panel readability issue at 375px, and the absence of real photography, testimonials, and address holds the cap at 7.5.

---

## What Landed This Cycle (Cycle 4 commits)

- **b5a2549 (interrupt):** Hero editorial gradient + thin gold horizon rule replacing the skyline rectangles the user flagged as "weird." The gold rule and warm gradient are correct — no geometric shapes competing with the wireframe mesh. The horizon parallax intent is present but the wireframe mesh (`hero__mesh-svg`) has superseded it as the hero's primary depth element.
- **1863cee (cycle 4 prelim 3D):** Hero SVG wireframe octahedron — confirmed live as `hero__mesh-svg`, rendering as a geometric diamond lattice in the upper-right of the hero. Visible and correct on desktop and both mobile viewports. Service card 3D tilt-on-hover is present (14 `.service-fp` elements found). Industry card 3D flip confirmed — 8 elements with preserve-3d detected. The flip interaction is not visible in mid-scroll static captures but the mechanism is live.
- **9af473b (mid-cycle 2):** About "The Practice" pillars (I/II/III) — confirmed rendering cleanly on iPhone 13 (scroll=2100) and iPhone SE (scroll=2100). Playfair italic numerals, correct three-pillar structure visible.
- **a3994f8 (builder cycle 4):** Candidates cream gradient wash — confirmed via computed style (`linear-gradient(135deg, rgb(250, 246, 238) 0px...`). This is the correct fix from cycle 3 priority 3. The section now has a warm ground. Footer stagger: 11 `.footer__letter` elements confirmed, opacity=0 at mid-page scroll (correct — stagger not yet fired). Scroll-driven gold progress rule confirmed live (`footer__progress` with `matrix(0.642136, 0, 0, 1, 0, 0)` scaleX at time of sampling).
- **2b414e6 (spark cycle 4):** Contact floating labels — 4 inputs, 5 labels confirmed present. Submit button choreography (spinner → checkmark → ring pulse) not capturable in static scroll but JS is in place. About pillars stagger reveal — rendering clean at multiple mobile positions.
- **1c90ed2 (pixel cycle 4):** Footer wordmark space collapse fixed (`white-space:pre` on `.footer__letter`). No horizontal overflow on either mobile device (375px and 390px both clean — docWidth matches winWidth exactly).

---

## Did Cycle 4 Close the "Basic and Generic" Gap Further?

**Yes, but the gap between committed intent and live execution remains the central problem.**

Cycle 4 added genuine depth across more sections than any previous cycle. The hero now has a 3D wireframe mesh that a buyer landing on the page will register as "this is not a template." The candidates section has a warm cream ground that distinguishes it from the plain-white void that persisted through cycles 1–3. The footer signature features (stagger wordmark reveal, scroll-driven progress rule) are executive-search caliber details that competitors in this niche do not ship. Contact floating labels are a polish signal that reads professional without being showy.

But the stat count-up defect has now become more damaging than it was in cycle 3. On desktop the visitor sees $25K. On iPhone 13 they see $26K. On iPhone SE they see $24K. The firm's single verifiable quantitative claim — the $40K placement fee — is being served as $24K–$26K to the majority of visitors who scroll at a normal pace. For a firm positioning itself as a $40K-per-placement specialist, showing a mid-animation value that is 40% below the actual fee is a trust defect, not an aesthetic one.

The site sits at approximately 7.1 — it has moved past "generic" into "considered," but not yet into "I would choose this over a competitor." The 3D elements and signature footer are the right territory; the persistent stat defect and the 375px services split-panel undercut the polish impression those features build.

---

## What Works (Confidence-Builders)

- **Hero 3D wireframe mesh is the right move.** The SVG `hero__mesh-svg` renders as a geometric diamond lattice at upper-right of the navy hero — it gives the hero spatial interest without competing with the headline or the two CTAs. At 375px (iPhone SE) the mesh is proportionally scaled and does not crowd the text. This is the most distinctive single element on the page.
- **Services scroll-lock remains the signature interaction.** iPhone 13 track confirmed at `matrix(1, 0, 0, 1, -263, 0)` — the panel is mid-travel at scroll=3500, correctly. No horizontal overflow on either mobile device. The two-panel fullscreen approach (Tax / F&A each occupying 100vw) is genuinely different from anything a competitor in this niche ships.
- **Candidates cream gradient wash is a clear improvement.** The section now has warmth and ground. The three points read at correct weight. The cream gradient treatment brings it into the same visual family as the services intro panel — it no longer reads as a forgotten section.
- **Footer scroll-driven progress rule is an editorial detail.** The `footer__progress` scaleX confirms it is live and advancing. A buyer who reads all the way to the footer sees a gold line completing across the top — it signals "we built this with intention." No competitor in this niche does this.
- **Industry cards now surface role archetypes on face.** At desktop scroll=5400, the three industry cards (Construction / Real Estate / Manufacturing) each show specific role tags in gold (`CFO · Controller · Project Accounting · Tax Director`, etc.) directly on the card face, without requiring hover. This is more conversion-friendly than requiring an interaction to discover the information.

---

## What's Still Off (Actual Problems)

- **Stat count-up mid-fire defect persists and has worsened on mobile.** Desktop: $25K. iPhone 13: $26K. iPhone SE: $24K. All confirmed via Playwright screenshots at natural scroll positions. The animation fires when the element enters the viewport, but the IntersectionObserver trigger is too early — the element is mid-count when the user first sees it. On mobile the viewport is smaller so the element appears earlier in the count cycle, making the mid-count value lower. A hiring leader who scrolls through on their iPhone and sees "$24K average placement fee" will either distrust the number or distrust the site. This is the single highest-priority defect on the live site.
- **Services scroll-lock mid-transition is split at 375px.** At iPhone SE scroll=3500, both Panel 01 (Tax) and Panel 02 (Finance & Acc) are simultaneously visible with text clipped at the viewport edges — "Finance & Acc..." truncated, "nment" visible on the left. The dots are visible. The feature is functional but the mid-transition state is jarring on a small screen: two headlines fighting for width, neither readable in full. The fix is not to disable the feature but to ensure the transition either snaps faster or the resting positions are cleaner at 375px.
- **Services section has excessive dead whitespace between intro and first panel on mobile.** At iPhone SE scroll=2800 the section intro ("Two specialist practices. / One disciplined approach.") fills the upper half of the viewport and then there is roughly 40% dead cream space before the Panel 01 content begins. This is the runway top margin rendering visibly — it reads as a layout gap rather than intentional pause.
- **Hero mesh is small relative to the hero viewport at 1440px.** At desktop the wireframe diamond occupies approximately the upper-right quadrant at a scale that looks considered but modest. Given the user's explicit request for "impressive 3D animations," the mesh could be more prominent — larger, more complex, or with a slow vertex-pulse animation that gives it life rather than just rotation. It reads as tasteful at current scale but not "impressive."
- **No real photography, testimonials, or address — cap holds.** The site continues to use no photographic content, no real client or candidate voice, and "Headquartered in the United States" as the contact location. Until all three land, the cap of 7.5 stands regardless of design quality. A $40K hiring decision involves trust signals that design alone cannot supply.

---

## Cycle 5 Top-3 Priorities (Ranked)

### Priority 1 — Fix the stat count-up to show $40K+ on first visible frame

**Why it's first:** This is now a three-cycle unresolved defect that is getting worse, not better. It is a factual trust error on the firm's primary quantitative claim. It is worse on mobile (the primary viewing environment for many candidates) than on desktop.

**Acceptance criteria:**
- The count-up animation must NOT begin until the stat number is fully within the visible viewport. Implement `threshold: 0.95` or `rootMargin: '-25% 0px -25% 0px'` on the IntersectionObserver to ensure the element is well into view before the count starts.
- Alternative acceptable fix: skip animation entirely for users who scroll past quickly — detect scroll velocity, and if the user has scrolled past the element within 300ms of it entering the viewport, skip directly to the final value `$40K+` and fire the `is-counted` class immediately.
- Verified by Playwright on desktop 1440, iPhone 13, and iPhone SE: screenshot at the first scroll position where the stat section is fully visible must show `$40K+`, not a mid-count value.
- The `stat__plus` fade-in must remain visible at completed state.
- Do NOT remove the count-up animation — fix the trigger timing.

### Priority 2 — Fix the services panel mid-transition readability at 375px

**Why it's second:** The services scroll-lock is the site's most distinctive interactive feature. On iPhone SE the mid-transition state shows two truncated headlines simultaneously — this is the state a user on a 375px device sees for the longest duration during their scroll through the 240vh runway.

**Acceptance criteria:**
- At 375px, the mid-transition state must not show readable partial text from both panels simultaneously. Acceptable fixes: increase the transition sharpness so the mid-travel state is brief (the transition from panel 1 fully visible to panel 2 fully visible should complete in less than 25% of the runway rather than the current ~50%); or add `overflow: hidden` + `clip` to each panel so off-screen text is not visible during transition; or widen the panel to `100.5vw` with `overflow: hidden` to ensure the adjacent panel starts fully off-screen.
- Verified by Playwright on iPhone SE at 5 positions through the services runway (5%, 25%, 50%, 75%, 95% of the 240vh section): at no position should two headlines be simultaneously readable in the viewport.
- Do NOT add a matchMedia guard or collapse to vertical stack. Fix the CSS geometry.

### Priority 3 — Amplify the hero 3D mesh to match "impressive 3D" intent

**Why it's third:** The user explicitly asked for "impressive 3D animations and effects" mid-cycle. The SVG wireframe mesh is tasteful and correct but it is modest in scale and impact at 1440px. Amplifying it would close the gap between the design team's execution and the user's stated ambition without touching sections that are working.

**Acceptance criteria:**
- The hero mesh must be visibly larger and more dynamic on desktop (1440px). Acceptable approaches: increase the SVG viewport from its current size to at least 50% viewport-width; add a slow vertex-pulse animation (individual vertices or edges light up gold at staggered intervals, 0.05 opacity shift, 3–5s cycle); or add a second, slightly offset wireframe layer at 30% opacity that rotates at a different rate to create depth parallax.
- The mesh must remain proportionally scaled on mobile — do not expand it so large it obscures the headline on 375px.
- Verified by Playwright on desktop 1440: the mesh must visibly occupy a larger portion of the hero right-half than in cycle 4. On iPhone SE the headline "Specialist recruitment." must remain fully legible with the mesh behind it.
- Do NOT remove the current mesh — extend and amplify it.

---

## Audit Notes

- Cap of 7.5 holds: no real photography, no real testimonials, no verifiable street address. Cap lifts when all three land.
- Scored from a real prospective buyer's 90-second scroll: a Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Tax Manager deciding whether to submit a resume.
- Stat count-up defect confirmed on all three viewports: desktop $25K (scroll=900), iPhone 13 $26K (scroll=700), iPhone SE $24K (scroll=700). Playwright `statValue` at final state shows `$40K+ is-counted` — correct only after animation completes. The defect is in trigger timing, not the animation itself.
- Services scroll-lock: functional on iPhone 13 (track `matrix(1,0,0,1,-263,0)` confirmed). Split-panel readability at 375px confirmed at scroll=3500 — both panels partially visible.
- Hero wireframe mesh: `hero__mesh-svg` confirmed present. Renders as diamond lattice. Tasteful execution, modest scale.
- Industry cards: role archetypes now appear on the card face without hover interaction (visible in desktop scroll=5400 screenshot). Whether this is the 3D flip back-face showing through or roles moved to front-face — either way, the information is accessible without interaction, which is more conversion-friendly.
- Footer progress rule: live and advancing (`matrix(0.642136, 0, 0, 1, 0, 0)` = 64.2% scaleX at mid-page).
- No horizontal overflow on mobile: iPhone 13 (390px clean), iPhone SE (375px clean).
- All copy remains honest. No fabricated content introduced in cycle 4.
