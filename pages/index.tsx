import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { ProductGridView } from '@components/product';
import {
	getCommonStaticPageData,
	getProductListPageData,
} from '@utils/commonData';
import styles from '../styles/Home.module.css';

export async function getStaticProps({
	preview,
	locale,
}: GetStaticPropsContext) {
	const [commonPageData, products] = await Promise.all([
		getCommonStaticPageData({ preview, locale }),
		getProductListPageData({ preview, locale }),
	]);

	return {
		props: {
			...commonPageData,
			products,
		},
		revalidate: process.env.NODE_ENV !== 'development' ? 14400 : undefined,
	};
}

export default function Home(
	props: InferGetStaticPropsType<typeof getStaticProps>,
) {
	return (
		<>
			<Head>
				<title>printhausco</title>
			</Head>
			<ProductGridView items={props.products} />
		</>
	);
}
