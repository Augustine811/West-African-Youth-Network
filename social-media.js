// Enhanced Social Media Page Animations and Interactions
class SocialMediaPage {
    constructor() {
        this.socialLinks = {
            facebook: 'https://facebook.com/waynsierraleone',
            twitter: 'https://twitter.com/waynsierraleone',
            instagram: 'https://instagram.com/waynsierraleone'
        };
        
        this.init();
    }
    
    init() {
        this.initializeAnimations();
        this.addHoverEffects();
        this.addScrollAnimations();
        this.addSocialLinks();
        this.addRandomAnimations();
        this.initializeLiveFeed();
    }
    
    initializeAnimations() {
        // Initialize floating animation for social icons
        this.animateSocialIcons();
        
        // Initialize pulse animations for feed items
        this.animateFeedItems();
        
        // Initialize gallery animations
        this.animateGallery();
    }
    
    animateSocialIcons() {
        const icons = document.querySelectorAll('.social-icon-animated');
        
        icons.forEach((icon, index) => {
            // Add click animation
            icon.addEventListener('click', () => {
                this.animateIconClick(icon);
            });
            
            // Add random rotation on hover
            icon.addEventListener('mouseenter', () => {
                const rotations = [5, -5, 8, -8, 12, -12];
                const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
                icon.style.transform = `scale(1.1) rotate(${randomRotation}deg)`;
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    animateIconClick(icon) {
        icon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 150);
        
        // Determine which platform was clicked
        const platform = Array.from(icon.classList).find(cls => 
            ['facebook', 'twitter', 'instagram'].includes(cls)
        );
        
        if (platform && this.socialLinks[platform]) {
            // Open social media link in new tab
            window.open(this.socialLinks[platform], '_blank');
        }
    }
    
    animateFeedItems() {
        const feedItems = document.querySelectorAll('.feed-item:not(.animated)');
        
        feedItems.forEach((item, index) => {
            // Add staggered animation
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    animateGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            // Add click animation
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    addHoverEffects() {
        // Platform card hover effects
        const platformCards = document.querySelectorAll('.platform-card');
        
        platformCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const platform = card.classList[1].replace('-card', '');
                this.activatePlatformAnimation(platform);
            });
            
            card.addEventListener('mouseleave', () => {
                const platform = card.classList[1].replace('-card', '');
                this.deactivatePlatformAnimation(platform);
            });
        });
    }
    
    activatePlatformAnimation(platform) {
        // Add active class to corresponding animated elements
        const animatedElements = document.querySelectorAll(`.${platform}-card .animated-feed, .${platform}-card .animated-gallery`);
        animatedElements.forEach(element => {
            element.classList.add('active');
        });
    }
    
    deactivatePlatformAnimation(platform) {
        // Remove active class from animated elements
        const animatedElements = document.querySelectorAll(`.${platform}-card .animated-feed, .${platform}-card .animated-gallery`);
        animatedElements.forEach(element => {
            element.classList.remove('active');
        });
    }
    
    addScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animations based on element type
                    if (entry.target.classList.contains('platform-card')) {
                        this.animatePlatformCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('feed-item')) {
                        this.animateFeedItem(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.platform-card, .feed-item, .section-title, .section-subtitle');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    animatePlatformCard(card) {
        // Add specific platform card animations
        card.style.transform = 'translateY(0) rotate(0deg)';
        card.style.opacity = '1';
    }
    
    animateFeedItem(feedItem) {
        // Add specific feed item animations
        feedItem.style.transform = 'translateX(0)';
        feedItem.style.opacity = '1';
    }
    
    addSocialLinks() {
        // Add functionality to social links
        const socialLinks = document.querySelectorAll('.platform-link');
        
        socialLinks.forEach(link => {
            const platform = link.closest('.platform-card').classList[1].replace('-card', '');
            
            // Set actual href based on platform
            if (this.socialLinks[platform]) {
                link.setAttribute('href', this.socialLinks[platform]);
                link.setAttribute('target', '_blank');
            }
            
            link.addEventListener('click', (e) => {
                // Allow default link behavior (opening in new tab)
                // Just add animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    addRandomAnimations() {
        // Add random subtle animations to floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach(shape => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomDuration = 4 + Math.random() * 4;
            
            shape.style.setProperty('--random-x', `${randomX}px`);
            shape.style.setProperty('--random-y', `${randomY}px`);
            shape.style.animationDuration = `${randomDuration}s`;
        });
    }
    
    initializeLiveFeed() {
        // Simulate live feed updates
        this.simulateLiveUpdates();
    }
    
    simulateLiveUpdates() {
        const feedItems = document.querySelectorAll('.live-feed-section .feed-item');
        
        // Add periodic animation to simulate live updates
        setInterval(() => {
            feedItems.forEach(item => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'pulse 2s ease-in-out';
                }, 10);
            });
        }, 10000); // Every 10 seconds
    }
}

// Add CSS variables for random animations
const addFloatingAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .floating-shape {
            animation: floatRandom var(--animation-duration, 6s) ease-in-out infinite;
        }
        
        @keyframes floatRandom {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(var(--random-x, 0), var(--random-y, -20px));
            }
            50% {
                transform: translate(calc(var(--random-x, 0) * -1), 0);
            }
            75% {
                transform: translate(0, calc(var(--random-y, -20px) * -1));
            }
        }
        
        /* Enhanced animations for social media page */
        .platform-card {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .social-icon-animated {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .feed-item.animated {
            animation: slideUpFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes slideUpFade {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addFloatingAnimationStyles();
    new SocialMediaPage();
});

// Add page transition effects
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});