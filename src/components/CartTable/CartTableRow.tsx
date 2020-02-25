import React, { useCallback } from 'react';

import { Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';

import CartTableCell from './CartTableCell';
import { useCartActionsContext } from '../Cart/CartContext';

const useStyles = makeStyles((theme: Theme) => {
  const iconSize = 15;

  return {
    removeButton: {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    image: {
      margin: 0,
      marginLeft: theme.spacing(1),
      maxWidth: theme.spacing(8),
    },
    imageCell: {
      padding: theme.spacing(1),
    },
    quantityCellContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityChangeButton: {
      height: iconSize * 2,
      width: iconSize * 2,
      fontSize: theme.typography.pxToRem(iconSize),
    },
  };
});

interface Props {
  id: string;
  title: string;
  quantity: number;
  variant: any;
  onItemChange: Function;
  onItemRemove: Function;
}

const CartTableRow: React.FC<Props> = ({ id, title, quantity, variant }) => {
  const classes = useStyles();
  const { update, remove } = useCartActionsContext();

  const handleItemRemove = useCallback(() => {
    remove(id, title);
  }, [id, remove, title]);

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      update(id, quantity);
    },
    [id, remove, quantity],
  );

  const handleQuantityAdd = useCallback(() => {
    handleQuantityChange(quantity + 1);
  }, [quantity, handleQuantityChange]);

  const handleQuantityRemove = useCallback(() => {
    if (quantity === 1) {
      handleItemRemove();
    } else {
      handleQuantityChange(quantity - 1);
    }
  }, [quantity, handleItemRemove, handleQuantityChange]);

  return (
    <TableRow className={classes.row}>
      <CartTableCell className={classes.imageCell} centered>
        <img className={classes.image} src={variant.image.src} alt={title} />
      </CartTableCell>
      <CartTableCell component="th" scope="row">
        {title}
      </CartTableCell>
      <CartTableCell centered align="right">
        <div className={classes.quantityCellContent}>
          <IconButton
            aria-label="Increase quantity"
            className={classes.quantityChangeButton}
            onClick={handleQuantityAdd}
            size="small"
          >
            <AddIcon />
          </IconButton>
          {quantity}
          <IconButton
            aria-label="Decrease quantity"
            className={classes.quantityChangeButton}
            onClick={handleQuantityRemove}
            size="small"
          >
            <RemoveIcon />
          </IconButton>
        </div>
      </CartTableCell>
      <CartTableCell centered>
        <IconButton aria-label="Remove" onClick={handleItemRemove}>
          <ClearIcon />
        </IconButton>
      </CartTableCell>
    </TableRow>
  );
};

export default CartTableRow;
