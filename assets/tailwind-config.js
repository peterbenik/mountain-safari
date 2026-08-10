  /* Keep these hex values in sync with the CSS custom properties in the <style> block below. */
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          navy900: '#141B2E',
          navy800: '#1A2234',
          royal: '#1E40C4',
          royalDark: '#16309A',
          periwinkle: '#7B96C9',
          galleryBg: '#5B6472',
          cream: '#F5F0E6',
          ink: '#1A1A1A',
          muted: '#6B7280',
          surface: '#FFFFFF',
          hairline: '#E5E7EB',
        },
        borderRadius: {
          pill: '999px',
          card: '20px',
        },
        fontFamily: {
          display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
      },
    },
  };
