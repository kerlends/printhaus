// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const enhance = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '50vh',
  },
  headline: {
    fontSize: '2.2rem',
  },
}));

const NotFoundPage = ({ classes }: any) => (
  <div className={classes.root}>
    <Typography
      align="center"
      className={classes.headline}
      color="inherit"
      variant="headline"
    >
      Uh oh..
    </Typography>
    <Typography component="p" color="inherit" align="center">
      We couldn't find what you were looking for
    </Typography>
  </div>
);

export default enhance(NotFoundPage);
