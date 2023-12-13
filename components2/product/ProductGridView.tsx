import type { Product } from '@lib/shopify/types';

import { ProductGrid } from '@components/product/ProductGrid';
import { ProductGridItem } from '@components/product/ProductGridItem';

interface ProductGridViewProps {
	items: (Product & { imagePlaceholder: string })[];
}

export function ProductGridView({ items }: ProductGridViewProps) {
	return (
		<ProductGrid>
			{items.map((item) => (
				<ProductGridItem key={item.handle} item={item} />
			))}
		</ProductGrid>
	);
}
