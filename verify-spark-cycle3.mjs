/**
 * Spark cycle 3 verification
 * - 5 scroll positions × 3 viewports (desktop 1440, iPhone13, iPhoneSE)
 * - Industry hover-reveal: desktop mouseover + mobile tap simulation
 * - Services typography: screenshots at 5% / 25% / 50% / 75% / 95% of runway
 */

import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';

const BASE_URL  = 'file:///Users/modica/projects/mackai-west/index.html';
const OUT       = '/Users/modica/projects/mackai-west/screenshots/spark-cycle3';

mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900,  isMobile: false, hasTouch: false },
  { name: 'iPhone13-390', width: 390,  height: 844,  isMobile: true,  hasTouch: true  },
  { name: 'iPhoneSE-375', width: 375,  height: 667,  isMobile: true,  hasTouch: true  },
];

async function scrollSamples(page, label, vpName) {
  const pageH = await page.evaluate(() => document.documentElement.scrollHeight);
  const vph   = await page.evaluate(() => window.innerHeight);
  const pcts  = [0.05, 0.25, 0.5, 0.75, 0.95];
  for (const pct of pcts) {
    const y = Math.round(pct * (pageH - vph));
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(250);
    const safePct = Math.round(pct * 100);
    await page.screenshot({ path: `${OUT}/${vpName}-${label}-${safePct}pct.png`, fullPage: false });
  }
}

async function verifyIndustriesHover(page, vpName, isTouch) {
  // Scroll industries section into view
  await page.evaluate(() => {
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(400);

  const cards = await page.$$('.industry');
  if (!cards.length) { console.log(`[${vpName}] No industry cards found!`); return; }

  const card = cards[0];

  // Screenshot before hover/tap
  await page.screenshot({ path: `${OUT}/${vpName}-industry-before.png`, fullPage: false });

  if (!isTouch) {
    // Desktop: mouseover first card
    await card.hover();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${vpName}-industry-hover.png`, fullPage: false });
    // Check expand panel transform
    const transform = await page.evaluate(() => {
      const panel = document.querySelector('.industry .industry__expand');
      if (!panel) return 'panel not found';
      return getComputedStyle(panel).transform;
    });
    console.log(`[${vpName}] industry expand transform on hover: ${transform}`);
  } else {
    // Mobile: click the toggle button of first card
    const toggle = await card.$('.industry__toggle');
    if (toggle) {
      await toggle.tap();
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${vpName}-industry-tap-open.png`, fullPage: false });
      // Check aria-expanded state
      const expanded = await card.getAttribute('aria-expanded');
      console.log(`[${vpName}] industry card aria-expanded after tap: ${expanded}`);
      // Tap again to close
      await toggle.tap();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${OUT}/${vpName}-industry-tap-closed.png`, fullPage: false });
    } else {
      console.log(`[${vpName}] Toggle button not found on first card`);
    }
  }
}

async function verifyServicesRunway(page, vpName) {
  const runway = await page.$('#services-runway');
  if (!runway) { console.log(`[${vpName}] services-runway not found`); return; }

  const runwayInfo = await page.evaluate(() => {
    const el = document.getElementById('services-runway');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: el.offsetHeight,
    };
  });

  if (!runwayInfo) return;

  const vph = await page.evaluate(() => window.innerHeight);
  const budget = runwayInfo.height - vph;
  const pcts = [0.05, 0.25, 0.5, 0.75, 0.95];

  for (const pct of pcts) {
    const scrollTo = Math.round(runwayInfo.top + pct * budget);
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await page.waitForTimeout(250);
    const translateX = await page.evaluate(() => {
      const track = document.getElementById('services-track');
      if (!track) return 'not found';
      return getComputedStyle(track).transform;
    });
    const safePct = Math.round(pct * 100);
    console.log(`[${vpName}] services track at ${safePct}% runway: transform=${translateX}`);
    await page.screenshot({
      path: `${OUT}/${vpName}-services-${safePct}pct.png`,
      fullPage: false,
    });
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== ${vp.name} ===`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // 5 scroll position samples across the full page
    await scrollSamples(page, 'fullpage', vp.name);

    // Services runway verification
    await verifyServicesRunway(page, vp.name);

    // Industries hover/tap reveal
    await verifyIndustriesHover(page, vp.name, vp.hasTouch);

    await ctx.close();
  }

  await browser.close();
  console.log('\nVerification complete. Screenshots in:', OUT);
})();
