/* ============================================
   CREWORA — script.js
   ============================================ */

(function () {
  'use strict';

  /* ── NAVBAR: shadow on scroll ─────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── HAMBURGER MENU ───────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  /* ── SMOOTH SCROLL for anchor links ────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── CONTACT FORM ─────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const type = document.getElementById('type').value;

      // Simple validation
      if (!name || !phone || !type) {
        shakeForm();
        return;
      }

      if (!isValidPhone(phone)) {
        document.getElementById('phone').focus();
        document.getElementById('phone').style.borderColor = '#EF4444';
        setTimeout(function () {
          document.getElementById('phone').style.borderColor = '';
        }, 2000);
        return;
      }

      // Show success state
      contactForm.hidden = true;
      formSuccess.hidden = false;

      // Optionally: build a WhatsApp deep link with the submitted info
      const msg = encodeURIComponent(
        'Hi Crewora! My name is ' + name + '. I am looking to ' + (type === 'hire' ? 'hire crew' : 'find work') + '. My number is ' + phone + '.'
      );
      // You can redirect to WhatsApp after a delay:
      // setTimeout(function () { window.open('https://wa.me/919999999999?text=' + msg, '_blank'); }, 1500);
    });
  }

  function isValidPhone(phone) {
    // Accepts formats like +91 98765 43210, 9876543210, etc.
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?\d{10,15}$/.test(cleaned);
  }

  function shakeForm() {
    const wrap = document.querySelector('.contact-form-wrap');
    wrap.style.animation = 'none';
    wrap.offsetHeight; // reflow
    wrap.style.animation = 'shake 0.35s ease';
  }

  // Inject shake keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);

  /* ── INPUT FOCUS: reset red border ─────── */
  ['name', 'phone', 'type'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    }
  });

  /* ── SCROLL-REVEAL: fade in sections ───── */
  const revealEls = document.querySelectorAll(
    '.service-card, .step, .why-item, .crew-pt, .aside-block'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease ' + (i * 0.06) + 's, transform 0.45s ease ' + (i * 0.06) + 's';
      revealObserver.observe(el);
    });
  }

  /* ── ACTIVE NAV LINK on scroll ──────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--accent)';
      }
    });
  }, { passive: true });

})();
