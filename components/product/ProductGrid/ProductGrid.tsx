import React from 'react';
import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
	numItems: number;
}

function ProductGrid({ children, numItems }: Props) {
	return (
		<div
			className={clsx('max-w-5xl grid grid-cols-3 gap-4 mx-auto', {
				'grid-cols-1': numItems === 1,
			})}
		>
			{children}
		</div>
	);
}

export default ProductGrid;
