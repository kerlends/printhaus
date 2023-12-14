'use client';

import { useSearchParams } from 'next/navigation';

import type { Product, ProductVariant } from '@lib/shopify/types';

import { Price } from '@components/common/Price';

interface ProductVariantPriceProps {
	variants: ProductVariant[];
	priceRange: Product['priceRange'];
}

export function ProductVariantPrice({
	variants,
	priceRange,
}: ProductVariantPriceProps) {
	const searchParams = useSearchParams();

	const variant = variants.find((variant: ProductVariant) =>
		variant.selectedOptions.every(
			(option) => option.value === searchParams.get(option.name.toLowerCase()),
		),
	);

	if (!variant) {
		const { minVariantPrice: min, maxVariantPrice: max } = priceRange;
		const isFixedPrice = min.amount === max.amount;

		return (
			<div className="flex items-center justify-center gap-1 text-xl font-medium">
				<Price
					amount={min.amount}
					currencyCode={min.currencyCode}
					currencyCodeClassName="hidden"
				/>
				{!isFixedPrice && (
					<>
						{'-'}
						<Price amount={max.amount} currencyCode={max.currencyCode} />
					</>
				)}
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center gap-1 text-xl font-medium">
			<Price
				amount={variant.price.amount}
				currencyCode={variant.price.currencyCode}
			/>
		</div>
	);
}
