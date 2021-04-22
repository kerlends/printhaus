import {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { getConfig } from '@framework/api';
import getAllCollections from '@framework/product/get-all-collections';

import {
	getProductListPageData,
	getCommonStaticPageData,
} from '@utils/commonData';
import { ProductGridView } from '@components/product';

export async function getStaticPaths({ defaultLocale }: GetStaticPathsContext) {
	const config = getConfig({ locale: defaultLocale });
	const collections = await getAllCollections({
		config,
	});
	const categories = collections.categories.filter(
		(category) => category.hasProducts,
	);

	return {
		paths: categories.map((category) => ({
			params: { handle: category.handle },
		})),
		fallback: false,
	};
}

export async function getStaticProps({
	preview,
	locale,
	params,
}: GetStaticPropsContext<{ handle: string }>) {
	const [commonPageData, products] = await Promise.all([
		getCommonStaticPageData({ preview, locale }),
		getProductListPageData({ preview, locale, collection: params!.handle }),
	]);

	return {
		props: {
			...commonPageData,
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
