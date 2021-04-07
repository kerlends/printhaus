import Link from 'next/link';
import { Logo } from '@components/ui';

interface NavItem {
	path: string;
	name: string;
}

interface Props {
	items: NavItem[];
}

function Navbar({ items }: Props) {
	return (
		<div className="flex flex-col justify-center items-center py-8">
			<Logo className="max-w-sm py-2" />
			<nav className="flex flex-row gap-8">
				{items.map(({ name, path }) => (
					<Link href={path} key={name}>
						<a className="font-serif">{name}</a>
					</Link>
				))}
			</nav>
		</div>
	);
}

export default Navbar;
