import React, { forwardRef } from 'react';

export interface TextFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	hint?: string;
	label: string;
	required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField({ children, hint, label, required, ...props }, ref) {
		return (
			<div className="rounded-sm border border-gray-200 p-2 focus-within:border-gray-800">
				<label className="block px-2">
					<p className="text-sm font-semibold">{label}</p>
					<input
						className="block w-full py-2 focus:outline-none"
						required={required}
						ref={ref}
						{...props}
					/>
				</label>
				{hint && <p className="px-2 pb-1 text-xs text-gray-400">{hint}</p>}
				{children}
			</div>
		);
	},
);
