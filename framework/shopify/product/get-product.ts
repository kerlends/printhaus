import { getPlaiceholder } from 'plaiceholder';
import { GraphQLFetcherResult } from '@commerce/api';
import { Product } from '@commerce/types';
import { getConfig, ShopifyConfig } from '../api';
import { normalizeProduct, getProductQuery, NormalizedProduct } from '../utils';

type Variables = {
	slug: string;
};

type ReturnType = {
	product: NormalizedProduct;
	imageProps: {
		src: string;
		height: number;
		width: number;
		blurDataURL: string;
	} | null;
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

	const normalizedProduct = normalizeProduct(productByHandle);
	const image = normalizedProduct.images[0];

	return {
		product: normalizedProduct,
		imageProps: image
			? {
					src: image.url,
					height: image.height ?? 0,
					width: image.width ?? 0,
					blurDataURL: await getPlaiceholder(image.url, {
						size: 64,
					}).then(({ base64 }) => base64),
			  }
			: null,
	};
};

export default getProduct;
