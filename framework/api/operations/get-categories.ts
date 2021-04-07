import Client from 'shopify-buy';
import { ShopifyConfig } from '..';

type Options = {
	config: ShopifyConfig;
};

const getCategories = async (options: Options): Promise<any[]> => {
	const { config } = options;

	const client = Client.buildClient({
		storefrontAccessToken: config.apiToken,
		domain: config.commerceUrl,
	});

	const res = await client.collection.fetchAllWithProducts();

	return JSON.parse(JSON.stringify(res));
};

export default getCategories;
