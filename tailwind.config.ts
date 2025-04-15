
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced agriculture color palette with better contrast
				"agro-primary": "#3a7e4f",
				"agro-primary-dark": "#2e6740",
				"agro-secondary": "#8bc34a",
				"agro-accent": "#f9a826",
				"agro-accent-dark": "#e69718",
				"agro-light": "#f5f7fa",
				"agro-dark": "#2d3748",
				"agro-text": "#333333",
				"agro-text-light": "#6c757d",
				"agro-border": "#d1d5db",
				"agro-background": "#ffffff",
				// Dashboard specific colors
				"dashboard-plantio": "#3a7e4f",  // Verde
				"dashboard-pulverizacao-terrestre": "#0ea5e9",  // Azul
				"dashboard-pulverizacao-aerea": "#f9a826",  // Amarelo
				"dashboard-colheita": "#f97316",  // Laranja
				"dashboard-text": "#2d3748",
				"dashboard-background": "#f5f7fa",
				"dashboard-card": "#ffffff",
				"dashboard-border": "#e2e8f0",
				"dashboard-hover": "#f1f5f9",
				"dashboard-accent": "#d946ef",
				"dashboard-error": "#ea384c",
				"dashboard-success": "#10b981",
				"dashboard-warning": "#f59e0b",
				"dashboard-info": "#0ea5e9",
				// Financial section
				"financial-income": "#10b981",
				"financial-expense": "#ea384c",
				"financial-neutral": "#6c757d",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
