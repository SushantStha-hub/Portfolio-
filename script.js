// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');

// Set current year in footer
yearSpan.textContent = new Date().getFullYear();

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Activate nav links based on scroll position
    highlightNavLinks();
    
    // Animate elements when scrolled into view
    animateOnScroll();
});

// Highlight nav links based on scroll position
function highlightNavLinks() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate elements when scrolled into view
function animateOnScroll() {
    // Animate skill bars
    if (isInViewport(document.querySelector('.skills'))) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
        });
    }
    
    // Animate other elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.section-header, .service-card, .project-card, .about-image');
    
    fadeElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create message content
        const currentDate = new Date().toLocaleString();
        const messageContent = 
`New Contact Message
--------------------
Date: ${currentDate}
From: ${name}
Email: ${email}
--------------------
Message:
${message}
--------------------`;

        // Create downloadable text file
        const blob = new Blob([messageContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `contact_message_${Date.now()}.txt`;
        downloadLink.style.display = 'none';
        
        // Add to document, trigger click and cleanup
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        }, 100);
        
        // Show success message
        alert(`Thanks for your message, ${name}! The contact form has generated a text file with your message.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger scroll once to set initial states
    setTimeout(() => {
        highlightNavLinks();
        animateOnScroll();
    }, 500);
    
    // Add animation classes to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
}); 