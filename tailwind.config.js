/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'primaryWhite': '#F5F5F5',
      'primaryBlack': '#121212',
      'primaryYellow': '#FFE598',
      'primaryGray': {
        900: '#343434',
        500: '#CACACA',
      },      
    },
    extend: {
      fontFamily: {
        regular: ["GT America Extended Regular", "sans-serif"],
        bold: ["GT America Extended Bold", "sans-serif"],
        medium: ["GT America Extended Medium", "sans-serif"],
        semibold: ["Neue Plak Extended Semibold", "sans-serif"],
        black: ["Neue Plak Extended Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
