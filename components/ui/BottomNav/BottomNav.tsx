import NavbarLink from '../Navbar/NavbarLink';

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
}

function BottomNav({ items }: Props) {
	return (
		<nav className="flex flex-row gap-8">
			{items.map(({ name, path }) => (
				<NavbarLink key={name} name={name} path={path} />
			))}
		</nav>
	);
}

export default BottomNav;
