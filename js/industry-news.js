document.getElementById('scroll-left').addEventListener('click', function() {
    const scrollContainer = document.querySelector('.main-content');
    scrollContainer.scrollBy({
      left: -300,  // Scroll 300px to the left when the left arrow is clicked
      behavior: 'smooth'
    });
  });
  
  document.getElementById('scroll-right').addEventListener('click', function() {
    const scrollContainer = document.querySelector('.main-content');
    scrollContainer.scrollBy({
      left: 300,  // Scroll 300px to the right when the right arrow is clicked
      behavior: 'smooth'
    });
  });