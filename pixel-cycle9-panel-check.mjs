/**
 * Targeted candidates panel screenshot — scroll to section exactly
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE_URL = 'https://zed0minat0r.github.io/mackai-west/';
const SCREENSHOTS_DIR = '/Users/modica/projects/mackai-west/screenshots/pixel-cycle9';

async function main() {
  const browser = await chromium.launch({ headless: true });

  const configs = [
    ['desktop-1440', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['iphone13', { ...devices['iPhone 13'] }],
    ['iphoneSE', { ...devices['iPhone SE (3rd gen)'] }],
    ['iphone414', { viewport: { width: 414, height: 896 }, deviceScaleFactor: 2, userAgent: devices['iPhone 13'].userAgent }],
  ];

  for (const [name, config] of configs) {
    console.log(`\n=== ${name} ===`);
    const context = await browser.newContext(config);
    const page = await context.newPage();
    await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);

    // Get candidates section position
    const secData = await page.evaluate(() => {
      const sec = document.querySelector('#candidates');
      const panel = document.querySelector('.candidates__panel');
      const copy = document.querySelector('.candidates__copy');
      const mark = document.querySelector('.candidates__panel-mark');
      const caption = document.querySelector('.candidates__panel-caption');
      const rule = document.querySelector('.candidates__panel-rule');

      const r = sec ? sec.getBoundingClientRect() : null;
      const panelR = panel ? panel.getBoundingClientRect() : null;
      const copyR = copy ? copy.getBoundingClientRect() : null;

      return {
        secTop: r ? r.top + window.scrollY : null,
        secHeight: r ? r.height : null,
        panelTop: panelR ? panelR.top + window.scrollY : null,
        panelHeight: panelR ? panelR.height : null,
        copyTop: copyR ? copyR.top + window.scrollY : null,
        panelOrder: panel ? window.getComputedStyle(panel).order : null,
        markFlexDir: mark ? window.getComputedStyle(mark).flexDirection : null,
        captionFontSize: caption ? window.getComputedStyle(caption).fontSize : null,
        captionText: caption ? caption.textContent.trim() : null,
        ruleDisplay: rule ? window.getComputedStyle(rule).display : null,
        ruleHeight: rule ? window.getComputedStyle(rule).height : null,
        pageHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
      };
    });

    console.log('Section data:', JSON.stringify(secData, null, 2));

    // Scroll to candidates section top
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 80)), secData.secTop);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}-panel-top.png`) });

    // Scroll to show panel fully
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 20)), secData.secTop);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}-panel-section.png`) });

    // Scroll mid-section
    await page.evaluate(({ top, h }) => window.scrollTo(0, top + h * 0.4), { top: secData.secTop, h: secData.secHeight });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}-panel-mid.png`) });

    await context.close();
  }

  await browser.close();
  console.log('\nDone. Screenshots in', SCREENSHOTS_DIR);
}

main().catch(console.error);
