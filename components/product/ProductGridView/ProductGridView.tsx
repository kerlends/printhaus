import { ProductGrid, ProductGridItem } from '@components/product';
import type { ProductGridItemProps } from '@components/product/ProductGridItem';

interface Props {
	items: ProductGridItemProps[];
}

function ProductGridView({ items }: Props) {
	return (
		<ProductGrid>
			{items.map(({ path, name, imageProps }) => (
				<ProductGridItem
					key={path}
					name={name}
					path={path}
					imageProps={imageProps}
					numItems={items.length}
				/>
			))}
		</ProductGrid>
	);
}

export default ProductGridView;
