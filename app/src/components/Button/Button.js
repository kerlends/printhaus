/* @flow */

import * as React from 'react';
import { withStyles } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    ...styles.typography.button,
    fontSize: 12,
    letterSpacing: 0.5,
    height: styles.spacing.unit * 6,
    maxWidth: styles.spacing.unit * 34,
    margin: 0,
    padding: 0,
    background: 'transparent',
    border: `1px solid ${styles.palette.text.inputText}`,
  },
}));

type Props = {
  classes: any,
  component: React.ElementType,
  label: string,
};

const Button = ({ component: Component, classes, label, ...props }: Props) => (
  <Component {...props} className={classes.root}>
    {label}
  </Component>
);

Button.defaultProps = {
  component: 'button',
};

export default enhance(Button);
