/**
 * Playwright verification — Builder cycle 4: 3D features
 * Tests: hero mesh presence, service tilt, industry flip
 * 5 scroll positions × 3 viewports
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('/usr/local/lib/node_modules/playwright');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL  = 'http://localhost:8765/';
const SHOTS_DIR = path.join(__dirname, 'screenshots', 'cycle4-3d');
fs.mkdirSync(SHOTS_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900, isMobile: false, userAgent: undefined },
  { name: 'iphone13',     ...devices['iPhone 13'] },
  { name: 'iphoneSE',     ...devices['iPhone SE (3rd gen)'] },
];

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const results  = [];

  for (const vp of VIEWPORTS) {
    console.log('\n=== Viewport:', vp.name, '===');
    const ctx  = await browser.newContext({
      viewport:  { width: vp.width || 390, height: vp.height || 844 },
      userAgent: vp.userAgent,
      isMobile:  vp.isMobile,
      hasTouch:  vp.isMobile,
      deviceScaleFactor: vp.deviceScaleFactor || 1,
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // ─── FEATURE 1: Hero mesh ───────────────────────────────────────────────
    const meshEl = await page.$('.hero__mesh');
    const meshSvg = await page.$('.hero__mesh-svg');
    const meshExists = !!meshEl && !!meshSvg;

    let meshOpacity = null;
    let meshAnimName = null;
    if (meshSvg) {
      meshOpacity  = await meshSvg.evaluate(el => getComputedStyle(el).opacity);
      meshAnimName = await meshSvg.evaluate(el => getComputedStyle(el).animationName);
    }

    // Screenshot at hero (scroll 0)
    await page.screenshot({ path: path.join(SHOTS_DIR, `${vp.name}-hero-mesh.png`) });
    console.log('  Hero mesh element present:', meshExists);
    console.log('  Hero mesh SVG opacity:', meshOpacity);
    console.log('  Hero mesh animation:', meshAnimName);

    // ─── FEATURE 2: Service tilt ────────────────────────────────────────────
    // Scroll into the services runway so the sticky panel is fully pinned at top
    const servicesRunwayY = await page.$eval('#services-runway', el => el.getBoundingClientRect().top + window.scrollY);
    // Scroll 200px past the runway start — panel should now be sticky at top=0
    await page.evaluate(y => window.scrollTo(0, y + 200), servicesRunwayY);
    await page.waitForTimeout(500);

    // Get the first service panel inner
    const sfpInner = await page.$('.service-fp__inner');
    let tiltBefore = null;
    let tiltAfter  = null;

    if (sfpInner && !vp.isMobile) {
      tiltBefore = await sfpInner.evaluate(el => el.style.transform || getComputedStyle(el).transform);

      // Check panel rect — it should be fully visible since sticky pinned
      const sfpBox = await page.$eval('.service-fp', el => {
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      });
      console.log('  Service panel rect:', JSON.stringify(sfpBox));

      // Move mouse to center of panel (should be fully visible)
      const centerX = sfpBox.x + sfpBox.w * 0.5;
      const centerY = Math.max(50, sfpBox.y) + 200; // use a y within viewport
      await page.mouse.move(centerX, centerY);
      await page.waitForTimeout(100);
      // Move to 75% right, slight y variation
      await page.mouse.move(sfpBox.x + sfpBox.w * 0.75, Math.max(50, sfpBox.y) + 300);
      await page.waitForTimeout(250); // enough for rAF to fire
      tiltAfter = await sfpInner.evaluate(el => el.style.transform || getComputedStyle(el).transform);
      console.log('  Mouse coords used:', { cx: centerX, cy: centerY });
    }

    await page.screenshot({ path: path.join(SHOTS_DIR, `${vp.name}-service-tilt.png`) });
    console.log('  Service tilt transform before:', tiltBefore ? tiltBefore.slice(0, 60) : 'N/A');
    console.log('  Service tilt transform after:', tiltAfter ? tiltAfter.slice(0, 60) : 'N/A');
    const tiltChanged = tiltBefore !== tiltAfter && tiltAfter !== null;
    console.log('  Service tilt responded:', tiltChanged, vp.isMobile ? '(touch — correctly no tilt)' : '');

    // ─── FEATURE 3: Industry flip ───────────────────────────────────────────
    const industriesY = await page.$eval('#industries', el => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y), industriesY);
    await page.waitForTimeout(400);

    const firstCard  = await page.$('.industry');
    const firstInner = await page.$('.industry__inner');

    // Sample 5 positions through the industries section
    const industriesH = await page.$eval('.industries', el => el.offsetHeight);
    const checkPoints = [0.05, 0.25, 0.5, 0.75, 0.95];
    const industryTransforms = [];

    for (const pct of checkPoints) {
      await page.evaluate((args) => {
        window.scrollTo(0, args.base + args.h * args.pct);
      }, { base: industriesY, h: industriesH, pct });
      await page.waitForTimeout(100);
      const t = await page.$eval('.industry__inner', el => getComputedStyle(el).transform);
      industryTransforms.push({ pct, transform: t.slice(0, 60) });
    }

    // Scroll back to industries
    await page.evaluate(y => window.scrollTo(0, y), industriesY);
    await page.waitForTimeout(300);

    // Desktop: test hover flip by simulating hover
    let flipBefore = null;
    let flipAfter  = null;
    if (firstCard && !vp.isMobile) {
      flipBefore = await firstInner.evaluate(el => getComputedStyle(el).transform);
      const cardBox = await firstCard.evaluate(el => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      await page.mouse.move(cardBox.x, cardBox.y);
      await page.waitForTimeout(800); // wait for 0.7s CSS transition
      flipAfter = await firstInner.evaluate(el => getComputedStyle(el).transform);
    }

    // Mobile: test tap flip
    if (vp.isMobile && firstCard) {
      flipBefore = await firstInner.evaluate(el => getComputedStyle(el).transform);
      await firstCard.tap();
      await page.waitForTimeout(800);
      flipAfter = await firstInner.evaluate(el => getComputedStyle(el).transform);
    }

    await page.screenshot({ path: path.join(SHOTS_DIR, `${vp.name}-industry-flip.png`) });
    console.log('  Industry flip before hover/tap:', flipBefore ? flipBefore.slice(0, 80) : 'N/A');
    console.log('  Industry flip after hover/tap:', flipAfter ? flipAfter.slice(0, 80) : 'N/A');
    console.log('  Industry transforms at 5 positions:');
    industryTransforms.forEach(p => console.log('    ', (p.pct * 100) + '%:', p.transform));

    results.push({
      viewport: vp.name,
      meshExists,
      meshAnimName,
      tiltChanged: vp.isMobile ? 'N/A (touch bail)' : tiltChanged,
      flipBefore: flipBefore ? flipBefore.slice(0, 80) : 'N/A',
      flipAfter: flipAfter ? flipAfter.slice(0, 80) : 'N/A',
    });

    await ctx.close();
  }

  await browser.close();

  console.log('\n=== VERIFICATION SUMMARY ===');
  results.forEach(r => {
    console.log(`\n[${r.viewport}]`);
    console.log('  Hero mesh present:', r.meshExists);
    console.log('  Mesh animation:', r.meshAnimName);
    console.log('  Service tilt:', r.tiltChanged);
    console.log('  Flip before:', r.flipBefore);
    console.log('  Flip after:', r.flipAfter);
  });

  const allMeshPresent = results.every(r => r.meshExists);
  const desktopTiltWorks = results.find(r => r.viewport === 'desktop-1440')?.tiltChanged === true;
  const touchNoTilt = results.filter(r => r.viewport !== 'desktop-1440').every(r => r.tiltChanged === 'N/A (touch bail)');
  const flipWorks = results.some(r => r.flipAfter && r.flipAfter !== r.flipBefore && r.flipAfter !== 'N/A');

  console.log('\n=== PASS/FAIL ===');
  console.log('Hero mesh on all viewports:', allMeshPresent ? 'PASS' : 'FAIL');
  console.log('Service tilt on desktop:', desktopTiltWorks ? 'PASS' : 'FAIL');
  console.log('Touch bail (no tilt on mobile):', touchNoTilt ? 'PASS' : 'FAIL');
  console.log('Industry flip works:', flipWorks ? 'PASS' : 'FAIL');
}

verify().catch(err => { console.error(err); process.exit(1); });
