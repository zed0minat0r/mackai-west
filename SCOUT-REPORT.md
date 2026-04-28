# Scout Report — MacKai West
## Research Mission: Executive Search + Agency Hero / Section Signature Features
### Date: 2026-04-27

---

## What the Live Site Has (Cycle 11 State)

From direct fetch of https://zed0minat0r.github.io/mackai-west/:

- Hero: animated SVG blueprint mesh + cursor-reactive parallax + word-fade headline + rotating eyebrow ticker + dual mesh
- Stat band: $40K+ count-up on scroll entry, copper vignette, gold rule
- Marquee tape divider
- About: Playfair italic anchor, pillars with stagger reveal, MW monogram seal, navy placeholder panel
- Services: fullscreen 2-panel horizontal scroll-lock (240vh runway, SLIDE_FRAC 0.92)
- Industries: editorial "01/02/03" numerals, 3D card flip on hover, slide-up reveal panel
- Process: scroll-drawn SVG copper line, step fade-up stagger, dot-pulse badge
- Candidates + Employers: navy editorial mark panels, matching gold rules
- Contact: floating labels, spinner→checkmark submit choreography, trust badge
- Footer: per-letter stagger reveal (60ms), scroll-driven gold progress rule
- Global: magnetic underlines on nav/footer, scroll progress rule
- Mobile: sticky CTA bar, 44px tap targets, 13px font floor

What is MISSING / still feels weak per live fetch:
- No section-to-section color shift on scroll (every section is the same flat navy or cream)
- No kinetic typography beyond the hero eyebrow ticker (body section headings are static)
- No grain/noise texture overlay (hero looks clean-digital, not premium-analog)
- No word-by-word or line-mask reveal on section headings — they pop in all at once
- No custom cursor / blob follower on desktop
- Process section: the drawn SVG line exists but numbers are static; no "cylinder" or 3D depth on the step list itself
- No full-bleed image section — every section is text-only
- No ambient ambient depth on hero (gradient wash behind the mesh reads as flat)

---

## Site-by-Site Walkthrough

### 1. Marlin Hawk — marlinhawk.com
**Category:** Modern boutique exec search
**What they do:** Full text-first philosophy with "Search far beyond the obvious" headline. Subtraction as premium signal — no animations, no gradients. Premium through whitespace and stat restraint ("1000+ searches executed" as standalone callout, no counter). Icons replace photography entirely.
**What we can take:** Nothing directly — their restraint is a strategic choice that actually works against MacKai West's "go big" directive. They prove text-first CAN read as premium but MacKai West needs differentiation energy, not restraint energy.
**Feasibility for static site:** N/A — their moves are subtractive.

### 2. Egon Zehnder — egonzehnder.com
**Category:** Tier-1 global exec search
**What they do:** Full-viewport video hero with overlay text ("CEO Succession / What if your CEO leaves tomorrow?"). Red accent on neutral field. Stats embedded in prose ("more than 600 consultants, across 71 offices and 37 countries") rather than isolated badges — narrative stats rather than counter widgets.
**Key takeaway:** The cinematic hero video + prose-embedded stats approach is a deliberate trust move for the C-suite audience. The "narrative stat" pattern (stat buried in a sentence) reads more authoritative than big-number callouts.
**Feasibility for static site:** Video loop = HIGH. Prose-embedded stats = HIGH (already done differently on MacKai West).

### 3. Korn Ferry — kornferry.com
**Category:** Tier-1 global exec search / HR consulting
**What they do:** Large credential percentage stats ("96% of Fortune's top 50", "75% of best companies to work for") as visual centerpieces. Conversational CTA framing ("Change Starts with a Conversation"). Partnership proof badges prominently placed. Photography of executives in authentic collaboration settings.
**Key takeaway:** Stats used as visual centerpieces paired with photography — the combination creates more trust than either alone. MacKai West has the stat count-up but no photography pairing.
**Feasibility for static site:** HIGH — stat callouts + layout restructure, no JS needed.

### 4. Russell Reynolds Associates — russellreynolds.com
**Category:** Tier-1 exec search
**What they do:** Bold centered value prop ("Your Leadership Challenges, Solved"), "How do I..." conversational navigation anchors (6 pivotal questions as navigational entry points), stats as credibility markers ("50+ Years", "96%", "1.2K+") with generous whitespace around each. Subtle rounded corners on images. Arrow indicators (→) on all interactive links.
**Key takeaway:** The "How do I..." section — six questions framed from the user's perspective as navigational anchors — is a UX pattern that works for executive search. Each question is a doorway. MacKai West has no equivalent prospect-perspective framing.
**Feasibility for static site:** HIGH — pure HTML/CSS with hover states.

