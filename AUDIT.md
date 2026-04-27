# MacKai West — Audit Report

## Cycle 1 Score: 5.8 / 10

**Summary:** The cycle 1 work moved the needle on distinctiveness but not far enough — the site still reads as a polished template rather than a firm with a face. Cycle 0's "basic and generic" complaint has been addressed at the trim level (copper vignette, marquee tape, Playfair numerals, gold rule hover) but the underlying bones — generic stock photography, zero social proof, no location, anonymous copy with no personality — leave a real prospective client uncertain whether they are dealing with a real firm or a well-designed placeholder.

---

## What Landed This Cycle

- **b263b53 Builder:** iOS notch logo fix — viewport-fit=cover + safe-area padding on .nav and .hero. Logo confirmed unclipped at 375px. Scroll-drawn copper SVG line through process section renders correctly at viewport entry.
- **6860370 Spark:** Stat band copper vignette and small-caps label add texture to an otherwise flat panel. Playfair ordinal numerals (01/02/03) in industries replace SVG icons and feel more considered. Gold-rule scale-in hover on industry cards is the best micro-interaction on the site. Marquee tape divider (navy, Playfair italic, gold dots) between stat and about is an editorial touch that works.
- **1939b62 Pixel:** 13px font floor across 20 elements is done. Footer email tap target at 45px passes. No horizontal overflow at 375px.

---

## Did Cycle 1 Move the "Basic and Generic" Axis?

**Partially. A genuine half-step forward, not a full step.**

The marquee tape and gold rule hover are the two moments where the site feels deliberately designed rather than assembled from defaults. The stat band copper vignette adds depth. The Playfair ordinal numerals are a better pattern than SVG icons.

But the three sections a real decision-maker spends the most time in — About, Candidates/Employers, and Process — are still generic at the layout level. About has stock photography of generic open-plan offices and a team huddle; neither image signals tax or finance or high-trust search. The Candidates and Employers sections are left-column copy with a CTA and nothing else — no visual anchor, no differentiating element, just text on white (Candidates) and cream (Employers). The process section scroll-drawn line is a clever technical move, but at the viewport position where the line appears the user sees a horizontal copper hairline above four text boxes on navy — which is the same four-column card layout used by every recruitment site built in the last five years.

The site is no longer embarrassing. It is not yet distinctive.

---

## What Works (Confidence-Builders)

- **Copy is consistently strong.** "Narrow is what makes the placement stick." "We work the searches other recruiters can't cleanly close." "A long career is built on the right next move." This is above-average for a no-content-invented brief and builds legitimate brand voice.
- **Nav is clean and functional.** MW monogram, wordmark, full link set, "Submit a search" CTA — all clear at 1440. iOS notch fix confirmed working at 375px: logo visible, not clipped.
- **Marquee tape divider** is the single most distinctive moment on the page — Playfair italic, gold, slow scroll, editorial pattern. It signals the luxury-adjacent positioning correctly.
- **Industries section** with ordinal numerals and gold-rule hover scale-in is the strongest designed section below the fold. Domain-specific copy (percentage-of-completion, fund accounting, partnership-tax fluency) demonstrates genuine knowledge.
- **Contact form** is well-structured: two-audience dropdown, confidentiality note, mailto fallback. Easy to find from multiple CTAs. No friction to filling it out.

---

## What's Still Off (Actual Problems)

- **Stock photography is hurting trust, not helping it.** The About section carries two Unsplash images — a wide industrial-loft office (could be a co-working space or architecture firm) and a team huddle of people who appear to be in a startup. Neither image signals tax recruitment, public accounting, or executive search. A prospective client doing due diligence on a $40K placement decision sees generic photography and reads it as a firm without a real office or a real team. This is the single biggest trust deficit on the site.
- **Candidates and Employers sections are layout deserts.** Both sections are left-aligned copy column + bullet list + button on a flat background. No visual tension, no scroll interest, nothing that marks them as premium. A real candidate at Senior Manager level comparing two search firms would see this section and feel no confidence differential. These sections are the longest on the page by scroll distance and the least designed.
- **Zero social proof.** No testimonials, no placement count, no named firms served, no faces. This is constrained by the honest-content rule and must remain so until real assets land — but it means the entire trust burden falls on copy alone. The copy is good but it cannot carry the full weight against a competitor who has a single real quote.
- **Process section copper line is almost invisible in practice.** The scroll-drawn SVG line is a thin 1.5px stroke at `stroke-opacity: 1` on `var(--gold)` — but photographed at actual viewport it reads as a barely-there ornament. The idea is right; the visual weight is too light to read as a designed element versus a default border. The four-column grid below it is the same layout pattern as every other recruitment process section on the internet.
- **Mobile about section photo overlap.** At 375px the two stacked Unsplash images appear as a large industrial photo (full width) with a second image partially overlapping into it at the bottom-right — this is functional but visually uncomfortable without the two-column context to anchor the composition. On mobile the overlapping inset photo looks like a clipping error rather than a designed layout choice.

---

## Cycle 2 Top-3 Priorities (Ranked)

### Priority 1 — Replace stock photography with purpose-fit visuals

**Why it's first:** Photography is the fastest trust signal a real client reads. The current Unsplash images actively undermine the brand.

**Acceptance criteria:**
- About section primary image replaced with a visual that reads as professional advisory / finance services (desk with documents, handshake, boardroom, or — if the user can supply real brand photography — anything authentic)
- Inset image either removed or replaced with a graphic element (a Playfair initial, a copper-tinted abstract texture, or a typography lockup) that reads intentionally rather than as a stock photo
- On mobile, the overlapping inset layout is either resolved to a clean single-image layout or the inset is replaced with a non-photo element that looks deliberate at 375px
- No fabricated team photos or fake locations introduced

### Priority 2 — Give Candidates and Employers sections a visual backbone

**Why it's second:** These sections represent the two conversion moments for the site's two audiences and they are currently the weakest-designed sections in the entire page.

**Acceptance criteria:**
- Each section gets a visual anchor on the right or as a background treatment — a large Playfair display pull-quote, a copper rule element, a tinted wash panel, or a typographic texture — something that breaks the flat left-column-only layout
- The two sections must feel visually distinct from each other (one is the hiring leader, one is the senior professional — they should read differently)
- No new sections added; this is a layout and visual upgrade within the existing structure
- Must be verifiable at 1440 and 375

### Priority 3 — Increase process section visual weight and scroll drama

**Why it's third:** The scroll-drawn line is the right idea but delivers too little at the current 1.5px weight and fast transition. The four-column step layout is generic.

**Acceptance criteria:**
- Copper line stroke-width increased to at minimum 2px; `stroke-opacity` on `.process__line-base` increased from 0.18 to at minimum 0.30 so the ghost line is visible before scroll draws through it
- Each process step gets a brief additional visual treatment at the top: the step number should be set at 3-4rem Playfair italic rather than 0.78rem tracking — make the number the visual anchor, not just an eyebrow label
- Scroll draw speed tuned so the line is still being drawn when the user reaches the step grid (current transition is 0.08s linear, which draws near-instantly; change to a physics-based easing that tracks actual scroll position more slowly)
- Verified at both desktop 1440 and mobile by scrolling through the section at 5 positions

---

## Audit Notes

- Cap of 7.5 holds: no real photography, no testimonials, no published city address, no verified social accounts.
- Scored from a prospective client perspective: a CFO or Tax Practice Leader deciding whether to open a $40K retained search.
- iOS notch fix confirmed working at 375px.
- No horizontal overflow at 375px.
- Contact form functions correctly (mailto fallback).
- All copy is honest — no fabricated facts introduced in cycle 1.
