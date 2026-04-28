/**
 * Corrected P3: hero mesh verification
 * - Checks .hero__mesh-svg for mesh-rotate animation (not .hero__mesh)
 * - Checks .hero__mesh-vertex for vertex-pulse
 * - Checks .hero__mesh-edge for edge-shimmer
 * - Checks .hero__mesh width
 * - Checks headline not obscured
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

// Desktop 1440
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  const checks = await page.evaluate(() => {
    const mesh = document.querySelector('.hero__mesh');
    const svg = document.querySelector('.hero__mesh-svg');
    const vertex = document.querySelector('.hero__mesh-vertex');
    const edge = document.querySelector('.hero__mesh-edge');
    const h1 = document.querySelector('.hero__heading');

    const meshW = mesh ? mesh.offsetWidth : null;
    const svgAnim = svg ? window.getComputedStyle(svg).animationName : 'not found';
    const vertexAnim = vertex ? window.getComputedStyle(vertex).animationName : 'not found';
    const edgeAnim = edge ? window.getComputedStyle(edge).animationName : 'not found';

    // Headline/mesh overlap
    let overlapArea = 0;
    if (h1 && mesh) {
      const h1R = h1.getBoundingClientRect();
      const mR = mesh.getBoundingClientRect();
      const ox = Math.max(0, Math.min(h1R.right, mR.right) - Math.max(h1R.left, mR.left));
      const oy = Math.max(0, Math.min(h1R.bottom, mR.bottom) - Math.max(h1R.top, mR.top));
      overlapArea = ox * oy;
    }

    return { meshW, svgAnim, vertexAnim, edgeAnim, overlapArea };
  });

  await shot(page, 'P3-desktop-corrected');
  console.log('Desktop 1440:');
  console.log(`  .hero__mesh width: ${checks.meshW}px (expect ~460px, clamp top)`);
  console.log(`  .hero__mesh-svg animation: ${checks.svgAnim} (expect: mesh-rotate)`);
  console.log(`  .hero__mesh-vertex animation: ${checks.vertexAnim} (expect: vertex-pulse)`);
  console.log(`  .hero__mesh-edge animation: ${checks.edgeAnim} (expect: edge-shimmer)`);
  console.log(`  Headline/mesh overlap: ${checks.overlapArea}px² (expect <1000)`);

  const pass = Math.abs(checks.meshW - 460) <= 40
    && checks.svgAnim.includes('mesh-rotate')
    && checks.vertexAnim.includes('vertex-pulse')
    && checks.edgeAnim.includes('edge-shimmer')
    && checks.overlapArea < 1000;
  console.log(`  => ${pass ? 'PASS' : 'FAIL'}`);
  await ctx.close();
}

// iPhone 13
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage();
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));

  const checks = await page.evaluate(() => {
    const mesh = document.querySelector('.hero__mesh');
    const svg = document.querySelector('.hero__mesh-svg');
    const vertex = document.querySelector('.hero__mesh-vertex');
    const edge = document.querySelector('.hero__mesh-edge');
    const h1 = document.querySelector('.hero__heading');

    const meshW = mesh ? mesh.offsetWidth : null;
    const svgAnim = svg ? window.getComputedStyle(svg).animationName : 'not found';
    const vertexAnim = vertex ? window.getComputedStyle(vertex).animationName : 'not found';
    const edgeAnim = edge ? window.getComputedStyle(edge).animationName : 'not found';

    let overlapArea = 0;
    if (h1 && mesh) {
      const h1R = h1.getBoundingClientRect();
      const mR = mesh.getBoundingClientRect();
      const ox = Math.max(0, Math.min(h1R.right, mR.right) - Math.max(h1R.left, mR.left));
      const oy = Math.max(0, Math.min(h1R.bottom, mR.bottom) - Math.max(h1R.top, mR.top));
      overlapArea = ox * oy;
    }

    return { meshW, svgAnim, vertexAnim, edgeAnim, overlapArea };
  });

  await shot(page, 'P3-iPhone13-scrollY0-corrected');
  console.log('\niPhone 13:');
  console.log(`  .hero__mesh width: ${checks.meshW}px (expect 140-200px)`);
  console.log(`  .hero__mesh-svg animation: ${checks.svgAnim} (expect: mesh-rotate)`);
  console.log(`  .hero__mesh-vertex animation: ${checks.vertexAnim} (expect: vertex-pulse)`);
  console.log(`  .hero__mesh-edge animation: ${checks.edgeAnim} (expect: edge-shimmer)`);
  console.log(`  Headline/mesh overlap: ${checks.overlapArea}px² (expect <1000)`);

  const meshOk = checks.meshW >= 140 && checks.meshW <= 210;
  const pass = meshOk
    && checks.svgAnim.includes('mesh-rotate')
    && checks.vertexAnim.includes('vertex-pulse')
    && checks.edgeAnim.includes('edge-shimmer')
    && checks.overlapArea < 1000;
  console.log(`  => ${pass ? 'PASS' : 'FAIL'}`);
  await ctx.close();
}

// iPhone SE
{
  const ctx = await browser.newContext({ ...devices['iPhone SE (3rd gen)'] });
  const page = await ctx.newPage();
  await page.goto(LIVE, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));

  const checks = await page.evaluate(() => {
    const mesh = document.querySelector('.hero__mesh');
    const svg = document.querySelector('.hero__mesh-svg');
    const vertex = document.querySelector('.hero__mesh-vertex');
    const edge = document.querySelector('.hero__mesh-edge');
    const h1 = document.querySelector('.hero__heading');

    const meshW = mesh ? mesh.offsetWidth : null;
    const edgeAnim = edge ? window.getComputedStyle(edge).animationName : 'not found';

    let overlapArea = 0;
    if (h1 && mesh) {
      const h1R = h1.getBoundingClientRect();
      const mR = mesh.getBoundingClientRect();
      const ox = Math.max(0, Math.min(h1R.right, mR.right) - Math.max(h1R.left, mR.left));
      const oy = Math.max(0, Math.min(h1R.bottom, mR.bottom) - Math.max(h1R.top, mR.top));
      overlapArea = ox * oy;
    }

    return { meshW, edgeAnim, overlapArea };
  });

  await shot(page, 'P3-iPhoneSE-scrollY0-corrected');
  console.log('\niPhone SE:');
  console.log(`  .hero__mesh width: ${checks.meshW}px (expect 140-200px)`);
  console.log(`  .hero__mesh-edge animation: ${checks.edgeAnim} (expect: edge-shimmer)`);
  console.log(`  Headline/mesh overlap: ${checks.overlapArea}px² (expect <1000)`);

  const meshOk = checks.meshW >= 140 && checks.meshW <= 210;
  const pass = meshOk && checks.edgeAnim.includes('edge-shimmer') && checks.overlapArea < 1000;
  console.log(`  => ${pass ? 'PASS' : 'FAIL'}`);
  await ctx.close();
}

await browser.close();
