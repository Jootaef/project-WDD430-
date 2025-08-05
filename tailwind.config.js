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
        primary: "#FF6B9D", // Sweet pink
        secondary: "#FFF5E6", // Soft cream
        accent: {
          orange: "#FFB347", // Pastel orange
          blue: "#87CEEB", // Sky blue
          lavender: "#DDA0DD", // Lavender
        },
      },
      fontFamily: {
        sweet: ["Dancing Script", "cursive"],
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
