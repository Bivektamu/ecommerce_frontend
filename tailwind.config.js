/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'toast-bar': 'bar linear 2s'
      },
      keyframes: {
        bar: {
          '0%': {width:'100%'},
          '100%': {width:'0'}
        }
      },
      colors: {
        'black': '#0E1422',
        'regal-white': 'rgb(226, 226, 226)'
      },
      gridTemplateColumns: {
        'table': '1fr 3fr 1.5fr 1.5fr 1.5fr 2fr 1fr 1fr'
      }
     
    },
  },
  plugins: [],
};
