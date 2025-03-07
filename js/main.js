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
        title: 'Snake Game',
        description: 'A modern implementation of the classic Snake game with exciting power-ups, multiple difficulty levels, and high score tracking.',
        image: 'assets/projects/cyber-learning.jpg',
        github: 'https://github.com/spidervirus/Snake-Game'
    },
    {
        title: 'To-Do List',
        description: 'A feature-rich, modern to-do list web application with task categorization, priority levels, due dates, and dark mode support.',
        image: 'assets/projects/network-monitor.jpg',
        github: 'https://github.com/spidervirus/To-Do-List'
    },
    {
        title: 'Remote-Work Tool ',
        description: 'A modern web application built with Next.js for managing remote work, including projects, tasks, and team communication.',
        image: 'assets/projects/code-review.jpg',
        github: 'https://github.com/spidervirus/remote-work'
    },
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