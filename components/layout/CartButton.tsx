import { Suspense } from 'react';

import { Cart } from '@components/ui/Cart';
import { OpenCart } from '@components/ui/OpenCart';

export function CartButton() {
	return (
		<Suspense
			fallback={
				<button
					aria-label="Open cart"
					className="fixed bottom-4 left-4 z-10 rounded-full bg-white p-2 shadow-lg drop-shadow-lg"
				>
					<OpenCart />
				</button>
			}
		>
			<Cart />
		</Suspense>
	);
}
