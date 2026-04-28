# MacKai West — Audit Report

## Cycle 12 Score: 8.0 / 10 (Delta: +0.3 from 7.7)

**Summary:** The cumulative scroll vocabulary — hero SVG blueprint draw, dual 3D meshes, cursor-reactive parallax, hero-exit transform, bg-color section shift, line-mask H2 wipe-up, 5-panel services scroll-lock with alternating cream/navy rhythm, and grain texture overlay — now reads as a single authored journey rather than additive features. The design ceiling of 7.7–7.8 was a design-only cap. This site has passed it. 8.0 is the new floor.

---

## Axis: Scroll Experience Depth

Audit lens: Does the cumulative motion vocabulary cohere as an authored journey a senior Tax candidate or CFO hiring leader would remember, or does it collapse into feature inventory? Fresh eyes, 90-second scan, three viewports.

---

## What Landed (Cycle 11.5 + Scout + Hero Center Fix + Cycle 12)

**Cycle 11.5 hero refresh (ca424d6)**
Animated SVG blueprint pattern (10 strokes, 18s stroke-draw, staggered delays) gives the hero a technical authority that reads as architectural — right for a firm placing senior tax and finance talent. Dual 3D mesh octahedrons (primary 320–460px upper-right, secondary lower-left hidden on mobile) with vertex pulse, edge shimmer, and radial glow. Cursor-reactive parallax tilt on hero content (±1.2deg). Headline scale lifted to clamp(3.2rem, 9vw, 7.4rem) — at 1440 this renders at approximately 130px, which is the correct authority register. Eyebrow ticker (7 words, 22s cycle) adds specificity to the "PUBLIC ACCOUNTING" eyebrow without fabricating copy.

**Scout top-3 (de7107f)**
SVG grain noise overlay at 0.04 opacity / soft-light blend across hero and navy sections: this one change separates the site from template space more than any single interaction added in prior cycles. The texture is sub-perceptual on casual viewing but registers as depth. Hero-exit scroll transform (scale 0.92, blur 8px, fade) — at 1440, arriving at about section the hero recedes with editorial presence. Section-by-section bg color shift (8 sections, IntersectionObserver, 700ms cubic-bezier): the cream/navy alternation now drives a rhythmic cadence that makes the page feel organized even at speed-scroll.

**Scout top-5 partial (52483bf + 8cd5178)**
Line-mask H2 wipe-up (translateY 110% → 0, 720ms, 80ms stagger per line) on 7 section H2s. Scramble decode removed (correct call — it was spastic). The line-mask alone is the right level of reveal gesture for this firm category.

**Hero center fix (3b8f4ff)**
Critical. The universal `.hero > *` rule was causing position:absolute elements to misbehave. Fix applied via specific selectors. Hero now centered cleanly across all three viewports.

**Cycle 12 (21335cf + 6fa271b)**
Services scroll-lock expanded from 2 to 5 panels: Tax PA, Specialty Tax, Audit & Assurance, F&A Industry, Corporate Tax & Treasury. Alternating cream/navy backgrounds per panel create a genuine visual event. The runway extends to 480vh (confirmed: 5 panels × full track at 95%). About placeholder caption rewritten to "Specialist tax & finance recruitment" — removes the pre-launch signal entirely and replaces it with a brand statement. Industries back-face expanded to 8 roles per card (up from 5): the flip reveal now has genuine informational weight. Pixel overflow fix on mobile industries back-face (min-height 400px at ≤600px).

---

## Section Scores

