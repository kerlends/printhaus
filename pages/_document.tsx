import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getSocialMetas } from '@utils/seo';

const keywords = [
	'print',
	'printhaus',
	'portlandoregonisdead',
	'spooky',
	'metal',
	'witchcraft',
	'goth',
	'gothic',
	'goth girl',
	'creepy',
	'occult',
	'satan',
	'witch',
	'dark artist',
	'macabre',
	'lord of the rings',
	'dark art',
	'dark aesthetic',
	'aesthetic',
	'cottagecore',
	'dark photography',
	'iceland',
];
class PrinthausDocument extends Document {
	_renderMeta() {
		const tags = getSocialMetas({
			url: 'https://printhaus.co',
			keywords,
			description: [
				'A hauntingly eclectic exploration of both the ethereal and unsettling themes of life and death.',
				'The fantastical and the spectral are at the forefront of the images created by Printhaus.',
			].join(' '),
			title: 'PRINTHAUS',
			image:
				'https://res.cloudinary.com/njosnavel/image/upload/c_scale,h_1800/v1635066678/printhaus/16055C0A-6068-4815-85A9-902624CDFB63_iaxueh.jpg',
		}).map((props) => <meta {...props} />);
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
					<link rel="shortcut icon" href="/icon-100.png" />
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
