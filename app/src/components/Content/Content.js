/* @flow */

import * as React from 'react';
import { flex, padding, withStyles } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    ...padding({
      left: styles.spacing.unit * 2,
      right: styles.spacing.unit * 2,
    }),
    ...flex({ direction: 'column' }),
  },
}));

type Props = {
  classes: any,
  children: React.Node,
};

const Content = ({ classes, children }: Props) => (
  <main className={classes.root}>{children}</main>
);

export default enhance(Content);
