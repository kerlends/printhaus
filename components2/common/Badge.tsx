import clsx from 'clsx';

interface BadgeProps {
	children?: React.ReactNode;
	className?: string;
	value?: number;
}

export function Badge({ children, className, value }: BadgeProps) {
	return (
		<span
			className={clsx(
				'relative inline-flex flex-shrink-0 align-middle text-xs',
				className,
			)}
		>
			{children}
			{value ? (
				<span
					style={{ height: 16, minWidth: 16, transformOrigin: '100% 0' }}
					className="font-sans absolute right-0 top-0 z-0 box-border flex -translate-y-1/3 translate-x-3 scale-100 transform flex-row flex-wrap items-center justify-center rounded-xl border border-gray-700 bg-black leading-none text-white transition-transform"
				>
					{value}
				</span>
			) : null}
		</span>
	);
}
