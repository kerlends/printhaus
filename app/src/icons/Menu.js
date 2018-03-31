/* @flow */

import * as React from 'react';
import SVG, { type IconProps } from './SVG';

const Menu = (props: IconProps) => (
  <SVG {...props}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </SVG>
);

export default Menu;
