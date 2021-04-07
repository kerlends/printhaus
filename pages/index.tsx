import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getConfig } from '@framework/api';
import getCategories from '@framework/api/operations/get-categories';
import { ProductGridView } from '@components/product';
import styles from '../styles/Home.module.css';

export async function getStaticProps({
	preview,
	locale,
}: GetStaticPropsContext) {
	const config = getConfig({ locale });
	const result = await getCategories({
		config,
	});

	const categories = result.filter((category) => category.products.length > 0);
	const products = result
		.reduce((products, category) => products.concat(category.products), [])
		.map((product) => ({
			src: product.images?.[0].src.split('?v=')[0] ?? '',
			name: product.title ?? '',
			path: '/items/' + product.handle ?? '404',
		})) as Array<{ src: string; name: string; path: string }>;

	return {
		props: {
			categories,
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
