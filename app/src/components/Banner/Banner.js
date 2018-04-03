/* @flow */

import * as React from 'react';
import { withStyles, margin } from 'styles';
import { Typography } from 'components';

const enhance = withStyles((styles) => ({
  root: {
    position: 'sticky',
    top: styles.spacing.unit / 2,
    transform: 'scale(1)',
    transformOrigin: 'center',
    transition: styles.transitions.create('transform'),
    zIndex:1,
    '&[data-shrink]': {
      transform: 'scale(.8) translateX(25%)',
    },
    pointerEvents:'none',
    ...margin({
      top: styles.spacing.unit * 6,
      bottom: styles.spacing.unit * 8,
    }),
  },
}));

type Props = {
  classes: any,
  innerRef: Function,
  text: string,
};

const Banner = ({ classes, innerRef, items, text }: Props) => (
  <header className={classes.root} ref={innerRef}>
    <Typography type="brand" align="center">
      {text}
    </Typography>
  </header>
)

export default enhance(Banner);
