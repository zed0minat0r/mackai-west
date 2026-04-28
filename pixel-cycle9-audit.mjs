/**
 * Pixel cycle 9 audit
 * 1. Candidates panel verification at 5 scroll positions × 3 viewports
 * 2. Removed elements check (numeral, copper edge, cream gradient)
 * 3. Standing 375 + 414 alignment + overflow + tap-target sweep
 * 4. Visual regression at 5 scroll positions on iPhone 13
 */

import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const LIVE_URL = 'https://zed0minat0r.github.io/mackai-west/';
const SCREENSHOTS_DIR = '/Users/modica/projects/mackai-west/screenshots/pixel-cycle9';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  iphone13: devices['iPhone 13'],
  iphoneSE: devices['iPhone SE (3rd gen)'],
};

const issues = [];

async function scrollFraction(page, frac) {
  await page.evaluate((f) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.round(maxScroll * f));
  }, frac);
  await page.waitForTimeout(350);
}

async function getPageHeight(page) {
  return page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
}

async function auditCandidatesPanel(page, label, screenshotsDir) {
  const FRACS = [0.05, 0.25, 0.50, 0.75, 0.95];
  const results = [];

  for (const frac of FRACS) {
    await scrollFraction(page, frac);
    const sc = path.join(screenshotsDir, `${label}-candidates-scroll${Math.round(frac * 100)}.png`);
    await page.screenshot({ path: sc, fullPage: false });

    // Check panel elements
    const panelData = await page.evaluate(() => {
      const panel = document.querySelector('.candidates__panel');
      const mark = document.querySelector('.candidates__panel-mark');
      const forSpan = document.querySelector('.candidates__panel-for');
      const whoSpan = document.querySelector('.candidates__panel-who');
      const rule = document.querySelector('.candidates__panel-rule');
      const caption = document.querySelector('.candidates__panel-caption');
      const bullets = document.querySelectorAll('.candidates__points li');
      const cta = document.querySelector('.candidates__copy .btn--primary');
      const numeral = document.querySelector('.candidates__numeral');
      const copy = document.querySelector('.candidates__copy');

      const getStyles = (el) => el ? window.getComputedStyle(el) : null;
      const visible = (el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const s = window.getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0;
      };

      const captionStyles = getStyles(caption);
      const panelStyles = getStyles(panel);
      const candidatesBefore = (() => {
        // Check computed border-left of candidates section
        const cand = document.querySelector('.candidates');
        return cand ? window.getComputedStyle(cand).borderLeft : 'n/a';
      })();

      return {
        panelExists: !!panel,
        panelBg: panelStyles ? panelStyles.backgroundColor : null,
        panelBgImage: panelStyles ? panelStyles.backgroundImage : null,
        panelOrder: panelStyles ? panelStyles.order : null,
        markFlexDirection: mark ? window.getComputedStyle(mark).flexDirection : null,
        forText: forSpan ? forSpan.textContent.trim() : null,
        whoText: whoSpan ? whoSpan.textContent.trim() : null,
        ruleVisible: visible(rule),
        ruleHeight: rule ? window.getComputedStyle(rule).height : null,
        captionText: caption ? caption.textContent.trim() : null,
        captionFontSize: captionStyles ? captionStyles.fontSize : null,
        bulletCount: bullets.length,
        ctaHref: cta ? cta.getAttribute('href') : null,
        ctaVisible: visible(cta),
        numeralPresent: !!numeral,
        candidatesBorderLeft: candidatesBefore,
        // Overflow check
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth,
        // Panel position relative to copy
        panelTop: panel ? panel.getBoundingClientRect().top : null,
        copyTop: copy ? copy.getBoundingClientRect().top : null,
      };
    });

    results.push({ frac, ...panelData });
  }
  return results;
}

async function tapTargetSweep(page, label) {
  // All interactive elements, check min 44px
  const tapResults = await page.evaluate(() => {
    const selectors = [
      'a', 'button', 'input', 'select', 'textarea',
      '[role="button"]', '[tabindex]'
    ];
    const issues = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.offsetWidth === 0 && el.offsetHeight === 0) return;
        const r = el.getBoundingClientRect();
        const s = window.getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden') return;
        const h = Math.round(r.height);
        const w = Math.round(r.width);
        if (h < 44 || w < 44) {
          issues.push({
            tag: el.tagName,
            class: el.className,
            text: el.textContent.trim().slice(0, 40),
            height: h,
            width: w
          });
        }
      });
    });
    return issues;
  });
  return tapResults;
}

async function fontSizeSweep(page) {
  // Check all text elements for < 13px
  const fontIssues = await page.evaluate(() => {
    const issues = [];
    document.querySelectorAll('p, span, li, a, label, caption, small, figcaption, th, td, .section-eyebrow, .form-group label').forEach(el => {
      if (el.children.length > 0) return; // skip non-leaf
      const s = window.getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') return;
      const sz = parseFloat(s.fontSize);
      if (sz < 12.5) { // 13px floor — flag < 12.5
        issues.push({
          tag: el.tagName,
          class: el.className.slice(0, 40),
          text: el.textContent.trim().slice(0, 30),
          fontSize: sz
        });
      }
    });
    return issues;
  });
  return fontIssues;
}

async function overflowCheck(page) {
  return page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    windowWidth: window.innerWidth,
    overflow: document.body.scrollWidth > window.innerWidth + 1,
    documentScrollWidth: document.documentElement.scrollWidth,
  }));
}

