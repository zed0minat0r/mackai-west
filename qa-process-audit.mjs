/**
 * QA audit — Process / "How we work" section
 * Tests 3 viewports × 5 scroll positions each
 * Captures screenshots + computed style snapshots
 */
import { chromium, devices } from '/usr/local/lib/node_modules/playwright/index.mjs';
import { writeFileSync } from 'fs';

const BASE_URL = 'https://zed0minat0r.github.io/mackai-west/?cb=' + Date.now();
const SS_DIR   = '/Users/modica/projects/mackai-west/screenshots/qa-process/';

const VIEWPORTS = [
  { name: 'desktop-1440', viewport: { width: 1440, height: 900 } },
  { name: 'iphone13',     ...devices['iPhone 13'] },
  { name: 'iphoneSE',     ...devices['iPhone SE (3rd gen)'] },
];

const findings = [];

async function auditViewport(browser, vpCfg) {
  const { name, viewport, userAgent, deviceScaleFactor, isMobile, hasTouch } = vpCfg;

  // For devices, viewport is nested; for desktop we set it directly
  const vp = viewport || { width: vpCfg.width, height: vpCfg.height };
  const width  = vp.width;
  const height = vp.height;

  const ctxOpts = { viewport: vp };
  if (userAgent)         ctxOpts.userAgent         = userAgent;
  if (deviceScaleFactor) ctxOpts.deviceScaleFactor = deviceScaleFactor;
  if (isMobile)          ctxOpts.isMobile          = isMobile;
  if (hasTouch)          ctxOpts.hasTouch          = hasTouch;

  const ctx  = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();

  // Capture console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push('PAGE ERROR: ' + err.message));

  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Get section bounds
  const sectionInfo = await page.evaluate(() => {
    const s = document.querySelector('.process');
    if (!s) return null;
    const r = s.getBoundingClientRect();
    return {
      top:    r.top + window.scrollY,
      height: s.offsetHeight,
      steps:  Array.from(document.querySelectorAll('.process-step')).map(el => {
        const er = el.getBoundingClientRect();
        return {
          top:    er.top + window.scrollY,
          height: el.offsetHeight,
          isRevealed: el.classList.contains('is-revealed'),
          isActive:   el.classList.contains('is-active'),
        };
      }),
    };
  });

  if (!sectionInfo) {
    findings.push({ viewport: name, issue: 'CRITICAL: .process section not found' });
    await ctx.close();
    return;
  }

  const sTop = sectionInfo.top;
  const sH   = sectionInfo.height;
  const vh   = height;

  // 5 scroll positions through the section runway
  const positions = [
    { label: 'entering',  scroll: Math.max(0, sTop - vh * 0.3) },
    { label: 'early',     scroll: sTop },
    { label: 'mid',       scroll: sTop + sH * 0.4 },
    { label: 'late',      scroll: sTop + sH * 0.75 },
    { label: 'past',      scroll: sTop + sH + 100 },
  ];

  const snapshots = [];

  for (const pos of positions) {
    await page.evaluate((y) => window.scrollTo(0, y), pos.scroll);
    // Wait for rAF + transitions
    await page.waitForTimeout(400);

    const snap = await page.evaluate((posLabel) => {
      const steps = Array.from(document.querySelectorAll('.process-step'));
      const readingY = window.innerHeight * 0.4;

      return {
        label:     posLabel,
        scrollY:   window.scrollY,
        readingY:  readingY,
        steps: steps.map((el, i) => {
          const rect  = el.getBoundingClientRect();
          const cs    = window.getComputedStyle(el);
          const numEl = el.querySelector('.process-step__num');
          const numCs = numEl ? window.getComputedStyle(numEl) : null;
          const headEl = el.querySelector('.process-step__head');
          const headCs = headEl ? window.getComputedStyle(headEl) : null;
          const descEl = el.querySelector('.process-step__desc');
          const descCs = descEl ? window.getComputedStyle(descEl) : null;
          const eyeEl  = el.querySelector('.process-step__eyebrow');
          const eyeCs  = eyeEl  ? window.getComputedStyle(eyeEl) : null;
          const points = Array.from(el.querySelectorAll('.process-step__points li'));

          // Overflow check
          const overflowX = el.scrollWidth - el.clientWidth;
          const overflowY = el.scrollHeight - el.clientHeight;

          // Check for clipping
          const bodyRect = document.body.getBoundingClientRect();

          return {
            index:       i,
            isRevealed:  el.classList.contains('is-revealed'),
            isActive:    el.classList.contains('is-active'),
            rectTop:     Math.round(rect.top),
            rectBottom:  Math.round(rect.bottom),
            rectLeft:    Math.round(rect.left),
            rectRight:   Math.round(rect.right),
            rectWidth:   Math.round(rect.width),
            opacity:     cs.opacity,
            transform:   cs.transform,
            transition:  cs.transition,
            borderColor: cs.borderColor,
            background:  cs.backgroundColor,
            overflowX:   overflowX,
            overflowY:   overflowY,
            clipOverflow: rect.right > window.innerWidth + 2 || rect.left < -2,
            crossesReadingLine: rect.top <= readingY,
            numFontSize: numCs ? numCs.fontSize : null,
            numColor:    numCs ? numCs.color    : null,
            numOpacity:  numCs ? numCs.opacity  : null,
            headBorderRight: headCs ? headCs.borderRightWidth : null,
            descFontSize:    descCs ? descCs.fontSize         : null,
            eyeFontSize:     eyeCs  ? eyeCs.fontSize          : null,
            bulletCount:     points.length,
            bulletSizes:     points.map(p => window.getComputedStyle(p).fontSize),
          };
        }),
        // Global overflow
        docOverflowX: document.documentElement.scrollWidth - window.innerWidth,
      };
    }, pos.label);

    snapshots.push(snap);

    // Screenshot
    const ssPath = `${SS_DIR}${name}-${pos.label}.png`;
    await page.screenshot({ path: ssPath, fullPage: false });
  }

  // --- Analyse snapshots ---
  for (const snap of snapshots) {
    const lbl = `[${name} @ ${snap.label}]`;

    // Doc overflow
    if (snap.docOverflowX > 2) {
      findings.push({ viewport: name, label: snap.label, issue: `Horizontal overflow: ${snap.docOverflowX}px` });
    }

    for (const st of snap.steps) {
      const sid = `step-0${st.index + 1}`;

      // is-revealed: should be true by "mid" position or earlier
      if (!st.isRevealed && snap.label !== 'entering') {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} NOT is-revealed at "${snap.label}" (opacity=${st.opacity})` });
      }

      // is-active logic: if card top <= reading line, should be active
      if (st.crossesReadingLine && !st.isActive) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} crosses reading line but NOT is-active (rectTop=${st.rectTop}, readingY=${snap.readingY})` });
      }

      // If active but NOT revealed (shouldn't happen but check)
      if (st.isActive && !st.isRevealed) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} is-active but NOT is-revealed — active state applied to invisible card` });
      }

      // Opacity check: revealed cards should be opacity 1
      if (st.isRevealed && parseFloat(st.opacity) < 0.95) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} is-revealed but opacity=${st.opacity} (not fully visible)` });
      }

      // Numeral font size floor (should be well above 13px)
      if (st.numFontSize) {
        const numPx = parseFloat(st.numFontSize);
        if (numPx < 13) {
          findings.push({ viewport: name, label: snap.label, issue: `${sid} numeral font-size below 13px: ${st.numFontSize}` });
        }
      }

      // Description font size floor
      if (st.descFontSize && parseFloat(st.descFontSize) < 13) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} desc font-size below 13px: ${st.descFontSize}` });
      }

      // Eyebrow font size floor
      if (st.eyeFontSize && parseFloat(st.eyeFontSize) < 13) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} eyebrow font-size below 13px: ${st.eyeFontSize}` });
      }

      // Bullet font sizes
      for (const bSize of st.bulletSizes) {
        if (parseFloat(bSize) < 13) {
          findings.push({ viewport: name, label: snap.label, issue: `${sid} bullet font-size below 13px: ${bSize}` });
        }
      }

      // Overflow per card
      if (st.overflowX > 2) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} card overflowX=${st.overflowX}px` });
      }

      // Clipping: card right edge beyond viewport
      if (st.clipOverflow) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} clips outside viewport (left=${st.rectLeft}, right=${st.rectRight}, vw=${window}` });
      }

      // Bullet count should be 3
      if (st.bulletCount !== 3) {
        findings.push({ viewport: name, label: snap.label, issue: `${sid} has ${st.bulletCount} bullets (expected 3)` });
      }
    }

    // Reveal sequencing check: once ANY card is revealed, ALL should be
    const revealedCount  = snap.steps.filter(s => s.isRevealed).length;
    const totalCount     = snap.steps.length;
    if (revealedCount > 0 && revealedCount < totalCount && snap.label !== 'entering') {
      findings.push({ viewport: name, label: snap.label, issue: `Only ${revealedCount}/${totalCount} cards have is-revealed — partial reveal firing (slow/staggered)` });
    }

    // is-active ordering: active state should be monotonic (0..activeIdx all active)
    let foundInactive = false;
    let foundActiveAfterInactive = false;
    for (const st of snap.steps) {
      if (!st.isActive) { foundInactive = true; }
      if (foundInactive && st.isActive) { foundActiveAfterInactive = true; }
    }
    if (foundActiveAfterInactive) {
      findings.push({ viewport: name, label: snap.label, issue: 'is-active state is NOT monotonic — non-contiguous active cards' });
    }
  }

  // Extra: check initial state (before any scroll) - step opacity should be 0 before reveal
  const initCheck = await page.evaluate(() => {
    window.scrollTo(0, 0);
    const steps = Array.from(document.querySelectorAll('.process-step'));
    return steps.map(el => ({
      isRevealed: el.classList.contains('is-revealed'),
      opacity:    window.getComputedStyle(el).opacity,
    }));
  });

  // Check if section fires too early at scroll=0 (rootMargin issue)
  // With rootMargin '0px 0px -15% 0px' and threshold 0, the section
  // should NOT be triggered at top of page
  const earlyReveal = initCheck.filter(s => s.isRevealed);
  if (earlyReveal.length > 0) {
    // This might be OK if section is near top of page, but log it
    findings.push({ viewport: name, label: 'page-load', issue: `${earlyReveal.length} card(s) already is-revealed at scroll=0 — observer may fire immediately on large viewport` });
  }

  if (consoleErrors.length) {
    findings.push({ viewport: name, label: 'console', issue: 'JS ERRORS: ' + consoleErrors.join(' | ') });
  }

  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log('Auditing:', vp.name);
    try {
      await auditViewport(browser, vp);
    } catch (err) {
      findings.push({ viewport: vp.name || 'unknown', label: 'crash', issue: 'Script error: ' + err.message });
    }
  }

  await browser.close();

  console.log('\n=== QA FINDINGS ===');
  if (!findings.length) {
    console.log('No issues found.');
  } else {
    findings.forEach((f, i) => {
      console.log(`[${i + 1}] [${f.viewport}] [${f.label}] ${f.issue}`);
    });
  }

  writeFileSync('/tmp/qa-process-findings.json', JSON.stringify(findings, null, 2));
  console.log('\nFindings written to /tmp/qa-process-findings.json');
  console.log('Screenshots in: ' + SS_DIR);
})();
