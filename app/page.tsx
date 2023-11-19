import { ProductGridView } from '@components/product/ProductGridView';
import { getProducts } from '@lib/shopify';
import { addPlaceholderToProducts } from '@utils/plaiceholder';

export default async function IndexPage() {
	const products = await getProducts({
		sortKey: 'CREATED_AT',
		reverse: true,
	});

	const enhancedProducts = await addPlaceholderToProducts(products);

	return (
		<div className="mx-auto max-w-8xl px-6 py-8">
			<ProductGridView items={enhancedProducts} />
		</div>
	);
}

export const dynamic = 'force-static';

export const revalidate = 450;
