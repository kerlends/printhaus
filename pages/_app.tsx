import { AppProps } from 'next/app';
import '../styles/globals.css';

import { Layout as DefaultLayout } from '@components/ui';

function MyApp({ Component, pageProps }: AppProps) {
	const Layout = (Component as any).Layout || DefaultLayout;
	return (
		<Layout pageProps={pageProps}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
