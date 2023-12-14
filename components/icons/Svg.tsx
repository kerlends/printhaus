import React, { forwardRef } from 'react';

export interface SvgProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
}

export const Svg = forwardRef<SVGSVGElement, SvgProps>(function Svg(
	{ size = 24, ...props },
	ref,
) {
	return <svg {...props} height={size} width={size} ref={ref} />;
});
