document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenuList = document.getElementById('nav-menu-list');
    const navLinks = document.querySelectorAll('.nav-link'); // Get all nav links

    if (menuToggle && navMenuList) {
        menuToggle.addEventListener('click', () => {
            navMenuList.classList.toggle('active');
            // Optional: Change burger icon to 'X' when open
             const icon = menuToggle.querySelector('i');
             if (navMenuList.classList.contains('active')) {
                 icon.classList.remove('fa-bars');
                 icon.classList.add('fa-times');
                 menuToggle.setAttribute('aria-label', 'Close Menu');
             } else {
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
                 menuToggle.setAttribute('aria-label', 'Open Menu');
             }
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenuList.classList.contains('active')) {
                    navMenuList.classList.remove('active');
                    // Reset burger icon
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Open Menu');
                }
            });
        });
    } else {
        console.error("Mobile menu toggle or nav list not found!");
    }


    // --- Slideshow ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("mySlides");
    let slideInterval; // Variable to store the interval

    if (slides.length > 0) {
        showSlides(slideIndex);

        // Make plusSlides function global ONLY if using inline onclick
        window.plusSlides = function(n) {
          showSlides(slideIndex += n);
          
          // Reset the automatic slideshow timer when manually changing slides
          if (slideInterval) {
              clearInterval(slideInterval);
              startAutoSlideshow();
          }
        }

        // Function to start automatic slideshow
        function startAutoSlideshow() {
            slideInterval = setInterval(function() {
                slideIndex++;
                showSlides(slideIndex);
            }, 4000); // Change image every 5 seconds
        }

        // Start the automatic slideshow
        startAutoSlideshow();

    } else {
        console.log("No slideshow elements found."); // Optional: Log if no slides
    }

    function showSlides(n) {
      let i;
      if (slides.length === 0) return; // Exit if no slides exist
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex-1].style.display = "block";
    }

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Close mobile menu if clicked outside ---
    document.addEventListener('click', function(event) {
        const isClickInsideNav = menuToggle.contains(event.target) || navMenuList.contains(event.target);
        if (!isClickInsideNav && navMenuList.classList.contains('active')) {
             navMenuList.classList.remove('active');
             // Reset burger icon
             const icon = menuToggle.querySelector('i');
             icon.classList.remove('fa-times');
             icon.classList.add('fa-bars');
             menuToggle.setAttribute('aria-label', 'Open Menu');
        }
    });

});