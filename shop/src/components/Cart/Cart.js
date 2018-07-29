/* @flow */

import * as React from 'react';
import ShopifyBuyClient from 'shopify-buy';

type Props = {
  onCheckout: any,
};

type State = {
  items: Array<any>,
};

class Cart extends React.Component<Props, State> {
  state = {
    items: [],
  };

  async componentDidMount() {
    this.client = ShopifyBuyClient.buildClient({
      domain: process.env.SHOPIFY_SHOP_NAME + '.myshopify.com',
      storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });
    this.checkout = await this.client.checkout.create();
  }

  addItem = (variantId: string, quantity: number = 1) => {
    this.setState(({ items }) => ({
      items: [{ variantId, quantity }, ...items],
    }));
  };

  handleCheckout = async () => {
    const { items } = this.state;

    const checkout = await this.client.checkout.addLineItems(
      this.checkout.id,
      items,
    );

    console.log({ checkout });
  };

  render() {
    return null;
  }
}

export default Cart;
