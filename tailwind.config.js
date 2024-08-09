import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      /// dark
      light: {
        primary: "#a991f7",
        secondary: "#f6d860",
        accent: "#37cdbe",
        neutral: "#3d4451",
        "base-100": "#ffffff",
      },
      dark: {
        primary: "#a991f7",
        secondary: "#f6d860",
        accent: "#37cdbe",
        neutral: "#3d4451",
        "base-100": "#ffffff",
      },
      /// light
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          "bg-primary": "#20212C",
          primary: "#3772FF",
          secondary: "#20212C",
          text: "#fff",
          accent: "#000",
          neutral: "#3d4451",
        },
        light: {
          "bg-primary": "#fff",
          primary: "#3772FF",
          secondary: "#3d4451",
          text: "#fff",
          accent: "#000",
          neutral: "#3d4451",
        },
      },
    ],
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
