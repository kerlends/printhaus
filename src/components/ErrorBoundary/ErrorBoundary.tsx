import * as React from 'react';
import { BrowserClient, Hub } from '@sentry/browser';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles } from '@material-ui/core/styles';

const sentry = new BrowserClient({
  dsn: process.env.SENTRY_DSN,
});

const hub = new Hub(sentry);

const enhance = withStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  helpText: {
    margin: theme.spacing(2, 0),
  },
}));

class ErrorBoundary extends React.Component<WithStyles> {
  state = {
    error: null,
  };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error });

    hub.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      hub.captureException(error);
    });
  }

  handleRefreshClick = () => {
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Dialog open>
          <DialogContent>
            <Typography variant="h6" align="center" gutterBottom>
              {'Uh oh.. something seems to have gone wrong.'}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              className={classes.helpText}
            >
              {'Try refreshing the page, maybe?'}
            </Typography>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleRefreshClick}
              >
                {'Refresh page'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return this.props.children;
  }
}

export default enhance(ErrorBoundary);
