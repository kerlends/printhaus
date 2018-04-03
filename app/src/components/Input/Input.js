import * as React from 'react';
import { flex, margin, merge, withStyles } from 'styles';

const enhance = withStyles((styles) => ({
  root: {
    ...flex({ direction: 'column' }),
    ...margin({ bottom: styles.spacing.unit * 2 }),
    width: '100%',
    maxWidth: 400,
  },
  label: {
    ...styles.typography.body1,
    ...margin({ bottom: styles.spacing.unit * 2 }),
  },
  input: {
    border: `1px solid ${styles.palette.text.inputText}`,
    font: 'inherit',
    color: 'inherit',
    height: styles.spacing.unit * 6,
    padding: styles.spacing.unit,
    margin: 0,
  },
  area: {
    height: 'auto',
    minHeight: styles.spacing.unit * 12,
  },
}));

type Props = {
  classes: any,
  name: string,
  type: string,
  label: string,
};

const Input = ({ classes, name, type, label }: Props) => (
  <div className={classes.root}>
    <label className={classes.label} htmlFor={name}>
      {label}
    </label>
    {type === 'area' ? (
      <textarea id={name} name={name} className={merge(classes.input, classes.area)} />
    ) : (
      <input type={type} name={name} id={name} className={classes.input} />
    )}
  </div>
);

export default enhance(Input);
