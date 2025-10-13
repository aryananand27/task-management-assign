import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F59E42",
          light: "#FBBF24",
          dark: "#B45309",
        },
      },
      fontFamily:{
         poppins: ['Poppins', 'sans-serif'],
      }
      ,
        gridTemplateColumns: {
        6: 'repeat(6, minmax(0, 1fr))',
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};

export default config;

