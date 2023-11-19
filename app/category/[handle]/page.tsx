import { ProductGridView } from '@components/product/ProductGridView';
import { getCollectionProducts, getCollections } from '@lib/shopify';
import { getPlaiceholder } from 'plaiceholder';

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

	const enhancedProducts = await Promise.all(
		products.map(async (product) => {
			const image = product.images[0].url;
			const buffer = Buffer.from(
				await fetch(image).then((res) => res.arrayBuffer()),
			);
			const { base64 } = await getPlaiceholder(buffer);
			return {
				...product,
				placeholder: base64,
			};
		}),
	);

	return (
		<div className="mx-auto max-w-8xl px-6 py-8">
			<ProductGridView items={enhancedProducts} />
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
