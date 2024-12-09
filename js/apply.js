document.addEventListener('DOMContentLoaded', function () {
  // Get the job title and location from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const jobTitle = urlParams.get('jobTitle');
  const jobLocation = urlParams.get('jobLocation');

  // Set the values of the hidden fields
  document.getElementById('job-title').value = jobTitle;
  document.getElementById('job-location').value = jobLocation;

  // Handle form submission with AJAX
  document
    .querySelector('#application-form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(this);

      fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log('Response from server:', result); // Log the server response for debugging
          if (result.trim() === 'success') {
            // Show the pop-up message and auto-close
            showPopup('Thank you for submitting your application!', () => {
              window.location.href = '../pages/careers.html'; // Redirect after modal closes
            });
          } else {
            showPopup(
              'There was an issue submitting your application. Please try again.'
            );
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showPopup(
            'There was a problem submitting your application. Please try again later.'
          );
        });
    });

  // Pop-up Modal
  function showPopup(message, callback) {
    const modal = document.getElementById('popup-modal');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    modal.classList.remove('hidden');
    setTimeout(() => {
      closePopup();
      if (callback) callback(); // Execute callback if provided
    }, 3000); // Auto close after 3 seconds
  }

  function closePopup() {
    const modal = document.getElementById('popup-modal');
    modal.classList.add('hidden');
  }
});
