import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'default';
	size?: 'sm' | 'md';
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
					'font-sans font-bold rounded-lg focus:outline-none',
					'dark:border dark:border-trueGray-900 dark:focus:border-trueGray-700',
					{
						'bg-black text-white': variant === 'primary',
						'bg-opacity-80 focus:bg-opacity-90 hover:bg-opacity-90 active:bg-opacity-100':
							variant === 'primary' && !disabled,
						'bg-opacity-40 focus:bg-opacity:40 hover:bg-opacity-40 active:bg-opacity-40':
							disabled,
						'bg-white text-black border border-black': variant !== 'primary',
						'py-4 px-12 text-2xl': size === 'md',
						'py-2 px-5 text-lg': size === 'sm',
					},
					className,
				)}
				type={type}
				{...props}
			/>
		);
	},
);
