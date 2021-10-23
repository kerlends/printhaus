import React from 'react';
import clsx from 'clsx';
import { useUI } from '@components/ui';

interface MobileCartButtonProps {
	visible: boolean;
}

function MobileCartButton({ visible }: MobileCartButtonProps) {
	const { openSidebar, displaySidebar } = useUI();
	const show = visible && !displaySidebar;
	return (
		<div
			className={clsx(
				'fixed top-0 right-0 py-3 px-4 mr-4 mt-4 opacity-0 transition-opacity bg-black text-white rounded-lg',
				{
					'z-10': show,
					'opacity-100 duration-200': show,
					'duration-500': !show,
					'pointer-events-none': !show,
				},
			)}
		>
			<button onClick={openSidebar}>Cart</button>
		</div>
	);
}

export default MobileCartButton;
