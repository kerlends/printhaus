import { ProductDetails } from '@components/product/ProductDetails';
import { getProduct, getProducts } from '@lib/shopify';
import { redirect } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

export default async function ProductDetailsPage({
	params,
}: {
	params: { handle: string };
}) {
	const product = await getProduct(params.handle);

	if (!product) {
		redirect('/');
	}

	const image = product.images[0].url;
	const buffer = Buffer.from(
		await fetch(image).then((res) => res.arrayBuffer()),
	);
	const { base64 } = await getPlaiceholder(buffer);

	const enhancedProduct = {
		...product,
		placeholder: base64,
	};

	return <ProductDetails item={enhancedProduct} />;
}

export async function generateStaticParams() {
	const products = await getProducts({});

	return products.map(({ handle }) => ({
		handle,
	}));
}
