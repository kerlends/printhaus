import Link from 'next/link';

import { getCollections } from '@lib/shopify';

import { NavbarLink } from '@components/common/NavbarLink';
import { Logo } from '@components/ui/Logo';

export async function Navbar() {
	const collections = await getCollections();
	const links = [{ label: 'All', href: '/' }].concat(
		collections.map(({ title, handle }) => ({
			label: title,
			href: `/category/${handle}`,
		})),
	);

	return (
		<div className="relative flex flex-col items-center justify-center pb-4 pt-8">
			<div className="absolute right-2 top-2 flex justify-end">
				<Link
					href="/tattoos"
					className="rounded-md px-2 py-1 text-sm text-gray-500 underline"
				>
					{'Epitaph Tattoo Booking'}
				</Link>
			</div>
			<Link href="/" className="contents">
				<Logo className="max-w-sm px-6 py-2 md:px-0" />
			</Link>
			<nav className="flex max-w-xs flex-row flex-wrap items-center justify-center gap-4 leading-none md:max-w-5xl">
				{links.map(({ label, href }) => (
					<NavbarLink
						activeClassName="underline font-semibold"
						exact
						key={href}
						href={href}
					>
						{label}
					</NavbarLink>
				))}
			</nav>
		</div>
	);
}
