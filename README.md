# SK PAINT & CO — Project Overview

This repository is a small static website for a local painting business (SK Paint Co.). The site is pure HTML/CSS/JS with a simple component injector (`components.js`) that mounts shared chrome (header, footer, floating actions) into each page.

**Primary pages and assets**
- [index.html](index.html) — Homepage with hero, services, before/after slider, gallery, testimonials, CTA.
- [about.html](about.html) — (Present in repo) About page layout.
- [services.html](services.html) — Services detail page(s).
- [contact.html](contact.html) — Contact page and form.
- [style.css](style.css) — Single stylesheet / design system and utilities.
- [components.js](components.js) — Renders header, footer, floating actions, and mobile nav.
- [script.js](script.js) — Page interactions: reveals, counters, slider, lightbox, contact→WhatsApp.
- `images/` — project images (hero, before/after, thumbnails, logo).

Quick analysis
- Design: Modern, navy+orange system with good spacing, consistent tokens and Poppins/Inter typography. Visual hierarchy is strong already.
- Accessibility: Good start (semantic sections, keyboard support in lightbox/slider). Needs improvements: focus trapping in mobile nav, explicit ARIA on some controls, and contrast checks for some accent text.
- Performance: CSS is clean; large background images are used as full-bleed backgrounds without `srcset`/WebP fallbacks — optimizing images will yield the largest gains. Some heavy `backdrop-filter` usage may impact mobile rendering.
- UX/Conversion: Clear CTAs (call & WhatsApp). Hero could benefit from a visible hero-card with stacked CTAs on mobile and stronger primary CTA styling (gradient) for conversions.

Recommended next actions (prioritized)
1. Add responsive `picture`/`srcset` for the hero and gallery images and provide WebP derivatives (800px/1600px).
2. Improve mobile nav accessibility: trap focus when open, restore focus on close, set `aria-hidden` on background content.
3. Update primary CTA style to an accessible gradient with higher contrast and larger tap targets on mobile.
4. Improve comparison slider accessibility: expose `aria-valuetext`, show percent tooltip during drag, and ensure keyboard increments announce changes.
5. Add `window.trackEvent(name, data)` stub and append UTM params to WhatsApp CTAs for basic tracking.
6. Reduce `backdrop-filter` effect on low-power devices and provide a solid fallback.

How to preview locally
- Preview the site with a simple static server (Python):

```bash
# from the project root
python -m http.server 8000
# open http://localhost:8000 in your browser
```

- Or use any static server you prefer (Live Server extension, `http-server`, etc.).

Image optimization suggestions
- Add WebP variants for the main images. Suggested filenames and targets:
  - `images/hero-800.webp` (800w) — quality 70
  - `images/hero-1600.webp` (1600w) — quality 70
  - `images/before-after-1-800.webp`, `before-after-1-1200.webp` (and same for other gallery images) — quality 70
  - `images/thumb-480.webp` for gallery thumbnails
- Add `srcset` + `sizes` attributes and keep JPG/PNG fallbacks for older browsers.

QA checklist (manual validation)
- Hero
  - [ ] Hero image loads responsive WebP/fallback at different viewport widths.
  - [ ] Primary CTA is visually prominent, focuses visibly, and is keyboard operable.
- Header & Mobile Nav
  - [ ] Hamburger opens mobile nav; focus is trapped inside until closed.
  - [ ] ESC closes mobile nav and focus returns to hamburger.
- Comparison Slider
  - [ ] Drag handle shows percent tooltip and updates `aria-valuetext` while dragging.
  - [ ] Arrow keys move the handle and updates are announced.
- Gallery & Lightbox
  - [ ] Clicking gallery items opens the lightbox (role="dialog"), trapping focus.
  - [ ] Prev/Next preloads neighbor images; arrow keys navigate; ESC closes.
- Performance & Lighthouse
  - [ ] Desktop Lighthouse: aim >= 90 across Performance, Accessibility, Best Practices, SEO.
  - [ ] Mobile Lighthouse: aim >= 85 (explain any remaining deviations).
- Accessibility
  - [ ] Contrast checks pass for normal text and CTA text (WCAG AA).
  - [ ] All interactive elements have visible focus states and keyboard support.

Developer notes & where to edit
- Header/footer and floating actions are injected by `components.js`. Edit this file to modify site-wide chrome.
- Global styles and design tokens live in `style.css` — adjust colors, radii, tokens here.
- Page-specific interactions are in `script.js` (reveal, counters, slider, lightbox). For accessibility fixes (focus trap, aria updates) and tracking stubs, update `script.js`.

Suggested small tasks you can ask me to implement next
- Produce ready-to-apply patches for: `index.html`, `style.css`, `components.js`, `script.js` implementing the prioritized improvements above.
- Generate optimized WebP images (I can provide the exact commands and target sizes) and update markup with `picture`/`srcset`.
- Add an optional accessible lead-capture modal (progressive enhancement) that posts to WhatsApp.

If you want, I will now produce a set of precise patches for the top-priority changes (hero responsive images, CTA styling, mobile-nav focus trap, slider aria improvements, and tracking stubs). Which patch set should I start with?
