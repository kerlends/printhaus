import { ProductDetails } from '@components/product/ProductDetails';
import { HIDDEN_PRODUCT_TAG } from '@lib/constants';
import { getProduct, getProducts } from '@lib/shopify';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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

export async function generateMetadata({
	params,
}: {
	params: { handle: string };
}): Promise<Metadata> {
	const product = await getProduct(params.handle);

	if (!product) return notFound();

	const { url, width, height, altText: alt } = product.featuredImage || {};
	const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

	return {
		title: product.seo.title || product.title,
		description: product.seo.description || product.description,
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},
		openGraph: url
			? {
					images: [
						{
							url,
							width,
							height,
							alt,
						},
					],
			  }
			: null,
	};
}

export const runtime = 'edge';
