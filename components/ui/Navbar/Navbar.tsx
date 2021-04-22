import Link from 'next/link';

import type { LineItem } from '@commerce/types';
import useCart from '@commerce/cart/use-cart';
import { Logo } from '@components/ui';
import { Badge } from '@components/common';

import NavbarLink from './NavbarLink';
import { useUI } from '../context';

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

function Navbar({ items, secondaryItems }: Props) {
	const { data } = useCart();
	const { openSidebar } = useUI();
	const itemsCount = data?.lineItems.reduce(countItems, 0) ?? 0;

	return (
		<div className="flex flex-col justify-center items-center py-8 relative">
			<nav className="flex flex-row gap-8 mt-1 lowercase">
				{secondaryItems &&
					secondaryItems.map(({ name, path }) => (
						<NavbarLink key={name} name={name} path={path} />
					))}
			</nav>
			<Link href="/">
				<a className="contents">
					<Logo className="max-w-sm py-2" />
				</a>
			</Link>
			<nav className="flex flex-row gap-8">
				{items.map(({ name, path }) => (
					<NavbarLink key={name} name={name} path={`/category${path}`} />
				))}
				<NavbarLink onClick={openSidebar}>
					<Badge value={itemsCount}>Cart</Badge>
				</NavbarLink>
			</nav>
		</div>
	);
}

export default Navbar;
