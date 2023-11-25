import { ProductDetails } from '@components/product/ProductDetails';
import { getProduct, getProducts } from '@lib/shopify';
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

	return <ProductDetails item={product} />;
}

export async function generateStaticParams() {
	const products = await getProducts({});

	return products.map(({ handle }) => ({
		handle,
	}));
}
