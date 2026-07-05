import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/(frontend)/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/blocks/**/*.{ts,tsx}',
    './src/heros/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        brand: {
          navy: '#16365D',
          dark: '#1E3A5F',
          DEFAULT: '#2B6CB0',
          blue: '#2F6FB2',
          accent: '#3B82C4',
          sky: '#5B9BD5',
          light: '#EAF2FB',
          light2: '#E8F0F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 12px 32px -16px rgba(22, 54, 93, 0.25)',
        card: '0 8px 24px -12px rgba(22, 54, 93, 0.18)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(120deg, rgba(16,40,73,0.92) 0%, rgba(30,58,95,0.85) 45%, rgba(43,108,176,0.55) 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
