/* @flow */

import * as React from 'react';
import { merge, withStyles } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    ...styles.typography.button,
    boxSizing: 'border-box',
    display: 'block',
    font: 'inherit',
    color: 'inherit',
    textTransform: 'lowercase',
    background: 'transparent',
    border: `1px solid ${styles.palette.text.inputText}`,
    height: styles.spacing.unit * 6,
    width: 300,
    lineHeight: `${styles.spacing.unit * 5}px`,
    letterSpacing: 1,
    margin: 0,
    marginBottom: styles.spacing.unit * 2,
    padding: 0,
  },
}));

type Props = {
  classes: any,
  component: React.ElementType,

  className?: string,
};

const Field = ({
  component: Component,
  classes,
  className,
  ...props
}: Props) => (
  <Component className={merge(classes.root, className)} {...props} />
);

export default enhance(Field);
