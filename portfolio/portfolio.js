// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.innerWidth > 900) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for cursor
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Particle Background Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initCanvas() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(0, 240, 255, 0.4)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

initCanvas();
animateCanvas();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initCanvas();
});

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `${this.txt}`;

        let typeSpeed = 100;
        if (this.isDeleting) { typeSpeed /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', initTypewriter);

function initTypewriter() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksA = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        icon.classList.replace('ph-x', 'ph-list');
    }
});

navLinksA.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const heroTl = gsap.timeline();
heroTl.from('.subtitle', { y: -20, opacity: 0, duration: 0.5, delay: 0.2 })
    .from('.hero-title', { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
    .from('.typewriter', { opacity: 0, duration: 0.5 }, "-=0.3")
    .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
    .from('.cta-group a', { y: 20, opacity: 0, duration: 0.5, stagger: 0.2 }, "-=0.4")
    .from('.img-wrapper', { scale: 0.8, opacity: 0, duration: 1, ease: 'back.out(1.7)' }, "-=1");

// Scroll Animations for sections
const sections = ['#about', '#projects', '#skills', '#achievements', '#contact'];

sections.forEach(sec => {
    gsap.from(`${sec} .section-title`, {
        scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8
    });
});

// About Section Stats
gsap.from('.stat-card', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15
});

// Projects Stagger
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '#projects',
        start: 'top 75%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Skills Tags
gsap.from('.skill-tag', {
    scrollTrigger: {
        trigger: '#skills',
        start: 'top 80%',
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.5)'
});

// Achievements Timeline & List
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '#achievements',
        start: 'top 75%',
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15
});

gsap.from('.achievement-list li', {
    scrollTrigger: {
        trigger: '#achievements',
        start: 'top 75%',
    },
    x: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15
});
