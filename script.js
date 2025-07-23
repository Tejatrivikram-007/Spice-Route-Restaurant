document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  const header = document.querySelector('header');

  menuToggle?.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close menu when clicking on a link
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('active');
      if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index]?.classList.add('active');
    dots[index]?.classList.add('active');
    currentTestimonial = index;
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
  });

  // Next/Prev buttons
  document.querySelector('.next')?.addEventListener('click', () => {
    let nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
  });

  document.querySelector('.prev')?.addEventListener('click', () => {
    let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex);
  });

  // Auto-rotate testimonials
  if (testimonials.length > 0) {
    setInterval(() => {
      let nextIndex = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Removed dark mode toggle as per user request

  // View buttons for menu categories (responsive)
  const viewButtons = document.querySelectorAll('.view-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  const menuCategories = document.querySelectorAll('.menu-category');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;

      // Show only the selected category items
      menuCategories.forEach(cat => {
        if (cat.dataset.category === category) {
          cat.style.display = 'block';
        } else {
          cat.style.display = 'none';
        }
      });

      // Hide all menu items not in the selected category
      menuItems.forEach(item => {
        if (item.dataset.category === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });

      // Update active state on view buttons
      viewButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Gallery filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active filter
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      const filter = this.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox effect
  const galleryImages = document.querySelectorAll('.gallery-item img');
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${this.src}" alt="${this.alt}">
          <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
      `;
      document.body.appendChild(lightbox);

      // Close lightbox
      const closeBtn = lightbox.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        lightbox.remove();
      });

      // Close when clicking outside image
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
  });

  // Menu filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  // const menuItems = document.querySelectorAll('.menu-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      const category = this.dataset.category;
      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide category headings
      document.querySelectorAll('.menu-category').forEach(cat => {
        if (category === 'all' || cat.querySelector('.menu-item[data-category="'+category+'"]')) {
          cat.style.display = 'block';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });

  // Reservation form handling
  const form = document.getElementById('reservation-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      
      // Format date
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString('en-US', options);
      
      // Show confirmation
      alert(`Thank you, ${name}! Your table for ${guests} is reserved for ${formattedDate} at ${time}. We'll send a confirmation to your email.`);
      
      // Reset form
      form.reset();
    });
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
  }
});