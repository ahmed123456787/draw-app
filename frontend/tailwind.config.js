// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#6173E4",
        greenColor:"#2DCC70",
        yellowColor:"#F1C30D",
        whiteBlueColor:"#4ECDC4",
        blueColor:"#3498DB",
        purpleColor:"#9B59B6",
        grayColor:"#95A5A6"
      },
    },
  },
  plugins: [],
};