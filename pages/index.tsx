import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
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
		revalidate: 14400,
	};
}

export default function Home(
	props: InferGetStaticPropsType<typeof getStaticProps>,
) {
	return <ProductGridView items={props.products} />;
}
