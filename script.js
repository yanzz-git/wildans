// Smooth scroll and fade transition
function handleSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const links = document.querySelectorAll('a[href^="#"], a[href^="./"], a[href^="/"], a[href^="http"]:not([target="_blank"])');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) return;
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => window.location.href = href, 500);
    });
  });
}

// Blur text animation
function animateBlurText() {
  const elements = document.querySelectorAll('.blur-text');
  elements.forEach(element => {
    const words = element.textContent.trim().split(' ');
    element.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.cssText = 'filter: blur(8px); opacity: 0; display: inline-block; transform: translateY(20px);';
      span.style.animation = `blurIn 0.8s forwards`;
      span.style.animationDelay = `${i * 0.3}s`;
      element.appendChild(span);
      if (i < words.length - 1) element.appendChild(document.createTextNode(' '));
    });
  });
}

// Theme toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  function updateIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '🌞';
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateIcon(theme);
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });
}

// Mobile navbar toggle
function setupNavbarToggle() {
  const toggle = document.getElementById('hamburger-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
  });
}

// Circular gallery
  const gallery = document.querySelector('.circular-gallery');
  if (gallery) {
    const circle = gallery.querySelector('.circle');

    const itemsData = [
      { image: 'https://picsum.photos/seed/1/400/600', text: 'Bridge' },
      { image: 'https://picsum.photos/seed/2/400/600', text: 'Desk Setup' },
      { image: 'https://picsum.photos/seed/3/400/600', text: 'Waterfall' },
      { image: 'https://picsum.photos/seed/4/400/600', text: 'Strawberries' },
      { image: 'https://picsum.photos/seed/5/400/600', text: 'Deep Diving' },
      { image: 'https://picsum.photos/seed/6/400/600', text: 'Train Track' },
    ];

    const radius = 250;
    let angle = 0;
    const angleStep = 360 / itemsData.length;

    itemsData.forEach(item => {
      const el = document.createElement('div');
      el.className = 'item';
      el.style.backgroundImage = `url(${item.image})`;
      el.innerText = item.text;
      circle.appendChild(el);
    });

    const items = circle.querySelectorAll('.item');

    function positionItems() {
      items.forEach((item, i) => {
        const itemAngle = i * angleStep + angle;
        const rad = (itemAngle * Math.PI) / 180;
        const x = radius * Math.sin(rad);
        const z = radius * Math.cos(rad);

        item.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${z < 0 ? 0.8 : 1})`;
        item.style.opacity = z < 0 ? 0.2 : 1;
      });
    }

    let isDragging = false;
    let startX = 0;
    let currentAngle = 0;

    function startDrag(x) {
      isDragging = true;
      startX = x;
      currentAngle = angle;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      angle = Math.round(angle / angleStep) * angleStep;
    }

    function drag(x) {
      if (!isDragging) return;
      const deltaX = x - startX;
      angle = currentAngle + deltaX * 0.5;
      positionItems();
    }

    gallery.addEventListener('mousedown', e => startDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', e => drag(e.clientX));

    gallery.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchmove', e => drag(e.touches[0].clientX));

    positionItems();
  }

// Background particles
const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 10 + 10;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.colorPhase = Math.random() * Math.PI * 2;
      this.segments = 6 + Math.floor(Math.random() * 3); // 6-8 potongan
    }

    draw(ctx, time) {
      const segmentAngle = (Math.PI * 2) / this.segments;
      const gap = segmentAngle * 0.35;

      const r = 0;
      const g = Math.floor(64 + Math.sin(time + this.colorPhase) * 64);
      const b = Math.floor(170 + Math.cos(time + this.colorPhase) * 85);
      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0; // Tidak ada bayangan

      const angleOffset = this.rotation + time * this.rotationSpeed;

      for (let i = 0; i < this.segments; i++) {
        const startAngle = i * segmentAngle + angleOffset;
        const endAngle = startAngle + segmentAngle - gap;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
        ctx.stroke();
      }
    }
  }

  const particles = Array.from({ length: 15 }, () => new Particle()); // Lebih sedikit

  function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = time * 0.001;

    for (let p of particles) {
      p.draw(ctx, t);
    }

    requestAnimationFrame(animate);
  }

  animate();

// ✅ Scroll-triggered animation (FIXED)
// Scroll animation observer
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Comment baris di bawah jika ingin animasi tidak satu kali
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  handleSmoothScroll();
  setupScrollAnimations();
  setupNavbarToggle(); // ← Tambahkan ini agar hamburger berfungsi
});

// Pembatas
document.addEventListener('DOMContentLoaded', () => {
  const dividers = document.querySelectorAll('.glow-particle-divider');
  const totalLines = 15;
  const delayStep = 1;

  dividers.forEach(divider => {
    for (let i = 0; i < totalLines; i++) {
      const line = document.createElement('div');
      line.className = 'glow-line';
      line.style.top = `${i * 0}px`; // Jarak antar garis vertikal (rapat)
      line.style.animationDelay = `${i * delayStep}s`;
      divider.appendChild(line);
    }
  });
});