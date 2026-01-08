// ==========================================
// Portfolio Script - Windows 7 Aero Edition
// ==========================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeroSelector();
    initFAQAccordions();
    initLockedSections();
    initMobileMenu();
    initTaskbarClock();
    initThemeToggle();
    initSmoothScrolling();
    initWindowEffects();
});

// ==========================================
// LOADER
// ==========================================
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            loader.style.pointerEvents = 'none';
        }, 2000);
    }
}

// ==========================================
// HERO CHARACTER SELECTOR
// ==========================================
function initHeroSelector() {
    const playerOptions = document.querySelectorAll('.hero__option');
    const heroTitle = document.querySelector('.hero__title');
    const heroPicture = document.querySelector('.hero__mypicture');

    playerOptions.forEach((option) => {
        option.addEventListener('click', (e) => {
            // Update main image and title
            heroTitle.textContent = e.target.alt;
            heroPicture.src = e.target.src;

            // Add selection effect
            playerOptions.forEach(opt => opt.style.opacity = '0.6');
            e.target.style.opacity = '1';

            // Add a subtle animation
            heroPicture.style.transform = 'scale(0.95)';
            setTimeout(() => {
                heroPicture.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==========================================
// FAQ ACCORDIONS
// ==========================================
function initFAQAccordions() {
    const accordions = document.querySelectorAll('.questions__acordeon');

    accordions.forEach((accordion) => {
        accordion.addEventListener('click', () => {
            const answer = accordion.querySelector('.questions__answer');
            const isOpen = !answer.classList.contains('questions--hidden');

            // Close all other accordions
            accordions.forEach(acc => {
                const ans = acc.querySelector('.questions__answer');
                ans.classList.add('questions--hidden');
            });

            // Toggle current accordion
            if (!isOpen) {
                answer.classList.remove('questions--hidden');
            }
        });
    });
}

// ==========================================
// LOCKED SECTIONS
// ==========================================
function initLockedSections() {
    const lockedSections = document.querySelectorAll('.locked');

    lockedSections.forEach((lockedElement) => {
        let timer;

        lockedElement.addEventListener('mousedown', () => {
            timer = setTimeout(() => {
                lockedElement.classList.remove('locked');
                lockedElement.style.maxHeight = 'none';
            }, 2000);
        });

        lockedElement.addEventListener('mouseup', () => {
            clearTimeout(timer);
        });

        lockedElement.addEventListener('mouseleave', () => {
            clearTimeout(timer);
        });

        // Touch support
        lockedElement.addEventListener('touchstart', () => {
            timer = setTimeout(() => {
                lockedElement.classList.remove('locked');
                lockedElement.style.maxHeight = 'none';
            }, 2000);
        });

        lockedElement.addEventListener('touchend', () => {
            clearTimeout(timer);
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const links = document.querySelectorAll('.header__link');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('collapsed');
        });

        // Close menu when clicking a link
        links.forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.add('collapsed');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !menu.classList.contains('collapsed')) {
                menu.classList.add('collapsed');
            }
        });
    }
}

// ==========================================
// TASKBAR CLOCK
// ==========================================
function initTaskbarClock() {
    const timeElement = document.getElementById('taskbar-time');
    const dateElement = document.getElementById('taskbar-date');

    function updateClock() {
        const now = new Date();

        // Format time
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}`;
        }

        // Format date
        if (dateElement) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('es-ES', options);
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// THEME TOGGLE
// ==========================================
function initThemeToggle() {
    const toggleButton = document.querySelector('.random__button');
    const body = document.querySelector('.darkmode');

    if (toggleButton && body) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('darkmode');

            // Add rotation animation
            const svg = toggleButton.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    svg.style.transform = 'rotate(0deg)';
                }, 500);
            }
        });
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
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

    // Update active taskbar item on scroll
    const sections = document.querySelectorAll('section[id]');
    const taskbarItems = document.querySelectorAll('.taskbar__item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        taskbarItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// ==========================================
// WINDOW EFFECTS
// ==========================================
function initWindowEffects() {
    const windows = document.querySelectorAll('.window-aero');

    // Intersection Observer for window animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    windows.forEach(win => {
        win.style.opacity = '0';
        win.style.transform = 'translateY(20px)';
        win.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(win);
    });

    // Window control button effects
    const closeButtons = document.querySelectorAll('.window-btn--close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const window = e.target.closest('.window-aero');
            if (window) {
                window.style.transform = 'scale(0.95)';
                window.style.opacity = '0.7';
                setTimeout(() => {
                    window.style.transform = '';
                    window.style.opacity = '';
                }, 300);
            }
        });
    });

    // Minimize button effect
    const minimizeButtons = document.querySelectorAll('.window-btn--minimize');
    minimizeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const window = e.target.closest('.window-aero');
            if (window) {
                window.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    window.style.transform = '';
                }, 200);
            }
        });
    });
}

// ==========================================
// PARALLAX EFFECT FOR HERO (Optional)
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight * 0.5);
    }
});
