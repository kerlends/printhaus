'use client';

import React from 'react';
import clsx from 'clsx';
import { useUI } from './context';

export function Toast() {
	const { toastText, displayToast } = useUI();
	return (
		<div
			className={clsx(
				'fixed bottom-0 right-0 py-3 px-4 mr-4 mb-4 opacity-0 transition-opacity bg-black text-white rounded-lg',
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
