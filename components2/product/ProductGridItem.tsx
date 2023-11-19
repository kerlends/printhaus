import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@lib/shopify/types';
import { addPlaceholderToProduct } from '@utils/plaiceholder';

export interface ProductGridItemProps {
	item: Product;
}

export async function ProductGridItem({ item }: ProductGridItemProps) {
	const { title: name, handle, images } = item;

	const { url, height, width } = images[0];
	const maxWidth = 400;
	const ratio = width / height;
	const maxHeight = maxWidth * ratio;

	const { placeholder } = await addPlaceholderToProduct(item);

	return (
		<Link href={`/products/${handle}`} className="relative group">
			<div className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-0 hover:opacity-100  bg-black bg-opacity-50 transition-opacity flex items-center justify-center text-white text-center group-focus:opacity-100">
				<p className="font-serif text-lg uppercase mx-2 md:text-xl lg:text-2xl">
					{name}
				</p>
			</div>
			<div className="w-full aspect-[1.2/1] lg:max-w-xl relative group-focus:opacity-100">
				<Image
					src={url}
					alt={name}
					className="absolute h-full w-full object-cover object-center"
					sizes="(max-width: 600px) 50vw"
					height={height}
					width={width}
					placeholder="blur"
					blurDataURL={placeholder}
				/>
			</div>
		</Link>
	);
}
