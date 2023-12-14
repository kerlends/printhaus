'use client';

import { addItem } from 'actions/cart';
import { useFormState } from 'react-dom';

import { AddToCartButton } from './AddToCartButton';

interface AddToCartFormProps {
	disabled: boolean;
	variantOutOfStock: boolean;
	variantId: string;
}

export function AddToCartForm({ variantId, ...props }: AddToCartFormProps) {
	const [message, formAction] = useFormState(addItem, null);
	const actionWithVariant = formAction.bind(null, variantId);

	return (
		<form action={actionWithVariant}>
			<AddToCartButton {...props} />
		</form>
	);
}
