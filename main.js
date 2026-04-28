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

/* ---- Process section: scroll-drawn copper line ---- */
(function () {
  var section  = document.querySelector('.process');
  var lineFill = document.querySelector('.process__line-fill');
  if (!section || !lineFill) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    lineFill.style.strokeDashoffset = '0';
    return;
  }

  function updateLine() {
    var rect     = section.getBoundingClientRect();
    var winH     = window.innerHeight;
    // progress 0 when section top is at viewport bottom; 1 when section bottom is at viewport top
    var progress = (winH - rect.top) / (winH + rect.height);
    progress     = Math.max(0, Math.min(1, progress));
    lineFill.style.strokeDashoffset = String(1200 - 1200 * progress);
  }

  window.addEventListener('scroll', updateLine, { passive: true });
  updateLine();
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

  function onScroll() {
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

    var progress = scrolled / budget; // 0 → 1
    if (progress > 1) progress = 1;

    // SLIDE_FRAC: slide completes at 85% of budget, giving dwell on final panel
    var SLIDE_FRAC   = 0.85;
    var slideProgress = progress / SLIDE_FRAC;
    if (slideProgress > 1) slideProgress = 1;

    var translatePct = -slideProgress * (numPanels - 1) * 100;
    track.style.transform = 'translate3d(' + translatePct + 'vw, 0, 0)';

    var idx = Math.round(slideProgress * (numPanels - 1));
    if (idx >= numPanels) idx = numPanels - 1;
    setActiveDot(idx);
  }

  // Dot clicks: smooth-scroll to the scroll position for that panel
  var SLIDE_FRAC_CLICK = 0.85;
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      var budget    = runway.offsetHeight - window.innerHeight;
      var segments  = numPanels - 1;
      var target = segments > 0
        ? runwayTop + (budget * SLIDE_FRAC_CLICK / segments) * i + 2
        : runwayTop + 2;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();

/* ---- Hero: multi-layer parallax ---- */
(function () {
  var hero   = document.querySelector('.hero');
  var layers = document.querySelectorAll('.hero__skyline[data-parallax-rate]');

  if (!hero || !layers.length) return;

  // Respect reduced-motion preference — skip all transforms
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ticking = false;

  function updateParallax() {
    var scrollY = window.scrollY;
    var heroH   = hero.offsetHeight;

    // Only apply while hero is at least partially in view
    if (scrollY > heroH) {
      layers.forEach(function (layer) {
        layer.style.transform = 'translateY(0)';
      });
      return;
    }

    layers.forEach(function (layer) {
      var rate = parseFloat(layer.getAttribute('data-parallax-rate')) || 0;
      // Positive rate: layer moves up (slower = smaller translate = more depth)
      var translate = -(scrollY * rate);
      layer.style.transform = 'translateY(' + translate + 'px)';
    });

    ticking = false;
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

/* ---- Footer year ---- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---- Stat band: count-up animation ---- */
(function () {
  var statNum = document.querySelector('.stat__number');
  var countEl = document.getElementById('stat-count');
  if (!statNum || !countEl) return;

  // Respect reduced motion — show final value immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    countEl.textContent = '40K';
    statNum.classList.add('is-counted');
    return;
  }

  var fired = false;

  var observer = new IntersectionObserver(function (entries) {
    if (fired) return;
    if (!entries[0].isIntersecting) return;
    fired = true;
    observer.disconnect();

    var start     = null;
    var duration  = 1400; // ms
    var target    = 40;

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
  }, { threshold: 0.2 });

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

/* ---- Industries: mobile tap-to-reveal expand panels ---- */
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
      card.classList.remove('is-expanded');
      card.setAttribute('aria-expanded', 'false');
      var panel = card.querySelector('.industry__expand');
      var toggle = card.querySelector('.industry__toggle');
      if (panel) panel.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace('Close', 'Show'));
    });
  }

  function toggleCard(card) {
    var isOpen = card.classList.contains('is-expanded');
    collapseAll(card);
    if (isOpen) {
      card.classList.remove('is-expanded');
      card.setAttribute('aria-expanded', 'false');
      var panel = card.querySelector('.industry__expand');
      if (panel) panel.setAttribute('aria-hidden', 'true');
    } else {
      card.classList.add('is-expanded');
      card.setAttribute('aria-expanded', 'true');
      var panel = card.querySelector('.industry__expand');
      if (panel) panel.setAttribute('aria-hidden', 'false');
    }
  }

  cards.forEach(function (card) {
    var toggle = card.querySelector('.industry__toggle');
    if (!toggle) return;

    // Tap / click on toggle button
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleCard(card);
    });

    // Keyboard: Enter / Space on focused card or toggle
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });

    // On touch devices: tapping the card body (not just the button) also toggles
    if (isTouch) {
      card.addEventListener('click', function (e) {
        // Only fire if the click wasn't on the toggle itself (toggle handles its own event)
        if (e.target.closest('.industry__toggle')) return;
        toggleCard(card);
      });
    }
  });

  // Collapse all when clicking outside any card
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.industry')) {
      collapseAll(null);
    }
  });

  // Escape key collapses all
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      collapseAll(null);
    }
  });
})();

/* ---- Contact form: validation + mailto fallback ---- */
(function () {
  var form    = document.getElementById('contact-form');
  var btn     = document.getElementById('submit-btn');
  var success = document.getElementById('form-success');
  if (!form || !btn || !success) return;

  if (window.location.search.includes('submitted=1')) {
    success.hidden = false;
    form.hidden = true;
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

      btn.classList.add('is-loading');
      btn.disabled = true;

      success.hidden = false;
      form.hidden = true;

      window.open(mailto, '_blank');
      return;
    }

    btn.classList.add('is-loading');
    btn.disabled = true;
  });
})();
