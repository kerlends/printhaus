// @flow

import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

const enhance = withStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing
      .unit * 2}px`,
  },
}));

export default enhance(DialogContent);
