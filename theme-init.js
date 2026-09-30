(() => {
  const key = 'fwerkor-home-theme';
  let preference = 'auto';
  try { const saved = localStorage.getItem(key); if (saved === 'auto' || saved === 'light' || saved === 'dark') preference = saved; } catch (_) {}
  const dark = preference === 'dark' || (preference === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();
