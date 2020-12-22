/* eslint-disable quote-props */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        "cardo": "Cardo, sans-serif",
        "domine": "Domine, serif",
        "ch": "Cooper Hewitt, serif",
        "lato": "Lato, sans-serif",
        "roboto": "Roboto, sans-serif"
      },
      colors: require("tailwindcss/colors"),
    }
  },
  plugins: [require('@tailwindcss/ui')]
}