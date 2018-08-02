// @flow

import * as React from 'react';
import withRouter from 'react-router-dom/withRouter';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';

import CartDialogContent from './CartDialogContent';
import CartTable from '../CartTable';

const enhance = withStyles((theme) => ({
  paper: {
    margin: theme.spacing.unit * 3,
  },
}));

type Props = {
  children: any,
  location: any,
  isEmpty: boolean,
  open: boolean,
  onBackdropClick: Function,
  onOpenCheckoutClick: Function,
  title: string,
  totalPrice: string,
};

class CartDialog extends React.Component<Props> {
  componentDidUpdate(lastProps: Props) {
    if (
      this.props.location.pathname !==
        lastProps.location.pathname &&
      this.props.open
    ) {
      this.props.onBackdropClick();
    }
  }

  render() {
    const {
      classes,
      children,
      isEmpty,
      onOpenCheckoutClick,
      title,
      totalPrice,
      items,
      ...props
    } = this.props;
    return (
      <Dialog classes={classes} {...props}>
        {!isEmpty ? (
          <React.Fragment>
            <DialogTitle disableTypography>
              <Typography variant="headline" align="center">
                {title}
              </Typography>
            </DialogTitle>
            <CartTable items={items} />
            <CartDialogContent>
              {children}
              <DialogContentText
                style={{ marginTop: 16 }}
                variant="subheading"
                align="center"
              >
                {`Total cost: ${numeral(totalPrice).format(
                  '$0.00',
                )}`}
              </DialogContentText>
              <Button
                variant="raised"
                color="secondary"
                onClick={onOpenCheckoutClick}
                style={{ marginTop: 16 }}
                fullWidth
              >
                Checkout
              </Button>
            </CartDialogContent>
          </React.Fragment>
        ) : (
          <CartDialogContent>
            <DialogContentText align="center">
              Your cart is empty
            </DialogContentText>
          </CartDialogContent>
        )}
      </Dialog>
    );
  }
}

export default enhance(withRouter(CartDialog));
