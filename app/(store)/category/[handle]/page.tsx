import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import {
	getCollection,
	getCollectionProducts,
	getCollections,
} from '@lib/shopify';

import { ProductGridView } from '@components/product/ProductGridView';

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

	const productsWithImagePlaceholders = await Promise.all(
		products.map(async (product) => {
			try {
				const buffer = Buffer.from(
					await fetch(product.images[0].url).then((res) => res.arrayBuffer()),
				);
				const { base64 } = await getPlaiceholder(buffer);
				return {
					...product,
					imagePlaceholder: base64,
				};
			} catch (err) {
				console.error(err);
				return {
					...product,
					imagePlaceholder: '',
				};
			}
		}),
	);

	return (
		<div className="max-w-8xl mx-auto">
			<ProductGridView items={productsWithImagePlaceholders} />
		</div>
	);
}

export async function generateStaticParams() {
	const categories = await getCollections();
	return categories.map(({ handle }) => ({
		handle,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { handle: string };
}): Promise<Metadata> {
	const collection = await getCollection(params.handle);

	if (!collection) return notFound();

	return {
		title: collection.seo?.title || collection.title,
		description:
			collection.seo?.description ||
			collection.description ||
			`${collection.title} products`,
	};
}

export const dynamic = 'force-static';

export const revalidate = 1800;
