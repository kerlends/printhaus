import { Portal } from '@headlessui/react';
import clsx from 'clsx';
import { useSelect } from 'downshift';
import React, { useCallback } from 'react';

import ArrowIcon from './ArrowIcon';

export interface SelectProps<T> {
	fieldId: string;
	value: string;
	options: T[];
	selectedOption: T;
	onChange: (option: T) => void;
	placeholder: string;
	optionToString: (option: T) => string;
	renderOption?: (option: T) => React.ReactNode;
	optionIsDisabled?: (option: T) => boolean;
	disabled?: boolean;
}

export function Select<T extends any>({
	fieldId,
	value,
	selectedOption,
	options,
	onChange,
	placeholder,
	optionToString,
	optionIsDisabled = (item: T) => false,
	renderOption = optionToString,
	disabled: selectDisabled,
}: SelectProps<T>) {
	const handleItemToString = useCallback(
		(item: T | null) => (item ? optionToString(item) : ''),
		[optionToString],
	);
	const {
		isOpen,
		selectItem,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
	} = useSelect({
		id: fieldId,
		defaultSelectedItem: selectedOption,
		items: options,
		itemToString: handleItemToString,
		onSelectedItemChange: (changes) =>
			changes.selectedItem ? onChange(changes.selectedItem) : null,
		isItemDisabled: (item, index) => {
			return optionIsDisabled(item);
		},
	});

	return (
		<div className="relative flex-1">
			<Portal>
				<div
					className={clsx(
						'pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-0 bg-black opacity-0 transition-opacity duration-150',
						{
							'opacity-25': isOpen,
						},
					)}
				/>
			</Portal>
			<button
				className={clsx(
					'h-full w-full text-xl',
					'h-5px px-8 py-4',
					'border bg-gray-100 text-gray-500 dark:border-trueGray-500',
					'dark:bg-trueGray-800 dark:text-white',
					'flex items-center justify-between',
					'rounded-lg shadow-sm',
					'focus:outline-none',
					'focus:bg-gray-200 dark:focus:bg-trueGray-900',
					'active:bg-gray-200 dark:focus:bg-trueGray-900',
					{
						'text-blue-500 dark:text-white': isOpen && highlightedIndex >= 0,
					},
				)}
				{...getToggleButtonProps({ disabled: selectDisabled })}
			>
				{isOpen && highlightedIndex >= 0
					? optionToString(options[highlightedIndex])
					: selectedItem
					  ? optionToString(selectedItem)
					  : placeholder}
				<ArrowIcon isOpen={isOpen} />
			</button>
			<div
				className={clsx(
					'absolute -top-2 left-0 z-10 w-full',
					'-translate-y-full transform',
					'max-h-80 overflow-y-auto',
					'font-sans rounded-lg bg-white text-lg',
					'dark:bg-trueGray-700',
					'focus:outline-none',
					'dark:border-trueGray-500',
					{
						border: isOpen,
					},
				)}
				{...getMenuProps()}
			>
				{isOpen &&
					options.map((item, index) => {
						const itemProps = getItemProps({
							item,
							index,
						});

						const isDisabled = itemProps['aria-disabled'];

						return (
							<div
								key={index}
								className={clsx(
									'cursor-pointer px-8 py-4 text-gray-500 dark:text-trueGray-300',
									{
										'bg-gray-100 dark:bg-trueGray-800':
											highlightedIndex === index,
										'text-blue-500 dark:text-white': highlightedIndex === index,
										'cursor-not-allowed opacity-40': isDisabled,
									},
								)}
								{...itemProps}
							>
								{renderOption(item)}
							</div>
						);
					})}
			</div>
		</div>
	);
}
