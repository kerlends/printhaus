/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const enhance = withStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    xIndex: 1340,
    border: '1px solid',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
}));

type Props = {
  classes: any,
};

const LoadingScreen = ({ classes }: Props) => (
  <Fade
    in
    appear
    timeout={{
      enter: 500,
      exit: 1000,
    }}
  >
    <div className={classes.root}>
      <CircularProgress color="primary" size={60} />
    </div>
  </Fade>
);

export default enhance(LoadingScreen);
