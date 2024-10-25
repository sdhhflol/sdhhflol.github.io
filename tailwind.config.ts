import { transform } from "next/dist/build/swc";
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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        roll: {
          '0%': { transform: 'translateX(-1000px) rotate(-720deg)', filter: "blur(50px)", opacity: '0'},
          '100%' : { transform : 'translateX(0) rotate(0deg)', filter: "blur(0px)", opacity: '1'} 
        },
        puff: {
          '0%': { transform: "scale(2)", filter: "blur(4px)", opacity: '0'},
          '100%': { transform: "scale(1)", filter: "blur(0px)", opacity: '1'}
        },
        fade: {
          '0%': {opacity: '0', filter: "blur(5px)"},
          '100%': {opacity: '1', filter: "blur(0px)"}
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        roll: 'roll 1s ease-in-out',
        puff: 'puff 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;',
        fade: 'fade 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;'
      }
      
    },
  },
  plugins: [],
};
export default config;