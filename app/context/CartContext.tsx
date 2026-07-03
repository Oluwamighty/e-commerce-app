'use client'
import {createContext, useReducer, ReactNode} from "react";
import {Product, CartItemType} from "../types";


type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

type CartItemContextType = {
  cart: CartItemType[];
  dispatch: React.Dispatch<CartAction>;
}


const CartItemContext = createContext<CartItemContextType | undefined>(undefined)


export function cartReducer(state: CartItemType[], action: CartAction): CartItemType[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find(item => item.id === action.payload.id);

      if (existingItem) {
        // item exists — increase quantity, don't duplicate
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // item doesn't exist — add it fresh with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
        return state.filter(item=> item.id !== action.payload.id)
    }
    case "UPDATE_QUANTITY":{
        return state.map(item => item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity} 
            : item 
        )
    }
    case "CLEAR_CART": {
        return []
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartItemContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartItemContext.Provider>
  );
}

export default CartItemContext;
export type {CartItemContextType, CartAction}
