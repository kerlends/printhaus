import Link from 'next/link';

import NavbarLink from '../common/NavbarLink';
import { getCollections } from '@lib/shopify';
import { Cart } from '@components/ui/Cart';
import { Logo } from '@components/ui/Logo';

export async function Navbar() {
	const collections = await getCollections();

	return (
		<div className="flex flex-col justify-center items-center py-8 relative">
			<div className="absolute top-2 right-2 flex justify-end">
				<Link href="/tattoos" className="px-2 py-1 rounded-md underline">
					{'Epitaph Tattoo'}
				</Link>
			</div>
			<Link href="/" className="contents">
				<Logo className="max-w-sm py-2 px-6 md:px-0" />
			</Link>
			<nav className="flex flex-row space-x-4 items-end leading-none">
				{collections.map(({ title, handle }) => (
					<NavbarLink
						key={handle}
						name={title}
						path={title === 'All' ? '/' : `/category/${handle}`}
					/>
				))}
				<Cart />
			</nav>
		</div>
	);
}
