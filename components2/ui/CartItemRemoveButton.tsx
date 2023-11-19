'use client';

import { Cross } from '@components/icons';
import { CartItem } from '@lib/shopify/types';
import { removeItem } from 'actions/cart';
import { useFormState, useFormStatus } from 'react-dom';

interface CartItemRemoveButtonProps {
	item: CartItem;
}

export function CartItemRemoveButton({ item }: CartItemRemoveButtonProps) {
	const [message, formAction] = useFormState(removeItem, null);
	const status = useFormStatus();
	const actionWithVariant = formAction.bind(null, item.id);
	return (
		<form action={actionWithVariant} className="contents">
			<button disabled={status.pending}>Remove</button>
			<p aria-live="polite" className="sr-only" role="status">
				{message}
			</p>
		</form>
	);
}
