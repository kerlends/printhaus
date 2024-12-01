'use server';

import { BookingValues, sendBookingEmail } from 'services/courier';

export async function sendEmail(
	_: any,
	formData: FormData,
): Promise<{ error?: string; success: boolean }> {
	const errorResult = { error: 'Failed to send email', success: false };

	try {
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phoneNumber = formData.get('phoneNumber') as string;
		const placement = formData.get('placement') as string;
		const location = formData.get('location') as string;
		const description = formData.get('description') as string;
		const budget = formData.get('budget') as string;
		const size = formData.get('size') as string;
		const imagesString = formData.get('images') as string;

		const data: BookingValues = {
			name,
			email,
			phoneNumber,
			placement,
			location,
			size,
			description,
			budget,
			images: [],
		};

		if (imagesString) {
			data.images = imagesString.split(';');
		}

		await sendBookingEmail(data);

		console.log('Booking email sent at %s', new Date().toLocaleString());

		return { success: true };
	} catch (err) {
		console.error(err);
	}

	return errorResult;
}
