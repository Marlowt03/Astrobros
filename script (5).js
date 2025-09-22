// Common site script for AstroBros

document.addEventListener('DOMContentLoaded', () => {
  // Collapse the navigation menu on mobile after clicking a link
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  // When arriving on a page with a hash in the URL, offset the scroll
  // a bit more so that the anchored element is not glued to the very top
  // of the viewport.  We intentionally delay the scroll slightly to let
  // the browser finish jumping to the anchor first.  The extra
  // breathing room makes the content easier to read and ensures the
  // visitor can see context above the anchored item.  Increase the
  // offset value below to move the page down further after landing on
  // an anchored section.  This affects all hash‑based navigation,
  // including links from other pages (e.g. “View on Menu” or “Order
  // Now”), and is tuned to leave roughly a third of the viewport above
  // the anchored element.
  if (window.location.hash) {
    setTimeout(() => {
      // Scroll down a bit more so the anchored element sits below the nav and has some extra padding
      // Adjust this value if anchored sections still appear too close to the
      // top of the viewport. A larger number scrolls the page further
      // down after arriving at a hash link. 650px leaves roughly a third
      // of a typical 1080px viewport above the anchored item.
      const extraOffset = 650; // pixels to scroll after landing on an anchor
      window.scrollBy({ top: extraOffset, left: 0, behavior: 'instant' });
    }, 100);
  }
});