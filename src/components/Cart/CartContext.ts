import { createContext, useContext } from 'react';

export interface ICartActionsContext {
  add: (
    variantId: string,
    variantTitle: string,
    quantity?: number,
  ) => Promise<void>;
  remove: (variantId: string, variantTitle: string) => Promise<void>;
  update: (id: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
}

export type ICartContext = any;

export const CartContext = createContext<ICartContext>(null as any);
export const CartActionsContext = createContext<ICartActionsContext>(
  null as any,
);

export const useCartContext = () => {
  return useContext(CartContext);
};

export const useCartActionsContext = () => {
  return useContext(CartActionsContext);
};
