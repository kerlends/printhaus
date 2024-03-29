import withPlaiceholder from '@plaiceholder/next';
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
			{
				source: '/items/:path*',
				destination: '/products/:path*',
				permanent: true,
			},
		];
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
		},
	},
};

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(nextConfig, null, 2));

// Injected content via Sentry wizard below

export default withPlaiceholder(nextConfig);
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
