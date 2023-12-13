'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Product } from '@lib/shopify/types';

import { Select } from '@components/ui/Select';

type ProductVariant = Product['variants'][number] & {
	formattedPrice: string;
};

interface ProductDetailsSelectProps {
	product: Product;
	variants: ProductVariant[];
}

export function ProductDetailsSelect({
	product,
	variants,
}: ProductDetailsSelectProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const optionKeys = useMemo(
		() => product.options.map((opt) => opt.name),
		[product.options],
	);

	const handleChange = (variant: ProductVariant) => {
		const url = new URL(pathname, window.location.origin);

		for (const key of optionKeys) {
			const variantOption = variant.selectedOptions.find((variantOpt) => {
				return variantOpt.name === key;
			});

			if (variantOption) {
				url.searchParams.set(key.toLowerCase(), variantOption.value);
			}
		}

		replace(url.href, { scroll: false });
	};

	const selectedVariant = searchParams.get('variant') ?? product.variants[0].id;

	return (
		<Select
			fieldId={`product-details=${product.id}`}
			selectedOption={variants[0]}
			options={variants}
			value={selectedVariant}
			onChange={handleChange}
			placeholder="Select size"
			optionToString={(variant) =>
				`${variant.title} / ${variant.formattedPrice}`
			}
			optionIsDisabled={(variant) => !variant.availableForSale}
			renderOption={(variant) => (
				<div className="flex justify-between">
					<span>
						{variant.availableForSale
							? variant.title
							: `${variant.title} (UNAVAILABLE)`}
					</span>
					<span>{variant.formattedPrice}</span>
				</div>
			)}
		/>
	);
}
