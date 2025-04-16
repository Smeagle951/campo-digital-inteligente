import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "agro-primary": "#3a7e4f",
        "agro-secondary": "#5a9b6f",
        "agro-dark": "#2a5e3f",
        "agro-text-light": "#6c757d",
        "dashboard-plantio": "#48BB78",
        "dashboard-pulverizacao-terrestre": "#4299E1",
        "dashboard-pulverizacao-aerea": "#ECC94B",
        "dashboard-colheita": "#ED8936",
        "dashboard-accent": "#667EEA",
        "dashboard-warning": "#F6AD55",
        "dashboard-error": "#F56565",
        "dashboard-info": "#4299E1",
        "financial-income": "#38A169",
        "financial-expense": "#E53E3E",
        border: "hsl(var(--border) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border) / <alpha-value>)"
      }
    },
  },
  plugins: [],
}

export default config
