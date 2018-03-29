import { makeExecutableSchema } from 'graphql-tools';
import { flatten, reduce, mergeDeepLeft } from 'ramda';

import * as rate from './rate';

const mergeDeepLeftAll = reduce(mergeDeepLeft, {});

const typeDefs = flatten([rate.schema]);
const resolvers = mergeDeepLeftAll([rate.resolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
