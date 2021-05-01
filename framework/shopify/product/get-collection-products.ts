import { GraphQLFetcherResult } from '@commerce/api';
import { getConfig, ShopifyConfig } from '../api';
import { ProductEdge } from '../schema';
import { getCollectionProductsQuery } from '../utils/queries';
import { normalizeProduct } from '../utils/normalize';
import { Product } from '@commerce/types';

type Variables = {
	handle: string;
	first?: number;
	field?: string;
};

type ReturnType = {
	products: Product[];
};

const getCollectionProducts = async (options: {
	variables?: Variables;
	config?: ShopifyConfig;
	preview?: boolean;
}): Promise<ReturnType> => {
	let { config, variables = { first: 250 } } = options ?? {};
	config = getConfig(config);

	const { data }: GraphQLFetcherResult = await config.fetch(
		getCollectionProductsQuery,
		{
			variables,
		},
	);

	const products =
		data.collectionByHandle.products?.edges?.map(({ node: p }: ProductEdge) =>
			normalizeProduct(p, true),
		) ?? [];

	return {
		products,
	};
};

export default getCollectionProducts;
