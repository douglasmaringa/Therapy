// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Rampart: ["Josefin Sans"],
        cursive:["Alex Brush"]
       },
       colors:{
        primary:"#B04727",
        secondary:"#15274B",
        third:"#651E56"
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}