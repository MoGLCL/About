/**
 * MENNA SULTAN PORTFOLIO - HERO SECTION SCRIPT
 * Vanilla JavaScript implementation for interactive animations, typing effect,
 * scroll reveals, 3D glassmorphism tilt, and light/dark theme switcher.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. TYPING EFFECT FOR ROLE
       -------------------------------------------------------------------------- */
    const initTypingEffect = () => {
        const typingTextElement = document.getElementById('typing-text');
        if (!typingTextElement) return;

        // Roles to cycle (Primary role explicitly "Frontend Developer")
        const roles = [
            'Frontend Developer',
            'UI/UX Enthusiast',
            'Clean Code Creator'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                // Erase character
                typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster deleting speed
            } else {
                // Add character
                typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 110; // Normal typing speed
            }

            // Word completion state
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of the word
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        };

        // Start typing effect loop
        type();
    };

    /* --------------------------------------------------------------------------
       2. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-element');

        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger effect for items
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            revealElements.forEach(el => el.classList.add('active'));
        }
    };

    /* --------------------------------------------------------------------------
       3. 3D TILT & GLOW EFFECT ON PROFILE CARD
       -------------------------------------------------------------------------- */
    const init3DTiltEffect = () => {
        const card = document.getElementById('profile-card');
        if (!card) return;

        // Disable 3D tilt on touch devices for smoother scrolling
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse x position inside card
            const y = e.clientY - rect.top;  // Mouse y position inside card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt angle (-10deg to 10deg max)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    };

    /* --------------------------------------------------------------------------
       4. INTERACTIVE HOVER RIPPLE / PARALLAX FOR SKILL CARDS
       -------------------------------------------------------------------------- */
    const initSkillCardInteractions = () => {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Pause floating animation on hover for precision focus
                card.style.animationPlayState = 'paused';
            });

            card.addEventListener('mouseleave', () => {
                card.style.animationPlayState = 'running';
            });
        });
    };

    /* --------------------------------------------------------------------------
       5. THEME TOGGLE SWITCHER (Girly Light Mode / Dark Mode)
       -------------------------------------------------------------------------- */
    const initThemeToggle = () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const heroSection = document.getElementById('hero-section') || document.documentElement;
        const themeText = themeToggleBtn?.querySelector('.theme-text');

        // Check stored theme preference
        const savedTheme = localStorage.getItem('menna_portfolio_theme');
        if (savedTheme === 'light') {
            heroSection.setAttribute('data-theme', 'light');
            if (themeText) themeText.textContent = 'Dark Mode';
        }

        if (!themeToggleBtn) return;

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = heroSection.getAttribute('data-theme');
            if (currentTheme === 'light') {
                heroSection.removeAttribute('data-theme');
                localStorage.setItem('menna_portfolio_theme', 'dark');
                if (themeText) themeText.textContent = 'Girly Light';
            } else {
                heroSection.setAttribute('data-theme', 'light');
                localStorage.setItem('menna_portfolio_theme', 'light');
                if (themeText) themeText.textContent = 'Dark Mode';
            }
        });
    };

    /* --------------------------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------------------------- */
    initTypingEffect();
    initScrollReveal();
    init3DTiltEffect();
    initSkillCardInteractions();
    initThemeToggle();
});
