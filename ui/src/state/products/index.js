// @flow

import { assoc, merge } from 'ramda';

const LIST_PRODUCTS = '@@estore/LIST_PRODUCTS';

export const listAllProducts = () => ({
  type: LIST_PRODUCTS,
  promise: (client) => client.product.fetchAll(),
});

const initialState = {
  loading: false,
  error: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_PRODUCTS: {
      return assoc('loading', true, state);
    }
    case `${LIST_PRODUCTS}_SUCCESS`: {
      return merge(state, {
        loading: false,
        list: action.payload,
      });
    }
    case `${LIST_PRODUCTS}_FAILURE`: {
      return merge(state, {
        loading: false,
        error: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};
