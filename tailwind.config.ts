import type { Config } from 'tailwindcss';

/**
 * Design tokens derived from the Product Management homepage (the UX benchmark).
 * Restrained enterprise palette: neutral backgrounds, deep-navy feature cards,
 * a teal->blue data gradient, and a green accent for "live / on-track".
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: '#F6F8FA', // page background
        surface: '#FFFFFF', // card background
        // Ink
        ink: {
          DEFAULT: '#0F172A', // primary text (near-black navy)
          muted: '#475569',
          faint: '#94A3B8',
        },
        // Deep-navy feature card (the "115k" hero card on the benchmark)
        feature: {
          DEFAULT: '#132532',
          soft: '#1B3040',
        },
        // Accents
        accent: {
          DEFAULT: '#0FB981', // green — live / on-track / active nav
          soft: '#D1FAE5',
        },
        brand: {
          teal: '#2DD4BF',
          blue: '#3B82F6',
          link: '#0D9488',
        },
        line: '#E5E9EE', // subtle card borders
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        cardHover:
          '0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'data-gradient': 'linear-gradient(90deg, #2DD4BF 0%, #3B82F6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
