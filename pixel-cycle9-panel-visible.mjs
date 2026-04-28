/**
 * Scroll to exact candidates panel position to show full panel
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE_URL = 'https://zed0minat0r.github.io/mackai-west/';
const SCREENSHOTS_DIR = '/Users/modica/projects/mackai-west/screenshots/pixel-cycle9';

async function main() {
  const browser = await chromium.launch({ headless: true });

  const configs = [
    ['iphone13', { ...devices['iPhone 13'] }],
    ['iphoneSE', { ...devices['iPhone SE (3rd gen)'] }],
    ['iphone414', { viewport: { width: 414, height: 896 }, deviceScaleFactor: 2, userAgent: devices['iPhone 13'].userAgent }],
  ];

  for (const [name, config] of configs) {
    console.log(`=== ${name} ===`);
    const context = await browser.newContext(config);
    const page = await context.newPage();
    await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    const secData = await page.evaluate(() => {
      const panel = document.querySelector('.candidates__panel');
      const panelR = panel ? panel.getBoundingClientRect() : null;
      return {
        panelAbsTop: panelR ? panelR.top + window.scrollY : null,
        panelHeight: panelR ? panelR.height : null,
      };
    });

    // Scroll so panel top is right below nav (~60px)
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 60)), secData.panelAbsTop);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}-panel-full.png`) });
    console.log(`  panelAbsTop=${secData.panelAbsTop} panelHeight=${secData.panelHeight}`);

    await context.close();
  }

  await browser.close();
  console.log('Done.');
}

main().catch(console.error);
