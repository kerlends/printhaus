/* @flow */

import * as React from 'react';
import numeral from 'numeral';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  classes: any,
  availableForSale: boolean,
  price: string,
  title: string,
  id: string,
  onClick: (id: string) => any,
  selected: boolean,
};

class ProductVariant extends React.Component<Props> {
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
