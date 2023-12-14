import { getPlaiceholder } from 'plaiceholder';

import type { Product } from '@lib/shopify/types';

export async function addPlaceholderToProduct(
	product: Product,
	details?: boolean,
) {
	const url = new URL(
		details ? product.images[0].url : product.images[0].smallUrl,
	);
	// url.search = '';
	const image = url.href;

	try {
		const buffer = Buffer.from(
			await fetch(image, { cache: 'no-cache' }).then((res) =>
				res.arrayBuffer(),
			),
		);

		const { base64 } = await getPlaiceholder(buffer);

		return {
			...product,
			placeholder: base64,
		};
	} catch (err) {
		console.error(err);
		return { ...product, placeholder: '' };
	}
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
