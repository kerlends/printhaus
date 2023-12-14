'use client';

export function LogProduct({ item }: { item: any }) {
	return (
		<button
			onClick={() => {
				console.log(item);
			}}
		>
			Log item
		</button>
	);
}
