/** Tailwind config — mirrors the inline `tailwind.config` the play CDN used.
    Keep the colour values in sync with the CSS custom properties in the
    <style> block of index.html and assets/theme.css. */
module.exports = {
  content: [
    './index.html',
    './thank-you.html',
    './impressum.html',
    './ochrana-osobnych-udajov.html',
    './main.js',
    './assets/tour.js',
    './content.js',
    './content.pl.js',
    './tury/*.html',
    './pl/*.html',
    './pl/tury/*.html',
  ],
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
      borderRadius: { pill: '999px', card: '20px' },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
