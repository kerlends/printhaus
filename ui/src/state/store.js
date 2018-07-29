// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import shopify from './shopifyMiddleware';
import reducer from './reducer';
import { listAllProducts } from './products';

const middleware = [thunk, shopify];

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware)),
);

store.dispatch(listAllProducts());

export default store;
