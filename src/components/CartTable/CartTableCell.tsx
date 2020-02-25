import React from 'react';
import { omit } from 'ramda';
import { Theme, makeStyles } from '@material-ui/core/styles';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';

const omitClasses = omit(['centered']);

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  paddingDense: {
    padding: theme.spacing(1),
  },
  centered: {
    textAlign: 'center',
    width: 58,
  },
}));

interface Props extends TableCellProps {
  centered?: boolean;
}

const CartTableCell: React.FC<Props> = ({ centered, ...props }) => {
  const classes = useStyles();
  return (
    <TableCell
      padding="none"
      className={centered ? classes.centered : undefined}
      classes={omitClasses(classes)}
      {...props}
    />
  );
};

export default CartTableCell;
