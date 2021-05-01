import React, { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import cookies from 'js-cookie';

import { CartLineItem, useUI } from '@components/ui';
import { Button } from '@components/common';
import { Bag, Cross } from '@components/icons';
import useCart from '@commerce/cart/use-cart';
import usePrice from '@commerce/product/use-price';

function Cart() {
	const { closeSidebar } = useUI();
	const { data, isLoading, isEmpty, error } = useCart();
	const { price: subTotal } = usePrice(
		data && {
			amount: Number(data.subtotalPrice),
			currencyCode: data.currency.code,
		},
	);
	const { price: total } = usePrice(
		data && {
			amount: Number(data.totalPrice),
			currencyCode: data.currency.code,
		},
	);

	const checkoutUrl = useMemo(() => {
		return cookies.get('shopify_checkoutUrl');
	}, []);

	return (
		<div
			className={clsx('h-full flex flex-col bg-white text-black', {
				'bg-secondary text-secondary': isEmpty || isLoading,
			})}
		>
			<header className="px-4 pt-6 pb-4 sm:px-6">
				<div className="flex items-start justify-center space-x-3">
					<div className="h-7 flex items-center">
						<button
							onClick={closeSidebar}
							className="hover:text-gray-500 transition ease-in-out duration-150"
						>
							<Cross className="h-6 w-6" />
						</button>
					</div>
				</div>
			</header>
			{isLoading ? (
				<div className="flex-1 px-4 flex flex-col justify-center items-center">
					<h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
						Your cart is empty
					</h2>
				</div>
			) : error ? (
				<p>Error</p>
			) : (
				<>
					<div className="px-4 sm:px-6 flex-1 overflow-x-auto">
						<Link href="/cart">
							<h2
								className="pt-1 pb-4 leading-7 font-bold text-base tracking-wide cursor-pointer inline-block font-serif"
								onClick={closeSidebar}
							>
								<span className="text-xl text-center">Cart</span>
							</h2>
						</Link>
						{data && !isEmpty ? (
							<ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
								{data.lineItems.map((item) => (
									<CartLineItem
										key={item.id}
										singleVariant={item.variant.name.includes('Default')}
										{...item}
									/>
								))}
							</ul>
						) : (
							<h2 className="pt-12 text-2xl font-bold tracking-wide text-center">
								Your cart is empty
							</h2>
						)}
					</div>

					<div className="flex-shrink-0 px-4  py-5 sm:px-6">
						<div className="border-t border-accents-3">
							<ul className="py-3">
								<li className="flex justify-between py-1">
									<span>Subtotal</span>
									<span>{subTotal}</span>
								</li>
								<li className="flex justify-between py-1">
									<span>Estimated Shipping</span>
									<span>Calculated at checkout</span>
								</li>
							</ul>
							<div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
								<span>Total</span>
								<span>{total}</span>
							</div>
						</div>
						<div className="flex justify-center">
							{isEmpty ? (
								<Button variant="primary" size="md" disabled>
									Checkout
								</Button>
							) : (
								<a href={checkoutUrl}>
									<Button variant="primary" size="md">
										Checkout
									</Button>
								</a>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Cart;
