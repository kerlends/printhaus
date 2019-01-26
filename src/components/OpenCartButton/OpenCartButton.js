/* @flow */

import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import CartIcon from '@material-ui/icons/ShoppingCart';

import { CartConsumer } from '../Cart/Cart';

const enhance = withStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 15,
    right: 15,
    zIndex: 123,
  },
}));

const OpenCartButton = ({ classes }) => (
  <CartConsumer>
    {({ toggleCart }) => (
      <div className={classes.buttonContainer}>
        <Fab color="secondary" onClick={toggleCart}>
          <CartIcon />
        </Fab>
      </div>
    )}
  </CartConsumer>
);

export default enhance(OpenCartButton);
