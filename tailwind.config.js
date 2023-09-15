/** @type {import('tailwindcss').Config} */

const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '120': '30rem'
      }
    },
  },
  darkMode: "class",
  plugins: [],
});
