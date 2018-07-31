// @flow

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import StoreListItem from '../StoreListItem';

const enhance = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
    },
  },
}));

type Props = {
  classes: any,
  products: Array<any>,
  title: string,
};

const CollectionProductList = ({
  classes,
  title,
  products,
}: Props) => (
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

    <div className={classes.root}>
      {products.map(({ id, ...item }) => (
        <StoreListItem key={id} {...item} />
      ))}
    </div>
  </React.Fragment>
);

export default enhance(CollectionProductList);
