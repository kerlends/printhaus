import * as React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { useCartActionsContext } from '../Cart/CartContext';
import CartTableHead from './CartTableHead';
import CartTableRow from './CartTableRow';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: 0,
    boxShadow: theme.shadows[0],
  },
  table: {
    //minWidth: 700,
    marginBottom: 0,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

interface Props {
  items: Array<any>;
}

const CartTable = ({ items }: Props) => {
  const classes = useStyles();
  const { update, remove } = useCartActionsContext();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <CartTableHead />
        <TableBody>
          {items.map((item) => {
            return (
              <CartTableRow
                key={item.id}
                id={item.id}
                title={item.title}
                quantity={item.quantity}
                variant={item.variant}
                onItemRemove={remove}
                onItemChange={update}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CartTable;
