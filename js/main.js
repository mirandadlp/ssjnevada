/* ============================================
   SSJ Commercial Services - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
  const contactForm = document.getElementById('contact-form');

  /* ---------- Sticky Header ---------- */
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile Nav Toggle ---------- */
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active Navigation Highlighting ---------- */
  function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNav();

  /* ---------- Contact Form Validation ---------- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.classList.remove('visible');
      });

      // Name validation
      var name = contactForm.querySelector('#name');
      if (name && name.value.trim().length < 2) {
        showError(name, 'name-error', 'Please enter your full name.');
        isValid = false;
      }

      // Email validation
      var email = contactForm.querySelector('#email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        showError(email, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      }

      // Phone validation
      var phone = contactForm.querySelector('#phone');
      var phonePattern = /^[\d\s\-\(\)\+]{7,}$/;
      if (phone && phone.value.trim() !== '' && !phonePattern.test(phone.value.trim())) {
        showError(phone, 'phone-error', 'Please enter a valid phone number.');
        isValid = false;
      }

      // Message validation
      var message = contactForm.querySelector('#message');
      if (message && message.value.trim().length < 10) {
        showError(message, 'message-error', 'Please enter a message (at least 10 characters).');
        isValid = false;
      }

      if (isValid) {
        // Show success message
        var successMsg = document.querySelector('.form-success');
        if (successMsg) {
          successMsg.classList.add('visible');
          contactForm.reset();
          setTimeout(function () {
            successMsg.classList.remove('visible');
          }, 5000);
        }
      }
    });
  }

  function showError(input, errorId, message) {
    input.classList.add('error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Intersection Observer for Fade-in ---------- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll(
      '.overview-card, .feature-block, .service-card, .industry-card, .value-card, .process-card'
    ).forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
})();
