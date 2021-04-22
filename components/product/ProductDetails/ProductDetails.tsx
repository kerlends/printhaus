import Image from 'next/image';
import { Button, Select } from '@components/common';
import type { NormalizedProduct as Product } from '@framework/utils';

import { AddToCartButton } from '@components/product';
import { useProductDetails } from './ProductDetails.hooks';
import clsx from 'clsx';

type Props = Product & {
	locale: string;
};

function ProductDetails({
	id,
	title,
	descriptionHtml,
	variants,
	images,
	locale,
}: Props) {
	const {
		productVariants,
		selectedVariant,
		onSelectedVariantChange,
		productImage,
	} = useProductDetails({ variants, images, locale });

	return (
		<div className="max-w-4xl mx-auto">
			<div className="py-6">
				<Image
					width={productImage.width ?? 0}
					height={productImage.height ?? 0}
					layout="responsive"
					objectFit="contain"
					src={productImage.url}
				/>
				<h1 className="font-serif text-center text-3xl my-8">{title}</h1>
				<p
					className="leading-9 font-serif md:text-center"
					dangerouslySetInnerHTML={{ __html: descriptionHtml ?? '' }}
				/>
			</div>
			<div
				className={clsx(
					'flex space-y-2 md:space-x-2 md:space-y-0 my-8 flex-col md:flex-row',
					{
						'justify-end': productVariants.length === 1,
					},
				)}
			>
				{productVariants.length > 1 ? (
					<Select
						selectedOption={productVariants[0]}
						options={productVariants}
						value={selectedVariant}
						onChange={onSelectedVariantChange}
						placeholder="Select size"
						optionToString={(variant) =>
							`${variant.name} / ${variant.formattedPrice}`
						}
						optionIsDisabled={(variant) => !variant.availableForSale}
						renderOption={(variant) => (
							<div className="flex justify-between">
								<span>
									{variant.availableForSale
										? variant.name
										: `${variant.name} (UNAVAILABLE)`}
								</span>
								<span>{variant.formattedPrice}</span>
							</div>
						)}
					/>
				) : null}
				<AddToCartButton productId={id} variantId={selectedVariant} />
			</div>
		</div>
	);
}

export default ProductDetails;
