/* @flow */

import * as React from 'react';
import { flex, withStyles } from 'styles';
import ListItem from './ListItem';

const enhance = withStyles((styles) => ({
  root: flex({
    direction: 'column',
  }),
}));

type Props = {
  classes: any,
  children: React.ChildrenArray<typeof ListItem>,
};

const List = ({ classes, children }: Props) => (
  <div className={classes.root}>{children}</div>
);

export default enhance(List);
