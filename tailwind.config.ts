import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        'main-white': '#FAFAFB',
        'hover-white': '#DEE7F8',
        'border-white': 'rgba(52, 77, 128, 0.5)'

      },
      boxShadow: {
        'card-shadow': '0 4px 4px #00000040'
      }
    },
  },
  plugins: [
    plugin(
      function ({ addUtilities }) {
        addUtilities({
          '.vertical-rl': {
            'writing-mode': 'vertical-rl',
          },
          '.vertical-lr': {
            'writing-mode': 'vertical-lr',
          },
        });
      }
    )
  ],
} satisfies Config;
