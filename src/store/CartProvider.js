import React, { useReducer } from "react";
import CartContext from "./cart_contex";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADDITEM") {
    const updatedItem = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.totalAmount;

    return {
      items: updatedItem,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADDITEMS",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContex = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContex}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
