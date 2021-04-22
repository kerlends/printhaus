import React from 'react';

interface Props {
	children: React.ReactNode;
}

function ProductGrid({ children }: Props) {
	return (
		<div className="max-w-6xl mx-auto grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2">
			{children}
		</div>
	);
}

export default ProductGrid;
