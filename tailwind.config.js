/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07070c",
          900: "#0b0c14",
          800: "#12131f",
          700: "#1a1c2b",
        },
        mist: {
          50: "#f7f7fb",
          100: "#eeeef6",
          200: "#dcdce8",
        },
        violet: {
          400: "#b48bff",
          500: "#9d5bff",
          600: "#8038f5",
          700: "#6a24d6",
        },
        amber: {
          400: "#ffb84d",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(50% 50% at 20% 20%, rgba(157,91,255,0.35) 0%, rgba(157,91,255,0) 100%), radial-gradient(45% 45% at 80% 30%, rgba(255,184,77,0.18) 0%, rgba(255,184,77,0) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(157,91,255,0.35)",
        card: "0 8px 30px rgba(0,0,0,0.25)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-20px) scale(1.08)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
