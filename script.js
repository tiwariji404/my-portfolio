/* ==========================================================================
   Om Tiwari Portfolio — Enhanced Interactive Logic 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    lucide?.createIcons();

    initRoleSwitcher();
    initContactForm();
    initMobileMenu();
    initScrollSpy();
    initScrollReveal();
    initNavbarScroll();
    initTiltCards();
    initCursorGlow();
    initParticles();
});

/* ─── 1. TYPING ROLE SWITCHER ─── */
function initRoleSwitcher() {
    const el = document.getElementById('roleText');
    if (!el) return;

    const roles = [
        'React Native & Mobile Apps',
        'AI & Machine Learning',
        'Data Structures & Algorithms',
        'Full-Stack Web Engineering',
        'Community Leadership'
    ];

    let rIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const current = roles[rIdx];
        el.textContent = deleting
            ? current.slice(0, cIdx - 1)
            : current.slice(0, cIdx + 1);

        deleting ? cIdx-- : cIdx++;

        let delay = deleting ? 35 : 75;

        if (!deleting && cIdx === current.length) {
            delay = 2200;
            deleting = true;
        } else if (deleting && cIdx === 0) {
            deleting = false;
            rIdx = (rIdx + 1) % roles.length;
            delay = 350;
        }

        setTimeout(tick, delay);
    }
    tick();
}

/* ─── 2. NAVBAR SCROLL EFFECT ─── */
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const handler = () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handler, { passive: true });
}

/* ─── 3. CONTACT FORM ─── */
function initContactForm() {
    const form   = document.getElementById('mainContactForm');
    const status = document.getElementById('cStatus');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        
        // Loading state
        btn.innerHTML = '<span>Sending...</span><i data-lucide="loader-2" class="spin-icon"></i>';
        lucide?.createIcons();

        setTimeout(() => {
            status.innerHTML = `
                <div style="
                    display: flex; align-items: center; gap: 0.6rem;
                    color: #34d399; font-weight: 600;
                    background: rgba(52,211,153,0.08);
                    border: 1px solid rgba(52,211,153,0.25);
                    padding: 0.9rem 1.2rem; border-radius: 10px;
                    margin-top: 0.75rem; animation: fadeSlideUp 0.4s ease both;
                ">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Message sent! I'll get back to you shortly.
                </div>`;
            btn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
            lucide?.createIcons();
            form.reset();
            setTimeout(() => status.innerHTML = '', 5000);
        }, 1400);
    });
}

/* ─── 4. MOBILE MENU ─── */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu   = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.innerHTML = open
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';
        lucide?.createIcons();
    });

    // Close on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.innerHTML = '<i data-lucide="menu"></i>';
            lucide?.createIcons();
        });
    });
}

/* ─── 5. SCROLL SPY ─── */
function initScrollSpy() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => obs.observe(s));
}

/* ─── 6. SCROLL REVEAL ─── */
function initScrollReveal() {
    // Add reveal class to all major cards
    const targets = document.querySelectorAll(
        '.role-card, .skill-cat-card, .project-item-card, .cert-card, ' +
        '.objective-card, .education-card, .c-item'
    );

    targets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => obs.observe(el));
}

/* ─── 7. TILT CARDS ─── */
function initTiltCards() {
    const cards = document.querySelectorAll('.project-item-card, .photo-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width  / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            const tiltX  = dy * -8;
            const tiltY  = dx *  8;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => card.style.transition = '', 500);
        });
    });
}

/* ─── 8. CURSOR GLOW ─── */
function initCursorGlow() {
    if (window.innerWidth < 768) return; // desktop only

    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        transition: 'opacity 0.3s ease',
        mixBlendMode: 'screen'
    });
    document.body.appendChild(cursor);

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    function animate() {
        cx += (mx - cx) * 0.12;
        cy += (my - cy) * 0.12;
        cursor.style.left = cx + 'px';
        cursor.style.top  = cy + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/* ─── 9. PARTICLES ─── */
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '-1',
        opacity: '0.5'
    });
    document.body.appendChild(canvas);

    const ctx    = canvas.getContext('2d');
    const COUNT  = 55;
    let   W, H, particles;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x:  Math.random() * W,
            y:  Math.random() * H,
            r:  Math.random() * 1.5 + 0.4,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.5 ? '34, 211, 238' : '167, 139, 250'
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, createParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.12;
                    ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                    ctx.lineWidth   = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw dots
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
        particles = Array.from({ length: COUNT }, createParticle);
    });

    init();
    draw();
}

/* ─── SPIN ANIMATION ─── */
const style = document.createElement('style');
style.innerHTML = `
    .spin-icon { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
