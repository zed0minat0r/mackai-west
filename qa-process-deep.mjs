/**
 * Deep audit — Process section style conflict investigation
 * Focuses on opacity=0 even with is-revealed class, transition timing,
 * and the reveal observer behavior.
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';

const BASE_URL = 'https://zed0minat0r.github.io/mackai-west/?cb=' + Date.now();
const SS_DIR   = '/Users/modica/projects/mackai-west/screenshots/qa-process/';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // === Desktop audit ===
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktop = await desktopCtx.newPage();
  const desktopErrors = [];
  desktop.on('console', msg => { if (msg.type() === 'error') desktopErrors.push(msg.text()); });
  desktop.on('pageerror', err => desktopErrors.push('PAGE ERROR: ' + err.message));

  await desktop.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await desktop.waitForTimeout(2000); // extra settle

  // Check section geometry and observer status
  const desktopGeom = await desktop.evaluate(() => {
    const section = document.querySelector('.process');
    if (!section) return { error: 'no .process section' };
    const rect = section.getBoundingClientRect();
    const steps = Array.from(document.querySelectorAll('.process-step'));

    return {
      sectionTop: rect.top + window.scrollY,
      sectionH: section.offsetHeight,
      vh: window.innerHeight,
      scrollY: window.scrollY,
      steps: steps.map((el, i) => {
        const cs = window.getComputedStyle(el);
        return {
          i,
          isRevealed: el.classList.contains('is-revealed'),
          isActive: el.classList.contains('is-active'),
          opacity: cs.opacity,
          transform: cs.transform,
          transitionProp: cs.transitionProperty,
          transitionDur: cs.transitionDuration,
          willChange: cs.willChange,
        };
      }),
    };
  });

  console.log('=== DESKTOP INITIAL STATE (scroll=0, 2s settle) ===');
  console.log('Section top:', desktopGeom.sectionTop, 'height:', desktopGeom.sectionH, 'vh:', desktopGeom.vh);
  desktopGeom.steps.forEach(s => {
    console.log(`  Step ${s.i+1}: isRevealed=${s.isRevealed}, isActive=${s.isActive}, opacity=${s.opacity}, transform=${s.transform}`);
    console.log(`         transition: ${s.transitionProp} / ${s.transitionDur}`);
  });

  // Now scroll to just above the section, wait, check state
  const sectY = desktopGeom.sectionTop;
  await desktop.evaluate((y) => window.scrollTo(0, Math.max(0, y - 800)), sectY);
  await desktop.waitForTimeout(500);

  const preEntry = await desktop.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
    }));
  });
  console.log('\n=== PRE-ENTRY (800px above section) ===');
  preEntry.forEach(s => console.log(`  Step ${s.i+1}: isRevealed=${s.isRevealed}, opacity=${s.opacity}`));

  // Scroll to section top
  await desktop.evaluate((y) => window.scrollTo(0, y), sectY);
  await desktop.waitForTimeout(600);
  await desktop.screenshot({ path: SS_DIR + 'desktop-section-entry.png' });

  const atEntry = await desktop.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      isActive: el.classList.contains('is-active'),
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform,
    }));
  });
  console.log('\n=== AT SECTION TOP ENTRY (600ms after scroll) ===');
  atEntry.forEach(s => console.log(`  Step ${s.i+1}: isRevealed=${s.isRevealed}, isActive=${s.isActive}, opacity=${s.opacity}, transform=${s.transform}`));

  // Wait longer — maybe it needs more time?
  await desktop.waitForTimeout(1500);
  const afterWait = await desktop.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
    }));
  });
  console.log('\n=== AFTER 2.1s TOTAL (should be revealed) ===');
  afterWait.forEach(s => console.log(`  Step ${s.i+1}: isRevealed=${s.isRevealed}, opacity=${s.opacity}`));

  // Check what CSS rules are applying opacity: look at all classes + keyframes
  const cssDebug = await desktop.evaluate(() => {
    const step = document.querySelectorAll('.process-step')[0];
    if (!step) return {};
    const cs = window.getComputedStyle(step);
    // Check if there's any animation
    return {
      animation: cs.animation,
      animationName: cs.animationName,
      animationPlayState: cs.animationPlayState,
      opacity: cs.opacity,
      classes: step.className,
      // Check parent opacity
      parentOpacity: step.parentElement ? window.getComputedStyle(step.parentElement).opacity : null,
      grandparentOpacity: step.parentElement && step.parentElement.parentElement
        ? window.getComputedStyle(step.parentElement.parentElement).opacity
        : null,
      // line-mask interference?
      sectionTitleEl: document.querySelector('.process .section-title') ?
        window.getComputedStyle(document.querySelector('.process .section-title')).opacity : null,
      // Check section-title is-revealed state
      sectionTitleRevealed: document.querySelector('.process .section-title') ?
        document.querySelector('.process .section-title').classList.contains('is-revealed') : null,
    };
  });
  console.log('\n=== CSS DEBUG step-01 ===');
  console.log(JSON.stringify(cssDebug, null, 2));

  // Check if rootMargin -15% is causing late fire on desktop
  const sectionObsCheck = await desktop.evaluate(() => {
    const section = document.querySelector('.process');
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // With rootMargin '0px 0px -15% 0px', trigger = bottom edge 85% of vh
    const triggerLine = vh * 0.85;
    return {
      sectionTopInViewport: rect.top,
      sectionBottomInViewport: rect.bottom,
      triggerLine_85pct: triggerLine,
      wouldFire: rect.top < triggerLine,
      vh,
    };
  });
  console.log('\n=== OBSERVER GEOMETRY CHECK (rootMargin -15%) ===');
  console.log(JSON.stringify(sectionObsCheck, null, 2));

  // Scroll past the trigger line manually
  const sectionBottom = desktopGeom.sectionTop + desktopGeom.sectionH;
  await desktop.evaluate((y) => window.scrollTo(0, y), desktopGeom.sectionTop + 100);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: SS_DIR + 'desktop-past-trigger.png' });

  const postTrigger = await desktop.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform,
    }));
  });
  console.log('\n=== AFTER SCROLLING +100px INTO SECTION (800ms) ===');
  postTrigger.forEach(s => console.log(`  Step ${s.i+1}: isRevealed=${s.isRevealed}, opacity=${s.opacity}, transform=${s.transform}`));

  // Scroll to mid-section
  await desktop.evaluate((y) => window.scrollTo(0, y), desktopGeom.sectionTop + desktopGeom.sectionH * 0.5);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: SS_DIR + 'desktop-mid-section.png' });

  // Check the line-mask heading reveal — could it be interfering?
  const lineMaskDebug = await desktop.evaluate(() => {
    const lines = Array.from(document.querySelectorAll('.process .reveal-line__inner'));
    return {
      lineCount: lines.length,
      states: lines.map(l => ({
        opacity: window.getComputedStyle(l).opacity,
        transform: window.getComputedStyle(l).transform,
        parentIsRevealed: l.closest('.section-title') ? l.closest('.section-title').classList.contains('is-revealed') : null,
      })),
    };
  });
  console.log('\n=== LINE-MASK HEADING STATE ===');
  console.log(JSON.stringify(lineMaskDebug, null, 2));

  // Check active state at mid section
  const midState = await desktop.evaluate(() => {
    const readingY = window.innerHeight * 0.4;
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        i,
        isRevealed: el.classList.contains('is-revealed'),
        isActive: el.classList.contains('is-active'),
        opacity: window.getComputedStyle(el).opacity,
        rectTop: Math.round(rect.top),
        crossesReading: rect.top <= readingY,
        readingY: Math.round(readingY),
      };
    });
  });
  console.log('\n=== MID-SECTION STATE ===');
  midState.forEach(s => {
    console.log(`  Step ${s.i+1}: revealed=${s.isRevealed}, active=${s.isActive}, opacity=${s.opacity}, top=${s.rectTop}, crossesReading=${s.crossesReading}`);
  });

  // === iPhone 13 audit ===
  const i13Ctx = await browser.newContext(devices['iPhone 13']);
  const i13 = await i13Ctx.newPage();
  await i13.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await i13.waitForTimeout(2000);

  const i13Geom = await i13.evaluate(() => {
    const section = document.querySelector('.process');
    const rect = section.getBoundingClientRect();
    return {
      sectionTop: rect.top + window.scrollY,
      sectionH: section.offsetHeight,
      vh: window.innerHeight,
    };
  });
  console.log('\n=== iPHONE 13 SECTION GEOMETRY ===');
  console.log('Top:', i13Geom.sectionTop, 'H:', i13Geom.sectionH, 'vh:', i13Geom.vh);

  // Scroll to section
  await i13.evaluate((y) => window.scrollTo(0, y), i13Geom.sectionTop);
  await i13.waitForTimeout(600);
  await i13.screenshot({ path: SS_DIR + 'iphone13-section-entry.png' });

  const i13Entry = await i13.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform,
      width: el.offsetWidth,
      scrollWidth: el.scrollWidth,
    }));
  });
  console.log('\n=== iPHONE 13 AT SECTION ENTRY ===');
  i13Entry.forEach(s => console.log(`  Step ${s.i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}, transform=${s.transform}, w=${s.width}, scrollW=${s.scrollWidth}`));

  await i13.waitForTimeout(1500);
  await i13.screenshot({ path: SS_DIR + 'iphone13-after-wait.png' });
  const i13AfterWait = await i13.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform,
    }));
  });
  console.log('\n=== iPHONE 13 AFTER 2.1s ===');
  i13AfterWait.forEach(s => console.log(`  Step ${s.i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}`));

  // Scroll through mid + late
  await i13.evaluate((y) => window.scrollTo(0, y), i13Geom.sectionTop + i13Geom.sectionH * 0.5);
  await i13.waitForTimeout(800);
  await i13.screenshot({ path: SS_DIR + 'iphone13-mid.png' });

  await i13.evaluate((y) => window.scrollTo(0, y), i13Geom.sectionTop + i13Geom.sectionH * 0.85);
  await i13.waitForTimeout(800);
  await i13.screenshot({ path: SS_DIR + 'iphone13-late.png' });

  // Check mobile layout: single-col vs two-col, head vs content alignment
  const i13Layout = await i13.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => {
      const head = el.querySelector('.process-step__head');
      const content = el.querySelector('.process-step__content');
      const num = el.querySelector('.process-step__num');
      const headRect = head ? head.getBoundingClientRect() : null;
      const contentRect = content ? content.getBoundingClientRect() : null;
      const numRect = num ? num.getBoundingClientRect() : null;
      const cs = window.getComputedStyle(el);
      return {
        i,
        gridTemplCols: cs.gridTemplateColumns,
        headLeft:   headRect ? Math.round(headRect.left) : null,
        headWidth:  headRect ? Math.round(headRect.width) : null,
        contentLeft: contentRect ? Math.round(contentRect.left) : null,
        numFontSize: num ? window.getComputedStyle(num).fontSize : null,
        numLeft: numRect ? Math.round(numRect.left) : null,
        overflowX: el.scrollWidth - el.clientWidth,
        isRevealed: el.classList.contains('is-revealed'),
        isActive: el.classList.contains('is-active'),
        opacity: window.getComputedStyle(el).opacity,
      };
    });
  });
  console.log('\n=== iPHONE 13 LAYOUT DETAILS ===');
  i13Layout.forEach(s => {
    console.log(`  Step ${s.i+1}: grid="${s.gridTemplCols}", headW=${s.headWidth}, contentLeft=${s.contentLeft}, numSz=${s.numFontSize}, overflowX=${s.overflowX}`);
    console.log(`         revealed=${s.isRevealed}, active=${s.isActive}, opacity=${s.opacity}`);
  });

  // === iPhone SE audit ===
  const seCtx = await browser.newContext(devices['iPhone SE (3rd gen)']);
  const se = await seCtx.newPage();
  await se.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await se.waitForTimeout(2000);

  const seGeom = await se.evaluate(() => {
    const section = document.querySelector('.process');
    const rect = section.getBoundingClientRect();
    return {
      sectionTop: rect.top + window.scrollY,
      sectionH: section.offsetHeight,
      vh: window.innerHeight,
    };
  });

  await se.evaluate((y) => window.scrollTo(0, y), seGeom.sectionTop);
  await se.waitForTimeout(600);
  await se.screenshot({ path: SS_DIR + 'iphoneSE-section-entry.png' });

  const seEntry = await se.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => {
      const head = el.querySelector('.process-step__head');
      const cs = window.getComputedStyle(el);
      const headCs = head ? window.getComputedStyle(head) : null;
      return {
        i,
        isRevealed: el.classList.contains('is-revealed'),
        opacity: cs.opacity,
        transform: cs.transform,
        width: el.offsetWidth,
        scrollWidth: el.scrollWidth,
        overflowX: el.scrollWidth - el.clientWidth,
        gridCols: cs.gridTemplateColumns,
        headWidth: head ? head.offsetWidth : null,
        headMinWidth: headCs ? headCs.minWidth : null,
        headBorderRight: headCs ? headCs.borderRightStyle : null,
      };
    });
  });
  console.log('\n=== iPHONE SE AT SECTION ENTRY ===');
  seEntry.forEach(s => {
    console.log(`  Step ${s.i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}, width=${s.width}, scrollW=${s.scrollWidth}, overflowX=${s.overflowX}`);
    console.log(`         grid="${s.gridCols}", headW=${s.headWidth} (min=${s.headMinWidth})`);
  });

  await se.waitForTimeout(1500);
  const seAfterWait = await se.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => ({
      i,
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
    }));
  });
  console.log('\n=== iPHONE SE AFTER 2.1s ===');
  seAfterWait.forEach(s => console.log(`  Step ${s.i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}`));

  await se.evaluate((y) => window.scrollTo(0, y), seGeom.sectionTop + seGeom.sectionH * 0.5);
  await se.waitForTimeout(800);
  await se.screenshot({ path: SS_DIR + 'iphoneSE-mid.png' });

  await se.evaluate((y) => window.scrollTo(0, y), seGeom.sectionTop + seGeom.sectionH * 0.85);
  await se.waitForTimeout(800);
  await se.screenshot({ path: SS_DIR + 'iphoneSE-late.png' });

  // Check tap targets on mobile (section CTAs if any)
  const tapTargets = await se.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.process *[role=button], .process button, .process a'));
    return btns.map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, text: el.textContent.trim().slice(0,30), h: Math.round(r.height), w: Math.round(r.width) };
    });
  });
  if (tapTargets.length) {
    console.log('\n=== TAP TARGETS IN PROCESS SECTION ===');
    tapTargets.forEach(t => console.log(`  ${t.tag} "${t.text}": ${t.w}x${t.h}px`));
  }

  await browser.close();
  console.log('\nDone. Screenshots:', SS_DIR);
})();
