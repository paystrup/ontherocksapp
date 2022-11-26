/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Neue Plak Extended Regular", "sans-serif"],
        bold: ["Neue Plak Extended Bold", "sans-serif"],
        semibold: ["Neue Plak Extended Semibold", "sans-serif"],
        black: ["Neue Plak Extended Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
