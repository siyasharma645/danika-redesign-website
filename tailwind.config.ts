import type { Config } from 'tailwindcss';

/**
 * DESIGN TOKENS: official Danika brand palette.
 * Source values live as CSS variables in src/app/globals.css (:root) and are referenced here with
 * the `<alpha-value>` format so opacity utilities (bg-brand-700/80) keep working.
 *
 *   Primary red  #83040A  -> brand-700   (header, hero, key sections, links on light backgrounds)
 *   Accent yellow #E9BF15 -> accent-500  (CTAs, highlights, icons on dark/red)
 *   Charcoal     #252525  -> ink         (body text, footer, electrical panel)
 *   Off-white    #F5F5F4  -> paper       (page background)
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('c-offwhite'),
        white: v('c-white'),
        line: v('c-line'),
        ink: { DEFAULT: v('c-charcoal'), soft: v('c-charcoal-soft') },
        brand: {
          50: v('c-brand-50'), 100: v('c-brand-100'), 200: v('c-brand-200'),
          500: v('c-brand-500'), 600: v('c-brand-600'), 700: v('c-brand-700'),
          800: v('c-brand-800'), 900: v('c-brand-900'), 950: v('c-brand-950'),
        },
        accent: {
          50: v('c-accent-50'), 400: v('c-accent-400'), 500: v('c-accent-500'),
          600: v('c-accent-600'), 700: v('c-accent-700'),
        },
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      // Radius tokens: btn 10px (buttons, menu items), field 12px (inputs, alerts), card 16px (panels). Images stay square by design.
      borderRadius: { btn: '0.625rem', field: '0.75rem', card: '1rem' },
      boxShadow: {
        card: '0 1px 2px rgba(37,37,37,.05), 0 8px 24px -8px rgba(37,37,37,.12)',
        lift: '0 2px 4px rgba(37,37,37,.06), 0 18px 40px -12px rgba(37,37,37,.28)',
      },
      keyframes: {
        'fade-down': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-down': 'fade-down .18s ease-out' },
    },
  },
  plugins: [],
};
export default config;
