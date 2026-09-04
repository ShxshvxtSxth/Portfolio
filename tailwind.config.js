/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#dde0e9",
        card: "#f7f7f8",
        ink: "#16181d",
        muted: "#8b8f9a",
        line: "rgba(0,0,0,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
      },
      boxShadow: {
        bento: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(16,24,40,0.14)",
      },
    },
  },
  plugins: [],
};
