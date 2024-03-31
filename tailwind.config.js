const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,tsa,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,tsa,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
  darkMode: "class",
}
