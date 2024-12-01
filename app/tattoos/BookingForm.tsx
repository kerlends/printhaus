'use client';

import { redirect } from 'next/navigation';
import React, { createContext } from 'react';
import { useFormState } from 'react-dom';

import { sendEmail } from './actions/send-email';

const BookingFormContext = createContext<{
	uploading: boolean;
	setUploading: (uploading: boolean) => void;
}>({
	uploading: false,
	setUploading: (uploading: boolean) => {},
});

export function useBookingFormContext() {
	return React.useContext(BookingFormContext);
}

interface BookingFormProps {
	children: React.ReactNode;
}

export function BookingForm({ children }: BookingFormProps) {
	const [state, action] = useFormState(sendEmail, null);
	const [uploading, setUploading] = React.useState(false);

	if (state?.success) {
		redirect('/tattoos/thank-you');
	}

	return (
		<BookingFormContext.Provider value={{ uploading, setUploading }}>
			<form action={action} className="max-w-xl mx-auto pb-4">
				<div className="mx-auto flex max-w-xl flex-col gap-3"></div>
				{children}
				{state?.error && (
					<p className="mt-4 font-medium text-red-600">{state.error}</p>
				)}
			</form>
		</BookingFormContext.Provider>
	);
}
