import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#3772FF",
          secondary: "#20212C",
          text: "#fff",
          accent: "#000",
          neutral: "#3d4451",
        },
        light: {
          primary: "#3772FF",
          secondary: "#fff",
          text: "#fff",
          accent: "#000",
          neutral: "#3d4451",
        },
      },
    ],
  },
  variants: {
    extend: {
      light: {
        card: "#ccc",
      },
      dark: {
        card: "#ccc",
      },
    },
  },
  plugins: [daisyui],
};
