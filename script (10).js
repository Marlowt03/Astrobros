document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Nav (robust + iOS-friendly) =====
  var nav = document.querySelector('.navbar');
  if (nav) {
    var toggle = nav.querySelector('.nav-toggle');
    var links = nav.querySelector('.nav-links');

    if (toggle && links) {
      // Clear any inline styles that might have been set elsewhere
      links.style.display = '';
      links.style.opacity = '';
      links.style.visibility = '';

      function openMenu() {
        links.classList.add('open');
        toggle.classList.add('open');
        document.body.classList.add('nav-open');
      }
      function closeMenu() {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
      function toggleMenu() {
        if (links.classList.contains('open')) closeMenu();
        else openMenu();
      }

      toggle.addEventListener('click', toggleMenu);

      // Close when a nav link is clicked
      links.addEventListener('click', function(e) {
        if (e.target.closest('a')) closeMenu();
      });

      // Close on Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Reset on resize up to desktop
      var lastW = window.innerWidth;
      window.addEventListener('resize', function() {
        var w = window.innerWidth;
        // If crossing the 768px boundary, reset menu
        if ((lastW <= 768 && w > 768) || (lastW > 768 && w <= 768)) {
          closeMenu();
        }
        lastW = w;
      });
    }
  }

  // ===== Hero video functionality =====
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    var attemptPlay = function() {
      try {
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function(){});
      } catch(e) {}
    };
    attemptPlay();
    var playOnClick = function() {
      attemptPlay();
      document.removeEventListener('click', playOnClick);
      document.removeEventListener('touchstart', playOnClick);
    };
    document.addEventListener('click', playOnClick, {passive:true});
    document.addEventListener('touchstart', playOnClick, {passive:true});
  }

  // ===== Smooth anchor scrolling with dynamic header offset =====
  function scrollToAnchor(hash) {
    if (!hash) return;
    var targetId = hash.replace('#', '');
    var target = document.getElementById(targetId);
    if (target) {
      setTimeout(function() {
        var header = document.querySelector('header');
        var headerOffset = (header ? header.offsetHeight : 0) + 10;
        var rect = target.getBoundingClientRect();
        var targetPosition = window.scrollY + rect.top - headerOffset;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      }, 100);
    }
  }

  if (window.location.hash) {
    scrollToAnchor(window.location.hash);
  }
  window.addEventListener('hashchange', function() {
    scrollToAnchor(window.location.hash);
  });
});