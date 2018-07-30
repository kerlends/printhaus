// @flow

import * as React from 'react';
import ShopifyBuyClient from 'shopify-buy';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

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
    this.client.checkout
      .removeLineItems(this.state.checkout.id, [variantId])
      .then((checkout) => this.setState({ checkout }));
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
    return (
      <CartContext.Provider
        value={{
          checkout: this.state.checkout,
          add: this.addItem,
          remove: this.removeItem,
          toggleCart: this.handleCartDialogToggle,
        }}
      >
        <Dialog
          onBackdropClick={this.handleCartDialogRequestClose}
          open={this.state.cartVisible}
          style={{ padding: 16 }}
        >
          <div>
            <Typography variant="headline" align="center">
              cart
            </Typography>
          </div>
        </Dialog>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Cart;

export const CartConsumer = CartContext.Consumer;
