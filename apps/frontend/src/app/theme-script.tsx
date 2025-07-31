export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              const stored = localStorage.getItem('solarops-theme');
              if (stored === 'light' || stored === 'dark') return stored;
              if (stored === 'system' || !stored) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              return 'light';
            }
            
            const theme = getTheme();
            document.documentElement.classList.add(theme);
            
            // Also set a data attribute for immediate access
            document.documentElement.dataset.theme = theme;
          })();
        `,
      }}
    />
  );
}