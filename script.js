document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');
  
  if (button && menu) {
    // Toggle mobile navigation. When clicked, toggle the 'open' class on
    // both the menu and the button. Also clear any inline styles that
    // may have been left over from older inline scripts (display,
    // opacity, visibility) to avoid conflicts.
    button.addEventListener('click', function() {
      menu.classList.toggle('open');
      button.classList.toggle('open');
      menu.style.display = '';
      menu.style.opacity = '';
      menu.style.visibility = '';
    });

    // Close the mobile menu after a link is clicked. This ensures
    // navigation returns to its default state when navigating to a
    // section or page.
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        menu.classList.remove('open');
        button.classList.remove('open');
      });
    });

    // Reset the menu and button state when resizing back to desktop
    // widths (>768px). Also clear inline styles to avoid leftover
    // properties from the mobile state.
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
  
  // Anchor scrolling functionality was removed. We rely on CSS
  // scroll-margin-top and native smooth scrolling defined in style.css
  // to handle offsets when navigating to in-page anchors.
});
