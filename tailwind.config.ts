import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  content: { 
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract
},
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        blue: {
          'main': '#4668B2',
          'second': '#4987B0',
          'third': '#53BAC6',
          'light': '#93D5D2',
        },
        green: {
          'main': '#4A803D',
          'second': '#5AA645',
          'third': '#7CBA5A',
          'light': '#ABCF84',
        },
      },
      boxShadow: {
        'card-shadow': '0 4px 4px #00000040'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #486BB3 0%, #53BAC6 31%, #7CBA5A 68%, #4A803D 100%)'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-350px * 6))' },
        }
      },
      animation: {
        'infinite-scroll': 'scroll 20s linear infinite'
      },
    },
  },
  plugins: [
    fluid,
    plugin(
      function ({ addUtilities }) {
        addUtilities({
          '.vertical-rl': {
            'writing-mode': 'vertical-rl',
          },
          '.vertical-lr': {
            'writing-mode': 'vertical-lr',
          },
          '.clip-padding-border': {
            backgroundClip: 'padding-box, border-box',
          },
          '.origin-padding-border': {
            backgroundOrigin: 'padding-box, border-box',
          },
        });
      }
    )
  ],
} satisfies Config;
