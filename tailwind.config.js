/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },

      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
        },
        dark: '#222222',
        warning: '#FFCC00',
        dodger: {
          DEFAULT: '#3361FF',
          50: '#EBEFFF',
          100: '#D6DFFF',
          200: '#ADC0FF',
          300: '#85A0FF',
          400: '#5C81FF',
          500: '#3361FF',
          600: '#0038FA',
          700: '#002CC2',
          800: '#001F8A',
          900: '#001252',
          950: '#000C36',
        },
        'fun-green': {
          DEFAULT: '#008146',
          50: '#3AFFA5',
          100: '#25FF9B',
          200: '#00FB88',
          300: '#00D372',
          400: '#00AA5C',
          500: '#008146',
          600: '#004928',
          700: '#001109',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        secondary: {
          DEFAULT: '#007AFF',
          50: '#B8DAFF',
          100: '#A3CFFF',
          200: '#7ABAFF',
          300: '#52A5FF',
          400: '#298FFF',
          500: '#007AFF',
          600: '#005FC7',
          700: '#00448F',
          800: '#002957',
          900: '#000F1F',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        progress: 'progress 1s infinite linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
