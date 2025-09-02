// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');

    // Mobile navigation toggle
    function initMobileNav() {
        if (navToggle) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navToggle && !navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId && targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const navbarHeight = navbar.offsetHeight || 80;
                        const offsetTop = targetSection.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetTop),
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Also handle hero buttons
        const heroBtns = document.querySelectorAll('.hero-buttons .btn');
        heroBtns.forEach(btn => {
            if (btn.getAttribute('href') && btn.getAttribute('href').startsWith('#')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const navbarHeight = navbar.offsetHeight || 80;
                        const offsetTop = targetSection.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetTop),
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 150; // Increased offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar background change on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Project filtering functionality
    function initProjectFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                        // Add fade-in animation
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form validation and submission
    function initContactForm() {
        if (!contactForm) return;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        // Validation functions
        function validateName() {
            if (!nameInput) return true;
            const name = nameInput.value.trim();
            if (name.length < 2) {
                if (nameError) nameError.textContent = 'Name must be at least 2 characters long';
                return false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                if (nameError) nameError.textContent = 'Name should only contain letters and spaces';
                return false;
            } else {
                if (nameError) nameError.textContent = '';
                return true;
            }
        }

        function validateEmail() {
            if (!emailInput) return true;
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                return false;
            } else {
                if (emailError) emailError.textContent = '';
                return true;
            }
        }

        function validateSubject() {
            if (!subjectInput) return true;
            const subject = subjectInput.value.trim();
            if (subject.length < 5) {
                if (subjectError) subjectError.textContent = 'Subject must be at least 5 characters long';
                return false;
            } else {
                if (subjectError) subjectError.textContent = '';
                return true;
            }
        }

        function validateMessage() {
            if (!messageInput) return true;
            const message = messageInput.value.trim();
            if (message.length < 10) {
                if (messageError) messageError.textContent = 'Message must be at least 10 characters long';
                return false;
            } else {
                if (messageError) messageError.textContent = '';
                return true;
            }
        }

        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('blur', validateName);
            nameInput.addEventListener('input', function() {
                if (this.value.trim().length > 0) validateName();
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', function() {
                if (this.value.trim().length > 0) validateEmail();
            });
        }

        if (subjectInput) {
            subjectInput.addEventListener('blur', validateSubject);
            subjectInput.addEventListener('input', function() {
                if (this.value.trim().length > 0) validateSubject();
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', validateMessage);
            messageInput.addEventListener('input', function() {
                if (this.value.trim().length > 0) validateMessage();
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Create mailto link
                const name = nameInput ? nameInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const subject = subjectInput ? subjectInput.value.trim() : '';
                const message = messageInput ? messageInput.value.trim() : '';
                
                const mailtoLink = `mailto:kazol196295@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open default email client
                window.location.href = mailtoLink;
                
                // Show success message
                showNotification('Thank you for your message! Your email client should open shortly.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Clear error messages
                if (nameError) nameError.textContent = '';
                if (emailError) emailError.textContent = '';
                if (subjectError) subjectError.textContent = '';
                if (messageError) messageError.textContent = '';
            } else {
                showNotification('Please correct the errors in the form.', 'error');
            }
        });
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 350px;
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Scroll animations for elements
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.stat-item, .skill-category, .project-card, .achievement-card, .education-card, .research-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animation for statistics
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/[0-9]/g, '');
                    
                    let current = 0;
                    const increment = target / 100;
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                        }
                    }, stepTime);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Scroll event listener with throttling
    function initScrollEvents() {
        let ticking = false;
        
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleNavbarScroll();
                    updateActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Keyboard navigation
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    }

    // Add loading animation to external links
    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            });
        });
    }

    // Add scroll-to-top button
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--portfolio-accent);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
        `;
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, { passive: true });
    }

    // Add ripple effect to buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 600ms linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: 10px;
                    height: 10px;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
        
        // Add CSS for ripple animation
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize all functionality
    function init() {
        initMobileNav();
        initSmoothScrolling();
        initProjectFilters();
        initContactForm();
        initScrollAnimations();
        initCounterAnimations();
        initScrollEvents();
        initKeyboardNavigation();
        initExternalLinks();
        createScrollToTopButton();
        addRippleEffect();
        
        // Set initial active nav link
        setTimeout(updateActiveNavLink, 100);
    }

    // Start the application
    init();

    // Add some console styling for developers who inspect the page
    console.log(
        '%cWelcome to Kawsar\'s Portfolio! 👋',
        'color: #007acc; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%cFeel free to explore the code and reach out if you have any questions!',
        'color: #666; font-size: 14px;'
    );
    console.log(
        '%cEmail: kazol196295@gmail.com',
        'color: #007acc; font-size: 12px;'
    );
    console.log(
        '%cGitHub: https://github.com/kazol196295',
        'color: #007acc; font-size: 12px;'
    );
});