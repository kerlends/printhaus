import type { ProductWithPlaceholder } from '@utils/plaiceholder';

import { ProductGrid } from '@components/product/ProductGrid';
import { ProductGridItem } from '@components/product/ProductGridItem';

interface ProductGridViewProps {
	items: ProductWithPlaceholder[];
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
