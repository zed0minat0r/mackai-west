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
