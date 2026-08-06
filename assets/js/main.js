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
      header.classList.toggle('nav-open');
      document.body.style.overflow = siteNav.classList.contains('open') ? 'hidden' : '';
    });

    siteNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        siteNav.classList.remove('open');
        header.classList.remove('nav-open');
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
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
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

  // Lightbox for photo galleries (homepage gallery + about family grid)
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<div class="lightbox-backdrop"></div><div class="lightbox-content"><button class="lightbox-close">&times;</button><img src="" alt=""><div class="lightbox-caption"></div><button class="lightbox-prev">&lsaquo;</button><button class="lightbox-next">&rsaquo;</button></div>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var lightboxCaption = lightbox.querySelector('.lightbox-caption');
  var activeGallery = [];
  var currentIndex = 0;

  function getCaption(item) {
    var overlay = item.querySelector('.photo-gallery-overlay span');
    if (overlay) return overlay.textContent;
    var span = item.querySelector('span');
    if (span) return span.textContent;
    var img = item.querySelector('img');
    return img ? img.alt : '';
  }

  function openLightbox(gallery, index) {
    activeGallery = gallery;
    currentIndex = index;
    var item = activeGallery[index];
    var img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = getCaption(item);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + activeGallery.length) % activeGallery.length;
    var item = activeGallery[currentIndex];
    var img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = getCaption(item);
  }

  var homepageGallery = Array.from(document.querySelectorAll('.photo-gallery-item'));
  homepageGallery.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(homepageGallery, i); });
  });

  var aboutFamilyGallery = Array.from(document.querySelectorAll('.about-family-item'));
  aboutFamilyGallery.forEach(function (item, i) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () { openLightbox(aboutFamilyGallery, i); });
  });

  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); navigateLightbox(-1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); navigateLightbox(1); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Blog tag filtering
  var blogFilters = document.getElementById('blog-filters');
  var blogArchive = document.getElementById('blog-archive');
  if (blogFilters && blogArchive) {
    var filterPills = blogFilters.querySelectorAll('.blog-filter-pill');
    var blogCards = blogArchive.querySelectorAll('.blog-card');
    var yearDividers = blogArchive.querySelectorAll('.blog-year-divider');

    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var filter = pill.getAttribute('data-filter');
        var visibleYears = {};

        blogCards.forEach(function (card) {
          var tags = card.getAttribute('data-tags') || '';
          if (filter === 'all' || tags.indexOf(filter) !== -1) {
            card.classList.remove('hidden');
            var year = card.getAttribute('data-year');
            if (year) visibleYears[year] = true;
          } else {
            card.classList.add('hidden');
          }
        });

        yearDividers.forEach(function (divider) {
          var yearText = divider.querySelector('span').textContent.trim();
          divider.style.display = (filter === 'all' || visibleYears[yearText]) ? '' : 'none';
        });

        var anyVisible = Object.keys(visibleYears).length > 0 || filter === 'all';
        var noResults = blogArchive.querySelector('.blog-no-results');
        if (!anyVisible && !noResults) {
          var msg = document.createElement('div');
          msg.className = 'blog-no-results';
          msg.textContent = 'No posts match this filter.';
          blogArchive.appendChild(msg);
        } else if (anyVisible && noResults) {
          noResults.remove();
        }
      });
    });
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
