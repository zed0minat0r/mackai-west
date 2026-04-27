# MacKai West — agent rules

This file is auto-loaded as context. Read before touching anything.

## Brand

- **Name:** MacKai West (cleaner than "MacKai West Recruits" for headlines; longer form OK in descriptors)
- **Sector:** Specialist headhunting in Tax and Finance & Accounting
- **Niche:** Tax recruitment within public accounting (the firm's profitable core)
- **Industries served (primary three):** Construction, Real Estate, Manufacturing
- **Aesthetic:** Corporate-trustworthy, executive-search caliber — Russell Reynolds / Korn Ferry / Heidrick & Struggles modernized
- **Palette:** Navy (#0F1B2D) + warm Gold (#C9A961) + Cream (#F5F0E6)
- **Type:** Playfair Display (display, italic accent in gold) + Inter (body)

## Content honesty — non-negotiable

The user has provided exactly one verifiable fact: **average placement fee ~ $40K**. That number is usable. Everything else must be brand voice or generic-but-honest copy.

**Do NOT invent:**
- Team member names, bios, credentials, photos
- Specific placements ("we placed John Doe at Big Co")
- Testimonials or quote attributions
- Phone numbers, street addresses, suite numbers
- Years-in-business numbers ("X+ years experience")
- Placement count totals ("500+ placements")
- City headquarters specifics
- Social URLs or LinkedIn handles

If something cannot be sourced from the user, write it in brand voice without specifics, or leave a clear "coming soon" placeholder. Honest absence beats fabricated certainty.

## Verification — non-negotiable

Never claim "fixed" without scrolling through the actual feature in Playwright at multiple positions on **desktop 1440 + iPhone 13 + iPhone SE**. Static screenshots and computed-style snapshots at one position are not verification.

For scroll-driven UI specifically, sample at ≥5 positions through the section (5%, 25%, 50%, 75%, 95%), capture transform / scrollX / element bounds, and visually inspect screenshots.

## Disabling a feature is not a fix

If a feature breaks on a viewport, fix the underlying CSS/JS mismatch. Never bail JS via `matchMedia` guard, never collapse to vertical stack on mobile, never hide the feature behind a media query. "Removing it on mobile" is a regression dressed as a fix.

## After every CSS edit

Regenerate the minified CSS:

```sh
npx clean-css-cli -o style.min.css style.css
```

The page references `style.min.css` in production. Editing `style.css` without regenerating means the live site serves stale styles.

## Lead generation — the point of the site

- Two parallel CTAs throughout: **"Submit a search"** (employer) and **"Submit a resume"** (candidate)
- Hero shows both. Nav shows the primary employer CTA only on desktop. Candidates and Employers sections each have a dedicated CTA.
- Contact form accepts both audiences via the `type` dropdown
- All form submissions currently mailto-fallback to `hello@mackaiwest.com` until a real endpoint is wired

## Agent loop behavior

- **NO per-agent texting.** Only the orchestrator sends iMessage. Every agent prompt must include "DO NOT call mcp__plugin_imessage_imessage__reply / DO NOT TEXT THE USER."
- Each cycle: Coordinator → Builder → Spark → Pixel → Nigel, sequential, each commits before next.
- Pixel always audits center-alignment at 375 + 414 mobile.
- Nigel scores from a real prospective employer / candidate lens. **Strict cap 7.5** until real photography + real testimonials + a published office address all land.
- Respectful tone — never call the user a bottleneck.
- Apps must NOT look AI-generated.
- Spark Frame B refines spacing/typography but **never** strips content count.
- Spark replaces when adding — never piles on.
- Nigel never recommends removing glows/animations/effects — only adds or improves.
- **NO ghost numbers** (large faded background numerals behind content) — confirmed user dislike.

## Section structure (current)

1. **Nav** — Fixed, transparent → solid navy on scroll
2. **Hero** — Navy bg + skyline silhouette + word-fade reveal + 2 CTAs + trust line
3. **Stat band** — `$40K+` avg placement fee with subtitle
4. **About** — Two-column with brand promise + body + photo group
5. **Services** — Two practice cards (Tax / F&A) with bullet lists
6. **Industries** — 3-card grid (Construction / Real Estate / Manufacturing)
7. **Process** — 4-step horizontal grid (Discovery → Search → Placement → Aftercare)
8. **Candidates** — Header + 3 reasons + Submit Resume CTA
9. **Employers** — Header + 3 reasons + Open a Search CTA
10. **Contact** — Two-column with details + form (mailto fallback)
11. **Footer** — Wordmark + nav + email
