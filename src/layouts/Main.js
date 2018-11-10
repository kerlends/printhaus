// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ErrorBoundary from 'components/ErrorBoundary';

const enhance = withStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: '0 auto',
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 8,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 800,
    },
  },
}));

type Props = {
  children: React.Node,
  classes: any,
};

const Main = ({ children, classes }: Props) => (
  <ErrorBoundary>
    <div className={classes.root}>{children}</div>
  </ErrorBoundary>
);

export default enhance(Main);
