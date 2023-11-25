'use client';

import { useFormStatus } from 'react-dom';

interface CartItemRemoveButtonProps {
	message?: string;
}

export function CartItemRemoveButton({ message }: CartItemRemoveButtonProps) {
	const status = useFormStatus();

	return (
		<div>
			<button disabled={status.pending}>Remove</button>
			<p aria-live="polite" className="sr-only" role="status">
				{message}
			</p>
		</div>
	);
}
