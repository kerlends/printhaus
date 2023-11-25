'use client';

import { Select } from '@components/ui/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface ProductOptionComboAvailabilityMap {
	[optionName: string]: string[];
}

interface ProductOptionsProps {
	id: string;
	name: string;
	values: string[];
}

export function ProductOptions({ id, name, values }: ProductOptionsProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleChange = useCallback(
		(value: string) => {
			const url = new URL(pathname, window.location.href);
			url.search = window.location.search;
			url.searchParams.set(name.toLowerCase(), value);
			replace(url.href, { scroll: false });
		},
		[replace],
	);

	const selectedOption = searchParams.get(name.toLowerCase()) ?? '';

	return (
		<div className="flex flex-1 items-center gap-2 self-stretch">
			<Select
				fieldId={`product-options:${id}`}
				selectedOption={selectedOption}
				value={selectedOption}
				optionToString={(option) => option}
				options={values}
				onChange={handleChange}
				placeholder={`Select ${name.toLowerCase()}`}
				renderOption={(option) => <span>{option}</span>}
			/>
		</div>
	);
}
