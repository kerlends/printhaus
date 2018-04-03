/* @flow */

import * as React from 'react';
import { flex,  withStyles } from 'styles';
import { IconButton } from 'components';

const enhance = withStyles((styles) => ({
  root: {
    background: 'rgba(255, 255, 255, .8)',
    margin: 0,
    padding: styles.spacing.unit * 2,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    ...flex({ align: 'center' }),
  },
}));

type Props = {
  classes: any,
  innerRef: any,
  onMenuButtonClick: Function,
};

const Navbar = ({ classes, innerRef, onMenuButtonClick }: Props) => (
  <nav className={classes.root} ref={innerRef}>
    <IconButton icon="menu" onClick={onMenuButtonClick} />
  </nav>
);

export default enhance(Navbar);
