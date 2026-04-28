/* ============================================
   MacKai West — main.js
   Nav scroll state, mobile menu, smooth anchors,
   scroll reveals, contact form
   ============================================ */

'use strict';

/* ---- Nav: transparent → solid on scroll ---- */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Mobile hamburger menu ---- */
(function () {
  var nav       = document.getElementById('nav');
  var hamburger = document.getElementById('navHamburger');
  var links     = document.getElementById('navLinks');
  if (!nav || !hamburger || !links) return;

  hamburger.addEventListener('click', function () {
    var open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', open ? 'false' : 'true');
    hamburger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    links.classList.toggle('is-open', !open);
  });

  // Close on any link tap
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      links.classList.remove('is-open');
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      links.classList.remove('is-open');
    }
  });
})();

/* ---- Smooth anchor scroll with nav offset ---- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      var y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

/* ---- Scroll reveal: .reveal-up → .is-visible ---- */
(function () {
  var items = document.querySelectorAll('.reveal-up');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

/* ---- Process section: vertical journey bar (scroll-pinned via translateY) ---- */
(function () {
  var section  = document.querySelector('.process');
  var bodyEl   = document.querySelector('.process__body');
  var bar      = document.querySelector('.process__journey-bar');
  var svg      = document.querySelector('.process__journey-svg');
  var baseLine = document.querySelector('.process__journey-base');
  var fillLine = document.querySelector('.process__journey-fill');
  var markers   = document.querySelectorAll('.process__journey-marker');
  var stepCards = document.querySelectorAll('.process-step');
  var stepsEl  = document.querySelector('.process__steps');
  var innerEl  = document.querySelector('.process__inner');

  if (!section || !bar || !svg || !fillLine || !stepsEl || !innerEl || !bodyEl) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Marker thresholds: with single-column vertical timeline, each step
     takes 25% of scroll progress. Markers light as their step enters the
     reading position (just after the previous step scrolls past).
     Step 1 lights immediately on entry, then each subsequent at 25%
     intervals. */
  var MARKER_THRESHOLDS = [0.0, 0.25, 0.50, 0.75];

  var LINE_LEN = 800;
  var PIN_TOP  = 80; /* px from viewport top to pin bar */

  /* barNaturalTop: bar's top offset in px from section top (set by CSS absolutely) */
  var barNaturalTop = 0;

  function sizeBar() {
    /* Bar is now position: sticky with a fixed CSS height. SVG inside
       sizes to the bar's rendered height. The fill animation runs over
       the bar's height; the actual progress is computed from the steps
       grid scroll position. */
    var barH = bar.offsetHeight;

    svg.setAttribute('viewBox', '0 0 4 ' + barH);
    baseLine.setAttribute('y2', barH);
    fillLine.setAttribute('y2', barH);
    LINE_LEN = barH;
    fillLine.style.strokeDasharray = barH;

    /* Markers evenly distributed along bar height — match thresholds so the
       visual position of each marker matches the scroll-progress at which
       it activates (i.e., the gold fill reaches the marker exactly when
       its step starts being read). */
    var positions = [0.0, 0.30, 0.60, 0.92];
    markers.forEach(function (m, i) {
      m.style.top = Math.round(positions[i] * barH) + 'px';
    });

    if (reducedMotion) {
      fillLine.style.strokeDashoffset = '0';
      markers.forEach(function (m, i) {
        m.classList.add('is-active');
        if (stepCards[i]) { stepCards[i].classList.add('is-active'); }
      });
    } else {
      update();
    }
  }

  var rafPending = false;

  function update() {
    rafPending = false;
    if (reducedMotion) return;

    /* Progress: 0 → 1 across the steps grid scroll travel.
       0 when stepsEl.top is at the bar's pin point (steps just arriving).
       1 when stepsEl.bottom is at the bar's pin point (last step scrolling past).
       The bar itself is position: sticky — browser handles pinning natively;
       JS only updates the SVG fill + marker activation based on scroll progress. */
    var stepsRect = stepsEl.getBoundingClientRect();
    var stepsH    = stepsEl.offsetHeight;
    var progress  = (PIN_TOP - stepsRect.top) / stepsH;
    progress = Math.max(0, Math.min(1, progress));

    /* Fill line: dashoffset interpolates smoothly via CSS transition */
    fillLine.style.strokeDashoffset = String(LINE_LEN - LINE_LEN * progress);

    /* Activate markers based on progress crossing each threshold.
       B3: also sync .is-active to matching .process-step card. */
    markers.forEach(function (m, i) {
      var active = progress >= MARKER_THRESHOLDS[i];
      m.classList.toggle('is-active', active);
      if (stepCards[i]) {
        stepCards[i].classList.toggle('is-active', active);
      }
    });
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      window.requestAnimationFrame(update);
    }
  }

  sizeBar();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeBar, 60);
  }, { passive: true });

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---- Services section: horizontal scroll-lock ---- */
(function () {
  var runway  = document.getElementById('services-runway');
  var track   = document.getElementById('services-track');
  var panels  = document.querySelectorAll('.service-fp');
  var dots    = document.querySelectorAll('.services-dot');

  if (!runway || !track || !panels.length) return;

  var numPanels  = panels.length;
  var currentIdx = -1;

  function setActiveDot(idx) {
    if (idx === currentIdx) return;
    currentIdx = idx;
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
  }

  /* Stepped scroll-lock: each panel dwells for DWELL_FRAC of its segment
     of the scroll budget, then transitions to the next. Reads as
     "lock on panel for ~2s, slide to next panel, lock again, slide..."
     instead of a continuous linear pan. Matches the craft-site Process
     pattern the user referenced. */
  var DWELL_FRAC = 0.6; // 60% of each segment dwells; 40% transitions

  var rafPending = false;

  function update() {
    rafPending = false;
    var rect    = runway.getBoundingClientRect();
    var runwayH = runway.offsetHeight;
    var vh      = window.innerHeight;

    var budget = runwayH - vh;
    if (budget <= 0) {
      track.style.transform = 'translate3d(0,0,0)';
      setActiveDot(0);
      return;
    }

    var scrolled = -rect.top;
    if (scrolled < 0) scrolled = 0;

    var rawProgress = scrolled / budget; // 0 → 1
    if (rawProgress > 1) rawProgress = 1;

    var segments = numPanels - 1;
    var segSize  = 1 / numPanels;
    var i        = Math.min(Math.floor(rawProgress / segSize), numPanels - 1);
    var local    = (rawProgress - i * segSize) / segSize; // 0 → 1 within segment

    var slideProgress;
    if (local < DWELL_FRAC || i >= segments) {
      // Dwelling on panel i (or already at last panel)
      slideProgress = segments > 0 ? i / segments : 0;
    } else {
      // Transitioning from panel i to panel i+1
      var t = (local - DWELL_FRAC) / (1 - DWELL_FRAC);
      slideProgress = (i + t) / segments;
    }

    var translatePct = -slideProgress * segments * 100;
    track.style.transform = 'translate3d(' + translatePct + 'vw, 0, 0)';

    var idx = Math.round(slideProgress * segments);
    if (idx >= numPanels) idx = numPanels - 1;
    setActiveDot(idx);
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      window.requestAnimationFrame(update);
    }
  }

  // Dot clicks: smooth-scroll to the start of each panel's dwell zone
  // (segment i starts at raw progress i * segSize where segSize = 1/numPanels)
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      var budget    = runway.offsetHeight - window.innerHeight;
      var segSize   = 1 / numPanels;
      var target    = runwayTop + (i * segSize) * budget + 2;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();

/* ---- Hero: subtle horizon parallax ---- */
(function () {
  var hero    = document.querySelector('.hero');
  var horizon = document.querySelector('.hero__horizon');
  if (!hero || !horizon) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ticking = false;

  function updateParallax() {
    ticking = false;
    var scrollY = window.scrollY;
    var heroH   = hero.offsetHeight;
    if (scrollY > heroH) {
      horizon.style.transform = 'translateY(0)';
      return;
    }
    horizon.style.transform = 'translateY(' + (scrollY * 0.25) + 'px)';
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
})();

/* ---- Hero: cursor-reactive parallax tilt (desktop / non-touch only) ---- */
(function () {
  // Touch devices: skip — no cursor to track
  if ('ontouchstart' in window) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var hero  = document.querySelector('.hero');
  var inner = document.querySelector('.hero__inner');
  var mesh  = document.querySelector('.hero__mesh:not(.hero__mesh--secondary)');
  if (!hero || !inner) return;

  var pendingRaf = null;
  var lastDX = 0;
  var lastDY = 0;

  function applyTilt(dX, dY) {
    // inner: subtle tilt, max ±1.2deg
    var rotXi =  dY * -1.2;
    var rotYi =  dX *  1.2;
    inner.style.transform = 'rotateX(' + rotXi + 'deg) rotateY(' + rotYi + 'deg)';

    // mesh: more pronounced tilt for depth, max ±2deg
    if (mesh) {
      var rotXm =  dY * -2;
      var rotYm =  dX *  2;
      mesh.style.transform = 'rotateX(' + rotXm + 'deg) rotateY(' + rotYm + 'deg) translateZ(' + (dX * 8) + 'px)';
    }
  }

  hero.addEventListener('mousemove', function (e) {
    if (pendingRaf) return;
    var rect    = hero.getBoundingClientRect();
    var centerX = rect.left + rect.width  / 2;
    var centerY = rect.top  + rect.height / 2;

    // Normalise to -1 → +1, clamped
    lastDX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width  / 2)));
    lastDY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    pendingRaf = window.requestAnimationFrame(function () {
      pendingRaf = null;
      applyTilt(lastDX, lastDY);
    });
  });

  hero.addEventListener('mouseleave', function () {
    if (pendingRaf) {
      window.cancelAnimationFrame(pendingRaf);
      pendingRaf = null;
    }
    // CSS transition on .hero__inner and .hero__mesh handles smooth reset
    inner.style.transform = '';
    if (mesh) mesh.style.transform = '';
  });
})();

