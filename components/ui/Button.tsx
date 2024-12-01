import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'default';
	size?: 'xs' | 'sm' | 'md';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ className, type = 'button', variant, size = 'md', disabled, ...props },
		ref,
	) {
		return (
			<button
				ref={ref}
				className={clsx(
					'font-sans rounded-lg font-bold focus:outline-none',
					'dark:border dark:border-trueGray-900 dark:focus:border-trueGray-700',
					{
						'bg-black text-white': variant === 'primary',
						'bg-opacity-80 hover:bg-opacity-90 focus:bg-opacity-90 active:bg-opacity-100':
							variant === 'primary' && !disabled,
						'focus:bg-opacity:40 bg-opacity-40 hover:bg-opacity-40 active:bg-opacity-40':
							disabled,
						'border border-black bg-white text-black': variant !== 'primary',
						'px-12 py-4 text-2xl': size === 'md',
						'px-5 py-2 text-lg': size === 'sm',
						'px-2 py-1 text-xs': size === 'xs',
					},
					className,
				)}
				type={type}
				{...props}
			/>
		);
	},
);
