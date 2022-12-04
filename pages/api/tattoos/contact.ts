import { Writable } from 'stream';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { uploadImage } from '../../../services/cloudinary';
import { BookingValues, sendBookingEmail } from 'services/courier';

const formidableConfig = {
	keepExtensions: true,
	maxFileSize: 10_000_000,
	maxFieldsSize: 10_000_000,
	maxFields: 7,
	allowEmptyFiles: false,
	multiples: true,
};

function formidablePromise(
	req: NextApiRequest,
	opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
	return new Promise((accept, reject) => {
		const form = formidable(opts);

		form.parse(req, (err, fields, files) => {
			if (err) {
				return reject(err);
			}

			return accept({ fields, files });
		});
	});
}

const fileConsumer = <T = unknown>(acc: T[]) => {
	const writable = new Writable({
		write: (chunk, _enc, next) => {
			acc.push(chunk);
			next();
		},
	});

	return writable;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') return res.status(404).end();

	try {
		const chunks: never[] = [];

		const { fields, files } = await formidablePromise(req, {
			...formidableConfig,
			// consume this, otherwise formidable tries to save the file to disk
			// fileWriteStreamHandler: () => fileConsumer(chunks),
		});

		const data: BookingValues = {
			name: fields.name as string,
			email: fields.email as string,
			placement: fields.placement as string,
			size: fields.size as string,
			description: fields.description as string,
			images: [],
		};

		if (files.images) {
			const images = Array.isArray(files.images)
				? files.images
				: [files.images];
			data.images = await Promise.all(
				images.map((img) => {
					return uploadImage(img.filepath);
				}),
			);
		}

		// const fileData = Buffer.concat(chunks); // or is it from? I always mix these up

		await sendBookingEmail(data);

		console.log('Booking email sent at %s', new Date().toLocaleString());
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal Server Error' });
	}

	return res.status(201).redirect('/tattoos');
}

export const config = {
	api: {
		bodyParser: false,
	},
};
