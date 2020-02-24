// @flow

import * as ShopifyOperations from './operations';
import { parseCheckout } from './utils';

const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME;
const storefrontToken = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN;

const url = `https://${shopName}.myshopify.com/api/graphql`;

const getResponseError = async (res: any) => {
  try {
    return await res.json();
  } catch (_) {
    return res.statusText;
  }
};

type ShopifyRequestOptions = {
  query: string,
  variables: Object,
};

const shopifyRequest = async ({
  query,
  variables,
}: ShopifyRequestOptions) => {
  const options = {
    method: 'post',
    headers: {
      'x-shopify-storefront-access-token': storefrontToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  const res = await fetch(url, options);

  if (res.ok) return (await res.json()).data;

  throw new Error(await getResponseError(res));
};

export const createCheckout = async (): Promise<any> => {
  const { checkoutCreate: data } = await shopifyRequest({
    query: ShopifyOperations.CreateCheckoutMutation,
    variables: {
      input: {},
    },
  });

  if (data.userErrors && data.userErrors.length > 0)
    return Promise.reject(data.userErrors);

  return parseCheckout(data.checkout);
};

export const getCheckoutById = async (id: string) => {
  const checkout = await shopifyRequest({
    query: ShopifyOperations.GetCheckoutQuery,
    variables: {
      id,
    },
  });

  if (checkout && checkout.node) {
    return parseCheckout(checkout.node);
  }

  return createCheckout();
};

export const addLineItem = async (
  checkoutId: string,
  variantId: string,
  quantity: number = 1,
) => {
  const { checkoutLineItemsAdd: data } = await shopifyRequest({
    query: ShopifyOperations.AddLineItemMutation,
    variables: {
      checkoutId,
      lineItems: [
        {
          quantity,
          variantId,
        },
      ],
    },
  });

  if (data.userErrors && data.userErrors.length > 0) {
    return Promise.reject(data.userErrors);
  }

  return parseCheckout(data.checkout);
};

export const removeLineItems = async (
  checkoutId: string,
  lineItemIds: Array<string>,
) => {
  const {
    checkoutLineItemsRemove: data,
  } = await shopifyRequest({
    query: ShopifyOperations.RemoveLineItemMutation,
    variables: {
      checkoutId,
      lineItemIds,
    },
  });

  if (data.userErrors && data.userErrors.length > 0) {
    return Promise.reject(data.userErrors);
  }

  return parseCheckout(data.checkout);
};

export const updateLineItems = async (
  checkoutId: string,
  lineItems: Array<{
    id: string,
    quantity: number,
  }>,
) => {
  const {
    checkoutLineItemsUpdate: data,
  } = await shopifyRequest({
    query: ShopifyOperations.UpdateLineItemMutation,
    variables: {
      checkoutId,
      lineItems,
    },
  });

  if (data.userErrors && data.userErrors.length > 0)
    return Promise.reject(data.userErrors);

  return parseCheckout(data.checkout);
};
