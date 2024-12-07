document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header-right .nav-link');
  const currentYear = new Date().getFullYear();

  // Set current year in footer
  document.getElementById('currentYear').textContent = currentYear;

  // Set active link function
  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => link.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  // Click event for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Allow full-page navigation without any scrolling behavior
      if (!href.startsWith('#')) {
        return;
      }

      e.preventDefault();
      setActiveLink(link);
    });
  });
});
