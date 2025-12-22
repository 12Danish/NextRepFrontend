/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--color-border) / <alpha-value>)",
        input: "rgb(var(--color-input) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)",
          foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover) / <alpha-value>)",
          foreground: "rgb(var(--color-popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--color-card) / <alpha-value>)",
          foreground: "rgb(var(--color-card-foreground) / <alpha-value>)",
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ['calc(0.75rem * var(--font-size-scale))', { lineHeight: '1rem' }],
        sm: ['calc(0.875rem * var(--font-size-scale))', { lineHeight: '1.25rem' }],
        base: ['calc(1rem * var(--font-size-scale))', { lineHeight: '1.5rem' }],
        lg: ['calc(1.125rem * var(--font-size-scale))', { lineHeight: '1.75rem' }],
        xl: ['calc(1.25rem * var(--font-size-scale))', { lineHeight: '1.75rem' }],
        '2xl': ['calc(1.5rem * var(--font-size-scale))', { lineHeight: '2rem' }],
        '3xl': ['calc(1.875rem * var(--font-size-scale))', { lineHeight: '2.25rem' }],
        '4xl': ['calc(2.25rem * var(--font-size-scale))', { lineHeight: '2.5rem' }],
        '5xl': ['calc(3rem * var(--font-size-scale))', { lineHeight: '1' }],
        '6xl': ['calc(3.75rem * var(--font-size-scale))', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}