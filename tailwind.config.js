/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B4513", // Warm brown
        secondary: "#F5F5DC", // Beige
        accent: {
          orange: "#FFB347", // Terracotta
          blue: "#87CEEB", // Sky blue
          green: "#90EE90", // Sage green
        },
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [],
};
