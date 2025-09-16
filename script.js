document.addEventListener('DOMContentLoaded', () => {
    
    // --- ScrollReveal Animations Setup ---
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 200,
        reset: false, // Animations will only happen once
    });

    // --- Applying Animations ---
    // Generic classes
    sr.reveal('.reveal-up', { interval: 150 });
    
    // Hero Section
    sr.reveal('.typewriter-text', { delay: 400 });
    sr.reveal('.btn-primary-hero', { delay: 600, origin: 'left' });
    sr.reveal('.btn-secondary-hero', { delay: 600, origin: 'right' });

    // Staggered animations for lists of items
    sr.reveal('.skill-card', { interval: 80, scale: 0.9, origin: 'top' });
    sr.reveal('.project-card', { interval: 150, origin: 'left' });
    sr.reveal('.timeline-item', { interval: 200, origin: 'left' });
    sr.reveal('.certificate-card', { interval: 150, origin: 'right' });

    // --- Particle.js Initialization ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 40, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false } }, "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 } } },
            "retina_detect": true
        });
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const phrases = JSON.parse(typewriterElement.dataset.phrases);
        let phraseIndex = 0, charIndex = 0, isDeleting = false;
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
            }
            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentPhrase.length + 1) {
                speed = 1500; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500;
            }
            setTimeout(typeWriter, speed);
        }
        typeWriter();
    }

    // --- Mobile Menu & Navigation Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
    const header = document.querySelector('header');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.add('opacity-100'), 10);
        mobileMenuButton.classList.add('open');
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('opacity-100');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        mobileMenuButton.classList.remove('open');
    };

    closeMobileMenuButton.addEventListener('click', closeMenu);

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                if (!mobileMenu.classList.contains('hidden')) closeMenu();
            }
        });
    });

    // Active Nav Link Highlighting
    const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-link');
    const sections = document.querySelectorAll('main section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - header.offsetHeight - 50) {
                current = section.getAttribute('id');
            }
        });
        
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});