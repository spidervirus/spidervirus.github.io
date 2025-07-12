// Matrix-style falling code background
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    const bg = document.getElementById('matrix-bg');
    bg.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function draw() {
        ctx.fillStyle = 'rgba(10, 15, 26, 0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px Share Tech Mono, monospace';
        ctx.fillStyle = '#39ff14';
        for (let i = 0; i < drops.length; i++) {
            let text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let interval = setInterval(draw, 50);

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    });
})();

// Typed.js for terminal-style intro
(function() {
    if (window.Typed) {
        new Typed('#typed-intro', {
            strings: [
                'Cybersecurity Specialist.',
                'Full Stack Developer.',
                'Matrix Enthusiast.',
                'Welcome to my Cyberpunk Portfolio!'
            ],
            typeSpeed: 45,
            backSpeed: 25,
            backDelay: 1200,
            startDelay: 400,
            loop: true,
            showCursor: true,
            cursorChar: '_',
        });
    }
})();

// Optionally, initialize particles.js for extra effect (uncomment to use)
// particlesJS.load('matrix-bg', 'particles.json', function() {
//   console.log('particles.js loaded');
// });

// GSAP glitch effect for hero h1 (optional, can be extended)
(function() {
    if (window.gsap) {
        gsap.to('.hero-content h1', {
            keyframes: [
                { x: -2, color: '#8f00ff', duration: 0.04 },
                { x: 2, color: '#00ffe7', duration: 0.04 },
                { x: 0, color: '#39ff14', duration: 0.04 },
            ],
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            duration: 0.12
        });
    }
})();

// 1. Animated neon skill bars on scroll
(function() {
    function animateSkillBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const value = bar.getAttribute('data-progress');
            bar.style.width = '0';
            bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        });
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const value = bar.getAttribute('data-progress');
                    bar.style.width = value + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));
    }
    if (document.readyState !== 'loading') animateSkillBars();
    else document.addEventListener('DOMContentLoaded', animateSkillBars);
})();

// 2. 3D/parallax project card hover effect with neon glow
(function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
            card.style.boxShadow = '0 0 32px #00ffe7, 0 0 16px #8f00ff';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
})();

// 3. Timeline items slide in from alternating sides with neon trails
(function() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
        item.style.opacity = 0;
        item.style.transform = `translateX(${i % 2 === 0 ? '-60px' : '60px'})`;
    });
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 1s cubic-bezier(0.4,0,0.2,1)';
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.boxShadow = '0 0 32px #39ff14, 0 0 16px #8f00ff';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    items.forEach(item => observer.observe(item));
})();

// 4. Cyberpunk animated border and glitch effect for .cta-button
(function() {
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('glitch-btn');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('glitch-btn');
        });
    });
})();

// 5. Neon social icon hover animation
(function() {
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 12px #00ffe7, 0 0 24px #8f00ff';
            link.style.transform = 'scale(1.2)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = '';
            link.style.transform = '';
        });
    });
})();

// 6. Glitch hover effect for all h2/h3 headings
(function() {
    function glitch(el) {
        el.classList.add('glitch-hover');
        setTimeout(() => el.classList.remove('glitch-hover'), 400);
    }
    document.querySelectorAll('h2, h3').forEach(h => {
        h.addEventListener('mouseenter', () => glitch(h));
    });
})();

