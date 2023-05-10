import { useReducer, createContext } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart.js";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const removeAllFromOne = (product) =>
    dispatch({
      type: "REMOVE_ALL_FROM_ONE",
      payload: product,
    });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return { state, addToCart, removeFromCart, removeAllFromOne, clearCart };
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, removeAllFromOne, clearCart } =
    useCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        removeAllFromOne,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
