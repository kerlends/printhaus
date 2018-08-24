// @flow

import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';

import CartTableCell from './CartTableCell';

const enhance = withStyles((theme) => {
  const iconSize = 15;

  return {
    removeButton: {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    image: {
      margin: 0,
      marginLeft: theme.spacing.unit,
      maxWidth: theme.spacing.unit * 8,
    },
    imageCell: {
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
    },
    quantityCellContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityChangeButton: {
      height: iconSize * 2,
      width: iconSize * 2,
      fontSize: theme.typography.pxToRem(iconSize),
    },
  };
});

type Props = {
  classes: any,
  id: string,
  onItemChange: Function,
  onItemRemove: Function,
};

class CartTableRow extends React.Component<Props> {
  handleItemRemove = () => {
    const { id, onItemRemove } = this.props;
    onItemRemove(id);
  };

  handleQuantityChange = (quantity: number) => {
    const { id, onItemChange } = this.props;
    onItemChange(id, quantity);
  };

  handleQuantityAdd = () => {
    const { quantity } = this.props;
    this.handleQuantityChange(quantity + 1);
  };

  handleQuantityRemove = () => {
    const { quantity } = this.props;
    if (quantity === 1) {
      this.handleItemRemove();
    } else {
      this.handleQuantityChange(quantity - 1);
    }
  };

  render() {
    const { classes, variant, title, quantity } = this.props;
    return (
      <TableRow className={classes.row}>
        <CartTableCell className={classes.imageCell} centered>
          <img
            className={classes.image}
            src={variant.image.src}
            alt={title}
          />
        </CartTableCell>
        <CartTableCell component="th" scope="row">
          {title}
        </CartTableCell>
        <CartTableCell centered numeric>
          <div className={classes.quantityCellContent}>
            <IconButton
              aria-label="Increase quantity"
              className={classes.quantityChangeButton}
              onClick={this.handleQuantityAdd}
              mini
            >
              <AddIcon />
            </IconButton>
            {quantity}
            <IconButton
              aria-label="Decrease quantity"
              className={classes.quantityChangeButton}
              onClick={this.handleQuantityRemove}
              mini
            >
              <RemoveIcon />
            </IconButton>
          </div>
        </CartTableCell>
        <CartTableCell centered>
          <IconButton
            aria-label="Remove"
            onClick={this.handleItemRemove}
          >
            <ClearIcon />
          </IconButton>
        </CartTableCell>
      </TableRow>
    );
  }
}

export default enhance(CartTableRow);
