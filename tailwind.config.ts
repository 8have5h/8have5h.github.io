// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    // Adjust if your structure is different, but these cover common Next.js patterns
    './pages/**/*.{ts,tsx}', // Keep just in case
    './components/**/*.{ts,tsx}', // Keep just in case
    './app/**/*.{ts,tsx}', // Most relevant for App Router
    './src/**/*.{ts,tsx}', // Covers components inside src
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        // Float animation keyframes
        float: {
          '0%': { transform: 'translateY(0px) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translateY(-20px) scale(1.05)', opacity: '0.3' },
          '100%': { transform: 'translateY(0px) scale(1)', opacity: '0.2' },
        },
        // Keyframes often added by shadcn/ui or needed for it
        "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
        },
      },
      animation: {
         // Define the float animation
         float: 'float ease-in-out infinite',
         // Animations often added by shadcn/ui
         "accordion-down": "accordion-down 0.2s ease-out",
         "accordion-up": "accordion-up 0.2s ease-out",
      },
      // You might have other extensions here if you've added shadcn/ui components
      // Example: colors, borderRadius, etc.
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Keep if you plan to use shadcn/ui animations
    require("@tailwindcss/typography") // **** ADD THIS FOR BLOG STYLING ****
  ],
} satisfies Config

export default config