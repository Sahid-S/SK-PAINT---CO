/* =================================================================
   SK PAINT CO. — Page interactions
   Reveal-on-scroll, stat counters, before/after slider, lightbox,
   and the WhatsApp contact-form handler. Chrome lives in components.js.
   ================================================================= */

/* ---------- REVEAL ON SCROLL ---------- */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
}

/* ---------- STAT COUNTERS ---------- */
function animateCounters(scope) {
  scope.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
const statsEl = document.querySelector('.stats-grid');
if (statsEl) {
  const so = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(statsEl); so.disconnect(); }
  }, { threshold: 0.4 });
  so.observe(statsEl);
}

/* ---------- BEFORE / AFTER COMPARISON SLIDER ---------- */
(function () {
  const wrap = document.getElementById('comparisonSlider');
  const container = document.getElementById('comparisonContainer');
  const after = document.getElementById('comparisonAfter');
  const divider = document.getElementById('comparisonDivider');
  const handle = document.getElementById('comparisonHandle');
  const tip = document.getElementById('comparisonTip');
  if (!wrap || !container || !after || !divider || !handle) return;

  let dragging = false;
  let touched = false;             // once interacted, tip shows the live percentage
  const clamp = (n) => Math.max(2, Math.min(98, n));

  function setPercent(pct) {
    pct = clamp(pct);
    const r = Math.round(pct);
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    divider.style.left = pct + '%';
    handle.style.left = pct + '%';
    handle.setAttribute('aria-valuenow', r);
    if (tip) {
      tip.style.left = pct + '%';
      if (touched) tip.textContent = `${r}% After`;
    }
  }
  const pctFromX = (x) => ((x - container.getBoundingClientRect().left) / container.offsetWidth) * 100;

  const startDrag = () => { dragging = true; touched = true; wrap.classList.add('dragging'); };
  const endDrag = () => { dragging = false; wrap.classList.remove('dragging'); };

  handle.addEventListener('mousedown', e => { startDrag(); e.preventDefault(); });
  handle.addEventListener('touchstart', () => { startDrag(); }, { passive: true });
  window.addEventListener('mousemove', e => { if (dragging) setPercent(pctFromX(e.clientX)); });
  window.addEventListener('touchmove', e => { if (dragging) setPercent(pctFromX(e.touches[0].clientX)); }, { passive: true });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
  wrap.addEventListener('click', e => {
    if (e.target !== handle && !handle.contains(e.target)) { touched = true; setPercent(pctFromX(e.clientX)); }
  });

  // Keyboard accessibility
  handle.addEventListener('keydown', e => {
    const cur = parseFloat(handle.style.left) || 50;
    touched = true;
    if (e.key === 'ArrowLeft') { setPercent(cur - 4); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPercent(cur + 4); e.preventDefault(); }
    if (e.key === 'Home') { setPercent(2); e.preventDefault(); }
    if (e.key === 'End') { setPercent(98); e.preventDefault(); }
  });

  setPercent(50);
})();

/* ---------- SCROLL PROGRESS BAR ---------- */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---------- GALLERY LIGHTBOX ---------- */
(function () {
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!items.length) return;

  const sources = items.map(el => el.querySelector('img')?.src).filter(Boolean);
  let index = 0;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image preview');
  box.innerHTML = `
    <button class="lightbox-close" aria-label="Close preview">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>
    <img alt="Project preview">
    <button class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>`;
  document.body.appendChild(box);

  const img = box.querySelector('img');
  const show = (i) => { index = (i + sources.length) % sources.length; img.src = sources[index]; };
  const open = (i) => { show(i); box.classList.add('open'); document.body.classList.add('nav-open'); };
  const close = () => { box.classList.remove('open'); document.body.classList.remove('nav-open'); };

  items.forEach((el, i) => {
    el.addEventListener('click', () => open(i));
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();

/* ---------- CONTACT FORM → WHATSAPP ---------- */
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Native validation first so required fields give visible feedback
  if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

  const get = (n) => contactForm.querySelector(`[name="${n}"]`)?.value.trim() || '—';
  const num = (window.SKP && window.SKP.WA_NUMBER) || '916374921410';
  const text =
    `*New Enquiry — SK Paint Co.*%0A%0A` +
    `*Name:* ${get('name')}%0A` +
    `*Phone:* ${get('phone')}%0A` +
    `*Service:* ${get('service')}%0A` +
    `*Message:* ${get('message')}`;
  window.open(`https://wa.me/${num}?text=${text}`, '_blank', 'noopener');
  showToast('Opening WhatsApp to send your enquiry…');
});

/* ---------- LIGHTWEIGHT TOAST ---------- */
function showToast(message) {
  let toast = document.querySelector('.skp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'skp-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 3600);
}
