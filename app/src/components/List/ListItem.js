/* @flow */

import * as React from 'react';
import { transparentize } from 'polished';
import { merge, padding, withStyles } from 'styles';

const enhance = withStyles((styles) => {
  const { unit } = styles.spacing;
  return {
    root: {
      ...styles.typography.body2,
      ...padding({
        top: unit,
        bottom: unit,
        left: unit * 2,
        right: unit * 2,
      }),
      textDecoration: 'none',
      color: 'inherit',
      ':focus,:hover': {
        backgroundColor: transparentize(0.6, 'lightgrey'),
      },
      ':active': {
        backgroundColor: transparentize(0.4, 'lightgrey'),
      },
    },
  };
});

type Props = {
  classes: any,
  component: React.ElementType,
  label: string,

  className?: string,
};

const ListItem = ({
  classes,
  className,
  component: Component,
  label,
  ...props
}: Props) => (
  <Component className={merge(classes.root, className)} {...props}>
    {label}
  </Component>
);

ListItem.defaultProps = {
  component: 'div',
};

export default enhance(ListItem);
