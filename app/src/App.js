// @flow

import * as React from 'react';
import { Typography } from './components';
import ThemeProvider from './styles/ThemeProvider';

const App = () => (
  <ThemeProvider>
    <Typography type="headline">test</Typography>
  </ThemeProvider>
);

export default App;
