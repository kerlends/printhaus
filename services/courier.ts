import { CourierClient } from '@trycourier/courier';

const client = CourierClient({
	authorizationToken: process.env.COURIER_API_KEY as string,
});

export interface BookingValues {
	name: string;
	email: string;
	phoneNumber: string;
	placement: string;
	location: string;
	size: string;
	description: string;
	budget: string;
	images: string[];
}

export async function sendBookingEmail({
	description,
	email,
	phoneNumber,
	images,
	location,
	name,
	placement,
	budget,
	size,
}: BookingValues) {
	const { requestId } = await client.send({
		message: {
			template: process.env.COURIER_CONTACT_EMAIL_TEMPLATE_ID as string,
			to: {
				data: {
					email,
					phoneNumber,
					name,
					placement,
					size,
					location,
					description,
					budget,
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
