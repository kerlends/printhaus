// @flow

import * as React from 'react';
import ShopifyBuyClient from 'shopify-buy';
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
  state = {
    cartVisible: false,
    checkout: null,
  };

  async componentDidMount() {
    this.client = ShopifyBuyClient.buildClient({
      domain:
        process.env.GATSBY_SHOPIFY_SHOP_NAME + '.myshopify.com',
      storefrontAccessToken:
        process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    });

    const checkoutId = localStorage.getItem('checkoutId');

    let checkout;

    if (checkoutId) {
      checkout = await this.client.checkout.fetch(checkoutId);
    } else {
      checkout = await this.client.checkout.create();
      localStorage.setItem('checkoutId', checkout.id);
    }

    this.setState({ checkout });
  }

  addItem = (variantId: string, quantity: number = 1) => {
    const itemsToAdd = [{ variantId, quantity }];

    this.client.checkout
      .addLineItems(this.state.checkout.id, itemsToAdd)
      .then((checkout) =>
        this.setState({
          checkout,
        }),
      );
  };

  removeItem = (variantId: string) => {
    const itemsToRemove = [variantId];
    this.client.checkout
      .removeLineItems(this.state.checkout.id, itemsToRemove)
      .then((checkout) => this.setState({ checkout }));
  };

  updateItem = (id: string, quantity: number) => {
    const itemsToUpdate = [{ id, quantity }];

    this.client.checkout
      .updateLineItems(this.state.checkout.id, itemsToUpdate)
      .then((checkout) => this.setState({ checkout }));
  };

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
