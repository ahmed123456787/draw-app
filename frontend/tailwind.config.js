// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideDown: 'slideDown 1s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      } ,
      spacing:{
      },
      colors: {
        bgColor: "#6173E4",
        greenColor:"#2DCC70",
        yellowColor:"#F1C30D",
        whiteBlueColor:"#4ECDC4",
        blueColor:"#3498DB",
        purpleColor:"#9B59B6",
        grayColor:"#95A5A6",
        whiteBlueColor:"#DEE1FF",
        whitePink:"#FFDDCE",
        blueGray:"#C5C8ED"
      },
      backgroundImage: {
        'landing-page-gradiant': 'linear-gradient(344.05deg, #FFDDCE -6.31%, #909EF5 53.39%)',
        'gray-gradiant':'linear-gradient(90deg, #C5C8ED 0%, #59597A 100%)'
         
      },
    },
  },
  plugins: [],
};