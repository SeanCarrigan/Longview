// Inside your job description rendering code
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('jobId'); // Get the jobId from the URL

  if (jobId) {
    // Fetch the jobs data
    fetch('../data/jobs.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load jobs data');
        }
        return response.json();
      })
      .then((jobs) => {
        const job = jobs.find((job) => job.id === parseInt(jobId));

        if (job) {
          // Fill in the job description page dynamically
          document.getElementById('job-title').textContent = job.title;
          document.getElementById('job-location').innerHTML =
            job.locationDescription;
          document.getElementById('job-aboutUs').innerHTML =
            job.aboutUs.replace(/\n/g, '<br>');
          document.getElementById('job-description').innerHTML =
            job.fullDescription.replace(/\n/g, '<br>');

          // Render roles as an unordered list
          const rolesList = document.getElementById('job-roles');
          rolesList.innerHTML = ''; // Clear any existing content
          job.roles.forEach((role) => {
            const listItem = document.createElement('li');
            listItem.textContent = role;
            rolesList.appendChild(listItem);
          });

          // Render Who You Are as an unordered list
          const aboutYouList = document.getElementById('your-experience');
          aboutYouList.innerHTML = ''; // Clear any existing content
          job.aboutYou.forEach((role) => {
            const listItem = document.createElement('li');
            listItem.textContent = role;
            aboutYouList.appendChild(listItem);
          });

          // Render What We Offer as an unordered list
          const ourOfferList = document.getElementById('our-offer');
          ourOfferList.innerHTML = ''; // Clear any existing content
          job.whatWeOffer.forEach((role) => {
            const listItem = document.createElement('li');
            listItem.textContent = role;
            ourOfferList.appendChild(listItem);
          });

          // Apply button navigation
          const applyButton = document.getElementById('apply-button');
          if (applyButton) {
            // Dynamically set the URL for the apply button
            applyButton.addEventListener('click', (event) => {
              event.preventDefault(); // Prevent default behavior
              const applyUrl = `apply.html?jobId=${
                job.id
              }&jobTitle=${encodeURIComponent(
                job.title
              )}&jobLocation=${encodeURIComponent(job.location)}`;
              window.location.href = applyUrl; // Navigate to the apply page
            });
          }
        } else {
          // Handle case where job is not found
          document.querySelector('.job-description').innerHTML =
            '<p>Job not found.</p>';
        }
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
        document.querySelector('.job-description').innerHTML =
          '<p>There was an error loading the job details.</p>';
      });
  } else {
    // If no job ID is provided in the URL, show an error or redirect
    document.querySelector('.job-description').innerHTML =
      '<p>Invalid job ID.</p>';
  }
});
