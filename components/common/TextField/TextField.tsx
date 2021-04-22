import React from 'react';
import styles from './TextField.module.css';

interface Props
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string;
	type?: 'text' | 'numeric' | 'email';
}

function TextField({ type = 'text', id, label, ...props }: Props) {
	return (
		<div>
			{label && (
				<label className="block text-sm pl-1 pb-1" htmlFor={id}>
					{label}
				</label>
			)}
			<input
				className="text-md border border-gray-200 rounded-md py-2 px-4 space-x-1"
				type="text"
				inputMode={type}
				{...props}
			/>
		</div>
	);
}

export default TextField;
