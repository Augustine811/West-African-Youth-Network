// Footer specific functionality
class FooterManager {
    constructor() {
        this.initSocialMediaLinks();
        this.initScrollToTop();
        this.addCurrentYear();
    }

    initSocialMediaLinks() {
        // Add analytics tracking to social media links
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('aria-label');
                this.trackSocialMediaClick(platform);
            });
        });
    }

    trackSocialMediaClick(platform) {
        // Here you can integrate with Google Analytics or other analytics service
        console.log(`Social media click: ${platform}`);
        
        // Example: Google Analytics event tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'social_click', {
        //         'event_category': 'Social Media',
        //         'event_label': platform
        //     });
        // }
    }

    initScrollToTop() {
        // Create scroll to top button
        this.createScrollToTopButton();
    }

    createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
        `;
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        
        // Add styles for scroll button
        this.addScrollButtonStyles();
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollButton);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });
    }

    addScrollButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #2c5aa0;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-to-top:hover {
                background: #1e3a6b;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addCurrentYear() {
        // Update copyright year automatically
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
        }
    }

    // Method to validate email (can be used for contact forms)
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Method to format phone numbers
    formatPhoneNumber(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
}

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', () => {
    new FooterManager();
});