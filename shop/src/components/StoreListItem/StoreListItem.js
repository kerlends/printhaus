/* @flow */

import * as React from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const enhance = withStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: `${theme.spacing.unit * 2}px ${
      theme.spacing.unit
    }px`,
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
  id: string,
  images: Array<Image>,
  title: string,
};

const StoreListItem = ({
  id,
  classes,
  description,
  images,
  title,
}: Props) => (
  <Link to={`/store/${id}`}>
    <Card className={classes.card} raised>
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
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);

export default enhance(StoreListItem);
