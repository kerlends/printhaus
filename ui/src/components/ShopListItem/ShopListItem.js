/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';
import Images from '../Images';

const enhance = withStyles((theme) => ({
  root: {},
  imageContainer: {
    height: theme.spacing.unit * 12,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translateY(-15%)',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: 'white',
  },
  caption: {
    flex: 1,
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  cost: {
    marginTop: -theme.spacing.unit,
  },
}));

type Image = {
  id: string,
  src: string,
};

type Props = {
  description: string,
  title: string,
  images: Array<Image>,
  variants: Array<{
    id: string,
    price: string,
    image: Image,
  }>,
  innerRef?: Function,
};

const ShopListItem = ({
  classes,
  images,
  title,
  variants,
  innerRef,
}: Props) => (
  <Images data={images.map(({ src }) => src)}>
    <div ref={innerRef}>
      <div className={classes.imageContainer}>
        <img
          src={images[0].src}
          alt={title}
          className={classes.image}
        />
      </div>
      <Typography
        className={classes.caption}
        variant="subheading"
      >
        {title}
      </Typography>
      <Typography className={classes.cost} variant="caption">
        {numeral(variants[0].price).format('$0.00')}
      </Typography>
    </div>
  </Images>
);

export default enhance(ShopListItem);
