document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');

  // Mobile navigation toggle
  if (button && menu) {
    var toggleNav = function(event) {
      // Prevent other listeners from firing when touching the toggle
      if (event) event.stopPropagation();
      var isOpen = menu.classList.contains('open');
      menu.classList.toggle('open');
      button.classList.toggle('open');
      document.body.classList.toggle('nav-open', !isOpen);
    };
    button.addEventListener('click', toggleNav);
    // Some mobile browsers fire touchstart without click – listen to both
    button.addEventListener('touchstart', toggleNav, { passive: true });

    // Close the navigation when a link is clicked
    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          button.classList.remove('open');
          document.body.classList.remove('nav-open');
        }
      });
    });

    // Close the navigation when clicking outside the menu
    document.addEventListener('click', function(e) {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !button.contains(e.target)) {
        menu.classList.remove('open');
        button.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    });

    // Close the navigation on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        button.classList.remove('open');
        document.body.classList.remove('nav-open');
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
  
  // Anchor scrolling
  function scrollToAnchor(hash) {
    if (!hash) return;
    var targetId = hash.replace('#', '');
    var target = document.getElementById(targetId);
    if (target) {
      setTimeout(function() {
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
