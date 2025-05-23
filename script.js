document.addEventListener('DOMContentLoaded', () => {
  // Tangkap semua link internal (href mulai dengan # atau link halaman)
  const links = document.querySelectorAll('a[href^="#"], a[href^="./"], a[href^="/"], a[href^="http"]:not([target="_blank"])');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href.startsWith('#')) return;

      e.preventDefault();

      // Tambah kelas fade-out ke body
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });

  // Animasi blur untuk semua elemen dengan class 'blur-text'
  function animateBlurText() {
    const elements = document.querySelectorAll('.blur-text');
    elements.forEach(element => {
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
        span.style.animationDelay = `${index * 0.3}s`;
        element.appendChild(span);

        // Tambahkan spasi antar kata
        if (index < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    });
  }

  animateBlurText();

  // Theme toggle (gelap/terang)
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  function updateToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '🌞';
  }

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);
  } else {
    // Jika tidak ada tema tersimpan, cek preferensi sistem
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateToggleIcon(defaultTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
  });
  
const hamburgerToggle = document.getElementById('hamburger-toggle');
const navLinks = document.querySelector('.nav-links');

hamburgerToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburgerToggle.classList.toggle('active');

  // Update aria-expanded untuk aksesibilitas
  const expanded = hamburgerToggle.classList.contains('active');
  hamburgerToggle.setAttribute('aria-expanded', expanded);
});
});