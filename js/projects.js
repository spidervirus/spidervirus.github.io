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
        title: 'Remote-Work Tool',
        description: 'A modern web application built with Next.js for managing remote work, including projects, tasks, and team communication.',
        image: 'assets/projects/code-review.jpg',
        github: 'https://github.com/spidervirus/remote-work'
    },
];

// Function to handle image loading
function handleImageLoad(img) {
    img.style.opacity = '1';
    img.parentElement.classList.remove('loading');
}

// Function to render project cards
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card holo-card animate-fade-in';
        
        projectCard.innerHTML = `
            <div class="project-image-container loading">
                <img src="${project.image}" 
                    alt="${project.title}" 
                    class="project-image" 
                    style="opacity: 0; transition: opacity 0.5s ease-in-out"
                    onload="handleImageLoad(this)">
                <div class="loading-spinner"></div>
            </div>
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
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);