// 7. Initialize particles.js for interactive background
(function() {
    if (window.particlesJS) {
        particlesJS('matrix-bg', {
            particles: {
                number: { value: 40 },
                color: { value: '#00ffe7' },
                shape: { type: 'circle' },
                opacity: { value: 0.2 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#39ff14',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: 80, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
})();

// Add glitch CSS for .glitch-btn and .glitch-hover via JS if not present
(function() {
    if (!document.getElementById('cyberpunk-glitch-style')) {
        const style = document.createElement('style');
        style.id = 'cyberpunk-glitch-style';
        style.innerHTML = `
        .glitch-btn {
            animation: cyberpunk-glitch 0.4s linear 2;
            border-image: linear-gradient(90deg, #00ffe7, #8f00ff, #39ff14) 1;
            box-shadow: 0 0 16px #8f00ff, 0 0 32px #00ffe7;
        }
        @keyframes cyberpunk-glitch {
            0% { filter: none; }
            20% { filter: blur(1px) hue-rotate(20deg); }
            40% { filter: blur(0.5px) hue-rotate(-20deg); }
            60% { filter: blur(1px) hue-rotate(10deg); }
            80% { filter: none; }
            100% { filter: none; }
        }
        .glitch-hover {
            animation: cyberpunk-glitch 0.4s linear 1;
            text-shadow: 0 0 8px #00ffe7, 0 0 16px #8f00ff;
        }
        `;
        document.head.appendChild(style);
    }
})();

// Custom neon cyberpunk cursor
(function() {
    const cursor = document.getElementById('cyber-cursor');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorX = mouseX, cursorY = mouseY;
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.22;
        cursorY += (mouseY - cursorY) * 0.22;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });
})();

// Animated SVGs: neon circuit lines and pulsing rings
(function() {
    const svgNS = 'http://www.w3.org/2000/svg';
    const container = document.getElementById('cyber-svg-animations');
    // Neon pulsing ring
    const ring = document.createElementNS(svgNS, 'svg');
    ring.setAttribute('width', '160');
    ring.setAttribute('height', '160');
    ring.setAttribute('style', 'position:absolute; left:10vw; top:20vh;');
    ring.innerHTML = `<circle cx="80" cy="80" r="60" stroke="#00ffe7" stroke-width="4" fill="none" filter="url(#glow)"/>
    <defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    container.appendChild(ring);
    // Neon circuit line
    const line = document.createElementNS(svgNS, 'svg');
    line.setAttribute('width', '220');
    line.setAttribute('height', '60');
    line.setAttribute('style', 'position:absolute; left:60vw; top:60vh;');
    line.innerHTML = `<polyline points="10,30 60,10 120,50 210,20" stroke="#39ff14" stroke-width="4" fill="none" filter="url(#glow2)"/>
    <defs><filter id="glow2"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    container.appendChild(line);
    // Animate SVGs with GSAP
    if (window.gsap) {
        gsap.to(ring.querySelector('circle'), {
            scale: 1.18,
            transformOrigin: '80px 80px',
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: 'power1.inOut',
            filter: 'drop-shadow(0 0 16px #00ffe7)'
        });
        gsap.to(line.querySelector('polyline'), {
            strokeDasharray: 400,
            strokeDashoffset: 400,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            onUpdate: function() {
                const poly = line.querySelector('polyline');
                poly.setAttribute('stroke-dasharray', '400');
                poly.setAttribute('stroke-dashoffset', this.targets()[0].strokeDashoffset);
            }
        });
    }
})();

// Inject animated SVG border for About photo
(function() {
    const borderDiv = document.querySelector('.about-svg-border');
    if (!borderDiv) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '160');
    svg.setAttribute('height', '160');
    svg.setAttribute('style', 'position:absolute; top:0; left:0; z-index:1; pointer-events:none;');
    svg.innerHTML = `<circle cx="80" cy="80" r="72" stroke="#00ffe7" stroke-width="4" fill="none" filter="url(#about-glow)"/>
    <defs><filter id="about-glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    borderDiv.insertBefore(svg, borderDiv.firstChild);
    if (window.gsap) {
        gsap.to(svg.querySelector('circle'), {
            scale: 1.08,
            transformOrigin: '80px 80px',
            repeat: -1,
            yoyo: true,
            duration: 1.3,
            ease: 'power1.inOut',
            filter: 'drop-shadow(0 0 16px #00ffe7)'
        });
    }
})();

// Theme switcher logic
(function() {
    const themes = ['cyberpunk', 'classic-hacker', 'synthwave', 'minimal-neon'];
    let current = 0;
    const body = document.body;
    const btn = document.getElementById('themeSwitcher');
    function setTheme(idx) {
        themes.forEach(t => body.classList.remove(t));
        body.classList.add(themes[idx]);
    }
    if (btn) {
        btn.addEventListener('click', () => {
            current = (current + 1) % themes.length;
            setTheme(current);
        });
    }
    // Default to cyberpunk
    setTheme(0);
})();

// Konami code easter egg for secret theme
(function() {
    const konami = [38,38,40,40,37,39,37,39,66,65];
    let pos = 0;
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === konami[pos]) {
            pos++;
            if (pos === konami.length) {
                document.body.classList.add('konami-theme');
                pos = 0;
            }
        } else {
            pos = 0;
        }
    });
})(); 