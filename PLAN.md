# PLAN.md — Builder Cycle 2

**Date:** 2026-04-27
**Scope:** About section overhaul (P1) + Process visual weight (P3)

## Task 1 — About typographic anchor

**Change:** Replace `.about__media` photo group (two Unsplash images + inset overlap bug) with a bold typographic stat block.

**Approach:** Option B hybrid — stacked typographic mark + real stat.
- Large "MacKai / West" brand name split across two lines in Playfair Display italic at clamp(3.2rem, 6vw, 6rem), gold
- Below it: "$40K+" in a massive Playfair numeral at clamp(4rem, 7vw, 7rem), navy, with a thin gold rule above
- "Avg. placement fee" caption in Inter small-caps
- The whole block lives in `.about__anchor` replacing `.about__media`
- Remove: `.about__photo`, `.about__photo--inset`, `.about__photo img`, `.about__photo:not()`, `.about__rule` CSS rules
- Mobile (375px): single column already (grid collapses), anchor stacks naturally below copy — verify no clipping

**Files:** `index.html` (replace `.about__media` block), `style.css` (remove photo rules, add `.about__anchor`)

## Task 2 — Process visual weight

**Changes in style.css:**
- `.process__line-base`: stroke-opacity 0.18 -> 0.32, stroke-width 1 -> 1.5
- `.process__line-fill`: stroke-width 1.5 -> 2.5
- `.process-step__num`: font-size 0.78rem -> clamp(2.4rem, 4.5vw, 3.4rem), font-style: italic, font-weight: 400, letter-spacing: -0.02em
- `.process-step`: add padding-top bump to account for larger numeral
- Mobile font floor override for `.process-step__num` removed (was 0.8125rem — replace with appropriate floor)

## Cache + minified CSS

- Bump cache-buster `?v=cycle1-nav-fix-2` -> `?v=cycle2-b`
- Regenerate `style.min.css` via `npx clean-css-cli`

## Success criteria

- No Unsplash images in About
- Typographic anchor renders on desktop and mobile, no overlap
- Process numerals are large editorial marks (not eyebrow text)
- Line visibly thicker in Playwright scroll test
- Playwright: 5 positions x 3 viewports (1440, iPhone 13, iPhone SE)

**Diff scope:** ~50 lines HTML, ~60 lines CSS
