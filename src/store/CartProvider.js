import React, { useReducer } from "react";
import CartContext from "./cart_contex";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existItem = state.items.find((x) => x.id === action.item.id);
    let updatedItem;
    if (existItem) {
      updatedItem = state.items.map((x) =>
        x.id === existItem.id ? action.item : x
      );
    } else {
      updatedItem = state.items.concat(action.item);
    }

    return {
      items: updatedItem,
    };
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
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
