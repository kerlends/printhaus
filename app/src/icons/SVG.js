/* @flow */

import * as React from 'react';

export type IconProps = {
  className?: string,
  fill?: any,
  stroke?: any,
  strokeWidth?: number,
  size?: number,
};

type Props = IconProps & {
  children: React.Node,
};

const SVG = (props: Props) => (
  <svg
    {...props}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  />
);

SVG.defaultProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
};

export default SVG;
