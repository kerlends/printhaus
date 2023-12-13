'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { useFormState } from 'react-dom';

import { sendEmail } from './actions/send-email';

interface BookingFormProps {
	children: React.ReactNode;
}

export function BookingForm({ children }: BookingFormProps) {
	const [state, action] = useFormState(sendEmail, null);

	if (state?.success) {
		redirect('/tattoos/thank-you');
	}

	return (
		<form action={action}>
			<div className="mx-auto flex max-w-xl flex-col gap-3"></div>
			{children}
			{state?.error && (
				<p className="mt-4 font-medium text-red-600">{state.error}</p>
			)}
		</form>
	);
}