/* ---- Footer year ---- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---- Stat band: count-up animation ----
   Initial textContent is "40K" so a quick scroller never sees a partial
   value. The animation fires only once when the section is solidly in
   view (threshold 0.6); we briefly reset to 0K, run the 1.4s ease-out,
   and land back on 40K. The "+" character fades in via CSS after the
   .is-counted class is added. */
(function () {
  var statNum = document.querySelector('.stat__number');
  var countEl = document.getElementById('stat-count');
  if (!statNum || !countEl) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    statNum.classList.add('is-counted');
    return;
  }

  var fired = false;

  var observer = new IntersectionObserver(function (entries) {
    if (fired) return;
    if (!entries[0].isIntersecting) return;
    fired = true;
    observer.disconnect();

    countEl.textContent = '0K';

    var start    = null;
    var duration = 1400;
    var target   = 40;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function frame(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var value    = Math.round(easeOutCubic(progress) * target);
      countEl.textContent = value + 'K';

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        countEl.textContent = '40K';
        statNum.classList.add('is-counted');
      }
    }

    window.requestAnimationFrame(frame);
  }, { threshold: 0.95 });

  observer.observe(statNum);
})();

/* ---- Magnetic copper underlines on nav + footer links ---- */
(function () {
  // Skip on touch devices — static underline is the correct fallback
  if ('ontouchstart' in window) return;

  var links = document.querySelectorAll('.nav__links a, .footer__nav a');
  if (!links.length) return;

  links.forEach(function (link) {
    link.addEventListener('mousemove', function (e) {
      var rect   = link.getBoundingClientRect();
      var center = rect.left + rect.width / 2;
      var offset = e.clientX - center;
      // Scale: map full half-width to ±6px max pull
      var halfW  = rect.width / 2 || 1;
      var mag    = Math.max(-6, Math.min(6, (offset / halfW) * 6));
      link.style.setProperty('--mag-x', mag + 'px');
    });

    link.addEventListener('mouseleave', function () {
      link.style.setProperty('--mag-x', '0px');
    });
  });
})();

