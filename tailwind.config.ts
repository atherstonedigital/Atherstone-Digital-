import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-hanken-grotesk)', 'sans-serif'],
        display: ['var(--font-fraunces)', 'serif'],
      },
      colors: {
        brand: {
          dark: '#F3F0E8',
          surface: '#FFFFFF',
          surfaceHighlight: 'rgba(23, 21, 15, 0.05)',
          primary: '#BC4A2B',
          accent: '#8A5A2B',
          text: '#17150F',
          muted: '#6B6557',
          border: 'rgba(23, 21, 15, 0.12)',
        },
      },
    },
  },
  plugins: [],
}
export default config
