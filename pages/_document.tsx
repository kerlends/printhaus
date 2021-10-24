import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getSocialMetas } from '@utils/seo';

class PrinthausDocument extends Document {
	_renderMeta() {
		const tags = Object.entries(
			getSocialMetas({
				url: 'https://printhaus.co',
				keywords: 'goth,photography,stuff',
				description: [
					'A hauntingly eclectic exploration of both the ethereal and unsettling themes of life and death.',
					'The fantastical and the spectral are at the forefront of the images created by Printhaus.',
				].join(' '),
				title: 'PRINTHAUS',
			}),
		).map(([property, content]) => (
			<meta key={property} property={property} content={content} />
		));
		return tags;
	}
	render() {
		return (
			<Html>
				<Head>
					{this._renderMeta()}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Open+Sans:wght@400;600&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="dark:bg-trueGray-700 dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default PrinthausDocument;
