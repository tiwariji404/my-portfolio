/* ==========================================================================
   Om Tiwari Developer Portfolio - Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Role Switcher Typing Effect
    initRoleSwitcher();

    // 3. Contact Form Submission
    initContactForm();

    // 4. Mobile Menu Toggle
    initMobileMenu();

    // 5. Active Scroll Navigation
    initScrollSpy();
});

function initRoleSwitcher() {
    const roleElement = document.getElementById('roleText');
    if (!roleElement) return;

    const roles = [
        'React Native & Mobile Apps',
        'AI & Machine Learning',
        'Data Structures & Algorithms (DSA)',
        'Full-Stack Web Engineering'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let delta = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            delta = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delta = 400;
        }

        setTimeout(type, delta);
    }

    type();
}

function initContactForm() {
    const form = document.getElementById('mainContactForm');
    const status = document.getElementById('cStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (status) {
                status.innerHTML = '<p style="color: var(--accent-emerald); font-weight: 600; margin-top: 1rem;">✅ Message sent! I will respond to your email shortly.</p>';
                form.reset();
                setTimeout(() => {
                    status.innerHTML = '';
                }, 5000);
            }
        });
    }
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
        });
    }
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
