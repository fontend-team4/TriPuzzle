/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F8',
          100: '#fde4e3',
          200: '#fbcecd',
          300: '#f7acaa',
          400: '#f17b78',
          500: '#e6514d',
          600: '#d23430',
          700: '#b12824',
          800: '#982623',
          900: '#7a2422',
          950: '#420e0d',
        },
        secondary: {
          50: '#fffae3',
          100: '#fff5c0',
          200: '#ffe985',
          300: '#ffd53f',
          400: '#ffbd0b',
          500: '#f4a300',
          600: '#d37b00',
          700: '#a85400',
          800: '#8a4209',
          900: '#75360e',
          950: '#451a03',
        },
        highlights: '#EB4574',
        gray:'#EEEEEE',
      },
    },
  },
  plugins: [require('daisyui')],
}
