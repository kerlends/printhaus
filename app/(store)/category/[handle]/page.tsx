import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

	return (
		<div className="max-w-8xl mx-auto">
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

export const runtime = 'edge';
