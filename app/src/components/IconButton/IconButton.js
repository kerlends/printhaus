/* @flow */

import * as React from 'react';
import { merge, withStyles } from 'styles';
import icons from 'icons';

const enhance = withStyles((styles) => ({
  root: {
    background: 'transparent',
    margin: 0,
    padding: 0,
    border: 'none',
    lineHeight: 0,
    display: 'inline-block',
    width: styles.spacing.unit * 3,
    height: styles.spacing.unit * 3,
    ':focus': {
      outline: 'none',
    },
  },
  icon: {
    width: styles.spacing.unit * 3,
    height: styles.spacing.unit * 3,
  },
}));

type Props = {
  classes: any,
  icon: $Keys<typeof icons>,

  className?: string,
  iconClassName?: string,
  onClick?: Function,
};

const IconButton = ({
  classes,
  className,
  icon,
  iconClassName,
  ...props
}: Props) => {
  const Icon = icons[icon];
  return (
    <button {...props} className={merge(classes.root, className)}>
      <Icon className={merge(classes.icon, iconClassName)} />
    </button>
  );
};

export default enhance(IconButton);
