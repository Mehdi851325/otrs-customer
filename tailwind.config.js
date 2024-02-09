/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    fontFamily: {
      shabnam: ["Shabnam", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {"50":"#CFE2FF","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#3d8bff","500":"#1975FF","600":"#1856B3","700":"#173767","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        secondary: {"IT":"#fdc799","Finance":"#00c39a","HR":"#ffd155","Darmanet":"#4fa2ff"}
      }
    },
  },
  plugins: [
  ],
}

