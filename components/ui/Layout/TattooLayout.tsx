import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	BottomNav,
	Cart,
	Container,
	Sidebar,
	Toast,
	UIProvider,
} from '@components/ui';
import { CommerceProvider } from '@framework';
import { Page } from '@framework/common/get-all-pages';
import { CollectionCategory } from '@framework/product/get-all-collections';
import heroImage from './hero.png';

interface Props {
	children: React.ReactNode;
	pageProps: {
		pages: Page[];
		categories: CollectionCategory[];
		locale: string;
	};
}

export default function TattooLayout({ children, pageProps }: Props) {
	const secondaryNavItems = (pageProps.pages || []).map((page) => ({
		path: `/${page.handle}`,
		name: page.name,
	}));

	return (
		<CommerceProvider locale={pageProps.locale || 'en-US'}>
			<UIProvider>
				<div className="md:max-w-6xl min-h-screen bg-white dark:bg-trueGray-900 mx-auto transition-colors duration-150 md:shadow-sm md:mt-16 mb-8 rounded-lg relative">
					<header className="max-w-xl mx-auto px-6 md:px-0">
						<div className="py-4 flex justify-end">
							<Link href="/" className="underline">
								Back to store
							</Link>
						</div>
						<Image
							src={heroImage}
							className="md:max-w-xl rounded-sm mx-auto"
							alt="Epitaph Tattoo"
							placeholder="blur"
						/>
					</header>
					<Container>{children}</Container>
				</div>
				<div className="flex justify-center my-8">
					<BottomNav items={secondaryNavItems} />
				</div>
				<Sidebar>
					<Cart />
				</Sidebar>
				<Toast />
			</UIProvider>
		</CommerceProvider>
	);
}
