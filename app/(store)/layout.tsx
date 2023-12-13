import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { Navbar } from '@components/layout/Navbar';

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

export default function StoreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<Suspense>
				<main className="max-w-8xl mx-auto px-6 py-2">{children}</main>
			</Suspense>
		</>
	);
}
