// @flow

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import ThemeProvider from './styles/ThemeProvider';
import Shop from './pages/Shop';
import { Banner } from './components';

import banner from './assets/banner.jpg';

import './styles/global';

const App = () => (
  <ThemeProvider>
    <Banner src={banner} alt="printhaus" />
    <Switch>
      <Route path="/shop" component={Shop} />
      <Redirect to="/shop" />
    </Switch>
  </ThemeProvider>
);

export default App;
