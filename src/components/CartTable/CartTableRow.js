// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import CartTableCell from './CartTableCell';

const enhance = withStyles((theme) => ({
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
    marginLeft: theme.spacing.unit,
    maxWidth: theme.spacing.unit * 8,
  },
  imageCell: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
}));

type Props = {
  classes: any,
  onItemChange: Function,
  onItemRemove: Function,
};

const CartTableRow = ({
  classes,
  variant,
  title,
  quantity,
  onItemRemove,
}: Props) => (
  <TableRow className={classes.row}>
    <CartTableCell className={classes.imageCell} centered>
      <img
        className={classes.image}
        src={variant.image.src}
        alt={title}
      />
    </CartTableCell>
    <CartTableCell component="th" scope="row">
      {title}
    </CartTableCell>
    <CartTableCell centered numeric>
      {quantity}
    </CartTableCell>
    <CartTableCell centered>
      <button
        className={classes.removeButton}
        onClick={onItemRemove}
      >
        x
      </button>
    </CartTableCell>
  </TableRow>
);

export default enhance(CartTableRow);
