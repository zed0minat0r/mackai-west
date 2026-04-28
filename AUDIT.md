# MacKai West — Audit Report

## Cycle 2 Score: 6.3 / 10 (Delta: +0.5 from 5.8)

**Summary:** Cycle 2 eliminated the stock-photography trust problem and gave three sections genuine visual anchors — a meaningful step forward, but the Candidates section still reads pale and disconnected, and the site remains below the conversion threshold for a senior decision-maker who has seen Heidrick or Korn Ferry's web presence.

---

## What Landed This Cycle

- **627db22 Builder:** About section typographic anchor — navy panel with stacked Playfair italic "MacKai / West" mark, gold rule, and "$40K+ AVG. PLACEMENT FEE" caption replaces both Unsplash stock photos entirely. This is the single best improvement across cycles 1 and 2. The section now reads as a deliberate brand statement rather than a template filled with placeholder photography. Process numerals at clamp(2.4–3.4rem) Playfair italic are now legible as visual anchors; line stroke at 2.5px and ghost opacity 0.32 render with appropriate weight.
- **20eb250 Spark:** Candidates section gains an oversized gold italic "01" Playfair numeral (8–11.5rem) anchoring the left column — correct direction, the column layout now has typographic tension. Employers section navy left panel with stacked "For / Employers" mark + gold rule + "EXECUTIVE SEARCH" caption is the most editorially confident element on the site. The two-column dark/cream contrast is clean and reads premium at 1440.
- **a110ea3 Pixel:** Employers panel mobile column stacking confirmed working at 375 and 414 — navy mark renders as a full-width header block above the cream content column, no cramping. Font floor at 13px holds. No horizontal overflow.

---

## Did Cycle 2 Move the "Basic and Generic" Axis?

**Yes — a full step, not another half-step. But unevenly.**

The About and Employers sections are now genuinely distinctive. A real hiring leader or candidate who lands on the About section and sees the Playfair italic typographic lockup instead of stock office photography will register a considered design choice, not a template. The Employers panel with its narrow navy left column reads like something from a 2024 boutique search firm, not a WordPress theme.

But the Candidates section does the opposite: the "01" numeral sits in isolation on the left while the heading copy renders washed-out in near-grey at scroll-entry. On desktop the section has a large white expanse above the numeral before the content area begins — it reads unfinished. On mobile the "01" numeral is extremely large and the copy below it appears muted. A senior tax professional arriving at that section has no visual confirmation that this firm is worth contacting. The section is the weakest it has ever been relative to the rest of the page.

The site is no longer generic. It is not yet consistently premium.

---

## What Works (Confidence-Builders)

- **About typographic anchor is the right call.** No stock photography was the correct move given the content-honesty constraints. The navy panel with gold italic brand mark and $40K fee reads as intentional editorial design — it would not look out of place on a Heidrick or Egon Zehnder brand page.
- **Employers section is the strongest section on the page.** Two-column dark/cream, stacked Playfair italic mark, "EXECUTIVE SEARCH" caption, gold rule — all elements consistent and premium. Pixel's mobile fix holds: stacks cleanly at 375, no overflow, caption legible.
- **Process section is materially improved.** The 3rem+ italic step numerals elevate a four-column template grid into something closer to a considered layout. The 2.5px copper line at 0.32 ghost opacity is now visible before the scroll animation draws through it.
- **Copy remains the site's strongest trust signal.** "When the seat is senior, the search is different." "A long career is built on the right next move." "Narrow is what makes the placement stick." These are not AI-generated filler phrases — they build the case that someone actually understands the market.
- **Mobile foundations are solid.** No overflow at 375 or 390. All tap targets pass. Nav unclipped. Employers panel stack confirmed correct.

---

## What's Still Off (Actual Problems)

