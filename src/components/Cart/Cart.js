// @flow

import * as React from 'react';
import {
  productAddedToCart,
  productRemovedFromCart,
} from '../../utils/ga';
import {
  addLineItem,
  getCheckoutById,
  createCheckout,
  removeLineItems,
  updateLineItems,
} from '../../api';
import CartDialog from './CartDialog';

const CartContext = React.createContext({
  checkout: null,
  add: () => {},
  remove: () => {},
  update: () => {},
  toggleCart: () => {},
});

type Props = {
  onCheckout: any,
};

type State = {
  cartVisible: boolean,
  checkout: any,
  items: Array<any>,
};

class Cart extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cartVisible: false,
      checkout: null,
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  async componentDidMount() {
    const checkoutId = localStorage.getItem('checkoutId');

    let checkout;

    if (checkoutId && checkoutId !== 'undefined') {
      checkout = await getCheckoutById(checkoutId);
    } else {
      checkout = await createCheckout();
    }

    localStorage.setItem('checkoutId', checkout.id);

    this.setState({ checkout });
  }

  async addItem(
    variantId: string,
    variantTitle: string,
    quantity: number = 1,
  ) {
    const checkout = await addLineItem(
      this.state.checkout.id,
      variantId,
      quantity,
    );

    productAddedToCart(variantTitle);

    this.setState({ checkout });
  }

  async removeItem(variantId: string, variantTitle: string) {
    const { id: checkoutId } = this.state.checkout;

    const lineItemIds = [variantId];

    const checkout = await removeLineItems(
      checkoutId,
      lineItemIds,
    );

    productRemovedFromCart(variantTitle);

    this.setState({ checkout });
  }

  async updateItem(id: string, quantity: number) {
    const { id: checkoutId } = this.state.checkout;

    const lineItems = [{ id, quantity }];

    const checkout = await updateLineItems(
      checkoutId,
      lineItems,
    );

    this.setState({ checkout });
  }

  openCheckout = () => {
    const { checkout } = this.state;
    window.open(checkout.webUrl);
  };

  handleCartDialogToggle = () =>
    this.setState(({ cartVisible }) => ({
      cartVisible: !cartVisible,
    }));

  handleCartDialogRequestClose = () =>
    this.setState({
      cartVisible: false,
    });

  render() {
    const { checkout } = this.state;
    return (
      <CartContext.Provider
        value={{
          checkout: this.state.checkout,
          add: this.addItem,
          remove: this.removeItem,
          update: this.updateItem,
          toggleCart: this.handleCartDialogToggle,
        }}
      >
        {checkout && (
          <CartDialog
            onBackdropClick={this.handleCartDialogRequestClose}
            open={this.state.cartVisible}
            maxWidth="sm"
            fullWidth
            isEmpty={
              !Boolean(
                checkout && checkout.lineItems.length > 0,
              )
            }
            title="CART"
            onOpenCheckoutClick={this.openCheckout}
            totalPrice={checkout.totalPrice}
            items={checkout.lineItems}
          />
        )}
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Cart;

export const CartConsumer = CartContext.Consumer;
