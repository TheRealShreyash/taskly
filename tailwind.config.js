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
        diffBlue: "#29335C",
      },
    },
  },
  plugins: [],
};
