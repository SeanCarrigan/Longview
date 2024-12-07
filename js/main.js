document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header-right .nav-link');
  const currentYear = new Date().getFullYear();
  const header = document.querySelector('.header');
  const currentPage = window.location.pathname;

  const isMainPage = currentPage === '/index.html' || currentPage === '/';
  const isJobDescriptionPage = currentPage.includes(
    '/pages/job-description.html'
  ); // Adjust path as needed

  if (!isJobDescriptionPage) {
    // Apply scroll behavior for all pages except job description
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  } else {
    // Specific behavior for job description page
    header.classList.add('scrolled'); // Ensure consistent header styling
    document.querySelector('.logo-white').style.display = 'none';
    document.querySelector('.logo-black').style.display = 'block';
  }

  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navMenu = document.querySelector('.header-right');

  // Show the menu and toggle buttons
  menuToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    menuToggle.classList.add('hidden');
    menuClose.classList.add('show');
  });

  // Hide the menu and toggle buttons
  menuClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
    menuToggle.classList.remove('hidden');
    menuClose.classList.remove('show');
  });

  // Highlight active navigation link
  navLinks.forEach((link) => link.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[href="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

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
