'use server';

import { BookingValues, sendBookingEmail } from 'services/courier';
import { uploadImage } from 'services/cloudinary';
import path from 'path';
import fs from 'fs/promises';

export async function sendEmail(prevState: any, formData: FormData) {
	try {
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const placement = formData.get('placemenet') as string;
		const description = formData.get('description') as string;
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
			images: [],
		};

		if (files.length > 0) {
			for (const file of files) {
				const buffer = Buffer.from(await file.arrayBuffer());
				const filepath = path.join('/tmp', file.name);
				await fs.writeFile(filepath, buffer);
				data.images.push(await uploadImage(filepath));
			}
		}

		await sendBookingEmail(data);

		console.log('Booking email sent at %s', new Date().toLocaleString());

		return { success: true };
	} catch (err) {
		console.error(err);
	}

	return null;
}
