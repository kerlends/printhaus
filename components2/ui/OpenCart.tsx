import clsx from 'clsx';

import { Badge } from '@components/common/Badge';
import { ShoppingCart } from '@components/icons/ShoppingCart';

interface OpenCartProps {
	itemCount?: number;
	isOpen?: boolean;
}

export function OpenCart({ itemCount, isOpen }: OpenCartProps) {
	return (
		<div className="border-1 relative p-2">
			<ShoppingCart />
			<div className="absolute -right-1 -top-1 h-full w-full">
				<Badge value={itemCount} />
			</div>
		</div>
	);
}
