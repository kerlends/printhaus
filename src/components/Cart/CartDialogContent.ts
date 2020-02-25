import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

const enhance = withStyles(() => ({
  root: {},
}));

export default enhance(DialogContent);
