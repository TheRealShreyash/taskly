/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      comfortaa: ["Comfortaa", "cursive"],
    },
    extend: {
      colors: {
        diffYellow: "#F3A712",
        peach: "#F0CEA0",
        risdBlue: "#4056F4",
        darkBlue: "#470FF4",
        raspBerry: "#CE2D4F",
        slightWhite: "#CEBBC9",
      },
    },
  },
  plugins: [],
};
