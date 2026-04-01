/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'var(--surface)',
				foreground: 'var(--on-surface)',
				
				/* New Design System Colors */
				primary: {
					DEFAULT: 'var(--primary)',
					deep: 'var(--primary-deep)',
					foreground: 'var(--on-primary)',
				},
				surface: {
					DEFAULT: 'var(--surface)',
					container: {
						low: 'var(--surface-container-low)',
						lowest: 'var(--surface-container-lowest)',
						high: 'var(--surface-container-high)',
						highest: 'var(--surface-container-highest)',
					}
				},
				navy: {
					DEFAULT: 'var(--navy)',
					light: 'var(--navy-light)',
					foreground: 'var(--on-navy)',
					variant: 'var(--on-navy-variant)',
				},
				on: {
					surface: 'var(--on-surface)',
					secondary: '#ffffff',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
				tertiary: {
					DEFAULT: 'var(--tertiary)',
					container: 'var(--tertiary-container)',
					fixed: 'var(--tertiary-fixed)',
					'on-fixed': 'var(--on-tertiary-fixed)',
					'on-fixed-variant': 'var(--on-tertiary-fixed-variant)',
				},
				outline: {
					DEFAULT: 'var(--outline)',
					variant: 'var(--outline-variant)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				headline: ['var(--font-headline)', 'sans-serif'],
				body: ['var(--font-body)', 'sans-serif'],
				label: ['var(--font-body)', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius-md)',
				xl: 'var(--radius-xl)',
				full: 'var(--radius-full)',
				md: 'calc(var(--radius-md) - 2px)',
				sm: 'calc(var(--radius-md) - 4px)',
			},
			boxShadow: {
				ambient: 'var(--shadow-ambient)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};