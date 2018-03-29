/* @flow  */

import * as React from 'react';
import { Route, Switch } from 'react-router';
import Featured from './Featured';

const Shop = ({ match }) => (
  <Switch>
    <Route component={Featured} />
  </Switch>
);

export default Shop;
