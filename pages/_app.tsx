import { AppProps } from 'next/app';
import '../styles/globals.css';

import { Layout } from '@components/ui';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout pageProps={pageProps}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
