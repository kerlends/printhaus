import React from 'react';

import { TextField } from '@components/forms/TextField';

import { BookingForm } from './BookingForm';
import { ImageUploadField } from './ImageUploadField';
import { BookingFormSubmitButton } from './SubmitButton';

const locations = ['Halifax', 'Montreal'].map((value) => ({
	label: value,
	value,
}));

export default function TattoosFormPage() {
	return (
		<BookingForm>
			<h2 className="text-2xl md:text-center">Booking requests</h2>
			<div className="flex flex-col gap-4">
				<TextField label="Name" name="name" required />
				<TextField label="Email" name="email" required autoCapitalize="off" />
				<TextField
					label="Phone number"
					name="phoneNumber"
					type="tel"
					required
				/>
				<SelectField
					label="Location"
					name="location"
					required
					options={locations}
				/>
				<TextField label="Placement" name="placement" required />
				<TextField
					label="Size"
					hint="Doesn't have to be precise, and a general size description should be fine"
					name="size"
					required
				/>
				<TextareaField
					label="Describe your idea"
					hint="Please be as detailed as possible!"
					name="description"
				/>
				<TextField label="Budget" name="budget" required />
				<ImageUploadField label="References / images" name="images" />
				<div className="flex justify-end">
					<BookingFormSubmitButton />
				</div>
			</div>
		</BookingForm>
	);
}

interface TextareaFieldProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	hint?: string;
	label: string;
	required?: boolean;
}

function TextareaField({
	hint,
	label,
	required,
	...props
}: TextareaFieldProps) {
	return (
		<div className="rounded-sm border border-gray-200 p-2 focus-within:border-gray-800">
			<label className="block px-2">
				<p className="text-sm font-semibold">{label}</p>
				<textarea
					className="block h-56 w-full resize-none py-2 focus:outline-none"
					{...props}
				/>
			</label>
			{hint && <p className="px-2 pb-1 text-xs text-gray-400">{hint}</p>}
		</div>
	);
}

interface SelectFieldProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	hint?: string;
	required?: boolean;
	options: { label: string; value: string }[];
}

function SelectField({
	label,
	hint,
	required,
	options,
	...props
}: SelectFieldProps) {
	return (
		<div className="rounded-sm border border-gray-200 p-2 focus-within:border-gray-800">
			<label className="block px-2">
				<p className="text-sm font-semibold">{label}</p>
				{/* with a downwards caret */}
				<select
					className="block w-full py-2 focus:outline-none appearance-none bg-transparent"
					required={required}
					{...props}
				>
					{options.map(({ label, value }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</label>
			<p className="px-2 pb-1 text-xs text-gray-400">{hint}</p>
		</div>
	);
}

export const dynamic = 'force-static';

export const revalidate = 21600;
