/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redTransparent: '#ff00003d',
        orangeTransparent: '#ed8a1936',
      },
      fontFamily: {
        'DM': ['DM Sans', 'sans-serif']
      },
      flex: {
        '2': '2 2 0%'
      },
    },
  },
  plugins: [],
}