- **Candidates section scroll-reveal is broken at first view.** The heading "A long career is built on the right next move." renders at very low opacity — near grey — at the scroll position where the section first enters the viewport. A prospective candidate arriving from a job board link who scrolls immediately to Candidates will see washed-out, barely readable headline copy before the reveal animation completes. This is a conversion defect: the section's primary value proposition is invisible at first glance.
- **The "01" numeral floats disconnected from the content column.** At 1440 there is a visual gap between the large gold italic "01" on the left and the "FOR CANDIDATES" eyebrow + headline on the right. The numeral reads as a label for the section number (there is only one candidates section) rather than anchoring or contextualising the content. Compare to the Employers panel where the "For / Employers" mark directly labels the panel it sits in — the relationship is clear. In the Candidates section the "01" could mean anything.
- **Candidates section background reads flat against the rest of the page.** About (white), Services (cream), Industries (cream), Process (navy), Candidates (white), Employers (cream/navy) — the Candidates section on plain white with pale copy sits visually lower than every surrounding section. It needs either a background treatment or significantly heavier typography to compete.
- **Scroll experience lacks momentum at the top-of-page transition.** The hero exits directly into the stat band and then immediately into the About section with no scroll drama or pacing. The marquee tape divider (cycle 1) sits between stat and about but the transition from hero to stat is abrupt. A real 90-second scroll-through of the site feels flat in the first 30 seconds before the visual work kicks in around the About section.
- **Zero social proof with no substitute visual trust device.** The cap holds and fabricated content must not return. But the site currently relies entirely on copy to convey credibility for a $40K retained search decision. Competitors at this level (even smaller boutiques) typically have a recognisable client logo row, a named publication mention, or a professional headshot. Without any of these, the copy — excellent as it is — must work harder than copy alone can.

---

## Cycle 3 Top-3 Priorities (Ranked)

### Priority 1 — Fix the Candidates section scroll-reveal opacity defect

**Why it's first:** This is a live conversion defect. A candidate who scrolls to the section in under 5 seconds sees near-invisible copy. The section needs to be readable at first viewport entry, not only after scroll animation completes.

**Acceptance criteria:**
- The Candidates heading ("A long career is built on the right next move.") must render at full opacity (1.0) or near-full opacity (minimum 0.85) when the section first enters the viewport at 1440, 390, and 375
- If the reveal animation is scroll-driven, the animation's start threshold must be adjusted so the element is fully visible before the user reaches it, not as they reach it
- The "01" numeral must visually connect to or frame the right-column content rather than float as an orphaned index number — acceptable approaches: a light rule between numeral and content, a background colour difference on the numeral column, or repositioning the numeral as a within-column decorative element above the headline
- Verified at 1440 and 375 with Playwright, sampled at section top + 300px scroll offset

### Priority 2 — Add background depth to the Candidates section

**Why it's second:** The section is the only plain-white expanse adjacent to textured or navy sections on both sides. Even a subtle treatment would lift it.

**Acceptance criteria:**
- Candidates section receives a background treatment that distinguishes it from the default white: a very light cream wash (--cream at 20–30% opacity), a subtle copper/gold left-edge rule, a faint diagonal texture, or a cream-to-white gradient — anything that signals the section is designed, not defaulted
- The treatment must not clash with the oversized "01" numeral (which should remain)
- On mobile the treatment must be visible at 375 without introducing horizontal overflow
- No new sections added; this is a within-section visual upgrade only

### Priority 3 — Add pacing and scroll tension to the hero-to-stat-band transition

**Why it's third:** The top 20% of the scroll is where a first-time visitor decides whether to continue. The abrupt hero-to-stat cut loses the editorial momentum the rest of the page has built.

**Acceptance criteria:**
- The transition from the hero section into the stat band ($40K) gains a visual or typographic device that creates brief pause or emphasis — acceptable approaches: a full-width copper or gold rule with slight animation on scroll entry, a pull-quote strip between hero and stat in Playfair italic at the brand voice level ("Narrow is what makes the placement stick."), or a short marquee-tape-style element using a different phrase from the existing marquee tape
- The device must not replicate the existing marquee tape (already between stat and about)
- The overall page scroll must feel like it has deliberate rhythm: a beat at the hero, a beat at the stat, a beat at the about anchor — not a continuous scroll past undifferentiated sections
- Verified visually at 1440 and 390 by scrolling from top to about section at a normal pace

---

## Audit Notes

- Cap of 7.5 holds: no real photography (now resolved via typographic replacement), no testimonials, no published street address. Cap lifts when all three land.
- Scored from a prospective client perspective: a CFO or Tax Practice Leader deciding whether to open a $40K retained search, and a Senior Manager Tax candidate deciding whether to submit a resume.
- All scroll-reveal defect assessment based on Playwright screenshots at the section's first-viewport-entry position, not after user scrolls through — this is the correct test for a real prospective client who arrives via direct link or nav click.
- All copy remains honest — no fabricated facts introduced in cycle 2.
- Employers panel mobile stack confirmed working at 375px.
