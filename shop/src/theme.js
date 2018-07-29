// @flow

import { createMuiTheme } from '@material-ui/core/styles';

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
    fontFamily: '"Bitter", "Times New Roman", serif',
  },
});

export default theme;
