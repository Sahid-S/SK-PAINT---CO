/* =================================================================
   SK PAINT CO. — Shared UI components
   Single source of truth for header, mobile nav, footer & floating
   actions. Injected into every page so chrome is edited in ONE place.
   ================================================================= */

const PHONE = '+916374921410';
const PHONE_DISPLAY = '+91 63749 21410';
const WA_NUMBER = '916374921410';
const WA_TEXT = encodeURIComponent("Hi SK Paint Co., I'd like a free quote.");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
const EMAIL = 'skpaintco.mdu@gmail.com';

/* ---- Reusable inline SVG icons (currentColor-friendly) ---- */
const ICON = {
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>',
};

const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'services.html', label: 'Services' },
  { href: 'contact.html', label: 'Contact' },
];

const currentPage = (location.pathname.split('/').pop() || 'index.html');

const navLinks = (cls) => NAV.map(n => {
  const active = n.href === currentPage || (currentPage === '' && n.href === 'index.html');
  return `<a href="${n.href}" class="${cls}${active ? ' active' : ''}"${active ? ' aria-current="page"' : ''}>${n.label}</a>`;
}).join('');

/* ---------- HEADER + MOBILE NAV ---------- */
function renderHeader() {
  return `
  <header class="header" id="header">
    <div class="container header-inner">
      <a href="index.html" class="logo" aria-label="SK Paint Co. — Home">
        <img src="images/Logo.png" alt="SK Paint Co. logo" class="logo-img"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="logo-fallback" style="display:none"><b>SK Paint Co.</b><small>Perfect Finish</small></span>
      </a>
      <nav class="nav-links" aria-label="Primary">${navLinks('')}</nav>
      <div class="header-cta">
        <a href="tel:${PHONE}" class="btn btn-outline-navy">${ICON.phone} Call Now</a>
        <a href="${WA_LINK}" class="btn btn-primary" target="_blank" rel="noopener">Get Free Quote</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="nav-backdrop" id="nav-backdrop"></div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
    ${navLinks('')}
    <div class="mobile-cta">
      <a href="tel:${PHONE}" class="btn btn-navy">${ICON.phone} Call ${PHONE_DISPLAY}</a>
      <a href="${WA_LINK}" class="btn btn-whatsapp" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp Us</a>
    </div>
  </nav>`;
}

/* ---------- FOOTER ---------- */
function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="index.html" class="logo">
            <img src="images/Logo.png" alt="SK Paint Co." class="logo-img"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span class="logo-fallback" style="display:none"><b>SK Paint Co.</b></span>
          </a>
          <p>Professional painting services in Madurai. We bring quality, trust, and the perfect finish to every home and commercial space.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div class="footer-links">${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}</div>
        </div>
        <div>
          <h4>Services</h4>
          <div class="footer-links">
            <a href="services.html">Interior Painting</a>
            <a href="services.html">Exterior Painting</a>
            <a href="services.html">Rental Repainting</a>
            <a href="services.html">Wall Putty &amp; Finishing</a>
          </div>
        </div>
        <div>
          <h4>Contact Us</h4>
          <div class="footer-links">
            <a href="tel:${PHONE}">${ICON.phone} ${PHONE_DISPLAY}</a>
            <a href="${WA_LINK}" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp</a>
            <a href="mailto:${EMAIL}">${ICON.mail} ${EMAIL}</a>
            <p>${ICON.pin} Madurai, Tamil Nadu</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="year"></span> SK Paint Co. All rights reserved.</p>
        <p>Painting Services in Madurai | House Painters in Madurai</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- FLOATING ACTIONS ---------- */
function renderFloating() {
  return `
  <a href="${WA_LINK}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${ICON.whatsapp}</a>
  <div class="mobile-bar" aria-label="Quick actions">
    <a href="tel:${PHONE}" class="btn btn-navy">${ICON.phone} Call Now</a>
    <a href="${WA_LINK}" class="btn btn-whatsapp" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp</a>
  </div>`;
}

/* ---------- MOUNT + WIRE UP ---------- */
function mount(id, html) { const el = document.getElementById(id); if (el) el.outerHTML = html; }

mount('app-header', renderHeader());
mount('app-footer', renderFooter());
mount('app-floating', renderFloating());

// Current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Header scroll shadow
const header = document.getElementById('header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const backdrop = document.getElementById('nav-backdrop');
function setNav(open) {
  mobileNav.classList.toggle('open', open);
  backdrop.classList.toggle('show', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('nav-open', open);
}
if (hamburger && mobileNav && backdrop) {
  hamburger.addEventListener('click', () => setNav(!mobileNav.classList.contains('open')));
  backdrop.addEventListener('click', () => setNav(false));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
}

// Expose shared constants for page scripts
window.SKP = { PHONE, WA_NUMBER };
