import React from 'react';
import { Container, Navbar } from '@components/ui';
import styles from './Layout.module.css';

interface Props {
	children: React.ReactNode;
	pageProps: any;
}

export default function Layout({ children, pageProps }: Props) {
	const navItems = [
		{ path: '/about', name: 'About' },
		...pageProps.categories.map((cat) => ({
			path: `/${cat.handle}`,
			name: cat.title,
		})),
		{ path: '/contact', name: 'Contact' },
	];

	return (
		<div className={styles.root}>
			<Navbar items={navItems} />
			<Container>{children}</Container>
		</div>
	);
}
