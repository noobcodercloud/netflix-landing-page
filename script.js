// ========== LOADING SCREEN FUNCTIONALITY ==========
// Hides the loading screen after page fully loads
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    // Fade out the loading screen
    loader.style.opacity = '0';
    // Remove from DOM after fade animation completes
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// ========== FAQ ACCORDION FUNCTIONALITY ==========
// Select all question elements
const questions = document.querySelectorAll('.que');

// Add click event listener to each question
questions.forEach((question) => {
    // Create and add plus icon to each question
    const toggleIcon = document.createElement('span');
    toggleIcon.textContent = '+';
    toggleIcon.className = 'toggle-icon';
    question.appendChild(toggleIcon);
    
    // Toggle answer visibility on click
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isCurrentlyOpen = !answer.classList.contains('ansHidden');
        
        // Close all other answers first (accordion behavior)
        questions.forEach((otherQuestion) => {
            const otherAnswer = otherQuestion.nextElementSibling;
            if (otherAnswer !== answer) {
                otherAnswer.classList.add('ansHidden');
                otherQuestion.querySelector('.toggle-icon').textContent = '+';
                otherQuestion.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current answer
        if (answer && answer.classList.contains('ans')) {
            answer.classList.toggle("ansHidden");
            toggleIcon.textContent = isCurrentlyOpen ? '+' : '×';
            question.setAttribute('aria-expanded', isCurrentlyOpen ? 'false' : 'true');
        }
    });

    // Add keyboard accessibility (Enter and Space keys)
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ========== SCROLL ANIMATION FUNCTIONALITY ==========
// Configuration for Intersection Observer
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
};

// Create Intersection Observer to animate elements on scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            entry.target.classList.add('animate-in');
            // Optional: Stop observing after animation (better performance)
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply scroll animation to cards and FAQ items
document.querySelectorAll('.card, .card2, .que').forEach(element => {
    // Set initial state (hidden and translated down)
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    // Start observing the element
    scrollObserver.observe(element);
});

// ========== EMAIL VALIDATION (OPTIONAL ENHANCEMENT) ==========
// Get all email inputs
const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        // Basic email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value && !emailPattern.test(this.value)) {
            // Add error styling
            this.style.borderColor = '#e50914';
        } else {
            // Reset to normal
            this.style.borderColor = 'rgba(128, 128, 128, 0.6)';
        }
    });
});

// ========== SMOOTH SCROLL (OPTIONAL ENHANCEMENT) ==========
// Enable smooth scrolling for all anchor links
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