/* ---- Industries: 3D card flip — desktop hover via CSS, mobile tap via JS ---- */
(function () {
  var cards = document.querySelectorAll('.industry');
  if (!cards.length) return;

  // Mark touch devices — CSS shows toggle buttons permanently on touch
  var isTouch = ('ontouchstart' in window);
  if (isTouch) {
    document.body.classList.add('is-touch-device');
  }

  function collapseAll(except) {
    cards.forEach(function (card) {
      if (card === except) return;
      var inner  = card.querySelector('.industry__inner');
      var back   = card.querySelector('.industry__face--back');
      var toggle = card.querySelector('.industry__toggle');
      if (inner)  inner.classList.remove('is-flipped');
      if (back)   back.setAttribute('aria-hidden', 'true');
      if (toggle) {
        var lbl = toggle.getAttribute('aria-label') || '';
        toggle.setAttribute('aria-label', lbl.replace('Close', 'Show'));
      }
    });
  }

  function toggleCard(card) {
    var inner  = card.querySelector('.industry__inner');
    var back   = card.querySelector('.industry__face--back');
    var toggle = card.querySelector('.industry__toggle');
    if (!inner) return;

    var isFlipped = inner.classList.contains('is-flipped');
    collapseAll(card);

    if (isFlipped) {
      inner.classList.remove('is-flipped');
      if (back)   back.setAttribute('aria-hidden', 'true');
    } else {
      inner.classList.add('is-flipped');
      if (back)   back.setAttribute('aria-hidden', 'false');
      if (toggle) {
        var lbl = toggle.getAttribute('aria-label') || '';
        toggle.setAttribute('aria-label', lbl.replace('Show', 'Close'));
      }
    }
  }

  cards.forEach(function (card) {
    var toggle = card.querySelector('.industry__toggle');
    if (!toggle) return;

    // Tap / click on toggle button — only meaningful on touch (desktop uses CSS hover)
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleCard(card);
    });

    // Keyboard: Enter / Space on toggle
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });

    // On touch devices: tapping the card body (not just the button) also toggles
    if (isTouch) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.industry__toggle')) return;
        toggleCard(card);
      });
    }
  });

  // Un-flip all when clicking outside any card
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.industry')) {
      collapseAll(null);
    }
  });

  // Escape key un-flips all
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      collapseAll(null);
    }
  });
})();

