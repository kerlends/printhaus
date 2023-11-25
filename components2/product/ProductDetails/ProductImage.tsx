'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Image as ProductImage, ProductVariant } from '@lib/shopify/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface ProductImageProps {
	images: ProductImage[];
	variants: ProductVariant[];
	optionKey?: string;
}

export function ProductImage({
	images,
	optionKey,
	variants,
}: ProductImageProps) {
	const searchParams = useSearchParams();

	const variant = variants.find((variant: ProductVariant) => {
		if (optionKey) {
			const opt = variant.selectedOptions.find(
				(opt) => opt.name.toLowerCase() === optionKey,
			);
			return searchParams.get(optionKey.toLocaleLowerCase()) === opt?.value;
		}

		return variant.selectedOptions.every(
			(option) => option.value === searchParams.get(option.name.toLowerCase()),
		);
	});

	const image = useMemo(() => {
		if (images.length === 0) {
			return null;
		}

		const imageId = variant?.image?.id;

		if (imageId) {
			return images.find((image) => image.id === imageId);
		}

		return images[0];
	}, [variant, images]);

	const [parent] = useAutoAnimate();

	if (!image) {
		return null;
	}

	return (
		<div ref={parent}>
			<Image
				key={image.id}
				src={image.url}
				alt={variant?.title ?? ''}
				className="mx-auto object-contain"
				height={image.height}
				width={image.width}
				sizes="(max-width: 600px) 66vw"
				priority
			/>
		</div>
	);
}
