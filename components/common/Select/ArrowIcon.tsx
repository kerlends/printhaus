interface Props {
	isOpen: boolean;
}

function ArrowIcon({ isOpen }: Props) {
	return (
		<svg
			viewBox="0 0 20 20"
			preserveAspectRatio="none"
			width={16}
			fill="transparent"
			stroke="#979797"
			strokeWidth="1.1px"
			transform={isOpen ? 'rotate(180)' : ''}
		>
			<path d="M1,6 L10,15 L19,6" />
		</svg>
	);
}

export default ArrowIcon;
