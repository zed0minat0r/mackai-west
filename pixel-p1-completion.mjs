/**
 * P1 completion check — does animation complete to 40K?
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

const browser = await chromium.launch({ headless: true });

for (const { name, config } of [
  { name: 'iPhone13', config: devices['iPhone 13'] },
  { name: 'iPhoneSE', config: devices['iPhone SE (3rd gen)'] },
]) {
  const ctx = await browser.newContext({ ...config });
  const page = await ctx.newPage();

  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  const vh = await page.evaluate(() => window.innerHeight);
  const statAbsTop = await page.$eval('.stat__number', el => el.getBoundingClientRect().top + window.scrollY);

  // Scroll to center stat in viewport
  const targetScroll = Math.max(0, statAbsTop - vh / 2);
  await page.evaluate(y => window.scrollTo(0, y), targetScroll);

  // Wait 3s for animation to complete (1400ms duration + buffer)
  await page.waitForTimeout(3000);
  const text3s = await page.$eval('#stat-count', el => el.textContent.trim());
  await shot(page, `P1complete-${name}-3s`);

  // Wait 5s total
  await page.waitForTimeout(2000);
  const text5s = await page.$eval('#stat-count', el => el.textContent.trim());
  await shot(page, `P1complete-${name}-5s`);

  console.log(`${name}: at 3s="${text3s}", at 5s="${text5s}"`);
  console.log(`  Animation completes to 40K: ${text5s === '40K' ? 'YES' : 'NO - FAIL'}`);

  // Check .is-counted class
  const isCounted = await page.$eval('.stat__number', el => el.classList.contains('is-counted'));
  console.log(`  .is-counted class added: ${isCounted}`);

  await ctx.close();
}

await browser.close();
