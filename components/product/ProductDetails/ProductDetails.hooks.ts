import { useCallback, useMemo, useState } from 'react';
import type { NormalizedProduct as Product } from '@framework/utils';
import { useAddItem } from '@framework/cart';

type Variant = Product['variants'][0];

type FormattedVariant = Variant & { formattedPrice: string };

interface UseProductDetailsOptions {
	variants: Variant[];
	images: Product['images'];
	locale: string;
}

export function useProductDetails({
	variants,
	images,
	locale,
}: UseProductDetailsOptions) {
	const [variant, setVariant] = useState(() => variants[0].id);

	const handleVariantChange = useCallback((variant: FormattedVariant) => {
		setVariant(variant.id);
	}, []);

	const formattedVariants: FormattedVariant[] = useMemo(
		() =>
			variants.map((variant) => ({
				...variant,
				formattedPrice:
					new Intl.NumberFormat(locale, {
						style: 'currency',
						maximumFractionDigits: 0,
						minimumFractionDigits: 0,
						currency: variant.currency,
						currencyDisplay: 'narrowSymbol',
					}).format(variant.price) + ` ${variant.currency}`,
			})),
		[variants, locale],
	);

	const image = images[0];

	return {
		selectedVariant: variant,
		onSelectedVariantChange: handleVariantChange,
		productVariants: formattedVariants,
		productImage: image,
	};
}
