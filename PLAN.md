## Cycle 13 Builder — Process Section START layout fix

**Problem:** `.process__body` is a block container so `.process__journey-bar` (sticky, tall)
sits ABOVE `.process__inner` in normal flow. On iPhone SE at section start, the bar dominates
the viewport with empty navy space and step content is barely visible at the bottom.

**Files touched:** `style.css` (L1757-1785 main rules, L2654 768px breakpoint, L2679-2682 600px breakpoint, L3044 z-index override), `index.html` (cache-buster), `style.min.css` (regenerated).

**Changes:**
1. `.process__body` -> `display: flex; gap: clamp(16px, 3vw, 36px); align-items: flex-start;`
2. `.process__journey-bar` -> `flex: 0 0 auto;` remove `margin-left`
3. `.process__inner` -> `flex: 1; min-width: 0; padding-left: 0;`
4. `@media (max-width: 768px)` `.process__journey-bar`: keep width 36px, no margin-left needed
5. `@media (max-width: 600px)` `.process__body`: add gap override `clamp(12px, 2.5vw, 20px)`; `.process__inner`: remove `padding-left: 28px`
6. Regenerate `style.min.css`
7. Bump cache-buster to `?v=cycle13-b`

**Success criterion:** At section start (5% scroll pos) on iPhone SE 375, step "01 Discovery"
header+content visible in viewport alongside the bar (bar LEFT, steps RIGHT). Sticky pin holds
at mid-runway (50%). No bleed into Candidates at 95%.

**Scope:** Surgical CSS only, no JS changes, under 200 words.
