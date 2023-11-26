'use server';

import { BookingValues, sendBookingEmail } from 'services/courier';
import { uploadImage } from 'services/cloudinary';
import path from 'path';
import fs from 'fs/promises';

export async function sendEmail(_: any, formData: FormData) {
	const errorResult = { error: 'Failed to send email' };

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
				try {
					await fs.writeFile(filepath, buffer);
				} catch (err) {
					console.error('Saving temp file to %s failed.', filepath);
					console.error(err);
					return errorResult;
				}
				try {
					data.images.push(await uploadImage(filepath));
				} catch (err) {
					console.error('Pushing image to Cloudinary failed (%s)', filepath);
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
