import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import heroImage from './hero.png';

export default function TattooLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative mx-auto mb-8 min-h-screen w-full rounded-lg bg-white transition-colors duration-150 dark:bg-trueGray-900 md:mt-16 md:max-w-6xl md:shadow-sm">
			<header className="mx-auto max-w-xl px-6 md:px-0">
				<div className="flex justify-end py-4">
					<Link href="/" className="underline">
						Back to store
					</Link>
				</div>
				<Image
					src={heroImage}
					className="mx-auto rounded-sm md:max-w-xl"
					alt="Epitaph Tattoo"
					placeholder="blur"
				/>
			</header>
			<div>{children}</div>
		</div>
	);
}
