/* @flow */

import * as React from 'react';
import { withStyles } from 'styles';
import { IconButton } from 'components';

const enhance = withStyles((styles) => ({
  root: {
    background: 'transparent',
    padding: styles.spacing.unit,
  },
}));

type Props = {
  classes: any,
  onMenuButtonClick: Function,
};

const Navbar = ({ classes, onMenuButtonClick }: Props) => (
  <nav className={classes.root}>
    <IconButton icon="menu" onClick={onMenuButtonClick} />
  </nav>
);

export default enhance(Navbar);
