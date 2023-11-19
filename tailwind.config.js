const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.tsx',
		'./app/*.tsx',
		'./components/**/*.tsx',
		'./components/*.tsx',
		'./components2/**/*.tsx',
		'./components2/*.tsx',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				trueGray: colors.neutral,
			},
		},
		fontFamily: {
			serif: ['var(--libre-baskerville)', 'serif'],
			//sans: ['Open Sans', 'sans-serif'],
		},
	},
};
