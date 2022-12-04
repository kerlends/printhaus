import { forwardRef } from 'react';
import Link from 'next/link';

import type { LineItem } from '@commerce/types';
import useCart from '@commerce/cart/use-cart';
import { Logo } from '@components/ui';
import { Badge } from '@components/common';

import NavbarLink from './NavbarLink';
import { useUI } from '../context';
import { useRouter } from 'next/router';

type NavItem =
	| {
			path: string;
			name: string;
	  }
	| {
			path: never;
			name: 'separator';
	  };

interface Props {
	items: NavItem[];
	secondaryItems?: NavItem[];
}

function countItems(count: number, item: LineItem) {
	return count + item.quantity;
}

const Navbar = forwardRef<HTMLDivElement, Props>(function Navbar(
	{ items, secondaryItems },
	ref,
) {
	const router = useRouter();
	const { data } = useCart();
	const { openSidebar } = useUI();
	const itemsCount = data?.lineItems.reduce(countItems, 0) ?? 0;

	return (
		<div
			className="flex flex-col justify-center items-center py-8 relative"
			ref={ref}
		>
			<div className="absolute top-2 right-2 flex justify-end">
				<Link href="/tattoos" className="px-2 py-1 rounded-md underline">
					{'Epitaph Tattoo'}
				</Link>
			</div>
			{router.pathname.startsWith('/tattoos') ? null : (
				<>
					<nav className="flex flex-row space-x-2 mt-1 lowercase">
						{secondaryItems &&
							secondaryItems.map(({ name, path }) => (
								<NavbarLink key={name} name={name} path={path} />
							))}
					</nav>
					<Link href="/" className="contents">
						<Logo className="max-w-sm py-2 px-6 md:px-0" />
					</Link>
					<nav className="flex flex-row space-x-4 items-end leading-none">
						{items.map(({ name, path }) => (
							<NavbarLink key={name} name={name} path={`/category${path}`} />
						))}
						<NavbarLink onClick={openSidebar}>
							<Badge value={itemsCount}>Cart</Badge>
						</NavbarLink>
					</nav>
				</>
			)}
		</div>
	);
});

export default Navbar;
