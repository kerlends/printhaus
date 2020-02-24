/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {
  Carousel,
  PageMeta,
  ProductVariantMenu,
} from 'components';

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
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
}));

type Image = {
  localFile: {
    childImageSharp: {
      sizes: any,
    },
  },
};

type Variant = {
  availableForSale: boolean,
  price: string,
};

type Props = {
  classes: any,
  description: string,
  images: Array<Image>,
  title: string,
  variants: Array<Variant>,
};

const ProductDetails = ({
  classes,
  description,
  images,
  title,
  variants,
}: Props) => (
  <Card className={classes.card}>
    <PageMeta title={title} />
    <CardContent>
      <Carousel images={images} />
      <Typography
        align="center"
        className={classes.title}
        variant="headline"
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
