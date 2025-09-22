/*
 * Small helper script for AstroBros website
 *
 * Handles mobile navigation toggling and ensures the hero video
 * attempts to play automatically. Autoplay may be blocked by
 * some browsers; if that happens we attach a user‑gesture listener
 * so that clicking or touching anywhere on the page will start
 * playback. This file intentionally does not implement any custom
 * scrolling offsets because we are using CSS scroll‑margin instead.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
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

  // If the page was loaded with a hash in the URL (e.g. location.html#visit),
  // ensure that the corresponding element is scrolled into view. Some
  // browsers do not honour anchor links when margins or other layout
  // adjustments are applied. Using scrollIntoView here forces the
  // correct scroll position without adding additional offsets.
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const targetId = hash.substring(1);
    const anchor = document.getElementById(targetId);
    if (anchor) {
      // Wait until all resources (fonts, images) have loaded before scrolling
      window.addEventListener('load', () => {
        anchor.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }
});
