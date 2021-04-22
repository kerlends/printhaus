import { ProductGrid, ProductGridItem } from '@components/product';
import type { ProductGridItemProps } from '@components/product/ProductGridItem';

interface Props {
	items: ProductGridItemProps[];
}

function ProductGridView({ items }: Props) {
	return (
		<ProductGrid>
			{items.map(({ path, name, src }) => (
				<ProductGridItem
					key={path}
					src={src}
					name={name}
					path={path}
					numItems={items.length}
				/>
			))}
		</ProductGrid>
	);
}

export default ProductGridView;
