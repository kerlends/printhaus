/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Carousel from '../Carousel';
import PageMeta from '../PageMeta';
import ProductVariantMenu from '../ProductVariantMenu';

const enhance = withStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  gutter: {
    marginBottom: theme.spacing.unit * 3,
  },
  link: {
    color: 'inherit',
  },
  title: {
    fontSize: '1.5rem',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textTransform: 'uppercase',
  },
}));

const ProductDetails = ({
  classes,
  description,
  images,
  title,
  variants,
}) => (
  <Card className={classes.card}>
    <PageMeta title={title} />
    <CardContent>
      <Carousel images={images} />
      <Typography
        align="center"
        className={classes.title}
        variant="h1"
        gutterBottom
      >
        {title}
      </Typography>
      <Divider className={classes.gutter} />
      <Typography
        align="center"
        component="div"
        className={classes.gutter}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Divider className={classes.gutter} />
      <ProductVariantMenu variants={variants} title={title} />
    </CardContent>
  </Card>
);

export default enhance(ProductDetails);
