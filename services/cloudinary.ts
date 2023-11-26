import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	secure: true,
});

export async function uploadImage(diskPath: string) {
	const results = await cloudinary.uploader.upload(diskPath, {
		unique_filename: true,
	});

	return results.url;
}

export async function uploadImageFromBuffer(buffer: Buffer) {
	const result = await new Promise<UploadApiResponse>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream((error, result) => {
				if (error) return reject(error);
				if (!result) return reject('Upload failed');
				return resolve(result);
			})
			.end(buffer);
	});

	return result.url;
}

export async function uploadImageFile(file: File) {
	const fileBuffer = await file.arrayBuffer();
	const mime = file.type;
	const encoding = 'base64';
	const base64Data = Buffer.from(fileBuffer).toString('base64');
	const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
	const result = await cloudinary.uploader.upload(fileUri, {
		invalidate: false,
	});
	return result.url;
}

export async function getImagePlaceholder(img: string) {
	const id = img.split('/').pop()!.split('.jpg')[0];

	const uploadResult = await cloudinary.uploader.upload(img, {
		// unique_filename: true,
		public_id: id,
	});

	const result = cloudinary.url(uploadResult.public_id, {
		transformation: {
			effect: 'pixelate',
			quality: 5,
		},
	});

	return result;
}
