import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NormalizedProduct as Product } from '@framework/utils';
import { useAddItem } from '@framework/cart';
import { shouldPolyfill } from '@formatjs/intl-numberformat/should-polyfill';

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
	const [polyfilled, setPolyfilled] = useState(() => !shouldPolyfill());

	const handleVariantChange = useCallback((variant: FormattedVariant) => {
		setVariant(variant.id);
	}, []);

	useEffect(() => {
		const polyfill = async () => {
			console.log('polyfilling Intl.NumberFormat');
			await import('@formatjs/intl-numberformat/polyfill');

			if ('polyfilled' in Intl.NumberFormat) {
				console.log('polyfilling locale data');
				// @ts-ignore
				await import('@formatjs/intl-numberformat/locale-data/en');
			}
		};
		if (!polyfilled) {
			polyfill().then(() => {
				setPolyfilled(true);
			});
		}
	}, []);

	const formattedVariants: FormattedVariant[] = useMemo(
		() =>
			polyfilled
				? variants.map((variant) => ({
						...variant,
						formattedPrice:
							new Intl.NumberFormat(locale, {
								style: 'currency',
								maximumFractionDigits: 0,
								minimumFractionDigits: 0,
								currency: variant.currency,
								currencyDisplay: 'narrowSymbol',
							}).format(variant.price) + ` ${variant.currency}`,
				  }))
				: [],
		[variants, locale, polyfilled],
	);

	const image = images[0];

	return {
		selectedVariant: variant,
		onSelectedVariantChange: handleVariantChange,
		productVariants: formattedVariants,
		productImage: image,
	};
}
