import { getProducts } from '@lib/shopify';

import { ProductGridView } from '@components/product/ProductGridView';

export default async function IndexPage() {
	const products = await getProducts({
		sortKey: 'CREATED_AT',
		reverse: true,
	});

	return (
		<div className="max-w-8xl relative mx-auto">
			<ProductGridView items={products} />
		</div>
	);
}

export const metadata = {
	description:
		'A hauntingly eclectic exploration of both the ethereal and unsettling themes of life and death. ' +
		'The fantastical and the spectral are at the forefront of the images created by Printhaus.',
	openGraph: {
		type: 'website',
	},
};

export const runtime = 'edge';
