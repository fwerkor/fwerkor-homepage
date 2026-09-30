(() => {
  document.documentElement.classList.add('has-js');
  const html = document.documentElement;
  const header = document.getElementById('site-header');
  const hero = document.querySelector('.hero');
  const heroTitle = document.querySelector('.hero-title');
  const transitionWord = document.querySelector('.transition-word');
  const themeButton = document.getElementById('theme-toggle');
  const themeColor = document.getElementById('theme-color');
  const media = matchMedia('(prefers-color-scheme: dark)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeKey = 'fwerkor-home-theme';
  const preferences = ['auto', 'light', 'dark'];
  const readTheme = () => { try { const v = localStorage.getItem(themeKey); return preferences.includes(v) ? v : 'auto'; } catch (_) { return 'auto'; } };
  const applyTheme = (preference) => {
    const resolved = preference === 'auto' ? (media.matches ? 'dark' : 'light') : preference;
    html.dataset.theme = resolved; html.dataset.themePreference = preference; html.style.colorScheme = resolved;
    if (themeColor) themeColor.content = resolved === 'dark' ? '#0b0d10' : '#f6f8fb';
    if (themeButton) { themeButton.dataset.mode = preference; themeButton.title = '显示模式：' + (preference === 'auto' ? '跟随系统' : preference === 'dark' ? '深色' : '浅色'); }
  };
  let themePreference = readTheme(); applyTheme(themePreference);
  themeButton?.addEventListener('click', () => { const next = preferences[(preferences.indexOf(themePreference) + 1) % preferences.length]; themePreference = next; try { localStorage.setItem(themeKey, next); } catch (_) {} applyTheme(next); });
  media.addEventListener('change', () => { if (themePreference === 'auto') applyTheme('auto'); });
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  let ticking = false;
  const updateScroll = () => {
    ticking = false; const y = window.scrollY; header?.classList.toggle('is-scrolled', y > 20);
    if (!reduceMotion.matches && hero && heroTitle) {
      const rect = hero.getBoundingClientRect(); const travel = Math.max(1, hero.offsetHeight - innerHeight); const progress = clamp(-rect.top / travel); const eased = progress * progress * (3 - 2 * progress);
      html.style.setProperty('--hero-progress', progress.toFixed(4)); html.style.setProperty('--hero-title-y', (-72 * eased).toFixed(2) + 'px'); html.style.setProperty('--hero-title-scale', (1 + 0.055 * eased).toFixed(4)); html.style.setProperty('--hero-title-opacity', (1 - 0.72 * progress).toFixed(4)); html.style.setProperty('--hero-orbit', (progress * 42).toFixed(2) + 'deg'); html.style.setProperty('--hero-beam', (progress * 16).toFixed(2) + 'vw'); html.style.setProperty('--hero-copy-y', (-30 * progress).toFixed(2) + 'px');
    }
    if (!reduceMotion.matches && transitionWord) { const rect = transitionWord.parentElement.getBoundingClientRect(); const p = clamp((innerHeight - rect.top) / (innerHeight + rect.height)); transitionWord.style.transform = 'translate3d(' + (42 - p * 84).toFixed(2) + 'vw,0,0)'; }
  };
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } };
  addEventListener('scroll', requestUpdate, { passive: true }); addEventListener('resize', requestUpdate); updateScroll();
  const revealObserver = new IntersectionObserver((entries) => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  const buildObserver = new IntersectionObserver((entries) => { for (const entry of entries) entry.target.classList.toggle('is-active', entry.isIntersecting); }, { rootMargin: '-28% 0px -28% 0px', threshold: 0.18 });
  document.querySelectorAll('.build-card').forEach((el) => buildObserver.observe(el));
  document.getElementById('year').textContent = String(new Date().getFullYear());
  if (reduceMotion.matches) html.classList.add('reduced-motion');
})();
