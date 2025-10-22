// Enhanced Mobile Navigation functionality
class MobileNavigation {
    constructor() {
        this.toggleButton = document.querySelector('.navbar-toggle');
        this.navbarMenu = document.querySelector('.navbar-menu');
        this.dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link');
        
        this.init();
    }
    
    init() {
        // Toggle mobile menu
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Handle dropdown toggles on mobile
        this.dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDropdown(toggle);
                }
            });
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                this.navbarMenu && 
                this.navbarMenu.classList.contains('active') &&
                !e.target.closest('.navbar-container')) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Set active state based on current page
        this.setActiveState();
    }
    
    toggleMobileMenu() {
        if (this.navbarMenu) {
            this.navbarMenu.classList.toggle('active');
            if (this.toggleButton) {
                this.toggleButton.textContent = this.navbarMenu.classList.contains('active') ? '✕' : '☰';
            }
        }
    }
    
    closeMobileMenu() {
        if (this.navbarMenu) {
            this.navbarMenu.classList.remove('active');
            if (this.toggleButton) {
                this.toggleButton.textContent = '☰';
            }
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }
    
    toggleDropdown(toggle) {
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('active');
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
            
            // Reset all dropdown menus on desktop
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }
    
    setActiveState() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active class based on current page
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
                
                // If it's a dropdown item, also activate its parent dropdown link
                if (link.classList.contains('dropdown-item')) {
                    const dropdownLink = link.closest('.dropdown-menu').previousElementSibling;
                    if (dropdownLink) {
                        dropdownLink.classList.add('active');
                    }
                }
            }
        });
    }
}

// Initialize mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
});

// Add hover functionality for desktop dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', () => {
                const dropdownMenu = item.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const dropdownMenu = item.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }
            });
        }
    });
});