import { getPages } from '@lib/shopify';
import NavbarLink from '../common/NavbarLink';

export async function Footer() {
	const pages = await getPages();

	return (
		<nav className="flex flex-row gap-8">
			{pages.map(({ handle, title }) => (
				<NavbarLink key={handle} name={title} path={`/${handle}`} />
			))}
		</nav>
	);
}
