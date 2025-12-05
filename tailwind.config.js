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
      fontFamily: {
        'sans': ['GOTHAM'],
        'gotham': ['GOTHAM'],
        'accent': ['BBH_Sans_Bartle'],
        'rodina': ['Rodina-Regular'],
        'logo': ['Rodina-Regular'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'black': '900',
      }
    }
  },
  plugins: [],
}