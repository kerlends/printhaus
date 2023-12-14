import React from 'react';

interface Props {
	children: React.ReactNode;
}

export function ProductGrid({ children }: Props) {
	return (
		<div className="mx-auto grid max-w-6xl grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2">
			{children}
		</div>
	);
}
