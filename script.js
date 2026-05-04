// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== MOBILE NAV TOGGLE =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
// Close on link click
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('[name="name"]')?.value || '';
  const phone = contactForm.querySelector('[name="phone"]')?.value || '';
  const service = contactForm.querySelector('[name="service"]')?.value || '';
  const message = contactForm.querySelector('[name="message"]')?.value || '';
  const text = `Hello SK Paint Co.!%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
  window.open(`https://wa.me/916374921410?text=${text}`, '_blank');
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
  });
}
// Trigger counters when hero stats become visible
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsEl);
    }
  });
  statsObserver.observe(statsEl);
}

// ===== BEFORE & AFTER COMPARISON SLIDER =====
const compSlider = document.getElementById('comparisonSlider');
const compContainer = document.getElementById('comparisonContainer');
const compAfter = document.getElementById('comparisonAfter');
const compDivider = document.getElementById('comparisonDivider');
const compHandle = document.getElementById('comparisonHandle');

if (compSlider && compContainer && compAfter && compDivider && compHandle) {
  let dragging = false;

  function getPercent(clientX) {
    const rect = compContainer.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  }
  function updateSlider(pct) {
    compAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    compDivider.style.left = pct + '%';
    compHandle.style.left = pct + '%';
  }

  compHandle.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
  compHandle.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); }, { passive: false });
  document.addEventListener('mousemove', (e) => { if (dragging) updateSlider(getPercent(e.clientX)); });
  document.addEventListener('touchmove', (e) => { if (dragging) updateSlider(getPercent(e.touches[0].clientX)); }, { passive: false });
  document.addEventListener('mouseup', () => { dragging = false; });
  document.addEventListener('touchend', () => { dragging = false; });
  compSlider.addEventListener('click', (e) => { if (e.target !== compHandle) updateSlider(getPercent(e.clientX)); });

  updateSlider(50);
}
