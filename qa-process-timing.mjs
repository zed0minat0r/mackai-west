/**
 * Timing audit — measures exactly how long reveal takes
 * and captures the visual state at precise intervals
 * Also checks: active state sequencing, card alignment, mobile grid
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';

const BASE_URL = 'https://zed0minat0r.github.io/mackai-west/?cb=' + Date.now();
const SS_DIR   = '/Users/modica/projects/mackai-west/screenshots/qa-process/';

async function timeReveal(browser, contextOpts, label, sectionScrollOffset = 0) {
  const ctx  = await browser.newContext(contextOpts);
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1000);

  // Get section top
  const sectionTop = await page.evaluate(() => {
    const s = document.querySelector('.process');
    return s ? s.getBoundingClientRect().top + window.scrollY : 0;
  });

  // Scroll to just above section to ensure IO is triggered on scroll
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 500)), sectionTop);
  await page.waitForTimeout(300);

  // Now scroll into the section — measure time for reveal to fire
  const t0 = Date.now();
  await page.evaluate(([y, offset]) => window.scrollTo(0, y + offset), [sectionTop, sectionScrollOffset]);

  // Poll every 100ms for up to 5s
  let revealTime = null;
  for (let i = 0; i < 50; i++) {
    await page.waitForTimeout(100);
    const revealed = await page.evaluate(() => {
      return document.querySelectorAll('.process-step.is-revealed').length;
    });
    if (revealed === 4 && revealTime === null) {
      revealTime = Date.now() - t0;
    }
  }

  // Capture state at 100ms, 300ms, 600ms, 1000ms, 2000ms after trigger
  // By now we're 5s in, let's re-run the timing check more carefully
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 600)), sectionTop);
  await page.waitForTimeout(500);

  const timings = [];
  await page.evaluate(([y, offset]) => window.scrollTo(0, y + offset), [sectionTop, sectionScrollOffset]);
  const triggerStart = Date.now();

  for (const delay of [0, 100, 200, 400, 600, 800, 1000, 1500, 2000, 3000]) {
    const remaining = delay - (Date.now() - triggerStart);
    if (remaining > 0) await page.waitForTimeout(remaining);
    const snap = await page.evaluate(() => {
      const steps = Array.from(document.querySelectorAll('.process-step'));
      return steps.map(el => ({
        isRevealed: el.classList.contains('is-revealed'),
        opacity: window.getComputedStyle(el).opacity,
        transform: window.getComputedStyle(el).transform,
      }));
    });
    timings.push({ delay, snap });
    if (delay === 0 || delay === 400 || delay === 1000 || delay === 2000) {
      await page.screenshot({ path: SS_DIR + `${label}-timing-${delay}ms.png` });
    }
  }

  console.log(`\n=== ${label} — REVEAL TIMING ===`);
  console.log(`First reveal detected at: ${revealTime ? revealTime + 'ms' : 'NEVER in 5s'}`);
  for (const t of timings) {
    const revealed = t.snap.filter(s => s.isRevealed).length;
    const opacities = t.snap.map(s => parseFloat(s.opacity).toFixed(2)).join(', ');
    console.log(`  +${t.delay}ms: ${revealed}/4 revealed | opacities=[${opacities}]`);
  }

  // Check active state ordering at 2s (mid section)
  await page.evaluate((y) => {
    const s = document.querySelector('.process');
    const h = s ? s.offsetHeight : 0;
    window.scrollTo(0, y + h * 0.4);
  }, sectionTop);
  await page.waitForTimeout(500);

  const activeCheck = await page.evaluate(() => {
    const readingY = window.innerHeight * 0.4;
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        i,
        isActive: el.classList.contains('is-active'),
        rectTop: Math.round(rect.top),
        crossesReading: rect.top <= readingY,
        borderColor: window.getComputedStyle(el).borderColor,
        background: window.getComputedStyle(el).backgroundColor,
        numColor: window.getComputedStyle(el.querySelector('.process-step__num')).color,
        numOpacity: window.getComputedStyle(el.querySelector('.process-step__num')).opacity,
      };
    });
  });

  await page.screenshot({ path: SS_DIR + `${label}-active-state-mid.png` });
  console.log(`\n--- ${label} — ACTIVE STATE @ 40% section ---`);
  activeCheck.forEach(s => {
    console.log(`  Step ${s.i+1}: active=${s.isActive}, crosses40%=${s.crossesReading}, top=${s.rectTop}`);
    if (s.isActive !== s.crossesReading) {
      console.log(`    *** MISMATCH: step should be ${s.crossesReading ? 'active' : 'inactive'} but is ${s.isActive ? 'active' : 'inactive'} ***`);
    }
  });

  // Check mobile grid on 600px breakpoint
  const gridCheck = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map((el, i) => {
      const cs = window.getComputedStyle(el);
      const head = el.querySelector('.process-step__head');
      const content = el.querySelector('.process-step__content');
      const num = el.querySelector('.process-step__num');
      return {
        i,
        gridCols: cs.gridTemplateColumns,
        cardW: el.offsetWidth,
        headW: head ? head.offsetWidth : null,
        contentW: content ? content.offsetWidth : null,
        numSz: num ? window.getComputedStyle(num).fontSize : null,
        headBorderBottom: head ? window.getComputedStyle(head).borderBottomWidth : null,
        headBorderRight:  head ? window.getComputedStyle(head).borderRightWidth  : null,
        overflowX: el.scrollWidth - el.clientWidth,
      };
    });
  });

  console.log(`\n--- ${label} — GRID/LAYOUT ---`);
  gridCheck.forEach(s => {
    const overflowFlag = s.overflowX > 2 ? ' *** OVERFLOW ***' : '';
    console.log(`  Step ${s.i+1}: grid="${s.gridCols}" cardW=${s.cardW} headW=${s.headW} contentW=${s.contentW} numSz=${s.numSz}${overflowFlag}`);
    console.log(`         borderRight=${s.headBorderRight}, borderBottom=${s.headBorderBottom}`);
  });

  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  await timeReveal(browser, { viewport: { width: 1440, height: 900 } }, 'desktop', 0);
  await timeReveal(browser, devices['iPhone 13'], 'iphone13', 0);
  await timeReveal(browser, devices['iPhone SE (3rd gen)'], 'iphoneSE', 0);

  // Test fast scroll scenario (user complaint: "populates very slowly / buggy")
  // Simulate user scrolling quickly past the section
  const fastCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const fastPage = await fastCtx.newPage();
  await fastPage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await fastPage.waitForTimeout(1000);

  const fastSectionTop = await fastPage.evaluate(() => {
    const s = document.querySelector('.process');
    return s ? s.getBoundingClientRect().top + window.scrollY : 0;
  });

  // Fast scroll: jump directly to section without incrementally scrolling
  await fastPage.evaluate((y) => window.scrollTo(0, y), fastSectionTop);
  await fastPage.waitForTimeout(50); // Only 50ms wait — simulate fast scroll/jump

  const fastSnap = await fastPage.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map(el => ({
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
    }));
  });

  console.log('\n=== FAST SCROLL (50ms after jumping to section) ===');
  fastSnap.forEach((s, i) => console.log(`  Step ${i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}`));

  await fastPage.screenshot({ path: SS_DIR + 'desktop-fast-scroll-50ms.png' });
  await fastCtx.close();

  // Test: scroll to section from very top in one shot (anchor click simulation)
  const anchorCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const anchorPage = await anchorCtx.newPage();
  await anchorPage.goto(BASE_URL + '#process', { waitUntil: 'networkidle', timeout: 60000 });
  await anchorPage.waitForTimeout(3000);

  const anchorSnap = await anchorPage.evaluate(() => {
    return Array.from(document.querySelectorAll('.process-step')).map(el => ({
      isRevealed: el.classList.contains('is-revealed'),
      opacity: window.getComputedStyle(el).opacity,
    }));
  });
  console.log('\n=== ANCHOR LINK TO #PROCESS (3s after load) ===');
  anchorSnap.forEach((s, i) => console.log(`  Step ${i+1}: revealed=${s.isRevealed}, opacity=${s.opacity}`));

  await anchorPage.screenshot({ path: SS_DIR + 'desktop-anchor-link.png' });
  await anchorCtx.close();

  await browser.close();
  console.log('\nDone. Screenshots: ' + SS_DIR);
})();
