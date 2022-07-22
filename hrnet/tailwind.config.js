/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"]
    },
    screens: {
      'lg': '992px'
    },
    extend: {
      colors: {
        opacDark: "rgba(0, 0, 0, 0.75)"
      },
      width: {
        "modal": "35rem"
      }
    }
  },
  plugins: [],
}
