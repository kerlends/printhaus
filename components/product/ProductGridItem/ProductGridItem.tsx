import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './ProductGridItem.module.css';

export interface ProductGridItemProps {
	path: string;
	src: string;
	name: string;
	numItems?: number;
}

function ProductGridItem({
	src,
	name,
	path,
	numItems = 1,
}: ProductGridItemProps) {
	return (
		<Link href={path}>
			<a
				className={clsx('relative', styles.root, {
					'col-span-2': numItems === 1,
				})}
			>
				<div className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-0 hover:opacity-100  bg-black bg-opacity-50 transition-opacity flex items-center justify-center text-white text-center">
					<p className="font-serif text-lg uppercase mx-2 md:text-xl lg:text-2xl">
						{name}
					</p>
				</div>
				<Image
					quality={70}
					src={src}
					height={320}
					width={380}
					objectFit="cover"
					className="block"
					layout="responsive"
					sizes="(max-width: 800px) 380px"
				/>
			</a>
		</Link>
	);
}

export default ProductGridItem;
