import * as React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';

import Cart from '../Cart';
import FavIcon from '../FavIcon';
import Footer from '../Footer';
import Header from '../Header';
import OpenCartButton from '../OpenCartButton';
import ErrorBoundary from '../ErrorBoundary';

import withRoot from '../../withRoot';

import '../../fonts/Walbaum.css';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      maxWidth: 500,
      margin: '0 auto',
      marginTop: theme.spacing.unit * 4,
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing.unit * 8,
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 800,
      },
    },
  });
};

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

const handleCheckout = () => {};

const Layout = ({ children, classes }: Props) => (
  <React.Fragment>
    <Cart onCheckout={handleCheckout}>
      <FavIcon />
      <Header />
      <ErrorBoundary>
        <div className={classes.root}>{children}</div>
      </ErrorBoundary>
      <Footer />
      <OpenCartButton />
    </Cart>
  </React.Fragment>
);

export default withRoot(withStyles(styles)(Layout));
