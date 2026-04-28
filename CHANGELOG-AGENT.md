# Agent Changelog — MacKai West

## Cycle 0 — Scaffold
- Created repo + GitHub Pages workflow
- Built single-page scaffold: nav, hero (navy + skyline silhouette + word reveal), stat band ($40K avg fee), about, services (Tax + F&A practices), industries (Construction / Real Estate / Manufacturing), process (4 steps), candidates, employers, contact (mailto fallback), footer
- Brand: Navy (#0F1B2D) + Gold (#C9A961) + Cream — corporate-trustworthy executive-search aesthetic
- Type: Playfair Display (display) + Inter (body)
- No fabricated content — no fake team names, no fake testimonials, no fake addresses
- `style.min.css` generated via `clean-css-cli`

2026-04-27 12:00 coordinator — scheduled: Builder, Spark, Pixel, Nigel; focus: iOS notch logo fix + 2 distinctiveness moves (scroll-drawn process line, marquee tape); forbidden: none (cycle 1)
2026-04-27 13:00 builder — iOS notch fix (viewport-fit=cover + safe-area padding on .nav + .hero) + scroll-drawn copper SVG line through Process section (per PLAN.md)
2026-04-27 14:00 spark — Frame B: stat band copper vignette + gold rule + small-caps label; industries 01/02/03 Playfair numerals + hover rule extension; marquee tape divider (Stat→About), ref luxury editorial marquee tape (Bottega Veneta / editorial press pattern), replaced flat stat bg + SVG icons + lift-and-shadow hover
2026-04-27 18:30 pixel — mobile font floor (13px) + footer email tap target (45px) fixed across contact labels, form labels, eyebrows, numerals, footer__small; no horizontal overflow; all tap targets pass
2026-04-27 19:30 nigel — focus axis: trust signals, top issue: stock photography + layout-desert Candidates/Employers sections undercut the premium positioning despite cycle 1 editorial trim landing correctly
2026-04-27 20:00 coordinator — scheduled: Builder, Spark, Pixel, Nigel; focus: P1 about anchor + P2 candidates/employers backbones + P3 process visual weight; forbidden: hero, nav, stat band, marquee tape, industries, services, contact, footer
2026-04-27 21:00 builder — about typographic anchor (MacKai/West Playfair italic + $40K stat, navy panel, zero stock photos) + process visual weight (numerals clamp 2.4-3.4rem italic, line 2.5px stroke, ghost 0.32 opacity); verified 5pos x 3 viewports; commit 627db22 (per PLAN.md)
2026-04-27 22:00 spark — Frame A: candidates oversized foreground gold-deep italic "01" numeral left col (8-11.5rem) + employers navy copper panel left with stacked "For / Employers" Playfair italic mark, ref Heidrick & Struggles editorial column layout, replaced flat single-column text desert in both sections
2026-04-27 23:00 pixel — employers panel mobile: restored flex-direction:column on mark (was row from 960px breakpoint, collapsed "For Employers" to one cramped line); bumped panel-caption to 13px floor; cache-buster cycle2-p; verified 375+414 no overflow, all tap targets pass, column stacking confirmed; commit a110ea3
2026-04-27 23:45 nigel — focus axis: scroll-reveal and section contrast, top issue: Candidates heading renders near-invisible (scroll-reveal opacity defect) at first viewport entry, undermining the section's conversion function despite the oversized "01" numeral anchor landing correctly
2026-04-28 00:30 builder — services horizontal scroll-lock (2-panel fullscreen, 240vh runway, SLIDE_FRAC=0.85, dots, mobile-live no matchMedia bail) + hero 3-layer parallax (rates 0.15/0.35/0.55, rAF-driven, reduced-motion guard); verified 5pos x 3 viewports; track -1440px at 95% desktop, -390px iPhone 13, -375px iPhone SE; no horizontal overflow anywhere (per PLAN.md)
2026-04-27 coordinator — scheduled: Builder, Spark, Pixel, Nigel; focus: P1 candidates reveal+numeral fix + F1 stat count-up + F2 industries hover-reveal + F3 magnetic underlines (user escalation: every section needs distinct eye-catching feature); forbidden: hero, nav, stat band visuals, marquee tape, about pillars, process, employers, services scroll-lock JS
2026-04-27 21:10 builder — P1 candidates reveal threshold 0.12→0.05 + rootMargin -5% (fires at section entry); copper hairline border-right on numeral col; F1 stat count-up 0→40K easeOutCubic 1.4s + stat__plus fade-in via .is-counted; F3 magnetic nav+footer underlines --mag-x ±6px, touch-device bail; style.min.css regenerated; commit 22092f9 (per PLAN.md)
2026-04-27 22:00 spark — Frame B: industries foreground slide-up navy expand panel (role archetypes, Playfair italic eyebrow, gold hairline rules); services typography hierarchy refined (numeral scale-down, sub-label gold hairline separator, tighter leading); mobile tap-to-reveal IIFE (ontouchstart detection, aria-expanded, keyboard Enter/Space/Escape); ref Korn Ferry / Heidrick editorial card reveal pattern, replaced flat industry card bottom roles line on hover
