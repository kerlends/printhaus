import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import React from 'react';

import { CartButton } from '@components/layout/CartButton';
import { Footer } from '@components/layout/Footer';
import { Toast } from '@components/ui/Toast';
import { ToastProvider } from '@components/ui/context';

import './globals.css';

const font = Libre_Baskerville({
	display: 'swap',
	style: 'normal',
	weight: ['400', '700'],
	preload: true,
	variable: '--libre-baskerville',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://printhaus.co'),
	description: [
		'A hauntingly eclectic exploration of both the ethereal and unsettling themes of life and death.',
		'The fantastical and the spectral are at the forefront of the images created by Printhaus.',
	].join(' '),
	title: 'PRINTHAUS',
	twitter: {
		card: 'summary_large_image',
		creator: 'Printhaus',
		images: [
			{
				url: 'https://res.cloudinary.com/njosnavel/image/upload/c_scale,h_1800/v1635066678/printhaus/16055C0A-6068-4815-85A9-902624CDFB63_iaxueh.jpg',
				alt: 'SICLE',
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={font.variable}>
			<head>
				<link rel="shortcut icon" href="/icon-100.png" />
			</head>
			<body className="flex min-h-screen flex-col dark:bg-trueGray-700 dark:text-white">
				<ToastProvider>
					<div className="flex flex-1 p-2">
						<div className="relative mx-auto mb-8 w-full flex-1 rounded-lg bg-white transition-colors duration-150 dark:bg-trueGray-900 md:mt-16 md:max-w-6xl md:shadow-sm">
							{children}
							<CartButton />
						</div>
					</div>
					<div className="my-8 flex justify-center">
						<Footer />
					</div>
					<Toast />
				</ToastProvider>
				<Analytics />
			</body>
		</html>
	);
}
