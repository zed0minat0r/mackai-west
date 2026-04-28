/**
 * Footer wordmark verification — captures after animation completes
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE = 'https://zed0minat0r.github.io/mackai-west/';
const SS_DIR = '/Users/modica/projects/mackai-west/screenshots/cycle5-pixel';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();

await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(1500);

// Scroll to footer
await page.$eval('footer', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));

// Wait for stagger animation to complete: 10 letters * 60ms + 400ms animation = 1000ms total
await page.waitForTimeout(1200);

const isRevealed = await page.$eval('.footer__wordmark', el => el.classList.contains('is-revealed'));
const letterCount = await page.$$eval('.footer__letter', els => els.length);
const allVisible = await page.$$eval('.footer__letter', els =>
  els.every(el => window.getComputedStyle(el).opacity === '1')
);

await page.screenshot({ path: path.join(SS_DIR, 'footer-wordmark-final.png'), fullPage: false });

console.log(`is-revealed class: ${isRevealed}`);
console.log(`Letter count: ${letterCount} (expect 11)`);
console.log(`All letters opacity 1: ${allVisible}`);

// Check no overflow in footer
const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
console.log(`Footer overflow: ${overflow}`);

await browser.close();
