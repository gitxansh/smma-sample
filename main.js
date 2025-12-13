// ==========================================
// INDIAN SMMA WEBSITE - MAIN JAVASCRIPT
// All Interactive Features & Animations
// ==========================================

'use strict';

// ==========================================
// CUSTOM CURSOR
// ==========================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        if (this.cursor && this.follower) {
            this.init();
        }
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Magnetic effect on hover
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
            });
        });
        
        this.animate();
    }
    
    animate() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.3;
        this.cursorY += (this.mouseY - this.cursorY) * 0.3;
        
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        
        this.follower.style.left = this.followerX + 'px';
        this.follower.style.top = this.followerY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// PAGE LOADER
// ==========================================
class PageLoader {
    constructor() {
        this.loader = document.querySelector('.loader') || document.querySelector('.page-loader');
        
        if (this.loader) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('loaded');
            }, 1000);
        });
    }
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        
        if (this.progressBar) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.progressBar.style.width = scrolled + '%';
        });
    }
}

// ==========================================
// NAVIGATION
// ==========================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        this.hamburger?.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.mobileMenu?.classList.toggle('active');
        });
        
        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger?.classList.remove('active');
                this.mobileMenu?.classList.remove('active');
            });
        });
        
        // Active link on scroll
        this.highlightActiveSection();
    }
    
    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    navLink?.classList.add('active');
                }
            });
        });
    }
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count], .counter[data-target]');
        this.animated = new Set();
        
        if (this.counters.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count') || element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };
        
        updateCounter();
    }
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-reveal], .reveal-up, .reveal-down, .reveal-left, .reveal-right');
        
        if (this.elements.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ==========================================
// TILT EFFECT (3D CARDS)
// ==========================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.tilt-card');
        
        if (this.cards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * 10;
                const rotateY = ((x - centerX) / centerX) * -10;
                
                card.style.setProperty('--tilt-x', `${rotateX}deg`);
                card.style.setProperty('--tilt-y', `${rotateY}deg`);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            });
        });
    }
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
class MagneticEffect {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic');
        
        if (this.elements.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.setProperty('--magnetic-x', `${x * 0.3}px`);
                el.style.setProperty('--magnetic-y', `${y * 0.3}px`);
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.setProperty('--magnetic-x', '0px');
                el.style.setProperty('--magnetic-y', '0px');
            });
        });
    }
}

// ==========================================
// RIPPLE EFFECT
// ==========================================
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.ripple');
        
        if (this.buttons.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// ==========================================
// FLOATING ORBS PARALLAX
// ==========================================
class FloatingOrbs {
    constructor() {
        this.orbs = document.querySelectorAll('.gradient-orb');
        
        if (this.orbs.length > 0) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            this.orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// ==========================================
// FAQ ACCORDION
// ==========================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        
        if (this.faqItems.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                this.faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                console.log('Form Data:', data);
                
                // Show success message
                this.showMessage('success', 'Thank you! We\'ll get back to you within 24 hours.');
                
                // Reset form
                this.form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Add focus effects
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    showMessage(type, message) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        messageEl.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: ${type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'};
            border: 1px solid ${type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'};
            border-radius: 12px;
            color: ${type === 'success' ? '#4ade80' : '#f87171'};
            margin-top: 20px;
            animation: slideInUp 0.5s ease;
        `;
        
        // Insert message
        this.form.appendChild(messageEl);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => messageEl.remove(), 500);
        }, 5000);
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        
        if (this.links.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        if (this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => observer.observe(img));
    }
}

// ==========================================
// ANIMATED STATISTICS ON SCROLL
// ==========================================
class AnimatedStats {
    constructor() {
        this.stats = document.querySelectorAll('.stat-card, .stat-item, .hero-stats .stat-item');
        
        if (this.stats.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'scaleIn 0.6s ease forwards';
                }
            });
        }, { threshold: 0.5 });
        
        this.stats.forEach((stat, index) => {
            stat.style.animationDelay = `${index * 0.1}s`;
            observer.observe(stat);
        });
    }
}

// ==========================================
// PRELOAD CRITICAL RESOURCES
// ==========================================
function preloadResources() {
    // Preload fonts
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
function enhanceAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Throttle function for performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// ANALYTICS & TRACKING (Optional)
// ==========================================
function initAnalytics() {
    // Track button clicks
    document.querySelectorAll('.btn, .service-link').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Add your analytics tracking code here
            // Example: gtag('event', 'button_click', { button_name: buttonText });
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > maxScroll) {
            maxScroll = Math.floor(scrollPercentage / 25) * 25;
            console.log('Scroll depth:', maxScroll + '%');
            
            // Add your analytics tracking code here
        }
    }, 1000));
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
function init() {
    // Preload resources
    preloadResources();
    
    // Initialize all components
    new CustomCursor();
    new PageLoader();
    new ScrollProgress();
    new Navigation();
    new CounterAnimation();
    new ScrollReveal();
    new TiltEffect();
    new MagneticEffect();
    new RippleEffect();
    new FloatingOrbs();
    new FAQAccordion();
    new ContactForm();
    new SmoothScroll();
    new LazyLoad();
    new AnimatedStats();
    
    // Optimize performance
    optimizePerformance();
    
    // Enhance accessibility
    enhanceAccessibility();
    
    // Initialize analytics (optional)
    // initAnalytics();
    
    // Log initialization
    console.log('🚀 Elevate Digital - Website Initialized');
}

// ==========================================
// START APPLICATION
// ==========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==========================================
// SERVICE WORKER (Optional - for PWA)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ==========================================
// EXPORT FOR MODULE USAGE (Optional)
// ==========================================

// Uncomment if using ES6 modules
// export {
//     CustomCursor,
//     PageLoader,
//     ScrollProgress,
//     Navigation,
//     CounterAnimation,
//     ScrollReveal,
//     TiltEffect,
//     MagneticEffect,
//     RippleEffect,
//     FloatingOrbs,
//     FAQAccordion,
//     ContactForm,
//     SmoothScroll,
//     LazyLoad,
//     AnimatedStats
// };
