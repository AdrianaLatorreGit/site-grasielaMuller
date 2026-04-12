// ─── Previne scroll horizontal globalmente ───
document.documentElement.style.overflowX = 'hidden';
document.body.style.overflowX = 'hidden';

// Cursor personalizado
const cursor = document.querySelector('.cursor');
let mouseX = 0,
    mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect no cursor
const hoverElements = document.querySelectorAll('a, button, .gallery-item');
hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});

// Smooth scrolling para links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Partículas sutis — position fixed para não causar scroll horizontal
function createSubtleParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = '35px';
    particle.style.height = '35px';
    particle.style.background = 'rgba(255, 107, 157, 0.9)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = '0.1';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';

    document.body.appendChild(particle);

    particle.animate(
        [
            { transform: 'translateY(0px)', opacity: 0.1 },
            {
                transform: `translateY(${window.innerHeight + 50}px)`,
                opacity: 0,
            },
        ],
        {
            duration: Math.random() * 10000 + 10000,
            easing: 'linear',
        },
    ).onfinish = () => {
        particle.remove();
    };
}

setInterval(() => {
    for (let i = 0; i < 2; i++) {
        createSubtleParticle();
    }
}, 700);

setInterval(() => {
    for (let i = 0; i < 2; i++) {
        createSubtleParticle();
    }
}, 3000);

setInterval(createSubtleParticle, 2000);

// Floating image no hover das gallery-items
const floating = document.querySelector('.floating-image');

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        const rect = item.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let positions = [
            { offsetX: -300, offsetY: -50, rotation: -12 },
            { offsetX: -300, offsetY: -100, rotation: 10 },
            { offsetX: -250, offsetY: -20, rotation: -23 },
            { offsetX: -350, offsetY: -80, rotation: 15 },
            { offsetX: -280, offsetY: -120, rotation: -7 },
            { offsetX: -320, offsetY: -40, rotation: 4 },
        ];

        if (viewportWidth < 1024) {
            positions = positions.map((pos) => ({
                offsetX: pos.offsetX * 0.7,
                offsetY: pos.offsetY * 0.7,
                rotation: pos.rotation,
            }));
        }

        const position = positions[index] || positions[0];

        let x = rect.right + position.offsetX;
        let y = rect.top + position.offsetY;

        if (x < 0) x = 10;
        if (x + floating.offsetWidth > viewportWidth) {
            x = viewportWidth - floating.offsetWidth - 10;
        }

        floating.style.transition =
            'opacity 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        floating.style.left = `${x}px`;
        floating.style.top = `${y}px`;
        floating.style.opacity = 1;
        floating.style.transform = `translate(0, 0) scale(1.5) rotate(${position.rotation}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        floating.style.transition = 'opacity 0.2s ease, transform 0.3s ease';
        floating.style.opacity = 0;
        floating.style.transform = 'scale(0.5) rotate(-20deg)';
    });
});

window.addEventListener('resize', () => {});

// ─── Nav Toggle ───
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        // Bloqueia apenas scroll vertical — não o horizontal
        document.body.style.overflowY = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflowY = '';
        });
    });
}

// ─── Footer ───
(function () {
    const canvas = document.getElementById('gf-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const footer = document.querySelector('.gf');
    const colors = [
        '#ff6b9d',
        '#ffa726',
        '#ab47bc',
        '#66bb6a',
        '#42a5f5',
        '#ff7043',
    ];
    let W,
        H,
        particles = [];

    function resize() {
        W = canvas.width = footer.offsetWidth;
        H = canvas.height = footer.offsetHeight;
    }

    function makeParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.35 + 0.08,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.018 + 0.004,
        };
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(Math.floor(W / 12), 100);
        for (let i = 0; i < count; i++) particles.push(makeParticle());
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const len = particles.length;

        for (let i = 0; i < len; i++) {
            const p = particles[i];
            p.pulse += p.pulseSpeed;
            const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = a;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        }

        ctx.globalAlpha = 1;
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = dx * dx + dy * dy;
                if (d < 6400) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - Math.sqrt(d) / 80) * 0.07;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(draw);
    }

    init();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 150);
    });

    const sparks = document.getElementById('gf-sparks');
    const sparkStyle = document.createElement('style');
    sparkStyle.textContent = `@keyframes sparkFloat {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        15%  { opacity: 1; }
        100% { transform: translateY(-90px) scale(0.2); opacity: 0; }
    }`;
    document.head.appendChild(sparkStyle);

    document.querySelectorAll('.gf-pill').forEach((pill) => {
        pill.addEventListener('mouseenter', function () {
            const fr = footer.getBoundingClientRect();
            const pr = this.getBoundingClientRect();
            for (let i = 0; i < 8; i++) {
                const s = document.createElement('div');
                const size = Math.random() * 5 + 2;
                s.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    left: ${pr.left - fr.left + Math.random() * pr.width}px;
                    top: ${pr.top - fr.top + pr.height / 2}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    pointer-events: none;
                    opacity: 0;
                    animation: sparkFloat ${0.7 + Math.random() * 0.5}s ${Math.random() * 0.15}s ease-out forwards;
                `;
                sparks.appendChild(s);
                setTimeout(() => s.remove(), 1400);
            }
        });
    });
})();
