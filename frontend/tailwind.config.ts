// import type { Config } from 'tailwindcss';

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './utils/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['var(--font-geist-sans)'],
//         mono: ['var(--font-geist-mono)'],
//       },
//       spacing: {
//         '0.5vh': '0.5vh',
//         '1vh': '1vh',
//         '0.5vw': '0.5vw',
//         '1vw': '1vw',
//       },
//       colors: {
//         // Darker Day Theme
//         'day-primary': '#B26400', // Darkened Princeton Orange
//         'day-secondary': '#333333', // Softened Black
//         'day-accent': '#093E70', // Darkened Princeton Blue
//         'day-text': '#D9D9D9', // Light Gray for text

//         // Night Theme
//         'night-primary': '#121212', // Near Black
//         'night-secondary': '#1E1E1E', // Dark Gray
//         'night-accent': '#324A5E', // Soft Blue
//         'night-text': '#E0E0E0', // Soft White for text
//       },
//       textColor: {
//         'compass-blue': '#0F1E2F',
//         'compass-gray': '#F6F6F6',
//         'compass-black': '#2C2C2C',
//         'compass-purple': '#663399',
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       backgroundColor: {
//         'dnd-gray': 'rgba(0, 0, 0, 0.05)', // Background "on hover" color dnd uses
//       },
//     },
//   },
//   plugins: [require('evergreen-ui'), require('@tailwindcss/forms')],
// };

// export default config;

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
