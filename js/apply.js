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
      console.log(formData);

      fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          const modal = document.getElementById('container');
          const form = this;

          if (result.trim() === 'success') {
            const successMessage = document.createElement('p');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Your application has been sent!';
            // alert('Your application has been sent!');

            // Clear the form fields and append the success message
            form.reset();
            form.appendChild(successMessage);
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

  //   const applicationForm = document.getElementById('application-form');

  //   // Function to handle form submission via AJAX
  //   async function handleFormSubmission(event) {
  //     event.preventDefault(); // Prevent the default form submission

  //     const formData = new FormData(applicationForm);

  //     try {
  //       const response = await fetch('/contact.php', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       // Ensure response is JSON
  //       const result = await response.json();

  //       if (result.status === 'success') {
  //         alert(result.message);
  //         applicationForm.reset();
  //       } else {
  //         alert(result.message || 'There was an error with your submission.');
  //       }
  //     } catch (error) {
  //       console.error('Request failed:', error);
  //       alert('There was a problem with the request: ' + error.message);
  //     }
  //   }

  //   // Attach the event listener to the form's submit event
  //   if (applicationForm) {
  //     applicationForm.addEventListener('submit', handleFormSubmission);
  //   }
});
