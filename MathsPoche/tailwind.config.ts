import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono:    ["var(--font-dm-mono)", "monospace"],
        body:    ["var(--font-lora)", "Georgia", "serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#4F6EF7",
          hover:   "#3D5CE0",
          muted:   "rgba(79,110,247,0.09)",
          glow:    "rgba(79,110,247,0.18)",
        },
        green: {
          DEFAULT: "#22C55E",
          muted:   "rgba(34,197,94,0.09)",
          glow:    "rgba(34,197,94,0.18)",
        },
        red: {
          DEFAULT: "#EF4444",
          muted:   "rgba(239,68,68,0.09)",
          glow:    "rgba(239,68,68,0.18)",
        },
        amber: {
          DEFAULT: "#F59E0B",
          muted:   "rgba(245,158,11,0.09)",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4,0,0.2,1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.4" },
        },
        ring: {
          "0%":   { boxShadow: "0 0 0 0 rgba(79,110,247,0.4)" },
          "70%":  { boxShadow: "0 0 0 8px rgba(79,110,247,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(79,110,247,0)" },
        },
      },
      animation: {
        "fade-in":        "fade-in 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "scale-in":       "scale-in 0.2s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1) both",
        ring:             "ring 0.6s cubic-bezier(0.4,0,0.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
