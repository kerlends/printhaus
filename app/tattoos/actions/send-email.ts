'use server';

import { BookingValues, sendBookingEmail } from 'services/courier';
import { uploadImageFile } from 'services/cloudinary';

export async function sendEmail(
	_: any,
	formData: FormData,
): Promise<{ error?: string; success: boolean }> {
	const errorResult = { error: 'Failed to send email', success: false };

	try {
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const placement = formData.get('placemenet') as string;
		const description = formData.get('description') as string;
		const budget = formData.get('budget') as string;
		const size = formData.get('size') as string;
		const files = (formData.getAll('images') as File[]).filter(
			(file) => file.size > 0,
		);

		const data: BookingValues = {
			name,
			email,
			placement,
			size,
			description,
			budget,
			images: [],
		};

		if (files.length > 0) {
			for (const file of files) {
				try {
					data.images.push(await uploadImageFile(file));
				} catch (error) {
					console.error(error);
					return errorResult;
				}
			}
		}

		await sendBookingEmail(data);

		console.log('Booking email sent at %s', new Date().toLocaleString());

		return { success: true };
	} catch (err) {
		console.error(err);
	}

	return errorResult;
}
