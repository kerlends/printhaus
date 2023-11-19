'use client';

import React, { Fragment, useRef, useState } from 'react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';

import { Cross } from '@components/icons';
import type { Cart } from '@lib/shopify/types';
import { CartItem } from './CartLineItem';
import { Price } from '@components/common/Price';
import { Button } from './Button';
import { OpenCart } from './OpenCart';

interface CartModalProps {
	cart?: Cart;
	isLoading?: boolean;
}

export function CartModal({ cart, isLoading = false }: CartModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const quantityRef = useRef(cart?.totalQuantity);

	const isEmpty = !cart || cart.lines.length === 0;

	const closeCart = () => {
		setIsOpen(false);
	};

	const openCart = () => {
		setIsOpen(true);
	};

	return (
		<>
			<button aria-label="Open cart" onClick={openCart}>
				<OpenCart itemCount={cart?.totalQuantity} isOpen={isOpen} />
			</button>
			<Transition show={isOpen} as={Fragment}>
				<Dialog onClose={closeCart} className="relative z-50">
					<Transition.Child
						as={Fragment}
						enter="transition-all ease-in-out duration-300"
						enterFrom="opacity-0 backdrop-blur-none"
						enterTo="opacity-100 backdrop-blur-[.5px]"
						leave="transition-all ease-in-out duration-200"
						leaveFrom="opacity-100 backdrop-blur-[.5px]"
						leaveTo="opacity-0 backdrop-blur-none"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition-all ease-in-out duration-300"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transition-all ease-in-out duration-200"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<Dialog.Panel className="fixed bottom-0 right-0 top-0 h-full w-full max-w-[400px] bg-white">
							<div
								data-scrollcontainer
								className={clsx(
									'overflow-y-auto md:h-full flex flex-col bg-white text-black',
									'dark:bg-trueGray-900 dark:text-trueGray-200 dark:border-l dark:border-l-trueGray-700',
									{
										'bg-secondary text-secondary': isEmpty || isLoading,
									},
								)}
							>
								<header className="px-4 pt-6 pb-4 sm:px-6 md:pt-12">
									<div className="flex items-center justify-between space-x-3">
										<h2
											className="m-0 font-bold text-base tracking-wide cursor-pointer inline-block font-serif"
											onClick={closeCart}
										>
											<span className="text-xl text-center">Cart</span>
										</h2>
										<button
											onClick={closeCart}
											className="hover:text-gray-500 transition ease-in-out duration-150 ml-auto"
										>
											<Cross className="h-6 w-6" />
										</button>
									</div>
								</header>
								{isLoading ? (
									<div className="flex-1 px-4 flex flex-col justify-center items-center">
										<h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
											Your cart is empty
										</h2>
									</div>
								) : (
									<>
										<div className="px-4 sm:px-6 flex-1">
											{cart && !isEmpty ? (
												<ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
													{cart.lines.map((item) => (
														<CartItem
															key={item.id}
															singleVariant={item.merchandise.title.includes(
																'Default',
															)}
															item={item}
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
														{cart && (
															<Price
																className="inline"
																amount={cart.cost.subtotalAmount.amount}
																currencyCode={
																	cart.cost.subtotalAmount.currencyCode
																}
															/>
														)}
													</li>
													<li className="flex justify-between py-1">
														<span>Estimated Shipping</span>
														<span>Calculated at checkout</span>
													</li>
												</ul>
												<div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
													<span>Total</span>
													{cart && (
														<Price
															className="inline"
															amount={cart.cost.totalAmount.amount}
															currencyCode={cart.cost.totalAmount.currencyCode}
														/>
													)}
												</div>
											</div>
											<div className="flex justify-center">
												{isEmpty ? (
													<Button
														className="w-full"
														variant="primary"
														size="md"
														disabled
													>
														Checkout
													</Button>
												) : (
													<a href={cart.checkoutUrl} className="flex-1">
														<Button
															variant="primary"
															size="md"
															className="w-full"
														>
															Checkout
														</Button>
													</a>
												)}
											</div>
										</div>
									</>
								)}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
}

export default Cart;
