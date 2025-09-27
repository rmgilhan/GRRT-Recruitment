import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        // Modular Scale: Major Third (1.25)
        'step-0': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.5' }],
        'step-1': ['clamp(1.25rem, 3vw, 1.563rem)', { lineHeight: '1.45' }],
        'step-2': ['clamp(1.563rem, 4vw, 1.953rem)', { lineHeight: '1.35' }],
        'step-3': ['clamp(1.953rem, 5vw, 2.441rem)', { lineHeight: '1.25' }],
        'step-4': ['clamp(2.441rem, 6vw, 3.052rem)', { lineHeight: '1.15' }],
        'step-5': ['clamp(3.052rem, 7vw, 3.815rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        'step-0': 'clamp(0.25rem, 1vw, 0.5rem)',
        'step-1': 'clamp(0.5rem, 1.5vw, 1rem)',
        'step-2': 'clamp(1rem, 2vw, 1.5rem)',
        'step-3': 'clamp(1.5rem, 3vw, 2rem)',
        'step-4': 'clamp(2rem, 4vw, 3rem)',
        'step-5': 'clamp(3rem, 6vw, 4rem)',
        'step-6': 'clamp(4rem, 8vw, 6rem)',
      },
      lineHeight: {
        tight: '1.15',
        snug: '1.25',
        normal: '1.45',
        relaxed: '1.65',
      },
      maxWidth: {
        'step-0': '20rem',
        'step-1': '30rem',
        'step-2': '40rem',
        'step-3': '48rem',
        'step-4': '60rem',
        'step-5': '72rem',
        'step-6': '80rem',
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.pink,
        success: colors.green,
        warning: colors.amber,
        danger: colors.rose,
        neutral: colors.gray,
      },
      boxShadow: {
        'step-0': 'none',
        'step-1': '0 1px 2px rgba(0,0,0,0.05)',
        'step-2': '0 2px 4px rgba(0,0,0,0.08)',
        'step-3': '0 4px 6px rgba(0,0,0,0.1)',
        'step-4': '0 8px 12px rgba(0,0,0,0.12)',
        'step-5': '0 12px 20px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'step-0': '0.25rem',
        'step-1': '0.5rem',
        'step-2': '1rem',
        'step-3': '1.5rem',
        'step-4': '2rem',
        'step-full': '9999px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
}