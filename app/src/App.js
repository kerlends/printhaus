// @flow

import * as React from 'react';
import { css } from 'glamor'
import { transparentize } from 'polished'
import { Typography } from './components';
import ThemeProvider from './styles/ThemeProvider';
import common from './styles/colors/common';

css.insert(`body {
  color: ${common.black};
  text-shadow: 0 .5px .5px ${transparentize(.8, common.grey)};
}`)

const App = () => (
  <ThemeProvider>
    <Typography type="headline">test</Typography>
  </ThemeProvider>
);

export default App;
