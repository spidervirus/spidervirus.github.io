// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Project data
const projects = [
    {
        title: 'Cybersecurity Learning Platform',
        description: 'Interactive platform for learning cybersecurity concepts, featuring hands-on labs and CTF challenges.',
        image: 'assets/projects/cyber-learning.jpg',
        github: 'https://github.com/spidervirus/cyber-learning-platform'
    },
    {
        title: 'Network Security Monitor',
        description: 'Real-time network traffic analysis tool with intrusion detection capabilities and threat visualization.',
        image: 'assets/projects/network-monitor.jpg',
        github: 'https://github.com/spidervirus/network-security-monitor'
    },
    {
        title: 'Secure Code Review Tool',
        description: 'Automated tool for identifying security vulnerabilities in source code using static analysis.',
        image: 'assets/projects/code-review.jpg',
        github: 'https://github.com/spidervirus/secure-code-review'
    },
    {
        title: 'Incident Response Framework',
        description: 'Comprehensive framework for managing and responding to security incidents with automated workflows.',
        image: 'assets/projects/incident-response.jpg',
        github: 'https://github.com/spidervirus/incident-response'
    }
];

// Render project cards
const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="cta-button">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
});

// Contact form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    
    // Name validation
    if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        removeError(name);
    }
    
    // Email validation
    if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        removeError(email);
    }
    
    // Message validation
    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        removeError(message);
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    
    input.classList.remove('error');
}

// Intersection Observer for scroll animations
const animateElements = document.querySelectorAll('.animate-fade-in');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

animateElements.forEach(element => observer.observe(element));