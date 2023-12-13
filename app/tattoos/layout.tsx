import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import heroImage from './hero.png';

export default function TattoosLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="px-6 py-8">
			<div className="absolute right-2 top-2 flex justify-end">
				<Link href="/" className="px-2 py-1 text-sm text-gray-500 underline">
					Back to store
				</Link>
			</div>
			<div className="relative mx-auto mb-8 mt-4 min-h-screen w-full rounded-lg bg-white transition-colors duration-150 dark:bg-trueGray-900 md:mt-16 md:max-w-6xl md:shadow-sm">
				<header className="mx-auto mb-4 max-w-xl md:px-0">
					<Image
						src={heroImage}
						className="mx-auto rounded-sm md:max-w-xl"
						alt="Epitaph Tattoo"
						placeholder="blur"
					/>
				</header>
				<div>{children}</div>
			</div>
		</div>
	);
}

export const dynamic = 'force-static';

export const revalidate = 21600;
