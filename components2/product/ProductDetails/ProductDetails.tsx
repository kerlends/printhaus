import Image from 'next/image';
import clsx from 'clsx';

import { Product } from '@lib/shopify/types';
import { ProductDetailsSelect } from './ProductDetailsSelect';
import { AddProductToCart } from './AddProductToCart';
import { ProductOptions } from './ProductOptions';
import { ProductVariantPrice } from './ProductVariantPrice';
import { ProductImage } from './ProductImage';

interface ProductDetailsProps {
	item: Product;
}

export async function ProductDetails({ item: product }: ProductDetailsProps) {
	const image = product.images.length === 1 ? product.images[0] : null;

	const formattedVariants = product.variants.map((variant) => {
		return {
			...variant,
			formattedPrice:
				new Intl.NumberFormat('en', {
					style: 'currency',
					maximumFractionDigits: 0,
					minimumFractionDigits: 0,
					currency: variant.price.currencyCode,
					currencyDisplay: 'narrowSymbol',
				}).format(Number(variant.price.amount)) +
				` ${variant.price.currencyCode}`,
		};
	});

	const optionKey = product.options.find(
		(opt) => opt.name.toLocaleLowerCase() === 'color',
	)
		? 'color'
		: undefined;

	const hasMoreThanOneOptionWithMultipleValues =
		product.options.filter((option) => option.values.length > 1).length > 1;

	return (
		<div className="mx-auto max-w-4xl">
			<div className="py-6">
				{image ? (
					<Image
						src={image.url}
						alt={product.title ?? ''}
						className="mx-auto object-contain"
						height={image.height}
						width={image.width}
						sizes="(max-width: 600px) 66vw"
						priority
					/>
				) : (
					<ProductImage
						variants={product.variants}
						images={product.images}
						optionKey={optionKey}
					/>
				)}
				<h1 className="my-8 text-center font-serif text-3xl font-bold uppercase tracking-wide">
					{product.title}
				</h1>
				<div
					className="font-serif leading-9 md:text-center"
					dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
				/>
			</div>
			{hasMoreThanOneOptionWithMultipleValues && (
				<ProductVariantPrice
					variants={product.variants}
					priceRange={product.priceRange}
				/>
			)}
			<div
				className={clsx(
					'my-8 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0',
					{
						'justify-end': product.variants.length === 1,
					},
				)}
			>
				{hasMoreThanOneOptionWithMultipleValues ? (
					<div className="flex flex-1 flex-col items-center gap-2 md:flex-row">
						{product.options.map((options) => {
							if (options.values.length > 1) {
								return <ProductOptions key={options.id} {...options} />;
							}

							return null;
						})}
					</div>
				) : formattedVariants.length > 1 ? (
					<ProductDetailsSelect
						product={product}
						variants={formattedVariants}
					/>
				) : formattedVariants.length === 1 ? (
					<span className="h-5px w-full flex-1 rounded-lg border px-8 py-4 text-xl text-gray-500">
						{formattedVariants[0].formattedPrice}
					</span>
				) : null}
				<AddProductToCart
					defaultVariant={
						product.options.length < 2 ? product.variants[0] : undefined
					}
					variants={product.variants}
				/>
			</div>
		</div>
	);
}
