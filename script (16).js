document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');
  
  if (button && menu) {
    // Toggle mobile navigation and clear leftover inline styles
    button.addEventListener('click', function() {
      menu.classList.toggle('open');
      button.classList.toggle('open');
      menu.style.display = '';
      menu.style.opacity = '';
      menu.style.visibility = '';
    });

    // Close the mobile menu when a link is clicked
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        menu.classList.remove('open');
        button.classList.remove('open');
      });
    });

    // Reset menu state on desktop resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menu.classList.remove('open');
        button.classList.remove('open');
        menu.style.display = '';
        menu.style.opacity = '';
        menu.style.visibility = '';
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
  
  // Anchor scrolling functionality removed. Smooth scrolling is handled via
  // CSS scroll-margin-top and scroll-behavior properties.
});
