export function uploadImageFilesToCloudinary(files: FileList) {
	const url = 'https://api.cloudinary.com/v1_1/njosnavel/image/upload';

	const formData = new FormData();

	const promises: Promise<{ url: string; secure_url: string }>[] = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		formData.append('file', file);
		formData.append('upload_preset', 'client_upload');

		const promise = fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return data;
			});

		promises.push(promise);
	}

	return Promise.all(promises);
}
