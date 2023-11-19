import { ProductGridView } from '@components/product/ProductGridView';
import { getCollectionProducts, getCollections } from '@lib/shopify';

export default async function CategoryPage({
	params,
}: {
	params: { handle: string };
}) {
	const products = await getCollectionProducts({
		collection: params.handle,
		sortKey: 'CREATED_AT',
		reverse: true,
	});

	return (
		<div className="mx-auto max-w-8xl px-6 py-8">
			<ProductGridView items={products} />
		</div>
	);
}

export async function generateStaticParams() {
	const categories = await getCollections();
	return categories.map(({ handle }) => ({
		handle,
	}));
}

export const dynamic = 'force-static';

export const revalidate = 450;
