import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@lib/shopify/types';

export interface ProductGridItemProps {
	item: Product;
}

export async function ProductGridItem({ item }: ProductGridItemProps) {
	const { title: name, handle, images } = item;

	const { url, height, width } = images[0];
	const maxWidth = 400;
	const ratio = width / height;
	const maxHeight = maxWidth * ratio;

	return (
		<Link href={`/products/${handle}`} className="group relative">
			<div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center  justify-center bg-black bg-opacity-50 text-center text-white opacity-0 transition-opacity hover:opacity-100 group-focus:opacity-100">
				<p className="mx-2 font-serif text-lg uppercase md:text-xl lg:text-2xl">
					{name}
				</p>
			</div>
			<div className="relative aspect-[1.2/1] w-full group-focus:opacity-100 lg:max-w-xl">
				<Image
					src={url}
					alt={name}
					className="absolute h-full w-full object-cover object-center"
					sizes="(max-width: 600px) 50vw"
					height={height}
					width={width}
				/>
			</div>
		</Link>
	);
}
