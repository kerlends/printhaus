'use client';

import { useCallback, useRef, useState } from 'react';
import { uploadImageFilesToCloudinary } from 'services/cloudinary.client';

import { TextField, TextFieldProps } from '@components/forms/TextField';
import { Button } from '@components/ui/Button';
import { useToast } from '@components/ui/context';

import { useBookingFormContext } from './BookingForm';

interface ImageUploadFieldProps
	extends Pick<TextFieldProps, 'label' | 'hint' | 'name'> {}

export function ImageUploadField({ label, hint, name }: ImageUploadFieldProps) {
	const { showNotificationToast } = useToast();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const hiddenInputREf = useRef<HTMLInputElement>(null);
	const { setUploading, uploading } = useBookingFormContext();

	const [images, setImages] = useState<string[]>([]);

	const handleUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;

			if (!files || files.length === 0) {
				return;
			}

			setUploading(true);

			uploadImageFilesToCloudinary(files).then((urls) => {
				const value = urls.map((u) => u.secure_url).join(';');
				setImages(urls.map((u) => u.url));
				hiddenInputREf.current!.value = value;
				hiddenInputREf.current!.setAttribute('value', value);
				setUploading(false);
				showNotificationToast('Files uploaded');
			});
		},
		[showNotificationToast],
	);

	return (
		<>
			<input ref={hiddenInputREf} type="hidden" name={name} />
			<TextField
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleUpload}
				disabled={uploading}
				label={label}
				readOnly={uploading}
				hint={uploading ? 'Uploading...' : hint}
				className="opacity-0 pointer-events-none absolute -z-10"
			>
				<div className="p-2">
					<Button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						size="xs"
						disabled={uploading}
					>
						Upload
					</Button>
				</div>
				{images.length > 0 && (
					<div className="flex gap-2 px-2">
						{images.map((url) => (
							<img
								key={url}
								src={url}
								alt="Uploaded image"
								className="max-w-[100px]"
							/>
						))}
					</div>
				)}
			</TextField>
		</>
	);
}
