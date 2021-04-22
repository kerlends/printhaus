import { GraphQLFetcherResult } from '@commerce/api';
import { Product } from '@commerce/types';
import { getConfig, ShopifyConfig } from '../api';
import { normalizeProduct, getProductQuery, NormalizedProduct } from '../utils';

type Variables = {
	slug: string;
};

type ReturnType = {
	product: NormalizedProduct;
};

const getProduct = async (options: {
	variables: Variables;
	config: ShopifyConfig;
	preview?: boolean;
}): Promise<ReturnType> => {
	let { config, variables } = options ?? {};
	config = getConfig(config);

	const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
		variables,
	});
	const { productByHandle } = data;

	if (!productByHandle) {
		console.error(data);
		throw new Error(`Invalid return`);
	}

	return {
		product: normalizeProduct(productByHandle),
	};
};

export default getProduct;
