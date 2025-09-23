document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle functionality
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var body = document.body;

  // Helper functions to open and close the mobile menu
  function openNav() {
    navLinks.classList.add('open');
    navToggle.classList.add('open');
    body.classList.add('nav-open');
  }

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    body.classList.remove('nav-open');
  }

  function toggleNav(event) {
    event.stopPropagation();
    if (navLinks.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (navToggle && navLinks) {
    // Listen for both click and touchstart for better mobile support
    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('touchstart', toggleNav);

    // Close the menu when any nav link is clicked or tapped
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeNav);
      link.addEventListener('touchstart', closeNav);
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });
    document.addEventListener('touchstart', function(e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });

    // Close the menu on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });

    // Close the menu when resizing to desktop width
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // Hero video functionality  
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    var attemptPlay = function() {
      var promise = heroVideo.play();
      if (promise !== undefined) {
        promise.catch(function() {});
      }
    };
    attemptPlay();
    var playOnClick = function() {
      attemptPlay();
      document.removeEventListener('click', playOnClick);
      document.removeEventListener('touchstart', playOnClick);
    };
    document.addEventListener('click', playOnClick);
    document.addEventListener('touchstart', playOnClick);
  }

  // Smooth anchor scrolling functionality
  function scrollToAnchor(hash) {
    if (!hash) return;
    var targetId = hash.replace('#', '');
    var target = document.getElementById(targetId);
    if (target) {
      setTimeout(function() {
        // Offset to account for sticky header height; adjust if header height changes
        var headerOffset = 140;
        var targetPosition = target.offsetTop - headerOffset;
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
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
