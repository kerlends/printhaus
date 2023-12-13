/** @type {import('prettier').Config} */
const config = {
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'all',
	plugins: [
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports',
	],
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'^@lib/(.*)$',
		'^@components/(.*)$',
		'^[./]',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};

export default config;
