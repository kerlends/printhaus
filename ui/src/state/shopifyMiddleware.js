// @flow

import Client from 'shopify-buy';
import type { Middleware } from 'redux';

const shopifyMiddleware: Middleware = (store) => {
  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOP_DOMAIN,
    storefrontAccessToken:
      process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
  });

  return (next) => (action) => {
    if (typeof action === 'function') return action(store);

    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    next({ ...rest, type });

    const actionPromise = promise(client);

    actionPromise.then(
      (result) =>
        next({
          ...rest,
          payload: result,
          type: `${type}_SUCCESS`,
        }),
      (error) =>
        next({
          ...rest,
          payload: error,
          error: true,
          type: `${type}_FAILURE`,
        }),
    );

    return actionPromise;
  };
};

export default shopifyMiddleware;
