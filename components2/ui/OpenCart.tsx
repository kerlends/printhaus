import { Badge } from '@components/common/Badge';
import clsx from 'clsx';

interface OpenCartProps {
	itemCount?: number;
	isOpen?: boolean;
}

export function OpenCart({ itemCount, isOpen }: OpenCartProps) {
	return (
		<div
			className={clsx(isOpen && 'inline-block underline transform scale-105')}
		>
			<Badge value={itemCount}>Cart</Badge>
		</div>
	);
}
