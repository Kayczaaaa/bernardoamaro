/* ===================================================
   Studio Bernardo Amaro - JavaScript
   Premium Beauty Salon Interactive Features
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initHeaderScroll();
    initBackToTop();
    initCounterAnimation();
    initScrollAnimations();
    initParticles();
});

/* ===== Navigation ===== */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Update aria-expanded
        const isExpanded = navToggle.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===== Header Scroll Effect ===== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/* ===== Back to Top Button ===== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== Counter Animation ===== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .stat-item, .badge-card, .gallery-item'
    );

    if (animatedElements.length === 0) return;

    const options = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for items in a group
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ===== Decorative Particles ===== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(212, 175, 55, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;

    container.appendChild(particle);
}

// Add particle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
        }
        25% {
            transform: translate(10px, -20px);
            opacity: 0.8;
        }
        50% {
            transform: translate(-5px, -40px);
            opacity: 0.3;
        }
        75% {
            transform: translate(15px, -20px);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

/* ===== Form Validation (Future Use) ===== */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });

    return isValid;
}

/* ===== Lazy Loading Images ===== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/* ===== Active Navigation Link ===== */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.cta-btn)');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

/* ===== Utility: Throttle Function ===== */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===== Utility: Debounce Function ===== */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ===== Performance: Reduced Motion Check ===== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

/* ===== Console Branding ===== */
console.log(
    '%c Studio Bernardo Amaro %c SBA® ',
    'background: #D4AF37; color: #1A1A1A; padding: 10px 20px; font-size: 14px; font-weight: bold;',
    'background: #1A1A1A; color: #D4AF37; padding: 10px 20px; font-size: 14px; font-style: italic;'
);
console.log('Desenvolvido com ❤️ para Studio Bernardo Amaro');
