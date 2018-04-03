// @flow

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import ThemeProvider from './styles/ThemeProvider';
import { Banner, Content, Drawer, Navbar } from './components';

import Contact from './pages/Contact';
import Shop from './pages/Shop';

import './styles/global';

const navItems = [
  {
    to: '/shop',
    label: 'shop',
  },
  {
    to: '/contact',
    label: 'contact',
  },
];

type State = {
  drawerOpen: boolean,
};

class App extends React.Component<any, State> {
  state = { drawerOpen: false };

  toggleDrawer = () =>
    this.setState(({ drawerOpen }) => ({
      drawerOpen: !drawerOpen,
    }));

  render() {
    const { drawerOpen } = this.state;
    return (
      <ThemeProvider>
        <Drawer
          isOpen={drawerOpen}
          onRequestClose={this.toggleDrawer}
          items={navItems}
        />
        <Navbar onMenuButtonClick={this.toggleDrawer} />
        <Banner text="printhaus"  />
        <Content>
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/shop" component={Shop} />
            <Redirect to="/shop" />
          </Switch>
        </Content>
      </ThemeProvider>
    );
  }
}

export default App;
