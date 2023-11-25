import withPlaiceholder from '@plaiceholder/next';
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = withPlaiceholder({
	experimental: {
		ppr: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.shopify.com',
				pathname: '/s/files/**',
			},
		],
	},
	redirects() {
		return [
			{
				source: '/store/:path*',
				destination: '/',
				permanent: false,
			},
		];
	},
});

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(nextConfig, null, 2));

// Injected content via Sentry wizard below

export default nextConfig;
/*
export default withSentryConfig(
	nextConfig,
	{
		silent: true,
		org: 'printhaus',
		project: 'web',
	},
	{
		widenClientFileUpload: true,
		hideSourceMaps: true,
	},
);

*/
