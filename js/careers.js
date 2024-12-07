document.addEventListener('DOMContentLoaded', () => {
  const jobListContainer = document.getElementById('job-list');

  // Fetch job data
  fetch('../data/jobs.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch job data.');
      }
      return response.json();
    })
    .then((jobs) => {
      jobs.forEach((job) => {
        // Create job link (wrapping the entire list item)
        const jobLink = document.createElement('a');
        jobLink.href = `/jobs/job-description.html?jobId=${job.id}`;
        jobLink.classList.add('job-link');

        // Create job item
        const jobItem = document.createElement('li');
        jobItem.classList.add('job-item');

        // Create job title
        const jobTitle = document.createElement('h4');
        jobTitle.textContent = job.title;
        jobTitle.classList.add('job-title');

        // Create job description
        const jobDescription = document.createElement('p');
        jobDescription.textContent = job.shortDescription;
        jobDescription.classList.add('job-description');

        // Create location container
        const locationContainer = document.createElement('div');
        locationContainer.classList.add('job-location');

        const locationIcon = document.createElement('i');
        locationIcon.classList.add('fa', 'fa-map-marker-alt');
        const locationText = document.createElement('span');
        locationText.textContent = ` ${job.location}`;

        locationContainer.appendChild(locationIcon);
        locationContainer.appendChild(locationText);

        // Create job type container
        const jobTypeContainer = document.createElement('div');
        jobTypeContainer.classList.add('job-type');

        const jobTypeIcon = document.createElement('i');
        jobTypeIcon.classList.add('fa', 'fa-briefcase');
        const jobTypeText = document.createElement('span');
        jobTypeText.textContent = ` ${job.type}`;

        jobTypeContainer.appendChild(jobTypeIcon);
        jobTypeContainer.appendChild(jobTypeText);

        // Append everything to job item
        jobItem.appendChild(jobTitle);
        jobItem.appendChild(jobDescription);
        jobItem.appendChild(locationContainer);
        jobItem.appendChild(jobTypeContainer);

        // Append job item to job link
        jobLink.appendChild(jobItem);

        // Append job link to the list
        jobListContainer.appendChild(jobLink);
      });
    })
    .catch((error) => {
      console.error('Error loading jobs:', error);
      jobListContainer.textContent =
        'We do not currently have any open positions. Please check back soon.';
    });

  const hamburgerButton = document.querySelector('.menu-toggle');
  const closeButton = document.querySelector('.menu-close');
  const header = document.querySelector('.header');

  // Toggle active state for the menu (open/close)
  hamburgerButton.addEventListener('click', () => {
    header.classList.add('active'); // Open menu, make tabs white
  });

  // Close the menu and revert tabs to black
  closeButton.addEventListener('click', () => {
    header.classList.remove('active'); // Close menu, make tabs black
  });
});
