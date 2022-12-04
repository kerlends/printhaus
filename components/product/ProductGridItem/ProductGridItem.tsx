import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type { ProductListPageDataItem } from '@utils/types';
import styles from './ProductGridItem.module.css';
import { useRef, useState } from 'react';

export interface ProductGridItemProps
	extends Omit<ProductListPageDataItem, 'variants'> {
	numItems?: number;
}

function ProductGridItem({
	name,
	path,
	numItems = 1,
	imageProps,
}: ProductGridItemProps) {
	return (
		<Link href={path} className={clsx('relative', styles.root)}>
			<div className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-0 hover:opacity-100  bg-black bg-opacity-50 transition-opacity flex items-center justify-center text-white text-center">
				<p className="font-serif text-lg uppercase mx-2 md:text-xl lg:text-2xl">
					{name}
				</p>
			</div>
			{imageProps ? (
				<div className="w-full aspect-[1.2/1] max-w-[380px] md:max-w-xl relative">
					<Image
						{...imageProps}
						alt={name}
						quality="65"
						className="absolute h-full w-full object-cover object-center"
						placeholder="blur"
						sizes="550px"
					/>
				</div>
			) : null}
		</Link>
	);
}

export default ProductGridItem;
