'use client';

import { Button } from '@components/ui/Button';
import { useToast } from '@components/ui/context';
import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

interface AddToCartButtonProps {
	disabled: boolean;
	variantOutOfStock: boolean;
}

export function AddToCartButton({
	disabled,
	variantOutOfStock,
}: AddToCartButtonProps) {
	const status = useFormStatus();
	const { showNotificationToast } = useToast();
	const pending = status.pending;
	const prevPendingRef = useRef(status.pending);

	useEffect(() => {
		if (!pending && prevPendingRef.current) {
			showNotificationToast('Added to cart');
		}
	}, [pending, showNotificationToast]);

	useEffect(() => {
		prevPendingRef.current = status.pending;
	}, [status.pending]);

	return (
		<Button
			className="w-full min-w-[280px] transition-all duration-200 md:w-auto"
			variant="primary"
			disabled={disabled || status.pending || variantOutOfStock}
			type="submit"
		>
			{variantOutOfStock ? (
				<span>Out of stock</span>
			) : status.pending ? (
				<span>Adding to cart..</span>
			) : (
				<span>Add to cart</span>
			)}
		</Button>
	);
}
