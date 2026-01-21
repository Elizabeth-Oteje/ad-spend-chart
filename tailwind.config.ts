import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#8B5CF6",
          "purple-light": "#A78BFA",
          "purple-dark": "#7C3AED",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
