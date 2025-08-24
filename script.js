// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
function toggleNavMenu() {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking on a link
function closeNavMenu() {
    navMenu.classList.remove('show');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Header scroll effect
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(targetId);
        
        // Close mobile menu if open
        closeNavMenu();
    }
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for section animations and active nav
function observeSections() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: `-${header.offsetHeight}px 0px 0px 0px`
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('fade-in-up');
                
                // Update active nav link
                const sectionId = `#${entry.target.id}`;
                updateActiveNavLink(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateForm(formValues)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showSuccessMessage();
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(values) {
    const { name, email, subject, message } = values;
    
    if (!name.trim()) {
        showErrorMessage('Por favor, introduce tu nombre completo.');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        showErrorMessage('Por favor, introduce una dirección de correo válida.');
        return false;
    }
    
    if (!subject) {
        showErrorMessage('Por favor, selecciona el área jurídica.');
        return false;
    }
    
    if (!message.trim() || message.trim().length < 10) {
        showErrorMessage('Por favor, describe tu consulta con al menos 10 caracteres.');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    showMessage('¡Consulta enviada exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
}

// Show error message
function showErrorMessage(message) {
    showMessage(message, 'error');
}

// Generic message display
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-toast');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-toast message-${type}`;
    messageEl.textContent = text;
    
    // Style the message
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: '500',
        zIndex: '9999',
        maxWidth: '400px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#27ae60' : '#e74c3c'
    });
    
    // Add to DOM
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-card, .hero-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Click to call functionality
function initClickToCall() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // For desktop, show confirmation
            if (window.innerWidth > 768) {
                const phoneNumber = link.getAttribute('href').replace('tel:', '');
                const confirmCall = confirm(`¿Deseas llamar al ${phoneNumber}?`);
                if (!confirmCall) {
                    e.preventDefault();
                }
            }
        });
    });
}

// Scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    
    // Style the button
    Object.assign(scrollBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '1000',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            closeNavMenu();
        }
        
        // Tab navigation for mobile menu
        if (navMenu.classList.contains('show') && e.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a, button, input, textarea, select');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Initialize WhatsApp link (optional)
function initWhatsAppLink() {
    const phoneNumber = '663389819';
    const whatsappMessage = encodeURIComponent('Hola, me gustaría solicitar información sobre sus servicios jurídicos.');
    const whatsappUrl = `https://wa.me/34${phoneNumber}?text=${whatsappMessage}`;
    
    // Add WhatsApp button to contact section (optional)
    const contactSection = document.querySelector('#contacto .contact-content');
    if (contactSection) {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = whatsappUrl;
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.className = 'btn btn-primary';
        whatsappBtn.innerHTML = '📱 Consulta por WhatsApp';
        whatsappBtn.style.position = 'fixed';
        whatsappBtn.style.bottom = '80px';
        whatsappBtn.style.right = '20px';
        whatsappBtn.style.zIndex = '999';
        whatsappBtn.style.borderRadius = '25px';
        whatsappBtn.style.fontSize = '0.9rem';
        whatsappBtn.style.padding = '10px 20px';
        
        document.body.appendChild(whatsappBtn);
        
        // Hide on mobile when scrolling up
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                if (window.scrollY > lastScrollY) {
                    whatsappBtn.style.transform = 'translateY(100px)';
                } else {
                    whatsappBtn.style.transform = 'translateY(0)';
                }
                lastScrollY = window.scrollY;
            }
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    navToggle.addEventListener('click', toggleNavMenu);
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Initialize features
    observeSections();
    animateOnScroll();
    initClickToCall();
    addScrollToTop();
    initKeyboardNavigation();
    initWhatsAppLink();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeNavMenu();
        }
    });
});

// Window event listeners
window.addEventListener('scroll', handleHeaderScroll);

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
        closeNavMenu();
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(handleHeaderScroll, 10));

// Accessibility improvements
// Add skip link for keyboard navigation
const skipLink = document.createElement('a');
skipLink.href = '#inicio';
skipLink.className = 'skip-link';
skipLink.textContent = 'Saltar al contenido principal';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);