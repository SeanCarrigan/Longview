document.addEventListener('DOMContentLoaded', function () {
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
    .querySelector('#contactForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(this);
      console.log(formData);

      fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          const modal = document.getElementById('contactModal');
          const form = this;

          if (result.trim() === 'success') {
            const successMessage = document.createElement('p');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Your message has been sent!';

            // Clear the form fields and append the success message
            form.reset();
            form.appendChild(successMessage);

            setTimeout(() => {
              modal.style.display = 'none'; // Close modal after 2 seconds
            }, 2000);
          } else {
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = result;

            form.appendChild(errorMessage);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          const form = this;
          const errorMessage = document.createElement('p');
          errorMessage.classList.add('error-message');
          errorMessage.textContent =
            'There was a problem sending your message.';
          form.appendChild(errorMessage);
        });
    });
});
