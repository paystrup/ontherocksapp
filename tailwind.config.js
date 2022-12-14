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
      'primaryBlack': '#0C0C0C',
      'primaryYellow': '#FFE598',
      'primaryGray': {
        900: '#343434',
        700: '#707070',
        500: '#CACACA',
        200: '#151515',
      },
      'lightBlack': '#1F1E1E', 
      'secondaryPeach': '#FFAA5C', 
      'secondaryYellow': '#FFE598', 
      'secondaryRed': '#DB5937', 
      'secondaryOrange': '#FDA110', 

    },
    extend: {
      fontFamily: {
        regular: ["GT America Extended Regular", "sans-serif"],
        thin: ["GT America Extended Thin", "sans-serif"],
        light: ["GT America Extended Light", "sans-serif"],
        bold: ["GT America Extended Bold", "sans-serif"],
        medium: ["GT America Extended Medium", "sans-serif"],
        semibold: ["Neue Plak Extended Semibold", "sans-serif"],
        black: ["Neue Plak Extended Black", "sans-serif"],
        displayBold: ["ITC Benguiat Bold", "serif"],
        displayMedium: ["ITC Benguiat Medium", "serif"],
        displayBook: ["ITC Benguiat Book", "serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
