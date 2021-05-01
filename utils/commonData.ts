import { getConfig } from '@framework/api';
import getAllCollections from '@framework/product/get-all-collections';
import getAllProducts from '@framework/product/get-all-products';
import getCollectionProducts from '@framework/product/get-collection-products';
import getAllPages from '@framework/common/get-all-pages';

interface GetCommonStaticPageData {
	preview: boolean | undefined;
	locale: string | undefined;
}

export async function getCommonStaticPageData({
	preview,
	locale,
}: GetCommonStaticPageData) {
	const config = getConfig({ locale });
	const [collections, { pages }] = await Promise.all([
		getAllCollections({ variables: { first: 10 }, config }),
		getAllPages({ config, preview }),
	]);

	const categories = collections.categories.filter(
		(category) => category.hasProducts,
	);

	return {
		categories,
		pages,
	};
}

interface GetProductListData extends GetCommonStaticPageData {
	collection?: string;
}

export async function getProductListPageData({
	preview,
	locale,
	collection,
}: GetProductListData) {
	const config = getConfig({ locale });

	const { products } = collection
		? await getCollectionProducts({
				variables: { handle: collection, first: 250 },
				config,
				preview,
		  })
		: await getAllProducts({ variables: { first: 250 }, config, preview });

	return products
		.filter((product) =>
			(product.variants as any).edges.some(
				(variant: any) => variant.node.availableForSale,
			),
		)
		.map((product) => ({
			src: product.images[0]?.url ?? '',
			name: product.name ?? '',
			path: '/items/' + product.slug ?? '404',
			variants: product.variants,
		})) as Array<{ src: string; name: string; path: string }>;
}
