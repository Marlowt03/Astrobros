document.addEventListener('DOMContentLoaded', function() {
  // Ultra-simple mobile navigation
  var button = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');
  
  if (button && menu) {
    button.addEventListener('click', function() {
      if (menu.style.opacity === '1') {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        button.classList.remove('open');
      } else {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        button.classList.add('open');
      }
    });
  }

  // Hero video functionality
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    var attemptPlay = function() {
      var promise = heroVideo.play();
      if (promise !== undefined) {
        promise.catch(function() {
          // Video autoplay was prevented, that's okay
        });
      }
    };
    
    // Try to play initially
    attemptPlay();
    
    // Try again on user interaction
    var playOnClick = function() {
      attemptPlay();
      document.removeEventListener('click', playOnClick);
      document.removeEventListener('touchstart', playOnClick);
    };
    
    document.addEventListener('click', playOnClick);
    document.addEventListener('touchstart', playOnClick);
  }
  
  // Anchor scrolling for menu links
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
  
  // Handle anchor links on page load
  if (window.location.hash) {
    scrollToAnchor(window.location.hash);
  }
  
  // Handle anchor links when clicked
  window.addEventListener('hashchange', function() {
    scrollToAnchor(window.location.hash);
  });
});
