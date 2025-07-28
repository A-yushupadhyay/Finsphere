import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"; // ✅ Fix: import instead of require

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",         // ✅ Corrected to src/
    "./src/components/**/*.{js,ts,jsx,tsx}",  // ✅ Corrected to src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#3B82F6",
        accent: "#22C55E",
        background: "#F9FAFB",
        dark: "#0F172A",
      },
    },
  },
  plugins: [animate], // ✅ No require() usage
};

export default config;
