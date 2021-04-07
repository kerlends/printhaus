import Client from 'shopify-buy';
import { ShopifyConfig } from '..';

type Options = {
	config: ShopifyConfig;
	id: string;
};

const getCollection = async ({ config, id }: Options): Promise<any[]> => {
	const client = Client.buildClient({
		storefrontAccessToken: config.apiToken,
		domain: config.commerceUrl,
	});

	const res = await client.collection.fetchWithProducts(id);

	return JSON.parse(JSON.stringify(res));
};

export default getCollection;
