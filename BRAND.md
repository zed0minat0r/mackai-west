# MacKai West — brand themes

Three theme variants live as drop-in CSS variable swaps. Whichever theme is
active gets pasted over the `--gold-*` block in `style.css` :root. The
60+ rgba references throughout style.css use the explicit RGB values
listed in `--gold-rgb-*` for each theme so a global find-replace flips
the whole site.

## Theme A — MAGENTA (currently active)

Cerise/magenta primary, derived from the customer's logo.

```css
--gold:        #CC3362;  /* primary brand magenta */
--gold-soft:   #E26B8C;  /* softer / hover */
--gold-deep:   #A82850;  /* pressed / deep accent */
```

Replace all `rgba(204, 51, 98, X)` to scale opacity.

## Theme B — MAGENTA + champagne (recommended on research)

Magenta primary as Theme A, plus a warm champagne for editorial
hairlines / decorative rules / dividers. Adds editorial sophistication
back into a magenta-led palette. To activate: keep Theme A's --gold-*
values and add a champagne secondary, then swap selected rules listed
below.

```css
--gold:        #CC3362;
--gold-soft:   #E26B8C;
--gold-deep:   #A82850;
--champagne:        #D9C4B0;
--champagne-soft:   #E8DBC9;
--champagne-deep:   #B59E85;
```

Then swap these specific rules from var(--gold) → var(--champagne):
- divider-rule (footer, between-section hairlines)
- card border-color when not active
- eyebrow text-decoration / underline
- footer__progress mid-stops

## Theme C — GOLD (original)

The original executive-search palette. Restore by pasting:

```css
--gold:        #C9A961;
--gold-soft:   #DDB976;
--gold-deep:   #A88B45;
```

And global find-replace `204, 51, 98` → `201, 169, 97`.

## Switching procedure

1. Replace the `--gold-*` block in `style.css` :root with the chosen
   theme's values.
2. Global find-replace the rgb() triplet across style.css.
3. Update favicon hex in index.html line 14 (`fill='%23XXXXXX'`).
4. Bump cache-buster in index.html (`?v=cycleN-themeY`).
5. `npx clean-css-cli -o style.min.css style.css` to regen minified.
6. Verify on Playwright at desktop 1440 + iPhone 13.

The variable name `--gold-*` is intentionally NOT renamed when a non-gold
theme is active — keeps diff small and lets us swap themes via a 6-line
patch instead of touching ~80 references.
