// Function to animate skill progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Function to animate stat counters
function animateCounters(category) {
    const counter = category.querySelector('.stat-counter');
    if (!counter) return;
    
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutQuad for smoother animation
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentNumber = Math.round(easeProgress * target);
        counter.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for triggering animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Lower threshold for earlier triggering
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            // Ensure the category is visible before animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars in this category
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
            
            // Animate counter in this category
            animateCounters(entry.target);
            
            // Unobserve after animation
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing skill categories when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        // Reset initial state
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        skillObserver.observe(category);
    });
});