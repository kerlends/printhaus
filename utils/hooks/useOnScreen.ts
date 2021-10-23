import React, { useEffect, useRef, useState } from 'react';

export function useOnScreen(
	ref: React.RefObject<HTMLElement>,
	rootMargin = '0px',
) {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState(false);

	const isIntersectingRef = useRef(isIntersecting);

	useEffect(() => {
		isIntersectingRef.current = isIntersecting;
	}, [isIntersecting]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				if (entry.isIntersecting !== isIntersectingRef.current) {
					isIntersectingRef.current = entry.isIntersecting;
					setIntersecting(entry.isIntersecting);
				}
			},
			{
				rootMargin,
			},
		);
		if (ref.current) {
			observer.observe(ref.current);
			return () => {
				observer.unobserve(ref.current!);
			};
		}
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return isIntersecting;
}
