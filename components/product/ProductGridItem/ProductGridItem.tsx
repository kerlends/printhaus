import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductGridItem.module.css';

export interface ProductGridItemProps {
	path: string;
	src: string;
	name: string;
}

function ProductGridItem({ src, name, path }: ProductGridItemProps) {
	return (
		<Link href={path}>
			<a className={styles.root}>
				<div className={styles.overlay}>
					<p className="font-serif text-2xl uppercase mx-2">{name}</p>
				</div>
				<div className="block relative h-full">
					<Image
						quality="85"
						src={src}
						height={320}
						width={380}
						objectFit="cover"
						className="block"
					/>
				</div>
			</a>
		</Link>
	);
}

export default ProductGridItem;
