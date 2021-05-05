import { ReactNode, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { Portal } from '@components/common';
import { useUI } from '@components/ui';

import { handleContainer } from './utils';

interface Props {
	children: ReactNode;
}

function Sidebar({ children }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { displaySidebar, closeSidebar } = useUI();

	useEffect(() => {
		if (displaySidebar && containerRef.current) {
			const restore = handleContainer({
				container: containerRef.current,
				restore: null,
			});

			return () => {
				restore();
			};
		}
	}, [displaySidebar]);

	return (
		displaySidebar && (
			<Portal>
				<FocusTrap>
					<div
						className="fixed inset-0 h-full md:h-screen z-50 flex justify-end"
						ref={containerRef}
					>
						<div
							className="fixed inset-0 bg-black bg-opacity-50 transition-opacity hidden md:block"
							style={{ zIndex: -1 }}
							onClick={closeSidebar}
						/>
						<div className="w-screen h-full md:pl-10 outline-none max-w-full flex flex-col text-base bg-accents-1 shadow-xl md:overflow-y-auto md:max-w-md">
							{children}
						</div>
					</div>
				</FocusTrap>
			</Portal>
		)
	);
}

export default Sidebar;
