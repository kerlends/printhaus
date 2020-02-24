// @flow

import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import data from './data.json';

const enhance = withStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
    display: 'block',
    height: '1em',
    transition: theme.transitions.create('color'),
    paddingLeft: '1em',
  },
  svg: {
    height: '1em',
  },
  invert: {
    color: theme.palette.primary.main,
  },
}));

type Props = {
  classes: any,
  invert: boolean,
  variant: 'heavy' | 'simple',
};

const PrinthausLogo = ({
  classes,
  invert,
  variant,
  ...props
}: Props) => {
  const { viewBox, d } = data[variant];
  return (
    <span
      className={classNames(
        classes.icon,
        invert && classes.invert,
      )}
    >
      <svg viewBox={viewBox} className={classes.svg}>
        <path d={d} fill="currentColor" />
      </svg>
    </span>
  );
};

PrinthausLogo.defaultProps = {
  variant: 'heavy',
};

export default enhance(PrinthausLogo);
