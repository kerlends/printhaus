const webpack = require('webpack');
const { withPlaiceholder } = require('@plaiceholder/next');
const { withSentryConfig } = require('./sentry/config');
const commerce = require('./commerce.config.json');
const {
	withCommerceConfig,
	getProviderName,
} = require('./framework/commerce/config');

const provider = commerce.provider || getProviderName();
const isBC = provider === 'bigcommerce';
const isShopify = provider === 'shopify';

const applyPlugins = (config, ...plugins) => {
	for (plugin of plugins) {
		if (plugin) {
			config = plugin(config);
		}
	}
	return config;
};

let config = withCommerceConfig({
	commerce,
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	rewrites() {
		return [
			(isBC || isShopify) && {
				source: '/checkout',
				destination: '/api/bigcommerce/checkout',
			},
			// The logout is also an action so this route is not required, but it's also another way
			// you can allow a logout!
			isBC && {
				source: '/logout',
				destination: '/api/bigcommerce/customers/logout?redirect_to=/',
			},
			// Rewrites for /search
			{
				source: '/search/designers/:name',
				destination: '/search',
			},
			{
				source: '/search/designers/:name/:category',
				destination: '/search',
			},
			{
				// This rewrite will also handle `/search/designers`
				source: '/search/:category',
				destination: '/search',
			},
		].filter((x) => x);
	},
});

function withProgressPlugin(config) {
	config.plugins = [
		...(config.plugins || []),
		new webpack.ProgressPlugin((percentage, message, ...args) => {
			// e.g. Output each progress message directly to the console:
			console.info(percentage, message, ...args);
		}),
	];

	return config;
}

const isDev = process.env.NODE_ENV === 'development';

module.exports = applyPlugins(
	config,
	withPlaiceholder,
	!isDev && withSentryConfig,
	isDev && withProgressPlugin,
);

/*
module.exports = withPlaiceholder(
	withVanillaExtract(isDev ? moduleExports : withSentryConfig(moduleExports)),
);
*/

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
