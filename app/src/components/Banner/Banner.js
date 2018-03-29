/* @flow */

import * as React from 'react';
import { withStyles, margin } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    width: '75vw',
    maxWidth: 500,
    ...margin({
      left: 'auto',
      right: 'auto',
      top: styles.spacing.unit * 6,
      bottom: styles.spacing.unit * 8,
    }),
  },
  image: {
    display: 'block',
    width: '100%',
  },
}));

type Props = {
  alt: string,
  classes: any,
  src: string,
};

const Banner = ({ alt, classes, src }: Props) => (
  <header className={classes.root}>
    <img className={classes.image} src={src} alt={alt} />
  </header>
);

export default enhance(Banner);
