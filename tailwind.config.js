/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales
        black: {
          DEFAULT: 'rgb(0, 0, 0)',
          pure: 'rgb(0, 0, 0)'
        },
        gray: {
          DEFAULT: 'rgb(65, 69, 80)',
          dark: 'rgb(65, 69, 80)'
        },
        white: {
          DEFAULT: 'rgb(255, 255, 255)',
          pure: 'rgb(255, 255, 255)'
        },
        // Colores rojos/acento
        red: {
          primary: 'rgb(236, 35, 60)',
          dark: 'rgb(214, 4, 41)',
          darker: 'rgb(154, 10, 0)'
        }
      },
      animation: {
        'film-grain': 'film-grain 0.3s infinite',
        'scanline': 'scanline 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shift': 'shift 3s ease-in-out infinite',
      },
      keyframes: {
        'film-grain': {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(-10%, 5%)' },
          '30%': { transform: 'translate(5%, -10%)' },
          '40%': { transform: 'translate(-5%, 15%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '60%': { transform: 'translate(15%, 0)' },
          '70%': { transform: 'translate(0, 10%)' },
          '80%': { transform: 'translate(-15%, 0)' },
          '90%': { transform: 'translate(10%, 5%)' },
          '100%': { transform: 'translate(5%, 0)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shift': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(10%)' },
        }
      },
      fontFamily: {
        'gotham-cond-black': ['Gotham Condensed Black', 'sans-serif'],
      },
    }
  },
  plugins: [],
}