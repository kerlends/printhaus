/* @flow */

import { prop } from 'ramda';
import type { Product } from '../../types';

const resolver = {
  Query: {
    products: (root: any, args: any, ctx: any) => ctx.Firestore.getProducts(),
  },
  Mutation: {
    addProduct: (root: any, { input }: { input: Product }, ctx: any) =>
      ctx.Firestore.addProduct(input),
  },
  Product: {
    soldOut: prop('sold_out'),
  },
};

export default resolver;