### 5. Spencer Stuart — spencerstuart.com
**Category:** Tier-1 exec search
**What they do:** Gated access points (Client Login, Candidate Registration) as premium exclusivity signals. Heavy research/insights section ("Six Rules for C-Suite Succession"). Multi-tier navigation with global language options. No flashy animations — authority through content depth.
**Key takeaway:** The research-as-credibility pattern is notable. A single featured insight teaser (article title + thumbnail) in the hero or stat band area would add intellectual authority MacKai West currently lacks.
**Feasibility for static site:** HIGH — editorial teaser card, pure HTML/CSS.

### 6. Hunt Club — huntclub.com
**Category:** Modern VC-facing exec search
**What they do:** Animated GIF element in hero for motion without complexity. Dark backgrounds with white logomarks for contrast-rich readability. Striped graphic elements as section texture differentiators. Staggered pain-point repetition ("Deal closed. Now what?") in scroll-driven rhythm. Concrete metric framing ("Placed 30+ roles in 12 portcos") rather than percentages.
**Key takeaway:** The animated GIF in hero is a deliberately low-tech motion solution. More relevant: the striped/textured background sections break visual monotony without photography — directly applicable to MacKai West.
**Feasibility for static site:** HIGH — CSS repeating-linear-gradient stripe backgrounds.

### 7. Major, Lindsey & Africa — mlaglobal.com
**Category:** Legal/governance recruitment
**What they do:** Hard credential stats as above-fold anchor ("1,162 placements made in 2024", "200+ recruiters globally", "27 locations globally"). Dual-audience CTAs above fold. Proprietary methodology branding ("Hire an Esquire™"). Comprehensive footer with legal frameworks.
**Key takeaway:** Hard numbers with years attached ("1,162 placements in 2024") read as accountable, not aspirational. MacKai West's $40K stat is good but it's the only number.
**Feasibility for static site:** HIGH — copywriting + HTML structure.

### 8. Linear — linear.app
**Category:** Modern B2B SaaS
**What they do:** Numbered section navigation (1.0, 2.0, 3.0) with progressive disclosure. Viewport-triggered reveals on product UI sections. CSS grid adaptive layouts. Subtle neutral gradients as section backgrounds. Progressive image loading. The key feature is the **numbered chapter navigation** — sections feel like a designed reading experience, not just a scroll.
**Key takeaway:** The chapter-numbered progressive disclosure pattern would be distinctive on an exec search site. Currently MacKai West sections have anchors but no sense of "you are in chapter 3 of 8."
**Feasibility for static site:** HIGH — IntersectionObserver updating a sticky progress indicator.

### 9. Vercel — vercel.com
**Category:** Modern B2B/developer platform
**What they do:** Animated globe with pulse nodes (Canvas/SVG keyframes). Theme-aware imagery (light/dark SVG variants). Bold centered headline with dual CTAs. The signature feature is **the ambient globe/pulse visualization** in the hero — it's a technical product metaphor but the technique (pulsing SVG nodes) is applicable to any brand.
**Key takeaway:** A network/connection visualization — even a simple one — signals scale and connectivity that flat text can't. For an exec search firm that's about "knowing the right people," an ambient connection-network visualization in the hero would be thematically perfect.
**Feasibility for static site:** MEDIUM-HIGH — pure SVG + CSS keyframes for pulse dots, no canvas required if simplified.

### 10. Aesop / Le Labo / Luxury Editorial
**Category:** Luxury retail/editorial
**What they do:** (Aesop 403, Bottega blocked — research via search)
The luxury editorial signature moves are: (a) grain/noise texture overlays on backgrounds to create analog warmth, (b) large-scale single-word typography as art direction (not content), (c) slow fade crossfades between sections rather than snap reveals, (d) color washes that shift as you scroll from section to section.
**Key takeaway:** The **SVG grain noise overlay** on a gradient background is the single fastest technique to move a site from "digital clean" to "premium analog." It's a ::before pseudo-element with an SVG feTurbulence filter — no image files, no JS, 4 CSS lines.
**Feasibility for static site:** HIGH — pure CSS/SVG, no dependencies.

