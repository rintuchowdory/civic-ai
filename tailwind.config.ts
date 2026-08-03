import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#131E33",
          soft: "#1B2A47",
          line: "#2C3F63",
        },
        paper: {
          DEFAULT: "#F1E9D3",
          dim: "#E3D6B2",
          faint: "rgba(241,233,211,0.06)",
        },
        amtsblau: {
          DEFAULT: "#3159C7",
          dim: "#24407E",
          bright: "#5C82E8",
        },
        stempel: {
          DEFAULT: "#C2453A",
          dim: "#7C2A22",
        },
        akte: {
          gold: "#C9A66B",
          moss: "#5C8A5A",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "sans-serif"],
        body: ['"IBM Plex Sans"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
      boxShadow: {
        stamp: "0 0 0 1px rgba(241,233,211,0.08), 0 12px 32px -12px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        card: "2px",
      },
      keyframes: {
        "stamp-in": {
          "0%": { transform: "scale(1.6) rotate(-8deg)", opacity: "0" },
          "60%": { transform: "scale(0.96) rotate(-4deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-4deg)", opacity: "1" },
        },
        "fold-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        stamp: "stamp-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        fold: "fold-in 0.45s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
