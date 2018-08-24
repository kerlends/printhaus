// @flow

import { curry, find, propEq } from 'ramda';

const findVariantById = curry((id, variants) =>
  find(propEq('id', id), variants),
);

export default findVariantById;
