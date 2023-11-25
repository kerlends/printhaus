'use client';

import React from 'react';
import clsx from 'clsx';
import { useToast } from './context';

export function Toast() {
	const { toastText, displayToast } = useToast();
	return (
		<div
			className={clsx(
				'fixed bottom-0 right-0 mb-4 mr-4 rounded-lg bg-black px-4 py-3 text-white opacity-0 transition-opacity',
				{
					'opacity-100 duration-200': displayToast,
					'duration-500': !displayToast,
					'pointer-events-none': !displayToast,
				},
			)}
		>
			<p className="font-serif">{toastText}</p>
		</div>
	);
}
