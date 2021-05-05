import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	innerRef?: React.MutableRefObject<HTMLDivElement>;
};

function Portal({ children, className, innerRef }: Props) {
	const mountNodeRef = useRef<HTMLDivElement | null>(null);

	if (!('document' in global)) {
		return null;
	}

	if (mountNodeRef.current === null) {
		mountNodeRef.current = document.createElement('div');
		if (innerRef?.current) {
			innerRef.current = mountNodeRef.current;
		}
		if (className) {
			mountNodeRef.current.setAttribute('class', className);
		}
	}

	const mountNode = mountNodeRef.current!;

	useEffect(() => {
		document.body.appendChild(mountNode);
		return () => {
			document.body.removeChild(mountNode);
			mountNodeRef.current = null;
		};
	}, []);

	return mountNode !== null ? createPortal(children, mountNode) : null;
}

export default Portal;
