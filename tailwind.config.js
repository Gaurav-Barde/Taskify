/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "430px",
      // => @media (min-width: 640px) { ... }

      sm: "680px",
      // => @media (min-width: 640px) { ... }

      md: "835px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        customDark: "#101015",
      },
    },
  },
  plugins: [],
};
