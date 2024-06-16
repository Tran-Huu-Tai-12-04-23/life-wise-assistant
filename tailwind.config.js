/** @type {import('tailwindcss').Config} */

const color = {
  // light theme
  "dark-primary": "#6856db",
  "dark-primary2": "#5038EE",
  "dark-secondary": "rgba(0,0,0,0.1)",
  "dark-muted": "#111827",
  "dark-border": "#d1d5db",
  "dark-text": "#1a202c",
  "dark-divider": "#e5eff5",

  // light theme
  "light-primary": "#6856db",
  "light-primary2": "#5038EE",
  "light-secondary": "rgba(0,0,0,0.1)",
  "light-muted": "#111827",
  "light-border": "#d1d5db",
  "light-text": "#1a202c",
  "light-divider": "#e5eff5",
};
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: color,
      backgroundColor: color,
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
        "responsive",
        "hover",
        "focus",
      ],
      borderColor: ["dark", "dark-focus", "dark-focus-within"],
      textColor: ["dark", "dark-hover", "dark-active"],
    },
  },
  plugins: [],
};
