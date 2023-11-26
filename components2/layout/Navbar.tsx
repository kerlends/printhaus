import Link from 'next/link';

import NavbarLink from '../common/NavbarLink';
import { getCollections } from '@lib/shopify';
import { Logo } from '@components/ui/Logo';
import { Cart } from '@components/ui/Cart';
import { Suspense } from 'react';
import { OpenCart } from '@components/ui/OpenCart';

export async function Navbar() {
	const collections = await getCollections();

	return (
		<>
			<div className="relative flex flex-col items-center justify-center pb-4 pt-8">
				<div className="absolute right-2 top-2 flex justify-end">
					<Link href="/tattoos" className="rounded-md px-2 py-1 underline">
						{'Epitaph Tattoo Booking'}
					</Link>
				</div>
				<Link href="/" className="contents">
					<Logo className="max-w-sm px-6 py-2 md:px-0" />
				</Link>
				<nav className="flex flex-row items-end space-x-4 leading-none">
					{collections.map(({ title, handle }) => (
						<NavbarLink
							key={handle}
							name={title}
							path={title === 'All' ? '/' : `/category/${handle}`}
						/>
					))}
				</nav>
				<Suspense
					fallback={
						<button aria-label="Open cart" className="mt-2">
							<OpenCart />
						</button>
					}
				>
					<Cart />
				</Suspense>
			</div>
		</>
	);
}
