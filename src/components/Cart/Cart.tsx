import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { productAddedToCart, productRemovedFromCart } from '../../utils/ga';
import {
  addLineItem,
  getCheckoutById,
  createCheckout,
  removeLineItems,
  updateLineItems,
} from '../../api';
import CartDialog from './CartDialog';
import { CartContext, CartActionsContext } from './CartContext';

type Props = {
  onCheckout: any;
};

const Cart: React.FC<Props> = ({ children, onCheckout }) => {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<any>();

  useEffect(() => {
    const checkoutId = localStorage.getItem('checkoutId');
    (async () => {
      const checkout =
        checkoutId && checkoutId !== 'undefined'
          ? await getCheckoutById(checkoutId)
          : await createCheckout();
      localStorage.setItem('checkoutId', checkout.id);
      setCheckout(checkout);
    })();
  }, []);

  const addItem = useCallback(
    async (variantId: string, variantTitle: string, quantity: number = 1) => {
      const updatedCheckout = await addLineItem(
        checkout.id,
        variantId,
        quantity,
      );
      productAddedToCart(variantTitle);
      setCheckout(updatedCheckout);
    },
    [checkout],
  );

  const removeItem = useCallback(
    async (variantId: string, variantTitle: string) => {
      const lineItemIds = [variantId];
      const updatedCheckout = await removeLineItems(checkout.id, lineItemIds);
      productRemovedFromCart(variantTitle);
      setCheckout(updatedCheckout);
    },
    [checkout],
  );

  const updateItem = useCallback(
    async (id: string, quantity: number) => {
      const lineItems = [{ id, quantity }];
      const updatedCheckout = await updateLineItems(checkout.id, lineItems);
      setCheckout(updatedCheckout);
    },
    [checkout],
  );

  const openCheckout = useCallback(() => {
    window.open(checkout.webUrl);
  }, [checkout]);

  const handleCartDialogToggle = useCallback(
    () => setCartVisible((prevVisible) => !prevVisible),
    [],
  );

  const handleCartDialogRequestClose = useCallback(
    () => setCartVisible(false),
    [],
  );

  const cartActions = useMemo(
    () => ({
      add: addItem,
      remove: removeItem,
      update: updateItem,
      toggleCart: handleCartDialogToggle,
    }),
    [addItem, removeItem, updateItem, handleCartDialogToggle],
  );

  return (
    <CartContext.Provider value={checkout}>
      <CartActionsContext.Provider value={cartActions}>
        {checkout && (
          <CartDialog
            onBackdropClick={handleCartDialogRequestClose}
            open={cartVisible}
            maxWidth="sm"
            fullWidth
            isEmpty={!Boolean(checkout && checkout.lineItems.length > 0)}
            title="CART"
            onOpenCheckoutClick={openCheckout}
            totalPrice={checkout.totalPrice}
            items={checkout.lineItems}
          />
        )}
        {children}
      </CartActionsContext.Provider>
    </CartContext.Provider>
  );
};

export default Cart;
