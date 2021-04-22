import React from 'react';
import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
	value?: number;
}

function Badge({ children, value }: Props) {
	return (
		<span className="relative inline-flex align-middle flex-shrink-0">
			{children}
			{value ? (
				<span
					style={{ height: 16, minWidth: 16, transformOrigin: '100% 0' }}
					className={clsx(
						'flex flex-row flex-wrap justify-center items-center absolute box-border text-xs leading-none px-1 rounded-xl transition-transform',
						'bg-black text-white',
						'top-0 right-0 transform scale-100 -translate-y-1/3 translate-x-3',
						'border border-gray-700 z-0 font-sans',
					)}
				>
					{value}
				</span>
			) : null}
		</span>
	);
}

export default Badge;