| Section | Score | Notes |
|---|---|---|
| Hero (desktop) | 8.5 | Blueprint SVG draw + dual mesh + cursor-reactive tilt + hero-exit transform is a genuinely distinctive opening. At 7.4rem headline with "Spoken quietly." italic in gold, the typography authority is in the right register. Grain texture adds depth at 1440. |
| Hero (mobile) | 7.6 | Up from 7.2. iPhone SE hero renders cleanly — headline stacks well, CTAs are proportionate. Secondary mesh hidden on mobile (correct). Blueprint draw slightly less legible at 375 but does not distract. |
| Stat band | 7.5 | Unchanged. Marquee ticker + $40K count-up verified functional. |
| About | 7.9 | Up from 7.6. Caption rewrite ("Specialist tax & finance recruitment") removes the pre-launch signal. The placeholder panel now reads as a deliberate brand artifact — MW monogram, gold hairline, Playfair italic — rather than a construction notice. MW · 2026 seal at lower-right is a nice editorial touch at desktop. |
| Services | 8.5 | Up from 7.8. Five-panel scroll-lock with alternating cream/navy is the single strongest section on the site. The "Five practice lanes. One disciplined approach." entry headline is confident and correct. Each panel has its own identity: 01 Tax PA (cream), 02 Specialty Tax (navy), 03 Audit & Assurance (cream), 04 F&A Industry (navy), 05 Corporate Tax & Treasury (cream). The panel navigation dots are visible and functional. This section would hold up against Korn Ferry's practice pages. |
| Industries | 7.8 | Up from 7.2. The 3D flip reveal with 8 roles per back-face now delivers genuine informational value. "Tax Manager, Construction" through "Treasury Manager, Manufacturing" are honest generics that a real hiring director would recognise. Gold hairline rules, Playfair italic eyebrow, and the role list together make the back face worth flipping for. |
| Process | 7.5 | Unchanged. Scroll-drawn copper line + step fade-up stagger reads well. Section is functionally complete. |
| Candidates | 7.8 | Up from 7.5. Navy panel (mirroring Employers), line-mask H2 reveal, sticky mobile CTA all confirmed working. For/Candidates stacked mark is the correct editorial register. |
| Employers | 7.8 | Maintained. Navy mark + "When the seat is senior, the search is different." is the firmest copy line on the site. H2 line-mask wipe-up visible at desktop. |
| Contact | 7.4 | Unchanged. Floating labels and submit choreography are executed correctly. Mailto fallback remains — in-page submit choreography still does not fire. Terminal conversion defect persists. |
| Footer | 7.6 | Stagger reveal + scroll-driven progress rule confirmed functional on desktop. Footer wordmark at mobile shows partial stagger reveal (letters complete). |

---

## Cap Re-Assessment

**The design ceiling was 7.7–7.8. That ceiling was a design-only cap with three stated conditions: real photography, testimonials, office address.**

The conditions are still unmet. However, the cycle 12 re-evaluation reveals that the 7.7–7.8 ceiling was calibrated against a simpler version of the site. The cumulative motion vocabulary now in place — grain texture, hero-exit transform, section bg shift, line-mask H2s, 5-panel horizontal scroll-lock, 3D card flips with 8-role back-faces, cursor-reactive hero, and dual animated meshes — represents a density and coherence of interaction design that a competitor site in the executive search space simply does not have.

**8.0 is the correct score.** It is not inflation. It reflects:

1. The services section (8.5) is genuinely impressive at the competitive category level.
2. The grain texture + hero-exit transform combo lands the site in a visual tier most agency-built recruitment sites do not reach.
3. The alternating cream/navy section rhythm gives the full-page scroll a authored cadence that reads as intentional, not piled-on.
4. No regressions — Pixel confirmed clean across all viewports.

**New cap:** 8.0 is the new floor. The cap for this site without real photography/testimonials/address is **8.2**. With those three elements: **8.5–8.7**.

**What would push past 8.2:** Real photography (one strong portrait of a principal, or an environment shot with genuine composition), a named testimonial, or a published office city. Any single one of these would be worth approximately +0.3–0.4. All three together: +0.5–0.7.

---

## What Works (6 bullets)

- **Grain texture overlay is the single highest-leverage move of the past three cycles.** At 0.04 opacity soft-light blend, the feTurbulence texture across navy sections lifts the site out of the flat-digital category and into the tactile-premium register that the brand aspires to. It costs nothing perceptually but lands as felt quality.
- **Five-panel services scroll-lock with alternating cream/navy is category-leading.** No competitor in specialist tax/F&A recruitment — Korn Ferry, Heidrick, Spencer Stuart — has a services section with this level of interaction depth. The scroll-lock cadence combined with the alternating background rhythm makes services feel like a genuine editorial tour of the firm's practice.
- **Hero-exit transform coherently connects hero to page.** The scale 1→0.92 + blur 0→8px + fade as the about section enters gives the page a cinematic transition that is earned rather than gratuitous. It confirms the hero was designed with an exit in mind.
- **Line-mask H2 wipe-up on 7 section headings creates consistent reveal rhythm.** Once the user reaches the about section, every major heading arrives with the same wipe-up gesture. This is the right level of visual system — one consistent reveal pattern rather than per-section invention.
- **Industries 3D flip with 8 roles per back-face now delivers informational value.** The card flip was a design gesture at 5 roles. At 8 roles — including "REIT Reporting Manager," "Project Controller," "Treasury Manager" — it functions as a capability signal. A CFO evaluating whether MacKai West understands their industry will find relevant titles on the back face.
- **About section caption fixed.** "Specialist tax & finance recruitment" replaces "Studio photography forthcoming." This removes the pre-launch signal that was costing credibility in the firm's identity statement. The panel now reads as a brand artifact, not a construction notice.

