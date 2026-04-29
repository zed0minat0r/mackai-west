# BUGS — MacKai West

## Process / "How we work" Section — QA Audit 2026-04-28

Tested: desktop 1440×900 + iPhone 13 (390×664) + iPhone SE (375×667)
Live URL: https://zed0minat0r.github.io/mackai-west/
Commit at time of audit: e3309a4

---

### BUG-01 (CRITICAL) — Cards invisible for ~950–1050ms on section entry — all viewports

**Symptom:** When scrolling to the Process section at normal speed, all 4 cards remain opacity=0
(translateY 20px) for roughly 1 second before they appear. This is the primary "populates slowly"
complaint. The IO observer fires `is-revealed` only after a delay because:

1. The IO observer uses `threshold: 0, rootMargin: '0px 0px -15% 0px'` on the `.process` SECTION
   (not on the cards). The section is ~1938px tall on desktop and ~2832px on iPhone 13. The section
   top must clear 85% of the viewport before the observer fires — on desktop that means scrolling
   ~765px past the section header. On mobile the section is taller so it's even worse.
2. The `is-revealed` class adds a 0.5s CSS transition (`cubic-bezier(0.22,1,0.36,1)`). So the
   visible delay is: observer fire delay + 500ms CSS transition = perceived 1–1.5s blackout.

**Measured:** `First reveal detected at: 1049ms desktop / 948ms iPhone13 / 1033ms iPhone SE`

**File/line:** `/Users/modica/projects/mackai-west/main.js` line 778 — `rootMargin: '0px 0px -15% 0px'`
Fix: change to `rootMargin: '0px 0px 0px 0px'` (or even positive margin) so the observer fires as
soon as the section top enters the viewport. Cards should start fading in while H2 is still visible.

---

### BUG-02 (CRITICAL) — Anchor link to `#process` leaves all cards permanently invisible

**Symptom:** Loading `/#process` directly (or clicking the nav "Process" link) scrolls the page so
the process section is at the top. The IO observer never fires because the section was ALREADY
in the viewport when it was registered — IO only fires on state CHANGE (not→intersecting), not
when the element is already intersecting at observe() time. Result: all 4 cards stay at opacity=0
permanently. The section is a blank navy void.

**Measured (Playwright):** After 3s with `?cb=...#process` in the URL — all 4 cards:
`revealed=false, opacity=0`

**Screenshot:** `/Users/modica/projects/mackai-west/screenshots/qa-process/desktop-anchor-link.png`
(loads page but user jumps to an invisible section)

**File/line:** `/Users/modica/projects/mackai-west/main.js` line 771–780
Fix: After registering the observer, check immediately if the section is already in the viewport
and if so, trigger the reveal synchronously:
```js
// After observer.observe(section):
if (section.getBoundingClientRect().top < window.innerHeight) {
  steps.forEach(function (el) { el.classList.add('is-revealed'); });
  observer.unobserve(section);
}
```
Or use `{ threshold: 0, rootMargin: '100px 0px 0px 0px' }` — a positive top margin ensures the
section is considered intersecting even when at the viewport top.

---

### BUG-03 (HIGH) — Fast-scroll / direct jump to section leaves cards invisible

**Symptom:** When user scrolls quickly (e.g. momentum scroll on mobile, or programmatic jump via
`scrollTo`) directly to the section without passing through it incrementally, the IO observer may
never fire for the same reason as BUG-02 — the scroll position lands mid-section or at section top
and the element is already "intersecting" when observed.

**Measured:** `FAST SCROLL (50ms after jumping to section) — Step 1-4: revealed=false, opacity=0`

**Screenshot:** `/Users/modica/projects/mackai-west/screenshots/qa-process/desktop-fast-scroll-50ms.png`

Same fix as BUG-02 — synchronous pre-check on observe().

---

### BUG-04 (MEDIUM) — Mobile grid: `process-step__head` occupies full card width

**Symptom:** On iPhone 13 (390px) and iPhone SE (375px), the `.process-step` grid resolves to a
single-column layout (correct), but `gridTemplateColumns` reads as a single fixed pixel value
matching the full card content width rather than `1fr`. More critically, `.process-step__head` 
reports `headW=292px` (iPhone 13) / `277px` (SE) while `.process-step__content` shows
`contentLeft=49px` — indicating the content column starts at the left edge of the card padding,
not as a second column below the head. The head and content are stacked (correct for mobile) but
the head takes full 292px width; the vertical divider (`border-bottom`) is visible and correct.

**Potential misread vs real bug:** The stacking itself is correct (single col, border-bottom on head).
However the `contentLeft=49px` on iPhone 13 is suspicious — it suggests the content column has a
left indent (likely inherited padding from the card), while head starts at a different left. This
needs visual verification against the card padding value.

**Screenshot:** `/Users/modica/projects/mackai-west/screenshots/qa-process/iphone13-mid.png`
(cards look correct visually but no border-right on mobile as expected)

---

### BUG-05 (MEDIUM) — Active state never fires on mobile mid-section (steps 3+4)

**Symptom:** On iPhone 13 and iPhone SE at 40% section scroll depth, only Steps 1–2 are `is-active`.
Steps 3 and 4 show `top=410px` and `top=1037px` respectively (well below reading line at 264px).
This is expected behavior for a partially-scrolled section — the active state IS correct here.
However: on mobile, with `opacity=0.55` on the numeral in inactive state, the visual difference
between active/inactive states is already subtle. During the ~1s reveal blackout (BUG-01), when
the cards do appear, they appear in their INITIAL inactive state — no gold warmth — which reads
as "broken" even if the is-active logic is working correctly. The two bugs compound.

---

### BUG-06 (LOW) — Desktop: process section entry shows ~320px gap above cards (services bleed)

**Symptom:** At section entry (`desktop-timing-0ms.png`), the industries section is still partially
visible at top, and the process intro ("HOW WE WORK / Four stages") appears mid-viewport. Cards
load below the fold. This is not a bug per se — it's the normal scroll position — but it means
users see a partially-blank navy section for the full ~1s before the cards reveal. Combined with
BUG-01 this creates the "populates slowly" visual.

**Screenshot:** `/Users/modica/projects/mackai-west/screenshots/qa-process/desktop-timing-0ms.png`

---

### BUG-07 (LOW) — Heading H2 line-mask reveal fires BEFORE card reveal

**Symptom:** The section H2 ("Four stages. No surprises.") has its own IO observer at threshold 0.4.
It fires and reveals the heading BEFORE the cards reveal (heading uses `is-revealed` on
`.section-title`; cards use `is-revealed` on `.process-step`). On desktop, heading appears at
~0ms but cards are still invisible for ~1s. This creates a jarring moment where the heading is
visible but the section content below is blank navy — amplifying the "buggy" perception.

The H2 observer and card observer are completely decoupled; the H2 observer fires first (threshold
0.4 vs the card observer's `rootMargin -15%`), so for ~1s the heading sits above an empty section.

---

## No issues found:
- No horizontal overflow on any viewport
- All bullet counts correct (3 per card × 4 cards)
- Font sizes above 13px floor (numeral 38.4px mobile, desc 16px, eyebrow 13px)
- Active state ordering is monotonic (correct)
- No layout shift after reveal (transform resolves cleanly)
- Cards do eventually reveal fully (opacity 1.0) on all viewports when scrolling normally
- Vertical divider on desktop, horizontal divider on mobile — correct breakpoint behavior
- No JS console errors detected
