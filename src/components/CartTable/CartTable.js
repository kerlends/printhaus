/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { CartConsumer } from '../Cart/Cart';
import CartTableHead from './CartTableHead';
import CartTableRow from './CartTableRow';

const enhance = withStyles((theme) => ({
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

type Props = {
  classes: any,
  items: Array<any>,
  onItemChange: Function,
  onItemRemove: Function,
};

const CartTable = ({
  classes,
  items,
  onItemChange,
  onItemRemove,
}: Props) => (
  <CartConsumer>
    {({ update, remove }) => (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <CartTableHead />
          <TableBody>
            {items.map((item) => {
              return (
                <CartTableRow
                  key={item.id}
                  id={item.id}
                  variant={item.variant}
                  title={item.title}
                  quantity={item.quantity}
                  onItemRemove={remove}
                  onItemChange={update}
                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )}
  </CartConsumer>
);

export default enhance(CartTable);