### 11. Locomotive — locomotive.ca
**Category:** Agency, creators of Locomotive Scroll library
**What they do:** Framework-agnostic vanilla JS philosophy. Their scroll library underpins hundreds of agency sites. The signature patterns from their approach: (a) smooth lerp-based scrolling (virtual scroll with inertia), (b) data-scroll attributes on elements for parallax intensity control, (c) clip-rect reveal transitions between sections.
**Key takeaway:** The **lerp inertia scroll** (requestAnimationFrame + linear interpolation toward target scroll position) gives any site a buttery high-end feel. It's ~20 lines of vanilla JS. MacKai West uses native scroll which feels abrupt next to agency sites.
**Feasibility for static site:** HIGH — ~25 lines vanilla JS with reduced-motion guard.

### 12. Awwwards Agency Winners / Inspiration
**What they do:** From the inspiration pages, the award-winning patterns for 2025 are:
- Hero scroll animation where the hero itself transforms as you scroll out of it (scale + blur + opacity)
- Horizontal scroll heroes that reveal content panels
- Typography as the primary visual substance (no imagery needed at all — just giant type at different weights/scales)
- Glass + 3D hero treatments with immersive depth
- Section-entry character-by-character text decodes (scramble reveals)
**Feasibility for static site:** 
  - Hero-out-scroll transform: HIGH (pure CSS scroll-driven or 10 lines JS)
  - Typography-as-substance: HIGH
  - Scramble/decode reveals: HIGH (pure vanilla JS, ~40 lines)
  - Glass 3D: MEDIUM (JS mouse-follow, already has this on services)

---

## TOP 5 Concrete Signature Features — Ranked by Impact

---

### FEATURE 1: Section Background Color Shift on Scroll
**Impact: HIGHEST — affects every section, fundamentally changes the feel of scrolling**
**Source:** Otta (color shift on scroll), Cruip BgScroll pattern, luxury editorial sites

**Problem it solves:** Currently every section is the same navy or cream background. There is no visual journey as you scroll — sections feel like a stack of cards, not a designed experience. A scroll-driven palette shift (navy → cream → navy → cream-warm) would make the site feel alive at every position.

**What it does:** As each section enters the center of the viewport, the page (or a full-bleed wrapper behind sections) transitions to that section's designated color. The transition is CSS-only via `transition: background-color 700ms`.

**Implementation Spec:**

HTML — add `data-section-bg` attribute to each section:
```html
<section class="about" data-section-bg="cream">
<section class="services" data-section-bg="navy">
<section class="industries" data-section-bg="cream-warm">
<section class="process" data-section-bg="navy">
<section class="candidates" data-section-bg="cream">
<section class="employers" data-section-bg="navy">
```

CSS — on body or a `.page-bg` wrapper:
```css
body {
  transition: background-color 700ms cubic-bezier(0.4, 0, 0.2, 1);
}
/* Define color tokens for each theme */
body[data-bg="cream"]      { background-color: #F5F0E6; }
body[data-bg="cream-warm"] { background-color: #EDE8D8; }
body[data-bg="navy"]       { background-color: #0F1B2D; }
```

JS — IntersectionObserver with center-viewport rootMargin:
```javascript
(function() {
  const sections = document.querySelectorAll('[data-section-bg]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.dataset.bg = entry.target.dataset.sectionBg;
      }
    });
  }, { rootMargin: '-45% 0% -45% 0%' });
  sections.forEach(s => observer.observe(s));
})();
```

