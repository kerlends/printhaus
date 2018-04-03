/* @flow */

import * as React from 'react'
import { margin, withStyles } from 'styles'
import { Link } from 'react-router-dom'
import { Typography } from 'components';

const enhance = withStyles(styles => ({
  root: {
    display:'block',
    boxShadow: styles.shadows[1],
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: styles.spacing.unit * 2,
  },
  media: {
    width: '100%',
  },
  title: {
    //fontFamily: styles.typography.fontFamilyBrand,
    fontWeight: styles.typography.fontWeightLight,
    padding: styles.spacing.unit,
  },
}))

type Props = {
  title: string,
  media: string,
  to?: string,
};

const Card = ({ classes, title, media, to }: Props) => {
  const Component = to ? Link : 'div'
  return (
  <Component className={classes.root} to={to}>
    <img src={media} className={classes.media} alt={title} />
    <Typography type="title" className={classes.title}>
      {title}
    </Typography>
  </Component>
);
}

export default enhance(Card)
