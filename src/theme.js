// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import typography from './utils/typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#252525',
    },
    primary: {
      main: '#fff',
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
