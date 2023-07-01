const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#08090a',
        vanila: '#7f7f7f',
      },
      fontFamily: {
        sans: ['var(--font-roboto-mono)'],
        'proto-mono': ['var(--font-proto-mono)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
