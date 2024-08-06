import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

const cartReducer = (state, action) => {
  if (action.payload.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload.id
      );
      updatedItems.push({
        id: action.payload.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }

  if (action.payload.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  if (action.payload.type === "REMOVE_ITEM") {
    const currentCart = [...state.items];
    const updatedCart = currentCart.filter(
      (item) => item.id !== action.payload.id
    );
    return { items: updatedCart };
  }
};

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateToCart: () => {},
  onRemoveFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });
  const ctxValue = {
    items: cartState.items,
    onAddToCart: (id) => cartDispatch({ payload: { type: "ADD_ITEM", id } }),
    onUpdateToCart: (productId, amount) =>
      cartDispatch({
        payload: { type: "UPDATE_ITEM", productId, amount },
      }),
    onRemoveFromCart: (id) =>
      cartDispatch({
        payload: { type: "REMOVE_ITEM", id },
      }),
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
