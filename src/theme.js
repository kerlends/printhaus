// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import typography from './utils/typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#696969',
    },
    secondary: {
      main: '#000',
    },
  },
  typography: {
    fontFamily: typography.options.bodyFontFamily.join(', '),
    headline: {
      fontFamily: typography.options.headerFontFamily.join(
        ', ',
      ),
    },
  },
});

export default theme;
