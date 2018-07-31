/* @flow */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  title: string,
  image: string,
  quantity: number,
  onQuantityIncrement: Function,
  onQuantityDecrement: Function,
  onRemoveClick: Function,
};

const CartLineItem = ({
  title,
  onQuantityDecrement,
  onQuantityIncrement,
  quantity,
  onRemoveClick,
}: Props) => (
  <div>
    <Typography type="body1">{title}</Typography>
    <Typography>{`Quantity: ${quantity}`}</Typography>
    <button onClick={onQuantityDecrement}>{'-'}</button>
    <button onClick={onQuantityIncrement}>{'+'}</button>
    <button onClick={onRemoveClick}>Remove</button>
  </div>
);

export default CartLineItem;
