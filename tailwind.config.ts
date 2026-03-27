import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        gold: "#C9A94D",
        "gold-soft": "rgba(255, 215, 0, 0.16)",
        surface: "rgba(255, 255, 255, 0.04)",
        border: "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(201, 169, 77, 0.18), 0 30px 90px rgba(201, 169, 77, 0.12)",
        panel: "0 18px 80px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(circle at top, rgba(201, 169, 77, 0.18), transparent 38%)",
        "mesh-dark": "radial-gradient(circle at 20% 20%, rgba(201, 169, 77, 0.1), transparent 0), radial-gradient(circle at 80% 0%, rgba(255, 215, 0, 0.08), transparent 30%), linear-gradient(180deg, #111111 0%, #0a0a0a 38%, #070707 100%)",
      },
      letterSpacing: {
        luxe: "0.24em",
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;