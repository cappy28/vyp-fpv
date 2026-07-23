import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0C10",
        carbon: "#12151C",
        carbon2: "#181B24",
        hairline: "rgba(255,255,255,0.08)",
        signal: {
          DEFAULT: "#3FD7E0",
          dim: "#2AA1A8",
        },
        copper: {
          DEFAULT: "#E8A33D",
          dim: "#B67D2C",
        },
        ink: {
          DEFAULT: "#E7EAF0",
          muted: "#8A93A6",
          faint: "#4B5263",
        },
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "carbon-weave":
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px)",
        "signal-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(63,215,224,0.12) 0%, rgba(63,215,224,0) 70%)",
      },
      boxShadow: {
        signal: "0 0 0 1px rgba(63,215,224,0.4), 0 0 24px rgba(63,215,224,0.15)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
