// @flow

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import banner from './assets/banner.jpg';
import ThemeProvider from './styles/ThemeProvider';
import { Banner, Content, Navbar } from './components';

import Contact from './pages/Contact';
import Shop from './pages/Shop';

import './styles/global';

const onMenuButtonClick = () => console.log('toggle nav');

const App = () => (
  <ThemeProvider>
    <Navbar onMenuButtonClick={onMenuButtonClick} />
    <Banner src={banner} alt="printhaus" />
    <Content>
      <Switch>
        <Route path="/contact" component={Contact} />
        <Route path="/shop" component={Shop} />
        <Redirect to="/shop" />
      </Switch>
    </Content>
  </ThemeProvider>
);

export default App;
