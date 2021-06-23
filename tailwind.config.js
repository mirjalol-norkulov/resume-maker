const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#333333",
        },
        primary: {
          DEFAULT: colors.lightBlue["500"],
          darker: colors.lightBlue["700"],
          light: colors.lightBlue["50"],
        },
        "true-gray": colors.trueGray,
        "blue-gray": colors.blueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
