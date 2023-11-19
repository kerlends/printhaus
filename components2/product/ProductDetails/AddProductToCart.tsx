'use client';

import { AddToCartButton } from '@components/AddToCartButton';
import { ProductVariant } from '@lib/shopify/types';
import { useSearchParams } from 'next/navigation';

interface AddProductToCartProps {
	variants: ProductVariant[];
}

export function AddProductToCart({ variants }: AddProductToCartProps) {
	const searchParams = useSearchParams();

	const variant = variants.find((variant: ProductVariant) =>
		variant.selectedOptions.every(
			(option) => option.value === searchParams.get(option.name.toLowerCase()),
		),
	);

	const selectedVariantId = variant?.id || variants[0].id;

	return <AddToCartButton variantId={selectedVariantId} />;
}
