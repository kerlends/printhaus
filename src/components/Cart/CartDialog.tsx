import React, { useEffect, useRef } from 'react';
import { useLocation } from '@reach/router';

import { Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import numeral from 'numeral';

import CartDialogContent from './CartDialogContent';
import CartTable from '../CartTable';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(3),
  },
}));

interface Props extends DialogProps {
  isEmpty: boolean;
  items: Array<any>;
  open: boolean;
  onBackdropClick: () => void;
  onOpenCheckoutClick: () => void;
  title: string;
  totalPrice: string;
}

const CartDialog: React.FC<Props> = ({
  children,
  isEmpty,
  open,
  onBackdropClick,
  onOpenCheckoutClick,
  title,
  totalPrice,
  items,
  ...props
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (pathname !== prevPathnameRef.current && open) {
      onBackdropClick();
    }
  }, [pathname, open]);

  return (
    <Dialog classes={classes} {...props} open={open}>
      {!isEmpty ? (
        <React.Fragment>
          <DialogTitle disableTypography>
            <Typography variant="h5" align="center">
              {title}
            </Typography>
          </DialogTitle>
          <CartTable items={items} />
          <CartDialogContent>
            {children}
            <DialogContentText
              style={{ marginTop: 16 }}
              variant="subtitle1"
              align="center"
            >
              {`Total cost: ${numeral(totalPrice).format('$0.00')}`}
            </DialogContentText>
            <Button
              aria-label="Checkout"
              variant="contained"
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
};

export default CartDialog;
