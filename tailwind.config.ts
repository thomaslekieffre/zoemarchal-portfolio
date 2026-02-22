import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#092e67",
        peach: "#fce4d8",
        purple: "#a17cc1",
        navy: "#111453",
        rafale: {
          dark: "#020618",
          light: "#ecfeff",
          mid: "#053345",
          accent: "#0092b8",
          pale: "#cefafe",
        },
        jumio: {
          dark: "#323132",
          cyan: "#13dfce",
          green: "#5acc29",
        },
        ms: {
          orange: "#ea9230",
          red: "#ec5930",
          pink: "#ed739a",
          purple: "#890b51",
          dark: "#1c1d3b",
          teal: "#008f9f",
        },
      },
      fontFamily: {
        display: ["Dont", "var(--font-righteous)", "cursive"],
        body: ["PP Frama", "var(--font-dm-sans)", "sans-serif"],
        heading: ["CocogooseProTrial", "var(--font-nunito)", "sans-serif"],
        sen: ["var(--font-sen)", "sans-serif"],
        borel: ["var(--font-borel)", "cursive"],
        jost: ["var(--font-jost)", "sans-serif"],
        barlow: ["var(--font-barlow)", '"Barlow Condensed"', "sans-serif"],
      },
      animation: {
        float: "float 3.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
