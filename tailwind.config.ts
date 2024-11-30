import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'phone': '0px',
        'tablet': '481px',
        'laptop': '769px',
        'desktop': '1280px'
      },
      // screens: {
      //   // Phone breakpoints
      //   'phone-sm': '320px',   // Small phones
      //   'phone-md': '375px',   // Medium phones
      //   'phone-lg': '425px',   // Large phones
      //
      //   // Tablet breakpoints
      //   'tablet-sm': '576px',  // Small tablets
      //   'tablet-md': '768px',  // Medium tablets
      //   'tablet-lg': '992px',  // Large tablets
      //
      //   // Desktop breakpoints
      //   'desktop-sm': '1024px', // Small desktops
      //   'desktop-md': '1280px', // Medium desktops
      //   'desktop-lg': '1440px', // Large desktops
      //   'desktop-xl': '1920px'  // Extra large desktops
      // },
      width: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      },
      height: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      },
      fontSize: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      }
    },
  },
  plugins: [],
} satisfies Config;
