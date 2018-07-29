/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProductVariant from '../ProductVariant';

const enhance = withStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  select: {
    border: '1px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing.unit * 24,
    height: theme.spacing.unit * 10,
  },
}));

type Props = {
  classes: any,
  variants: Array<React.ElementProps<typeof ProductVariant>>,
};

type State = {
  activeVariantId: string,
};

class ProductVariantSelect extends React.Component<
  Props,
  State,
> {
  state = {
    activeVariantId: this.props.variants[0].id,
  };

  handleVariantChange = (
    evt: SyntheticEvent<HTMLSelectElement>,
  ) =>
    this.setState({
      activeVariantId: evt.target.value,
    });

  render() {
    const { classes, variants } = this.props;
    const { activeVariantId } = this.state;
    const activeVariant = variants.find(
      ({ id }) => activeVariantId === id,
    );
    return (
      <div className={classes.container}>
        <label
          className={classes.select}
          htmlFor="variantSelect"
        >
          <ProductVariant {...activeVariant} />
        </label>
        <select
          id="variantSelect"
          value={activeVariant.id}
          onChange={this.handleVariantChange}
        >
          {variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default enhance(ProductVariantSelect);
