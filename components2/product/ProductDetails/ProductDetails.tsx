import Image from 'next/image';
import clsx from 'clsx';

import { Product } from '@lib/shopify/types';
import { ProductDetailsSelect } from './ProductDetailsSelect';
import { AddProductToCart } from './AddProductToCart';

interface ProductDetailsProps {
	item: Product;
}

export function ProductDetails({ item: product }: ProductDetailsProps) {
	const image = product.images[0];

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

	return (
		<div className="max-w-4xl mx-auto">
			<div className="py-6">
				{image ? (
					<Image
						src={image.url}
						alt={product.title}
						className="object-contain"
						height={image.height}
						width={image.width}
						sizes="(max-width: 600px) 66vw"
						priority
					/>
				) : null}
				<h1 className="font-serif text-center text-3xl uppercase tracking-wide font-bold my-8">
					{product.title}
				</h1>
				<div
					className="leading-9 font-serif md:text-center"
					dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
				/>
			</div>
			<div
				className={clsx(
					'flex space-y-2 md:space-x-2 md:space-y-0 my-8 flex-col md:flex-row',
					{
						'justify-end': product.variants.length === 1,
					},
				)}
			>
				{formattedVariants.length > 1 ? (
					<ProductDetailsSelect
						product={product}
						variants={formattedVariants}
					/>
				) : formattedVariants.length === 1 ? (
					<span className="flex-1 text-xl w-full h-5px py-4 px-8 text-gray-500 border rounded-lg">
						{formattedVariants[0].formattedPrice}
					</span>
				) : null}
				<AddProductToCart variants={product.variants} />
			</div>
		</div>
	);
}
