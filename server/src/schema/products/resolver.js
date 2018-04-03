/* @flow */

import { prop } from 'ramda';

const resolver = {
  Query: {
    products: (root: any, args: any, ctx: any) => ctx.Firestore.getProducts(),
  },
  Product: {
    soldOut: prop('sold_out'),
  },
};

export default resolver;
