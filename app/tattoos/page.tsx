import React from 'react';

import { BookingForm } from './BookingForm';
import { BookingFormSubmitButton } from './SubmitButton';

export default function TattoosFormPage() {
	return (
		<BookingForm>
			<h2 className="text-2xl md:text-center">Booking requests</h2>
			<div className="flex flex-col gap-4">
				<Field label="Name" name="name" required />
				<Field label="Email" name="email" required autoCapitalize="off" />
				<Field label="Placement" name="placement" required />
				<Field
					label="Size"
					hint="Doesn't have to be precise, and a general size description should be fine"
					name="size"
					required
				/>
				<MultilineField
					label="Describe your idea"
					hint="Please be as detailed as possible!"
					name="description"
				/>
				<Field label="Budget" name="budget" required />
				<Field label="References / images" type="file" name="images" multiple />
				<div className="flex justify-end">
					<BookingFormSubmitButton />
				</div>
			</div>
		</BookingForm>
	);
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	hint?: string;
	label: string;
	required?: boolean;
}

function Field({ hint, label, required, ...props }: FieldProps) {
	return (
		<div className="rounded-sm border border-gray-200 p-2 focus-within:border-gray-800">
			<label className="block px-2">
				<p className="text-sm font-semibold">{label}</p>
				<input
					className="block w-full py-2 focus:outline-none"
					required={required}
					{...props}
				/>
			</label>
			{hint && <p className="px-2 pb-1 text-xs text-gray-400">{hint}</p>}
		</div>
	);
}

interface MultilineFieldProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	hint?: string;
	label: string;
	required?: boolean;
}

function MultilineField({
	hint,
	label,
	required,
	...props
}: MultilineFieldProps) {
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

export const dynamic = 'force-static';

export const revalidate = 21600;
