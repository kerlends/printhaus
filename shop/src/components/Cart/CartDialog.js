// @flow

import * as React from 'react';
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
  isEmpty: boolean,
  onOpenCheckoutClick: Function,
  title: string,
  totalPrice: string,
};

const CartDialog = ({
  classes,
  children,
  isEmpty,
  onOpenCheckoutClick,
  title,
  totalPrice,
  items,
  ...props
}: Props) => (
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
      <DialogContent>
        <DialogContentText align="center">
          Your cart is empty
        </DialogContentText>
      </DialogContent>
    )}
  </Dialog>
);

export default enhance(CartDialog);
