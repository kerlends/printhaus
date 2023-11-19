import { ProductDetails } from '@components/product/ProductDetails';
import { getProduct, getProducts } from '@lib/shopify';
import { addPlaceholderToProduct } from '@utils/plaiceholder';
import { redirect } from 'next/navigation';

export default async function ProductDetailsPage({
	params,
}: {
	params: { handle: string };
}) {
	const product = await getProduct(params.handle);

	if (!product) {
		redirect('/');
	}

	const enhancedProduct = await addPlaceholderToProduct(product);

	return <ProductDetails item={enhancedProduct} />;
}

export async function generateStaticParams() {
	const products = await getProducts({});

	return products.map(({ handle }) => ({
		handle,
	}));
}
