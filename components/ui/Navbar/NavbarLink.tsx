import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function NavbarLink(props: {
	children: React.ReactNode;
	onClick: () => any;
}): JSX.Element;
function NavbarLink(props: { path: string; name: string }): JSX.Element;
function NavbarLink(props: {
	path: string;
	children: React.ReactNode;
}): JSX.Element;
function NavbarLink({ children, onClick, path, name }: any) {
	const { asPath: currentPath } = useRouter();

	const className = clsx('font-serif', {
		'underline transform scale-105': path === currentPath,
	});

	if (!path && !name && children && onClick) {
		return (
			<button className={className} onClick={onClick}>
				{children}
			</button>
		);
	}
	return (
		<Link href={path} className={className}>
			{children || name}
		</Link>
	);
}

export default NavbarLink;
