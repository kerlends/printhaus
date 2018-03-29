// @flow

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { css } from 'glamor';
import { transparentize } from 'polished';

import Shop from './pages/Shop';

import { Typography } from './components';
import ThemeProvider from './styles/ThemeProvider';
import common from './styles/colors/common';

css.insert(`body {
  color: ${common.black};
  text-shadow: 0 .5px .5px ${transparentize(0.8, common.grey)};
}`);

const App = () => (
  <ThemeProvider>
    <Typography type="headline" align="center">
      printhaus
    </Typography>
    <Switch>
      <Route path="/shop" component={Shop} />
      <Redirect to="/shop" />
    </Switch>
  </ThemeProvider>
);

export default App;
