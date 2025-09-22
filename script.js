/*
 * Small helper script for AstroBros website
 *
 * Handles mobile navigation toggling and ensures the hero video
 * attempts to play automatically. Also handles anchor scrolling
 * with proper offsets for the sticky header.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle - Simplified for iPhone
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    // Simple click handler - no preventDefault or other interference
    navToggle.onclick = function() {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    };
    
    // Close menu when clicking on nav links
    navLinks.addEventListener('click', function() {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  }

  // Try to auto‑play the hero video. On some browsers autoplay
  // restrictions require muted video and may still reject the play
  // promise until the user interacts with the page. In that case,
  // register a one‑time interaction handler that retries playback.
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const attemptPlay = () => {
      const p = heroVideo.play?.();
      if (p !== undefined) {
        p.catch(() => {
          /* ignore errors; we'll try again after a user gesture */
        });
      }
    };
    // initial attempt
    attemptPlay();
    // on user interaction, attempt again
    const startOnInteract = () => {
      attemptPlay();
      window.removeEventListener('click', startOnInteract);
      window.removeEventListener('touchstart', startOnInteract);
    };
    window.addEventListener('click', startOnInteract, { passive: true });
    window.addEventListener('touchstart', startOnInteract, { passive: true });
  }

  // Anchor scrolling function
  function scrollToAnchor(hash) {
    if (!hash) return;
    
    const targetId = hash.replace('#', '');
    const target = document.getElementById(targetId);
    
    if (target) {
      // Wait a bit for any page layout to settle
      setTimeout(() => {
        const headerOffset = 140; // Account for sticky header + some padding
        const targetPosition = target.offsetTop - headerOffset;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  // Handle initial page load with hash
  if (window.location.hash) {
    scrollToAnchor(window.location.hash);
  }

  // Handle hash changes (when clicking anchor links)
  window.addEventListener('hashchange', () => {
    scrollToAnchor(window.location.hash);
  });
});
