module.exports = {
	future: {
		purgeLayersByDefault: true,
		applyComplexClasses: true,
	},
	purge: {
		content: ['./pages/**/*.tsx', './components/**/.tsx'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			serif: ['Libre Baskerville', 'serif'],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
