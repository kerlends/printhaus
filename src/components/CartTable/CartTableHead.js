/* @flow */

import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CartTableCell from './CartTableCell';

const CartTableHead = () => (
  <TableHead>
    <TableRow>
      <CartTableCell />
      <CartTableCell>Title</CartTableCell>
      <CartTableCell centered>Quantity</CartTableCell>
      <CartTableCell centered>Remove</CartTableCell>
    </TableRow>
  </TableHead>
);

export default CartTableHead;
