/* @flow */

import * as React from 'react';

import Button from '@material-ui/core/Button';
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

type Props = {
  classes: any,
};

const OpenCartButton = ({ classes }: Props) => (
  <CartConsumer>
    {({ toggleCart }) => (
      <div className={classes.buttonContainer}>
        <Button
          color="secondary"
          variant="fab"
          onClick={toggleCart}
        >
          <CartIcon />
        </Button>
      </div>
    )}
  </CartConsumer>
);

export default enhance(OpenCartButton);