/* ---- Service panels: 3D mouse-follow tilt (desktop only, touch bail) ---- */
(function () {
  // Touch devices: skip entirely — static is the correct fallback
  if ('ontouchstart' in window) return;

  var panels = document.querySelectorAll('.service-fp');
  if (!panels.length) return;

  panels.forEach(function (panel) {
    var inner = panel.querySelector('.service-fp__inner');
    if (!inner) return;

    var pendingRaf = null;
    var lastRotX   = 0;
    var lastRotY   = 0;

    function applyTilt(rotX, rotY) {
      inner.style.transform = 'perspective(1200px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    }

    panel.addEventListener('mousemove', function (e) {
      if (pendingRaf) return; // rAF gate — don't queue multiple frames
      var rect    = panel.getBoundingClientRect();
      var centerX = rect.left + rect.width  / 2;
      var centerY = rect.top  + rect.height / 2;

      // Normalise to -1 → +1
      var normX = (e.clientX - centerX) / (rect.width  / 2);
      var normY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp and scale to max ±6deg
      var rotY =  Math.max(-6, Math.min(6, normX * 6));
      var rotX = -Math.max(-6, Math.min(6, normY * 6));

      lastRotX = rotX;
      lastRotY = rotY;

      pendingRaf = window.requestAnimationFrame(function () {
        pendingRaf = null;
        applyTilt(lastRotX, lastRotY);
        inner.classList.add('is-tilting');
      });
    });

    panel.addEventListener('mouseleave', function () {
      if (pendingRaf) {
        window.cancelAnimationFrame(pendingRaf);
        pendingRaf = null;
      }
      // CSS transition handles the smooth return to flat
      inner.style.transform = '';
      inner.classList.remove('is-tilting');
    });
  });
})();

/* ---- Contact form: validation + mailto fallback + button choreography ---- */
(function () {
  var form    = document.getElementById('contact-form');
  var btn     = document.getElementById('submit-btn');
  var success = document.getElementById('form-success');
  if (!form || !btn || !success) return;

  if (window.location.search.includes('submitted=1')) {
    success.hidden = false;
    form.hidden = true;
  }

  /* Select: mark as having a value so the floating label stays up */
  var selectEl = form.querySelector('#f-type');
  if (selectEl) {
    selectEl.addEventListener('change', function () {
      if (selectEl.value) {
        selectEl.classList.add('has-value');
      } else {
        selectEl.classList.remove('has-value');
      }
    });
  }

  function runButtonChoreography(callback) {
    /* Phase 1: submitting — show spinner */
    btn.classList.add('is-submitting');
    btn.disabled = true;

    /* Phase 2: success — swap spinner for check + ring pulse */
    setTimeout(function () {
      btn.classList.remove('is-submitting');
      btn.classList.add('is-success');

      /* Phase 3: reveal form-success block after check lands */
      setTimeout(function () {
        if (callback) callback();
      }, 350);
    }, 650);
  }

  form.addEventListener('submit', function (e) {
    var name    = form.querySelector('#f-name');
    var email   = form.querySelector('#f-email');
    var phone   = form.querySelector('#f-phone');
    var type    = form.querySelector('#f-type');
    var message = form.querySelector('#f-message');
    var valid   = true;

    [name, email, type, message].forEach(function (field) {
      if (!field) return;
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) {
      e.preventDefault();
      return;
    }

    // Mailto fallback until a real endpoint is wired
    var action = form.getAttribute('action') || '';
    if (action === '#' || action === '' || action.indexOf('PLACEHOLDER') !== -1) {
      e.preventDefault();
      var subject = encodeURIComponent('MacKai West — ' + (type.value === 'employer' ? 'New search inquiry' : type.value === 'candidate' ? 'Candidate introduction' : 'Inquiry'));
      var body = [
        'Name: '    + (name    ? name.value    : ''),
        'Email: '   + (email   ? email.value   : ''),
        'Phone: '   + (phone   ? phone.value   : ''),
        'Type: '    + (type    ? type.value    : ''),
        '',
        'Message:',
        (message ? message.value : '')
      ].join('\n');
      var mailto = 'mailto:hello@mackaiwest.com?subject=' + subject + '&body=' + encodeURIComponent(body);

      runButtonChoreography(function () {
        success.hidden = false;
        form.hidden = true;
        window.open(mailto, '_blank');
      });
      return;
    }

    runButtonChoreography(function () {
      btn.classList.add('is-loading');
      btn.disabled = true;
    });
  });
})();

/* ---- About pillars: stagger reveal on scroll-into-view ---- */
(function () {
  var pillarList = document.querySelector('.about__pillar-list');
  if (!pillarList) return;

  /* Reduced motion: show immediately */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pillarList.classList.add('is-pillared');
    return;
  }

  var fired = false;
  var observer = new IntersectionObserver(function (entries) {
    if (fired) return;
    if (!entries[0].isIntersecting) return;
    fired = true;
    observer.disconnect();
    pillarList.classList.add('is-pillared');
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  observer.observe(pillarList);
})();

/* ---- Footer: wordmark letter stagger reveal (IntersectionObserver, single-fire) ---- */
(function () {
  var wordmark = document.querySelector('.footer__wordmark');
  if (!wordmark) return;

  // prefers-reduced-motion: letters are shown immediately via CSS, nothing to animate
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wordmark.classList.add('is-revealed');
    return;
  }

  var fired = false;
  var observer = new IntersectionObserver(function (entries) {
    if (fired) return;
    if (!entries[0].isIntersecting) return;
    fired = true;
    observer.disconnect();
    wordmark.classList.add('is-revealed');
  }, { threshold: 0.3 });

  observer.observe(wordmark);
})();

/* ---- Sticky mobile CTA: show between hero CTAs exit and contact section enter ---- */
(function () {
  var bar         = document.getElementById('stickyCta');
  var heroActions = document.querySelector('.hero__actions');
  var contactSec  = document.getElementById('contact');
  if (!bar || !heroActions || !contactSec) return;

  var heroVisible    = true;  // start: hero is in view
  var contactVisible = false;

  function updateBar() {
    var shouldShow = !heroVisible && !contactVisible;
    if (shouldShow) {
      bar.removeAttribute('hidden');
      // Force reflow so transition fires after display change
      bar.offsetHeight; // eslint-disable-line no-unused-expressions
      bar.classList.add('is-visible');
      bar.setAttribute('aria-hidden', 'false');
    } else {
      bar.classList.remove('is-visible');
      bar.setAttribute('aria-hidden', 'true');
      // Re-hide after transition completes (300ms)
      setTimeout(function () {
        if (!bar.classList.contains('is-visible')) {
          bar.setAttribute('hidden', '');
        }
      }, 350);
    }
  }

  var heroObserver = new IntersectionObserver(function (entries) {
    heroVisible = entries[0].isIntersecting;
    updateBar();
  }, { threshold: 0 });

  var contactObserver = new IntersectionObserver(function (entries) {
    contactVisible = entries[0].isIntersecting;
    updateBar();
  }, { threshold: 0 });

  heroObserver.observe(heroActions);
  contactObserver.observe(contactSec);
})();

/* ---- Process step reveal: fade-up on scroll entry (single-fire) ---- */
(function () {
  var steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  /* Reduced motion: reveal all immediately */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    steps.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  steps.forEach(function (el) { observer.observe(el); });
})();

/* ---- Footer: scroll-driven gold progress rule (rAF-throttled) ---- */
(function () {
  var progressEl = document.querySelector('.footer__progress');
  if (!progressEl) return;

  var ticking = false;

  function updateProgress() {
    ticking = false;
    var scrollY  = window.scrollY;
    var winH     = window.innerHeight;
    var docH     = document.documentElement.scrollHeight;
    var progress = (scrollY + winH) / docH;
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;
    progressEl.style.transform = 'scaleX(' + progress + ')';
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateProgress();
})();

/* ============================================
   HERO-EXIT SCROLL TRANSFORM
   As hero scrolls away: scale 1→0.92, blur 0→8px, opacity 1→0
   Applied to .hero__scroll-exit wrapper (one level above .hero__inner
   so cursor-parallax IIFE on .hero__inner has no conflict).
   prefers-reduced-motion: skip entirely.
   ============================================ */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var hero    = document.querySelector('.hero');
  var exitEl  = document.querySelector('.hero__scroll-exit');
  if (!hero || !exitEl) return;

  var ticking = false;

  function updateHeroExit() {
    ticking = false;
    var scrollY  = window.scrollY;
    var heroH    = hero.offsetHeight;
    // progress: 0 at top, 1 when hero is fully scrolled past
    var progress = Math.min(Math.max(scrollY / heroH, 0), 1);

    if (progress > 0) {
      var scale   = 1 - (progress * 0.08);          // 1.0 → 0.92
      var blur    = progress * 8;                    // 0px → 8px
      var opacity = Math.max(1 - (progress * 1.2), 0); // 1 → 0 (slightly faster)
      exitEl.style.transform = 'scale(' + scale + ')';
      exitEl.style.filter    = 'blur(' + blur + 'px)';
      exitEl.style.opacity   = opacity;
    } else {
      exitEl.style.transform = '';
      exitEl.style.filter    = '';
      exitEl.style.opacity   = '';
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroExit);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeroExit();
})();

/* ============================================
   TEXT SCRAMBLE CLASS
   Scrambles H2 through random A-Z chars before
   locking to final text. Scramble chars render in
   var(--gold) via .scramble-char span.
   ============================================ */
function TextScramble(el) {
  this.el     = el;
  this.glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  this.queue  = [];
  this.frame  = 0;
  this.frameReq = null;
  var self = this;
  this.update = function () {
    var output = '';
    var done   = 0;
    self.queue.forEach(function (item) {
      if (self.frame >= item.end) {
        done++;
        output += item.to;
      } else if (self.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = self.glyphs[Math.floor(Math.random() * self.glyphs.length)];
        }
        output += '<span class="scramble-char">' + item.char + '</span>';
      } else {
        output += item.from;
      }
    });
    self.el.innerHTML = output;
    if (done === self.queue.length) {
      if (self.resolve) self.resolve();
    } else {
      self.frameReq = requestAnimationFrame(self.update);
      self.frame++;
    }
  };
}

TextScramble.prototype.setText = function (newText) {
  var self    = this;
  var oldText = this.el.innerText || '';
  var length  = Math.max(oldText.length, newText.length);
  cancelAnimationFrame(this.frameReq);
  this.frame = 0;
  this.queue = Array.from({ length: length }, function (_, i) {
    return {
      from:  oldText[i] || '',
      to:    newText[i] || '',
      start: Math.floor(i * 0.6),
      end:   Math.floor(i * 0.6) + 12,
      char:  ''
    };
  });
  return new Promise(function (resolve) {
    self.resolve = resolve;
    self.update();
  });
};

/* ============================================
   LINE-MASK HEADING REVEAL + TEXT SCRAMBLE COMPOSE
   Applies to all .section-title H2s (7 headings).
   Hero .hero__title is skipped (already has word-fade).
   SplitType splits each H2 into .reveal-line wrappers.
   IntersectionObserver at threshold 0.4 fires:
     1. .is-revealed class → CSS translateY(110%→0) per line
     2. TextScramble runs on each .reveal-line__inner span
   They run simultaneously — scramble chars visible inside rising line.
   prefers-reduced-motion: instant reveal, no scramble.
   ============================================ */
(function () {
  var headings = document.querySelectorAll('.section-title');
  if (!headings.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    headings.forEach(function (h) { h.classList.add('is-revealed'); });
    return;
  }

  /* --- 1. Build line-mask DOM structure --- */
  function wrapSingleLine(h) {
    var wrapper = document.createElement('span');
    wrapper.className = 'reveal-line';
    wrapper.style.setProperty('--i', '0');
    var inner = document.createElement('span');
    inner.className = 'reveal-line__inner';
    while (h.firstChild) inner.appendChild(h.firstChild);
    wrapper.appendChild(inner);
    h.appendChild(wrapper);
  }

  /* Store original plain text per inner span (for scramble) */
  var innerSpans = new Map(); /* heading → array of {span, text} */

  if (window.SplitType) {
    headings.forEach(function (h) {
      try {
        var st = new SplitType(h, { types: 'lines', lineClass: 'reveal-line' });
        var lineEls = st.lines || h.querySelectorAll('.reveal-line');
        var spans = [];
        lineEls.forEach(function (line, idx) {
          /* SplitType already moved text into .reveal-line; wrap in inner */
          var inner = document.createElement('span');
          inner.className = 'reveal-line__inner';
          while (line.firstChild) inner.appendChild(line.firstChild);
          line.appendChild(inner);
          line.style.setProperty('--i', idx);
          spans.push({ el: inner, text: inner.textContent.replace(/\s+/g, ' ').trim() });
        });
        innerSpans.set(h, spans);
      } catch (e) {
        wrapSingleLine(h);
        var inner = h.querySelector('.reveal-line__inner');
        if (inner) innerSpans.set(h, [{ el: inner, text: inner.textContent.replace(/\s+/g, ' ').trim() }]);
      }
    });
  } else {
    /* SplitType not available: single-line wrap */
    headings.forEach(function (h) {
      wrapSingleLine(h);
      var inner = h.querySelector('.reveal-line__inner');
      if (inner) innerSpans.set(h, [{ el: inner, text: inner.textContent.replace(/\s+/g, ' ').trim() }]);
    });
  }

  /* --- 2. IntersectionObserver: fire reveal + scramble --- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var heading = entry.target;
      observer.unobserve(heading);

      /* Line-mask reveal: CSS drives translateY via is-revealed */
      heading.classList.add('is-revealed');
      /* Scramble decode REMOVED — read as spastic gold flicker. Line-mask wipe alone is the reveal. */
    });
  }, { threshold: 0.4 });

  headings.forEach(function (h) { observer.observe(h); });
})();

/* ============================================
   SECTION BG COLOR SHIFT ON SCROLL
   IntersectionObserver fires when each section
   crosses viewport center (rootMargin -45%).
   body[data-bg] drives CSS color transition.
   prefers-reduced-motion: CSS handles instant
   (body transition: none in reduced-motion block).
   ============================================ */
(function () {
  var sections = document.querySelectorAll('[data-section-bg]');
  if (!sections.length) return;

  // Set initial bg from hero (default navy)
  document.body.dataset.bg = 'navy';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bg = entry.target.getAttribute('data-section-bg');
        if (bg) document.body.dataset.bg = bg;
      }
    });
  }, { rootMargin: '-45% 0% -45% 0%' });

  sections.forEach(function (s) { observer.observe(s); });
})();
