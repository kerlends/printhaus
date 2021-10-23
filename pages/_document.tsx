import Document, { Html, Head, Main, NextScript } from 'next/document';

class PrinthausDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body className="dark:bg-trueGray-700 dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default PrinthausDocument;
