// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PageMeta from '../PageMeta';
import ProductListItem from '../ProductListItem';

const enhance = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
    },
  },
}));

const ProductList = ({ classes, title, products }) => (
  <React.Fragment>
    <PageMeta title={title} />

    <div className={classes.root}>
      {products.map(({ id, ...item }) => (
        <ProductListItem key={id} {...item} />
      ))}
    </div>
  </React.Fragment>
);

export default enhance(ProductList);
