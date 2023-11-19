import { Product } from '@lib/shopify/types';
import { getPlaiceholder } from 'plaiceholder';

export async function addPlaceholderToProduct(product: Product) {
	const image = product.images[0].url;

	console.log('[%s] Generating placeholder', product.handle);

	const buffer = Buffer.from(
		await fetch(image).then((res) => res.arrayBuffer()),
	);
	const { base64 } = await getPlaiceholder(buffer);
	console.log('[%s] Placeholder generated', product.handle);
	return {
		...product,
		placeholder: base64,
	};
}

export async function addPlaceholderToProducts(products: Product[]) {
	const enhancedProducts = await Promise.all(
		products.map(async (product) => {
			const image = product.images[0].url;

			console.log('[%s] Generating placeholder', product.handle);

			const buffer = Buffer.from(
				await fetch(image).then((res) => res.arrayBuffer()),
			);
			const { base64 } = await getPlaiceholder(buffer);
			console.log('[%s] Placeholder generated', product.handle);
			return {
				...product,
				placeholder: base64,
			};
		}),
	);

	return enhancedProducts;
}

export type EnhancedProduct = Product & {
	placeholder: string;
};
