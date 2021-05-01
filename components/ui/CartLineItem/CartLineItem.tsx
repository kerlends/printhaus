import { useCallback, useState } from 'react';
import Image from 'next/image';
import type { LineItem } from '@framework/types';
import usePrice from '@commerce/product/use-price';
import useRemoveItem from '@commerce/cart/use-remove-item';
import { Cross } from '@components/icons';
import clsx from 'clsx';

interface Props extends LineItem {
	singleVariant: boolean;
}

function CartLineItem({
	name,
	variant,
	quantity,
	singleVariant,
	...props
}: Props) {
	const [isRemoving, setIsRemoving] = useState(false);
	const removeItem = useRemoveItem();
	const handleRemoveClick = useCallback(async () => {
		setIsRemoving(true);
		await removeItem({ id: props.id });
	}, [props.id, removeItem]);

	const { price, ...rest } = usePrice({
		amount: parseFloat(variant.price as any),
		currencyCode: 'USD',
	});

	return (
		<div
			className={clsx('flex mb-2', {
				'opacity-60 pointer-events-none': isRemoving,
			})}
		>
			<Image
				src={variant.image?.url ?? ''}
				height={120}
				width={180}
				objectFit="cover"
				layout="fixed"
				quality="10"
			/>
			<div className="flex-1">
				<div className="py-2 px-3">
					<h4 className="font-serif text-sm pb-1 flex justify-between">
						<span>{name}</span>
						<span className="font-sans">{quantity}x</span>
					</h4>
					{!singleVariant && (
						<span className="block font-serif text-sm">{variant.name}</span>
					)}
					<strong>{price}</strong>
				</div>
				<div className="flex justify-end">
					<button onClick={handleRemoveClick} disabled={isRemoving}>
						<Cross />
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartLineItem;
