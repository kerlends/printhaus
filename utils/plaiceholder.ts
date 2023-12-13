import { getPlaiceholder } from 'plaiceholder';

import type { Product } from '@lib/shopify/types';

export async function addPlaceholderToProduct(product: Product) {
	const url = new URL(product.images[0].url);
	url.search = '';
	const image = url.href;

	const buffer = Buffer.from(
		await fetch(image).then((res) => res.arrayBuffer()),
	);
	const { base64 } = await getPlaiceholder(buffer);

	return {
		...product,
		placeholder: base64,
	};
}

export type ProductWithPlaceholder = Awaited<
	ReturnType<typeof addPlaceholderToProduct>
>;

export async function addPlaceholderToProducts(products: Product[]) {
	const enhancedProducts = await Promise.all(
		products.map((product) => addPlaceholderToProduct(product)),
	);

	return enhancedProducts;
}

export type EnhancedProduct = Product & {
	placeholder: string;
};
