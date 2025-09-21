/*
 * AstroBros JavaScript
 *
 * Handles interactive behaviors across the site, such as the mobile
 * navigation toggle. Additional functionality can be added here as
 * needed (e.g., dynamic menu filtering or form validation).
 */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Toggle the navigation on smaller screens
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
});