// @flow

import * as React from 'react';
import { applySpec, path } from 'ramda';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { LoadingScreen, ShopList } from '../../components';

const firstChild = ({ children }) => {
  const arr = React.Children.toArray(children);
  return arr[0] || null;
};

const AnimateGroup = ({ children }: any) => (
  <TransitionGroup component={firstChild}>
    {children}
  </TransitionGroup>
);

const enhance = connect(
  applySpec({
    products: path(['products', 'list']),
    loading: path(['products', 'loading']),
  }),
);

type Props = {
  products: Array<any>,
  loading: boolean,
};

const Shop = ({ loading, products }: Props) => (
  <AnimateGroup>
    {loading ? (
      <LoadingScreen key="loading" />
    ) : (
      <ShopList products={products} key="list" />
    )}
  </AnimateGroup>
);

export default enhance(Shop);
