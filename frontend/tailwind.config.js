/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vtb': {
          'white': '#ffffff',
          'primary-blue': '#2f447a',
          'accent-blue': '#1699c5',
          'primary-green': '#30753c',
          'accent-yellow': '#cbc62e',
          'dark-green': '#276139',
          'accent-orange': '#f69f33',
          'accent-red': '#ee5b39',
          'accent-pink': '#d82066',
          'secondary-blue': '#1f77a8',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
