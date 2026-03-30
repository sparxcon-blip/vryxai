/* Copyright (c) 2025 FluxTV. All rights reserved. fluxtv-owned */

/* ── Video Modal ─────────────────────────────────────────── */
function initModal() {
  const trigger = document.getElementById('modal-trigger');
  const overlay = document.getElementById('modal-overlay');
  const video   = document.getElementById('modal-video');
  const closeBtn = document.getElementById('modal-close');
  if (!trigger || !overlay) return;

  trigger.addEventListener('click', () => {
    overlay.classList.add('open');
    if (video) video.play();
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    if (video) { video.pause(); video.currentTime = 0; }
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

/* ── Render Testimonials ─────────────────────────────────── */
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container || typeof TESTIMONIALS === 'undefined') return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-quote">${t.message}</p>
      <div class="testimonial-footer">
        <span class="testimonial-name">${t.name}</span>
        <span class="testimonial-label">${t.label}</span>
      </div>
    </div>
  `).join('');
}

/* ── Render Pricing (pricing.html) ───────────────────────── */
function renderPricing() {
  const container = document.getElementById('pricing-container');
  if (!container || typeof SITE_CONFIG === 'undefined') return;

  container.innerHTML = SITE_CONFIG.plans.map(plan => `
    <div class="pricing-card ${plan.highlighted ? 'highlighted' : 'standard'}">
      <div class="pricing-card-inner">
        ${plan.highlighted ? '<div class="pricing-badge">Best Value</div>' : ''}
        <div class="pricing-name">${plan.name}</div>
        <div class="pricing-desc">${plan.description}</div>
        <div class="pricing-price-row">
          <span class="pricing-price">${plan.price}</span>
          <span class="pricing-period">${plan.priceLabel}</span>
        </div>
        <ul class="pricing-features">
          ${plan.features.map(f => `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M13.707 4.293a1 1 0 0 0-1.414 0L6 10.586 3.707 8.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z"/>
              </svg>
              ${f}
            </li>
          `).join('')}
        </ul>
        <a href="${SITE_CONFIG.discordLink}" target="_blank" rel="noopener noreferrer"
           class="btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}"
           style="width:100%;justify-content:center;">
          ${plan.cta}
        </a>
      </div>
    </div>
  `).join('');

  // footnote discord link
  const footnoteLink = document.getElementById('pricing-discord-link');
  if (footnoteLink) footnoteLink.href = SITE_CONFIG.discordLink;
}

/* ── Render Start page trial teaser ─────────────────────── */
function renderStartPage() {
  const discordBtn = document.getElementById('discord-btn');
  if (discordBtn && typeof SITE_CONFIG !== 'undefined') {
    discordBtn.href = SITE_CONFIG.discordLink;
  }

  const teaserList = document.getElementById('free-trial-features');
  if (!teaserList || typeof SITE_CONFIG === 'undefined') return;

  const free = SITE_CONFIG.plans.find(p => p.name === 'Free Trial');
  if (!free) return;

  teaserList.innerHTML = free.features.map(f => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path d="M13.707 4.293a1 1 0 0 0-1.414 0L6 10.586 3.707 8.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z"/>
      </svg>
      ${f}
    </li>
  `).join('');
}

/* ── Wire up all Discord links ───────────────────────────── */
function wireDiscordLinks() {
  if (typeof SITE_CONFIG === 'undefined') return;
  document.querySelectorAll('[data-discord]').forEach(el => {
    el.href = SITE_CONFIG.discordLink;
  });
}

/* ── AOS-lite: simple fade-up on scroll ──────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || '0');
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initModal();
  renderTestimonials();
  renderPricing();
  renderStartPage();
  wireDiscordLinks();
  initScrollAnimations();
});
