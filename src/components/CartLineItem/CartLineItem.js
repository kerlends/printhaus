/* @flow */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';

const CartLineItem = ({
  title,
  onQuantityDecrement,
  onQuantityIncrement,
  quantity,
  onRemoveClick,
}) => (
  <div>
    <Typography variant="body1">{title}</Typography>
    <Typography>{`Quantity: ${quantity}`}</Typography>
    <button onClick={onQuantityDecrement}>{'-'}</button>
    <button onClick={onQuantityIncrement}>{'+'}</button>
    <button onClick={onRemoveClick}>Remove</button>
  </div>
);

export default CartLineItem;
