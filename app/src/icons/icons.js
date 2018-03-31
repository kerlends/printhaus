/* @flow */

import { default as Menu } from './Menu';

const icons = {
  menu: Menu,
};

export type Icon = $Keys<typeof icons>;

export default icons;
