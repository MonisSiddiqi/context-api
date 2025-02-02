import { createContext } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { useState } from "react";

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateToCart: () => {},
  onRemoveFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const handleRemoveFromCart = (id) => {
    setShoppingCart((prevShoppingCart) => {
      const currentCart = [...prevShoppingCart.items];
      const updatedCart = currentCart.filter((item) => item.id !== id);
      return { items: updatedCart };
    });
  };

  const ctxValue = {
    items: shoppingCart.items,
    onAddToCart: handleAddItemToCart,
    onUpdateToCart: handleUpdateCartItemQuantity,
    onRemoveFromCart: handleRemoveFromCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
