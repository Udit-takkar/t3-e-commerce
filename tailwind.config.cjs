/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      teal: colors.teal,
      cyan: colors.cyan,
      addBtn: "rgb(20, 110, 180)",
      cnt: "#146eb41a",
      primary: {
        blue: "#2874f0",
        lightGreen: "#14be47",
        green: "#388e3c",
        yellow: "#ff9f00",
        orange: "#fb641b",
        darkBlue: "#172337",
        grey: "#878787",
      },
    },
    extend: {
      fontFamily: {
        jakarta: ["jakarta", "sans-serif"],
        helvetica: ["helvetica", "sans-serif"],
      },
      gridTemplateColumns: {
        products: "repeat(auto-fill, minmax(250px, 1fr))",
        productItem: "90px 1fr",
      },
    },
  },
  plugins: [],
};
