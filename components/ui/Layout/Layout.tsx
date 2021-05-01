import React from 'react';
import {
	BottomNav,
	Cart,
	Container,
	Navbar,
	Sidebar,
	Toast,
	UIProvider,
} from '@components/ui';
import { CommerceProvider } from '@framework';
import { Page } from '@framework/common/get-all-pages';
import { CollectionCategory } from '@framework/product/get-all-collections';

interface Props {
	children: React.ReactNode;
	pageProps: {
		pages: Page[];
		categories: CollectionCategory[];
		locale: string;
	};
}

export default function Layout({ children, pageProps }: Props) {
	const secondaryNavItems = (pageProps.pages || []).map((page) => ({
		path: `/${page.handle}`,
		name: page.name,
	}));

	const navItems = (pageProps.categories || []).map((cat) => ({
		path: `/${cat.handle}`,
		name: cat.name,
	}));

	return (
		<CommerceProvider locale={pageProps.locale || 'en-US'}>
			<UIProvider>
				<div className="md:max-w-6xl min-h-screen bg-white mx-auto transition-colors duration-150 md:shadow-sm md:mt-16 mb-8 rounded-lg">
					<Navbar items={navItems} />
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
