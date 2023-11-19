import Image from 'next/image';
import clsx from 'clsx';
import type { CartItem as CartItemType } from '@lib/shopify/types';
import { CartItemRemoveButton } from './CartItemRemoveButton';
import { useFormStatus } from 'react-dom';

interface CartItemProps {
	singleVariant: boolean;
	item: CartItemType;
}

export function CartItem({ singleVariant, item }: CartItemProps) {
	console.log({ item });
	const image = item.merchandise.product.images.edges[0].node;

	const { pending } = useFormStatus();

	return (
		<div
			className={clsx('flex mb-2', {
				'opacity-60 pointer-events-none': pending,
			})}
		>
			<div className="relative w-full h-full aspect-[1.2/1] max-w-[180px] max-h-[120px]">
				<Image
					src={image.url}
					alt={item.merchandise.title}
					height={120}
					width={180}
					className="absolute h-full w-full object-cover object-center"
					quality="10"
				/>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="py-2 px-3">
					<h4 className="font-serif text-sm pb-1 flex justify-between">
						<span>{item.merchandise.product.title}</span>
						<span className="font-sans">{item.quantity}x</span>
					</h4>
					{!singleVariant && (
						<span className="block font-serif text-sm">
							{item.merchandise.title}
						</span>
					)}
				</div>
				<div className="flex justify-end">
					<CartItemRemoveButton item={item} />
				</div>
			</div>
		</div>
	);
}

export default CartItemType;
