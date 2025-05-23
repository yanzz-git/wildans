document.addEventListener('DOMContentLoaded', () => {
  // Tangkap semua link internal (href mulai dengan # atau link halaman)
  const links = document.querySelectorAll('a[href^="#"], a[href^="./"], a[href^="/"], a[href^="http"]:not([target="_blank"])');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Kalau link adalah hash (#...) scroll biasa
      if (href.startsWith('#')) return;

      e.preventDefault();

      // Tambah kelas fade-out ke body
      document.body.classList.add('fade-out');

      // Setelah animasi selesai (0.5s), pindah halaman
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggle-mode');
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (userPrefersDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Scroll reveal animation
const revealSections = () => {
  document.querySelectorAll('.section').forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Star Background Animation
const canvas = document.createElement('canvas');
canvas.classList.add('background-stars');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
drawStars();

a
function animateBlurText() {
  const element = document.getElementById('blur-text');
  if (!element) return; // jika elemen tidak ada, hentikan

  const text = element.textContent.trim();
  const words = text.split(' ');

  element.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.filter = 'blur(8px)';
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(20px)';
    span.style.animation = `blurIn 0.8s forwards`;
    span.style.animationDelay = `${index * 0.2}s`;
    element.appendChild(span);
    element.appendChild(document.createTextNode(' '));
  });
}

// Jalankan fungsi saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  animateBlurText();
});

