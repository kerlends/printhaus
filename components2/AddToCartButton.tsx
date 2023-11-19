'use client';

import { Button } from '@components/ui/Button';
import { addItem } from 'actions/cart';
import { useFormState, useFormStatus } from 'react-dom';

interface AddToCartButtonProps {
	variantId: string;
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
	const [message, formAction] = useFormState(addItem, null);
	const status = useFormStatus();

	const actionWithVariant = formAction.bind(null, variantId);

	return (
		<form action={actionWithVariant}>
			<Button variant="primary" disabled={status.pending} type="submit">
				{status.pending ? 'Adding to cart..' : 'Add to cart'}
			</Button>
		</form>
	);
}
