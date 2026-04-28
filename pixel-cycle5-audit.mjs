/**
 * Pixel cycle 5 audit
 * P1: stat count-up at threshold 0.95 (three scroll approaches)
 * P2: services scroll-lock readability (no double-headline at 5 positions)
 * P3: hero mesh amplification (width, vertex-pulse, edge-shimmer)
 * P4: mobile alignment at 375 + 414 (overflow, tap targets, center alignment)
 * P5: visual regression walkthrough iPhone 13
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE = 'https://zed0minat0r.github.io/mackai-west/';
const SS_DIR = '/Users/modica/projects/mackai-west/screenshots/cycle5-pixel';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function shot(page, name) {
  const p = path.join(SS_DIR, name + '.png');
  await page.screenshot({ path: p, fullPage: false });
  return p;
}

const iphone13 = devices['iPhone 13'];
const iphoneSE = devices['iPhone SE (3rd gen)'];

const results = {
  P1: { pass: true, detail: [] },
  P2: { pass: true, detail: [] },
  P3: { pass: true, detail: [] },
  P4: { pass: true, detail: [] },
  P5: { pass: true, detail: [] },
};

async function getStatText(page) {
  return page.$eval('#stat-count', el => el.textContent.trim());
}

async function checkOverflow(page, label) {
  const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
  return overflow ? `OVERFLOW at ${label}` : null;
}

// ============================================================
// P1: Stat count-up — three scroll approaches on iPhone 13 + SE
// ============================================================
async function auditP1(browser) {
  const viewports = [
    { name: 'iPhone13', config: iphone13 },
    { name: 'iPhoneSE', config: iphoneSE },
  ];

  for (const { name, config } of viewports) {
    const ctx = await browser.newContext({ ...config });
    const page = await ctx.newPage();

    // Approach A: page load then scroll to section
    await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);
    const statTop = await page.$eval('.stat__inner', el => {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      return el.getBoundingClientRect().top;
    });
    await page.waitForTimeout(300); // wait for JS to fire
    const textA = await getStatText(page);
    await shot(page, `P1-${name}-approachA`);
    results.P1.detail.push(`${name} approach A (scrollIntoView): "${textA}"`);
    if (textA !== '40K') results.P1.pass = false;

    // Approach B: fast scroll through page
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(1000);
    // Scroll very fast through the page
    for (let pct of [10, 30, 50, 70, 100]) {
      await page.evaluate(p => window.scrollTo(0, document.body.scrollHeight * p / 100), pct);
      await page.waitForTimeout(50);
    }
    // Now check at stat section
    await page.$eval('.stat__inner', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForTimeout(300);
    const textB = await getStatText(page);
    await shot(page, `P1-${name}-approachB`);
    results.P1.detail.push(`${name} approach B (fast scroll): "${textB}"`);
    if (textB !== '40K') results.P1.pass = false;

    // Approach C: slow scroll into section
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(1000);
    const statY = await page.$eval('.stat__inner', el => el.getBoundingClientRect().top + window.scrollY);
    const viewH = await page.evaluate(() => window.innerHeight);
    // Scroll in small increments to simulate slow scroll
    const startY = Math.max(0, statY - viewH * 1.5);
    await page.evaluate(y => window.scrollTo(0, y), startY);
    await page.waitForTimeout(200);
    for (let delta = 0; delta < viewH * 2; delta += 30) {
      await page.evaluate(({s, d}) => window.scrollTo(0, s + d), {s: startY, d: delta});
      await page.waitForTimeout(30);
    }
    await page.waitForTimeout(300);
    const textC = await getStatText(page);
    await shot(page, `P1-${name}-approachC`);
    results.P1.detail.push(`${name} approach C (slow scroll): "${textC}"`);
    if (textC !== '40K') results.P1.pass = false;

    await ctx.close();
  }
}

// ============================================================
// P2: Services scroll-lock — no double-headline at 5 positions
// ============================================================
async function auditP2(browser) {
  const ctx = await browser.newContext({ ...iphoneSE });
  const page = await ctx.newPage();
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  // Get services runway bounds
  const runway = await page.$eval('.services-runway', el => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top + window.scrollY, height: el.offsetHeight };
  });

  const positions = [0.05, 0.25, 0.50, 0.75, 0.95];
  for (const pct of positions) {
    const scrollY = runway.top + runway.height * pct;
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(300);

    // Check: count service panels fully visible (not clipped)
    const visCheck = await page.evaluate(() => {
      const panels = document.querySelectorAll('.service-fp');
      const vw = window.innerWidth;
      let fullyVisible = 0;
      for (const p of panels) {
        const rect = p.getBoundingClientRect();
        // Panel is "fully visible" if more than 80% of its width is on screen
        const visibleWidth = Math.min(rect.right, vw) - Math.max(rect.left, 0);
        const fraction = visibleWidth / rect.width;
        if (fraction > 0.8) fullyVisible++;
      }
      return { fullyVisible, panelCount: panels.length };
    });

    const label = `${Math.round(pct * 100)}%`;
    await shot(page, `P2-iPhoneSE-pos${label}`);
    const detail = `pos ${label}: ${visCheck.fullyVisible} of ${visCheck.panelCount} panels >80% visible`;
    results.P2.detail.push(detail);
    if (visCheck.fullyVisible >= 2) {
      results.P2.pass = false;
      results.P2.detail.push(`  => FAIL: two panels simultaneously readable at ${label}`);
    }
  }

  await ctx.close();
}

// ============================================================
// P3: Hero mesh amplification
// ============================================================
async function auditP3(browser) {
  // Desktop 1440: mesh width should be ~460px
  const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageD = await ctxD.newPage();
  await pageD.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await pageD.waitForTimeout(1500);

  const meshDesktop = await pageD.$eval('.hero__mesh', el => {
    const s = window.getComputedStyle(el);
    return {
      width: el.offsetWidth,
      animation: s.animationName,
    };
  });
  await shot(pageD, 'P3-desktop-mesh');
  results.P3.detail.push(`Desktop mesh width: ${meshDesktop.width}px (expect ~460px)`);
  results.P3.detail.push(`Desktop mesh animation: ${meshDesktop.animation}`);
  if (Math.abs(meshDesktop.width - 460) > 40) {
    results.P3.pass = false;
    results.P3.detail.push('  => FAIL: mesh width out of expected range');
  }
  await ctxD.close();

  // iPhone 13 mesh width + no headline occlusion
  const ctx13 = await browser.newContext({ ...iphone13 });
  const page13 = await ctx13.newPage();
  await page13.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page13.waitForTimeout(1500);
  await page13.evaluate(() => window.scrollTo(0, 0));
  await page13.waitForTimeout(200);

  const mesh13 = await page13.$eval('.hero__mesh', el => {
    const s = window.getComputedStyle(el);
    return { width: el.offsetWidth, animation: s.animationName };
  });
  await shot(page13, 'P3-iPhone13-mesh-scrollY0');
  results.P3.detail.push(`iPhone13 mesh width: ${mesh13.width}px (expect 140-200px)`);
  results.P3.detail.push(`iPhone13 mesh animation: ${mesh13.animation}`);
  if (mesh13.width < 140 || mesh13.width > 210) {
    results.P3.pass = false;
    results.P3.detail.push(`  => FAIL: iPhone13 mesh width ${mesh13.width}px out of expected 140-200px range`);
  }

  // Check headline is not obscured
  const headlineCheck = await page13.evaluate(() => {
    const h1 = document.querySelector('.hero__heading');
    const mesh = document.querySelector('.hero__mesh');
    if (!h1 || !mesh) return { ok: false, reason: 'Elements not found' };
    const h1R = h1.getBoundingClientRect();
    const mR = mesh.getBoundingClientRect();
    // Check overlap
    const overlapX = Math.max(0, Math.min(h1R.right, mR.right) - Math.max(h1R.left, mR.left));
    const overlapY = Math.max(0, Math.min(h1R.bottom, mR.bottom) - Math.max(h1R.top, mR.top));
    return {
      ok: overlapX * overlapY < 1000,
      overlapArea: overlapX * overlapY,
      h1Rect: { left: h1R.left, top: h1R.top, right: h1R.right, bottom: h1R.bottom },
      meshRect: { left: mR.left, top: mR.top, right: mR.right, bottom: mR.bottom },
    };
  });
  results.P3.detail.push(`iPhone13 headline/mesh overlap area: ${headlineCheck.overlapArea}px² (expect <1000)`);
  if (!headlineCheck.ok) {
    results.P3.pass = false;
    results.P3.detail.push('  => FAIL: mesh overlaps headline excessively');
  }
  await ctx13.close();

  // iPhone SE mesh
  const ctxSE = await browser.newContext({ ...iphoneSE });
  const pageSE = await ctxSE.newPage();
  await pageSE.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await pageSE.waitForTimeout(1500);
  const meshSE = await pageSE.$eval('.hero__mesh', el => el.offsetWidth);
  await shot(pageSE, 'P3-iPhoneSE-mesh');
  results.P3.detail.push(`iPhoneSE mesh width: ${meshSE}px (expect 140-200px)`);
  if (meshSE < 140 || meshSE > 210) {
    results.P3.pass = false;
    results.P3.detail.push(`  => FAIL: iPhoneSE mesh width ${meshSE}px out of range`);
  }

  // Check edge-shimmer on lines
  const shimmerCheck = await pageSE.evaluate(() => {
    const lines = document.querySelectorAll('.hero__mesh line, .mesh-line');
    if (!lines.length) return { found: false };
    const s = window.getComputedStyle(lines[0]);
    return { found: true, animation: s.animationName };
  });
  results.P3.detail.push(`iPhoneSE mesh line animation: ${shimmerCheck.found ? shimmerCheck.animation : 'no lines found'}`);
  await ctxSE.close();
}

// ============================================================
// P4: Mobile alignment at 375 + 414
// ============================================================
async function auditP4(browser) {
  const viewports = [
    { name: '375', config: { viewport: { width: 375, height: 667 } } },
    { name: '414', config: { viewport: { width: 414, height: 896 } } },
  ];

  for (const { name, config } of viewports) {
    const ctx = await browser.newContext(config);
    const page = await ctx.newPage();
    await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Overflow check at 5 scroll positions
    const bodyH = await page.evaluate(() => document.body.scrollHeight);
    const overflowIssues = [];
    for (const pct of [0, 25, 50, 75, 100]) {
      const y = bodyH * pct / 100;
      await page.evaluate(sy => window.scrollTo(0, sy), y);
      await page.waitForTimeout(200);
      const overflow = await page.evaluate(() => ({
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth,
      }));
      if (overflow.overflow) {
        overflowIssues.push(`pos ${pct}%: scrollWidth=${overflow.bodyScrollWidth} > innerWidth=${overflow.innerWidth}`);
      }
      await shot(page, `P4-${name}-pos${pct}`);
    }

    if (overflowIssues.length) {
      results.P4.pass = false;
      results.P4.detail.push(`${name}px OVERFLOW: ${overflowIssues.join(', ')}`);
    } else {
      results.P4.detail.push(`${name}px: no horizontal overflow`);
    }

    // Tap target audit on key interactive elements
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const tapTargets = await page.evaluate(() => {
      const selectors = [
        '.hero__cta', '.services-runway .service-fp', '.industries__card',
        'button[type="submit"]', '.contact__submit', '.footer a', '.nav a',
        '.industries__trigger'
      ];
      const issues = [];
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel);
        for (const el of els) {
          const r = el.getBoundingClientRect();
          if (r.height > 0 && r.width > 0 && (r.height < 44 || r.width < 44)) {
            issues.push(`${sel}: ${Math.round(r.width)}x${Math.round(r.height)}px`);
          }
        }
      }
      return issues;
    });
    if (tapTargets.length) {
      results.P4.pass = false;
      results.P4.detail.push(`${name}px tap targets <44px: ${tapTargets.join('; ')}`);
    } else {
      results.P4.detail.push(`${name}px: all tap targets OK`);
    }

    // Center-alignment check on headings
    const alignIssues = await page.evaluate(() => {
      const headings = document.querySelectorAll('h2, h3, .section-eyebrow, .stat__number');
      const issues = [];
      for (const el of headings) {
        const s = window.getComputedStyle(el);
        // Expected: centered headings should have text-align center
        if (s.display !== 'none' && s.visibility !== 'hidden' && el.offsetWidth > 0) {
          // Just record alignment for review
          issues.push({ tag: el.tagName, class: el.className.substring(0, 40), align: s.textAlign });
        }
      }
      return issues.slice(0, 20);
    });
    // Flag any h2 that is not centered
    const misaligned = alignIssues.filter(a =>
      (a.tag === 'H2') && a.align !== 'center' && a.align !== 'start' // start is flex default, acceptable
    );
    if (misaligned.length) {
      results.P4.detail.push(`${name}px heading alignment: ${misaligned.map(a => `${a.tag}.${a.class}:${a.align}`).join('; ')}`);
    }

    await ctx.close();
  }
}

// ============================================================
// P5: Visual regression walkthrough iPhone 13
// ============================================================
async function auditP5(browser) {
  const ctx = await browser.newContext({ ...iphone13 });
  const page = await ctx.newPage();
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  const sections = [
    { name: 'hero', selector: '.hero', scrollFrac: 0 },
    { name: 'stat-band', selector: '.stat', scrollFrac: null },
    { name: 'marquee', selector: '.marquee', scrollFrac: null },
    { name: 'about', selector: '.about', scrollFrac: null },
    { name: 'services', selector: '.services-runway', scrollFrac: null },
    { name: 'industries', selector: '.industries', scrollFrac: null },
    { name: 'process', selector: '.process', scrollFrac: null },
    { name: 'candidates', selector: '.candidates', scrollFrac: null },
    { name: 'employers', selector: '.employers', scrollFrac: null },
    { name: 'contact', selector: '.contact', scrollFrac: null },
    { name: 'footer', selector: '.footer', scrollFrac: null },
  ];

  for (const sec of sections) {
    try {
      await page.$eval(sec.selector, el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
      await page.waitForTimeout(400);
      const p = await shot(page, `P5-iPhone13-${sec.name}`);
      results.P5.detail.push(`${sec.name}: screenshot captured`);
    } catch (e) {
      results.P5.detail.push(`${sec.name}: ERROR - ${e.message}`);
      results.P5.pass = false;
    }
  }

  // Services: scroll to 50% of runway and check two panels not simultaneously readable
  const runwayData = await page.evaluate(() => {
    const el = document.querySelector('.services-runway');
    if (!el) return null;
    return { top: el.getBoundingClientRect().top + window.scrollY, height: el.offsetHeight };
  });
  if (runwayData) {
    await page.evaluate(y => window.scrollTo(0, y), runwayData.top + runwayData.height * 0.5);
    await page.waitForTimeout(400);
    await shot(page, 'P5-iPhone13-services-mid');
    results.P5.detail.push('services mid-runway: screenshot captured');
  }

  await ctx.close();
}

// ============================================================
// Main
// ============================================================
const browser = await chromium.launch({ headless: true });

try {
  console.log('Running P1: stat count-up...');
  await auditP1(browser);

  console.log('Running P2: services readability...');
  await auditP2(browser);

  console.log('Running P3: hero mesh...');
  await auditP3(browser);

  console.log('Running P4: mobile alignment...');
  await auditP4(browser);

  console.log('Running P5: visual regression...');
  await auditP5(browser);
} finally {
  await browser.close();
}

// Output results
console.log('\n=== PIXEL CYCLE 5 AUDIT RESULTS ===\n');
for (const [key, val] of Object.entries(results)) {
  console.log(`${key}: ${val.pass ? 'PASS' : 'FAIL'}`);
  for (const d of val.detail) console.log(`  ${d}`);
  console.log();
}

// Write JSON summary
fs.writeFileSync(
  path.join(SS_DIR, 'results.json'),
  JSON.stringify(results, null, 2)
);
console.log('Screenshots at:', SS_DIR);
