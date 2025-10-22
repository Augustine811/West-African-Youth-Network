// Membership Page specific functionality
class MembershipPage {
    constructor() {
        this.initializeAnimations();
        this.initializeActiveState();
        this.initializeContactLinks();
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
        document.querySelectorAll('.board-card, .partner-card, .staff-card').forEach(el => {
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
                (currentPage === 'membership.html' && link.textContent.includes('Board Members'))) {
                link.classList.add('active');
                
                // Also activate parent dropdown if this is a dropdown item
                const parentDropdown = link.closest('.nav-item.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
                }
            }
        });
    }

    initializeContactLinks() {
        // Add click tracking for contact links
        const contactLinks = document.querySelectorAll('.contact-link[href^="mailto"], .contact-link[href^="tel"]');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const contactType = link.href.startsWith('mailto') ? 'email' : 'phone';
                const contactValue = link.href.replace(/^(mailto|tel):/, '');
                this.trackContactClick(contactType, contactValue);
            });
        });
    }

    trackContactClick(type, value) {
        // Here you can integrate with analytics
        console.log(`Contact ${type} clicked: ${value}`);
        
    }

    // Method to filter staff by role (could be extended for search functionality)
    filterStaffByRole(role) {
        const staffCards = document.querySelectorAll('.staff-card');
        staffCards.forEach(card => {
            const staffRole = card.querySelector('.staff-role').textContent.toLowerCase();
            if (role === 'all' || staffRole.includes(role.toLowerCase())) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize membership page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MembershipPage();


// Membership page animations and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initMembershipAnimations();
    initImageErrorHandling();
});

// Initialize animations for membership cards
function initMembershipAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.board-card, .partner-card, .staff-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Handle image loading errors
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
        
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
}

// Smooth scroll for internal links
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

});

// Export for use in other modules
// export default MembershipPage;