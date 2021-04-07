import {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { getConfig } from '@framework/api';
import getCategories from '@framework/api/operations/get-categories';
import { ProductGridView } from '@components/product';

export async function getStaticPaths({ defaultLocale }: GetStaticPathsContext) {
	const config = getConfig({ locale: defaultLocale });
	const result = await getCategories({
		config,
	});
	const categories = result.filter((category) => category.products.length > 0);

	return {
		paths: categories.map((category) => ({
			params: { category: category.handle },
		})),
		fallback: false,
	};
}

export async function getStaticProps({
	preview,
	locale,
	params,
}: GetStaticPropsContext) {
	const config = getConfig({ locale });
	const result = await getCategories({
		config,
	});

	const categories = result.filter((category) => category.products.length > 0);
	const products = result
		.find((collection) => collection.handle === params.category)
		.products.map((product) => ({
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

export default function Category(
	props: InferGetStaticPropsType<typeof getStaticProps>,
) {
	return <ProductGridView items={props.products} />;
}
