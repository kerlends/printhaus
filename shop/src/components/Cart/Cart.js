// @flow

import * as React from 'react';
import ShopifyBuyClient from 'shopify-buy';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';
import CartLineItem from '../CartLineItem';

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
    console.log({ itemsToRemove });
    this.client.checkout
      .removeLineItems(this.state.checkout.id, itemsToRemove)
      .then((checkout) => this.setState({ checkout }));
  };

  updateItem = (id: string, quantity: number) => {
    const itemsToUpdate = [{ id, quantity }];

    console.log({ itemsToUpdate });

    this.client.checkout
      .updateLineItems(this.state.checkout.id, itemsToUpdate)
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
          update: this.updateItem,
          toggleCart: this.handleCartDialogToggle,
        }}
      >
        <Dialog
          onBackdropClick={this.handleCartDialogRequestClose}
          open={this.state.cartVisible}
        >
          <DialogContent>
            {checkout && checkout.lineItems.length > 0 ? (
              <React.Fragment>
                <DialogTitle disableTypography>
                  <Typography variant="headline" align="center">
                    cart
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  {checkout.lineItems.map((item, index) => (
                    <CartLineItem
                      key={item.id}
                      title={item.title}
                      onQuantityDecrement={() =>
                        this.updateItem(
                          item.id,
                          item.quantity - 1,
                        )
                      }
                      onQuantityIncrement={() =>
                        this.updateItem(
                          item.id,
                          item.quantity + 1,
                        )
                      }
                      quantity={item.quantity}
                      onRemoveClick={() =>
                        this.removeItem(item.id)
                      }
                    />
                  ))}
                  <DialogContentText
                    style={{ marginTop: 16 }}
                    variant="subheading"
                    align="center"
                  >
                    {`Total cost: ${numeral(
                      checkout.totalPrice,
                    ).format('$0.00')}`}
                  </DialogContentText>
                </DialogContent>
              </React.Fragment>
            ) : (
              <DialogContentText>
                Your cart is empty
              </DialogContentText>
            )}
          </DialogContent>
        </Dialog>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Cart;

export const CartConsumer = CartContext.Consumer;
