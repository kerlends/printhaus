/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Carousel } from '../Carousel';

const enhance = withStyles((theme) => ({
  card: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
    borderRadius: theme.spacing.unit,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing.unit,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  title: {
    color: 'white',
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
  images: Array<Image>,
  title: string,
};

const Card = ({ classes, images, title }: Props) => (
  <div className={classes.card}>
    <Carousel images={images} disableNavigation />
    <div className={classes.titleContainer}>
      <Typography
        align="center"
        className={classes.title}
        variant="caption"
      >
        {title}
      </Typography>
    </div>
  </div>
);

export default enhance(Card);
