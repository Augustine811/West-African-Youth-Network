// Scroll reveal animation
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('revealed');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// Text animation on hover
function initTextAnimations() {
    const textCards = document.querySelectorAll('.text-card');
    
    textCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax effect for background
function initParallax() {
    const animatedBackground = document.querySelector('.animated-background');
    
    if (animatedBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            animatedBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initTextAnimations();
    initParallax();
    
    // Add scroll-reveal class to elements that should animate on scroll
    const textCards = document.querySelectorAll('.text-card');
    textCards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const imageContent = document.querySelector('.image-content');
    if (imageContent) {
        imageContent.classList.add('scroll-reveal');
    }
});

// Smooth scrolling for anchor links
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