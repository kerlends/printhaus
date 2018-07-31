// @flow

import { createMuiTheme } from '@material-ui/core/styles';

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
    fontFamily: '"Bitter", "Times New Roman", serif',
  },
});

export default theme;
