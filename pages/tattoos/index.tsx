import TattooLayout from '@components/ui/Layout/TattooLayout';
import React from 'react';

export const config = {
	unstable_runtimeJS: false,
};

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	hint?: string;
	label: string;
	required?: boolean;
}

function Field({ hint, label, required, ...props }: FieldProps) {
	return (
		<div className="border border-gray-200 rounded-sm p-2 focus-within:border-gray-800">
			<label className="block px-2">
				<p className="text-sm font-semibold">{label}</p>
				<input
					className="block py-2 w-full focus:outline-none"
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
		<div className="border border-gray-200 rounded-sm p-2 focus-within:border-gray-800">
			<label className="px-2 block">
				<p className="text-sm font-semibold">{label}</p>
				<textarea
					className="block py-2 w-full resize-none h-56 focus:outline-none"
					{...props}
				/>
			</label>
			{hint && <p className="px-2 pb-1 text-xs text-gray-400">{hint}</p>}
		</div>
	);
}
export default function TattoosIndexPage() {
	return (
		<div className="flex flex-col gap-3 max-w-xl mx-auto">
			<h2 className="text-2xl md:text-center">Booking requests</h2>
			<form
				action="/api/tattoos/contact"
				encType="multipart/form-data"
				method="post"
				className="flex flex-col gap-4"
			>
				<Field label="Name" name="name" required />
				<Field label="Email" name="email" required />
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
				<Field label="References / images" type="file" name="images" multiple />
				<div className="flex justify-end">
					<button className="mt-4 px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

TattoosIndexPage.Layout = TattooLayout;
