import { removeItem } from 'actions/cart';
import clsx from 'clsx';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';

import type { CartItem as CartItemType } from '@lib/shopify/types';

interface CartItemProps {
	singleVariant: boolean;
	item: CartItemType;
}

export function CartItem({ item, ...props }: CartItemProps) {
	const [message, formAction] = useFormState(removeItem, null);
	const actionWithVariant = formAction.bind(null, item.id);
	return (
		<form action={actionWithVariant}>
			<CartItemContent item={item} message={message as any} {...props} />
		</form>
	);
}

function CartItemContent({
	singleVariant,
	message,
	item,
}: CartItemProps & { message?: string }) {
	const image = item.merchandise.product.images.edges[0].node;

	const { pending } = useFormStatus();

	return (
		<div
			className={clsx('mb-2 flex', {
				'pointer-events-none opacity-60': pending,
			})}
		>
			<div className="relative aspect-[1.2/1] h-full max-h-[120px] w-full max-w-[180px]">
				<Image
					src={image.url}
					alt={item.merchandise.title}
					height={120}
					width={180}
					className="absolute h-full w-full object-cover object-center"
					quality="10"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="px-3 py-2">
					<h4 className="flex justify-between pb-1 font-serif text-sm">
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
					<div>
						<button disabled={pending}>Remove</button>
						<p aria-live="polite" className="sr-only" role="status">
							{message}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItemType;
