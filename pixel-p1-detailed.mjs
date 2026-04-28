/**
 * Detailed P1 verification — samples stat text at multiple time points
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE = 'https://zed0minat0r.github.io/mackai-west/';
const SS_DIR = '/Users/modica/projects/mackai-west/screenshots/cycle5-pixel';

async function shot(page, name) {
  const p = path.join(SS_DIR, name + '.png');
  await page.screenshot({ path: p, fullPage: false });
  return p;
}

const iphone13 = devices['iPhone 13'];
const iphoneSE = devices['iPhone SE (3rd gen)'];

const browser = await chromium.launch({ headless: true });

for (const { name, config } of [
  { name: 'iPhone13', config: iphone13 },
  { name: 'iPhoneSE', config: iphoneSE },
]) {
  const ctx = await browser.newContext({ ...config });
  const page = await ctx.newPage();

  console.log(`\n=== ${name} ===`);

  // === Approach A: page load + scrollIntoView ===
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  // Get stat section position
  const statY = await page.$eval('.stat__number', el => el.getBoundingClientRect().top + window.scrollY);
  const viewH = await page.evaluate(() => window.innerHeight);
  const vh = viewH;

  // Scroll to center stat in viewport (this is what scrollIntoView block:center does)
  const targetScroll = Math.max(0, statY - vh / 2);
  await page.evaluate(y => window.scrollTo(0, y), targetScroll);

  // Sample text at 0, 50, 150, 300, 600, 1000, 1500, 2000ms
  const samples = {};
  for (const delay of [0, 50, 100, 150, 300, 600, 1000, 1500, 2000]) {
    await page.waitForTimeout(delay === 0 ? 0 : 50); // spacing between reads
    const t = await page.$eval('#stat-count', el => el.textContent.trim());
    const actualDelay = delay; // approximate
    samples[delay] = t;
  }
  console.log('Approach A (scrollTo center after load):');
  for (const [ms, v] of Object.entries(samples)) {
    console.log(`  ${ms}ms: "${v}" ${v !== '40K' && v !== '0K' ? '<-- PARTIAL' : ''}`);
  }

  // Check if stat is at 40K after animation completes
  await page.waitForTimeout(500); // ensure animation done
  const finalA = await page.$eval('#stat-count', el => el.textContent.trim());
  console.log(`  Final (after 2.5s+): "${finalA}"`);
  await shot(page, `P1detail-${name}-approachA-final`);

  // === Approach B: fresh load, scroll fast through page ===
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1500);

  // Check initial text (before any scroll)
  const initialText = await page.$eval('#stat-count', el => el.textContent.trim());
  console.log(`\nApproach B (fast scroll):`);
  console.log(`  Initial (no scroll): "${initialText}"`);

  // Fast scroll: jump to top, then fast scroll down
  for (let pct of [0, 20, 40, 60, 80, 100]) {
    await page.evaluate(p => window.scrollTo(0, document.body.scrollHeight * p / 100), pct);
    await page.waitForTimeout(30);
  }
  // Scroll BACK to stat section
  await page.$eval('.stat__number', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(0);
  const textB0 = await page.$eval('#stat-count', el => el.textContent.trim());
  await page.waitForTimeout(100);
  const textB100 = await page.$eval('#stat-count', el => el.textContent.trim());
  await page.waitForTimeout(1500);
  const textB1600 = await page.$eval('#stat-count', el => el.textContent.trim());
  console.log(`  At scroll landing: "${textB0}"`);
  console.log(`  100ms after: "${textB100}"`);
  console.log(`  1600ms after: "${textB1600}"`);
  await shot(page, `P1detail-${name}-approachB-mid`);

  // === Check intersection at what scroll position Observer fires ===
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const statData = await page.$eval('.stat__number', el => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      scrollY: window.scrollY,
      absTop: rect.top + window.scrollY,
    };
  });
  console.log(`\nStat__number element:`);
  console.log(`  Height: ${statData.height}px`);
  console.log(`  Abs top: ${statData.absTop}px`);
  console.log(`  Viewport top at load: ${statData.top}px`);

  // At what scroll position does 95% of stat__number enter viewport?
  // Observer fires when 0.95 of element height is visible
  // viewport height is vh
  const fireScrollY = statData.absTop - vh + (statData.height * 0.05);
  console.log(`  Observer fires at scrollY ~${Math.round(fireScrollY)}px (95% visible)`);
  console.log(`  (viewport height: ${vh}px)`);

  await ctx.close();
}

await browser.close();
