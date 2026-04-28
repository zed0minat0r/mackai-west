# PLAN.md — Cycle 15 Builder

## P1 — Employers nav anchor
MOOT. `<a href="#employers">Employers</a>` already exists at index.html line 36. No change.

## P2 — Process mobile row-gap
- File: style.css line 2738
- Change: add `row-gap: clamp(28px, 6vw, 48px);` to `.process__steps { grid-template-columns: 1fr; }` inside @media (max-width: 600px)

## P3 — Stat band micro-label
- File: index.html line 170 — insert `<p class="stat__label-aux">Senior roles only. Manager and above.</p>` after `.stat__label`
- File: style.css after `.stat__label` block — add `.stat__label-aux` (0.8125rem, uppercase, letter-spacing 0.18em, color rgba(245,240,230,0.55), margin-top: 8px, margin-bottom: 22px)
- Mobile: add floor override in @media (max-width: 600px)

## Guardrails
- RULE 5: regen style.min.css
- RULE 6: bump cache-buster cycle14-p → cycle15-b
- RULE 1: no iMessage

## Success criterion
- P2: step-03 mobile row gap ≤60px
- P3: micro-label visible, ≥13px, no overflow
