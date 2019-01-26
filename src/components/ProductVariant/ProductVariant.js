/* @flow */

import * as React from 'react';
import numeral from 'numeral';
import MenuItem from '@material-ui/core/MenuItem';

class ProductVariant extends React.Component {
  handleClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  };

  render() {
    const {
      // availableForSale,
      price,
      title,
      selected,
    } = this.props;
    return (
      <MenuItem onClick={this.handleClick} selected={selected}>
        {`${title} - ${numeral(price).format('$0.00')}`}
      </MenuItem>
    );
  }
}

export default ProductVariant;
