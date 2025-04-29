export const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  })()
`;
