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

// Partículas sutis
// Função que cria uma partícula
function createSubtleParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    15;
    particle.style.width = '35px';
    particle.style.height = '35px';
    particle.style.background = 'rgba(255, 107, 157, 0.9)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = '0.1';
    particle.style.position = 'absolute';

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
        }
    ).onfinish = () => {
        particle.remove();
    };
}

setInterval(() => {
    for (let i = 0; i < 2; i++) {
        createSubtleParticle();
    }
}, 700);

// Faz várias partículas surgirem constantemente
setInterval(() => {
    for (let i = 0; i < 2; i++) {
        createSubtleParticle();
    }
}, 3000);

setInterval(createSubtleParticle, 2000);

const floating = document.querySelector('.floating-image');

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        const rect = item.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Base positions (for desktop)
        let positions = [
            { offsetX: -300, offsetY: -50, rotation: -12 }, // Projetos
            { offsetX: -300, offsetY: -100, rotation: 10 }, // Oficinas
            { offsetX: -250, offsetY: -20, rotation: -23 }, // Trilhas
            { offsetX: -350, offsetY: -80, rotation: 15 }, // Notícias
            { offsetX: -280, offsetY: -120, rotation: -7 }, // Publicidade
            { offsetX: -320, offsetY: -40, rotation: 4 }, // Galeria
        ];

        // Adjust for tablet/mobile
        if (viewportWidth < 1024) {
            positions = positions.map((pos) => ({
                offsetX: pos.offsetX * 0.7,
                offsetY: pos.offsetY * 0.7,
                rotation: pos.rotation,
            }));
        }

        const position = positions[index] || positions[0];

        // Calculate position ensuring it stays within viewport bounds
        let x = rect.right + position.offsetX;
        let y = rect.top + position.offsetY;

        // Boundary checks
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

// Handle window resize
window.addEventListener('resize', () => {
    // This ensures positions are recalculated on resize
    // The mouseenter event will use the new positions when triggered
});
