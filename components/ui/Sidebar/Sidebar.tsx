import { ReactNode, useEffect, useRef } from 'react';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import FocusTrap from 'focus-trap-react';
import { Portal } from '@components/common';
import { useUI } from '@components/ui';

import { getScrollbarSize, isOverflowing } from '@utils/index';

function getPaddingRight(node: HTMLElement) {
	return (
		parseInt((window.getComputedStyle(node) as any)['padding-right'], 10) || 0
	);
}

interface Props {
	children: ReactNode;
}

function Sidebar({ children }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { displaySidebar, closeSidebar } = useUI();

	useEffect(() => {
		if (!('document' in global)) return;

		if (displaySidebar && isOverflowing(document.body)) {
			const scrollbarSize = getScrollbarSize();
			document.body.style.paddingRight = `${
				getPaddingRight(document.body) + scrollbarSize
			}px`;

			return () => {
				document.body.style.paddingRight = `${
					getPaddingRight(document.body) - scrollbarSize
				}px`;
			};
		}
	}, [displaySidebar]);

	useEffect(() => {
		if (containerRef.current) {
			if (displaySidebar) {
				disableBodyScroll(containerRef.current);
			} else {
				enableBodyScroll(containerRef.current);
			}
		}

		return () => {
			clearAllBodyScrollLocks();
		};
	}, [displaySidebar]);

	return (
		displaySidebar && (
			<Portal>
				<FocusTrap>
					<div className="fixed inset-0 h-full z-50" ref={containerRef}>
						<div className="absolute inset-0 md:overflow-hidden">
							<div
								className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
								onClick={closeSidebar}
							/>
							<section className="absolute inset-y-0 right-0 md:pl-10 max-w-full flex outline-none">
								<div className="w-screen h-full md:w-screen md:max-w-md">
									<div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
										{children}
									</div>
								</div>
							</section>
						</div>
					</div>
				</FocusTrap>
			</Portal>
		)
	);
}

export default Sidebar;
