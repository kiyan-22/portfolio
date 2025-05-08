// Initialize AOS (Animate On Scroll) with enhanced settings
AOS.init({
    duration: 1000,
    once: false, // Changed to false to allow animations on every scroll
    offset: 100,
    delay: 100,
    easing: 'ease-in-out',
    mirror: true // Enable mirroring of animations
});

// Enhanced Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Add animation classes to elements
const addAnimationClasses = () => {
    // Hero section
    document.querySelector('.hero-content').classList.add('animate-on-scroll');
    
    // About section
    document.querySelectorAll('.about-text, .about-image, .stat-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Skills section
    document.querySelectorAll('.skill-card').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Experience section
    document.querySelectorAll('.timeline-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Portfolio section
    document.querySelectorAll('.portfolio-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Contact section
    document.querySelectorAll('.contact-card, .contact-form, .location-map').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
    animateOnScroll();
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth scroll with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Contact Form Handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Get form data
    const formData = new FormData(form);
    
    // Send form data
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Show success/error message
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert ${data.status === 'success' ? 'alert-success' : 'alert-error'}`;
        messageDiv.textContent = data.message;
        
        // Insert message before the form
        form.parentNode.insertBefore(messageDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
        
        // Reset form if successful
        if (data.status === 'success') {
            form.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-error';
        messageDiv.textContent = 'An error occurred. Please try again later.';
        form.parentNode.insertBefore(messageDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    })
    .finally(() => {
        // Re-enable submit button and restore original text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });
});

// Add styles for alerts
const style = document.createElement('style');
style.textContent = `
    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    }
    
    .alert-success {
        background-color: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
    }
    
    .alert-error {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Navbar Background Change on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Always keep navbar visible
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Active Navigation
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize active navigation
setActiveNavItem();

// Portfolio Item Hover Effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    });
});

// Portfolio Carousel
const portfolioTrack = document.querySelector('.portfolio-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
const itemsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
const totalItems = portfolioItems.length;

// Create dots
portfolioItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * (100 / itemsPerView);
    portfolioTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    goToSlide(currentIndex);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
portfolioTrack.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

portfolioTrack.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Handle window resize
window.addEventListener('resize', () => {
    const newItemsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    if (newItemsPerView !== itemsPerView) {
        goToSlide(currentIndex);
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    }
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-tags').includes(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Modal Logic
const modalTriggers = document.querySelectorAll('.view-details');
const modals = document.querySelectorAll('.portfolio-modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(btn => {
    btn.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            modal.focus();
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.portfolio-modal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// Close modal on outside click or Escape key
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
});

// Animate headings on scroll
const animatedHeadings = document.querySelectorAll('.animate-heading');
animatedHeadings.forEach(heading => {
    heading.classList.add('fade-in');
});

// Lazy load images
const lazyImages = document.querySelectorAll('.portfolio-image img, .modal-content img');
if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// Carousel swipe support (basic)
let startX = 0;
let scrollLeft = 0;
if (portfolioTrack) {
    portfolioTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - portfolioTrack.offsetLeft;
        scrollLeft = portfolioTrack.scrollLeft;
    });
    portfolioTrack.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - portfolioTrack.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        portfolioTrack.scrollLeft = scrollLeft - walk;
    });
} 