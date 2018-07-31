/* @flow */

import * as React from 'react';
import { omit } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const omitClasses = omit(['centered']);

const enhance = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  paddingDense: {
    padding: theme.spacing.unit,
  },
  centered: {
    textAlign: 'center',
    width: 58,
  },
}));

const CartTableCell = ({
  classes,
  centered,
  ...props
}: any) => (
  <TableCell
    padding="dense"
    className={centered && classes.centered}
    classes={omitClasses(classes)}
    {...props}
  />
);

export default enhance(CartTableCell);
