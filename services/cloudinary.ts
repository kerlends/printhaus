import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	secure: true,
});

export async function uploadImage(diskPath: string) {
	const results = await cloudinary.uploader.upload(diskPath, {
		unique_filename: true,
	});

	return results.url;
}
