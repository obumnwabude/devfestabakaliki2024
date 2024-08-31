/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['4rem', { lineHeight: '1' }],
      '7xl': ['5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      colors: {
        'df-black': '#1e1e1e',
        'df-blue-core': '#4285f4',
        'df-blue-halftone': '#57caff',
        'df-blue-pastel': '#c3ecf6',
        'df-green-core': '#34a853',
        'df-green-halftone': '#5cdb6d',
        'df-green-pastel': '#ccf6c5',
        'df-red-core': '#ea4335',
        'df-red-halftone': '#ff7daf',
        'df-red-pastel': '#f8d8d8',
        'df-yellow-core': '#f9ab00',
        'df-yellow-halftone': '#ffd427',
        'df-yellow-pastel': '#ffe7a5'
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        display: ['"Dm Sans"', ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        '2xl': '40rem'
      }
    }
  },
  plugins: []
};
