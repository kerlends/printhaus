'use client';

import { useFormStatus } from 'react-dom';

export function BookingFormSubmitButton() {
	const status = useFormStatus();
	return (
		<button
			className="mt-4 rounded-sm bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500"
			disabled={status?.pending}
		>
			Submit
		</button>
	);
}
