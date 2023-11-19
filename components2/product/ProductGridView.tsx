import { ProductGrid } from '@components/product/ProductGrid';
import { ProductGridItem } from '@components/product/ProductGridItem';
import type { Product } from '@lib/shopify/types';

interface ProductGridViewProps {
	items: (Product & { placeholder: string })[];
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
