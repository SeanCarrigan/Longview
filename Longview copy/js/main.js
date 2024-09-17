document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header-right .nav-link');
  const logoLink = document.querySelector('.logo-link');
  const headerHeight = document.querySelector('.header').offsetHeight; // Get header height
  const footerHeight = document.querySelector('.footer').offsetHeight; // Get footer height

  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => link.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Set the active link
      setActiveLink(link);

      // Smooth scroll to the target section
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Calculate scroll position adjusted by the header height
        let targetPosition = targetElement.offsetTop - headerHeight;

        // Apply additional offset for the Contact section
        if (targetId === 'contact') {
          targetPosition =
            targetElement.offsetTop + headerHeight + footerHeight;
        }

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  logoLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Remove highlight from nav links
    setActiveLink(null);

    // Smooth scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const updateActiveLinkOnScroll = () => {
    let current = '';
    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          current = link.getAttribute('href');
        }
      }
    });
    setActiveLink(document.querySelector(`.header-right a[href="${current}"]`));
  };

  // Initial check on page load
  updateActiveLinkOnScroll();

  // Add scroll event listener
  window.addEventListener('scroll', updateActiveLinkOnScroll);

  // Show the modal when the envelope icon is clicked
  window.showForm = function () {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
  };

  // Close the modal when the close button is clicked
  window.closeForm = function () {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
  };

  // Close the modal if the user clicks outside the modal content
  window.onclick = function (event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Handle form submission with AJAX
  document
    .querySelector('#contactModal form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(this);

      fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          const modal = document.getElementById('contactModal');
          const form = this;

          if (result.trim() === 'success') {
            form.innerHTML =
              '<p class="success-message">Your message has been sent!</p>'; // Display success message
            setTimeout(() => {
              modal.style.display = 'none'; // Close modal after 2 seconds
            }, 2000);
          } else {
            form.innerHTML = `<p class="error-message">${result}</p>`; // Display error message
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          const form = this;
          form.innerHTML =
            '<p class="error-message">There was a problem sending your message.</p>'; // Display error message
        });
    });
});