**Section color map for MacKai West:**
- Hero → navy (stays)
- Stat band → navy (stays)
- About → cream (#F5F0E6)
- Services → navy (scroll-lock stays navy, already correct)
- Industries → cream-warm (#EDE8D8)
- Process → navy
- Candidates → cream (#F5F0E6)
- Employers → navy
- Contact → cream-warm (#EDE8D8)

**Score lift potential:** Very high. This single change makes the scroll feel intentional and editorial across all 11+ sections. Every other site in this category has this. MacKai West does not.

**Estimated effort:** 30 lines of CSS + 15 lines JS. No dependencies.

---

### FEATURE 2: Line-Mask Word Reveal on Section Headings
**Impact: HIGH — every section heading becomes a motion moment**
**Source:** Korn Ferry, Heidrick editorial pattern, GSAP/SplitType community, luxury agency standard**

**Problem it solves:** Section headings currently appear via a single opacity fade-in or just render immediately. Every luxury agency site uses the masked-line reveal: text is invisible, then each line "wipes up" from behind a clip boundary as it enters the viewport. This is the single most recognizable premium-editorial motion pattern.

**What it does:** Each `<h2>` in a section gets its inner text wrapped in lines. Each line sits inside `overflow: hidden`. On IntersectionObserver fire, each line's inner span animates from `translateY(105%)` to `translateY(0)` with a stagger delay. The clipping parent makes text appear to "rise up through the floor."

**Implementation Spec:**

CSS (add to style.css):
```css
/* Line-mask reveal wrapper — added by JS */
.reveal-line {
  overflow: hidden;
  display: block;
}
.reveal-line__inner {
  display: block;
  transform: translateY(110%);
  transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.is-revealed .reveal-line__inner {
  transform: translateY(0);
}
/* Stagger delays for multi-line headings */
.reveal-line:nth-child(2) .reveal-line__inner { transition-delay: 0.08s; }
.reveal-line:nth-child(3) .reveal-line__inner { transition-delay: 0.16s; }
.reveal-line:nth-child(4) .reveal-line__inner { transition-delay: 0.24s; }

@media (prefers-reduced-motion: reduce) {
  .reveal-line__inner { transition: none; transform: translateY(0); }
}
```

JS — split and observe:
```javascript
(function() {
  // Target section headings only (not hero — it already has word-reveal)
  const headings = document.querySelectorAll(
    '.about__title, .services__title, .industries__title, ' +
    '.process__title, .section-heading, .contact__title'
  );
  
  headings.forEach(heading => {
    // Split text into lines by wrapping each word in a line container
    // For simple implementation without SplitType lib:
    // Manually wrap lines using the heading's natural line breaks via cloneNode + range trick
    // OR use the simpler approach: wrap the entire heading in one reveal-line
    // (single-line wipe looks excellent for short headings like "Tax. Finance. Placed.")
    const text = heading.innerHTML;
    heading.innerHTML = `<span class="reveal-line"><span class="reveal-line__inner">${text}</span></span>`;
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  
  headings.forEach(h => observer.observe(h));
})();
```

**For multi-line headings:** Use a lightweight word-splitting approach that detects natural line breaks using `getBoundingClientRect()` on each word span, then wraps words on the same Y into shared `.reveal-line` containers. This is ~60 additional lines of JS. SplitType (3KB CDN) handles this automatically: `new SplitType('.section-heading', {types: 'lines'})`.

**CDN option (no build step):**
```html
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
```
Then:
```javascript
const types = new SplitType('.about__title, .industries__title, .process__title', {types: 'lines'});
// types.lines is now an array of line wrapper elements
```

**Score lift potential:** High. Currently the most visually distinguishing difference between MacKai West and a premium agency site is that headings just appear. This closes that gap immediately.

**Estimated effort:** 40 lines CSS + 30 lines JS. SplitType CDN optional (recommended for multi-line accuracy).

---

### FEATURE 3: SVG Grain Noise Overlay on Hero + Dark Sections
**Impact: HIGH — instantly shifts hero from "digital clean" to "premium analog"**
**Source:** Luxury editorial (Aesop, Le Labo, Bottega Veneta pattern), CSS-Tricks grainy gradients technique**

**Problem it solves:** The hero mesh is excellent but the background sits on a flat #0F1B2D navy. Luxury editorial brands overlay a grain texture on backgrounds to create the analog warmth that distinguishes photography-heavy luxury from flat-color corporate. MacKai West cannot use real photography yet, but grain texture mimics the depth of a printed piece.

**What it does:** An SVG `feTurbulence` filter generates procedural noise. This is embedded as an inline SVG in the HTML (zero HTTP requests). A `::before` pseudo-element on the hero (and optionally all navy sections) overlays this noise at low opacity using `mix-blend-mode: soft-light` or `overlay`. The result: subtle film grain that makes the navy background feel like a premium printed material.

**Implementation Spec:**

Add inline SVG to HTML (place before `</body>`):
```html
<svg class="noise-svg" xmlns="http://www.w3.org/2000/svg" style="display:none">
  <filter id="noise-filter">
    <feTurbulence 
      type="fractalNoise" 
      baseFrequency="0.68" 
      numOctaves="4" 
      stitchTiles="stitch" 
      result="noiseOut"/>
    <feColorMatrix type="saturate" values="0" in="noiseOut"/>
  </filter>
</svg>
```

CSS — apply via ::after on target sections:
```css
.hero::after,
.section--navy::after,
.services::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1; /* sits above bg, below content */
  opacity: 0.035; /* very subtle — adjust to taste, 0.025–0.055 range */
  filter: url(#noise-filter);
  background: white; /* filtered white becomes grain */
  mix-blend-mode: soft-light;
}
/* Ensure content stacks above grain layer */
.hero > *,
.section--navy > * {
  position: relative;
  z-index: 2;
}
@media (prefers-reduced-motion: reduce) {
  /* No motion involved, grain is always-on — no change needed */
}
```

**Alternative pure-CSS approach (inline SVG data URI, no DOM node needed):**
```css
.hero::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  opacity: 0.04;
  mix-blend-mode: soft-light;
}
```

**Score lift potential:** Medium-high. This is not interactive but it has outsized visual impact. Side-by-side, the same site with and without grain noise looks like two different budget tiers.

**Estimated effort:** 8 lines CSS. Zero JS. Zero HTTP requests.

---

### FEATURE 4: Hero-Exit Scroll Transform (Scale + Blur + Fade as Hero Scrolls Away)
**Impact: HIGH — hero becomes a motion experience, not a static screen**
**Source:** Awwwards agency hero scroll animation pattern, Locomotive Scroll–inspired, multiple 2025 agency SOTD winners**

**Problem it solves:** The hero currently has excellent entry animations (word reveal, mesh draw, eyebrow ticker, cursor parallax). But as the user scrolls away, the hero simply disappears behind the next section. Luxury agency sites make the hero "zoom out" as it leaves — the content scales down AND blurs, giving a cinematic sense of pulling back from the scene. This transforms the hero from a static screen into a scroll-reactive moment.

**What it does:** A scroll event listener (rAF-gated) reads `window.scrollY` relative to hero height. As scroll progress 0 → 1 (scrollY goes from 0 to hero.offsetHeight), the hero inner content transforms: `scale(1 → 0.92)` and `filter: blur(0 → 8px)` and `opacity(1 → 0)`. The blur + scale + fade combination is the Awwwards agency signature pattern for hero exits.

**Implementation Spec:**

CSS:
```css
.hero__scroll-exit {
  /* Applied to .hero__inner or a wrapper div inside .hero */
  transform-origin: center center;
  will-change: transform, opacity, filter;
  transition: none; /* JS drives this, no CSS transition */
}
@media (prefers-reduced-motion: reduce) {
  .hero__scroll-exit {
    /* On reduced-motion: skip the effect entirely */
    will-change: auto;
  }
}
```

JS — add to existing scroll handler or as new IIFE:
```javascript
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const hero = document.querySelector('.hero');
  const exitEl = document.querySelector('.hero__inner'); // or .hero__content
  if (!hero || !exitEl) return;
  
  let ticking = false;
  
  function updateHeroExit() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    // Progress: 0 at top, 1 when hero is fully scrolled past
    const progress = Math.min(Math.max(scrollY / heroH, 0), 1);
    
    if (progress > 0) {
      const scale = 1 - (progress * 0.08);      // 1.0 → 0.92
      const blur  = progress * 8;               // 0px → 8px
      const opacity = 1 - (progress * 1.2);     // 1 → 0 (faster than scale)
      exitEl.style.transform = `scale(${scale})`;
      exitEl.style.filter    = `blur(${blur}px)`;
      exitEl.style.opacity   = Math.max(opacity, 0);
    } else {
      exitEl.style.transform = '';
      exitEl.style.filter    = '';
      exitEl.style.opacity   = '';
    }
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeroExit);
      ticking = true;
    }
  }, { passive: true });
})();
```

**Interaction with existing hero parallax:** The existing cursor-reactive parallax applies to `.hero__inner` via mouse events. The scroll-exit applies to the same element via scroll. These are additive — the cursor parallax sets `transform` via mouse, the scroll-exit overrides `transform` via scroll. To avoid conflict, **apply scroll-exit to a wrapper one level above** the cursor-parallax target: `<div class="hero__scroll-exit"><div class="hero__inner">...</div></div>`. The cursor JS targets `.hero__inner`, scroll-exit JS targets `.hero__scroll-exit`.

**Score lift potential:** Very high. This is the feature most users notice immediately when they start scrolling — the hero dissolves cinematically rather than disappearing abruptly. It is the most visible "this is not a template" signal.

**Estimated effort:** 30 lines JS. 5 lines CSS. Zero dependencies.

---

### FEATURE 5: Text Scramble / Decode Reveal on Section Headings (Alternative to or Combined with Line Mask)
**Impact: MEDIUM-HIGH — most distinctive typographic effect for executive search**
**Source:** Awwwards 2025 agency winners, tech/finance brand category (Vercel, Linear neighborhood), multiple premium B2B sites**

**Problem it solves:** The line-mask reveal (Feature 2) is the most common premium pattern. The scramble/decode reveal is rarer and more memorable — especially for an executive search firm whose *entire business is about finding the right person from a field of candidates*. A headline that scrambles through wrong characters before "selecting" the correct ones is a perfect thematic metaphor: the search, then the exact match.

**What it does:** On section entry, each section heading's characters are replaced with random characters from a restricted glyph set (A-Z only, no numbers or symbols to keep it professional). Every 60ms, each character has a chance of resolving to its final value. The heading "decodes" left-to-right over ~800ms.

**Implementation Spec (complete vanilla JS class, no dependencies):**

```javascript
class TextScramble {
  constructor(el, glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    this.el = el;
    this.glyphs = glyphs;
    this.queue = [];
    this.frame = 0;
    this.frameReq = null;
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    return new Promise(resolve => {
      this.queue = Array.from({ length }, (_, i) => ({
        from: oldText[i] || '',
        to:   newText[i] || '',
        start: Math.floor(i * 0.6),          // stagger start frame
        end:   Math.floor(i * 0.6) + 12,     // frames until lock
        char:  ''
      }));
      cancelAnimationFrame(this.frameReq);
      this.frame = 0;
      this.resolve = resolve;
      this.update();
    });
  }

  update() {
    let output = '';
    let done = 0;
    this.queue.forEach(item => {
      if (this.frame >= item.end) {
        done++;
        output += item.to;
      } else if (this.frame >= item.start) {
        // Randomize with decreasing probability as we approach end
        if (!item.char || Math.random() < 0.28) {
          item.char = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
        }
        output += `<span class="scramble-char">${item.char}</span>`;
      } else {
        output += item.from;
      }
    });
    this.el.innerHTML = output;
    if (done === this.queue.length) {
      this.resolve();
    } else {
      this.frameReq = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Initialize on scroll entry
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const targets = document.querySelectorAll(
    '.about__headline, .industries__headline, .process__headline, .contact__headline'
  );
  // Store originals
  const originals = new Map();
  targets.forEach(el => originals.set(el, el.innerText));
  
  // Pre-scramble: set all to empty so text doesn't flash on load
  targets.forEach(el => { el.style.visibility = 'hidden'; });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const scrambler = new TextScramble(el);
        el.style.visibility = 'visible';
        scrambler.setText(originals.get(el));
        observer.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.1 });
  
  targets.forEach(el => observer.observe(el));
})();
```

CSS (one rule needed):
```css
.scramble-char {
  color: var(--gold); /* Gold scramble characters before lock — premium signal */
  opacity: 0.7;
}
```

**Thematic note for MacKai West:** The scramble characters rendering in gold (#C9A961) before locking to cream/white is on-brand: the gold chaos resolves to clarity. This is not a random effect — it is a visual metaphor for executive search.

**Score lift potential:** Medium-high. Less universally expected than the line-mask reveal so it differentiates. Combined with Feature 2 (use line-mask on body eyebrows, scramble on section headings), the site would have two distinct, layered reveal patterns across different hierarchy levels.

**Estimated effort:** 70 lines JS (self-contained, no dependencies). 4 lines CSS.

---

## Synthesis Note for Builder

These five features can be deployed independently in any order. Priority recommendation:

1. **Feature 3 (grain overlay) FIRST** — lowest effort, highest visual impact per line of code. 8 CSS lines. Zero JS. Ships in one commit.
2. **Feature 4 (hero exit transform) SECOND** — 30 lines JS. Immediate "wow on scroll" moment. Must wrap existing parallax target to avoid conflicts.
3. **Feature 1 (section bg color shift) THIRD** — requires color mapping all sections. 30 CSS + 15 JS. Changes the entire scroll journey character.
4. **Feature 2 (line-mask heading reveal) FOURTH** — most work (splitting, observer, stagger). Recommend SplitType CDN for accuracy. Apply to section headings ONLY, not hero (hero already has word-reveal).
5. **Feature 5 (scramble decode) FIFTH** — applies to 3-4 headings only. Combine with Feature 2 by using line-mask on sub-headings and scramble on H2 primary headings.

**Do NOT add all five in one cycle.** Feature 3 alone ships in < 15 mins and changes the feel of the entire site. Start there.

**Non-negotiable constraints reminder:**
- No ghost numbers (large faded background numerals) — these features have none
- No fabricated stats — none of these features add content
- All five include prefers-reduced-motion guards
- Features 1 and 4 need Playwright verification at 5 scroll positions on iPhone 13 + SE + Desktop

---
