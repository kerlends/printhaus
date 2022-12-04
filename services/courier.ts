import { CourierClient } from '@trycourier/courier';

const client = CourierClient({
	authorizationToken: process.env.COURIER_API_KEY as string,
});

export interface BookingValues {
	name: string;
	email: string;
	placement: string;
	size: string;
	description: string;
	images: string[];
}

export async function sendBookingEmail({
	description,
	email,
	images,
	name,
	placement,
	size,
}: BookingValues) {
	const { requestId } = await client.send({
		message: {
			template: 'BR3ZQMCCZC4DZ5MKDDNCH0A9G1JX',
			to: {
				data: {
					email,
					name,
					placement,
					size,
					description,
					images: images.map((image) => ({
						src: image,
					})),
				},
				email: process.env.CONTACT_EMAIL,
			},
		},
	});

	console.log('Email sent. (requestid: %s)', requestId);
}
