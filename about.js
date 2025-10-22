// About Page specific functionality
class AboutPage {
    constructor() {
        this.initializeAnimations();
        this.initializeActiveState();
        this.initializeScrollEffects();
    }

    initializeAnimations() {
        // Add intersection observer for scroll animations
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
        document.querySelectorAll('.about-section, .focus-item, .focus-areas').forEach(el => {
            observer.observe(el);
        });
    }

    initializeActiveState() {
        // Set active state for current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage || 
                (currentPage === 'about.html' && link.getAttribute('href') === 'about.html')) {
                link.classList.add('active');
                
                // Also activate parent dropdown if this is a dropdown item
                const parentDropdown = link.closest('.nav-item.dropdown');
                if (parentDropdown && link.classList.contains('dropdown-item')) {
                    parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
                }
            }
        });
    }

    initializeScrollEffects() {
        // Add scroll progress indicator
        this.createScrollProgress();
        
        // Add smooth scrolling for anchor links
        this.enableSmoothScrolling();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'scroll-progress-fill';
        progressBar.appendChild(progressFill);
        
        // Add styles for progress bar
        this.addProgressBarStyles();
        
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / documentHeight) * 100;
            
            progressFill.style.width = `${progress}%`;
        });
    }

    addProgressBarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(44, 90, 160, 0.1);
                z-index: 1001;
            }
            
            .scroll-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #2c5aa0, #1e3a6b);
                width: 0%;
                transition: width 0.1s ease;
            }
            
            @media (max-width: 768px) {
                .scroll-progress {
                    height: 3px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    enableSmoothScrolling() {
        // Smooth scroll for anchor links
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

    // Method to highlight section on load if there's a hash in URL
    highlightSectionFromHash() {
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }
}

// Initialize about page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const aboutPage = new AboutPage();
    aboutPage.highlightSectionFromHash();
});

// Export for use in other modules
// export default AboutPage;