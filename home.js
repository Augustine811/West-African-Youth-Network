// Home page specific JavaScript
class HomePage {
    constructor() {
        this.init();
    }
    
    init() {
        this.addSmoothScrolling();
        this.addImageLoading();
        this.addIntersectionObserver();
    }
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add loading states for images
    addImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading class for fade-in effect
            img.classList.add('loading');
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.classList.add('error');
                console.warn('Failed to load image:', img.src);
            });
        });
    }
    
    // Add intersection observer for animations
    addIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.content-section, .text-content, .image-content');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Initialize home page functionality
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});