/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        asphalt: '#2E3D45',
        orange: '#F57B0B',
        lightGrey: '#AFAFAF',
				lighterGrey: '#C7C7C7',
        lightestGrey: '#EDEDED',
				dimmedGrey: '#C8C8C8',
        darkGrey: '#878787',
				
      },
    },
  },
  plugins: [],
};
