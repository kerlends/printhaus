import { NavbarLink } from '@components/common/NavbarLink';

type NavItem =
	| {
			path: string;
			name: string;
	  }
	| {
			path: never;
			name: 'separator';
	  };

interface BottomNavProps {
	items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
	return (
		<nav className="flex flex-row gap-8">
			{items.map(({ name, path }) => (
				<NavbarLink key={name} href={path}>
					{name}
				</NavbarLink>
			))}
		</nav>
	);
}
