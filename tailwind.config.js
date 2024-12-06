/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#F0EDE4',
        'secondary': '#DAD1C4',
        'primary': '#2e2d2c',
        'danger': '#e3342f',


        // SVG Fills
        'fill-default': "#3a3a3a",
        'fill-primary': '#2e2d2c',
        'fill-secondary': '#DAD1C4',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

