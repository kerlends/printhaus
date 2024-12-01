'use client';

import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

import { useBookingFormContext } from './BookingForm';

export function BookingFormSubmitButton() {
	const status = useFormStatus();
	const { uploading } = useBookingFormContext();

	useEffect(() => {
		console.log('Uploading status:', uploading);
	}, [uploading]);

	return (
		<button
			className="mt-4 rounded-sm bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500"
			disabled={status?.pending || uploading}
		>
			Submit
		</button>
	);
}
