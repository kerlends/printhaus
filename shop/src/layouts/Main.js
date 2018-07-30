// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

const enhance = withStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: '0 auto',
  },
}));

type Props = {
  children: React.Node,
  classes: any,
};

const Main = ({ children, classes }: Props) => (
  <div className={classes.root}>{children}</div>
);

export default enhance(Main);
