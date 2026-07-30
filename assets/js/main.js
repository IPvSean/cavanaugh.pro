document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  // Scroll-triggered header background
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('open');
      document.body.style.overflow = siteNav.classList.contains('open') ? 'hidden' : '';
    });

    siteNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        siteNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-reveal animations
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Stagger animation for grid children (80ms delay per card)
  document.querySelectorAll('.fade-in').forEach(function (section) {
    var children = section.querySelectorAll('.featured-card, .highlight-item, .talk-card, .project-card, .blog-card, .demo-card, .resource-card, .video-card, .timeline-item');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
    });

    var childObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var items = entry.target.querySelectorAll('.featured-card, .highlight-item, .talk-card, .project-card, .blog-card, .demo-card, .resource-card, .video-card, .timeline-item');
          items.forEach(function (item, i) {
            setTimeout(function () {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, i * 80);
          });
          childObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    childObserver.observe(section);
  });

  // Count-up animation for highlight numbers
  function animateCountUp(el, target, suffix) {
    var duration = 1800;
    var startTime = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = easeOutQuart(progress);
      var current = Math.floor(easedProgress * target);

      if (current >= 1000) {
        el.textContent = current.toLocaleString() + suffix;
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var highlightNumbers = document.querySelectorAll('.highlight-number[data-target]');
  if (highlightNumbers.length > 0 && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          var fullText = el.textContent.trim();
          var suffix = fullText.replace(/[\d,]/g, '');
          animateCountUp(el, target, suffix);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    highlightNumbers.forEach(function (el) {
      countObserver.observe(el);
    });
  }
});
