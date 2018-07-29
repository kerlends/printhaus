/* @flow */

import * as React from 'react';
import Button from '@material-ui/core/Button';
import CartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import PrinthausLogo from '../PrinthausLogo';
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
  logo: {
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  logoSvg: {
    height: '3em',
  },
}));

type Props = {
  classes: any,
};

const Header = ({ classes }: Props) => (
  <header>
    <PrinthausLogo
      className={classes.logo}
      svgClassName={classes.logoSvg}
    />
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
  </header>
);

export default enhance(Header);
