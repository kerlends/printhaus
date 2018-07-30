// @flow

import * as React from 'react';
import ShopifyBuyClient from 'shopify-buy';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    const { checkout } = this.state;
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
        >
          <DialogTitle disableTypography>
            <Typography variant="headline" align="center">
              cart
            </Typography>
          </DialogTitle>
          <DialogContent>
            {checkout &&
              checkout.lineItems.map((item, index) => (
                <DialogContentText key={item.id}>{`${index}. ${
                  item.title
                }`}</DialogContentText>
              ))}
          </DialogContent>
        </Dialog>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Cart;

export const CartConsumer = CartContext.Consumer;
