const colors = require('tailwindcss/colors');

const options = {
	purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				trueGray: colors.trueGray,
			},
		},
		fontFamily: {
			serif: ['Libre Baskerville', 'serif'],
			sans: ['Open Sans', 'sans-serif'],
		},
	},
};

if (process.env.TAILWIND_JIT) {
	options.mode = 'jit';
}

module.exports = options;
