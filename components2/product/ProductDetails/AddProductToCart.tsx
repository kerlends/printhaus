'use client';

import { ProductVariant } from '@lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { AddToCartForm } from './AddToCartForm';

interface AddProductToCartProps {
	variants: ProductVariant[];
	defaultVariant?: ProductVariant;
}

export function AddProductToCart({
	defaultVariant,
	variants,
}: AddProductToCartProps) {
	const searchParams = useSearchParams();

	const hasSelections =
		variants.length > 1 && !defaultVariant
			? variants[0].selectedOptions.every((opt) => {
					return searchParams.has(opt.name.toLowerCase());
			  })
			: true;

	let variant =
		variants.length > 1
			? variants.find((variant: ProductVariant) =>
					variant.selectedOptions.every(
						(option) =>
							option.value === searchParams.get(option.name.toLowerCase()),
					),
			  )
			: undefined;

	if (!variant && defaultVariant) {
		variant = defaultVariant;
	}

	const selectedVariantId = variant?.id ?? '';

	return (
		<AddToCartForm
			disabled={!hasSelections}
			variantOutOfStock={!variant && hasSelections}
			variantId={selectedVariantId}
		/>
	);
}
