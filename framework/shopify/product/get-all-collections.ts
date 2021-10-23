import { CollectionEdge } from '../schema';
import { getConfig, ShopifyConfig } from '../api';
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query';

const getAllCollections = async (options?: {
	variables?: any;
	config: ShopifyConfig;
	preview?: boolean;
}) => {
	let { config, variables = { first: 250 } } = options ?? {};
	config = getConfig(config);

	const { data } = await config.fetch(getAllCollectionsQuery, { variables });
	const edges = data.collections?.edges ?? [];

	const categories = edges.map(
		({
			node: { id: entityId, title: name, handle, products },
		}: CollectionEdge) => ({
			entityId,
			name,
			path: `/${handle}`,
			hasProducts: products.edges.length > 0,
			handle,
		}),
	) as Array<{
		entityId: string;
		name: string;
		path: string;
		hasProducts: boolean;
		handle: string;
	}>;

	return {
		categories,
	};
};

type Awaited<P> = P extends Promise<infer T> ? T : unknown;

type GetAllCollectionsResult = Awaited<ReturnType<typeof getAllCollections>>;
export type CollectionCategory = GetAllCollectionsResult['categories'][0];

export default getAllCollections;
