import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
    darkMode: ["class"],
    content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract
  },
  theme: {
	screens,
	fontSize,
  	container: {
  		center: true,
  		padding: '1rem'
  	},
  	extend: {
  		colors: {
  			blue: {
  				main: '#4668B2',
  				second: '#4987B0',
  				third: '#53BAC6',
  				light: '#93D5D2'
  			},
  			green: {
  				main: '#4A803D',
  				second: '#5AA645',
  				third: '#7CBA5A',
  				light: '#ABCF84'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(calc(-350px * 6))'
  				}
  			}
  		},
  		animation: {
  			'infinite-scroll': 'scroll 20s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
        });
      }
    ),
      require("tailwindcss-animate")
],

  
} satisfies Config;