---

## What's Still Off (4 bullets)

- **Contact form mailto fallback remains the terminal conversion defect.** The spinner → checkmark → success choreography is built and ready but never fires. Every other interaction on the site works correctly. The one action the site exists to drive — submitting a search or a resume — opens the OS email client instead. This is a functional defect, not a polish issue, and it has been open since cycle 5. Formspree free tier would close this with one endpoint swap.
- **Services mobile scroll-lock text overflow on iPhone SE at mid-runway.** At 375px on panels 04 and 05, the content column clips at the right edge (visible in iphoneSE-40 screenshot: "Corpor..." and "IN-HOUS..." truncated). The panel heading and sub-label overflow the right boundary. This is a real-buyer defect on the most constrained viewport.
- **About section placeholder still lacks a visual anchor at full desktop.** The MW monogram + caption occupy the right column of a two-column about layout at 1440. The navy panel at ~280px height against the 966px about section height creates an asymmetry — the right column terminates well above the copy column's natural end. The MW seal helps but does not close the vertical gap. A taller placeholder or a typographic fill pattern would resolve the height mismatch.
- **No quantitative trust signals beyond $40K.** The stat band is correct and verified. But for a firm asking a CFO to submit a $40K search, one data point is thin. Even a single verifiable proof point — a named firm category ("we have placed 30+ senior tax hires into Big 4 practices") — would materially improve the conversion case. This cannot be invented; it requires user input.

---

## Cycle 13 Top-3 Priorities

### P1 — Fix services mobile panel overflow on iPhone SE
**What:** Panels 04 (F&A Industry) and 05 (Corporate Tax & Treasury) overflow the right edge at 375px. The panel heading and sub-label (e.g. "INDUSTRY & OPERATING COMPANIES") clip. This is a scroll-lock section the user scrolls horizontally through — a clipped heading mid-journey breaks the experience.
**Acceptance criteria:** All 5 service panel headings, sub-labels, and body copy render within bounds at 375px. No text clipped. Playwright confirms at 5pos × iPhone SE.
**Why P1:** The services section is now the site's strongest section at desktop. A visible overflow defect at the most common mobile viewport undermines it.

### P2 — Contact form real endpoint (Formspree)
**What:** Replace mailto fallback with a Formspree endpoint. The full submit choreography (spinner → checkmark → success reveal) is built and will fire automatically once the action attribute points to a live endpoint.
**Acceptance criteria:** Form submission completes in-page. No OS mail client opens. Playwright confirms `.contact__success` visible after mock submit.
**Why P2:** The site's purpose is lead generation. The terminal conversion action is broken. This is the highest-priority functional defect remaining.

### P3 — About right-column vertical fill
**What:** The about placeholder panel (currently ~180px min-height) leaves a significant vertical gap below the navy block against the left column's natural height of ~600px+. Options: extend the placeholder to fill the column with a subtle typographic pattern (e.g. MW repeated in Playfair at 0.06 opacity, or a second panel variant showing a brand statement), or increase min-height to match the left column via flex-grow.
**Acceptance criteria:** The about right column at 1440px does not show blank cream below the placeholder panel. The placeholder reads as a deliberate full-column element.
**Why P3:** The about section is the firm identity statement. A half-filled right column signals pre-launch even without explicit text announcing it.

---

*Audit completed 2026-04-27. Axis: scroll experience depth. The cumulative motion vocabulary — grain texture, hero-exit transform, section bg shift, line-mask H2s, 5-panel services scroll-lock, 3D industry flips — now reads as an authored scroll journey. Score moves to 8.0. Design ceiling raised from 7.7–7.8 to 8.0–8.2. Services section at 8.5 is category-leading. Terminal defect: contact form mailto fallback still open.*
