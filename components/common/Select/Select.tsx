import React, { useCallback } from 'react';
import { useSelect } from 'downshift';
import ArrowIcon from './ArrowIcon';
import clsx from 'clsx';

interface Props<T> {
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

function Select<T extends any>({
	value,
	selectedOption,
	options,
	onChange,
	placeholder,
	optionToString,
	optionIsDisabled = (item: T) => false,
	renderOption = optionToString,
	disabled: selectDisabled,
}: Props<T>) {
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
		defaultSelectedItem: selectedOption,
		items: options,
		itemToString: handleItemToString,
		onSelectedItemChange: (changes) =>
			changes.selectedItem ? onChange(changes.selectedItem) : null,
	});

	return (
		<div className="relative flex-1">
			<div
				className={clsx(
					'fixed top-0 bottom-0 left-0 right-0 z-0 bg-black opacity-0 pointer-events-none transition-opacity duration-150',
					{
						'opacity-25': isOpen,
					},
				)}
			/>
			<button
				className={clsx(
					'text-xl h-full w-full',
					'h-5px py-4 px-8',
					'bg-gray-100 text-gray-500 border',
					'flex items-center justify-between',
					'rounded-lg shadow-sm',
					'focus:outline-none',
					'focus:bg-gray-200',
					'active:bg-gray-200',
					{
						'text-blue-500': isOpen && highlightedIndex >= 0,
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
					'absolute -top-2 left-0 w-full',
					'transform -translate-y-full',
					'max-h-80 overflow-y-auto',
					'bg-white font-sans text-lg rounded-lg',
					'focus:outline-none',
					{
						border: isOpen,
					},
				)}
				{...getMenuProps()}
			>
				{isOpen &&
					options.map((item, index) => {
						const isDisabled = optionIsDisabled(item);
						const itemProps = getItemProps({
							item,
							index,
							disabled: isDisabled,
						});
						return (
							<div
								key={index}
								className={clsx('py-4 px-8 text-gray-500 cursor-pointer', {
									'bg-gray-100': highlightedIndex === index,
									'text-blue-500': highlightedIndex === index,
									'opacity-40 cursor-not-allowed': isDisabled,
								})}
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

export default Select;