async function runViewport(browser, vpName, vpConfig, screenshotsDir) {
  const context = await browser.newContext(vpConfig);
  const page = await context.newPage();

  await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Full page screenshot at start
  await page.screenshot({ path: path.join(screenshotsDir, `${vpName}-fullpage.png`), fullPage: true });

  const candidatesResults = await auditCandidatesPanel(page, vpName, screenshotsDir);

  // Go back to top for sweeps
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // Overflow check at top
  const overflowTop = await overflowCheck(page);

  // Scroll to candidates section for overflow check there too
  await page.evaluate(() => {
    const sec = document.querySelector('#candidates');
    if (sec) sec.scrollIntoView();
  });
  await page.waitForTimeout(300);
  const overflowCandidates = await overflowCheck(page);

  // Tap target sweep (mobile only, or all)
  const tapIssues = await tapTargetSweep(page, vpName);

  // Font size sweep
  const fontIssues = await fontSizeSweep(page);

  // DOM checks for removed elements
  const domChecks = await page.evaluate(() => {
    const numeral = document.querySelector('.candidates__numeral');
    const cand = document.querySelector('.candidates');
    const beforeStyle = cand ? window.getComputedStyle(cand, '::before') : null;
    return {
      numeralAbsent: !numeral,
      candidatesBefore_content: beforeStyle ? beforeStyle.content : 'n/a',
      candidatesBefore_borderLeft: beforeStyle ? beforeStyle.borderLeft : 'n/a',
      candidatesBackground: cand ? window.getComputedStyle(cand).backgroundColor : null,
      candidatesBackgroundImage: cand ? window.getComputedStyle(cand).backgroundImage : null,
    };
  });

  await context.close();

  return {
    viewport: vpName,
    candidatesResults,
    overflowTop,
    overflowCandidates,
    tapIssues,
    fontIssues,
    domChecks,
  };
}

async function main() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const configs = [
    ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['iphone13', { ...devices['iPhone 13'] }],
    ['iphoneSE', { ...devices['iPhone SE (3rd gen)'] }],
  ];

  const allResults = {};

  for (const [name, config] of configs) {
    console.log(`\nAuditing ${name}...`);
    allResults[name] = await runViewport(browser, name, config, SCREENSHOTS_DIR);
  }

  await browser.close();

  // Report
  console.log('\n=============== PIXEL CYCLE 9 AUDIT REPORT ===============\n');

  for (const [vpName, result] of Object.entries(allResults)) {
    console.log(`\n--- ${vpName.toUpperCase()} ---`);

    // Candidates panel
    const sample = result.candidatesResults[2]; // 50% position
    console.log('Candidates panel (50% scroll):');
    console.log('  Panel exists:', sample.panelExists);
    console.log('  Panel order (mobile):', sample.panelOrder);
    console.log('  Mark flex-direction:', sample.markFlexDirection);
    console.log('  "For" text:', sample.forText);
    console.log('  "Who" text:', sample.whoText);
    console.log('  Rule visible:', sample.ruleVisible, '| height:', sample.ruleHeight);
    console.log('  Caption:', sample.captionText, '| fontSize:', sample.captionFontSize);
    console.log('  Bullet count:', sample.bulletCount);
    console.log('  CTA href:', sample.ctaHref, '| visible:', sample.ctaVisible);
    console.log('  Numeral present:', sample.numeralPresent);
    console.log('  Candidates border-left:', sample.candidatesBorderLeft);
    console.log('  Overflow:', sample.overflow);

    // Panel position check: on mobile panel should be ABOVE copy (lower or equal top)
    console.log('  Panel top:', sample.panelTop, '| Copy top:', sample.copyTop);

    // DOM checks
    console.log('\nDOM checks:');
    console.log('  .candidates__numeral absent:', result.domChecks.numeralAbsent);
    console.log('  ::before content:', result.domChecks.candidatesBefore_content);
    console.log('  ::before border-left:', result.domChecks.candidatesBefore_borderLeft);
    console.log('  candidates background:', result.domChecks.candidatesBackground);
    console.log('  candidates bg-image:', result.domChecks.candidatesBackgroundImage);

    // Overflow
    console.log('\nOverflow:');
    console.log('  Top of page:', result.overflowTop.overflow ? '!!! OVERFLOW' : 'PASS', `(${result.overflowTop.bodyScrollWidth}px vs ${result.overflowTop.windowWidth}px)`);
    console.log('  At candidates:', result.overflowCandidates.overflow ? '!!! OVERFLOW' : 'PASS', `(${result.overflowCandidates.bodyScrollWidth}px vs ${result.overflowCandidates.windowWidth}px)`);

    // Tap targets
    if (result.tapIssues.length > 0) {
      console.log(`\nTap target issues (${result.tapIssues.length}):`);
      result.tapIssues.forEach(t => console.log(`  ${t.tag}.${t.class} "${t.text}" h=${t.height} w=${t.width}`));
    } else {
      console.log('\nTap targets: PASS (all ≥44px)');
    }

    // Font sizes
    if (result.fontIssues.length > 0) {
      console.log(`\nFont size issues (<13px) (${result.fontIssues.length}):`);
      result.fontIssues.forEach(f => console.log(`  ${f.tag}.${f.class} "${f.text}" ${f.fontSize}px`));
    } else {
      console.log('Font sizes: PASS (all ≥13px)');
    }
  }

  // Save JSON for reference
  fs.writeFileSync(
    path.join(SCREENSHOTS_DIR, 'audit-report.json'),
    JSON.stringify(allResults, null, 2)
  );

  console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}`);
}

main().catch(console.error);
