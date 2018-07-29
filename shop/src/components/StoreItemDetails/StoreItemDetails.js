/* @flow */

import * as React from 'react';
import Img from 'gatsby-image';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProductVariantMenu from '../ProductVariantMenu';

const enhance = withStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: `${theme.spacing.unit * 2}px ${
      theme.spacing.unit
    }px`,
  },
  link: {
    color: 'inherit',
    // textDecoration: 'inherit',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
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

const StoreItemDetails = ({
  classes,
  description,
  images,
  title,
  variants,
}: Props) => (
  <Card className={classes.card}>
    <CardContent>
      {images.map((image) => (
        <Img
          key={image.id}
          sizes={image.localFile.childImageSharp.sizes}
        />
      ))}
      <Typography
        align="center"
        className={classes.title}
        variant="subheading"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography align="center" component="p" gutterBottom>
        {description}
      </Typography>
      <ProductVariantMenu variants={variants} />
    </CardContent>
  </Card>
);

export default enhance(StoreItemDetails);
