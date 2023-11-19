import { getCart } from '@lib/shopify';
import { cookies } from 'next/headers';
import { CartModal } from './CartModal';

export async function Cart() {
	const cartId = cookies().get('cartId')?.value;

	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	return <CartModal cart={cart} />;
}
