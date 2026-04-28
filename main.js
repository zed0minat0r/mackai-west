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
  }, { threshold: 0.12 });

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
