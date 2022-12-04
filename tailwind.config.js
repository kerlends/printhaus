const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'pages/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				trueGray: colors.neutral,
			},
		},
		fontFamily: {
			serif: ['Libre Baskerville', 'serif'],
			sans: ['Open Sans', 'sans-serif'],
		},
	},
};
