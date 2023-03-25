/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redTransparent: '#ff00003d'
      },
      fontFamily: {
        'DM': ['DM Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}
