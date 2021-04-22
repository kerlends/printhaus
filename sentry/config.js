const { getSentryRelease } = require('@sentry/node');
const { logger } = require('@sentry/utils');
const defaultWebpackPlugin = require('@sentry/webpack-plugin');
const fs = require('fs');

const SentryWebpackPlugin = defaultWebpackPlugin;

function withSentryConfig(
	providedExports = {},
	providedWebpackPluginOptions = {},
) {
	const defaultWebpackPluginOptions = {
		release: getSentryRelease(),
		url: process.env.SENTRY_URL,
		org: process.env.SENTRY_ORG,
		project: process.env.SENTRY_PROJECT,
		authToken: process.env.SENTRY_AUTH_TOKEN,
		configFile: 'sentry.properties',
		stripPrefix: ['webpack://_N_E/'],
		urlPrefix: `~/_next`,
		include: '.next/',
		ignore: ['node_modules', 'webpack.config.js'],
	};
	const webpackPluginOptionOverrides = Object.keys(defaultWebpackPluginOptions)
		.concat('dryrun')
		.map((key) => key in Object.keys(providedWebpackPluginOptions));
	if (webpackPluginOptionOverrides.length > 0) {
		logger.warn(
			'[next-plugin-sentry] You are overriding the following automatically-set SentryWebpackPlugin config options:\n' +
				`\t${webpackPluginOptionOverrides.toString()},\n` +
				"which has the possibility of breaking source map upload and application. This is only a good idea if you know what you're doing.",
		);
	}

	return {
		...providedExports,
		experimental: { plugins: true },
		plugins: [...(providedExports.plugins || []), '@sentry/next-plugin-sentry'],
		productionBrowserSourceMaps: true,
		webpack: (config, { dev }) => {
			if (!dev) {
				// Ensure quality source maps in production. (Source maps aren't uploaded in dev, and besides, Next doesn't let
				// you change this is dev even if you want to - see
				// https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md.)
				config.devtool = 'source-map';
			}
			config.plugins.push(
				// TODO it's not clear how to do this better, but there *must* be a better way
				new SentryWebpackPlugin({
					dryRun: dev,
					...defaultWebpackPluginOptions,
					...providedWebpackPluginOptions,
				}),
			);
			return config;
		},
	};
}

module.exports = { withSentryConfig };
