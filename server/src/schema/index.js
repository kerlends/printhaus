import { makeExecutableSchema } from 'graphql-tools';
import { flatten, reduce, mergeDeepLeft } from 'ramda';

import * as rate from './rate';
import * as products from './products'

const mergeDeepLeftAll = reduce(mergeDeepLeft, {});

const typeDefs = flatten([rate.schema, products.schema]);

const resolvers = mergeDeepLeftAll([rate.resolver, products.resolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
