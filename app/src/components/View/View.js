/* @flow */

import * as React from 'react';
import { merge, withStyles } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    margin: styles.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  responsive: {
    [styles.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type Props = {
  children: React.Node,
  classes: any,

  center?: boolean,
  column?: boolean,
};

const View = ({ children, classes, center, column }: Props) => (
  <div
    className={merge(
      classes.root,
      !column && classes.responsive,
      center && classes.center,
      column && classes.column,
    )}
  >
    {children}
  </div>
);

export default enhance(View);
