export const themeScript = `
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark-mode');
    }
  } catch (e) {}
})();
`;
