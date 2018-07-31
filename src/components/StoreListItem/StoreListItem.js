/* @flow */

import * as React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/core/styles';
import Card from '../Card';

const enhance = withStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: `${theme.spacing.unit * 2}px ${
      theme.spacing.unit
    }px`,
    borderRadius: 2,
  },
  link: {
    color: 'inherit',
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

type Props = {
  classes: any,
  description: string,
  handle: string,
  images: Array<Image>,
  title: string,
};

const StoreListItem = ({
  classes,
  description,
  handle,
  images,
  title,
}: Props) => (
  <Link className={classes.link} to={`/store/${handle}/`}>
    <Card images={images} title={title} />
  </Link>
);

export default enhance(StoreListItem);
