'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

interface NavbarLinkProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
	activeClassName?: string;
	exact?: boolean;
	href: string;
}

export function NavbarLink({
	activeClassName,
	className,
	exact,
	href,
	...props
}: NavbarLinkProps) {
	const pathname = usePathname();
	const isActive = useMemo(() => {
		if (exact) {
			return pathname === href;
		}

		return href.startsWith(pathname);
	}, [pathname, exact]);
	return (
		<Link
			{...props}
			href={href}
			className={clsx(
				'text-center font-serif',
				isActive && activeClassName,
				className,
			)}
		/>
	);
}
