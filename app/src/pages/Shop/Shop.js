/* @flow  */

import * as React from 'react';
import { Route, Switch } from 'react-router';
import Featured from './Featured';
import featuredItems from './data'

const Shop = ({ match }: { match: Object }) => (
  <Switch>
    <Route
      render={matchProps =>
        <Featured
          {...matchProps}
          items={featuredItems}
        />
      }
    />
  </Switch>
);

export default Shop;
