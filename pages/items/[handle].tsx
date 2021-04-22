import {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { getConfig } from '@framework/api';
import getAllProductPaths from '@framework/product/get-all-product-paths';
import getProduct from '@framework/product/get-product';

import { ProductDetails } from '@components/product';
import { NormalizedProduct } from '@framework/utils';
import { getCommonStaticPageData } from '@utils/commonData';

export async function getStaticPaths({ defaultLocale }: GetStaticPathsContext) {
	const { products } = await getAllProductPaths();

	return {
		paths: products.map((product) => `/items${product.node.path}`),
		fallback: 'blocking',
	};
}

export async function getStaticProps({
	preview,
	locale,
	params,
}: GetStaticPropsContext<{ handle: string }>) {
	const config = getConfig({ locale });
	const [{ product }, commonPageData] = await Promise.all([
		getProduct({
			variables: { slug: params!.handle },
			config,
			preview,
		}),
		getCommonStaticPageData({ locale, preview }),
	]);

	return {
		props: {
			...commonPageData,
			product: (product as any) as NormalizedProduct,
			locale,
		},
		revalidate: 14400,
	};
}

export default function Product(
	props: InferGetStaticPropsType<typeof getStaticProps>,
) {
	return <ProductDetails {...props.product} locale={props.locale ?? 'en-us'} />;
}
