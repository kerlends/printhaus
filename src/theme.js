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
    useNextVariants: true,
    fontFamily: typography.options.bodyFontFamily.join(', '),
    h1: {
      fontFamily: typography.options.headerFontFamily.join(
        ', ',
      ),
    },
  },
});

export default theme;
