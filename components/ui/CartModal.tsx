'use client';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { Fragment, useMemo, useRef, useState } from 'react';

import type { Cart } from '@lib/shopify/types';

import { Price } from '@components/common/Price';
import { Cross } from '@components/icons';

import { Button } from './Button';
import { CartItem } from './CartLineItem';
import { OpenCart } from './OpenCart';

interface CartModalProps {
	cart?: Cart;
	isLoading?: boolean;
}

export function CartModal({ cart, isLoading = false }: CartModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const isEmpty = !cart || cart.lines.length === 0;

	const closeCart = () => {
		setIsOpen(false);
	};

	const openCart = () => {
		setIsOpen(true);
	};

	const showCartButton = useMemo(() => {
		return !pathname.includes('tattoo');
	}, [pathname]);

	return (
		<>
			<Transition
				appear
				show={showCartButton}
				as={Fragment}
				enter="transition-all ease-in-out duration-300"
				enterFrom="opacity-0 scale-50"
				enterTo="opacity-100 scale-100"
				leave="transition-all ease-in-out duration-300"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-50"
			>
				<button
					aria-label="Open cart"
					onClick={openCart}
					className="fixed bottom-4 left-4 z-10 rounded-full bg-white p-2 shadow-lg drop-shadow-lg"
				>
					<OpenCart itemCount={cart?.totalQuantity} isOpen={isOpen} />
				</button>
			</Transition>
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
									'flex flex-col overflow-y-auto bg-white text-black md:h-full',
									'dark:border-l dark:border-l-trueGray-700 dark:bg-trueGray-900 dark:text-trueGray-200',
									{
										'bg-secondary text-secondary': isEmpty || isLoading,
									},
								)}
							>
								<header className="px-4 pb-4 pt-6 sm:px-6 md:pt-12">
									<div className="flex items-center justify-between space-x-3">
										<h2
											className="m-0 inline-block cursor-pointer font-serif text-base font-bold tracking-wide"
											onClick={closeCart}
										>
											<span className="text-center text-xl">Cart</span>
										</h2>
										<button
											onClick={closeCart}
											className="ml-auto transition duration-150 ease-in-out hover:text-gray-500"
										>
											<Cross className="h-6 w-6" />
										</button>
									</div>
								</header>
								{isLoading ? (
									<div className="flex flex-1 flex-col items-center justify-center px-4">
										<h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
											Your cart is empty
										</h2>
									</div>
								) : (
									<>
										<div className="flex-1 px-4 sm:px-6">
											{cart && cart.lines.length > 0 ? (
												<ul className="sm:divide-accents-3 border-accents-3 space-y-6 border-t py-6 sm:space-y-0 sm:divide-y sm:py-0">
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
												<h2 className="pt-12 text-center text-2xl font-bold tracking-wide">
													Your cart is empty
												</h2>
											)}
										</div>

										<div className="mt-auto flex-shrink-0 px-4 py-5 sm:px-6">
											<div className="border-accents-3 border-t">
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
												<div className="border-accents-3 mb-10 flex justify-between border-t py-3 font-bold">
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
