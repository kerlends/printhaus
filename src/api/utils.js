// @flow

import {
  applySpec,
  map,
  path,
  pipe,
  prop,
  propOr,
} from 'ramda';

export const parseLineItems = pipe(
  propOr([], 'edges'),
  map(prop('node')),
);

export const parseCheckout = applySpec({
  createdAt: prop('createdAt'),
  id: prop('id'),
  lineItems: pipe(
    path(['lineItems', 'edges']),
    map(prop('node')),
  ),
  paymentDue: prop('paymentDue'),
  subtotalPrice: prop('subtotalPrice'),
  totalPrice: prop('totalPrice'),
  updatedAt: prop('updatedAt'),
});
