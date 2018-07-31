// @flow

import * as React from 'react';
import { Helmet } from 'react-helmet';
import StoreListItem from '../StoreListItem';

type Props = {
  products: Array<any>,
  title: string,
};

const CollectionProductList = ({ title, products }: Props) => (
  <React.Fragment>
    <Helmet
      title={`printhaus | ${title}`}
      meta={[
        {
          name: 'description',
          content: 'printhaus store',
        },
        {
          name: 'keywords',
          content: 'printhaus, store, portland, gothlol',
        },
      ]}
    />

    <div>
      {products.map(({ id, ...item }) => (
        <StoreListItem key={id} {...item} />
      ))}
    </div>
  </React.Fragment>
);

export default CollectionProductList;
