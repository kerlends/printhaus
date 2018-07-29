// @flow

import * as React from 'react';
import { hot } from 'react-hot-loader';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Shop from './views/Shop';

import theme from './theme';
import Nav from './Nav';

class App extends React.Component<any> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route path="/store" component={Shop} />
          </Switch>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(App);
