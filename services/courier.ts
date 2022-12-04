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
			template: process.env.COURIER_CONTACT_EMAIL_TEMPLATE_ID as string,
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
