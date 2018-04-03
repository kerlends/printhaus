/* @flow */

import * as React from 'react';
import { withStyles } from 'styles';
import Field from '../Field';

const enhance = withStyles((styles) => ({
  root: {
    position: 'relative',
    marginTop: styles.spacing.unit * 5,
    display: 'flex',
  },
  label: {
    ...styles.typography.button,
    textTransform: 'lowercase',
    position: 'absolute',
    top: styles.spacing.unit * -4.5,
  },
  input: {
    display: 'block',
    border: 'none',
    font: 'inherit',
    margin: 0,
    padding: 0,
    paddingLeft: styles.spacing.unit * 2,
    flex: 1,
  },
}));

type Props = {
  label: string,
  name: string,
  type: 'text' | 'email' | 'tel',
};

const TextField = ({ classes, label, name, ...props }: Props) => (
  <Field component="label" className={classes.root}>
    <span className={classes.label}>{label}</span>
    <input className={classes.input} id={name} name={name} {...props} />
  </Field>
);

TextField.defaultProps = {
  type: 'text',
};

export default enhance(TextField);
