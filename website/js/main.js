/**
 * @laddhaanshul/color-tokens — Main JavaScript
 *
 * Handles:
 *  - Theme toggle (light/dark)
 *  - Copy-to-clipboard for install command & color swatches
 *  - Smooth scroll navigation with active state
 *  - Mobile hamburger menu
 *  - Color palette filter
 *  - Code example tab switching
 */

(function () {
  'use strict';

  // ─── DOM References ─────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const themeToggle   = $('#theme-toggle');
  const hamburger     = $('#hamburger');
  const mainNav       = $('#main-nav');
  const paletteGrid   = $('#palette-grid');
  const paletteFilter = $('#palette-filter');

  // ─── Theme Toggle ───────────────────────────────────────────
  const THEME_KEY = 'color-tokens-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ─── Hamburger Menu ─────────────────────────────────────────
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      mainNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));

      // Close on link click
      $$('.nav-links a', mainNav).forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mainNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── Smooth Scroll ──────────────────────────────────────────
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ─── Copy to Clipboard ──────────────────────────────────────
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.warn('Copy failed:', err);
    }
    document.body.removeChild(textarea);
    return Promise.resolve();
  }

  // Install block copy button
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const block = btn.closest('.install-block');
      const code = block ? $('code', block) : null;
      const text = code ? code.textContent.trim() : 'npm install @laddhaanshul/color-tokens';

      try {
        await copyText(text);
        btn.classList.add('copied');
        const original = btn.innerHTML;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = original;
        }, 2000);
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });
  });

  // ─── Color Swatch Click-to-Copy ─────────────────────────────
  $$('.color-swatch').forEach(swatch => {
    // Create tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    swatch.appendChild(tooltip);

    swatch.addEventListener('click', async () => {
      const hex = swatch.dataset.hex;
      if (!hex) return;

      try {
        await copyText(hex);
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 1200);
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });
  });

  // ─── Palette Filter ─────────────────────────────────────────
  if (paletteFilter && paletteGrid) {
    const filterButtons = $$('.filter-btn', paletteFilter);
    const families = $$('.color-family', paletteGrid);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter families
        families.forEach(family => {
          const familyName = family.dataset.family;
          if (filter === 'all' || familyName === filter) {
            family.classList.remove('hidden');
          } else {
            family.classList.add('hidden');
          }
        });
      });
    });
  }

  // ─── Code Example Tabs ──────────────────────────────────────
  $$('.example-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      if (!target) return;

      // Find parent container
      const container = tab.closest('.examples') || tab.parentElement.parentElement;

      // Update tab states
      $$('.example-tab', container).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panel visibility
      $$('.example-panel', container).forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });

  // ─── Code Block Copy Buttons ────────────────────────────────
  $$('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const block = btn.closest('.code-block');
      const pre = block ? $('pre', block) : null;
      if (!pre) return;

      const text = pre.textContent.trim();

      try {
        await copyText(text);
        btn.classList.add('copied');
        const original = btn.textContent.trim();
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = original;
        }, 2000);
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });
  });

  // ─── Header scroll shadow ───────────────────────────────────
  const header = $('#site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 10) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = scroll;
  }, { passive: true });

  // ─── Active nav link on scroll ──────────────────────────────
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active-link',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();

