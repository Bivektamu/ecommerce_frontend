/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'black': '#0E1422'
      },
      gridTemplateColumns: {
        'table': '1fr 3fr 2fr 2fr 2fr 3fr 1fr'
      }
     
    },
  },
  plugins: [],
};
